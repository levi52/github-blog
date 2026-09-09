"use client";

import { useState, useEffect, useCallback } from "react";

export type Theme = "light" | "dark";
export type AccentColor = "default" | "zhuhong" | "qinghua" | "dianqing" | "tanhua" | "ziyao";
/** Visual skin. "default" is the parchment house style; "neobrutal" is the N skin. */
export type StyleName = "default" | "neobrutal";

export interface ThemeState {
  theme: Theme;
  accentColor: AccentColor;
  styleName: StyleName;
  isDark: boolean;
  isMounted: boolean;
}

export interface ThemeActions {
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  setAccentColor: (color: AccentColor) => void;
  setStyleName: (style: StyleName) => void;
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

export function isValidStyleName(value: string): value is StyleName {
  return value === "default" || value === "neobrutal";
}

function getInitialStyleName(): StyleName {
  if (typeof window === "undefined") return "default";
  const saved = localStorage.getItem("style");
  if (saved && isValidStyleName(saved)) return saved;
  return "default";
}

/** The default skin carries no attribute; only opt-in skins do. */
function applyStyleName(style: StyleName) {
  if (style === "default") {
    document.documentElement.removeAttribute("data-style");
  } else {
    document.documentElement.setAttribute("data-style", style);
  }
}

export function useTheme(): ThemeState & ThemeActions {
  const [theme, setThemeState] = useState<Theme>("light");
  const [accentColor, setAccentColorState] = useState<AccentColor>("default");
  const [styleName, setStyleNameState] = useState<StyleName>("default");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const initialTheme = getInitialTheme();
    const initialAccent = getInitialAccentColor();
    const initialStyle = getInitialStyleName();

    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    if (initialAccent !== "default") {
      document.documentElement.setAttribute("data-accent", initialAccent);
    }

    applyStyleName(initialStyle);

    const handleMount = () => {
      setThemeState(initialTheme);
      setAccentColorState(initialAccent);
      setStyleNameState(initialStyle);
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

  const setStyleName = useCallback((style: StyleName) => {
    setStyleNameState(style);
    localStorage.setItem("style", style);
    applyStyleName(style);
  }, []);

  const isReducedMotion = useCallback(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  return {
    theme,
    accentColor,
    styleName,
    isDark: theme === "dark",
    isMounted,
    setTheme,
    toggleTheme,
    setAccentColor,
    setStyleName,
    isReducedMotion,
  };
}

export default useTheme;
