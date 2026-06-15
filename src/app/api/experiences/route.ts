import { NextResponse } from "next/server";
import { getExperiences } from "@/src/lib/data";

export const revalidate = 60;

export async function GET() {
  const data = await getExperiences();
  return NextResponse.json(data);
}
