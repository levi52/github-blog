import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold hover:opacity-80">
          Levi&apos;s Blog
        </Link>
        <nav className="flex gap-6 text-sm">
          <Link href="/" className="hover:text-gray-600 dark:hover:text-gray-300">
            首页
          </Link>
          <Link href="/blog/" className="hover:text-gray-600 dark:hover:text-gray-300">
            博客
          </Link>
          <Link href="/tools/" className="hover:text-gray-600 dark:hover:text-gray-300">
            工具
          </Link>
          <a
            href="https://github.com/levi52"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600 dark:hover:text-gray-300"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
