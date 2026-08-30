import Link from "next/link";
import type { PostData } from "@/lib/posts";

export default function PostCard({ post }: { post: PostData }) {
  return (
    <article className="group p-6 border border-gray-200 dark:border-gray-800 rounded-lg hover:border-gray-400 dark:hover:border-gray-600 transition-colors">
      <Link href={`/blog/${post.slug}/`}>
        <h2 className="text-lg font-semibold mb-2 group-hover:underline">
          {post.title}
        </h2>
      </Link>
      <time className="text-sm text-gray-500">{post.date}</time>
      <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
        {post.summary}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {post.categories.map((cat) => (
          <Link
            key={cat}
            href={`/blog/?category=${encodeURIComponent(cat)}`}
            className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded hover:opacity-80"
          >
            {cat}
          </Link>
        ))}
        {post.tags.map((tag) => (
          <Link
            key={tag}
            href={`/blog/?tag=${encodeURIComponent(tag)}`}
            className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded hover:opacity-80"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </article>
  );
}
