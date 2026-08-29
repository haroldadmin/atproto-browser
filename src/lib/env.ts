function env(name: string): string | undefined {
  const value = process.env[name];
  return value;
}

function envOrThrow(name: string): string {
  const value = env(name);
  if (value === undefined) {
    throw new Error(`Environment variable ${name} is not defined`);
  }

  return value;
}

export function resolveSiteUrl() {
  const vercel = env("VERCEL");
  if (!vercel) {
    return "127.0.0.1:3000";
  }

  const vercelEnv = envOrThrow("VERCEL_ENV");
  switch (vercelEnv) {
    case "production":
      return "www.atproto-browser.dev";
    case "preview":
      return envOrThrow("NEXT_PUBLIC_VERCEL_URL");
    case "development":
    default:
      return "127.0.0.1:3000";
  }
}
