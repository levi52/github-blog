"use client";

import { useEffect } from "react";

export default function AccentColorInit() {
  useEffect(() => {
    const saved = localStorage.getItem("accent-color");
    if (saved && saved !== "default") {
      document.documentElement.setAttribute("data-accent", saved);
    }
  }, []);

  return null;
}
