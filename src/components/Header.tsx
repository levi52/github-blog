"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [navFixed, setNavFixed] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isLong, setIsLong] = useState(false);

  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    setNavFixed(y > 50);
    setIsLong(y > 400);
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const percent = maxScroll > 0 ? Math.min(Math.round((y / maxScroll) * 100), 100) : 0;
    setScrollPercent(percent);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showBtn = navFixed;
  const width = !showBtn ? 0 : isLong ? 100 : 36;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        showBtn
          ? "border-border/50 bg-bg/95 backdrop-blur-sm"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight text-text hover:text-accent transition-colors duration-200">
          Levi<span className="text-accent">.</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm text-text-secondary">
          {[
            { href: "/", label: "首页" },
            { href: "/blog/", label: "博客" },
            { href: "/tools/", label: "工具" },
            { href: "/about/", label: "关于" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 rounded-lg hover:text-text hover:bg-border/30 transition-all duration-200"
            >
              {item.label}
            </Link>
          ))}
          <div className="w-px h-4 bg-border mx-1" />
          <ThemeToggle />
          <button
            onClick={scrollToTop}
            className="relative h-9 rounded-full bg-text text-bg font-medium flex items-center justify-center overflow-hidden hover:shadow-[var(--shadow-hover)] transition-all duration-300"
            aria-label="回到顶部"
            style={{
              width,
              opacity: showBtn ? 1 : 0,
              transform: showBtn ? "scale(1)" : "scale(0)",
              pointerEvents: showBtn ? "auto" : "none",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            <span
              className="absolute inset-0 flex items-center justify-center text-sm transition-opacity duration-300"
              style={{ opacity: isLong ? 0 : 1, pointerEvents: "none" }}
            >
              {scrollPercent}
            </span>
            <span
              className="absolute inset-0 flex items-center justify-center text-sm whitespace-nowrap transition-opacity duration-300"
              style={{ opacity: isLong ? 1 : 0, pointerEvents: "none" }}
            >
              返回顶部
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
}
