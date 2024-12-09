import DIDForm from "@/components/did-form";
import LiveFeed from "@/components/live-feed/feed";

export default function Home() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="col-span-1 lg:col-span-1">
        <DIDForm />
      </div>
      <div className="col-span-1 lg:col-span-1">
        <LiveFeed />
      </div>
    </section>
  );
}
