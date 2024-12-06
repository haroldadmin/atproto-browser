import DIDForm from "@/components/did-form";
import LiveFeed from "@/components/live-feed/feed";

export default function Home() {
  return (
    <section>
      <DIDForm />
      <LiveFeed />
    </section>
  );
}
