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
const mockSupabase = { from: mockFrom, auth: { getUser: jest.fn() } };

jest.mock("@/lib/supabase/server", () => ({
  createClient: jest.fn().mockImplementation(async () => mockSupabase),
}));

/* ---------- Helpers ---------- */
function mockFromReturns(data: unknown) {
  mockFrom.mockImplementation(() => createQueryBuilder(data));
}
function resetMocks() {
  mockFrom.mockImplementation(() => createQueryBuilder());
}

/* ---------- Tests ---------- */
import { GET } from "@/app/api/mushrooms/route";

beforeEach(() => resetMocks());

describe("GET /api/mushrooms", () => {
  it("returns all mushrooms when no filters", async () => {
    const mushrooms = [
      { id: 1, name: "Chanterelle", seasons: ["fall"], is_morel: false },
      { id: 2, name: "Morel", seasons: ["spring"], is_morel: true },
    ];
    mockFromReturns(mushrooms);

    const res = await GET(new Request("http://localhost/api/mushrooms") as any);
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual(mushrooms);
  });

  it("accepts season filter", async () => {
    mockFromReturns([]);
    const res = await GET(new Request("http://localhost/api/mushrooms?season=spring") as any);
    expect(res.status).toBe(200);
  });

  it("accepts forest_type filter", async () => {
    mockFromReturns([]);
    const res = await GET(new Request("http://localhost/api/mushrooms?forest_type=conifer") as any);
    expect(res.status).toBe(200);
  });

  it("accepts morel-only filter", async () => {
    mockFromReturns([]);
    const res = await GET(new Request("http://localhost/api/mushrooms?morel=true") as any);
    expect(res.status).toBe(200);
  });

  it("accepts combined filters", async () => {
    mockFromReturns([]);
    const res = await GET(
      new Request("http://localhost/api/mushrooms?season=fall&forest_type=mixed&area_type=state_park") as any
    );
    expect(res.status).toBe(200);
  });
});
