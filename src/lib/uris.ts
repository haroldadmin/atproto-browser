import { AtUri } from "@atproto/api";
import { join } from "lodash";

export function atUriToBrowserUri(uri: AtUri): string {
  const { host, collection, rkey } = uri;
  const segments = join([host, collection, rkey], "/");
  return `/at/${segments}`;
}
