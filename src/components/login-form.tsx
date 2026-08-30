"use client";

import { useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { LoaderCircleIcon } from "lucide-react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

type LoginForm = {
  handle: string;
};

export default function LoginForm() {
  const form = useForm<LoginForm>({
    defaultValues: { handle: "" },
  });

  const { control, formState, handleSubmit, setError } = form;

  const onSubmit = useCallback(
    async (form: LoginForm) => {
      const { handle } = form;

      const res = await fetch("/oauth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ handle }),
      });

      if (!res.ok) {
        setError("root", { message: "Failed to trigger OAuth flow" });
        return;
      }

      const resBody = await res.json();
      if (!resBody.redirectUrl) {
        setError("root", {
          message: "Authorization server did not return a redirect URL",
        });
        return;
      }

      window.location.assign(resBody.redirectUrl);
    },
    [setError],
  );

  return (
    <div className="max-w-lg">
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col">
            <FormField
              name="handle"
              control={control}
              rules={{
                minLength: { value: 1, message: "Handle can not be empty" },
                required: { value: true, message: "Handle is required" },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <span className="font-bold">Handle</span>
                  </FormLabel>
                  <FormDescription>
                    Enter your ATProto handle to continue
                  </FormDescription>
                  <FormControl>
                    <Input
                      {...field}
                      type="text"
                      placeholder="Bluesky handle or DID"
                      disabled={formState.isSubmitting}
                      spellCheck={false}
                      autoFocus
                      autoCapitalize="none"
                      autoComplete="username"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="mt-4"
              type="submit"
              variant="outline"
              disabled={formState.isSubmitting}
            >
              {formState.isSubmitting && (
                <LoaderCircleIcon className="animate-spin" />
              )}
              Continue
            </Button>
            {formState.errors.root && (
              <p
                role="alert"
                className="mt-4 text-sm font-medium text-destructive"
              >
                {formState.errors.root.message}
              </p>
            )}
            {/* Live region change for accessibility, announces to non-sighted users about changes in the form*/}
            <p role="status" className="sr-only">
              {formState.isSubmitting ? "Signing you in…" : ""}
            </p>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
