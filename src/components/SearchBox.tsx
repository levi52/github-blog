"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/blog/?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/blog/");
    }
  };

  return (
    <form onSubmit={handleSearch} className="mb-8" role="search" aria-label="搜索文章">
      <label htmlFor="blog-search" className="sr-only">
        搜索文章
      </label>
      <input
        id="blog-search"
        type="text"
        placeholder="搜索文章..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="搜索文章"
        className="w-full max-w-md px-4 py-2.5 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all duration-200 placeholder:text-text-muted hover:border-border-hover"
      />
    </form>
  );
}
