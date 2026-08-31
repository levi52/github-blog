"use client";

import { useEffect } from "react";

export default function ThemeInit() {
  useEffect(() => {
    const accentColor = localStorage.getItem("accent-color");
    if (accentColor && accentColor !== "default") {
      document.documentElement.setAttribute("data-accent", accentColor);
    }
  }, []);

  return null;
}
