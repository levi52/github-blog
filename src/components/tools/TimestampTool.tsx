"use client";

import { useState } from "react";

export default function TimestampTool() {
  const [timestamp, setTimestamp] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [result, setResult] = useState("");

  const toDateTime = () => {
    try {
      const ts = parseInt(timestamp, 10);
      const date = ts > 1e12 ? new Date(ts) : new Date(ts * 1000);
      if (isNaN(date.getTime())) throw new Error();
      setResult(
        `本地时间：${date.toLocaleString("zh-CN")}\nUTC 时间：${date.toISOString()}\n时间戳（秒）：${Math.floor(date.getTime() / 1000)}\n时间戳（毫秒）：${date.getTime()}`
      );
    } catch {
      setResult("无效的时间戳，请检查输入");
    }
  };

  const toTimestamp = () => {
    try {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) throw new Error();
      setResult(
        `时间戳（秒）：${Math.floor(date.getTime() / 1000)}\n时间戳（毫秒）：${date.getTime()}\nUTC 时间：${date.toISOString()}\n本地时间：${date.toLocaleString("zh-CN")}`
      );
    } catch {
      setResult("无效的日期，请检查输入");
    }
  };

  const now = () => {
    const current = Math.floor(Date.now() / 1000);
    setTimestamp(String(current));
    setResult(
      `当前时间戳（秒）：${current}\n当前时间戳（毫秒）：${Date.now()}\n本地时间：${new Date().toLocaleString("zh-CN")}\nUTC 时间：${new Date().toISOString()}`
    );
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-text">时间戳 → 日期</h3>
        <div className="flex gap-2">
          <input
            placeholder="请输入时间戳（秒或毫秒）"
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
            className="flex-1 px-3 py-2 bg-bg border border-border rounded-lg font-mono text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all duration-200 placeholder:text-text-muted hover:border-border-hover"
          />
          <button
            onClick={toDateTime}
            className="px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover hover:shadow-[var(--shadow-accent)] hover:scale-105 active:scale-95 transition-all duration-200"
          >
            转换
          </button>
        </div>
      </div>

      <div className="border-t border-border" />

      <div className="space-y-3">
        <h3 className="text-sm font-medium text-text">日期 → 时间戳</h3>
        <div className="flex gap-2">
          <input
            type="datetime-local"
            value={dateStr}
            onChange={(e) => setDateStr(e.target.value)}
            className="flex-1 px-3 py-2 bg-bg border border-border rounded-lg text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all duration-200 hover:border-border-hover"
          />
          <button
            onClick={toTimestamp}
            className="px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover hover:shadow-[var(--shadow-accent)] hover:scale-105 active:scale-95 transition-all duration-200"
          >
            转换
          </button>
        </div>
      </div>

      <div className="border-t border-border" />

      <button
        onClick={now}
        className="w-full px-4 py-2 bg-bg border border-border text-text text-sm font-medium rounded-lg hover:bg-border/30 transition-all duration-200"
      >
        获取当前时间戳
      </button>

      {result && (
        <pre className="p-4 bg-bg border border-border rounded-lg text-sm whitespace-pre-wrap font-mono">
          {result}
        </pre>
      )}
    </div>
  );
}
