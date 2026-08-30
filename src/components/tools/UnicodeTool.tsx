"use client";

import { useState } from "react";

export default function UnicodeTool() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"toUnicode" | "fromUnicode">("toUnicode");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const convert = () => {
    try {
      if (mode === "toUnicode") {
        const result = Array.from(input)
          .map((char) => "\\u" + char.charCodeAt(0).toString(16).padStart(4, "0"))
          .join("");
        setOutput(result);
      } else {
        const result = input.replace(/\\u([0-9a-fA-F]{4})/g, (_, code) =>
          String.fromCharCode(parseInt(code, 16))
        );
        setOutput(result);
      }
      setError("");
    } catch {
      setError("转换失败，请检查输入内容");
      setOutput("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-1.5 p-1 bg-bg rounded-lg border border-border">
        <button
          onClick={() => setMode("toUnicode")}
          className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${mode === "toUnicode" ? "bg-surface text-text shadow-sm" : "text-text-muted hover:text-text-secondary hover:bg-border/30"}`}
        >
          文本 → Unicode
        </button>
        <button
          onClick={() => setMode("fromUnicode")}
          className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${mode === "fromUnicode" ? "bg-surface text-text shadow-sm" : "text-text-muted hover:text-text-secondary hover:bg-border/30"}`}
        >
          Unicode → 文本
        </button>
      </div>
      <textarea
        placeholder={mode === "toUnicode" ? "请输入要转换的文本..." : "请输入 Unicode 字符（如 \\u4f60\\u597d）..."}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-32 p-3 bg-bg border border-border rounded-lg font-mono text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all duration-200 placeholder:text-text-muted resize-none hover:border-border-hover"
      />
      <button
        onClick={convert}
        className="px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover hover:shadow-[var(--shadow-accent)] hover:scale-105 active:scale-95 transition-all duration-200"
      >
        转换
      </button>
      {error && (
        <p className="text-sm text-red-500">{error}</p>
      )}
      {output && (
        <textarea
          readOnly
          value={output}
          className="w-full p-3 bg-bg border border-border rounded-lg font-mono text-sm h-32 focus:outline-none resize-none"
        />
      )}
    </div>
  );
}
