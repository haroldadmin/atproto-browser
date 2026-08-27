import ATPathCrumbs from "@/components/at-path-crumbs";

export default function BlobsLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <nav>
        <ATPathCrumbs />
      </nav>
      {children}
    </>
  );
}
