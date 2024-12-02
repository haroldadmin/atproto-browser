import { Separator } from "@/components/ui/separator";
import Navigation from "./navigation";

export default function Footer() {
  return (
    <footer className="w-full py-8 text-gray-500 text-sm">
      <Separator />
      <Navigation />
    </footer>
  );
}
