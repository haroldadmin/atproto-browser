import { describe, it, expect, vi, beforeEach } from "vitest";
import { resolveSiteUrl } from "./env";

beforeEach(() => {
  vi.resetAllMocks();
  vi.unstubAllEnvs();
});

describe(resolveSiteUrl, () => {
  it("should return localhost when not running on the cloud", () => {
    const siteUrl = resolveSiteUrl();
    expect(siteUrl).toEqual("http://127.0.0.1:3000");
  });

  it("should return localhost with the correct port when not running on the cloud", () => {
    vi.stubEnv("PORT", "5000");
    const siteUrl = resolveSiteUrl();
    expect(siteUrl).toEqual("http://127.0.0.1:5000");
  });

  it("should return localhost when running locally with Vercel CLI", () => {
    vi.stubEnv("VERCEL", "1");
    vi.stubEnv("VERCEL_ENV", "development");
    vi.stubEnv("PORT", "3001");

    const siteUrl = resolveSiteUrl();
    expect(siteUrl).toEqual("http://127.0.0.1:3001");
  });

  it("should return the preview deployment URL when running in preview env", () => {
    vi.stubEnv("VERCEL", "1");
    vi.stubEnv("VERCEL_ENV", "preview");
    vi.stubEnv("VERCEL_URL", "preview.vercel.app");

    const siteUrl = resolveSiteUrl();
    expect(siteUrl).toEqual("https://preview.vercel.app");
  });

  it("should return the production URL when running in production", () => {
    vi.stubEnv("VERCEL", "1");
    vi.stubEnv("VERCEL_ENV", "production");

    const siteUrl = resolveSiteUrl();
    expect(siteUrl).toEqual("https://www.atproto-browser.dev");
  });
});
