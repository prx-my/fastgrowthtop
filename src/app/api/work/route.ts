import { NextResponse } from "next/server";
import { getWorkProjects } from "@/lib/workProjects";

export const dynamic = "force-dynamic";

export async function GET() {
  const projects = getWorkProjects();
  return NextResponse.json(projects);
}
