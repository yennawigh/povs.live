"use client";

import { useSearchParams } from "next/navigation";

export default function WatchParty() {
  const searchParams = useSearchParams();
  const streamers = searchParams.get("streamers")?.split(",") || [];

  const gridClass = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-2 grid-rows-2",
    4: "grid-cols-2 grid-rows-2",
  }[streamers.length];

  return (
    <div className={`grid ${gridClass} w-screen h-screen`}>
      {streamers.map((streamer) => (
        <div key={streamer} className="w-full h-full">
          <iframe
            src={`https://player.kick.com/${streamer}?autoplay=true`}
            className="!overflow-hidden !scrollbar-hide aspect-auto"
            style={{ overflow: "hidden" }}
            allowFullScreen={true}
            scrolling={"no"}
            height={"100%"}
            frameBorder="0"
            width={"100%"}
          ></iframe>
        </div>
      ))}
    </div>
  );
}
