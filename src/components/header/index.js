import { useSettings } from "@/contexts/settings-context";
import { useHeaderState } from "@/hooks/useHeaderState";
import { useModal } from "@/contexts/modal-context";
import { ActionButtons } from "./actions";
import { SearchBar } from "./search";

export default function Header({ server, onSearch }) {
  const { query, handleSearch } = useHeaderState();
  const { openModal } = useModal();
  const { lang } = useSettings();

  return (
    <div className="w-full h-[65px] flex items-center justify-between border-b border-black/20 dark:border-white/15">
      <div className="flex items-center space-x-2 h-full p-2">
        <SearchBar
          lang={lang}
          query={query}
          onSearch={(e) => {
            handleSearch(e);
            onSearch(e.target.value.toLowerCase());
          }}
        />
        <ActionButtons server={server} openModal={openModal} />
      </div>
    </div>
  );
}
