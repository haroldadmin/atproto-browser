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
  resolveSiteUrlScheme,
  resolveVercelEnv,
} from "@/lib/env";
import { authDb } from "./database";

export const SCOPE = "atproto";
const SITE_URL = `${resolveSiteUrlScheme()}${resolveSiteUrl()}`;

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
    client_uri: SITE_URL,
    redirect_uris: [
      new URL("/oauth/callback", `https://${siteUrl}`).toString(),
    ],
    logo_uri: `${SITE_URL}/favicon.ico`,
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
      get: async (key: string) => {
        const row = await authDb()
          .selectFrom("auth_state")
          .select("value")
          .where("key", "=", key)
          .executeTakeFirst();

        if (!row) {
          return undefined;
        }

        return JSON.parse(row.value);
      },
      set: async (key: string, value: NodeSavedState) => {
        const valueJson = JSON.stringify(value);
        await authDb()
          .insertInto("auth_state")
          .values({ key, value: valueJson })
          .onConflict((oc) =>
            oc.column("key").doUpdateSet({ value: valueJson }),
          )
          .execute();
      },
      del: async (key: string) => {
        await authDb()
          .deleteFrom("auth_state")
          .where("key", "=", key)
          .execute();
      },
    },
    sessionStore: {
      get: async (key: string) => {
        const row = await authDb()
          .selectFrom("auth_session")
          .select("value")
          .where("key", "=", key)
          .executeTakeFirst();
        return row ? JSON.parse(row.value) : undefined;
      },
      set: async (key: string, value: NodeSavedSession) => {
        const valueJson = JSON.stringify(value);
        await authDb()
          .insertInto("auth_session")
          .values({ key, value: valueJson })
          .onConflict((oc) =>
            oc.column("key").doUpdateSet({ value: valueJson }),
          )
          .execute();
      },
      del: async (key: string) => {
        await authDb()
          .deleteFrom("auth_session")
          .where("key", "=", key)
          .execute();
      },
    },
  });

  return client;
}
