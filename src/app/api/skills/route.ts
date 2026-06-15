import { NextResponse } from "next/server";
import { getSkills } from "@/src/lib/data";

export const revalidate = 60;

export async function GET() {
  const data = await getSkills();
  return NextResponse.json(data);
}
