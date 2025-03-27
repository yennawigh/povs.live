"use client";

import { CALCULATE_UPTIME2, CONVERT_LANG } from "@/lib/utils";
import { useStreamer } from "@/contexts/StreamerContext";
import { motion } from "framer-motion";
import classNames from "classnames";
import { useState } from "react";
import Icon from "../icon";

const COMMON_STYLES = {
  borderStyle: "border-black/20 dark:border-white/15",
  iconContainer:
    "h-full border-r border-black/20 dark:border-white/15 center w-10 flex-shrink-0",
  statContainer:
    "flex items-center space-x-3 flex-auto w-1/4 h-full border-r border-black/20 dark:border-white/15",
};

const FavoriteButton = ({ isActive, onClick }) => (
  <div className="h-full center w-10 p-2.5 cursor-pointer" onClick={onClick}>
    <Icon icon={`solar:bookmark-${isActive ? "bold" : "outline"}`} />
  </div>
);

const StreamerStat = ({ icon, text }) => (
  <div className={COMMON_STYLES.statContainer}>
    <div className={COMMON_STYLES.iconContainer}>
      <Icon icon={icon} />
    </div>
    <p className="text-xs line-clamp-1">{text}</p>
  </div>
);

const LiveContent = ({ streamer, lang }) => (
  <>
    <StreamerStat icon="solar:gamepad-bold" text={streamer.game} />
    <StreamerStat
      icon="solar:eye-bold"
      text={`${streamer.viewers} ${CONVERT_LANG(lang, "izleyici", "viewers")}`}
    />
    <StreamerStat
      icon="solar:clock-circle-bold"
      text={CALCULATE_UPTIME2(streamer.startedAt)}
    />
  </>
);

const OfflineContent = ({ streamer }) => (
  <>
    <StreamerStat
      icon="solar:gamepad-bold"
      text={`${streamer.followers} takipçi`}
    />
    <StreamerStat icon="material-symbols:cake" text={streamer.createdAt} />
  </>
);

export default function Streamer({ lang, index, total, streamer }) {
  const { setFavorites, favorites } = useStreamer();
  const [currentPlatform] = useState("kick");
  const [hover, setHover] = useState(false);

  const getBorderClasses = () => {
    const adjustedIndex = index + 1;
    const colIndex = adjustedIndex % 3;
    const rowIndex = Math.floor(adjustedIndex / 3);
    const totalRows = Math.ceil((total + 1) / 3);

    return [
      colIndex < 2 ? "border-r" : "",
      rowIndex < totalRows - 1 ? "border-b" : "",
    ].join(" ");
  };

  function addFavorite(name) {
    const favorite = {
      name: name.toLowerCase(),
      platform: currentPlatform,
    };
    setFavorites((prev) => {
      const exists = prev.some(
        (f) => f.name === favorite.name && f.platform === favorite.platform
      );
      return exists ? prev : [...prev, favorite];
    });
  }

  function removeFavorite(name) {
    setFavorites((prev) =>
      prev.filter(
        (f) =>
          !(f.name === name.toLowerCase() && f.platform === currentPlatform)
      )
    );
  }

  if (!streamer) {
    return (
      <motion.div
        className={`w-full flex items-center h-24 ${getBorderClasses()} ${
          COMMON_STYLES.borderStyle
        }`}
      >
        <div
          className={`w-24 h-full flex-shrink-0 border-r ${COMMON_STYLES.borderStyle} p-1`}
        >
          <div className="w-full h-full bg-black/20 dark:bg-white/10 rounded-[1px] animate-pulse"></div>
        </div>
        <div className="w-full h-full p-1">
          <div className="w-full h-full bg-black/20 dark:bg-white/10 rounded-[1px] animate-pulse"></div>
        </div>
      </motion.div>
    );
  }

  const isFavorite = favorites.some(
    (f) =>
      f.name === streamer.name.toLowerCase() && f.platform === currentPlatform
  );

  return (
    <motion.div
      className={`w-full flex items-center h-24 relative ${getBorderClasses()} ${
        COMMON_STYLES.borderStyle
      } select-none`}
      onMouseLeave={() => setHover(false)}
      onMouseEnter={() => setHover(true)}
    >
      {hover && streamer.live && (
        <div className="absolute top-full left-0 right-0 bg-white dark:bg-black z-10 h-72">
          <iframe
            src={`https://player.kick.com/${streamer.name}?autoplay=true`}
            allowFullScreen={true}
            scrolling={"no"}
            height={"100%"}
            frameBorder="0"
            width={"100%"}
          ></iframe>
        </div>
      )}
      <div className="w-24 h-full flex-shrink-0 border-r border-black/20 dark:border-white/15 p-1.5">
        <img
          className="w-full h-full object-cover rounded-[2px] brightness-75"
          src={streamer.avatar}
          alt={streamer.name}
        />
      </div>
      <div className="flex flex-col items-center justify-between w-full h-full">
        <div
          className={classNames(
            "flex flex-col justify-center w-full h-[calc(96px-38px)] px-2",
            {
              "-space-y-0.5": streamer.live,
              "-space-y-1": !streamer.live,
            }
          )}
        >
          {streamer.live ? (
            <>
              <div className="text-xs line-clamp-1 font-semibold opacity-70 dark:opacity-70 flex items-center space-x-1">
                <p>{streamer.name.toUpperCase()} </p>
              </div>
              <a
                className="text-lg font-bold line-clamp-1"
                target="_blank"
                href={"https://kick.com/" + streamer.name}
              >
                {streamer.title}
              </a>
            </>
          ) : (
            <>
              <a
                className="text-lg font-bold line-clamp-1"
                href={"https://kick.com/" + streamer.name}
                target="_blank"
              >
                {streamer.name.toUpperCase()}
              </a>
              <p className="text-xs line-clamp-1 opacity-70 dark:opacity-70">
                {CONVERT_LANG(lang, "Çevrimdışı", "Offline")}
              </p>
            </>
          )}
        </div>
        <div
          className={`flex items-center flex-nowrap w-full border-t ${COMMON_STYLES.borderStyle} h-[38px]`}
        >
          {streamer.live && (
            <div
              className={`h-full center w-10 p-2.5 cursor-pointer border-r ${COMMON_STYLES.borderStyle}`}
            >
              <div className="w-3.5 h-3.5 rounded-full bg-red-700 dark:bg-red-500"></div>
            </div>
          )}
          {streamer.live ? (
            <LiveContent streamer={streamer} lang={lang} />
          ) : (
            <OfflineContent streamer={streamer} />
          )}
          <FavoriteButton
            isActive={isFavorite}
            onClick={() =>
              isFavorite
                ? removeFavorite(streamer.name)
                : addFavorite(streamer.name)
            }
          />
        </div>
      </div>
    </motion.div>
  );
}
