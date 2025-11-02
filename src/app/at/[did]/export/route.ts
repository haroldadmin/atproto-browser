import { Agent } from "@atproto/api";
import { getPds, DidResolver } from "@atproto/identity";
import type { NextRequest } from "next/server";
import { Temporal } from "temporal-polyfill";

/**
 * Returns the contents of a repository exported as a CAR file.
 */
export async function GET(
  _: NextRequest,
  context: { params: Promise<{ did: string }> },
) {
  const params = await context.params;

  const resolver = new DidResolver({});
  const did = await resolver.resolve(params.did);
  if (!did) {
    return new Response("Repository not found", { status: 404 });
  }

  const pdsUrl = getPds(did);
  if (!pdsUrl) {
    return new Response("Failed to infer PDS URL", { status: 500 });
  }

  const agent = new Agent(pdsUrl);
  const res = await agent.com.atproto.sync.getRepo({ did: did.id });
  if (!res.success) {
    return new Response("Failed to export repository", { status: 500 });
  }

  const now = Temporal.Now.plainDateTimeISO();
  const filename = `export-${did.id}-${now.toString()}.car`;

  return new Response(res.data, {
    headers: {
      "content-type": "application/vnd.ipld.car",
      "content-length": res.data.byteLength.toString(),
      "content-disposition": `attachment; filename=${filename}`,
    },
  });
}
