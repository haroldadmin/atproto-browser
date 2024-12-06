import { Separator } from "@/components/ui/separator";
import Navigation from "./navigation";
import { twMerge } from "tailwind-merge";

export default function Footer({ className }: { className?: string }) {
  return (
    <footer className={twMerge("w-full py-8 text-gray-500 text-sm", className)}>
      <Separator />
      <Navigation />
    </footer>
  );
}
