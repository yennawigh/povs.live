import { useSettings } from "@/contexts/settings-context";
import { useModal } from "@/contexts/modal-context";
import { ActionButtons } from "./actions";
import { SearchBar } from "./search";
import { useHeaderState } from "@/hooks/useHeaderState";
import { apiService } from "@/services/apiService";
import { useEffect, useState } from "react";

export default function Header({ server, onSearch }) {
  const { query, handleSearch } = useHeaderState();
  const [players, setPlayers] = useState(null);
  const { openModal } = useModal();
  const { lang } = useSettings();

  useEffect(() => {
    if (server?.CODE) {
      fetch(
        `https://servers-frontend.fivem.net/api/servers/single/${server?.CODE}`,
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
          if (data?.Data?.clients !== undefined) {
            setPlayers({ clients: data.Data.clients });
          } else {
            setPlayers({ error: "Sunucu kapalı" });
          }
        })
        .catch(() => setPlayers({ error: "Sunucu kapalı" }));
    } else {
      setPlayers({ error: "Oyuncu sayısı alınamadı" });
    }
  }, [server]);

  return (
    <div className="w-full h-[65px] flex items-center justify-between border-b border-black/20 dark:border-white/15 p-2">
      <div className="flex items-center space-x-2 h-full w-auto">
        <img
          className="h-full w-auto flex-shrink-0 rounded"
          src={server.LOGO}
        />
        <div className="flex flex-col -space-y-1">
          <h3 className="text-lg font-bold">{server.NAME.toUpperCase()}</h3>
          <p className="text-xs opacity-70 dark:opacity-70">
            {server.ANNOUNCEMENT}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2 h-full">
        <SearchBar
          lang={lang}
          query={query}
          onSearch={(e) => {
            handleSearch(e);
            onSearch(e.target.value.toLowerCase());
          }}
        />
        <ActionButtons openModal={openModal} />
      </div>
    </div>
  );
}
