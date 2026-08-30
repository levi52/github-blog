"use client";

import { useState } from "react";

export default function RegexTool() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");
  const [matches, setMatches] = useState<{ match: string; index: number; groups: string[] }[]>([]);
  const [error, setError] = useState("");

  const test = () => {
    try {
      const regex = new RegExp(pattern, flags);
      const results: { match: string; index: number; groups: string[] }[] = [];
      let match;

      if (flags.includes("g")) {
        while ((match = regex.exec(testString)) !== null) {
          results.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          });
          if (match[0] === "") break;
        }
      } else {
        match = regex.exec(testString);
        if (match) {
          results.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          });
        }
      }

      setMatches(results);
      setError("");
    } catch (e) {
      setError(`正则表达式错误: ${e instanceof Error ? e.message : "未知错误"}`);
      setMatches([]);
    }
  };

  const highlightMatches = () => {
    if (!pattern || matches.length === 0) return testString;

    try {
      const regex = new RegExp(pattern, flags.includes("g") ? flags : flags + "g");
      return testString.replace(
        regex,
        (match) => `<mark class="bg-accent/30 text-text rounded px-0.5">${match}</mark>`
      );
    } catch {
      return testString;
    }
  };

  const toggleFlag = (flag: string) => {
    setFlags((prev) =>
      prev.includes(flag) ? prev.replace(flag, "") : prev + flag
    );
  };

  const flagOptions = [
    { flag: "g", label: "g", desc: "全局匹配" },
    { flag: "i", label: "i", desc: "忽略大小写" },
    { flag: "m", label: "m", desc: "多行模式" },
    { flag: "s", label: "s", desc: "点号匹配换行" },
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm text-text-muted">正则表达式</label>
        <div className="flex gap-2">
          <div className="flex-1 flex items-center bg-bg border border-border rounded-lg overflow-hidden focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/10 transition-all duration-200">
            <span className="pl-3 text-text-muted">/</span>
            <input
              placeholder="输入正则表达式"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="flex-1 px-1 py-2 bg-transparent font-mono text-sm focus:outline-none placeholder:text-text-muted"
            />
            <span className="pr-3 text-text-muted">/{flags}</span>
          </div>
        </div>
        <div className="flex gap-2">
          {flagOptions.map((opt) => (
            <button
              key={opt.flag}
              onClick={() => toggleFlag(opt.flag)}
              className={`px-3 py-1 text-xs font-mono rounded-lg border transition-all duration-200 ${
                flags.includes(opt.flag)
                  ? "bg-accent text-white border-accent"
                  : "bg-bg text-text-muted border-border hover:border-border-hover"
              }`}
              title={opt.desc}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-text-muted">测试文本</label>
        <textarea
          placeholder="请输入要测试的文本..."
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          className="w-full h-32 p-3 bg-bg border border-border rounded-lg font-mono text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all duration-200 placeholder:text-text-muted resize-none hover:border-border-hover"
        />
      </div>

      <button
        onClick={test}
        className="px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover hover:shadow-[var(--shadow-accent)] hover:scale-105 active:scale-95 transition-all duration-200"
      >
        测试
      </button>

      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}

      {matches.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-text-muted">
            找到 <span className="font-medium text-accent">{matches.length}</span> 个匹配
          </p>
          <div className="p-4 bg-bg border border-border rounded-lg">
            <div
              className="font-mono text-sm whitespace-pre-wrap"
              dangerouslySetInnerHTML={{ __html: highlightMatches() }}
            />
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-text">匹配详情</h4>
            <div className="space-y-1">
              {matches.map((m, i) => (
                <div key={i} className="flex items-center gap-4 text-sm font-mono p-2 bg-bg rounded-lg">
                  <span className="text-text-muted">#{i + 1}</span>
                  <span className="text-accent">"{m.match}"</span>
                  <span className="text-text-muted">位置: {m.index}</span>
                  {m.groups.length > 0 && (
                    <span className="text-text-muted">分组: [{m.groups.join(", ")}]</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {testString && pattern && matches.length === 0 && !error && (
        <p className="text-sm text-text-muted">无匹配结果</p>
      )}
    </div>
  );
}
