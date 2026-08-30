import Link from "next/link";
import RegexTool from "@/components/tools/RegexTool";

export const metadata = {
  title: "正则测试 - 工具",
  description: "正则表达式测试工具",
};

export default function RegexPage() {
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
          <h1 className="text-2xl font-bold tracking-tight mb-2">正则测试</h1>
          <p className="text-sm text-text-muted">测试正则表达式，高亮显示匹配结果</p>
        </div>
        <RegexTool />
      </div>
    </div>
  );
}
