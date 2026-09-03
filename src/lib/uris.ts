import { AtUri } from "@atproto/api";
import { join } from "lodash";
import { CID } from "multiformats/cid";

export function atUriToBrowserUri(uri: AtUri): string {
  const { host, collection, rkey } = uri;
  const segments = [host, collection, rkey].filter(
    (s) => s.trim().length !== 0,
  );
  const path = join(segments, "/");
  return `/at/${path}`;
}

export function createBlobURL(cid: CID, did: string, pds: string): URL {
  const blobUrl = new URL(`/xrpc/com.atproto.sync.getBlob`, pds);
  blobUrl.searchParams.append("did", did);
  blobUrl.searchParams.append("cid", cid.toString());

  return blobUrl;
}
