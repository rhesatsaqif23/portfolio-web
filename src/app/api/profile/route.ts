import { NextResponse } from "next/server";
import { getProfile } from "@/src/lib/data";

export const revalidate = 60;

export async function GET() {
  const data = await getProfile();
  return NextResponse.json(data);
}
