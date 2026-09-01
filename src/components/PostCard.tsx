import Link from "next/link";
import Image from "next/image";
import type { PostData } from "@/lib/posts";
import HighlightText from "@/components/HighlightText";

export default function PostCard({ post, query }: { post: PostData; query?: string }) {
  return (
    <article className="group h-full p-4 bg-surface border border-border rounded-xl hover:border-border-hover hover:shadow-[var(--shadow-hover)] transition-all duration-300">
      <div className="flex gap-4">
        {post.coverImage && (
          <Link href={`/blog/${post.slug}/`} className="shrink-0">
            <div className="w-32 h-24 rounded-lg overflow-hidden bg-bg-secondary">
              <Image
                src={post.coverImage}
                alt={post.title}
                width={128}
                height={96}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </Link>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
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
            <h2 className="text-base font-semibold tracking-tight mb-2 group-hover:text-accent transition-colors duration-200 line-clamp-1">
              <HighlightText text={post.title} query={query || ""} />
            </h2>
          </Link>
          <p className="text-sm text-text-secondary leading-relaxed mb-3 line-clamp-2">
            <HighlightText text={post.summary} query={query || ""} />
          </p>
          <div className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, 4).map((tag) => (
              <Link
                key={tag}
                href={`/blog/?tag=${encodeURIComponent(tag)}`}
                className="text-xs px-2 py-0.5 bg-bg-secondary text-text-muted rounded-full hover:text-text hover:bg-accent/10 transition-all duration-200"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
