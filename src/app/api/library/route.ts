import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { getLibrary, addMediaItem, getLibraryStats, searchLibrary } from "@/lib/library";

export async function GET(req: NextRequest) {
  const session = await auth0.getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.sub;
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const query = searchParams.get("q");
  const stats = searchParams.get("stats");

  if (stats === "true") {
    return NextResponse.json(getLibraryStats(userId));
  }

  if (query) {
    return NextResponse.json(searchLibrary(userId, query));
  }

  const library = getLibrary(userId);
  if (type) {
    return NextResponse.json(library.filter((item) => item.type === type));
  }

  return NextResponse.json(library);
}

export async function POST(req: NextRequest) {
  const session = await auth0.getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.sub;
  const body = await req.json();
  const item = addMediaItem(userId, body);
  return NextResponse.json(item, { status: 201 });
}
