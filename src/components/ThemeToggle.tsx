"use client";

import { useState, useEffect, useRef } from "react";

function isReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const darkRef = useRef(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const saved = localStorage.getItem("theme");
    const isDarkMode = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(isDarkMode);
    darkRef.current = isDarkMode;
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggle = (e: React.MouseEvent) => {
    const next = !dark;
    const x = e.clientX;
    const y = e.clientY;

    const startViewTransition = (document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } }).startViewTransition;
    if (!startViewTransition || isReducedMotion()) {
      setDark(next);
      darkRef.current = next;
      localStorage.setItem("theme", next ? "dark" : "light");
      document.documentElement.classList.toggle("dark", next);
      return;
    }

    const transition = startViewTransition.call(document, () => {
      document.documentElement.classList.toggle("dark", next);
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

      setTimeout(() => {
        setDark(next);
        darkRef.current = next;
        localStorage.setItem("theme", next ? "dark" : "light");
      }, 500);
    });
  };

  if (!mounted) {
    return <div className="w-9 h-9" />;
  }

  return (
    <button
      ref={btnRef}
      onClick={toggle}
      className="w-9 h-9 flex items-center justify-center rounded-lg border border-border hover:border-border-hover hover:bg-surface-hover transition-colors duration-200"
      aria-label="Toggle theme"
    >
      <div className="relative w-4 h-4">
        {dark ? (
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
