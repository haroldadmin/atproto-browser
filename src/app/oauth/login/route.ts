import { z } from "zod";
import { NextRequest, NextResponse } from "next/server";
import { getOAuthClient, SCOPE } from "@/lib/auth/client";

const RequestBodySchema = z.object({
  handle: z.string().nonempty(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validationResult = RequestBodySchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { message: validationResult.error.message },
        { status: 400 },
      );
    }

    const { handle } = validationResult.data;
    const client = await getOAuthClient();

    const authorizationServerUrl = await client.authorize(handle, {
      scope: SCOPE,
    });

    return NextResponse.json({
      redirectUrl: authorizationServerUrl.toString(),
    });
  } catch (error) {
    console.error("OAuth login error:", error);
    return NextResponse.json(
      { error: "Failed to trigger OAuth flow" },
      { status: 500 },
    );
  }
}
