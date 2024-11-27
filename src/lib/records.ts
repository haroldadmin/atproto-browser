import { Agent } from "@atproto/api";
import { DidDocument } from "@atproto/identity";
import { cache } from "react";

export type FetchCollectionsParams = {
  did: string;
  pds: string;
};

export async function fetchCollections({ did, pds }: FetchCollectionsParams) {
  const agent = new Agent(pds);
  const { data } = await agent.com.atproto.repo.describeRepo({
    repo: did,
  });

  return data.collections;
}

export const cachedFetchCollections = cache(fetchCollections);

export type FetchRecordsParams = {
  did: string;
  collection: string;
  pds: string;
};

export async function fetchRecords({
  did,
  collection,
  pds,
}: FetchRecordsParams) {
  const agent = new Agent(pds);
  const { data } = await agent.com.atproto.repo.listRecords({
    repo: did,
    collection,
  });

  return data.records;
}

export type FetchRecordParams = {
  did: string;
  collection: string;
  rkey: string;
  pds: string;
};

export async function fetchRecord({
  did,
  collection,
  rkey,
  pds,
}: FetchRecordParams) {
  const agent = new Agent(pds);
  const { data } = await agent.com.atproto.repo.getRecord({
    repo: did,
    collection,
    rkey,
  });

  return data;
}

export const cachedFetchRecord = cache(fetchRecord);

export function extractPDSUrl(didDoc: DidDocument): string | undefined {
  const pdsService = didDoc.service?.find(
    (service) => service.id === "#atproto_pds"
  );
  return pdsService?.serviceEndpoint as string;
}
