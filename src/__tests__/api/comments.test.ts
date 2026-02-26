/**
 * @jest-environment node
 */

/* ---------- Mock plumbing ---------- */
function createQueryBuilder(data: unknown = [], error: unknown = null) {
  const builder: Record<string, jest.Mock> = {};
  const terminal = () => Promise.resolve({ data, error });
  const chain = () => builder;

  builder.select = jest.fn(chain);
  builder.insert = jest.fn(chain);
  builder.eq = jest.fn(chain);
  builder.contains = jest.fn(chain);
  builder.order = jest.fn(terminal);
  builder.single = jest.fn(terminal);
  return builder;
}

const mockFrom = jest.fn(() => createQueryBuilder());
const mockGetUser = jest.fn().mockResolvedValue({ data: { user: null } });
const mockSupabase = { from: mockFrom, auth: { getUser: mockGetUser } };

jest.mock("@/lib/supabase/server", () => ({
  createClient: jest.fn().mockImplementation(async () => mockSupabase),
}));

/* ---------- Helpers ---------- */
function mockFromReturns(data: unknown) {
  mockFrom.mockImplementation(() => createQueryBuilder(data));
}
function mockAuthUser(user: { id: string } | null) {
  mockGetUser.mockResolvedValue({ data: { user } });
}
function resetMocks() {
  mockFrom.mockImplementation(() => createQueryBuilder());
  mockGetUser.mockResolvedValue({ data: { user: null } });
}

/* ---------- Tests ---------- */
import { GET, POST } from "@/app/api/comments/route";

beforeEach(() => resetMocks());

describe("GET /api/comments", () => {
  it("returns 400 when spot_id is missing", async () => {
    const res = await GET(new Request("http://localhost/api/comments") as any);
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.error).toBe("spot_id is required");
  });

  it("returns comments for a valid spot_id", async () => {
    const comments = [
      { id: 1, body: "Great spot!", profiles: { username: "user1" } },
    ];
    mockFromReturns(comments);

    const res = await GET(new Request("http://localhost/api/comments?spot_id=1") as any);
    expect(res.status).toBe(200);
  });
});

describe("POST /api/comments", () => {
  it("rejects unauthenticated requests", async () => {
    mockAuthUser(null);
    const res = await POST(
      new Request("http://localhost/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spot_id: 1, body: "Nice!" }),
      }) as any
    );
    expect(res.status).toBe(401);
  });

  it("rejects requests missing required fields", async () => {
    mockAuthUser({ id: "user-123" });
    const res = await POST(
      new Request("http://localhost/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      }) as any
    );
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.error).toBe("spot_id and body are required");
  });

  it("creates a comment for authenticated user", async () => {
    mockAuthUser({ id: "user-123" });
    mockFromReturns({
      id: 1,
      body: "Found chanterelles here!",
      profiles: { username: "hunter1" },
    });

    const res = await POST(
      new Request("http://localhost/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ spot_id: 1, body: "Found chanterelles here!" }),
      }) as any
    );
    expect(res.status).toBe(201);
  });
});
