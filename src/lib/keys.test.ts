import { describe, expect, it } from "vitest";
import {
  inferKeyLength,
  inferMultibase,
  inferMulticodec,
  parseKey,
} from "./keys";
import { formatMultikey, Secp256k1Keypair } from "@atproto/crypto";

describe(inferMultibase.name, () => {
  it("should infer bases correctly", async () => {
    const key = await generateMultikey();
    const base = inferMultibase(key);
    expect(base?.name).toBe("base58btc");
  });
});

describe(inferMulticodec.name, () => {
  it("should infer the multicodec correctly", async () => {
    const key = await generateMultikey();
    const base = inferMultibase(key);
    expect(base?.decoder).toBeDefined();

    const codec = inferMulticodec(key, base!.decoder!);
    expect(codec).toBe("secp256k1-pub");
  });
});

describe(inferKeyLength, () => {
  it("should infer the key length correctly", async () => {
    const key = await generateMultikey();
    const base = inferMultibase(key);
    expect(base?.decoder).toBeDefined();

    // eslint-suppress-line @typescript-eslint/no-non-null-asserted-optional-chain
    const keyLength = inferKeyLength(key, base!.decoder!);
    expect(keyLength).toBe(33);
  });
});

describe(parseKey, () => {
  it("should infer key information correctly", async () => {
    const key = await generateMultikey();
    const { base, codec, keyLength } = parseKey(key);
    expect(base).toBe("base58btc");
    expect(codec).toBe("secp256k1-pub");
    expect(keyLength).toBe(33);
  });

  it("should throw for empty keys", () => {
    expect(() => parseKey("")).toThrowError("Malformed key");
  });
});

async function generateMultikey(): Promise<string> {
  const keypair = await Secp256k1Keypair.create();
  const publicKeyBytes = keypair.publicKeyBytes();
  return formatMultikey("ES256K", publicKeyBytes);
}
