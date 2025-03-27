import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Icon from "../icon";
import { CONVERT_LANG } from "@/lib/utils";

export default function ServerCard({ lang, server }) {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (server?.CODE) {
      fetch(
        `https://servers-frontend.fivem.net/api/servers/single/${server.CODE}`,
        {
          headers: { "Content-Type": "application/json" },
          mode: "cors",
        }
      )
        .then((response) => {
          if (!response.ok) throw new Error("Network response was not ok");
          return response.json();
        })
        .then((data) => {
          if (data?.Data !== undefined) {
            setStatus(data.Data);
          } else {
            setStatus({
              error: CONVERT_LANG(lang, "Sunucu kapalı", "Server down"),
            });
          }
        })
        .catch(() =>
          setStatus({
            error: CONVERT_LANG(lang, "Sunucu kapalı", "Server down"),
          })
        );
    } else {
      setStatus({
        error: CONVERT_LANG(
          lang,
          "Oyuncu sayısı alınamadı",
          "Player count could not be obtained"
        ),
      });
    }
  }, [server]);

  console.log(status);

  return (
    <motion.div
      className={`w-full flex items-center h-24 border-r border-b border-black/20 dark:border-white/15 select-none`}
    >
      <div className="w-24 h-full flex-shrink-0 border-r border-black/20 dark:border-white/15 p-1.5">
        <img
          className="w-full h-full object-cover rounded-[2px] brightness-75"
          src={server.LOGO}
          alt={server.NAME}
        />
      </div>
      <div className="w-full h-full flex flex-col justify-center">
        <div className="flex flex-col justify-center w-full h-[calc(96px-38px)] px-4">
          <h1 className="text-2xl font-bold">{server.NAME}</h1>
        </div>
        <div className="flex items-center flex-nowrap w-full border-t border-black/20 dark:border-white/15 h-[38px]">
          <div className="flex items-center space-x-3 flex-auto w-1/4 h-full border-r border-black/20 dark:border-white/15">
            <div className="h-full border-r border-black/20 dark:border-white/15 center w-10">
              <Icon icon={"solar:users-group-two-rounded-bold"} />
            </div>
            <p className="text-xs line-clamp-1">
              {status?.clients}{" "}
              {CONVERT_LANG(lang, " oyuncu aktif", " players online")}
            </p>
          </div>
          <div className="flex items-center space-x-3 flex-auto w-1/4 h-full">
            <div className="h-full border-r border-black/20 dark:border-white/15 center w-10">
              <Icon icon={"ic:baseline-discord"} />
            </div>
            <p className="text-xs line-clamp-1">{status?.vars?.Discord}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
