import { DidResolver, IdResolver, MemoryCache } from "@atproto/identity";
import { hoursToMilliseconds } from "date-fns/hoursToMilliseconds";

const oneHourMillis = hoursToMilliseconds(1);
const oneDayMillis = hoursToMilliseconds(24);

const resolver = new IdResolver({
  didCache: new MemoryCache(oneHourMillis, oneDayMillis),
});

export async function resolveDidDoc(str: string) {
  if (isValidDid(str)) {
    return fetchDidDoc(str, resolver.did);
  }

  const resolvedDid = await resolver.handle.resolve(str);
  if (!resolvedDid) {
    return undefined;
  }

  return fetchDidDoc(resolvedDid, resolver.did);
}

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

async function fetchDidDoc(did: string, resolver: DidResolver) {
  const doc = await resolver.resolve(did);
  if (!doc) {
    throw new Error("Could not resolve did");
  }

  return doc;
}
