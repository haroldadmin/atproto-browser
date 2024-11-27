import ATPathCrumbs from "@/components/at-path-crumbs";

export default async function ATBrowserLayout({
  children,
}: React.PropsWithChildren) {
  return (
    <section>
      <nav>
        <ATPathCrumbs />
      </nav>
      {children}
    </section>
  );
}
