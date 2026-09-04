import { buildClientMetadata } from "@/lib/auth/client";

export async function GET() {
  const metadata = buildClientMetadata();
  return Response.json(metadata);
}
