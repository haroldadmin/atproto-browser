"use client";

import { fetchDidDoc } from "@/actions/resolveDid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { clsx } from "clsx";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

export default function DIDForm() {
  const [formState, formAction] = useActionState(fetchDidDoc, {
    did: "",
  });

  return (
    <form action={formAction} className="flex flex-row gap-2 max-w-lg py-24">
      <div className="flex flex-col gap-1 w-full">
        <Input
          className={clsx(formState.error && "border-red-500")}
          type="text"
          name="did"
          defaultValue={formState.did}
          placeholder="DID or Bluesky handle"
        />
        {formState.error && (
          <p className="text-sm text-red-500">{formState.error}</p>
        )}
      </div>
      <SubmitButton />
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
