"use client";

import { useState, useEffect } from "react";

interface ColorOption {
  id: string;
  name: string;
  color: string;
  darkColor: string;
}

const colorOptions: ColorOption[] = [
  { id: "default", name: "朱砂", color: "#b22222", darkColor: "#cd5c5c" },
  { id: "zhuhong", name: "胭脂", color: "#c41d1d", darkColor: "#e74c3c" },
  { id: "qinghua", name: "青花", color: "#2e8b57", darkColor: "#3cb371" },
  { id: "dianqing", name: "靛青", color: "#4a6fa5", darkColor: "#6495ed" },
  { id: "tanhua", name: "檀花", color: "#cd853f", darkColor: "#daa06d" },
  { id: "ziyao", name: "紫窑", color: "#7b68ee", darkColor: "#9370db" },
];

export default function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState("default");
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("accent-color");
    if (saved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedColor(saved);
      document.documentElement.setAttribute("data-accent", saved);
    }

    const darkMode = localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDark(darkMode);
  }, []);

  const handleColorChange = (colorId: string) => {
    setSelectedColor(colorId);
    localStorage.setItem("accent-color", colorId);
    if (colorId === "default") {
      document.documentElement.removeAttribute("data-accent");
    } else {
      document.documentElement.setAttribute("data-accent", colorId);
    }
  };

  return (
    <div className="p-6 bg-surface border border-border rounded-xl">
      <h3 className="text-lg font-semibold text-text mb-4">主题配色</h3>
      <p className="text-sm text-text-muted mb-4">选择你喜欢的强调色</p>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {colorOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => handleColorChange(option.id)}
            className={`group flex flex-col items-center gap-2 p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
              selectedColor === option.id
                ? "border-accent bg-accent/10"
                : "border-border hover:border-border-hover hover:bg-bg-secondary"
            }`}
          >
            <div
              className="w-8 h-8 rounded-full border-2 border-surface shadow-md group-hover:scale-110 transition-transform duration-200"
              style={{ backgroundColor: isDark ? option.darkColor : option.color }}
            />
            <span className={`text-xs ${
              selectedColor === option.id ? "text-accent font-medium" : "text-text-muted"
            }`}>
              {option.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
