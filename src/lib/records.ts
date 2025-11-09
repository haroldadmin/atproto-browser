import { Agent, AppBskyActorProfile } from "@atproto/api";
import { cache } from "react";

type FetchCollectionsParams = {
  did: string;
  pds: string;
};

async function fetchCollections({ did, pds }: FetchCollectionsParams) {
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

type FetchRecordsParams = {
  did: string;
  collection: string;
  pds: string;
  cursor?: string;
};

async function fetchRecords({
  did,
  collection,
  pds,
  cursor,
}: FetchRecordsParams) {
  try {
    const agent = new Agent(pds);
    const { data } = await agent.com.atproto.repo.listRecords({
      repo: did,
      collection,
      cursor,
    });

    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export const cachedFetchRecords = cache(fetchRecords);

type FetchRecordParams = {
  did: string;
  collection: string;
  rkey: string;
  pds: string;
};

async function fetchRecord({ did, collection, rkey, pds }: FetchRecordParams) {
  try {
    const agent = new Agent(pds);
    const { data } = await agent.com.atproto.repo.getRecord({
      repo: did,
      collection,
      rkey,
    });

    return data;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

export const cachedFetchRecord = cache(fetchRecord);

async function fetchProfile(did: string, pds: string) {
  const agent = new Agent(pds);
  const { data } = await agent.com.atproto.repo.getRecord({
    repo: did,
    collection: "app.bsky.actor.profile",
    rkey: "self",
  });

  if (!AppBskyActorProfile.isRecord(data.value)) {
    throw new Error(`Invalid profile record for ${did}`);
  }

  const validationResult = AppBskyActorProfile.validateRecord(data.value);
  if (!validationResult.success) {
    throw new Error(`Malformed profile record for ${did}`);
  }

  return validationResult.value;
}

export const cachedFetchProfile = cache(fetchProfile);
