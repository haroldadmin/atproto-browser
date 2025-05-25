export const VERCEL_URL = process.env["VERCEL_URL"];

if (!VERCEL_URL) {
  throw new Error("VERCEL_URL is not set");
}

export const SITE_URL =
  process.env["VERCEL_TARGET_ENV"] === "production"
    ? "blog.haroldadmin.com"
    : VERCEL_URL;
