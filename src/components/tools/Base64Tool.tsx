"use client";

import { useState } from "react";
import Toast from "@/components/Toast";

export default function Base64Tool() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const convert = () => {
    try {
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
      setError("");
    } catch {
      setError("转换失败，请检查输入内容");
      setOutput("");
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setToast({ message: "已复制到剪贴板", type: "success" });
    } catch {
      setToast({ message: "复制失败", type: "error" });
    }
  };

  return (
    <div className="space-y-4">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="flex gap-1.5 p-1 bg-bg rounded-lg border border-border">
        <button
          onClick={() => setMode("encode")}
          className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 btn-click ${mode === "encode" ? "bg-surface text-text shadow-sm" : "text-text-muted hover:text-text-secondary hover:bg-border/30"}`}
        >
          编码
        </button>
        <button
          onClick={() => setMode("decode")}
          className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 btn-click ${mode === "decode" ? "bg-surface text-text shadow-sm" : "text-text-muted hover:text-text-secondary hover:bg-border/30"}`}
        >
          解码
        </button>
      </div>
      <textarea
        placeholder={mode === "encode" ? "请输入要编码的文本..." : "请输入要解码的 Base64..."}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-32 p-3 bg-bg border border-border rounded-lg font-mono text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all duration-200 placeholder:text-text-muted resize-none hover:border-border-hover"
      />
      <div className="flex gap-2">
        <button
          onClick={convert}
          className="px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover hover:shadow-[var(--shadow-accent)] hover:scale-105 active:scale-95 transition-all duration-200"
        >
          转换
        </button>
        {output && (
          <button
            onClick={copyToClipboard}
            className="px-4 py-2 bg-bg border border-border text-text text-sm font-medium rounded-lg hover:bg-border/30 transition-all duration-200 btn-click"
          >
            复制结果
          </button>
        )}
      </div>
      {error && (
        <div className="flex items-center gap-2 p-3 bg-accent/10 border border-accent/30 rounded-lg animate-fade-in">
          <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-sm text-accent">{error}</p>
        </div>
      )}
      {output && (
        <textarea
          readOnly
          value={output}
          className="w-full p-3 bg-bg border border-border rounded-lg font-mono text-sm h-32 focus:outline-none resize-none animate-fade-in"
        />
      )}
    </div>
  );
}
