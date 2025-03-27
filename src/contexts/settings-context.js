"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";

const STORAGE_KEY = "appSettings";
const DEFAULT_SETTINGS = {
  markerClustering: false,
  language: "tr",
  theme: "system",
};

const initialSettings = {
  ...DEFAULT_SETTINGS,
};

const getStoredSettings = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialSettings;
  } catch (error) {
    console.error("Failed to parse stored settings:", error);
    return initialSettings;
  }
};

const saveSettings = (settings) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    return true;
  } catch (error) {
    console.error("Failed to save settings:", error);
    return false;
  }
};

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(initialSettings);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedSettings = getStoredSettings();
    setSettings(storedSettings);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    const applyTheme = (selectedTheme) => {
      if (selectedTheme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
        document.documentElement.className = systemTheme;
      } else {
        document.documentElement.className = selectedTheme;
      }
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (e) => {
      if (settings.theme === "system") {
        applyTheme("system");
      }
    };

    applyTheme(settings.theme);
    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [settings.theme, isInitialized]);

  const updateSettings = useCallback((key, value) => {
    if (!key || typeof key !== "string") {
      console.error("Invalid settings key:", key);
      return false;
    }

    setSettings((prev) => {
      const newSettings = { ...prev, [key]: value };
      saveSettings(newSettings);
      return newSettings;
    });
  }, []);

  const setLang = useCallback(
    (lang) => {
      if (!["en", "tr"].includes(lang)) {
        console.error("Invalid language code:", lang);
        return false;
      }
      return updateSettings("language", lang);
    },
    [updateSettings]
  );

  const setTheme = useCallback(
    (newTheme) => {
      if (!["light", "dark", "system"].includes(newTheme)) {
        console.error("Invalid theme:", newTheme);
        return false;
      }
      return updateSettings("theme", newTheme);
    },
    [updateSettings]
  );

  const contextValue = useMemo(
    () => ({
      settings,
      updateSettings,
      lang: settings.language,
      setLang,
      theme: settings.theme,
      setTheme,
      isInitialized,
    }),
    [settings, updateSettings, setLang, setTheme, isInitialized]
  );

  if (!isInitialized) {
    return null;
  }

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within SettingsProvider");
  }
  return context;
};
