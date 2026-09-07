import Link from "next/link";
import AvatarGeneratorTool from "@/components/tools/AvatarGeneratorTool";

export const metadata = {
  title: "头像生成器 - 工具",
  description: "GitHub 风格头像生成器，根据输入文字生成独一无二的像素风格头像",
};

export default function AvatarGeneratorPage() {
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
          <h1 className="text-2xl font-bold tracking-tight mb-2">头像生成器</h1>
          <p className="text-sm text-text-muted">输入任意文字，生成独一无二的像素风格头像（GitHub Identicon 风格）</p>
        </div>
        <AvatarGeneratorTool />
      </div>
    </div>
  );
}
