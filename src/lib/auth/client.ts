import {
  NodeOAuthClient,
  Keyset,
  JoseKey,
  buildAtprotoLoopbackClientMetadata,
} from "@atproto/oauth-client-node";
import type {
  NodeSavedSession,
  NodeSavedState,
  OAuthClientMetadataInput,
} from "@atproto/oauth-client-node";
import {
  resolveOauthPrivateKey,
  resolveSiteUrl,
  resolveVercelEnv,
} from "@/lib/env";

export const SCOPE = "atproto";

const globalAuth = globalThis as unknown as {
  stateStore: Map<string, NodeSavedState>;
  sessionStore: Map<string, NodeSavedSession>;
};

globalAuth.stateStore ??= new Map();
globalAuth.sessionStore ??= new Map();

let client: NodeOAuthClient | null = null;

export function buildClientMetadata(): OAuthClientMetadataInput {
  const vercelEnv = resolveVercelEnv();
  const siteUrl = resolveSiteUrl();

  if (!vercelEnv || vercelEnv == "development") {
    return buildAtprotoLoopbackClientMetadata({
      scope: SCOPE,
      redirect_uris: ["http://127.0.0.1:3000/oauth/callback"],
    });
  }

  return {
    client_id: new URL(
      "oauth-client-metadata.json",
      `https://${siteUrl}`,
    ).toString(),
    client_name: "atproto-browser.dev",
    client_uri: `https://${siteUrl}`,
    redirect_uris: [
      new URL("/oauth/callback", `https://${siteUrl}`).toString(),
    ],
    grant_types: ["authorization_code", "refresh_token"],
    response_types: ["code"],
    scope: SCOPE,
    token_endpoint_auth_method: "private_key_jwt",
    token_endpoint_auth_signing_alg: "ES256",
    jwks_uri: new URL(
      "/.well-known/jwks.json",
      `https://${siteUrl}`,
    ).toString(),
    dpop_bound_access_tokens: true,
  };
}

async function buildKeyset(): Promise<Keyset | undefined> {
  const vercelEnv = resolveVercelEnv();
  if (!vercelEnv || vercelEnv == "development") {
    return undefined;
  }

  const privateKey = resolveOauthPrivateKey();
  return new Keyset([await JoseKey.fromJWK(JSON.parse(privateKey))]);
}

export async function getOAuthClient(): Promise<NodeOAuthClient> {
  if (client) {
    return client;
  }

  client = new NodeOAuthClient({
    clientMetadata: buildClientMetadata(),
    keyset: await buildKeyset(),
    stateStore: {
      async get(key: string) {
        return globalAuth.stateStore.get(key);
      },
      async set(key: string, value: NodeSavedState) {
        globalAuth.stateStore.set(key, value);
      },
      async del(key: string) {
        globalAuth.stateStore.delete(key);
      },
    },

    sessionStore: {
      async get(key: string) {
        return globalAuth.sessionStore.get(key);
      },
      async set(key: string, value: NodeSavedSession) {
        globalAuth.sessionStore.set(key, value);
      },
      async del(key: string) {
        globalAuth.sessionStore.delete(key);
      },
    },
  });

  return client;
}
