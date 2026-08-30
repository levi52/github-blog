"use client";

import { useState } from "react";

interface DiffLine {
  type: "same" | "added" | "removed";
  content: string;
}

function computeDiff(oldText: string, newText: string): DiffLine[] {
  const oldLines = oldText.split("\n");
  const newLines = newText.split("\n");
  const result: DiffLine[] = [];

  const maxLen = Math.max(oldLines.length, newLines.length);

  for (let i = 0; i < maxLen; i++) {
    const oldLine = oldLines[i];
    const newLine = newLines[i];

    if (oldLine === undefined) {
      result.push({ type: "added", content: newLine });
    } else if (newLine === undefined) {
      result.push({ type: "removed", content: oldLine });
    } else if (oldLine === newLine) {
      result.push({ type: "same", content: oldLine });
    } else {
      result.push({ type: "removed", content: oldLine });
      result.push({ type: "added", content: newLine });
    }
  }

  return result;
}

export default function TextDiffTool() {
  const [oldText, setOldText] = useState("");
  const [newText, setNewText] = useState("");
  const [diff, setDiff] = useState<DiffLine[]>([]);

  const compare = () => {
    setDiff(computeDiff(oldText, newText));
  };

  const added = diff.filter((d) => d.type === "added").length;
  const removed = diff.filter((d) => d.type === "removed").length;

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-sm text-text-muted">原始文本</label>
          <textarea
            placeholder="请输入原始文本..."
            value={oldText}
            onChange={(e) => setOldText(e.target.value)}
            className="w-full h-48 p-3 bg-bg border border-border rounded-lg font-mono text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all duration-200 placeholder:text-text-muted resize-none hover:border-border-hover"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-text-muted">修改后文本</label>
          <textarea
            placeholder="请输入修改后的文本..."
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="w-full h-48 p-3 bg-bg border border-border rounded-lg font-mono text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all duration-200 placeholder:text-text-muted resize-none hover:border-border-hover"
          />
        </div>
      </div>

      <button
        onClick={compare}
        className="px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover hover:shadow-[var(--shadow-accent)] hover:scale-105 active:scale-95 transition-all duration-200"
      >
        对比
      </button>

      {diff.length > 0 && (
        <div className="space-y-3">
          <div className="flex gap-4 text-sm text-text-muted">
            <span>新增 <span className="text-green-600 font-medium">{added}</span> 行</span>
            <span>删除 <span className="text-red-600 font-medium">{removed}</span> 行</span>
          </div>
          <div className="p-4 bg-bg border border-border rounded-lg font-mono text-sm overflow-auto max-h-96">
            {diff.map((line, i) => (
              <div
                key={i}
                className={`py-0.5 px-2 -mx-2 ${
                  line.type === "added"
                    ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                    : line.type === "removed"
                    ? "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 line-through"
                    : ""
                }`}
              >
                <span className="text-text-muted select-none mr-2">
                  {line.type === "added" ? "+" : line.type === "removed" ? "-" : " "}
                </span>
                {line.content}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
