import Link from "next/link";
import type { PostData } from "@/lib/posts";

export default function PostCard({ post }: { post: PostData }) {
  return (
    <article className="group h-full p-6 bg-surface border border-border rounded-xl hover:border-border-hover hover:shadow-[var(--shadow-hover)] transition-all duration-300 flex flex-col">
      <div className="flex items-center gap-3 mb-3">
        {post.pinned && (
          <span className="text-xs px-2 py-0.5 bg-accent text-white rounded-md font-medium">
            置顶
          </span>
        )}
        <time className="text-xs text-text-muted font-medium tracking-wide">
          {post.date}
        </time>
      </div>
      <Link href={`/blog/${post.slug}/`}>
        <h2 className="text-lg font-semibold tracking-tight mb-2 group-hover:text-accent transition-colors duration-200">
          {post.title}
        </h2>
      </Link>
      <p className="text-sm text-text-secondary leading-relaxed mb-4 flex-1">
        {post.summary}
      </p>
      <div className="flex flex-wrap gap-2">
        {post.categories.map((cat) => (
          <Link
            key={cat}
            href={`/blog/?category=${encodeURIComponent(cat)}`}
            className="text-xs px-2.5 py-1 bg-accent/10 text-accent rounded-lg hover:bg-accent hover:text-white hover:shadow-[var(--shadow-accent)] transition-all duration-200 font-medium"
          >
            {cat}
          </Link>
        ))}
        {post.tags.map((tag) => (
          <Link
            key={tag}
            href={`/blog/?tag=${encodeURIComponent(tag)}`}
            className="text-xs px-2.5 py-1 bg-bg-secondary text-text-muted rounded-lg hover:text-text hover:bg-accent/10 transition-all duration-200"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </article>
  );
}
