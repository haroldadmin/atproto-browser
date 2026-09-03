import { describe, expect, it } from "vitest";
import {
  AtUriTransformer,
  BlobLinkTransformer,
  DidTransformer,
} from "./transformers";
import { codeToHtml } from "shiki";
import { AtUri } from "@atproto/syntax";
import { CID } from "multiformats";
import { createBlobURL } from "../uris";

describe("AtUriTransformer", () => {
  it("should transform all at:// uris in code to links", async () => {
    const doc = {
      subject: new AtUri("at://did:plc:test").toString(),
    };

    const html = await codeToHtml(JSON.stringify(doc), {
      lang: "json",
      theme: "github-light",
      transformers: [AtUriTransformer],
    });

    expect(html).toContain('href="/at/did:plc:test"');
  });

  it("should not transform non-aturis", async () => {
    const doc = {
      subject: "https://www.example.com",
    };

    const html = await codeToHtml(JSON.stringify(doc), {
      lang: "json",
      theme: "github-light",
      transformers: [AtUriTransformer],
    });

    expect(html).not.toContain("href");
  });
});

describe("DidTransformer", () => {
  it("should transform all dids in code to links", async () => {
    const doc = {
      subject: "did:plc:r7bnnxqejdsgapuagfc6dlz6",
    };

    const html = await codeToHtml(JSON.stringify(doc), {
      lang: "json",
      theme: "github-light",
      transformers: [DidTransformer],
    });

    expect(html).toContain('href="/at/did:plc:r7bnnxqejdsgapuagfc6dlz6"');
  });

  it("should not transform invalid DIDs", async () => {
    const doc = {
      subject: "did:invalid",
    };

    const html = await codeToHtml(JSON.stringify(doc), {
      lang: "json",
      theme: "github-light",
      transformers: [DidTransformer],
    });

    expect(html).not.toContain("href");
  });
});

describe("BlobLinkTransformer", () => {
  it("should transform blob refs into links", async () => {
    const pds = "https://www.example.com";
    const did = "did:plc:test";
    const cid = "bafkreiffwl4uafaihemaeqlpvzeccmem7knq3dk4dck45pwi33nd27q74q";
    const doc = {
      $type: "blob",
      ref: {
        $link: cid,
      },
    };

    const html = await codeToHtml(JSON.stringify(doc), {
      lang: "json",
      theme: "github-light",
      transformers: [BlobLinkTransformer(did, pds)],
    });

    expect(html.replace("&#x26;", "&")).toContain(
      `href="${createBlobURL(CID.parse(cid), did, pds)}"`,
    );
  });

  it("should not transform non-blob-refs into links", async () => {
    const pds = "https://www.example.com";
    const did = "did:plc:test";
    const cid = "bafkreiffwl4uafaihemaeqlpvzeccmem7knq3dk4dck45pwi33nd27q74q";
    const doc = {
      ref: {
        $link: cid,
      },
    };

    const html = await codeToHtml(JSON.stringify(doc), {
      lang: "json",
      theme: "github-light",
      transformers: [BlobLinkTransformer(did, pds)],
    });

    expect(html).not.toContain("href");
  });

  it("should not transform invalid blob-refs into links", async () => {
    const pds = "https://www.example.com";
    const did = "did:plc:test";
    const cid = "invalid-cid";
    const doc = {
      $type: "blob",
      ref: {
        $link: cid,
      },
    };

    const html = await codeToHtml(JSON.stringify(doc), {
      lang: "json",
      theme: "github-light",
      transformers: [BlobLinkTransformer(did, pds)],
    });

    expect(html).not.toContain("href");
  });
});
