import { AtUri } from "@atproto/api";
import { join } from "lodash";
import { CID } from "multiformats/cid";

export function atUriToBrowserUri(uri: AtUri): string {
  const { host, collection, rkey } = uri;
  const segments = join([host, collection, rkey], "/");
  return `/at/${segments}`;
}

export function createBlobURL(cid: CID, did: string, pds: string): URL {
  const blobUrl = new URL(`/xrpc/com.atproto.sync.getBlob`, pds);
  blobUrl.searchParams.append("did", did);
  blobUrl.searchParams.append("cid", cid.toString());

  return blobUrl;
}
