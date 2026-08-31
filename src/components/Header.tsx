"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

interface DropdownItem {
  href: string;
  label: string;
}

interface NavItem {
  href?: string;
  label: string;
  dropdown?: DropdownItem[];
}

const navItems: NavItem[] = [
  { href: "/", label: "首页" },
  {
    label: "文章",
    dropdown: [
      { href: "/blog/", label: "全部文章" },
      { href: "/blog/?view=categories", label: "全部分类" },
      { href: "/blog/?view=tags", label: "全部标签" },
      { href: "/blog/?view=series", label: "全部系列" },
    ],
  },
  { href: "/tools/", label: "工具" },
  { href: "/about/", label: "关于" },
];

export default function Header() {
  const [navFixed, setNavFixed] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);
  const [isLong, setIsLong] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = useCallback(() => {
    const y = window.scrollY;
    setNavFixed(y > 50);
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const percent = maxScroll > 0 ? Math.min(Math.round((y / maxScroll) * 100), 100) : 0;
    setScrollPercent(percent);
    setIsLong(percent >= 50);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const showBtn = navFixed;
  const width = !showBtn ? 0 : isLong ? 110 : 36;

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
          Levi5<span className="text-accent">.</span>
        </Link>
        <nav className="flex items-center gap-1 text-sm text-text-secondary">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.dropdown && handleMouseEnter(item.label)}
              onMouseLeave={handleMouseLeave}
            >
              {item.href ? (
                <Link
                  href={item.href}
                  className="px-3 py-2 rounded-lg hover:text-text hover:bg-border/30 transition-all duration-200 flex items-center gap-1"
                >
                  {item.label}
                </Link>
              ) : (
                <button
                  className="px-3 py-2 rounded-lg hover:text-text hover:bg-border/30 transition-all duration-200 flex items-center gap-1"
                >
                  {item.label}
                  <svg
                    className={`w-3 h-3 transition-transform duration-200 ${
                      openDropdown === item.label ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}
              {item.dropdown && openDropdown === item.label && (
                <div className="absolute top-full left-0 mt-1 w-40 py-2 bg-surface border border-border rounded-lg shadow-lg animate-dropdown-in">
                  {item.dropdown.map((dropdownItem) => (
                    <Link
                      key={dropdownItem.href}
                      href={dropdownItem.href}
                      className="block px-4 py-2 text-sm text-text-secondary hover:text-text hover:bg-border/30 transition-all duration-200"
                    >
                      {dropdownItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="w-px h-4 bg-border mx-1" />
          <ThemeToggle />
          <button
            onClick={scrollToTop}
            className="relative h-9 rounded-lg border border-border text-text-secondary font-medium flex items-center justify-center overflow-hidden hover:border-border-hover hover:bg-surface-hover hover:text-text transition-all duration-300"
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
