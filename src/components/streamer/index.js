"use client";

import { CALCULATE_UPTIME2, CONVERT_GAME, CONVERT_LANG } from "@/lib/utils";
import { useStreamer } from "@/contexts/StreamerContext";
import { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../icon";
import classNames from "classnames";

export default function Streamer({ lang, index, total, streamer }) {
  const { setFavorites, favorites } = useStreamer();
  const [currentPlatform] = useState("kick");

  const colIndex = index % 3;
  const rowIndex = Math.floor(index / 3);
  const totalRows = Math.ceil(total / 3);

  const borderClasses = [
    colIndex < 2 ? "border-r" : "",

    rowIndex < totalRows - 1 ? "border-b" : "",
  ].join(" ");

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

  if (!streamer)
    return (
      <motion.div
        className={`w-full flex items-center h-24 ${borderClasses} border-black/20 dark:border-white/15`}
      >
        <div className="w-24 h-full flex-shrink-0 border-r border-black/20 dark:border-white/15 p-1">
          <div className="w-full h-full bg-black/20 dark:bg-white/10 rounded-[1px] animate-pulse"></div>
        </div>
        <div className="w-full h-full p-1">
          <div className="w-full h-full bg-black/20 dark:bg-white/10 rounded-[1px] animate-pulse"></div>
        </div>
      </motion.div>
    );

  return (
    <motion.div
      className={`w-full flex items-center h-24 ${borderClasses} border-black/20 dark:border-white/15 select-none`}
    >
      <div className="w-24 h-full flex-shrink-0 border-r border-black/20 dark:border-white/15 p-1.5">
        <img
          className="w-full h-full object-cover rounded-[2px] opacity-80"
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
        {streamer.live ? (
          <div className="flex items-center flex-nowrap w-full border-t border-black/20 dark:border-white/15 h-[38px]">
            <div className="h-full center w-10 p-2.5 cursor-pointer border-r border-black/20 dark:border-white/15">
              <div className="w-3.5 h-3.5 rounded-full bg-red-700 dark:bg-red-500"></div>
            </div>
            <div className="flex items-center space-x-3 flex-auto w-1/4 h-full border-r border-black/20 dark:border-white/15">
              <div className="h-full border-r border-black/20 dark:border-white/15 center w-10">
                <Icon icon={"solar:gamepad-bold"} />
              </div>
              <p className="text-xs line-clamp-1">{streamer.game}</p>
            </div>
            <div className="flex items-center space-x-3 flex-auto w-1/4 h-full border-r border-black/20 dark:border-white/15">
              <div className="h-full border-r border-black/20 dark:border-white/15 center w-10">
                <Icon icon={"solar:eye-bold"} />
              </div>
              <p className="text-xs line-clamp-1">
                {streamer.viewers} {CONVERT_LANG(lang, "izleyici", "viewers")}
              </p>
            </div>
            <div className="flex items-center space-x-3 flex-auto w-1/4 h-full border-r border-black/20 dark:border-white/15">
              <div className="h-full border-r border-black/20 dark:border-white/15 center w-10">
                <Icon icon={"solar:clock-circle-bold"} />
              </div>
              <p className="text-xs line-clamp-1">
                {CALCULATE_UPTIME2(streamer.startedAt)}
              </p>
            </div>
            {favorites.some(
              (f) =>
                f.name === streamer.name.toLowerCase() &&
                f.platform === currentPlatform
            ) ? (
              <div
                className="h-full center w-10 p-2.5 cursor-pointer"
                onClick={() => removeFavorite(streamer.name)}
              >
                <Icon icon={"solar:bookmark-bold"} />
              </div>
            ) : (
              <div
                className="h-full center w-10 p-2.5 cursor-pointer"
                onClick={() => addFavorite(streamer.name)}
              >
                <Icon icon={"solar:bookmark-outline"} />
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center flex-nowrap w-full border-t border-black/20 dark:border-white/15 h-[38px]">
            <div className="flex items-center space-x-3 flex-auto w-1/4 h-full border-r border-black/20 dark:border-white/15">
              <div className="h-full border-r border-black/20 dark:border-white/15 center w-10">
                <Icon icon={"solar:gamepad-bold"} />
              </div>
              <p className="text-xs line-clamp-1">
                {streamer.followers} takipçi
              </p>
            </div>
            <div className="flex items-center space-x-3 flex-auto w-1/4 h-full border-r border-black/20 dark:border-white/15">
              <div className="h-full border-r border-black/20 dark:border-white/15 center w-10">
                <Icon icon={"material-symbols:cake"} />
              </div>
              <p className="text-xs line-clamp-1">{streamer.createdAt}</p>
            </div>
            {favorites.some(
              (f) =>
                f.name === streamer.name.toLowerCase() &&
                f.platform === currentPlatform
            ) ? (
              <div
                className="h-full center w-10 p-2.5 cursor-pointer"
                onClick={() => removeFavorite(streamer.name)}
              >
                <Icon icon={"solar:bookmark-bold"} />
              </div>
            ) : (
              <div
                className="h-full center w-10 p-2.5 cursor-pointer"
                onClick={() => addFavorite(streamer.name)}
              >
                <Icon icon={"solar:bookmark-outline"} />
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
