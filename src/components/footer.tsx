import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="absolute bottom-0 w-full">
      <Separator />
      <p className="my-4 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Kshitij Chauhan.
      </p>
    </footer>
  );
}
