import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getOAuthClient } from "@/lib/auth/client";

export async function POST() {
  const cookieStore = await cookies();
  const did = cookieStore.get("did")?.value;
  if (!did) {
    return NextResponse.json({ success: true });
  }

  try {
    const client = await getOAuthClient();
    await client.revoke(did);
  } catch (error) {
    console.error("Failed to revoke session", error);
  }

  cookieStore.delete("did");
  return NextResponse.json({ success: true });
}
