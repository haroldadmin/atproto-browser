import DIDForm from "@/components/did-form";
import LiveFeed from "@/components/live-feed/feed";

export default function Home() {
  return (
    <section>
      <DIDForm />
      <LiveFeed sampleRate={0.05} displayedPosts={5} />
    </section>
  );
}
