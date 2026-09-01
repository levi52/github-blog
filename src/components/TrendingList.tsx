"use client";

import { useMemo, useState, useRef, useEffect, useCallback } from "react";
import trendingData from "@/lib/trending-data.json";

const { weeks } = trendingData;

function getAllLanguages(weekRepos: typeof weeks[0]["repos"]): string[] {
  const langSet = new Set<string>();
  weekRepos.forEach((repo) => {
    if (repo.language) {
      langSet.add(repo.language);
    }
  });
  return Array.from(langSet).sort();
}

function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num.toString();
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString("zh-CN", { month: "short", day: "numeric" });
}

function getWeekLabel(week: typeof weeks[0]): string {
  return `${formatDate(week.startDate)} - ${formatDate(week.endDate)}`;
}

export default function TrendingList() {
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);
  const [selectedLang, setSelectedLang] = useState("");
  const [weekDropdownOpen, setWeekDropdownOpen] = useState(false);
  const weekDropdownRef = useRef<HTMLDivElement>(null);
  const weekTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentWeek = weeks[selectedWeekIndex];
  const languages = useMemo(() => getAllLanguages(currentWeek.repos), [currentWeek]);

  const filteredRepos = useMemo(() => {
    if (!selectedLang) return currentWeek.repos;
    return currentWeek.repos.filter((repo) => repo.language === selectedLang);
  }, [selectedLang, currentWeek]);

  const handleWeekChange = (index: number) => {
    setSelectedWeekIndex(index);
    setSelectedLang("");
    setWeekDropdownOpen(false);
  };

  const handleWeekMouseEnter = useCallback(() => {
    if (weekTimeoutRef.current) {
      clearTimeout(weekTimeoutRef.current);
      weekTimeoutRef.current = null;
    }
    setWeekDropdownOpen(true);
  }, []);

  const handleWeekMouseLeave = useCallback(() => {
    weekTimeoutRef.current = setTimeout(() => {
      setWeekDropdownOpen(false);
    }, 150);
  }, []);

  useEffect(() => {
    return () => {
      if (weekTimeoutRef.current) {
        clearTimeout(weekTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-10 animate-slide-in-up">
        <p className="text-sm text-text-muted tracking-widest uppercase mb-3">Trending</p>
        <h1 className="font-heading text-3xl tracking-tight">GitHub 每周热门</h1>
        <p className="text-text-secondary mt-2">本周热门开源项目</p>
      </div>

      {/* 周切换器 */}
      <div className="mb-8 animate-slide-in-up delay-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-medium text-text">选择周次</span>
          </div>
          <div
            ref={weekDropdownRef}
            className="relative"
            onMouseEnter={handleWeekMouseEnter}
            onMouseLeave={handleWeekMouseLeave}
          >
            <button
              className="px-4 pr-9 py-2.5 bg-surface border border-border rounded-lg text-sm cursor-pointer transition-all duration-200 hover:border-border-hover hover:shadow-sm flex items-center gap-2"
              onClick={() => setWeekDropdownOpen(!weekDropdownOpen)}
            >
              <span>{currentWeek.weekId} ({getWeekLabel(currentWeek)})</span>
            </button>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className={`w-4 h-4 text-text-muted transition-transform duration-200 ${weekDropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {weekDropdownOpen && (
              <div className="absolute top-full right-0 mt-1 min-w-full py-2 bg-surface border border-border rounded-lg shadow-lg animate-dropdown-in z-10">
                {weeks.map((week, index) => (
                  <button
                    key={week.weekId}
                    onClick={() => handleWeekChange(index)}
                    className={`block w-full text-left px-4 py-2 text-sm transition-all duration-200 ${
                      index === selectedWeekIndex
                        ? "text-accent bg-accent/10"
                        : "text-text-secondary hover:text-text hover:bg-border/30"
                    }`}
                  >
                    {week.weekId} ({getWeekLabel(week)})
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 语言筛选器 */}
      <div className="mb-8 animate-slide-in-up delay-200">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedLang("")}
            className={`px-4 py-2 text-sm rounded-full cursor-pointer transition-all duration-200 ${
              selectedLang === ""
                ? "bg-accent text-white shadow-[var(--shadow-accent)]"
                : "bg-bg-secondary border border-border text-text-muted hover:text-text hover:border-accent hover:bg-accent/5 hover:shadow-md"
            }`}
          >
            All
          </button>
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLang(lang)}
              className={`px-4 py-2 text-sm rounded-full cursor-pointer transition-all duration-200 ${
                selectedLang === lang
                  ? "bg-accent text-white shadow-[var(--shadow-accent)]"
                  : "bg-bg-secondary border border-border text-text-muted hover:text-text hover:border-accent hover:bg-accent/5 hover:shadow-md"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* 项目列表 */}
      <div className="space-y-3">
        {filteredRepos.map((repo, i) => (
          <a
            key={`${repo.owner}/${repo.repo}`}
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center gap-4 p-4 bg-surface border border-border rounded-xl hover:border-border-hover hover:shadow-[var(--shadow-hover)] transition-all duration-300 animate-slide-in-up delay-${Math.min((i + 3) * 50, 500)}`}
          >
            {/* Rank Number */}
            <div className="shrink-0 w-10 flex items-center justify-center">
              <span className="font-heading text-2xl text-text-muted leading-none">
                {i + 1}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-sm font-semibold text-text group-hover:text-accent transition-colors duration-200 truncate">
                  <span className="text-text-muted">{repo.owner} /</span> {repo.repo}
                </h3>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed mb-2 line-clamp-1">
                {repo.description}
              </p>
              <div className="flex items-center flex-wrap gap-3 text-xs text-text-muted">
                {repo.language && (
                  <span className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: repo.langColor || "#999" }}
                    ></span>
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.782 1.4 8.171L12 19.896l-7.334 3.268 1.4-8.171L.132 9.211l8.2-1.193z"/>
                  </svg>
                  {formatNumber(repo.stars)}
                </span>
                <span className="flex items-center gap-1">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"/>
                  </svg>
                  {formatNumber(repo.forks)}
                </span>
              </div>
            </div>

            {/* Star Growth Badge */}
            <div className="shrink-0 flex items-center gap-1 px-3 py-1.5 bg-accent/10 rounded-full">
              <svg className="w-3.5 h-3.5 text-accent" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.782 1.4 8.171L12 19.896l-7.334 3.268 1.4-8.171L.132 9.211l8.2-1.193z"/>
              </svg>
              <span className="text-xs font-medium text-accent">
                +{formatNumber(repo.todayStars)}
              </span>
              <span className="text-xs text-text-muted">/w</span>
            </div>
          </a>
        ))}
      </div>

      {filteredRepos.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-text-muted text-sm">No trending repositories found for this language.</p>
        </div>
      )}

      <div className="mt-10 pt-6 border-t border-border text-center text-xs text-text-muted animate-slide-in-up delay-500">
        <p>
          Data fetched from{" "}
          <a
            href="https://github.com/trending"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            GitHub Trending
          </a>
          {" "}· Current week: {currentWeek.weekId} ({getWeekLabel(currentWeek)})
        </p>
      </div>
    </div>
  );
}
