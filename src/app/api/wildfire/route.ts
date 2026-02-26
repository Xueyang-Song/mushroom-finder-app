import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// GET /api/wildfire – list wildfire areas for morel discovery
export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("wildfire_areas")
    .select("*")
    .eq("state", "WA")
    .order("fire_year", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
