"use client";

import { useActionState, useCallback } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";

type FormState =
  | { state: "idle" }
  | {
      state: "error";
      error: string;
    }
  | { state: "success" };

async function actionReducer(
  _state: FormState,
  handle: string,
): Promise<FormState> {
  const res = await fetch("/oauth/login", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ handle }),
  });

  if (!res.ok) {
    return {
      state: "error",
      error: `Failed to trigger OAuth flow`,
    };
  }

  const resBody = await res.json();
  window.location.assign(resBody.redirectUrl);

  return { state: "success" };
}
export default function LoginForm() {
  const [form, dispatch, isPending] = useActionState(actionReducer, {
    state: "idle",
  });

  const formAction = useCallback(
    async (formData: FormData) => {
      const handle = formData.get("handle");
      if (!handle || typeof handle !== "string") {
        return;
      }

      dispatch(handle);
    },
    [dispatch],
  );

  return (
    <div className="max-w-lg">
      <form action={formAction}>
        <div className="flex flex-col">
          <Label htmlFor="handle" className="mb-1">
            <span className="font-bold">Handle</span>
          </Label>
          <p className="text-sm mb-4">Enter your ATProto handle to continue</p>
          <Input
            id="handle"
            name="handle"
            type="text"
            minLength={1}
            placeholder="Bluesky handle or DID"
            disabled={isPending}
          />
          <Button
            className="mt-4"
            type="submit"
            variant="outline"
            disabled={isPending}
          >
            Continue
          </Button>
          {form.state == "error" && (
            <Alert variant="destructive" className="mt-4">
              <AlertTitle className="text-red-500">
                Something went wrong
              </AlertTitle>
              <AlertDescription className="text-red-500">
                {form.error}
              </AlertDescription>
            </Alert>
          )}
        </div>
      </form>
    </div>
  );
}
