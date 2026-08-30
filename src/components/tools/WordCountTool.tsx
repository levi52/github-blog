"use client";

import { useState, useMemo } from "react";

export default function WordCountTool() {
  const [input, setInput] = useState("");

  const stats = useMemo(() => {
    if (!input) {
      return {
        characters: 0,
        charactersNoSpace: 0,
        words: 0,
        sentences: 0,
        paragraphs: 0,
        chinese: 0,
        english: 0,
        numbers: 0,
        punctuation: 0,
      };
    }

    const chinese = (input.match(/[\u4e00-\u9fa5]/g) || []).length;
    const english = (input.match(/[a-zA-Z]/g) || []).length;
    const numbers = (input.match(/[0-9]/g) || []).length;
    const punctuation = (input.match(/[^\w\s\u4e00-\u9fa5]/g) || []).length;

    const words = input.trim() ? input.trim().split(/\s+/).length : 0;
    const sentences = input.split(/[.!?。！？]+/).filter((s) => s.trim()).length;
    const paragraphs = input.split(/\n\s*\n/).filter((p) => p.trim()).length || (input.trim() ? 1 : 0);

    return {
      characters: input.length,
      charactersNoSpace: input.replace(/\s/g, "").length,
      words,
      sentences,
      paragraphs,
      chinese,
      english,
      numbers,
      punctuation,
    };
  }, [input]);

  const statItems = [
    { label: "总字符数", value: stats.characters },
    { label: "不含空格", value: stats.charactersNoSpace },
    { label: "单词数", value: stats.words },
    { label: "句子数", value: stats.sentences },
    { label: "段落数", value: stats.paragraphs },
    { label: "中文字符", value: stats.chinese },
    { label: "英文字母", value: stats.english },
    { label: "数字", value: stats.numbers },
  ];

  const readingTime = Math.max(1, Math.ceil(stats.words / 200));

  return (
    <div className="space-y-4">
      <textarea
        placeholder="请输入或粘贴文本..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="w-full h-48 p-3 bg-bg border border-border rounded-lg text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all duration-200 placeholder:text-text-muted resize-none hover:border-border-hover"
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {statItems.map((item) => (
          <div key={item.label} className="p-3 bg-bg border border-border rounded-lg text-center">
            <div className="text-2xl font-bold text-accent">{item.value}</div>
            <div className="text-xs text-text-muted mt-1">{item.label}</div>
          </div>
        ))}
      </div>

      <div className="p-3 bg-bg border border-border rounded-lg text-center">
        <div className="text-sm text-text-muted">
          预计阅读时间：<span className="font-medium text-text">{readingTime}</span> 分钟
        </div>
      </div>
    </div>
  );
}
