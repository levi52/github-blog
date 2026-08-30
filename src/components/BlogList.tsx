"use client";

import Link from "next/link";
import { useState } from "react";
import PostCard from "@/components/PostCard";
import {
  getAllPostsClient,
  getAllCategoriesClient,
  getAllTagsClient,
  getPostsByCategoryClient,
  getPostsByTagClient,
  searchPostsClient,
} from "@/lib/posts-client";
import type { PostData } from "@/lib/posts-client";

export default function BlogList({
  initialPosts,
  initialCategories,
  initialTags,
}: {
  initialPosts: PostData[];
  initialCategories: string[];
  initialTags: string[];
}) {
  const [posts, setPosts] = useState(initialPosts);
  const [categories] = useState(initialCategories);
  const [tags] = useState(initialTags);
  const [activeFilter, setActiveFilter] = useState<{
    type: "category" | "tag" | "query" | null;
    value: string | null;
  }>({ type: null, value: null });

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setPosts(getAllPostsClient());
      setActiveFilter({ type: null, value: null });
      return;
    }
    setPosts(searchPostsClient(query));
    setActiveFilter({ type: "query", value: query });
  };

  const handleCategoryClick = (category: string) => {
    setPosts(getPostsByCategoryClient(category));
    setActiveFilter({ type: "category", value: category });
  };

  const handleTagClick = (tag: string) => {
    setPosts(getPostsByTagClient(tag));
    setActiveFilter({ type: "tag", value: tag });
  };

  const handleClear = () => {
    setPosts(getAllPostsClient());
    setActiveFilter({ type: null, value: null });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Search posts..."
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-900"
        />
      </div>

      {activeFilter.type && (
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <span>Filtered by:</span>
          {activeFilter.type === "category" && (
            <span className="font-medium">{activeFilter.value}</span>
          )}
          {activeFilter.type === "tag" && (
            <span className="font-medium">#{activeFilter.value}</span>
          )}
          {activeFilter.type === "query" && (
            <span className="font-medium">&quot;{activeFilter.value}&quot;</span>
          )}
          <button
            onClick={handleClear}
            className="text-blue-500 hover:underline ml-2"
          >
            Clear
          </button>
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
                    <button
                      onClick={() => handleCategoryClick(cat)}
                      className="hover:underline text-gray-600 dark:text-gray-400 text-left cursor-pointer w-full text-left"
                    >
                      {cat}
                    </button>
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
                  <button
                    key={t}
                    onClick={() => handleTagClick(t)}
                    className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded hover:opacity-80 cursor-pointer"
                  >
                    #{t}
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
