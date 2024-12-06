import { merge, noop } from "lodash";
import React, { createContext, useCallback, useState } from "react";
import { hosts } from "./useJetstream";

type FeedSettings = {
  samplingRate: number;
  bufferSize: number;
  collections: string[];
  active: boolean;
  host: (typeof hosts)[number];
};

const defaultSettings: FeedSettings = {
  samplingRate: 0.05,
  bufferSize: 5,
  collections: ["app.bsky.feed.post"],
  active: true,
  host: hosts[0],
};

export type FeedCtx = {
  settings: FeedSettings;
  setSamplingRate: (samplingRate: number) => void;
  setBufferSize: (bufferSize: number) => void;
  setCollections: (collections: string[]) => void;
  setActive: (active: boolean) => void;
  setHost: (host: string) => void;
};

const defaultContext: FeedCtx = {
  settings: defaultSettings,
  setSamplingRate: noop,
  setBufferSize: noop,
  setCollections: noop,
  setActive: noop,
  setHost: noop,
};

export const FeedContext = createContext<FeedCtx>(defaultContext);

export default function FeedProvider({ children }: React.PropsWithChildren) {
  const setSamplingRate = useCallback((samplingRate: number) => {
    setContextValue((ctx) => merge({}, ctx, { settings: { samplingRate } }));
  }, []);

  const setBufferSize = useCallback((bufferSize: number) => {
    setContextValue((ctx) => merge({}, ctx, { settings: { bufferSize } }));
  }, []);

  const setCollections = useCallback((collections: string[]) => {
    setContextValue((ctx) => merge({}, ctx, { settings: { collections } }));
  }, []);

  const setActive = useCallback((active: boolean) => {
    setContextValue((ctx) => merge({}, ctx, { settings: { active } }));
  }, []);

  const setHost = useCallback((host: string) => {
    setContextValue((ctx) => merge({}, ctx, { settings: { host } }));
  }, []);

  const [contextValue, setContextValue] = useState<FeedCtx>({
    ...defaultContext,
    setSamplingRate,
    setBufferSize,
    setCollections,
    setActive,
    setHost,
  });

  return (
    <FeedContext.Provider value={contextValue}>{children}</FeedContext.Provider>
  );
}
