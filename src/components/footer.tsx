import { Separator } from "@/components/ui/separator";
import Navigation from "./navigation";

export default function Footer() {
  return (
    <footer className="w-full py-8">
      <Separator />
      <Navigation />
      <p className="my-4 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Kshitij Chauhan.
      </p>
    </footer>
  );
}
