"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import PostCard from "@/components/PostCard";
import {
  getAllPostsClient,
  getAllCategoriesClient,
  getAllTagsClient,
  getPostsByCategoryClient,
  getPostsByTagClient,
  searchPostsClient,
} from "@/lib/posts-client";

function BlogContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const tag = searchParams.get("tag");
  const q = searchParams.get("q");

  let posts;
  let filterLabel = "";

  if (q) {
    posts = searchPostsClient(q);
    filterLabel = `"${q}"`;
  } else if (category) {
    posts = getPostsByCategoryClient(category);
    filterLabel = category;
  } else if (tag) {
    posts = getPostsByTagClient(tag);
    filterLabel = `#${tag}`;
  } else {
    posts = getAllPostsClient();
  }

  const categories = getAllCategoriesClient();
  const tags = getAllTagsClient();

  const buildHref = (key: string, value: string) =>
    `/blog/?${key}=${encodeURIComponent(value)}`;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-10 animate-slide-in-up">
        <p className="text-sm text-text-muted tracking-widest uppercase mb-3">Archive</p>
        <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
      </div>

      <form
        className="mb-10 animate-slide-in-up delay-100"
        onSubmit={(e) => {
          e.preventDefault();
          const input = e.currentTarget.elements.namedItem("q") as HTMLInputElement;
          const value = input.value.trim();
          const base = window.location.pathname.startsWith("/github-blog") ? "/github-blog" : "";
          window.location.href = value
            ? `${base}/blog/?q=${encodeURIComponent(value)}`
            : `${base}/blog/`;
        }}
      >
        <div className="relative max-w-md">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            name="q"
            type="text"
            placeholder="Search posts..."
            defaultValue={q || ""}
            className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10 transition-all duration-200 placeholder:text-text-muted hover:border-border-hover"
          />
        </div>
      </form>

      {(category || tag || q) && (
        <div className="mb-8 flex items-center gap-2 text-sm animate-fade-in">
          <span className="text-text-muted">Filtered by</span>
          <span className="px-2.5 py-1 bg-accent/10 text-accent rounded-md font-medium text-xs">
            {filterLabel}
          </span>
          <Link href="/blog/" className="text-text-muted hover:text-accent transition-colors duration-200 ml-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Link>
        </div>
      )}

      <div className="flex gap-12">
        <div className="flex-1 space-y-4">
          {posts.length > 0 ? (
            posts.map((post, i) => (
              <div key={post.slug} className={`animate-slide-in-up delay-${Math.min((i + 1) * 100, 500)}`}>
                <PostCard post={post} query={q || ""} />
              </div>
            ))
          ) : (
            <div className="py-16 text-center">
              <p className="text-text-muted text-sm">No posts found.</p>
            </div>
          )}
        </div>

        <aside className="w-48 shrink-0 hidden lg:block animate-slide-in-left delay-300">
          <div className="sticky top-8 space-y-8">
            {categories.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-text-muted tracking-widest uppercase mb-3">
                  Categories
                </h3>
                <ul className="space-y-1.5">
                  {categories.map((cat) => (
                    <li key={cat}>
                      <Link
                        href={buildHref("category", cat)}
                        className={`text-sm px-2 py-1 rounded-md transition-all duration-200 block ${
                          category === cat
                            ? "text-accent font-medium bg-accent/10"
                            : "text-text-secondary hover:text-text hover:bg-border/30"
                        }`}
                      >
                        {cat}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {tags.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold text-text-muted tracking-widest uppercase mb-3">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((t) => (
                    <Link
                      key={t}
                      href={buildHref("tag", t)}
                      className={`text-xs px-2.5 py-1 rounded-lg transition-all duration-200 ${
                        tag === t
                          ? "bg-accent/10 text-accent font-medium"
                          : "bg-bg-secondary text-text-muted hover:text-text hover:bg-accent/10"
                      }`}
                    >
                      #{t}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function BlogList() {
  return (
    <Suspense fallback={
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-24 bg-border rounded"></div>
          <div className="h-10 w-32 bg-border rounded"></div>
        </div>
      </div>
    }>
      <BlogContent />
    </Suspense>
  );
}
