function env(name: string): string | undefined {
  const value = process.env[name];
  return value;
}

export function envOrThrow(name: string): string {
  const value = env(name);
  if (value === undefined) {
    throw new Error(`Environment variable ${name} is not defined`);
  }

  return value;
}

type VercelEnv = "development" | "preview" | "production";

export function resolveVercelEnv(): VercelEnv | undefined {
  const vercelEnv = env("VERCEL_ENV");
  if (!vercelEnv) {
    return undefined;
  }

  if (
    vercelEnv !== "production" &&
    vercelEnv !== "preview" &&
    vercelEnv !== "development"
  ) {
    throw new Error(`Unknown vercel environment: ${vercelEnv}`);
  }

  return vercelEnv;
}

export function resolveSiteUrl(): string {
  const vercel = env("VERCEL");
  if (!vercel) {
    return `http://127.0.0.1:3000`;
  }

  const vercelEnv = envOrThrow("VERCEL_ENV");
  switch (vercelEnv) {
    case "production":
      return `https://www.atproto-browser.dev`;
    case "preview":
      const url = envOrThrow("VERCEL_URL");
      return `https://${url}`;
    case "development":
    default:
      return `http://127.0.0.1:3000`;
  }
}

export function resolveOauthPrivateKey(): string {
  return envOrThrow("ATPROTO_OAUTH_PRIVATE_KEY");
}
