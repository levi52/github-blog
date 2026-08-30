"use client";

import { useState } from "react";

export default function JsonFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [indent, setIndent] = useState(2);

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError("");
    } catch {
      setError("JSON 格式错误，请检查输入内容");
      setOutput("");
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch {
      setError("JSON 格式错误，请检查输入内容");
      setOutput("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-text-muted">缩进：</label>
          <select
            value={indent}
            onChange={(e) => setIndent(Number(e.target.value))}
            className="px-2 py-1 bg-bg border border-border rounded-lg text-sm focus:outline-none focus:border-accent"
          >
            <option value={2}>2 空格</option>
            <option value={4}>4 空格</option>
            <option value={8}>8 空格</option>
          </select>
        </div>
      </div>
      <textarea
        placeholder="请输入 JSON 数据..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-48 p-3 bg-bg border border-border rounded-lg font-mono text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all duration-200 placeholder:text-text-muted resize-none hover:border-border-hover"
      />
      <div className="flex gap-2">
        <button
          onClick={format}
          className="px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover hover:shadow-[var(--shadow-accent)] hover:scale-105 active:scale-95 transition-all duration-200"
        >
          格式化
        </button>
        <button
          onClick={minify}
          className="px-4 py-2 bg-bg border border-border text-text text-sm font-medium rounded-lg hover:bg-border/30 transition-all duration-200"
        >
          压缩
        </button>
      </div>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
      {output && (
        <pre className="p-4 bg-bg border border-border rounded-lg text-sm overflow-auto max-h-96 font-mono whitespace-pre">
          {output}
        </pre>
      )}
    </div>
  );
}
