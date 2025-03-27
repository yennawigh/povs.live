import { CONVERT_LANG } from "@/lib/utils";
import { memo, useState } from "react";
import Icon from "../icon";

export const SearchBar = memo(({ query, onSearch, lang }) => {
  const placeholder = CONVERT_LANG(lang, "Ara", "Search");

  return (
    <div className="w-[250px] h-full border border-black/20 dark:border-white/15 rounded flex items-center cursor-pointer transition-all duration-300 ease-in-out">
      <input
        className="bg-transparent text-sm focus:outline-none w-full px-3 placeholder:/50 transition-colors"
        placeholder={placeholder}
        aria-label={placeholder}
        onChange={onSearch}
        value={query}
        type="text"
        autoFocus
      />
      <Icon
        className="h-full w-[50px] center flex-shrink-0 border-l border-black/20 dark:border-white/15"
        icon="lets-icons:search-duotone-line"
        size={25}
      />
    </div>
  );
});
