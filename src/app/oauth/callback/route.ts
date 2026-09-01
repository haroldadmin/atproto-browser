import { NextRequest, NextResponse } from "next/server";
import { getOAuthClient } from "@/lib/auth/client";
import {
  createCookieSession,
  SESSION_COOKIE_NAME,
} from "@/lib/auth/cookie-session";
import { resolveSiteUrl, resolveSiteUrlScheme } from "@/lib/env";

const SITE_URL = `${resolveSiteUrlScheme()}${resolveSiteUrl()}`;
const ONE_WEEK_SECS = 7 * 24 * 60 * 60;

export async function GET(request: NextRequest) {
  try {
    const params = request.nextUrl.searchParams;

    const client = await getOAuthClient();
    const { session } = await client.callback(params);

    const sessionId = await createCookieSession(session.did);

    const res = NextResponse.redirect(new URL("/", SITE_URL));
    res.cookies.set(SESSION_COOKIE_NAME, sessionId, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: ONE_WEEK_SECS,
    });

    return res;
  } catch (error) {
    console.error("OAuth callback error:", error);
    return NextResponse.redirect(new URL("/?error=login_failed", SITE_URL));
  }
}
