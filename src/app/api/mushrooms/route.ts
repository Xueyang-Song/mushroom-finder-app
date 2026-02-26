import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// GET /api/mushrooms – list mushrooms with optional filters
export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);

  let query = supabase.from("mushrooms").select("*");

  const season = searchParams.get("season");
  const forestType = searchParams.get("forest_type");
  const areaType = searchParams.get("area_type");
  const morelOnly = searchParams.get("morel");

  if (season) query = query.contains("seasons", [season]);
  if (forestType) query = query.contains("forest_types", [forestType]);
  if (areaType) query = query.contains("public_areas", [areaType]);
  if (morelOnly === "true") query = query.eq("is_morel", true);

  const { data, error } = await query.order("name");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
