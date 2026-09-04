import { z } from "zod";
import { getOAuthClient, SCOPE } from "@/lib/auth/client";
import { isValidDid, isValidHandle } from "@atproto/syntax";

const RequestBodySchema = z.object({
  handle: z
    .string()
    .min(1)
    .refine((value) => {
      return isValidDid(value) || isValidHandle(value);
    }, "Must be a valid DID or handle"),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validationResult = RequestBodySchema.safeParse(body);
    if (!validationResult.success) {
      return Response.json(
        { message: validationResult.error.message },
        { status: 400 },
      );
    }

    const { handle } = validationResult.data;
    const client = await getOAuthClient();

    const authorizationServerUrl = await client.authorize(handle, {
      scope: SCOPE,
    });

    return Response.json({
      redirectUrl: authorizationServerUrl.toString(),
    });
  } catch (error) {
    console.error("OAuth login error:", error);
    return Response.json(
      { error: "Failed to trigger OAuth flow" },
      { status: 500 },
    );
  }
}
