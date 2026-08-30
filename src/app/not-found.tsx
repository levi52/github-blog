import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20 text-center animate-slide-in-up">
      <h1 className="text-8xl font-bold text-accent/20 mb-4">404</h1>
      <h2 className="text-2xl font-semibold tracking-tight mb-4">页面不存在</h2>
      <p className="text-text-secondary mb-8">
        你访问的页面可能已被删除、重命名，或者暂时不可用。
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-text text-bg text-sm font-medium rounded-full hover:shadow-[var(--shadow-hover)] hover:scale-105 active:scale-95 transition-all duration-200"
      >
        返回首页
      </Link>
    </div>
  );
}
