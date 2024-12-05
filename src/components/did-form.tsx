"use client";

import { fetchDidDoc } from "@/actions/resolveDid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { clsx } from "clsx";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Label } from "./ui/label";

export default function DIDForm() {
  const [formState, formAction] = useActionState(fetchDidDoc, {
    did: "",
  });

  return (
    <form action={formAction} className="max-w-lg py-24">
      <div className="flex flex-col gap-3 w-full">
        <Label htmlFor="did">
          <h2 className="text-xl font-bold ml-1.5">DID or a Bluesky handle</h2>
        </Label>
        <div className="flex flex-row gap-2 items-center">
          <Input
            className={clsx(formState.error && "border-red-500")}
            type="text"
            name="did"
            defaultValue={formState.did}
            placeholder="did:plc, did:web, or handle.bsky.social"
          />
          <SubmitButton />
        </div>
        {formState.error && (
          <p className="text-sm text-red-500">{formState.error}</p>
        )}
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      Go
    </Button>
  );
}
