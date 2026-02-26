import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

// GET /api/comments?spot_id=123 – list comments for a spot
export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const spotId = new URL(request.url).searchParams.get("spot_id");

  if (!spotId) {
    return NextResponse.json(
      { error: "spot_id is required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("comments")
    .select("*, profiles(username)")
    .eq("spot_id", spotId)
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// POST /api/comments – create a comment (authenticated)
export async function POST(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  if (!body.spot_id || !body.body) {
    return NextResponse.json(
      { error: "spot_id and body are required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("comments")
    .insert({
      spot_id: body.spot_id,
      user_id: user.id,
      body: body.body,
    })
    .select("*, profiles(username)")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
