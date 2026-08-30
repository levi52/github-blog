import Link from "next/link";
import type { PostData } from "@/lib/posts";

export default function PostCard({ post }: { post: PostData }) {
  return (
    <article className="group p-6 bg-surface border border-border rounded-xl hover:border-border-hover hover:shadow-sm transition-all duration-200">
      <div className="flex items-center gap-3 mb-3">
        <time className="text-xs text-text-muted font-medium tracking-wide">
          {post.date}
        </time>
      </div>
      <Link href={`/blog/${post.slug}/`}>
        <h2 className="text-lg font-semibold tracking-tight mb-2 group-hover:text-accent transition-colors">
          {post.title}
        </h2>
      </Link>
      <p className="text-sm text-text-secondary leading-relaxed mb-4">
        {post.summary}
      </p>
      <div className="flex flex-wrap gap-2">
        {post.categories.map((cat) => (
          <Link
            key={cat}
            href={`/blog/?category=${encodeURIComponent(cat)}`}
            className="text-xs px-2.5 py-1 bg-accent/10 text-accent rounded-md hover:bg-accent/20 transition-colors font-medium"
          >
            {cat}
          </Link>
        ))}
        {post.tags.map((tag) => (
          <Link
            key={tag}
            href={`/blog/?tag=${encodeURIComponent(tag)}`}
            className="text-xs px-2.5 py-1 bg-bg-secondary text-text-muted rounded-md hover:text-text-secondary hover:bg-border/50 transition-colors"
          >
            #{tag}
          </Link>
        ))}
      </div>
    </article>
  );
}
