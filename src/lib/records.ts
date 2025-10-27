import { Agent, AppBskyActorProfile } from "@atproto/api";
import { DidDocument } from "@atproto/identity";
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

export function extractPDSUrl(didDoc: DidDocument): string | undefined {
  const pdsService = didDoc.service?.find(
    (service) => service.id === "#atproto_pds",
  );
  return pdsService?.serviceEndpoint as string;
}

async function fetchProfile(did: string, pds: string) {
  const agent = new Agent(pds);
  const { data } = await agent.com.atproto.repo.getRecord({
    repo: did,
    collection: "app.bsky.actor.profile",
    rkey: "self",
  });

  return data.value as AppBskyActorProfile.Record;
}

export const cachedFetchProfile = cache(fetchProfile);
