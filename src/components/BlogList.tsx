"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo } from "react";
import PostCard from "@/components/PostCard";
import {
  getAllPostsClient,
  getAllCategoriesClient,
  getAllTagsClient,
  getTagCountsClient,
  getPostsByCategoryClient,
  getPostsByTagClient,
  searchPostsClient,
  getAllSeriesClient,
} from "@/lib/posts-client";
import type { PostData } from "@/lib/posts";

const POSTS_PER_PAGE = 10;

function groupPostsByYear(posts: PostData[]): Record<string, PostData[]> {
  const groups: Record<string, PostData[]> = {};
  posts.forEach((post) => {
    const year = post.date.substring(0, 4);
    if (!groups[year]) {
      groups[year] = [];
    }
    groups[year].push(post);
  });
  return groups;
}

function BlogContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const tag = searchParams.get("tag");
  const q = searchParams.get("q");
  const view = searchParams.get("view");
  const page = parseInt(searchParams.get("page") || "1", 10);

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
  const tagCounts = getTagCountsClient();
  const categoryCounts = categories.reduce((acc, cat) => {
    acc[cat] = getPostsByCategoryClient(cat).length;
    return acc;
  }, {} as Record<string, number>);
  const series = getAllSeriesClient();

  const buildHref = (key: string, value: string) =>
    `/blog/?${key}=${encodeURIComponent(value)}`;

  const isCategoriesView = view === "categories";
  const isTagsView = view === "tags";
  const isSeriesView = view === "series";
  const isDefaultView = !isCategoriesView && !isTagsView && !isSeriesView;

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const paginatedPosts = posts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const postsByYear = useMemo(() => groupPostsByYear(paginatedPosts), [paginatedPosts]);
  const sortedYears = useMemo(() => Object.keys(postsByYear).sort((a, b) => b.localeCompare(a)), [postsByYear]);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-10 animate-slide-in-up">
        <p className="text-sm text-text-muted tracking-widest uppercase mb-3">Archive</p>
        <h1 className="text-3xl font-bold tracking-tight">
          {isCategoriesView ? "全部分类" : isTagsView ? "全部标签" : isSeriesView ? "全部系列" : "Blog"}
        </h1>
        {(isCategoriesView || isTagsView || isSeriesView) && (
          <Link href="/blog/" className="text-sm text-text-muted hover:text-accent transition-colors duration-200 mt-2 inline-flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            返回全部文章
          </Link>
        )}
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

      {isCategoriesView ? (
        <div key="categories" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-slide-in-up">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={buildHref("category", cat)}
              className="group p-6 bg-surface border border-border rounded-xl hover:border-border-hover hover:shadow-[var(--shadow-hover)] transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text group-hover:text-accent transition-colors duration-200">
                  {cat}
                </h3>
                <span className="text-sm text-text-muted bg-bg-secondary px-3 py-1 rounded-full">
                  {categoryCounts[cat]} 篇
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : isTagsView ? (
        <div key="tags" className="flex flex-wrap gap-3 animate-slide-in-up">
          {tags.map((t) => (
            <Link
              key={t}
              href={buildHref("tag", t)}
              className="group px-4 py-2 bg-surface border border-border rounded-full hover:border-accent hover:bg-accent/10 transition-all duration-200 flex items-center gap-2"
            >
              <span className="text-text group-hover:text-accent transition-colors duration-200">#{t}</span>
              <span className="text-xs text-text-muted bg-bg-secondary px-2 py-0.5 rounded-full group-hover:bg-accent/20 group-hover:text-accent transition-all duration-200">
                {tagCounts[t] || 0}
              </span>
            </Link>
          ))}
        </div>
      ) : isSeriesView ? (
        <div key="series" className="space-y-6 animate-slide-in-up">
          {series.map((s) => (
            <div key={s.name} className="p-6 bg-surface border border-border rounded-xl hover:border-border-hover hover:shadow-[var(--shadow-hover)] transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text">{s.name}</h3>
                <span className="text-sm text-text-muted bg-bg-secondary px-3 py-1 rounded-full">
                  {s.posts.length} 篇
                </span>
              </div>
              <div className="space-y-2">
                {s.posts.map((post, i) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}/`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-bg-secondary transition-colors duration-200 group"
                  >
                    <span className="text-xs text-text-muted font-mono w-6">{i + 1}</span>
                    <span className="text-sm text-text group-hover:text-accent transition-colors duration-200">
                      {post.title}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div key="posts" className="flex gap-12 animate-slide-in-up">
          <div className="flex-1 space-y-8">
            {paginatedPosts.length > 0 ? (
              sortedYears.map((year) => (
                <div key={year} className="animate-slide-in-up">
                  <div className="flex items-center gap-4 mb-4">
                    <h2 className="text-2xl font-bold text-text">{year}</h2>
                    <span className="text-sm text-text-muted bg-bg-secondary px-3 py-1 rounded-full">
                      {postsByYear[year].length} 篇
                    </span>
                  </div>
                  <div className="space-y-4">
                    {postsByYear[year].map((post, i) => (
                      <div key={post.slug} className={`animate-slide-in-up delay-${Math.min((i + 1) * 100, 500)}`}>
                        <PostCard post={post} query={q || ""} />
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 text-center">
                <p className="text-text-muted text-sm">No posts found.</p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                {currentPage > 1 && (
                  <Link
                    href={buildHref("page", String(currentPage - 1))}
                    className="px-4 py-2 text-sm text-text-secondary hover:text-text hover:bg-border/30 rounded-lg transition-all duration-200"
                  >
                    上一页
                  </Link>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={buildHref("page", String(p))}
                    className={`w-10 h-10 flex items-center justify-center text-sm rounded-lg transition-all duration-200 ${
                      p === currentPage
                        ? "bg-accent text-white"
                        : "text-text-secondary hover:text-text hover:bg-border/30"
                    }`}
                  >
                    {p}
                  </Link>
                ))}
                {currentPage < totalPages && (
                  <Link
                    href={buildHref("page", String(currentPage + 1))}
                    className="px-4 py-2 text-sm text-text-secondary hover:text-text hover:bg-border/30 rounded-lg transition-all duration-200"
                  >
                    下一页
                  </Link>
                )}
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
                  <div className="flex flex-wrap gap-2">
                    {tags.map((t) => (
                      <Link
                        key={t}
                        href={buildHref("tag", t)}
                        className={`group text-xs px-3 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1.5 ${
                          tag === t
                            ? "bg-accent text-white shadow-[var(--shadow-accent)]"
                            : "bg-bg-secondary text-text-muted hover:text-text hover:bg-accent/10 hover:scale-105"
                        }`}
                      >
                        <span>{t}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                            tag === t
                              ? "bg-white/20 text-white"
                              : "bg-border/50 text-text-muted group-hover:bg-accent/20 group-hover:text-accent"
                          }`}
                        >
                          {tagCounts[t] || 0}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      )}
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
