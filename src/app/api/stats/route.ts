import { NextResponse } from "next/server";
import { getStats } from "@/src/lib/data";

export const revalidate = 60;

export async function GET() {
  const data = await getStats();
  return NextResponse.json(data);
}
