import { parseKey } from "@/lib/keys";

export default function Multikey({ multikey }: { multikey: string }) {
  const { base, codec, keyLength } = parseKey(multikey);
  return (
    <div className="flex flex-col gap-1">
      <p>{multikey}</p>
      <div className="flex flex-row flex-wrap gap-2">
        <p className="bg-secondary text-foreground px-1.5 py-0.5 rounded-full text-xs">
          Base: {base}
        </p>
        <p className="bg-secondary text-foreground px-1.5 py-0.5 rounded-full text-xs">
          Codec: {codec}
        </p>
        <p className="bg-secondary text-foreground px-1.5 py-0.5 rounded-full text-xs">
          Key length: {keyLength}
        </p>
      </div>
    </div>
  );
}
