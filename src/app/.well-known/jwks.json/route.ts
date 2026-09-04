import { NextResponse } from "next/server";
import { JoseKey } from "@atproto/oauth-client-node";
import { resolveOauthPrivateKey } from "@/lib/env";

const OAUTH_PRIVATE_KEY = resolveOauthPrivateKey();

export async function GET(): Promise<NextResponse> {
  const key = await JoseKey.fromJWK(JSON.parse(OAUTH_PRIVATE_KEY));
  return NextResponse.json({
    keys: [key.publicJwk],
  });
}
