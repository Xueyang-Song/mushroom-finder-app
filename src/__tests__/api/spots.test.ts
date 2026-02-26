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
import { GET, POST } from "@/app/api/spots/route";

beforeEach(() => resetMocks());

describe("GET /api/spots", () => {
  it("returns spots from database", async () => {
    const spots = [{ id: 1, name: "Test Spot", latitude: 47, longitude: -121 }];
    mockFromReturns(spots);

    const res = await GET(new Request("http://localhost/api/spots") as any);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual(spots);
  });

  it("passes season filter to query", async () => {
    mockFromReturns([]);
    const res = await GET(new Request("http://localhost/api/spots?season=fall") as any);
    expect(res.status).toBe(200);
  });

  it("passes multiple filters to query", async () => {
    mockFromReturns([]);
    const res = await GET(
      new Request("http://localhost/api/spots?season=spring&forest_type=conifer&area_type=national_forest") as any
    );
    expect(res.status).toBe(200);
  });
});

describe("POST /api/spots", () => {
  it("rejects unauthenticated requests", async () => {
    mockAuthUser(null);
    const res = await POST(
      new Request("http://localhost/api/spots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: "Spot", latitude: 47, longitude: -121 }),
      }) as any
    );
    expect(res.status).toBe(401);
    expect((await res.json()).error).toBe("Unauthorized");
  });

  it("creates a spot for authenticated user", async () => {
    mockAuthUser({ id: "user-123" });
    mockFromReturns({ id: 2, name: "New Spot" });

    const res = await POST(
      new Request("http://localhost/api/spots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "New Spot",
          latitude: 47,
          longitude: -121,
          season: "fall",
          forest_type: "conifer",
          area_type: "national_forest",
        }),
      }) as any
    );
    expect(res.status).toBe(201);
  });
});
