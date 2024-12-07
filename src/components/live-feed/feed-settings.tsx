import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Settings2 as Settings } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";
import LinkSpan from "../link-span";
import { FeedContext } from "./feed-context";
import { hosts } from "./useJetstream";

export default function FeedSettings() {
  const { settings, setSamplingRate, setBufferSize, setActive, setHost } =
    useContext(FeedContext);

  return (
    <Sheet>
      <SheetTrigger>
        <Settings />
      </SheetTrigger>
      <SheetContent className="overflow-y-scroll">
        <SheetHeader>
          <SheetTitle>Feed settings</SheetTitle>
          <SheetDescription className="prose dark:prose-invert">
            Adjust settings for the live feed
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-8 my-8">
          <div>
            <Label htmlFor="samplingRate">Sampling rate</Label>
            <p className="text-[0.8rem] text-muted-foreground">
              The percentage of posts to sample from the firehose.
            </p>
            <div className="flex flex-row items-center gap-2">
              <p className="text-sm text-muted-foreground">0%</p>
              <Slider
                className="my-4"
                name="samplingRate"
                defaultValue={[Math.floor(settings.samplingRate * 100)]}
                onValueChange={([value]) => {
                  if (value === 0) {
                    setActive(false);
                    setSamplingRate(0.01);
                  } else {
                    setActive(true);
                    setSamplingRate(value / 100);
                  }
                }}
                min={0}
                max={100}
                step={1}
              />
              <p className="text-sm text-muted-foreground">100%</p>
            </div>
          </div>
          <Separator />
          <div>
            <Label htmlFor="bufferSize">Buffer size</Label>
            <p className="text-[0.8rem] text-muted-foreground">
              The number of posts to keep on screen before they scroll off
            </p>
            <Select
              name="bufferSize"
              defaultValue={settings.bufferSize.toString()}
              onValueChange={(value) =>
                setBufferSize(Number.parseInt(value, 10))
              }
            >
              <SelectTrigger className="my-2">
                <SelectValue placeholder="Buffer size" />
              </SelectTrigger>
              <SelectContent>
                {[5, 10, 20, 50, 100].map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="host">Host</Label>
            <p className="text-[0.8rem] text-muted-foreground">
              The Jetstream host to use for the live feed
            </p>
            <Select
              name="host"
              defaultValue={settings.host}
              onValueChange={(value) => setHost(value)}
            >
              <SelectTrigger className="my-2">
                <SelectValue placeholder="Host" />
              </SelectTrigger>
              <SelectContent>
                {hosts.map((host) => (
                  <SelectItem key={host} value={host}>
                    {host}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Separator />
        </div>
        <div className="prose dark:prose-invert">
          <p className="text-sm">
            The Live feed is a real time stream of posts from the Bluesky
            network, built on top of{" "}
            <Link
              href="https://github.com/bluesky-social/jetstream"
              target="_blank"
            >
              <LinkSpan>Jetstream</LinkSpan>
            </Link>
            .
          </p>
          <p className="text-sm">
            Jetstream produces hundreds of updates every second. Sampling is
            required to keep things manageable.
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
