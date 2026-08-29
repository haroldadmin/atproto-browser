import { buildClientMetadata } from "@/lib/auth/client";
import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const metadata = buildClientMetadata();
  return NextResponse.json(metadata);
}
