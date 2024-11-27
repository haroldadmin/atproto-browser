import { IdResolver, MemoryCache } from "@atproto/identity";
import { hoursToMilliseconds } from "date-fns/hoursToMilliseconds";
import { cache } from "react";

const oneHourMillis = hoursToMilliseconds(1);
const oneDayMillis = hoursToMilliseconds(24);

const resolver = new IdResolver({
  didCache: new MemoryCache(oneHourMillis, oneDayMillis),
});

export async function resolveDidDoc(str: string) {
  const resolvedDid = !isValidDid(str)
    ? await resolver.handle.resolve(str)
    : str;

  if (!resolvedDid) {
    return undefined;
  }

  const doc = await resolver.did.resolve(resolvedDid);
  if (!doc) {
    return undefined;
  }

  return doc;
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
