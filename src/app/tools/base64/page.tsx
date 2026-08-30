import Link from "next/link";
import Base64Tool from "@/components/tools/Base64Tool";

export const metadata = {
  title: "Base64 编解码 - 工具",
  description: "Base64 编码与解码工具",
};

export default function Base64Page() {
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
          <h1 className="text-2xl font-bold tracking-tight mb-2">Base64 编解码</h1>
          <p className="text-sm text-text-muted">将文本编码为 Base64 格式，或将 Base64 解码为文本</p>
        </div>
        <Base64Tool />
      </div>
    </div>
  );
}
