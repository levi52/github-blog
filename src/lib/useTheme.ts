"use client";

import { useState, useEffect, useCallback } from "react";

export type Theme = "light" | "dark";
export type AccentColor = "default" | "zhuhong" | "qinghua" | "dianqing" | "tanhua" | "ziyao";

export interface ThemeState {
  theme: Theme;
  accentColor: AccentColor;
  isDark: boolean;
  isMounted: boolean;
}

export interface ThemeActions {
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setAccentColor: (color: AccentColor) => void;
  isReducedMotion: () => boolean;
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getInitialAccentColor(): AccentColor {
  if (typeof window === "undefined") return "default";
  const saved = localStorage.getItem("accent-color");
  if (saved && isValidAccentColor(saved)) return saved;
  return "default";
}

function isValidAccentColor(value: string): value is AccentColor {
  return ["default", "zhuhong", "qinghua", "dianqing", "tanhua", "ziyao"].includes(value);
}

export function useTheme(): ThemeState & ThemeActions {
  const [theme, setThemeState] = useState<Theme>("light");
  const [accentColor, setAccentColorState] = useState<AccentColor>("default");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const initialTheme = getInitialTheme();
    const initialAccent = getInitialAccentColor();

    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    if (initialAccent !== "default") {
      document.documentElement.setAttribute("data-accent", initialAccent);
    }

    const handleMount = () => {
      setThemeState(initialTheme);
      setAccentColorState(initialAccent);
      setIsMounted(true);
    };

    if (typeof window !== "undefined") {
      handleMount();
    }
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  }, [theme, setTheme]);

  const setAccentColor = useCallback((color: AccentColor) => {
    setAccentColorState(color);
    localStorage.setItem("accent-color", color);
    if (color === "default") {
      document.documentElement.removeAttribute("data-accent");
    } else {
      document.documentElement.setAttribute("data-accent", color);
    }
  }, []);

  const isReducedMotion = useCallback(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  return {
    theme,
    accentColor,
    isDark: theme === "dark",
    isMounted,
    setTheme,
    toggleTheme,
    setAccentColor,
    isReducedMotion,
  };
}

export default useTheme;
