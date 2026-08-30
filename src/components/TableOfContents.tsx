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
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const elements = document.querySelectorAll(".prose h2, .prose h3");
    const items: TocItem[] = Array.from(elements).map((el, index) => {
      const id = el.id || `${el.tagName.toLowerCase()}-${index}`;
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

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  if (headings.length === 0) return null;

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="xl:hidden fixed bottom-24 right-6 z-40 w-10 h-10 bg-surface border border-border rounded-full shadow-lg flex items-center justify-center hover:border-border-hover hover:shadow-[var(--shadow-hover)] transition-all duration-200"
        aria-label="打开目录"
      >
        <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
        </svg>
      </button>

      {mobileOpen && (
        <div className="xl:hidden fixed inset-0 z-50 animate-fade-in">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-72 bg-surface shadow-xl p-6 animate-slide-in-left">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-text">目录</h3>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1 rounded-lg hover:bg-border/30 transition-colors"
              >
                <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="space-y-1 overflow-y-auto max-h-[calc(100vh-8rem)]">
              {headings.map((h) => (
                <button
                  key={h.id}
                  onClick={() => scrollTo(h.id)}
                  className={`block w-full text-left text-sm py-2 px-2 rounded-lg transition-colors duration-200 ${
                    h.level === 3 ? "pl-6" : "pl-2"
                  } ${
                    activeId === h.id
                      ? "text-accent font-medium bg-accent/10"
                      : "text-text-muted hover:text-text hover:bg-border/30"
                  }`}
                >
                  {h.text}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

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
    </>
  );
}
