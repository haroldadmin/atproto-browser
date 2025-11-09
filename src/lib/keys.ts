import { bases, varint } from "multiformats/basics";
import { MultibaseDecoder } from "multiformats/bases/interface";
import assert from "node:assert";
import { MulticodecsReference } from "./multiformat-reference";

export type KeyInformation = {
  base: string;
  codec: string;
  keyLength: number;
};

/**
 * Given a multikey, returns the parsed base
 * used to create the key.
 */
export function parseKey(key: string): KeyInformation {
  assert(key.length > 0, "Malformed key");

  const base = inferMultibase(key);
  assert(base, "Could not infer multibase information for key");

  const codec = inferMulticodec(key, base);
  assert(codec, "Could not infer multicodec information for key");

  const keyLength = inferKeyLength(key, base);

  return {
    base: base.name,
    codec,
    keyLength,
  };
}

/**
 * Given a multikey string, returns the multibase
 * encoding used to encode the key.
 *
 * For ATProto multikeys, this should return `base58btc`.
 */
export function inferMultibase(key: string) {
  for (const base of Object.values(bases)) {
    if (key.charAt(0) === base.prefix) {
      return base;
    }
  }

  return undefined;
}

/**
 * Given a multikey string, returns the multicodec
 * used to encode the key.
 *
 * For ATProto multikeys, this should return one of
 * the algorithms supported by the protocol (secp256k1-pub,
 * or p256-pub)
 */
export function inferMulticodec(key: string, codec: MultibaseDecoder<string>) {
  const multikeyBytes = codec.decode(key);
  const [codecCode] = varint.decode(multikeyBytes);
  for (const [name, codec] of Object.entries(MulticodecsReference)) {
    if (codec.code === codecCode) {
      return name;
    }
  }

  return undefined;
}

/**
 * Given a multikey string, returns the length of the
 * key (in bytes) after removing the multibase and
 * multicodec prefixes.
 *
 * For ATProto keys that use the secp256k1-pub codec,
 * this should return 33 (for compressed keys).
 */
export function inferKeyLength(
  key: string,
  codec: MultibaseDecoder<string>,
): number {
  const multikeyBytes = codec.decode(key);

  const [_, codecLength] = varint.decode(multikeyBytes);
  const keyBytes = multikeyBytes.subarray(codecLength);
  return keyBytes.byteLength;
}
