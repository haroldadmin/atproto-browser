import RawRecord from "@/components/raw-record";
import { lexToJson } from "@atproto/lex-json";
import { LoaderCircleIcon } from "lucide-react";
import { Suspense } from "react";
import { RecordActionsMenu } from "@/components/record-actions-menu";
import { getDid } from "@/lib/auth/session";

type RecordViewerProps = {
  pds: string;
  did: string;
  collection: string;
  rkey: string;
  record: object;
};

export default async function RecordViewer({
  pds,
  did,
  collection,
  rkey,
  record,
}: RecordViewerProps) {
  const sessionDid = await getDid();

  return (
    <div className="border border-dashed rounded-md p-4 max-w-fit bg-[#0d1117]">
      <div className="relative">
        <div className="absolute right-0 top-0">
          <RecordActionsMenu
            pds={pds}
            did={did}
            collection={collection}
            rkey={rkey}
            record={lexToJson(record)}
            sessionDid={sessionDid}
          />
        </div>
        <Suspense fallback={<LoaderCircleIcon className="animate-spin" />}>
          <div className="max-w-8xl overflow-scroll ">
            <RawRecord record={record} did={did} pds={pds} />
          </div>
        </Suspense>
      </div>
    </div>
  );
}
