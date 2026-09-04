import { buildClientMetadata } from "@/lib/auth/client";
import { NextResponse } from "next/server";

export async function GET() {
  const metadata = buildClientMetadata();
  return NextResponse.json(metadata);
}
