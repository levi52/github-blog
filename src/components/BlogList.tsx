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
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>

      <form
        className="mb-8"
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
        <input
          name="q"
          type="text"
          placeholder="Search posts..."
          defaultValue={q || ""}
          className="w-full max-w-md px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900"
        />
      </form>

      {(category || tag || q) && (
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <span>Filtered by:</span>
          <span className="font-medium">{filterLabel}</span>
          <Link href="/blog/" className="text-blue-500 hover:underline ml-2">
            Clear
          </Link>
        </div>
      )}

      <div className="flex gap-8">
        <div className="flex-1 space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => <PostCard key={post.slug} post={post} />)
          ) : (
            <p className="text-gray-500 text-sm">No posts found.</p>
          )}
        </div>

        <aside className="w-48 shrink-0 hidden md:block">
          {categories.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-2">Categories</h3>
              <ul className="space-y-1 text-sm">
                {categories.map((cat) => (
                  <li key={cat}>
                    <Link
                      href={buildHref("category", cat)}
                      className="hover:underline text-gray-600 dark:text-gray-400 cursor-pointer"
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
              <h3 className="text-sm font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-1">
                {tags.map((t) => (
                  <Link
                    key={t}
                    href={buildHref("tag", t)}
                    className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded hover:opacity-80 cursor-pointer"
                  >
                    #{t}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

export default function BlogList() {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto px-4 py-12">Loading...</div>}>
      <BlogContent />
    </Suspense>
  );
}
