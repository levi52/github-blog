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
    <div>
      <h3 className="text-lg font-semibold mb-3">JSON Formatter</h3>
      <textarea
        placeholder="Paste JSON here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-32 p-3 border border-gray-300 dark:border-gray-700 rounded-lg font-mono text-sm bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={format}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
      >
        Format
      </button>
      {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
      {output && (
        <pre className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm overflow-auto max-h-64 border border-gray-200 dark:border-gray-700">
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
    <div>
      <h3 className="text-lg font-semibold mb-3">Base64 Encoder / Decoder</h3>
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setMode("encode")}
          className={`px-3 py-1 text-sm rounded ${mode === "encode" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
        >
          Encode
        </button>
        <button
          onClick={() => setMode("decode")}
          className={`px-3 py-1 text-sm rounded ${mode === "decode" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
        >
          Decode
        </button>
      </div>
      <textarea
        placeholder={mode === "encode" ? "Text to encode..." : "Base64 to decode..."}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-24 p-3 border border-gray-300 dark:border-gray-700 rounded-lg font-mono text-sm bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={convert}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
      >
        Convert
      </button>
      {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
      {output && (
        <textarea
          readOnly
          value={output}
          className="w-full mt-3 p-3 border border-gray-300 dark:border-gray-700 rounded-lg font-mono text-sm bg-gray-50 dark:bg-gray-800 h-24"
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
      setResult(date.toLocaleString("zh-CN") + " (Local) / " + date.toISOString() + " (UTC)");
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
    <div>
      <h3 className="text-lg font-semibold mb-3">Timestamp Converter</h3>
      <div className="space-y-3">
        <div>
          <label className="text-sm text-gray-500 mb-1 block">Timestamp to DateTime</label>
          <div className="flex gap-2">
            <input
              placeholder="e.g. 1693401600"
              value={timestamp}
              onChange={(e) => setTimestamp(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={toDateTime}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
            >
              Convert
            </button>
          </div>
        </div>
        <div>
          <label className="text-sm text-gray-500 mb-1 block">DateTime to Timestamp</label>
          <div className="flex gap-2">
            <input
              type="datetime-local"
              value={dateStr}
              onChange={(e) => setDateStr(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={toTimestamp}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
            >
              Convert
            </button>
          </div>
        </div>
        {result && (
          <pre className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm whitespace-pre-wrap border border-gray-200 dark:border-gray-700">
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
    <div>
      <h3 className="text-lg font-semibold mb-3">URL Encoder / Decoder</h3>
      <div className="flex gap-2 mb-3">
        <button
          onClick={() => setMode("encode")}
          className={`px-3 py-1 text-sm rounded ${mode === "encode" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
        >
          Encode
        </button>
        <button
          onClick={() => setMode("decode")}
          className={`px-3 py-1 text-sm rounded ${mode === "decode" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700"}`}
        >
          Decode
        </button>
      </div>
      <textarea
        placeholder={mode === "encode" ? "URL to encode..." : "URL to decode..."}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-24 p-3 border border-gray-300 dark:border-gray-700 rounded-lg font-mono text-sm bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={convert}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
      >
        Convert
      </button>
      {output && (
        <textarea
          readOnly
          value={output}
          className="w-full mt-3 p-3 border border-gray-300 dark:border-gray-700 rounded-lg font-mono text-sm bg-gray-50 dark:bg-gray-800 h-24"
        />
      )}
    </div>
  );
}

export default function ToolsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Tools</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
          <JsonFormatter />
        </div>
        <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
          <Base64Tool />
        </div>
        <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
          <TimestampConverter />
        </div>
        <div className="p-6 border border-gray-200 dark:border-gray-800 rounded-lg">
          <UrlEncoder />
        </div>
      </div>
    </div>
  );
}
