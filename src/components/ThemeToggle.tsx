"use client";

import { useRef } from "react";
import { useTheme } from "@/lib/useTheme";

export default function ThemeToggle() {
  const { isDark, isMounted, toggleTheme, isReducedMotion } = useTheme();
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleToggle = (e: React.MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;

    const startViewTransition = (document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } }).startViewTransition;
    if (!startViewTransition || isReducedMotion()) {
      toggleTheme();
      return;
    }

    const transition = startViewTransition.call(document, () => {
      toggleTheme();
    });

    transition.ready.then(() => {
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        {
          clipPath,
        },
        {
          duration: 500,
          easing: "ease-in",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    });
  };

  if (!isMounted) {
    return <div className="w-9 h-9" />;
  }

  return (
    <button
      ref={btnRef}
      onClick={handleToggle}
      className="w-9 h-9 flex items-center justify-center rounded-lg border border-border hover:border-border-hover hover:bg-surface-hover transition-colors duration-200 cursor-pointer"
      aria-label={isDark ? "切换到亮色模式" : "切换到暗色模式"}
    >
      <div className="relative w-4 h-4">
        {isDark ? (
          <svg
            className="absolute inset-0 w-4 h-4 text-text-secondary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg
            className="absolute inset-0 w-4 h-4 text-text-secondary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </div>
    </button>
  );
}
