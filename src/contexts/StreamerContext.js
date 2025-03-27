"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { streamerService } from "@/services/streamerService";

const StreamerContext = createContext();

export function StreamerProvider({ children }) {
  const [streamers, setStreamers] = useState({});
  const [favorites, setFavorites] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("streamerFavorites");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const fetchQueue = useRef(new Set());
  const isProcessing = useRef(false);

  const processFetchQueue = useCallback(async () => {
    if (isProcessing.current || fetchQueue.current.size === 0) return;

    isProcessing.current = true;
    const [nextFetch] = fetchQueue.current;

    try {
      const { username, platform } = nextFetch;
      const info = await streamerService.getKickStreamerInfo(username);
      setStreamers((prev) => ({
        ...prev,
        [`${username}-${platform}`]: info,
      }));
    } finally {
      fetchQueue.current.delete(nextFetch);
      isProcessing.current = false;
      if (fetchQueue.current.size > 0) {
        setTimeout(processFetchQueue, 100); // Rate limiting
      }
    }
  }, []);

  const fetchStreamerInfo = useCallback(
    (username, platform) => {
      const streamerKey = `${username}-${platform}`;
      if (streamers[streamerKey]) return;

      fetchQueue.current.add({ username, platform });
      processFetchQueue();
    },
    [streamers, processFetchQueue]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("streamerFavorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  return (
    <StreamerContext.Provider
      value={{
        streamers,
        fetchStreamerInfo,
        favorites,
        setFavorites,
      }}
    >
      {children}
    </StreamerContext.Provider>
  );
}

export const useStreamer = () => useContext(StreamerContext);
