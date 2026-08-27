import ATPathCrumbs from "@/components/at-path-crumbs";

export default function RepositoryLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <>
      <nav>
        <ATPathCrumbs />
      </nav>
      {children}
    </>
  );
}
