import { NextResponse } from "next/server";
import { getAchievements } from "@/src/lib/data";

export const revalidate = 60;

export async function GET() {
  const data = await getAchievements();
  return NextResponse.json(data);
}
