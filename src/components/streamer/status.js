import { useEffect, useState } from "react";
import { CONVERT_LANG } from "@/lib/utils";
import { motion } from "framer-motion";
import Icon from "../icon";

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
        .then(async (response) => {
          const data = await response.json();
          if (!response.ok) {
            setStatus(data);
            return;
          }
          if (data?.Data !== undefined) {
            setStatus(data.Data);
          } else {
            setStatus(data);
          }
        })
        .catch((error) => {
          setStatus({ error: error.message });
        });
    } else {
      setStatus({ error: "No server code provided" });
    }
  }, [server]);

  return (
    <motion.div
      className={`w-full flex items-center h-24 border-r border-b border-black/20 dark:border-white/15 border-dashed select-none`}
    >
      <div className="w-24 h-full flex-shrink-0 border-r border-black/20 dark:border-white/15 border-dashed p-1.5">
        <img
          className="w-full h-full object-cover rounded-[2px] brightness-75"
          src={server.LOGO}
          alt={server.NAME}
        />
      </div>
      <div className="w-full h-full flex flex-col justify-center">
        <div className="flex flex-col justify-center w-full h-[calc(96px-38px)] px-4">
          <h1 className="text-2xl font-bold">{server.NAME.toUpperCase()}</h1>
        </div>
        <div className="flex items-center flex-nowrap w-full border-t border-black/20 dark:border-white/15 border-dashed h-[38px]">
          {status?.response === "Too many requests." ? (
            <div className="flex items-center space-x-3 flex-auto w-full h-full">
              <div className="h-full border-r border-black/20 dark:border-white/15 border-dashed center w-10">
                <Icon variant="warming" icon={"solar:danger-square-bold"} />
              </div>
              <p className="text-xs line-clamp-1">{status.response}</p>
            </div>
          ) : status?.error === "404 Not Found" ? (
            <div className="flex items-center space-x-3 flex-auto w-full h-full">
              <div className="h-full border-r border-black/20 dark:border-white/15 border-dashed center w-10">
                <Icon variant="danger" icon={"solar:danger-square-bold"} />
              </div>
              <p className="text-xs line-clamp-1">{status.error}</p>
            </div>
          ) : status?.error === "Failed to fetch" ? (
            <div className="flex items-center space-x-3 flex-auto w-full h-full">
              <div className="h-full border-r border-black/20 dark:border-white/15 border-dashed center w-10">
                <Icon variant="danger" icon={"solar:danger-square-bold"} />
              </div>
              <p className="text-xs line-clamp-1">{status.error}</p>
            </div>
          ) : status?.error === "No server code provided" ? (
            <div className="flex items-center space-x-3 flex-auto w-full h-full">
              <div className="h-full border-r border-black/20 dark:border-white/15 border-dashed center w-10">
                <Icon variant="danger" icon={"solar:danger-square-bold"} />
              </div>
              <p className="text-xs line-clamp-1">{status.error}</p>
            </div>
          ) : (
            <>
              <div className="flex items-center space-x-3 flex-auto w-1/4 h-full border-r border-black/20 dark:border-white/15 border-dashed">
                <div className="h-full border-r border-black/20 dark:border-white/15 border-dashed center w-10">
                  <Icon icon={"solar:users-group-two-rounded-bold"} />
                </div>
                <p className="text-xs line-clamp-1">
                  {status?.clients}{" "}
                  {CONVERT_LANG(lang, " oyuncu aktif", " player online")}
                </p>
              </div>
              <div className="flex items-center space-x-3 flex-auto w-1/4 h-full">
                <div className="h-full border-r border-black/20 dark:border-white/15 border-dashed center w-10">
                  <Icon icon={"ic:baseline-discord"} />
                </div>
                <p className="text-xs line-clamp-1">{status?.vars?.Discord}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
