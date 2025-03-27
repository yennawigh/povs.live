"use client";

import Header from "@/components/header";
import Streamer from "@/components/streamer";
import { useSettings } from "@/contexts/settings-context";
import { StreamerProvider, useStreamer } from "@/contexts/StreamerContext";
import { FILTER_NULLS } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState, useEffect, use } from "react";
import { streamerService } from "@/services/streamerService";
import { apiService } from "@/services/apiService";
import ServerCard from "@/components/streamer/server";

function Content({ serverInfo: initialServerInfo }) {
  const [serverInfo, setServerInfo] = useState(initialServerInfo);
  const [streamersData, setStreamersData] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const { favorites } = useStreamer();
  const [loading, setLoading] = useState(true);
  const { lang } = useSettings();

  useEffect(() => {
    if (!serverInfo?.CODE) return;

    const cleanup = apiService.watchServerChanges(
      serverInfo.CODE,
      (newData) => {
        setServerInfo(newData);
      }
    );

    return () => cleanup();
  }, [serverInfo?.CODE]);

  useEffect(() => {
    const fetchAllStreamers = async () => {
      const usernames = FILTER_NULLS(serverInfo.STREAMERS?.kick) || [];
      const data = await streamerService.getMultipleStreamersInfo(usernames);
      setStreamersData(data);
      setLoading(false);
    };

    fetchAllStreamers();
  }, [serverInfo]);

  const totalStreamers = FILTER_NULLS(serverInfo.STREAMERS?.kick)?.length || 0;

  const streamersArray =
    FILTER_NULLS(serverInfo.STREAMERS?.kick)?.map((username) => ({
      username,
      platform: "kick",
    })) || [];

  const sortedStreamers = streamersArray.sort((a, b) => {
    const streamerA = streamersData[`${a.username}-${a.platform}`];
    const streamerB = streamersData[`${b.username}-${b.platform}`];

    if (!streamerA || !streamerB) return 0;

    const isFavoriteA = favorites.some(
      (fav) => fav.name.toLowerCase() === a.username.toLowerCase()
    );
    const isFavoriteB = favorites.some(
      (fav) => fav.name.toLowerCase() === b.username.toLowerCase()
    );

    const isLiveA = streamerA.live;
    const isLiveB = streamerB.live;

    if (isFavoriteA && !isFavoriteB) return -1;
    if (!isFavoriteA && isFavoriteB) return 1;

    if (isLiveA && !isLiveB) return -1;
    if (!isLiveA && isLiveB) return 1;

    if (isLiveA && isLiveB) {
      return streamerB.viewers - streamerA.viewers;
    }

    return streamerB.followers - streamerA.followers;
  });

  const filteredStreamers = sortedStreamers.filter((streamer) => {
    const streamerData =
      streamersData[`${streamer.username}-${streamer.platform}`];
    if (!streamerData) return true;

    const searchIn = [
      streamerData.title,
      streamer.username,
      streamerData.game,
    ].map((item) => item?.toLowerCase() || "");

    return !searchQuery || searchIn.some((item) => item.includes(searchQuery));
  });

  return (
    <div className="min-h-screen">
      <Header server={serverInfo} onSearch={setSearchQuery} />
      <motion.div className="w-full h-full grid grid-cols-3">
        <ServerCard lang={lang} server={serverInfo} />
        {filteredStreamers.map((streamer, index) => (
          <Streamer
            key={`${streamer.platform}-${streamer.username}`}
            platform={streamer.platform}
            total={totalStreamers}
            index={index}
            lang={lang}
            streamer={
              streamersData[`${streamer.username}-${streamer.platform}`]
            }
          />
        ))}
      </motion.div>
    </div>
  );
}

export default function ServerClient({ serverInfo }) {
  if (!serverInfo) return <div>Server not found</div>;

  return (
    <StreamerProvider>
      <Content serverInfo={serverInfo} />
    </StreamerProvider>
  );
}
