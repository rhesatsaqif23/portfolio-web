import { NextRequest, NextResponse } from "next/server";
import { getCaseStudyByProjectSlug, getProjectBySlug } from "@/src/lib/data";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "Missing slug parameter" }, { status: 400 });
  }

  const [caseStudy, project] = await Promise.all([
    getCaseStudyByProjectSlug(slug),
    getProjectBySlug(slug),
  ]);

  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  return NextResponse.json({ caseStudy, project });
}
