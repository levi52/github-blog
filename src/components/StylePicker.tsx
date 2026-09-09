"use client";

import { useTheme, type StyleName } from "@/lib/useTheme";
import { colorOptions } from "./ColorPicker";

interface StyleOption {
  id: StyleName;
  name: string;
  desc: string;
  /** Canvas / surface / ink of the skin; the accent comes from the active theme. */
  chrome: { bg: string; surface: string; ink: string };
}

const styleOptions: StyleOption[] = [
  {
    id: "default",
    name: "古风羊皮纸",
    desc: "暖纸底 + 衬线标题，站点默认风格",
    chrome: { bg: "#f5f0e8", surface: "#fffdf9", ink: "#2d2a26" },
  },
  {
    id: "neobrutal",
    name: "Neo-brutalist",
    desc: "墨黑硬边框、直角与硬阴影",
    chrome: { bg: "#f6f3ea", surface: "#fffdf7", ink: "#141414" },
  },
];

function Swatch({
  chrome,
  accent,
}: {
  chrome: StyleOption["chrome"];
  accent: string;
}) {
  return (
    <span
      aria-hidden="true"
      className="relative block w-14 h-10 shrink-0 border-2 border-current"
      style={{ backgroundColor: chrome.bg }}
    >
      <span
        className="absolute left-1.5 top-1.5 w-7 h-4 block border border-current"
        style={{ backgroundColor: chrome.surface }}
      />
      <span
        className="absolute right-1.5 bottom-1.5 w-5 h-3 block"
        style={{ backgroundColor: accent }}
      />
      <span
        className="absolute left-1.5 bottom-1.5 w-1.5 h-1.5 block"
        style={{ backgroundColor: chrome.ink }}
      />
    </span>
  );
}

export default function StylePicker() {
  const { styleName, setStyleName, accentColor, isDark } = useTheme();

  const active = colorOptions.find((option) => option.id === accentColor) ?? colorOptions[0];
  const accentHex = isDark ? active.darkColor : active.color;

  return (
    <div className="p-6 bg-surface border border-border rounded-xl">
      <h3 className="text-lg font-semibold text-text mb-2">界面风格</h3>
      <p className="text-sm text-text-muted mb-4">
        选择整体视觉风格，可与明暗模式、主题配色自由组合。
      </p>
      <div
        role="radiogroup"
        aria-label="界面风格选择"
        className="grid grid-cols-1 sm:grid-cols-2 gap-3"
      >
        {styleOptions.map((option) => {
          const isActive = styleName === option.id;
          return (
            <button
              key={option.id}
              role="radio"
              aria-checked={isActive}
              onClick={() => setStyleName(option.id)}
              className={`flex items-center gap-4 p-4 text-left border transition-all duration-200 cursor-pointer ${
                isActive
                  ? "border-accent bg-accent/10"
                  : "border-border hover:border-border-hover hover:bg-bg-secondary"
              }`}
            >
              <Swatch chrome={option.chrome} accent={accentHex} />
              <span className="min-w-0">
                <span
                  className={`block text-sm font-semibold mb-0.5 ${
                    isActive ? "text-accent" : "text-text"
                  }`}
                >
                  {option.name}
                </span>
                <span className="block text-xs text-text-muted leading-relaxed">
                  {option.desc}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
