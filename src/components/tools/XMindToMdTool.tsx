"use client";

import { useState, useRef, useCallback } from "react";
import JSZip from "jszip";
import { marked } from "marked";

interface Stats {
  sheets: number;
  topics: number;
  nodes: number;
}

interface XMindNode {
  title?: string;
  children?: {
    attached?: XMindNode[];
  };
}

function pushLine(depth: number, title: string, lines: string[]) {
  if (depth === 0) lines.push("# " + title + "\n");
  else if (depth === 1) lines.push("## " + title + "\n");
  else if (depth === 2) lines.push("### " + title + "\n");
  else lines.push("  ".repeat(depth - 3) + "- " + title);
}

function emitJson(node: XMindNode, depth: number, lines: string[], st: Stats) {
  st.nodes += 1;
  const title = (node.title || "").trim();
  pushLine(depth, title, lines);
  const children = (node.children && node.children.attached) || [];
  for (const c of children) emitJson(c, depth + 1, lines, st);
}

function parseJson(data: XMindNode[], lines: string[], st: Stats) {
  for (const sheet of data) {
    st.sheets += 1;
    emitJson((sheet as XMindNode & { rootTopic?: XMindNode }).rootTopic || {}, 0, lines, st);
    const rootTopic = (sheet as XMindNode & { rootTopic?: XMindNode }).rootTopic;
    const attached =
      (rootTopic && rootTopic.children && rootTopic.children.attached) || [];
    st.topics += attached.length;
    if (lines.length && lines[lines.length - 1] !== "") lines.push("");
  }
}

function parseXml(rawText: string, lines: string[], st: Stats) {
  const doc = new DOMParser().parseFromString(rawText, "text/xml");
  if (doc.querySelector("parsererror")) throw new Error("XML 解析失败");
  const root = doc.documentElement;

  function findNodes(el: Element) {
    return Array.from(el.children).filter((c) => c.localName === "node");
  }

  let roots: Element[];
  if (root.localName === "node") {
    roots = [root];
  } else {
    roots = findNodes(root);
    if (roots.length === 0) {
      const topics = Array.from(root.getElementsByTagName("*")).filter(
        (e) => e.localName === "topic"
      );
      roots = topics.slice(0, 1);
    }
  }

  function emitXml(el: Element, depth: number) {
    st.nodes += 1;
    const title = (el.getAttribute("TEXT") || el.getAttribute("text") || "").trim();
    pushLine(depth, title, lines);
    for (const c of findNodes(el)) emitXml(c, depth + 1);
  }

  for (const r of roots) {
    st.sheets += 1;
    emitXml(r, 0);
    lines.push("");
  }
  return roots.length > 0;
}

async function xmindToMarkdown(arrayBuffer: ArrayBuffer) {
  const st: Stats = { sheets: 0, topics: 0, nodes: 0 };
  const lines: string[] = [];
  const zip = await JSZip.loadAsync(arrayBuffer);
  const names = Object.keys(zip.files);

  if (names.indexOf("content.json") !== -1) {
    const raw = await zip.file("content.json")!.async("string");
    parseJson(JSON.parse(raw), lines, st);
  } else if (names.indexOf("content.xml") !== -1) {
    const raw = await zip.file("content.xml")!.async("string");
    if (!parseXml(raw, lines, st)) throw new Error("未识别的 XMind XML 结构");
  } else {
    throw new Error("该文件不是有效的 .xmind（缺少 content.json / content.xml）");
  }
  const md = lines.join("\n").replace(/\s+$/, "") + "\n";
  return { md, st };
}

const MAX_SIZE = 30 * 1024 * 1024;

