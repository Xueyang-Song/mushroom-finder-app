import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// GET /api/spots – list spots with optional filters
export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(request.url);

  let query = supabase.from("spots").select("*");

  const season = searchParams.get("season");
  const forestType = searchParams.get("forest_type");
  const areaType = searchParams.get("area_type");

  if (season) query = query.eq("season", season);
  if (forestType) query = query.eq("forest_type", forestType);
  if (areaType) query = query.eq("area_type", areaType);

  const { data, error } = await query.order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST /api/spots – create a new spot (authenticated)
export async function POST(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const { data, error } = await supabase
    .from("spots")
    .insert({
      name: body.name,
      description: body.description,
      latitude: body.latitude,
      longitude: body.longitude,
      season: body.season,
      forest_type: body.forest_type,
      area_type: body.area_type,
      created_by: user.id,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
