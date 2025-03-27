import { useSettings } from "@/contexts/settings-context";
import React, { useEffect, useState, memo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LANGUAGES, THEMES } from "@/constants/modal";
import { CONVERT_LANG } from "@/lib/utils";
import Icon from "@/components/icon";

const LanguageSelector = memo(
  ({ selectedLanguage, isOpen, onToggle, onSelect }) => (
    <div className="relative w-full h-[52px]">
      <div
        className="h-full w-full bg-white/5 border border-black/20 dark:border-white/15 rounded flex items-center cursor-pointer"
        onClick={onToggle}
      >
        {selectedLanguage && (
          <>
            <Icon
              className="border-r border-black/20 dark:border-white/15 h-full w-[50px] center flex-shrink-0"
              icon={selectedLanguage.flag}
            />
            <span className="text-sm px-3 truncate">
              {selectedLanguage.name.en}
            </span>
          </>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="absolute top-0 left-0 w-full border border-black/20 dark:border-white/15 rounded z-10 bg-white dark:bg-black overflow-hidden"
            transition={{ duration: 0.2, ease: "easeOut" }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {LANGUAGES.map((language) => (
              <li
                key={language.code}
                className="text-sm h-[52px] hover:bg-white/20 cursor-pointer flex items-center border-b border-black/20 dark:border-white/15 last:border-none"
                onClick={() => onSelect(language)}
              >
                <Icon
                  className="border-r border-black/20 dark:border-white/15 size-[50px] center flex-shrink-0"
                  icon={language.flag}
                />
                <span className="ml-3 whitespace-nowrap">
                  {language.name.en}
                </span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
);

const ThemeSelector = memo(
  ({ lang, selectedTheme, isOpen, onToggle, onSelect }) => (
    <div className="relative w-full h-[52px]">
      <div
        className="h-full w-full bg-white/5 border border-black/20 dark:border-white/15 rounded flex items-center cursor-pointer"
        onClick={onToggle}
      >
        {selectedTheme && (
          <>
            <Icon
              className="border-r border-black/20 dark:border-white/15 h-full w-[50px] center flex-shrink-0"
              icon={selectedTheme.icon}
            />
            <span className="text-sm px-3 truncate">
              {selectedTheme.name[lang]}
            </span>
          </>
        )}
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="absolute top-0 left-0 w-full border border-black/20 dark:border-white/15 rounded z-10 bg-white dark:bg-black overflow-hidden"
            transition={{ duration: 0.2, ease: "easeOut" }}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {THEMES.map((theme) => (
              <li
                key={theme.id}
                className="text-sm h-[52px] hover:bg-white/20 cursor-pointer flex items-center border-b border-black/20 dark:border-white/15 last:border-none"
                onClick={() => onSelect(theme)}
              >
                <Icon
                  className="border-r border-black/20 dark:border-white/15 size-[50px] center flex-shrink-0"
                  icon={theme.icon}
                />
                <span className="ml-3 whitespace-nowrap">
                  {theme.name[lang]}
                </span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
);

const VersionInfo = memo(({ lang }) => (
  <div className="p-4 border-t border-black/20 dark:border-white/15">
    <p className="text-xs text-center">
      {CONVERT_LANG(
        lang,
        ".yennawigh tarafından oluşturuldu.",
        ".created by yennawigh."
      )}
    </p>
  </div>
));

const Settings = () => {
  const { settings, updateSettings, lang, setLang } = useSettings();
  const [selectedLanguage, setSelectedLanguage] = useState(
    LANGUAGES.find((language) => language.code === lang) || LANGUAGES[1]
  );
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(
    THEMES.find((theme) => theme.id === settings.theme) || THEMES[0]
  );

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    setLang(language.code);
    setIsLanguageOpen(false);
  };

  const handleThemeChange = (theme) => {
    setSelectedTheme(theme);
    updateSettings("theme", theme.id);
    setIsThemeOpen(false);
  };

  useEffect(() => {
    const newSelectedLanguage = LANGUAGES.find(
      (language) => language.code === lang
    );
    setSelectedLanguage(newSelectedLanguage);
  }, [lang]);

  return (
    <div className="flex flex-col space-y-2 w-full sm:w-screen sm:max-w-md">
      <div className="flex flex-col space-y-2 pt-2 px-2">
        <LanguageSelector
          selectedLanguage={selectedLanguage}
          isOpen={isLanguageOpen}
          onToggle={() => setIsLanguageOpen(!isLanguageOpen)}
          onSelect={handleLanguageChange}
        />
        <ThemeSelector
          lang={lang}
          selectedTheme={selectedTheme}
          isOpen={isThemeOpen}
          onToggle={() => setIsThemeOpen(!isThemeOpen)}
          onSelect={handleThemeChange}
        />
      </div>
      <VersionInfo lang={lang} />
    </div>
  );
};

export default memo(Settings);