export default function XMindToMdTool() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [stats, setStats] = useState<Stats | null>(null);
  const [preview, setPreview] = useState("");
  const [raw, setRaw] = useState("");
  const [activeTab, setActiveTab] = useState<"preview" | "raw">("preview");
  const [converting, setConverting] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const currentMdRef = useRef("");

  const clearError = () => setError("");

  const handleFile = useCallback((f: File | null) => {
    clearError();
    if (!f) return;
    if (!/\.xmind$/i.test(f.name)) {
      setError("请选择 .xmind 后缀的文件");
      return;
    }
    if (f.size > MAX_SIZE) {
      setError("文件超过 30MB 限制");
      return;
    }
    setFile(f);
    setStats(null);
    setPreview("");
    setRaw("");
  }, []);

  const handleConvert = async () => {
    if (!file) return;
    clearError();
    setConverting(true);
    try {
      const buf = await file.arrayBuffer();
      if (buf.byteLength < 2) {
        setError("文件不是 .xmind（应为 PK zip 格式）");
        return;
      }
      const head = new Uint8Array(buf.slice(0, 2));
      if (head[0] !== 0x50 || head[1] !== 0x4b) {
        setError("文件不是 .xmind（应为 PK zip 格式）");
        return;
      }
      const { md, st } = await xmindToMarkdown(buf);
      currentMdRef.current = md;
      setStats(st);
      setRaw(md);
      setPreview(marked.parse(md) as string);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError("解析失败：" + message);
    } finally {
      setConverting(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentMdRef.current);
    } catch {
      setError("复制失败，请手动选择文本");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([currentMdRef.current], { type: "text/markdown;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = (file?.name.replace(/\.xmind$/i, "") || "mindmap") + ".md";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const handleClear = () => {
    setFile(null);
    setStats(null);
    setPreview("");
    setRaw("");
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const f = e.dataTransfer.files[0];
          if (f) handleFile(f);
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200 ${
          dragOver
            ? "border-accent bg-accent/5"
            : "border-border hover:border-accent"
        }`}
      >
        <svg className="w-10 h-10 mx-auto mb-3 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 7.41A2.25 2.25 0 012.25 5.495V5.25" />
        </svg>
        <p className="text-text">
          <strong>点击选择</strong> 或将 <code className="px-1.5 py-0.5 bg-bg rounded text-accent">.xmind</code> 文件拖拽到此处
        </p>
        <p className="text-sm text-text-muted mt-2">支持新版（content.json）与经典版（content.xml），最大 30MB</p>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept=".xmind,application/vnd.xmind.workbook"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0] || null)}
      />

      {file && (
        <div className="flex items-center gap-3 p-3 bg-bg border border-border rounded-xl">
          <svg className="w-5 h-5 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          <span className="flex-1 min-w-0 truncate font-medium text-sm">{file.name}</span>
          <span className="text-xs text-text-muted">{(file.size / 1024).toFixed(1)} KB</span>
          <button onClick={handleClear} className="px-3 py-1.5 text-xs font-medium text-text-muted hover:text-text border border-border rounded-lg hover:bg-bg transition-all duration-200">
            移除
          </button>
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={handleConvert}
          disabled={!file || converting}
          className="px-4 py-2 bg-accent text-white text-sm font-medium rounded-lg hover:bg-accent-hover hover:shadow-[var(--shadow-accent)] hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {converting ? "转换中..." : "转换"}
        </button>
        <div className="flex-1" />
        <button onClick={handleCopy} disabled={!raw} className="px-4 py-2 bg-bg border border-border text-text text-sm font-medium rounded-lg hover:bg-border/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
          复制 Markdown
        </button>
        <button onClick={handleDownload} disabled={!raw} className="px-4 py-2 bg-bg border border-border text-text text-sm font-medium rounded-lg hover:bg-border/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
          下载 .md
        </button>
      </div>

      {error && <p className="text-sm text-accent">{error}</p>}

      {stats && (
        <div className="flex gap-6 text-sm text-text-muted">
          <div><span className="font-semibold text-accent text-lg">{stats.sheets}</span> 工作表</div>
          <div><span className="font-semibold text-accent text-lg">{stats.topics}</span> 顶层主题</div>
          <div><span className="font-semibold text-accent text-lg">{stats.nodes}</span> 节点总数</div>
        </div>
      )}

      {raw && (
        <div>
          <div className="flex gap-2 mb-3">
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
                activeTab === "preview"
                  ? "bg-accent text-white border-accent"
                  : "bg-transparent text-text-muted border-border hover:bg-bg"
              }`}
            >
              渲染预览
            </button>
            <button
              onClick={() => setActiveTab("raw")}
              className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
                activeTab === "raw"
                  ? "bg-accent text-white border-accent"
                  : "bg-transparent text-text-muted border-border hover:bg-bg"
              }`}
            >
              原始 Markdown
            </button>
          </div>

          {activeTab === "preview" ? (
            <div className="p-6 bg-bg border border-border rounded-xl max-h-[60vh] overflow-auto">
              <div
                className="prose prose-stone max-w-none"
                dangerouslySetInnerHTML={{ __html: preview }}
              />
            </div>
          ) : (
            <textarea
              readOnly
              value={raw}
              className="w-full min-h-[50vh] p-4 bg-bg border border-border rounded-xl font-mono text-sm resize-y focus:outline-none focus:border-accent"
            />
          )}
        </div>
      )}
    </div>
  );
}
