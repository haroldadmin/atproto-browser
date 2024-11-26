import { Agent } from "@atproto/api";
import { DidDocument } from "@atproto/identity";

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

export function extractPDSUrl(didDoc: DidDocument): string | undefined {
  const pdsService = didDoc.service?.find(
    (service) => service.id === "#atproto_pds"
  );
  return pdsService?.serviceEndpoint as string;
}
