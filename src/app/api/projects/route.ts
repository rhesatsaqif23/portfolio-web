import { NextResponse } from "next/server";
import { getProjects, getProjectsByCategory } from "@/src/lib/data";

export const revalidate = 60;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const limit = searchParams.get("limit");

  if (category && category !== "All") {
    const data = await getProjectsByCategory(category, limit ? parseInt(limit, 10) : 8);
    return NextResponse.json(data);
  }

  const data = await getProjects();
  return NextResponse.json(data);
}
