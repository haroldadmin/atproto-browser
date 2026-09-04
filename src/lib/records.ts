import { Agent, AppBskyActorProfile, jsonToLex, lexToJson } from "@atproto/api";
import { cache } from "react";
import { cacheLife, cacheTag } from "next/cache";

type FetchCollectionsParams = {
  did: string;
  pds: string;
};

async function fetchCollections({ did, pds }: FetchCollectionsParams) {
  "use cache";
  cacheLife("minutes");
  cacheTag("collections", did);

  try {
    const agent = new Agent(pds);
    const { data } = await agent.com.atproto.repo.describeRepo({
      repo: did,
    });

    return data.collections;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export const cachedFetchCollections = cache(fetchCollections);

type FetchRecordParams = {
  did: string;
  collection: string;
  rkey: string;
  pds: string;
};

async function fetchRecord({ did, collection, rkey, pds }: FetchRecordParams) {
  "use cache";
  cacheLife("minutes");
  cacheTag("record", did, `${did}/${collection}/${rkey}`);

  try {
    const agent = new Agent(pds);
    const { data } = await agent.com.atproto.repo.getRecord({
      repo: did,
      collection,
      rkey,
    });

    return {
      uri: data.uri,
      cid: data.cid,
      value: lexToJson(data.value),
    };
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export const cachedFetchRecord = cache(async (params: FetchRecordParams) => {
  const record = await fetchRecord(params);
  if (!record) {
    return undefined;
  }

  return {
    uri: record.uri,
    cid: record.cid,
    value: jsonToLex(record.value),
  };
});

async function fetchProfileRecord(did: string, pds: string) {
  "use cache";
  cacheLife("hours");
  cacheTag("profile", did);

  try {
    const agent = new Agent(pds);
    const { data } = await agent.com.atproto.repo.getRecord({
      repo: did,
      collection: "app.bsky.actor.profile",
      rkey: "self",
    });

    return lexToJson(data.value);
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export const cachedFetchProfile = cache(async (did: string, pds: string) => {
  const value = await fetchProfileRecord(did, pds);
  if (!value) {
    throw new Error(`Could not fetch profile record for ${did}`);
  }

  const lex = jsonToLex(value);
  if (!AppBskyActorProfile.isRecord(lex)) {
    throw new Error(`Invalid profile record for ${did}`);
  }

  const validationResult = AppBskyActorProfile.validateRecord(lex);
  if (!validationResult.success) {
    throw new Error(`Malformed profile record for ${did}`);
  }

  return validationResult.value;
});
