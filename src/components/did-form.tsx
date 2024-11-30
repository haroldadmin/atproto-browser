"use client";

import { clsx } from "clsx";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { fetchDidDoc } from "../actions/resolveDid";
import { useFormStatus } from "react-dom";

export default function DIDForm() {
  const [formState, formAction] = useActionState(fetchDidDoc, {
    did: "",
  });

  return (
    <form
      action={formAction}
      className="flex flex-row gap-2 max-w-lg pb-48 pt-12"
    >
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
