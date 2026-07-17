import { DidDocument, IdResolver, MemoryCache } from "@atproto/identity";
import { cache } from "react";

const oneHourMillis = 1 * 60 * 60 * 1000;
const oneDayMillis = oneHourMillis * 24;

const resolver = new IdResolver({
  didCache: new MemoryCache(oneHourMillis, oneDayMillis),
});

/**
 * Resolves the given handle or DID to a DID document.
 *
 * If given a handle, resolves the handle to a DID first using DNS
 * resolution (TXT query to the _atproto.<handle> domain).
 *
 * Once a DID has been resolved, it fetches the corresponding DID
 * document from plc.directory (for did:plc) or from the well-known
 * DID endpoint (/well-known/did.json, for did:web).
 */
export async function resolveDidDoc(
  str: string,
): Promise<DidDocument | undefined> {
  const resolvedDid = !isValidDid(str)
    ? await resolver.handle.resolve(str)
    : str;

  if (!resolvedDid) {
    return undefined;
  }

  try {
    const doc = await resolver.did.resolve(resolvedDid);
    return doc ?? undefined;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export const cachedResolveDidDoc = cache(resolveDidDoc);

type DidParts = {
  prefix: string;
  method: string;
  id: string;
};

function resolveToParts(did: string): DidParts | undefined {
  const parts = did.split(":");
  if (parts.length !== 3) {
    return undefined;
  }

  const [prefix, method, id] = parts;

  return {
    prefix,
    method,
    id,
  };
}

function isValidDid(str: string): boolean {
  const parts = resolveToParts(str);
  if (!parts) {
    return false;
  }

  const { prefix, method } = parts;
  if (prefix !== "did") {
    return false;
  }

  if (method !== "web" && method !== "plc") {
    return false;
  }

  return true;
}
