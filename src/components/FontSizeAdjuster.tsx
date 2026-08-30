"use client";

import { useState, useEffect } from "react";

export default function FontSizeAdjuster() {
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    const saved = localStorage.getItem("fontSize");
    if (saved) {
      const size = parseInt(saved, 10);
      setFontSize(size);
      const prose = document.querySelector(".prose");
      if (prose) {
        (prose as HTMLElement).style.fontSize = `${size}px`;
      }
    }
  }, []);

  const adjust = (delta: number) => {
    const newSize = Math.min(Math.max(fontSize + delta, 12), 24);
    setFontSize(newSize);
    localStorage.setItem("fontSize", String(newSize));
    const prose = document.querySelector(".prose");
    if (prose) {
      (prose as HTMLElement).style.fontSize = `${newSize}px`;
    }
  };

  return (
    <div className="flex items-center gap-1 text-xs">
      <button
        onClick={() => adjust(-1)}
        className="w-7 h-7 flex items-center justify-center rounded-lg border border-border hover:border-border-hover hover:bg-surface-hover transition-all duration-200 font-bold text-text-muted"
        aria-label="减小字体"
      >
        A-
      </button>
      <span className="w-6 text-center text-text-muted">{fontSize}</span>
      <button
        onClick={() => adjust(1)}
        className="w-7 h-7 flex items-center justify-center rounded-lg border border-border hover:border-border-hover hover:bg-surface-hover transition-all duration-200 font-bold text-text-muted"
        aria-label="增大字体"
      >
        A+
      </button>
    </div>
  );
}
