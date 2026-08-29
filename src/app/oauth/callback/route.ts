import { NextRequest, NextResponse } from "next/server";
import { getOAuthClient } from "@/lib/auth/client";
import { resolveSiteUrl, resolveSiteUrlScheme } from "@/lib/env";

const SITE_URL = `${resolveSiteUrlScheme()}${resolveSiteUrl()}`;
const ONE_WEEK_SECS = 7 * 24 * 60 * 60;

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;

    const client = await getOAuthClient();
    const { session } = await client.callback(params);
    const response = NextResponse.redirect(new URL("/", SITE_URL));

    response.cookies.set("did", session.did, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: ONE_WEEK_SECS,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("OAuth callback error:", error);
    return NextResponse.redirect(new URL("/?error=login_failed", SITE_URL));
  }
}
