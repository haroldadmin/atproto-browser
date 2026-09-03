import { describe, it, vi, expect, beforeEach } from "vitest";
import { buildClientMetadata } from "./client";
import * as env from "@/lib/env";

vi.spyOn(env, "resolveSiteUrl");

beforeEach(() => {
  vi.resetAllMocks();
});

describe(buildClientMetadata, () => {
  it("should resolve loopback client metadata when running locally", () => {
    vi.mocked(env.resolveSiteUrl).mockReturnValue("http://127.0.0.1:3000");
    const clientMetadata = buildClientMetadata();
    expect(clientMetadata.redirect_uris[0]).toEqual(
      "http://127.0.0.1:3000/oauth/callback",
    );
  });

  it("should resolve production client metadata when deployed to the cloud", () => {
    vi.mocked(env.resolveSiteUrl).mockReturnValue(
      "https://www.atproto-browser.dev",
    );
    const clientMetadata = buildClientMetadata();
    expect(clientMetadata).toMatchObject({
      client_id: "https://www.atproto-browser.dev/oauth-client-metadata.json",
      client_name: "atproto-browser.dev",
      redirect_uris: ["https://www.atproto-browser.dev/oauth/callback"],
      logo_uri: "https://www.atproto-browser.dev/favicon.ico",
      jwks_uri: "https://www.atproto-browser.dev/.well-known/jwks.json",
    });
  });
});
