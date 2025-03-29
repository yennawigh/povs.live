import { CONVERT_LANG } from "@/lib/utils";
import { memo, useState } from "react";
import Icon from "../icon";

export const SearchBar = memo(({ query, onSearch, lang }) => {
  const placeholder = CONVERT_LANG(lang, "Ara", "Search");

  return (
    <div className="w-[250px] h-full border border-black/20 dark:border-white/15 border-dashed rounded flex items-center cursor-pointer transition-all duration-300 ease-in-out">
      <Icon
        className="h-full w-[50px] center flex-shrink-0 border-r border-black/20 dark:border-white/15 border-dashed"
        icon="si:search-line"
        size={25}
      />
      <input
        className="bg-transparent text-sm focus:outline-none w-full px-3 placeholder:/50 transition-colors"
        placeholder={placeholder}
        aria-label={placeholder}
        onChange={onSearch}
        value={query}
        type="text"
        autoFocus
      />
    </div>
  );
});
