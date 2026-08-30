"use client";

import { useState } from "react";

const TIMEZONES = [
  { label: "北京时间 (UTC+8)", value: "Asia/Shanghai" },
  { label: "东京时间 (UTC+9)", value: "Asia/Tokyo" },
  { label: "纽约时间 (UTC-5)", value: "America/New_York" },
  { label: "伦敦时间 (UTC+0)", value: "Europe/London" },
  { label: "巴黎时间 (UTC+1)", value: "Europe/Paris" },
  { label: "悉尼时间 (UTC+11)", value: "Australia/Sydney" },
  { label: "洛杉矶时间 (UTC-8)", value: "America/Los_Angeles" },
  { label: "莫斯科时间 (UTC+3)", value: "Europe/Moscow" },
  { label: "迪拜时间 (UTC+4)", value: "Asia/Dubai" },
  { label: "新加坡时间 (UTC+8)", value: "Asia/Singapore" },
];

export default function TimezoneTool() {
  const [fromTimezone, setFromTimezone] = useState("Asia/Shanghai");
  const [toTimezone, setToTimezone] = useState("America/New_York");
  const [inputTime, setInputTime] = useState("");
  const [result, setResult] = useState("");

  const convert = () => {
    try {
      const date = inputTime ? new Date(inputTime) : new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: toTimezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };

      const fromOptions: Intl.DateTimeFormatOptions = {
        timeZone: fromTimezone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };

      const fromStr = date.toLocaleString("zh-CN", fromOptions);
      const toStr = date.toLocaleString("zh-CN", options);

      setResult(
        `源时区 (${TIMEZONES.find((t) => t.value === fromTimezone)?.label}):\n${fromStr}\n\n` +
        `目标时区 (${TIMEZONES.find((t) => t.value === toTimezone)?.label}):\n${toStr}`
      );
    } catch {
      setResult("转换失败，请检查输入");
    }
  };

  const swap = () => {
    setFromTimezone(toTimezone);
    setToTimezone(fromTimezone);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm text-text-muted">源时区</label>
          <select
            value={fromTimezone}
            onChange={(e) => setFromTimezone(e.target.value)}
            className="w-full px-3 py-2 bg-bg border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
          >
            {TIMEZONES.map((tz) => (
              <option key={tz.value} value={tz.value}>{tz.label}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm text-text-muted">目标时区</label>
          <select
            value={toTimezone}
            onChange={(e) => setToTimezone(e.target.value)}
            className="w-full px-3 py-2 bg-bg border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
          >
            {TIMEZONES.map((tz) => (
              <option key={tz.value} value={tz.value}>{tz.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={swap}
          className="p-2 rounded-lg hover:bg-border/30 transition-all duration-200"
        >
          <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        </button>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-text-muted">时间（留空则使用当前时间）</label>
        <input
          type="datetime-local"
          value={inputTime}
          onChange={(e) => setInputTime(e.target.value)}
          className="w-full px-3 py-2 bg-bg border border-border rounded-lg text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all duration-200 hover:border-border-hover"
        />
      </div>

      <button
        onClick={convert}
        className="w-full px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover hover:shadow-[var(--shadow-accent)] hover:scale-105 active:scale-95 transition-all duration-200"
      >
        转换
      </button>

      {result && (
        <pre className="p-4 bg-bg border border-border rounded-lg text-sm whitespace-pre-wrap font-mono">
          {result}
        </pre>
      )}
    </div>
  );
}
