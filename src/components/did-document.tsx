import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DidDocument } from "@atproto/identity";
import { Fingerprint } from "lucide-react";
import Multikey from "./multikey";

export default function DIDDocument({
  didDocument,
}: {
  didDocument: DidDocument;
}) {
  return (
    <div>
      <h3 className="text-xl font-bold">DID Document</h3>
      <div className="space-y-4 my-2">
        <div>
          <Label className="font-semibold">ID</Label>
          <p className="font-mono mt-2">{didDocument.id}</p>
        </div>
        <div>
          <Label className="font-semibold">Identities</Label>
          <ul>
            {didDocument.alsoKnownAs?.map((identity) => (
              <li
                key={identity}
                className="flex flex-row items-center gap-2 mt-2"
              >
                <Fingerprint className="w-4 h-4" />
                <p className="font-mono">{identity}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Label>
            <strong>Verification methods</strong>
          </Label>
          <Table className="my-2">
            <TableHeader>
              <TableRow className="max-w-lg">
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Controller</TableHead>
                <TableHead>Public key multibase</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {didDocument.verificationMethod?.map((doc) => (
                <TableRow key={doc.id} className="max-w-lg">
                  <TableCell>{doc.id}</TableCell>
                  <TableCell>{doc.type}</TableCell>
                  <TableCell>{doc.controller}</TableCell>
                  {doc.publicKeyMultibase && (
                    <TableCell className="font-mono">
                      <Multikey multikey={doc.publicKeyMultibase} />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div>
          <Label className="font-semibold">Services</Label>
          <Table className="my-2">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Service endpoint</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {didDocument.service?.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>{service.id}</TableCell>
                  <TableCell>{service.type}</TableCell>
                  <TableCell>
                    {typeof service.serviceEndpoint === "string"
                      ? service.serviceEndpoint
                      : ""}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
