"use client";

import { useState } from "react";

function formatXml(xml: string, indent: number = 2): string {
  let formatted = "";
  let indentLevel = 0;
  const lines = xml.replace(/(>)(<)(\/*)/g, "$1\n$2$3").split("\n");

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    if (line.match(/^<\/\w/)) {
      indentLevel--;
    }

    formatted += " ".repeat(indentLevel * indent) + line + "\n";

    if (line.match(/^<\w[^>]*[^\/]>.*$/) && !line.match(/^<\w[^>]*\/>/)) {
      indentLevel++;
    }
  }

  return formatted.trim();
}

export default function XmlFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const format = () => {
    try {
      setOutput(formatXml(input));
      setError("");
    } catch {
      setError("XML 格式错误，请检查输入内容");
      setOutput("");
    }
  };

  const minify = () => {
    try {
      setOutput(input.replace(/>\s+</g, "><").trim());
      setError("");
    } catch {
      setError("XML 格式错误，请检查输入内容");
      setOutput("");
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        placeholder="请输入 XML 数据..."
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
