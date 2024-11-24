import DIDForm from "../components/did-form";

export default function Home() {
  return (
    <section className="p-4 lg:p-16">
      <h1 className="text-4xl font-bold">ATProto Browser</h1>
      <p className="text-lg text-gray-500">
        Experimental browser for the Atmosphere
      </p>
      <div className="mt-4 max-w-lg">
        <DIDForm />
      </div>
    </section>
  );
}
