/**
 * Multicodec reference table data.
 * @see https://github.com/multiformats/multicodec/blob/0c6c7d75f1580af329847dbc9900859a445ed980/table.csv
 */
export const MulticodecsReference = {
  identity: {
    tag: "multihash",
    code: 0x00,
    status: "permanent",
  },
  cidv1: {
    tag: "cid",
    code: 0x01,
    status: "permanent",
  },
  cidv2: {
    tag: "cid",
    code: 0x02,
    status: "draft",
  },
  cidv3: {
    tag: "cid",
    code: 0x03,
    status: "draft",
  },
  ip4: {
    tag: "multiaddr",
    code: 0x04,
    status: "permanent",
  },
  tcp: {
    tag: "multiaddr",
    code: 0x06,
    status: "permanent",
  },
  sha1: {
    tag: "multihash",
    code: 0x11,
    status: "permanent",
  },
  "sha2-256": {
    tag: "multihash",
    code: 0x12,
    status: "permanent",
  },
  "sha2-512": {
    tag: "multihash",
    code: 0x13,
    status: "permanent",
  },
  "sha3-512": {
    tag: "multihash",
    code: 0x14,
    status: "permanent",
  },
  "sha3-384": {
    tag: "multihash",
    code: 0x15,
    status: "permanent",
  },
  "sha3-256": {
    tag: "multihash",
    code: 0x16,
    status: "permanent",
  },
  "sha3-224": {
    tag: "multihash",
    code: 0x17,
    status: "permanent",
  },
  "shake-128": {
    tag: "multihash",
    code: 0x18,
    status: "draft",
  },
  "shake-256": {
    tag: "multihash",
    code: 0x19,
    status: "draft",
  },
  "keccak-224": {
    tag: "multihash",
    code: 0x1a,
    status: "draft",
  },
  "keccak-256": {
    tag: "multihash",
    code: 0x1b,
    status: "draft",
  },
  "keccak-384": {
    tag: "multihash",
    code: 0x1c,
    status: "draft",
  },
  "keccak-512": {
    tag: "multihash",
    code: 0x1d,
    status: "draft",
  },
  blake3: {
    tag: "multihash",
    code: 0x1e,
    status: "draft",
  },
  "sha2-384": {
    tag: "multihash",
    code: 0x20,
    status: "permanent",
  },
  dccp: {
    tag: "multiaddr",
    code: 0x21,
    status: "draft",
  },
  "murmur3-x64-64": {
    tag: "hash",
    code: 0x22,
    status: "permanent",
  },
  "murmur3-32": {
    tag: "hash",
    code: 0x23,
    status: "draft",
  },
  ip6: {
    tag: "multiaddr",
    code: 0x29,
    status: "permanent",
  },
  ip6zone: {
    tag: "multiaddr",
    code: 0x2a,
    status: "draft",
  },
  ipcidr: {
    tag: "multiaddr",
    code: 0x2b,
    status: "draft",
  },
  path: {
    tag: "namespace",
    code: 0x2f,
    status: "permanent",
  },
  multicodec: {
    tag: "multiformat",
    code: 0x30,
    status: "draft",
  },
  multihash: {
    tag: "multiformat",
    code: 0x31,
    status: "draft",
  },
  multiaddr: {
    tag: "multiformat",
    code: 0x32,
    status: "draft",
  },
  multibase: {
    tag: "multiformat",
    code: 0x33,
    status: "draft",
  },
  varsig: {
    tag: "multiformat",
    code: 0x34,
    status: "draft",
  },
  dns: {
    tag: "multiaddr",
    code: 0x35,
    status: "permanent",
  },
  dns4: {
    tag: "multiaddr",
    code: 0x36,
    status: "permanent",
  },
  dns6: {
    tag: "multiaddr",
    code: 0x37,
    status: "permanent",
  },
  dnsaddr: {
    tag: "multiaddr",
    code: 0x38,
    status: "permanent",
  },
  protobuf: {
    tag: "serialization",
    code: 0x50,
    status: "draft",
  },
  cbor: {
    tag: "ipld",
    code: 0x51,
    status: "permanent",
  },
  raw: {
    tag: "ipld",
    code: 0x55,
    status: "permanent",
  },
  "dbl-sha2-256": {
    tag: "multihash",
    code: 0x56,
    status: "draft",
  },
  rlp: {
    tag: "serialization",
    code: 0x60,
    status: "draft",
  },
  bencode: {
    tag: "serialization",
    code: 0x63,
    status: "draft",
  },
  "dag-pb": {
    tag: "ipld",
    code: 0x70,
    status: "permanent",
  },
  "dag-cbor": {
    tag: "ipld",
    code: 0x71,
    status: "permanent",
  },
  "libp2p-key": {
    tag: "ipld",
    code: 0x72,
    status: "permanent",
  },
  "git-raw": {
    tag: "ipld",
    code: 0x78,
    status: "permanent",
  },
  "torrent-info": {
    tag: "ipld",
    code: 0x7b,
    status: "draft",
  },
  "torrent-file": {
    tag: "ipld",
    code: 0x7c,
    status: "draft",
  },
  "blake3-hashseq": {
    tag: "ipld",
    code: 0x80,
    status: "draft",
  },
  "leofcoin-block": {
    tag: "ipld",
    code: 0x81,
    status: "draft",
  },
  "leofcoin-tx": {
    tag: "ipld",
    code: 0x82,
    status: "draft",
  },
  "leofcoin-pr": {
    tag: "ipld",
    code: 0x83,
    status: "draft",
  },
  sctp: {
    tag: "multiaddr",
    code: 0x84,
    status: "draft",
  },
  "dag-jose": {
    tag: "ipld",
    code: 0x85,
    status: "draft",
  },
  "dag-cose": {
    tag: "ipld",
    code: 0x86,
    status: "draft",
  },
  lbry: {
    tag: "namespace",
    code: 0x8c,
    status: "draft",
  },
  "eth-block": {
    tag: "ipld",
    code: 0x90,
    status: "permanent",
  },
  "eth-block-list": {
    tag: "ipld",
    code: 0x91,
    status: "permanent",
  },
  "eth-tx-trie": {
    tag: "ipld",
    code: 0x92,
    status: "permanent",
  },
  "eth-tx": {
    tag: "ipld",
    code: 0x93,
    status: "permanent",
  },
  "eth-tx-receipt-trie": {
    tag: "ipld",
    code: 0x94,
    status: "permanent",
  },
  "eth-tx-receipt": {
    tag: "ipld",
    code: 0x95,
    status: "permanent",
  },
  "eth-state-trie": {
    tag: "ipld",
    code: 0x96,
    status: "permanent",
  },
  "eth-account-snapshot": {
    tag: "ipld",
    code: 0x97,
    status: "permanent",
  },
  "eth-storage-trie": {
    tag: "ipld",
    code: 0x98,
    status: "permanent",
  },
  "eth-receipt-log-trie": {
    tag: "ipld",
    code: 0x99,
    status: "draft",
  },
  "eth-receipt-log": {
    tag: "ipld",
    code: 0x9a,
    status: "draft",
  },
  "aes-128": {
    tag: "key",
    code: 0xa0,
    status: "draft",
  },
  "aes-192": {
    tag: "key",
    code: 0xa1,
    status: "draft",
  },
  "aes-256": {
    tag: "key",
    code: 0xa2,
    status: "draft",
  },
  "chacha-128": {
    tag: "key",
    code: 0xa3,
    status: "draft",
  },
  "chacha-256": {
    tag: "key",
    code: 0xa4,
    status: "draft",
  },
  "bitcoin-block": {
    tag: "ipld",
    code: 0xb0,
    status: "permanent",
  },
  "bitcoin-tx": {
    tag: "ipld",
    code: 0xb1,
    status: "permanent",
  },
  "bitcoin-witness-commitment": {
    tag: "ipld",
    code: 0xb2,
    status: "permanent",
  },
  "zcash-block": {
    tag: "ipld",
    code: 0xc0,
    status: "permanent",
  },
  "zcash-tx": {
    tag: "ipld",
    code: 0xc1,
    status: "permanent",
  },
  "caip-50": {
    tag: "multiformat",
    code: 0xca,
    status: "draft",
  },
  streamid: {
    tag: "namespace",
    code: 0xce,
    status: "draft",
  },
  "stellar-block": {
    tag: "ipld",
    code: 0xd0,
    status: "draft",
  },
  "stellar-tx": {
    tag: "ipld",
    code: 0xd1,
    status: "draft",
  },
  md4: {
    tag: "multihash",
    code: 0xd4,
    status: "draft",
  },
  md5: {
    tag: "multihash",
    code: 0xd5,
    status: "draft",
  },
  "decred-block": {
    tag: "ipld",
    code: 0xe0,
    status: "draft",
  },
  "decred-tx": {
    tag: "ipld",
    code: 0xe1,
    status: "draft",
  },
  ipld: {
    tag: "namespace",
    code: 0xe2,
    status: "draft",
  },
  ipfs: {
    tag: "namespace",
    code: 0xe3,
    status: "draft",
  },
  swarm: {
    tag: "namespace",
    code: 0xe4,
    status: "draft",
  },
  ipns: {
    tag: "namespace",
    code: 0xe5,
    status: "draft",
  },
  zeronet: {
    tag: "namespace",
    code: 0xe6,
    status: "draft",
  },
  "secp256k1-pub": {
    tag: "key",
    code: 0xe7,
    status: "draft",
  },
  dnslink: {
    tag: "namespace",
    code: 0xe8,
    status: "permanent",
  },
  "bls12_381-g1-pub": {
    tag: "key",
    code: 0xea,
    status: "draft",
  },
  "bls12_381-g2-pub": {
    tag: "key",
    code: 0xeb,
    status: "draft",
  },
  "x25519-pub": {
    tag: "key",
    code: 0xec,
    status: "draft",
  },
  "ed25519-pub": {
    tag: "key",
    code: 0xed,
    status: "draft",
  },
  "bls12_381-g1g2-pub": {
    tag: "key",
    code: 0xee,
    status: "draft",
  },
  "sr25519-pub": {
    tag: "key",
    code: 0xef,
    status: "draft",
  },
  "dash-block": {
    tag: "ipld",
    code: 0xf0,
    status: "draft",
  },
  "dash-tx": {
    tag: "ipld",
    code: 0xf1,
    status: "draft",
  },
  "swarm-manifest": {
    tag: "ipld",
    code: 0xfa,
    status: "draft",
  },
  "swarm-feed": {
    tag: "ipld",
    code: 0xfb,
    status: "draft",
  },
  beeson: {
    tag: "ipld",
    code: 0xfc,
    status: "draft",
  },
  udp: {
    tag: "multiaddr",
    code: 0x0111,
    status: "draft",
  },
  "p2p-webrtc-star": {
    tag: "multiaddr",
    code: 0x0113,
    status: "deprecated",
  },
  "p2p-webrtc-direct": {
    tag: "multiaddr",
    code: 0x0114,
    status: "deprecated",
  },
  "p2p-stardust": {
    tag: "multiaddr",
    code: 0x0115,
    status: "deprecated",
  },
  "webrtc-direct": {
    tag: "multiaddr",
    code: 0x0118,
    status: "draft",
  },
  webrtc: {
    tag: "multiaddr",
    code: 0x0119,
    status: "draft",
  },
  "p2p-circuit": {
    tag: "multiaddr",
    code: 0x0122,
    status: "permanent",
  },
  "dag-json": {
    tag: "ipld",
    code: 0x0129,
    status: "permanent",
  },
  udt: {
    tag: "multiaddr",
    code: 0x012d,
    status: "draft",
  },
  utp: {
    tag: "multiaddr",
    code: 0x012e,
    status: "draft",
  },
  crc32: {
    tag: "hash",
    code: 0x0132,
    status: "draft",
  },
  "crc64-ecma": {
    tag: "hash",
    code: 0x0164,
    status: "draft",
  },
  "crc64-nvme": {
    tag: "hash",
    code: 0x0165,
    status: "draft",
  },
  unix: {
    tag: "multiaddr",
    code: 0x0190,
    status: "permanent",
  },
  thread: {
    tag: "multiaddr",
    code: 0x0196,
    status: "draft",
  },
  p2p: {
    tag: "multiaddr",
    code: 0x01a5,
    status: "permanent",
  },
  https: {
    tag: "multiaddr",
    code: 0x01bb,
    status: "draft",
  },
  onion: {
    tag: "multiaddr",
    code: 0x01bc,
    status: "draft",
  },
  onion3: {
    tag: "multiaddr",
    code: 0x01bd,
    status: "draft",
  },
  garlic64: {
    tag: "multiaddr",
    code: 0x01be,
    status: "draft",
  },
  garlic32: {
    tag: "multiaddr",
    code: 0x01bf,
    status: "draft",
  },
  tls: {
    tag: "multiaddr",
    code: 0x01c0,
    status: "draft",
  },
  sni: {
    tag: "multiaddr",
    code: 0x01c1,
    status: "draft",
  },
  noise: {
    tag: "multiaddr",
    code: 0x01c6,
    status: "draft",
  },
  shs: {
    tag: "multiaddr",
    code: 0x01c8,
    status: "draft",
  },
  quic: {
    tag: "multiaddr",
    code: 0x01cc,
    status: "permanent",
  },
  "quic-v1": {
    tag: "multiaddr",
    code: 0x01cd,
    status: "permanent",
  },
  webtransport: {
    tag: "multiaddr",
    code: 0x01d1,
    status: "draft",
  },
  certhash: {
    tag: "multiaddr",
    code: 0x01d2,
    status: "draft",
  },
  ws: {
    tag: "multiaddr",
    code: 0x01dd,
    status: "permanent",
  },
  wss: {
    tag: "multiaddr",
    code: 0x01de,
    status: "permanent",
  },
  "p2p-websocket-star": {
    tag: "multiaddr",
    code: 0x01df,
    status: "permanent",
  },
  http: {
    tag: "multiaddr",
    code: 0x01e0,
    status: "draft",
  },
  "http-path": {
    tag: "multiaddr",
    code: 0x01e1,
    status: "draft",
  },
  "swhid-1-snp": {
    tag: "ipld",
    code: 0x01f0,
    status: "draft",
  },
  json: {
    tag: "ipld",
    code: 0x0200,
    status: "permanent",
  },
  messagepack: {
    tag: "serialization",
    code: 0x0201,
    status: "draft",
  },
  car: {
    tag: "serialization",
    code: 0x0202,
    status: "draft",
  },
  "x509-certificate": {
    tag: "serialization",
    code: 0x0210,
    status: "draft",
  },
  "ipns-record": {
    tag: "serialization",
    code: 0x0300,
    status: "permanent",
  },
  "libp2p-peer-record": {
    tag: "libp2p",
    code: 0x0301,
    status: "permanent",
  },
  "libp2p-relay-rsvp": {
    tag: "libp2p",
    code: 0x0302,
    status: "permanent",
  },
  memorytransport: {
    tag: "libp2p",
    code: 0x0309,
    status: "permanent",
  },
  "car-index-sorted": {
    tag: "serialization",
    code: 0x0400,
    status: "draft",
  },
  "car-multihash-index-sorted": {
    tag: "serialization",
    code: 0x0401,
    status: "draft",
  },
  "transport-bitswap": {
    tag: "transport",
    code: 0x0900,
    status: "draft",
  },
  "transport-graphsync-filecoinv1": {
    tag: "transport",
    code: 0x0910,
    status: "draft",
  },
  "transport-ipfs-gateway-http": {
    tag: "transport",
    code: 0x0920,
    status: "draft",
  },
  "transport-filecoin-piece-http": {
    tag: "transport",
    code: 0x0930,
    status: "draft",
  },
  multidid: {
    tag: "multiformat",
    code: 0x0d1d,
    status: "draft",
  },
  "fr32-sha256-trunc254-padbintree": {
    tag: "multihash",
    code: 0x1011,
    status: "draft",
  },
  "sha2-256-trunc254-padded": {
    tag: "multihash",
    code: 0x1012,
    status: "permanent",
  },
  "sha2-224": {
    tag: "multihash",
    code: 0x1013,
    status: "permanent",
  },
  "sha2-512-224": {
    tag: "multihash",
    code: 0x1014,
    status: "permanent",
  },
  "sha2-512-256": {
    tag: "multihash",
    code: 0x1015,
    status: "permanent",
  },
  "murmur3-x64-128": {
    tag: "hash",
    code: 0x1022,
    status: "draft",
  },
  "ripemd-128": {
    tag: "multihash",
    code: 0x1052,
    status: "draft",
  },
  "ripemd-160": {
    tag: "multihash",
    code: 0x1053,
    status: "draft",
  },
  "ripemd-256": {
    tag: "multihash",
    code: 0x1054,
    status: "draft",
  },
  "ripemd-320": {
    tag: "multihash",
    code: 0x1055,
    status: "draft",
  },
  x11: {
    tag: "multihash",
    code: 0x1100,
    status: "draft",
  },
  "p256-pub": {
    tag: "key",
    code: 0x1200,
    status: "draft",
  },
  "p384-pub": {
    tag: "key",
    code: 0x1201,
    status: "draft",
  },
  "p521-pub": {
    tag: "key",
    code: 0x1202,
    status: "draft",
  },
  "ed448-pub": {
    tag: "key",
    code: 0x1203,
    status: "draft",
  },
  "x448-pub": {
    tag: "key",
    code: 0x1204,
    status: "draft",
  },
  "rsa-pub": {
    tag: "key",
    code: 0x1205,
    status: "draft",
  },
  "sm2-pub": {
    tag: "key",
    code: 0x1206,
    status: "draft",
  },
  vlad: {
    tag: "vlad",
    code: 0x1207,
    status: "draft",
  },
  "provenance-log": {
    tag: "serialization",
    code: 0x1208,
    status: "draft",
  },
  "provenance-log-entry": {
    tag: "serialization",
    code: 0x1209,
    status: "draft",
  },
  "provenance-log-script": {
    tag: "serialization",
    code: 0x120a,
    status: "draft",
  },
  "mlkem-512-pub": {
    tag: "key",
    code: 0x120b,
    status: "draft",
  },
  "mlkem-768-pub": {
    tag: "key",
    code: 0x120c,
    status: "draft",
  },
  "mlkem-1024-pub": {
    tag: "key",
    code: 0x120d,
    status: "draft",
  },
  multisig: {
    tag: "multiformat",
    code: 0x1239,
    status: "draft",
  },
  multikey: {
    tag: "multiformat",
    code: 0x123a,
    status: "draft",
  },
  nonce: {
    tag: "nonce",
    code: 0x123b,
    status: "draft",
  },
  "ed25519-priv": {
    tag: "key",
    code: 0x1300,
    status: "draft",
  },
  "secp256k1-priv": {
    tag: "key",
    code: 0x1301,
    status: "draft",
  },
  "x25519-priv": {
    tag: "key",
    code: 0x1302,
    status: "draft",
  },
  "sr25519-priv": {
    tag: "key",
    code: 0x1303,
    status: "draft",
  },
  "rsa-priv": {
    tag: "key",
    code: 0x1305,
    status: "draft",
  },
  "p256-priv": {
    tag: "key",
    code: 0x1306,
    status: "draft",
  },
  "p384-priv": {
    tag: "key",
    code: 0x1307,
    status: "draft",
  },
  "p521-priv": {
    tag: "key",
    code: 0x1308,
    status: "draft",
  },
  "bls12_381-g1-priv": {
    tag: "key",
    code: 0x1309,
    status: "draft",
  },
  "bls12_381-g2-priv": {
    tag: "key",
    code: 0x130a,
    status: "draft",
  },
  "bls12_381-g1g2-priv": {
    tag: "key",
    code: 0x130b,
    status: "draft",
  },
  "bls12_381-g1-pub-share": {
    tag: "key",
    code: 0x130c,
    status: "draft",
  },
  "bls12_381-g2-pub-share": {
    tag: "key",
    code: 0x130d,
    status: "draft",
  },
  "bls12_381-g1-priv-share": {
    tag: "key",
    code: 0x130e,
    status: "draft",
  },
  "bls12_381-g2-priv-share": {
    tag: "key",
    code: 0x130f,
    status: "draft",
  },
  "sm2-priv": {
    tag: "key",
    code: 0x1310,
    status: "draft",
  },
  "ed448-priv": {
    tag: "key",
    code: 0x1311,
    status: "draft",
  },
  "x448-priv": {
    tag: "key",
    code: 0x1312,
    status: "draft",
  },
  "mlkem-512-priv": {
    tag: "key",
    code: 0x1313,
    status: "draft",
  },
  "mlkem-768-priv": {
    tag: "key",
    code: 0x1314,
    status: "draft",
  },
  "mlkem-1024-priv": {
    tag: "key",
    code: 0x1315,
    status: "draft",
  },
  "jwk_jcs-priv": {
    tag: "key",
    code: 0x1316,
    status: "draft",
  },
  "lamport-sha3-512-pub": {
    tag: "key",
    code: 0x1a14,
    status: "draft",
  },
  "lamport-sha3-384-pub": {
    tag: "key",
    code: 0x1a15,
    status: "draft",
  },
  "lamport-sha3-256-pub": {
    tag: "key",
    code: 0x1a16,
    status: "draft",
  },
  "lamport-sha3-512-priv": {
    tag: "key",
    code: 0x1a24,
    status: "draft",
  },
  "lamport-sha3-384-priv": {
    tag: "key",
    code: 0x1a25,
    status: "draft",
  },
  "lamport-sha3-256-priv": {
    tag: "key",
    code: 0x1a26,
    status: "draft",
  },
  "lamport-sha3-512-priv-share": {
    tag: "key",
    code: 0x1a34,
    status: "draft",
  },
  "lamport-sha3-384-priv-share": {
    tag: "key",
    code: 0x1a35,
    status: "draft",
  },
  "lamport-sha3-256-priv-share": {
    tag: "key",
    code: 0x1a36,
    status: "draft",
  },
  "lamport-sha3-512-sig": {
    tag: "multisig",
    code: 0x1a44,
    status: "draft",
  },
  "lamport-sha3-384-sig": {
    tag: "multisig",
    code: 0x1a45,
    status: "draft",
  },
  "lamport-sha3-256-sig": {
    tag: "multisig",
    code: 0x1a46,
    status: "draft",
  },
  "lamport-sha3-512-sig-share": {
    tag: "multisig",
    code: 0x1a54,
    status: "draft",
  },
  "lamport-sha3-384-sig-share": {
    tag: "multisig",
    code: 0x1a55,
    status: "draft",
  },
  "lamport-sha3-256-sig-share": {
    tag: "multisig",
    code: 0x1a56,
    status: "draft",
  },
  kangarootwelve: {
    tag: "multihash",
    code: 0x1d01,
    status: "draft",
  },
  "aes-gcm-256": {
    tag: "encryption",
    code: 0x2000,
    status: "draft",
  },
  silverpine: {
    tag: "multiaddr",
    code: 0x3f42,
    status: "draft",
  },
  "sm3-256": {
    tag: "multihash",
    code: 0x534d,
    status: "draft",
  },
  sha256a: {
    tag: "hash",
    code: 0x7012,
    status: "draft",
  },
  "chacha20-poly1305": {
    tag: "multikey",
    code: 0xa000,
    status: "draft",
  },
  "blake2b-8": {
    tag: "multihash",
    code: 0xb201,
    status: "draft",
  },
  "blake2b-16": {
    tag: "multihash",
    code: 0xb202,
    status: "draft",
  },
  "blake2b-24": {
    tag: "multihash",
    code: 0xb203,
    status: "draft",
  },
  "blake2b-32": {
    tag: "multihash",
    code: 0xb204,
    status: "draft",
  },
  "blake2b-40": {
    tag: "multihash",
    code: 0xb205,
    status: "draft",
  },
  "blake2b-48": {
    tag: "multihash",
    code: 0xb206,
    status: "draft",
  },
  "blake2b-56": {
    tag: "multihash",
    code: 0xb207,
    status: "draft",
  },
  "blake2b-64": {
    tag: "multihash",
    code: 0xb208,
    status: "draft",
  },
  "blake2b-72": {
    tag: "multihash",
    code: 0xb209,
    status: "draft",
  },
  "blake2b-80": {
    tag: "multihash",
    code: 0xb20a,
    status: "draft",
  },
  "blake2b-88": {
    tag: "multihash",
    code: 0xb20b,
    status: "draft",
  },
  "blake2b-96": {
    tag: "multihash",
    code: 0xb20c,
    status: "draft",
  },
  "blake2b-104": {
    tag: "multihash",
    code: 0xb20d,
    status: "draft",
  },
  "blake2b-112": {
    tag: "multihash",
    code: 0xb20e,
    status: "draft",
  },
  "blake2b-120": {
    tag: "multihash",
    code: 0xb20f,
    status: "draft",
  },
  "blake2b-128": {
    tag: "multihash",
    code: 0xb210,
    status: "draft",
  },
  "blake2b-136": {
    tag: "multihash",
    code: 0xb211,
    status: "draft",
  },
  "blake2b-144": {
    tag: "multihash",
    code: 0xb212,
    status: "draft",
  },
  "blake2b-152": {
    tag: "multihash",
    code: 0xb213,
    status: "draft",
  },
  "blake2b-160": {
    tag: "multihash",
    code: 0xb214,
    status: "draft",
  },
  "blake2b-168": {
    tag: "multihash",
    code: 0xb215,
    status: "draft",
  },
  "blake2b-176": {
    tag: "multihash",
    code: 0xb216,
    status: "draft",
  },
  "blake2b-184": {
    tag: "multihash",
    code: 0xb217,
    status: "draft",
  },
  "blake2b-192": {
    tag: "multihash",
    code: 0xb218,
    status: "draft",
  },
  "blake2b-200": {
    tag: "multihash",
    code: 0xb219,
    status: "draft",
  },
  "blake2b-208": {
    tag: "multihash",
    code: 0xb21a,
    status: "draft",
  },
  "blake2b-216": {
    tag: "multihash",
    code: 0xb21b,
    status: "draft",
  },
  "blake2b-224": {
    tag: "multihash",
    code: 0xb21c,
    status: "draft",
  },
  "blake2b-232": {
    tag: "multihash",
    code: 0xb21d,
    status: "draft",
  },
  "blake2b-240": {
    tag: "multihash",
    code: 0xb21e,
    status: "draft",
  },
  "blake2b-248": {
    tag: "multihash",
    code: 0xb21f,
    status: "draft",
  },
  "blake2b-256": {
    tag: "multihash",
    code: 0xb220,
    status: "permanent",
  },
  "blake2b-264": {
    tag: "multihash",
    code: 0xb221,
    status: "draft",
  },
  "blake2b-272": {
    tag: "multihash",
    code: 0xb222,
    status: "draft",
  },
  "blake2b-280": {
    tag: "multihash",
    code: 0xb223,
    status: "draft",
  },
  "blake2b-288": {
    tag: "multihash",
    code: 0xb224,
    status: "draft",
  },
  "blake2b-296": {
    tag: "multihash",
    code: 0xb225,
    status: "draft",
  },
  "blake2b-304": {
    tag: "multihash",
    code: 0xb226,
    status: "draft",
  },
  "blake2b-312": {
    tag: "multihash",
    code: 0xb227,
    status: "draft",
  },
  "blake2b-320": {
    tag: "multihash",
    code: 0xb228,
    status: "draft",
  },
  "blake2b-328": {
    tag: "multihash",
    code: 0xb229,
    status: "draft",
  },
  "blake2b-336": {
    tag: "multihash",
    code: 0xb22a,
    status: "draft",
  },
  "blake2b-344": {
    tag: "multihash",
    code: 0xb22b,
    status: "draft",
  },
  "blake2b-352": {
    tag: "multihash",
    code: 0xb22c,
    status: "draft",
  },
  "blake2b-360": {
    tag: "multihash",
    code: 0xb22d,
    status: "draft",
  },
  "blake2b-368": {
    tag: "multihash",
    code: 0xb22e,
    status: "draft",
  },
  "blake2b-376": {
    tag: "multihash",
    code: 0xb22f,
    status: "draft",
  },
  "blake2b-384": {
    tag: "multihash",
    code: 0xb230,
    status: "draft",
  },
  "blake2b-392": {
    tag: "multihash",
    code: 0xb231,
    status: "draft",
  },
  "blake2b-400": {
    tag: "multihash",
    code: 0xb232,
    status: "draft",
  },
  "blake2b-408": {
    tag: "multihash",
    code: 0xb233,
    status: "draft",
  },
  "blake2b-416": {
    tag: "multihash",
    code: 0xb234,
    status: "draft",
  },
  "blake2b-424": {
    tag: "multihash",
    code: 0xb235,
    status: "draft",
  },
  "blake2b-432": {
    tag: "multihash",
    code: 0xb236,
    status: "draft",
  },
  "blake2b-440": {
    tag: "multihash",
    code: 0xb237,
    status: "draft",
  },
  "blake2b-448": {
    tag: "multihash",
    code: 0xb238,
    status: "draft",
  },
  "blake2b-456": {
    tag: "multihash",
    code: 0xb239,
    status: "draft",
  },
  "blake2b-464": {
    tag: "multihash",
    code: 0xb23a,
    status: "draft",
  },
  "blake2b-472": {
    tag: "multihash",
    code: 0xb23b,
    status: "draft",
  },
  "blake2b-480": {
    tag: "multihash",
    code: 0xb23c,
    status: "draft",
  },
  "blake2b-488": {
    tag: "multihash",
    code: 0xb23d,
    status: "draft",
  },
  "blake2b-496": {
    tag: "multihash",
    code: 0xb23e,
    status: "draft",
  },
  "blake2b-504": {
    tag: "multihash",
    code: 0xb23f,
    status: "draft",
  },
  "blake2b-512": {
    tag: "multihash",
    code: 0xb240,
    status: "draft",
  },
  "blake2s-8": {
    tag: "multihash",
    code: 0xb241,
    status: "draft",
  },
  "blake2s-16": {
    tag: "multihash",
    code: 0xb242,
    status: "draft",
  },
  "blake2s-24": {
    tag: "multihash",
    code: 0xb243,
    status: "draft",
  },
  "blake2s-32": {
    tag: "multihash",
    code: 0xb244,
    status: "draft",
  },
  "blake2s-40": {
    tag: "multihash",
    code: 0xb245,
    status: "draft",
  },
  "blake2s-48": {
    tag: "multihash",
    code: 0xb246,
    status: "draft",
  },
  "blake2s-56": {
    tag: "multihash",
    code: 0xb247,
    status: "draft",
  },
  "blake2s-64": {
    tag: "multihash",
    code: 0xb248,
    status: "draft",
  },
  "blake2s-72": {
    tag: "multihash",
    code: 0xb249,
    status: "draft",
  },
  "blake2s-80": {
    tag: "multihash",
    code: 0xb24a,
    status: "draft",
  },
  "blake2s-88": {
    tag: "multihash",
    code: 0xb24b,
    status: "draft",
  },
  "blake2s-96": {
    tag: "multihash",
    code: 0xb24c,
    status: "draft",
  },
  "blake2s-104": {
    tag: "multihash",
    code: 0xb24d,
    status: "draft",
  },
  "blake2s-112": {
    tag: "multihash",
    code: 0xb24e,
    status: "draft",
  },
  "blake2s-120": {
    tag: "multihash",
    code: 0xb24f,
    status: "draft",
  },
  "blake2s-128": {
    tag: "multihash",
    code: 0xb250,
    status: "draft",
  },
  "blake2s-136": {
    tag: "multihash",
    code: 0xb251,
    status: "draft",
  },
  "blake2s-144": {
    tag: "multihash",
    code: 0xb252,
    status: "draft",
  },
  "blake2s-152": {
    tag: "multihash",
    code: 0xb253,
    status: "draft",
  },
  "blake2s-160": {
    tag: "multihash",
    code: 0xb254,
    status: "draft",
  },
  "blake2s-168": {
    tag: "multihash",
    code: 0xb255,
    status: "draft",
  },
  "blake2s-176": {
    tag: "multihash",
    code: 0xb256,
    status: "draft",
  },
  "blake2s-184": {
    tag: "multihash",
    code: 0xb257,
    status: "draft",
  },
  "blake2s-192": {
    tag: "multihash",
    code: 0xb258,
    status: "draft",
  },
  "blake2s-200": {
    tag: "multihash",
    code: 0xb259,
    status: "draft",
  },
  "blake2s-208": {
    tag: "multihash",
    code: 0xb25a,
    status: "draft",
  },
  "blake2s-216": {
    tag: "multihash",
    code: 0xb25b,
    status: "draft",
  },
  "blake2s-224": {
    tag: "multihash",
    code: 0xb25c,
    status: "draft",
  },
  "blake2s-232": {
    tag: "multihash",
    code: 0xb25d,
    status: "draft",
  },
  "blake2s-240": {
    tag: "multihash",
    code: 0xb25e,
    status: "draft",
  },
  "blake2s-248": {
    tag: "multihash",
    code: 0xb25f,
    status: "draft",
  },
  "blake2s-256": {
    tag: "multihash",
    code: 0xb260,
    status: "draft",
  },
  "skein256-8": {
    tag: "multihash",
    code: 0xb301,
    status: "draft",
  },
  "skein256-16": {
    tag: "multihash",
    code: 0xb302,
    status: "draft",
  },
  "skein256-24": {
    tag: "multihash",
    code: 0xb303,
    status: "draft",
  },
  "skein256-32": {
    tag: "multihash",
    code: 0xb304,
    status: "draft",
  },
  "skein256-40": {
    tag: "multihash",
    code: 0xb305,
    status: "draft",
  },
  "skein256-48": {
    tag: "multihash",
    code: 0xb306,
    status: "draft",
  },
  "skein256-56": {
    tag: "multihash",
    code: 0xb307,
    status: "draft",
  },
  "skein256-64": {
    tag: "multihash",
    code: 0xb308,
    status: "draft",
  },
  "skein256-72": {
    tag: "multihash",
    code: 0xb309,
    status: "draft",
  },
  "skein256-80": {
    tag: "multihash",
    code: 0xb30a,
    status: "draft",
  },
  "skein256-88": {
    tag: "multihash",
    code: 0xb30b,
    status: "draft",
  },
  "skein256-96": {
    tag: "multihash",
    code: 0xb30c,
    status: "draft",
  },
  "skein256-104": {
    tag: "multihash",
    code: 0xb30d,
    status: "draft",
  },
  "skein256-112": {
    tag: "multihash",
    code: 0xb30e,
    status: "draft",
  },
  "skein256-120": {
    tag: "multihash",
    code: 0xb30f,
    status: "draft",
  },
  "skein256-128": {
    tag: "multihash",
    code: 0xb310,
    status: "draft",
  },
  "skein256-136": {
    tag: "multihash",
    code: 0xb311,
    status: "draft",
  },
  "skein256-144": {
    tag: "multihash",
    code: 0xb312,
    status: "draft",
  },
  "skein256-152": {
    tag: "multihash",
    code: 0xb313,
    status: "draft",
  },
  "skein256-160": {
    tag: "multihash",
    code: 0xb314,
    status: "draft",
  },
  "skein256-168": {
    tag: "multihash",
    code: 0xb315,
    status: "draft",
  },
  "skein256-176": {
    tag: "multihash",
    code: 0xb316,
    status: "draft",
  },
  "skein256-184": {
    tag: "multihash",
    code: 0xb317,
    status: "draft",
  },
  "skein256-192": {
    tag: "multihash",
    code: 0xb318,
    status: "draft",
  },
  "skein256-200": {
    tag: "multihash",
    code: 0xb319,
    status: "draft",
  },
  "skein256-208": {
    tag: "multihash",
    code: 0xb31a,
    status: "draft",
  },
  "skein256-216": {
    tag: "multihash",
    code: 0xb31b,
    status: "draft",
  },
  "skein256-224": {
    tag: "multihash",
    code: 0xb31c,
    status: "draft",
  },
  "skein256-232": {
    tag: "multihash",
    code: 0xb31d,
    status: "draft",
  },
  "skein256-240": {
    tag: "multihash",
    code: 0xb31e,
    status: "draft",
  },
  "skein256-248": {
    tag: "multihash",
    code: 0xb31f,
    status: "draft",
  },
  "skein256-256": {
    tag: "multihash",
    code: 0xb320,
    status: "draft",
  },
  "skein512-8": {
    tag: "multihash",
    code: 0xb321,
    status: "draft",
  },
  "skein512-16": {
    tag: "multihash",
    code: 0xb322,
    status: "draft",
  },
  "skein512-24": {
    tag: "multihash",
    code: 0xb323,
    status: "draft",
  },
  "skein512-32": {
    tag: "multihash",
    code: 0xb324,
    status: "draft",
  },
  "skein512-40": {
    tag: "multihash",
    code: 0xb325,
    status: "draft",
  },
  "skein512-48": {
    tag: "multihash",
    code: 0xb326,
    status: "draft",
  },
  "skein512-56": {
    tag: "multihash",
    code: 0xb327,
    status: "draft",
  },
  "skein512-64": {
    tag: "multihash",
    code: 0xb328,
    status: "draft",
  },
  "skein512-72": {
    tag: "multihash",
    code: 0xb329,
    status: "draft",
  },
  "skein512-80": {
    tag: "multihash",
    code: 0xb32a,
    status: "draft",
  },
  "skein512-88": {
    tag: "multihash",
    code: 0xb32b,
    status: "draft",
  },
  "skein512-96": {
    tag: "multihash",
    code: 0xb32c,
    status: "draft",
  },
  "skein512-104": {
    tag: "multihash",
    code: 0xb32d,
    status: "draft",
  },
  "skein512-112": {
    tag: "multihash",
    code: 0xb32e,
    status: "draft",
  },
  "skein512-120": {
    tag: "multihash",
    code: 0xb32f,
    status: "draft",
  },
  "skein512-128": {
    tag: "multihash",
    code: 0xb330,
    status: "draft",
  },
  "skein512-136": {
    tag: "multihash",
    code: 0xb331,
    status: "draft",
  },
  "skein512-144": {
    tag: "multihash",
    code: 0xb332,
    status: "draft",
  },
  "skein512-152": {
    tag: "multihash",
    code: 0xb333,
    status: "draft",
  },
  "skein512-160": {
    tag: "multihash",
    code: 0xb334,
    status: "draft",
  },
  "skein512-168": {
    tag: "multihash",
    code: 0xb335,
    status: "draft",
  },
  "skein512-176": {
    tag: "multihash",
    code: 0xb336,
    status: "draft",
  },
  "skein512-184": {
    tag: "multihash",
    code: 0xb337,
    status: "draft",
  },
  "skein512-192": {
    tag: "multihash",
    code: 0xb338,
    status: "draft",
  },
  "skein512-200": {
    tag: "multihash",
    code: 0xb339,
    status: "draft",
  },
  "skein512-208": {
    tag: "multihash",
    code: 0xb33a,
    status: "draft",
  },
  "skein512-216": {
    tag: "multihash",
    code: 0xb33b,
    status: "draft",
  },
  "skein512-224": {
    tag: "multihash",
    code: 0xb33c,
    status: "draft",
  },
  "skein512-232": {
    tag: "multihash",
    code: 0xb33d,
    status: "draft",
  },
  "skein512-240": {
    tag: "multihash",
    code: 0xb33e,
    status: "draft",
  },
  "skein512-248": {
    tag: "multihash",
    code: 0xb33f,
    status: "draft",
  },
  "skein512-256": {
    tag: "multihash",
    code: 0xb340,
    status: "draft",
  },
  "skein512-264": {
    tag: "multihash",
    code: 0xb341,
    status: "draft",
  },
  "skein512-272": {
    tag: "multihash",
    code: 0xb342,
    status: "draft",
  },
  "skein512-280": {
    tag: "multihash",
    code: 0xb343,
    status: "draft",
  },
  "skein512-288": {
    tag: "multihash",
    code: 0xb344,
    status: "draft",
  },
  "skein512-296": {
    tag: "multihash",
    code: 0xb345,
    status: "draft",
  },
  "skein512-304": {
    tag: "multihash",
    code: 0xb346,
    status: "draft",
  },
  "skein512-312": {
    tag: "multihash",
    code: 0xb347,
    status: "draft",
  },
  "skein512-320": {
    tag: "multihash",
    code: 0xb348,
    status: "draft",
  },
  "skein512-328": {
    tag: "multihash",
    code: 0xb349,
    status: "draft",
  },
  "skein512-336": {
    tag: "multihash",
    code: 0xb34a,
    status: "draft",
  },
  "skein512-344": {
    tag: "multihash",
    code: 0xb34b,
    status: "draft",
  },
  "skein512-352": {
    tag: "multihash",
    code: 0xb34c,
    status: "draft",
  },
  "skein512-360": {
    tag: "multihash",
    code: 0xb34d,
    status: "draft",
  },
  "skein512-368": {
    tag: "multihash",
    code: 0xb34e,
    status: "draft",
  },
  "skein512-376": {
    tag: "multihash",
    code: 0xb34f,
    status: "draft",
  },
  "skein512-384": {
    tag: "multihash",
    code: 0xb350,
    status: "draft",
  },
  "skein512-392": {
    tag: "multihash",
    code: 0xb351,
    status: "draft",
  },
  "skein512-400": {
    tag: "multihash",
    code: 0xb352,
    status: "draft",
  },
  "skein512-408": {
    tag: "multihash",
    code: 0xb353,
    status: "draft",
  },
  "skein512-416": {
    tag: "multihash",
    code: 0xb354,
    status: "draft",
  },
  "skein512-424": {
    tag: "multihash",
    code: 0xb355,
    status: "draft",
  },
  "skein512-432": {
    tag: "multihash",
    code: 0xb356,
    status: "draft",
  },
  "skein512-440": {
    tag: "multihash",
    code: 0xb357,
    status: "draft",
  },
  "skein512-448": {
    tag: "multihash",
    code: 0xb358,
    status: "draft",
  },
  "skein512-456": {
    tag: "multihash",
    code: 0xb359,
    status: "draft",
  },
  "skein512-464": {
    tag: "multihash",
    code: 0xb35a,
    status: "draft",
  },
  "skein512-472": {
    tag: "multihash",
    code: 0xb35b,
    status: "draft",
  },
  "skein512-480": {
    tag: "multihash",
    code: 0xb35c,
    status: "draft",
  },
  "skein512-488": {
    tag: "multihash",
    code: 0xb35d,
    status: "draft",
  },
  "skein512-496": {
    tag: "multihash",
    code: 0xb35e,
    status: "draft",
  },
  "skein512-504": {
    tag: "multihash",
    code: 0xb35f,
    status: "draft",
  },
  "skein512-512": {
    tag: "multihash",
    code: 0xb360,
    status: "draft",
  },
  "skein1024-8": {
    tag: "multihash",
    code: 0xb361,
    status: "draft",
  },
  "skein1024-16": {
    tag: "multihash",
    code: 0xb362,
    status: "draft",
  },
  "skein1024-24": {
    tag: "multihash",
    code: 0xb363,
    status: "draft",
  },
  "skein1024-32": {
    tag: "multihash",
    code: 0xb364,
    status: "draft",
  },
  "skein1024-40": {
    tag: "multihash",
    code: 0xb365,
    status: "draft",
  },
  "skein1024-48": {
    tag: "multihash",
    code: 0xb366,
    status: "draft",
  },
  "skein1024-56": {
    tag: "multihash",
    code: 0xb367,
    status: "draft",
  },
  "skein1024-64": {
    tag: "multihash",
    code: 0xb368,
    status: "draft",
  },
  "skein1024-72": {
    tag: "multihash",
    code: 0xb369,
    status: "draft",
  },
  "skein1024-80": {
    tag: "multihash",
    code: 0xb36a,
    status: "draft",
  },
  "skein1024-88": {
    tag: "multihash",
    code: 0xb36b,
    status: "draft",
  },
  "skein1024-96": {
    tag: "multihash",
    code: 0xb36c,
    status: "draft",
  },
  "skein1024-104": {
    tag: "multihash",
    code: 0xb36d,
    status: "draft",
  },
  "skein1024-112": {
    tag: "multihash",
    code: 0xb36e,
    status: "draft",
  },
  "skein1024-120": {
    tag: "multihash",
    code: 0xb36f,
    status: "draft",
  },
  "skein1024-128": {
    tag: "multihash",
    code: 0xb370,
    status: "draft",
  },
  "skein1024-136": {
    tag: "multihash",
    code: 0xb371,
    status: "draft",
  },
  "skein1024-144": {
    tag: "multihash",
    code: 0xb372,
    status: "draft",
  },
  "skein1024-152": {
    tag: "multihash",
    code: 0xb373,
    status: "draft",
  },
  "skein1024-160": {
    tag: "multihash",
    code: 0xb374,
    status: "draft",
  },
  "skein1024-168": {
    tag: "multihash",
    code: 0xb375,
    status: "draft",
  },
  "skein1024-176": {
    tag: "multihash",
    code: 0xb376,
    status: "draft",
  },
  "skein1024-184": {
    tag: "multihash",
    code: 0xb377,
    status: "draft",
  },
  "skein1024-192": {
    tag: "multihash",
    code: 0xb378,
    status: "draft",
  },
  "skein1024-200": {
    tag: "multihash",
    code: 0xb379,
    status: "draft",
  },
  "skein1024-208": {
    tag: "multihash",
    code: 0xb37a,
    status: "draft",
  },
  "skein1024-216": {
    tag: "multihash",
    code: 0xb37b,
    status: "draft",
  },
  "skein1024-224": {
    tag: "multihash",
    code: 0xb37c,
    status: "draft",
  },
  "skein1024-232": {
    tag: "multihash",
    code: 0xb37d,
    status: "draft",
  },
  "skein1024-240": {
    tag: "multihash",
    code: 0xb37e,
    status: "draft",
  },
  "skein1024-248": {
    tag: "multihash",
    code: 0xb37f,
    status: "draft",
  },
  "skein1024-256": {
    tag: "multihash",
    code: 0xb380,
    status: "draft",
  },
  "skein1024-264": {
    tag: "multihash",
    code: 0xb381,
    status: "draft",
  },
  "skein1024-272": {
    tag: "multihash",
    code: 0xb382,
    status: "draft",
  },
  "skein1024-280": {
    tag: "multihash",
    code: 0xb383,
    status: "draft",
  },
  "skein1024-288": {
    tag: "multihash",
    code: 0xb384,
    status: "draft",
  },
  "skein1024-296": {
    tag: "multihash",
    code: 0xb385,
    status: "draft",
  },
  "skein1024-304": {
    tag: "multihash",
    code: 0xb386,
    status: "draft",
  },
  "skein1024-312": {
    tag: "multihash",
    code: 0xb387,
    status: "draft",
  },
  "skein1024-320": {
    tag: "multihash",
    code: 0xb388,
    status: "draft",
  },
  "skein1024-328": {
    tag: "multihash",
    code: 0xb389,
    status: "draft",
  },
  "skein1024-336": {
    tag: "multihash",
    code: 0xb38a,
    status: "draft",
  },
  "skein1024-344": {
    tag: "multihash",
    code: 0xb38b,
    status: "draft",
  },
  "skein1024-352": {
    tag: "multihash",
    code: 0xb38c,
    status: "draft",
  },
  "skein1024-360": {
    tag: "multihash",
    code: 0xb38d,
    status: "draft",
  },
  "skein1024-368": {
    tag: "multihash",
    code: 0xb38e,
    status: "draft",
  },
  "skein1024-376": {
    tag: "multihash",
    code: 0xb38f,
    status: "draft",
  },
  "skein1024-384": {
    tag: "multihash",
    code: 0xb390,
    status: "draft",
  },
  "skein1024-392": {
    tag: "multihash",
    code: 0xb391,
    status: "draft",
  },
  "skein1024-400": {
    tag: "multihash",
    code: 0xb392,
    status: "draft",
  },
  "skein1024-408": {
    tag: "multihash",
    code: 0xb393,
    status: "draft",
  },
  "skein1024-416": {
    tag: "multihash",
    code: 0xb394,
    status: "draft",
  },
  "skein1024-424": {
    tag: "multihash",
    code: 0xb395,
    status: "draft",
  },
  "skein1024-432": {
    tag: "multihash",
    code: 0xb396,
    status: "draft",
  },
  "skein1024-440": {
    tag: "multihash",
    code: 0xb397,
    status: "draft",
  },
  "skein1024-448": {
    tag: "multihash",
    code: 0xb398,
    status: "draft",
  },
  "skein1024-456": {
    tag: "multihash",
    code: 0xb399,
    status: "draft",
  },
  "skein1024-464": {
    tag: "multihash",
    code: 0xb39a,
    status: "draft",
  },
  "skein1024-472": {
    tag: "multihash",
    code: 0xb39b,
    status: "draft",
  },
  "skein1024-480": {
    tag: "multihash",
    code: 0xb39c,
    status: "draft",
  },
  "skein1024-488": {
    tag: "multihash",
    code: 0xb39d,
    status: "draft",
  },
  "skein1024-496": {
    tag: "multihash",
    code: 0xb39e,
    status: "draft",
  },
  "skein1024-504": {
    tag: "multihash",
    code: 0xb39f,
    status: "draft",
  },
  "skein1024-512": {
    tag: "multihash",
    code: 0xb3a0,
    status: "draft",
  },
  "skein1024-520": {
    tag: "multihash",
    code: 0xb3a1,
    status: "draft",
  },
  "skein1024-528": {
    tag: "multihash",
    code: 0xb3a2,
    status: "draft",
  },
  "skein1024-536": {
    tag: "multihash",
    code: 0xb3a3,
    status: "draft",
  },
  "skein1024-544": {
    tag: "multihash",
    code: 0xb3a4,
    status: "draft",
  },
  "skein1024-552": {
    tag: "multihash",
    code: 0xb3a5,
    status: "draft",
  },
  "skein1024-560": {
    tag: "multihash",
    code: 0xb3a6,
    status: "draft",
  },
  "skein1024-568": {
    tag: "multihash",
    code: 0xb3a7,
    status: "draft",
  },
  "skein1024-576": {
    tag: "multihash",
    code: 0xb3a8,
    status: "draft",
  },
  "skein1024-584": {
    tag: "multihash",
    code: 0xb3a9,
    status: "draft",
  },
  "skein1024-592": {
    tag: "multihash",
    code: 0xb3aa,
    status: "draft",
  },
  "skein1024-600": {
    tag: "multihash",
    code: 0xb3ab,
    status: "draft",
  },
  "skein1024-608": {
    tag: "multihash",
    code: 0xb3ac,
    status: "draft",
  },
  "skein1024-616": {
    tag: "multihash",
    code: 0xb3ad,
    status: "draft",
  },
  "skein1024-624": {
    tag: "multihash",
    code: 0xb3ae,
    status: "draft",
  },
  "skein1024-632": {
    tag: "multihash",
    code: 0xb3af,
    status: "draft",
  },
  "skein1024-640": {
    tag: "multihash",
    code: 0xb3b0,
    status: "draft",
  },
  "skein1024-648": {
    tag: "multihash",
    code: 0xb3b1,
    status: "draft",
  },
  "skein1024-656": {
    tag: "multihash",
    code: 0xb3b2,
    status: "draft",
  },
  "skein1024-664": {
    tag: "multihash",
    code: 0xb3b3,
    status: "draft",
  },
  "skein1024-672": {
    tag: "multihash",
    code: 0xb3b4,
    status: "draft",
  },
  "skein1024-680": {
    tag: "multihash",
    code: 0xb3b5,
    status: "draft",
  },
  "skein1024-688": {
    tag: "multihash",
    code: 0xb3b6,
    status: "draft",
  },
  "skein1024-696": {
    tag: "multihash",
    code: 0xb3b7,
    status: "draft",
  },
  "skein1024-704": {
    tag: "multihash",
    code: 0xb3b8,
    status: "draft",
  },
  "skein1024-712": {
    tag: "multihash",
    code: 0xb3b9,
    status: "draft",
  },
  "skein1024-720": {
    tag: "multihash",
    code: 0xb3ba,
    status: "draft",
  },
  "skein1024-728": {
    tag: "multihash",
    code: 0xb3bb,
    status: "draft",
  },
  "skein1024-736": {
    tag: "multihash",
    code: 0xb3bc,
    status: "draft",
  },
  "skein1024-744": {
    tag: "multihash",
    code: 0xb3bd,
    status: "draft",
  },
  "skein1024-752": {
    tag: "multihash",
    code: 0xb3be,
    status: "draft",
  },
  "skein1024-760": {
    tag: "multihash",
    code: 0xb3bf,
    status: "draft",
  },
  "skein1024-768": {
    tag: "multihash",
    code: 0xb3c0,
    status: "draft",
  },
  "skein1024-776": {
    tag: "multihash",
    code: 0xb3c1,
    status: "draft",
  },
  "skein1024-784": {
    tag: "multihash",
    code: 0xb3c2,
    status: "draft",
  },
  "skein1024-792": {
    tag: "multihash",
    code: 0xb3c3,
    status: "draft",
  },
  "skein1024-800": {
    tag: "multihash",
    code: 0xb3c4,
    status: "draft",
  },
  "skein1024-808": {
    tag: "multihash",
    code: 0xb3c5,
    status: "draft",
  },
  "skein1024-816": {
    tag: "multihash",
    code: 0xb3c6,
    status: "draft",
  },
  "skein1024-824": {
    tag: "multihash",
    code: 0xb3c7,
    status: "draft",
  },
  "skein1024-832": {
    tag: "multihash",
    code: 0xb3c8,
    status: "draft",
  },
  "skein1024-840": {
    tag: "multihash",
    code: 0xb3c9,
    status: "draft",
  },
  "skein1024-848": {
    tag: "multihash",
    code: 0xb3ca,
    status: "draft",
  },
  "skein1024-856": {
    tag: "multihash",
    code: 0xb3cb,
    status: "draft",
  },
  "skein1024-864": {
    tag: "multihash",
    code: 0xb3cc,
    status: "draft",
  },
  "skein1024-872": {
    tag: "multihash",
    code: 0xb3cd,
    status: "draft",
  },
  "skein1024-880": {
    tag: "multihash",
    code: 0xb3ce,
    status: "draft",
  },
  "skein1024-888": {
    tag: "multihash",
    code: 0xb3cf,
    status: "draft",
  },
  "skein1024-896": {
    tag: "multihash",
    code: 0xb3d0,
    status: "draft",
  },
  "skein1024-904": {
    tag: "multihash",
    code: 0xb3d1,
    status: "draft",
  },
  "skein1024-912": {
    tag: "multihash",
    code: 0xb3d2,
    status: "draft",
  },
  "skein1024-920": {
    tag: "multihash",
    code: 0xb3d3,
    status: "draft",
  },
  "skein1024-928": {
    tag: "multihash",
    code: 0xb3d4,
    status: "draft",
  },
  "skein1024-936": {
    tag: "multihash",
    code: 0xb3d5,
    status: "draft",
  },
  "skein1024-944": {
    tag: "multihash",
    code: 0xb3d6,
    status: "draft",
  },
  "skein1024-952": {
    tag: "multihash",
    code: 0xb3d7,
    status: "draft",
  },
  "skein1024-960": {
    tag: "multihash",
    code: 0xb3d8,
    status: "draft",
  },
  "skein1024-968": {
    tag: "multihash",
    code: 0xb3d9,
    status: "draft",
  },
  "skein1024-976": {
    tag: "multihash",
    code: 0xb3da,
    status: "draft",
  },
  "skein1024-984": {
    tag: "multihash",
    code: 0xb3db,
    status: "draft",
  },
  "skein1024-992": {
    tag: "multihash",
    code: 0xb3dc,
    status: "draft",
  },
  "skein1024-1000": {
    tag: "multihash",
    code: 0xb3dd,
    status: "draft",
  },
  "skein1024-1008": {
    tag: "multihash",
    code: 0xb3de,
    status: "draft",
  },
  "skein1024-1016": {
    tag: "multihash",
    code: 0xb3df,
    status: "draft",
  },
  "skein1024-1024": {
    tag: "multihash",
    code: 0xb3e0,
    status: "draft",
  },
  "xxh-32": {
    tag: "hash",
    code: 0xb3e1,
    status: "draft",
  },
  "xxh-64": {
    tag: "hash",
    code: 0xb3e2,
    status: "draft",
  },
  "xxh3-64": {
    tag: "hash",
    code: 0xb3e3,
    status: "draft",
  },
  "xxh3-128": {
    tag: "hash",
    code: 0xb3e4,
    status: "draft",
  },
  "poseidon-bls12_381-a2-fc1": {
    tag: "multihash",
    code: 0xb401,
    status: "permanent",
  },
  "poseidon-bls12_381-a2-fc1-sc": {
    tag: "multihash",
    code: 0xb402,
    status: "draft",
  },
  "rdfc-1": {
    tag: "ipld",
    code: 0xb403,
    status: "draft",
  },
  ssz: {
    tag: "serialization",
    code: 0xb501,
    status: "draft",
  },
  "ssz-sha2-256-bmt": {
    tag: "multihash",
    code: 0xb502,
    status: "draft",
  },
  "sha2-256-chunked": {
    tag: "multihash",
    code: 0xb510,
    status: "draft",
  },
  "json-jcs": {
    tag: "ipld",
    code: 0xb601,
    status: "draft",
  },
  "bittorrent-pieces-root": {
    tag: "multihash",
    code: 0xb702,
    status: "draft",
  },
  iscc: {
    tag: "softhash",
    code: 0xcc01,
    status: "draft",
  },
  "zeroxcert-imprint-256": {
    tag: "zeroxcert",
    code: 0xce11,
    status: "draft",
  },
  "nonstandard-sig": {
    tag: "varsig",
    code: 0xd000,
    status: "deprecated",
  },
  "bcrypt-pbkdf": {
    tag: "multihash",
    code: 0xd00d,
    status: "draft",
  },
  es256k: {
    tag: "varsig",
    code: 0xd0e7,
    status: "draft",
  },
  "bls12_381-g1-sig": {
    tag: "varsig",
    code: 0xd0ea,
    status: "draft",
  },
  "bls12_381-g2-sig": {
    tag: "varsig",
    code: 0xd0eb,
    status: "draft",
  },
  eddsa: {
    tag: "varsig",
    code: 0xd0ed,
    status: "draft",
  },
  "eip-191": {
    tag: "varsig",
    code: 0xd191,
    status: "draft",
  },
  "jwk_jcs-pub": {
    tag: "key",
    code: 0xeb51,
    status: "draft",
  },
  ed2k: {
    tag: "multihash",
    code: 0xed20,
    status: "draft",
  },
  "fil-commitment-unsealed": {
    tag: "filecoin",
    code: 0xf101,
    status: "permanent",
  },
  "fil-commitment-sealed": {
    tag: "filecoin",
    code: 0xf102,
    status: "permanent",
  },
  "shelter-contract-manifest": {
    tag: "shelter",
    code: 0x511e00,
    status: "draft",
  },
  "shelter-contract-text": {
    tag: "shelter",
    code: 0x511e01,
    status: "draft",
  },
  "shelter-contract-data": {
    tag: "shelter",
    code: 0x511e02,
    status: "draft",
  },
  "shelter-file-manifest": {
    tag: "shelter",
    code: 0x511e03,
    status: "draft",
  },
  "shelter-file-chunk": {
    tag: "shelter",
    code: 0x511e04,
    status: "draft",
  },
  plaintextv2: {
    tag: "multiaddr",
    code: 0x706c61,
    status: "draft",
  },
  "holochain-adr-v0": {
    tag: "holochain",
    code: 0x807124,
    status: "draft",
  },
  "holochain-adr-v1": {
    tag: "holochain",
    code: 0x817124,
    status: "draft",
  },
  "holochain-key-v0": {
    tag: "holochain",
    code: 0x947124,
    status: "draft",
  },
  "holochain-key-v1": {
    tag: "holochain",
    code: 0x957124,
    status: "draft",
  },
  "holochain-sig-v0": {
    tag: "holochain",
    code: 0xa27124,
    status: "draft",
  },
  "holochain-sig-v1": {
    tag: "holochain",
    code: 0xa37124,
    status: "draft",
  },
  "skynet-ns": {
    tag: "namespace",
    code: 0xb19910,
    status: "draft",
  },
  "arweave-ns": {
    tag: "namespace",
    code: 0xb29910,
    status: "draft",
  },
  "subspace-ns": {
    tag: "namespace",
    code: 0xb39910,
    status: "draft",
  },
  "kumandra-ns": {
    tag: "namespace",
    code: 0xb49910,
    status: "draft",
  },
  es256: {
    tag: "varsig",
    code: 0xd01200,
    status: "draft",
  },
  es384: {
    tag: "varsig",
    code: 0xd01201,
    status: "draft",
  },
  es512: {
    tag: "varsig",
    code: 0xd01202,
    status: "draft",
  },
  rs256: {
    tag: "varsig",
    code: 0xd01205,
    status: "draft",
  },
  "es256k-msig": {
    tag: "multisig",
    code: 0xd01300,
    status: "draft",
  },
  "bls12_381-g1-msig": {
    tag: "multisig",
    code: 0xd01301,
    status: "draft",
  },
  "bls12_381-g2-msig": {
    tag: "multisig",
    code: 0xd01302,
    status: "draft",
  },
  "eddsa-msig": {
    tag: "multisig",
    code: 0xd01303,
    status: "draft",
  },
  "bls12_381-g1-share-msig": {
    tag: "multisig",
    code: 0xd01304,
    status: "draft",
  },
  "bls12_381-g2-share-msig": {
    tag: "multisig",
    code: 0xd01305,
    status: "draft",
  },
  "lamport-msig": {
    tag: "multisig",
    code: 0xd01306,
    status: "draft",
  },
  "lamport-share-msig": {
    tag: "multisig",
    code: 0xd01307,
    status: "draft",
  },
  "es256-msig": {
    tag: "multisig",
    code: 0xd01308,
    status: "draft",
  },
  "es384-msig": {
    tag: "multisig",
    code: 0xd01309,
    status: "draft",
  },
  "es521-msig": {
    tag: "multisig",
    code: 0xd0130a,
    status: "draft",
  },
  "rs256-msig": {
    tag: "multisig",
    code: 0xd0130b,
    status: "draft",
  },
  scion: {
    tag: "multiaddr",
    code: 0xd02000,
    status: "draft",
  },
} as const;
