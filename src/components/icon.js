"use client";
import { useSettings } from "@/contexts/settings-context";
import { Icon as IconifyIcon } from "@iconify-icon/react";
import { useEffect, useState } from "react";
import cn from "classnames";

export default function Icon({
  variant = "default",
  spin = false,
  size = 24,
  className,
  onClick,
  color,
  icon,
  ...props
}) {
  const { theme } = useSettings();
  const [systemTheme, setSystemTheme] = useState("light");

  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setSystemTheme("dark");
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => setSystemTheme(e.matches ? "dark" : "light");
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const getVariantColor = () => {
    const currentTheme = theme === "system" ? systemTheme : theme;

    const variants = {
      default: currentTheme === "dark" ? "white" : "black",
      primary: currentTheme === "dark" ? "#60A5FA" : "#2563EB", // blue
      success: currentTheme === "dark" ? "#4ADE80" : "#22C55E", // green
      warning: currentTheme === "dark" ? "#FCD34D" : "#F59E0B", // yellow
      danger: currentTheme === "dark" ? "#FB7185" : "#EF4444", // red
    };

    return variants[variant] || variants.default;
  };

  const styles = cn(
    {
      "animate-spin": spin,
    },
    className
  );

  return (
    <IconifyIcon
      icon={icon}
      size={size}
      height={size}
      className={styles}
      style={{ color: color || getVariantColor() }}
      onClick={onClick}
      {...props}
    />
  );
}
