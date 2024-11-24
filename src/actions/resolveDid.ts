"use server";

import { resolveDidDoc } from "@/lib/did";
import { redirect } from "next/navigation";
import { z } from "zod";

const schema = z.object({
  did: z.string().trim(),
  error: z.string().optional(),
});

export type DIDFormState = z.infer<typeof schema>;

export async function fetchDidDoc(
  prevState: DIDFormState,
  formData: FormData
): Promise<DIDFormState> {
  const formObject = Object.fromEntries(formData.entries());
  const parsed = schema.safeParse(formObject);
  if (!parsed.success) {
    return {
      ...prevState,
      error: parsed.error.message,
    };
  }

  const doc = await resolveDidDoc(parsed.data.did);
  if (!doc) {
    return {
      did: parsed.data.did,
      error: "Could not resolve DID",
    };
  }

  redirect(`/at/${doc.id}`);
}
