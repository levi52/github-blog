"use client";

import { useState, useEffect, useCallback } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const elements = document.querySelectorAll(".prose h2, .prose h3");
    const items: TocItem[] = Array.from(elements).map((el, index) => {
      const id = el.id || el.textContent?.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "") || `heading-${index}`;
      el.id = id;
      return {
        id,
        text: el.textContent || "",
        level: el.tagName === "H2" ? 2 : 3,
      };
    });
    setHeadings(items);
  }, []);

  const handleScroll = useCallback(() => {
    const elements = document.querySelectorAll(".prose h2, .prose h3");
    let current = "";
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= 120) {
        current = el.id;
      }
    });
    setActiveId(current);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  if (headings.length === 0) return null;

  return (
    <aside className="hidden xl:block w-56 shrink-0">
      <div className="sticky top-24 animate-slide-in-left delay-300">
        <h3 className="text-xs font-semibold text-text-muted tracking-widest uppercase mb-3">
          目录
        </h3>
        <nav className="space-y-1">
          {headings.map((h) => (
            <button
              key={h.id}
              onClick={() => scrollTo(h.id)}
              className={`block w-full text-left text-sm py-1 transition-colors duration-200 ${
                h.level === 3 ? "pl-4" : "pl-0"
              } ${
                activeId === h.id
                  ? "text-accent font-medium"
                  : "text-text-muted hover:text-text"
              }`}
            >
              {h.text}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
