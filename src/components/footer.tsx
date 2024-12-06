import { Separator } from "@/components/ui/separator";
import { twMerge } from "tailwind-merge";
import Navigation from "./navigation";

export default function Footer({ className }: { className?: string }) {
  return (
    <footer className={twMerge("w-full py-8 text-gray-500 text-sm", className)}>
      <Separator />
      <div className=" flex flex-row justify-start">
        <Navigation />
      </div>
    </footer>
  );
}
