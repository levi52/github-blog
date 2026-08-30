"use client";

import { useState } from "react";

function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch {
      setError("Invalid JSON");
      setOutput("");
    }
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-accent"></div>
        <h3 className="text-sm font-semibold tracking-tight">JSON Formatter</h3>
      </div>
      <textarea
        placeholder="Paste JSON here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-32 p-3 bg-bg border border-border rounded-lg font-mono text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all placeholder:text-text-muted resize-none"
      />
      <button
        onClick={format}
        className="mt-3 px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover transition-colors"
      >
        Format
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
      {output && (
        <pre className="mt-4 p-4 bg-bg border border-border rounded-lg text-sm overflow-auto max-h-64 font-mono whitespace-pre">
          {output}
        </pre>
      )}
    </div>
  );
}

function Base64Tool() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const convert = () => {
    try {
      if (mode === "encode") {
        setOutput(btoa(unescape(encodeURIComponent(input))));
      } else {
        setOutput(decodeURIComponent(escape(atob(input))));
      }
      setError("");
    } catch {
      setError("Conversion failed");
      setOutput("");
    }
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-accent"></div>
        <h3 className="text-sm font-semibold tracking-tight">Base64 Encoder / Decoder</h3>
      </div>
      <div className="flex gap-1.5 mb-4 p-1 bg-bg rounded-lg border border-border">
        <button
          onClick={() => setMode("encode")}
          className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${mode === "encode" ? "bg-surface text-text shadow-sm" : "text-text-muted hover:text-text-secondary"}`}
        >
          Encode
        </button>
        <button
          onClick={() => setMode("decode")}
          className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${mode === "decode" ? "bg-surface text-text shadow-sm" : "text-text-muted hover:text-text-secondary"}`}
        >
          Decode
        </button>
      </div>
      <textarea
        placeholder={mode === "encode" ? "Text to encode..." : "Base64 to decode..."}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-24 p-3 bg-bg border border-border rounded-lg font-mono text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all placeholder:text-text-muted resize-none"
      />
      <button
        onClick={convert}
        className="mt-3 px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover transition-colors"
      >
        Convert
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
      {output && (
        <textarea
          readOnly
          value={output}
          className="w-full mt-4 p-3 bg-bg border border-border rounded-lg font-mono text-sm h-24 focus:outline-none resize-none"
        />
      )}
    </div>
  );
}

function TimestampConverter() {
  const [timestamp, setTimestamp] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [result, setResult] = useState("");

  const toDateTime = () => {
    try {
      const ts = parseInt(timestamp, 10);
      const date = ts > 1e12 ? new Date(ts) : new Date(ts * 1000);
      setResult(date.toLocaleString("zh-CN") + " (Local)\n" + date.toISOString() + " (UTC)");
    } catch {
      setResult("Invalid timestamp");
    }
  };

  const toTimestamp = () => {
    try {
      const date = new Date(dateStr);
      setResult("Seconds: " + Math.floor(date.getTime() / 1000) + "\nMilliseconds: " + date.getTime());
    } catch {
      setResult("Invalid date string");
    }
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-accent"></div>
        <h3 className="text-sm font-semibold tracking-tight">Timestamp Converter</h3>
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-xs text-text-muted font-medium mb-1.5 block">Timestamp to DateTime</label>
          <div className="flex gap-2">
            <input
              placeholder="e.g. 1693401600"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              className="flex-1 px-3 py-2 bg-bg border border-border rounded-lg text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all placeholder:text-text-muted"
            />
            <button
              onClick={toDateTime}
              className="px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover transition-colors"
            >
              Convert
            </button>
          </div>
        </div>
        <div>
          <label className="text-xs text-text-muted font-medium mb-1.5 block">DateTime to Timestamp</label>
          <div className="flex gap-2">
            <input
              type="datetime-local"
              value={dateStr}
              onChange={(e) => setDateStr(e.target.value)}
              className="flex-1 px-3 py-2 bg-bg border border-border rounded-lg text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all"
            />
            <button
              onClick={toTimestamp}
              className="px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover transition-colors"
            >
              Convert
            </button>
          </div>
        </div>
        {result && (
          <pre className="p-4 bg-bg border border-border rounded-lg text-sm whitespace-pre-wrap font-mono">
            {result}
          </pre>
        )}
      </div>
    </div>
  );
}

function UrlEncoder() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [output, setOutput] = useState("");

  const convert = () => {
    try {
      if (mode === "encode") {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
    } catch {
      setOutput("Error");
    }
  };

  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-accent"></div>
        <h3 className="text-sm font-semibold tracking-tight">URL Encoder / Decoder</h3>
      </div>
      <div className="flex gap-1.5 mb-4 p-1 bg-bg rounded-lg border border-border">
        <button
          onClick={() => setMode("encode")}
          className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${mode === "encode" ? "bg-surface text-text shadow-sm" : "text-text-muted hover:text-text-secondary"}`}
        >
          Encode
        </button>
        <button
          onClick={() => setMode("decode")}
          className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${mode === "decode" ? "bg-surface text-text shadow-sm" : "text-text-muted hover:text-text-secondary"}`}
        >
          Decode
        </button>
      </div>
      <textarea
        placeholder={mode === "encode" ? "URL to encode..." : "URL to decode..."}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-24 p-3 bg-bg border border-border rounded-lg font-mono text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition-all placeholder:text-text-muted resize-none"
      />
      <button
        onClick={convert}
        className="mt-3 px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover transition-colors"
      >
        Convert
      </button>
      {output && (
        <textarea
          readOnly
          value={output}
          className="w-full mt-4 p-3 bg-bg border border-border rounded-lg font-mono text-sm h-24 focus:outline-none resize-none"
        />
      )}
    </div>
  );
}

export default function ToolsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-10">
        <p className="text-sm text-text-muted tracking-widest uppercase mb-3">Utilities</p>
        <h1 className="text-3xl font-bold tracking-tight">Tools</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <JsonFormatter />
        <Base64Tool />
        <TimestampConverter />
        <UrlEncoder />
      </div>
    </div>
  );
}
