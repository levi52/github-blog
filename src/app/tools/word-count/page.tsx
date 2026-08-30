import Link from "next/link";
import WordCountTool from "@/components/tools/WordCountTool";

export const metadata = {
  title: "字数统计 - 工具",
  description: "文本字数统计工具",
};

export default function WordCountPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link
        href="/tools/"
        className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-accent transition-colors duration-200 mb-8 animate-slide-in-up"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        返回工具
      </Link>

      <div className="bg-surface border border-border rounded-2xl p-8 animate-slide-in-up delay-100">
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight mb-2">字数统计</h1>
          <p className="text-sm text-text-muted">统计文本字数、字符数、段落数等信息</p>
        </div>
        <WordCountTool />
      </div>
    </div>
  );
}
