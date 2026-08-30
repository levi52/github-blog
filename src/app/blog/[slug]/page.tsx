import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllPosts, getAdjacentPosts } from "@/lib/posts";
import TableOfContents from "@/components/TableOfContents";
import Copyright from "@/components/Copyright";
import FontSizeAdjuster from "@/components/FontSizeAdjuster";
import ProseContent from "@/components/ProseContent";
import ShareButton from "@/components/ShareButton";

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    notFound();
  }

  const { prev, next } = getAdjacentPosts(slug);

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <Link
        href="/blog/"
        className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-accent transition-colors duration-200 mb-8 animate-slide-in-up"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Blog
      </Link>

      <div className="flex gap-10">
        <article className="flex-1 min-w-0 bg-surface border border-border rounded-2xl p-8 md:p-10 animate-slide-in-up delay-100">
          <header className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <time className="text-sm text-text-muted">{post.date}</time>
              <div className="flex items-center gap-2">
                <ShareButton title={post.title} url={`/blog/${post.slug}/`} />
                <FontSizeAdjuster />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-5">
              {post.title}
            </h1>
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
          </header>

          <ProseContent html={post.contentHtml} />

          <Copyright title={post.title} url={`/blog/${post.slug}/`} />
        </article>

        <TableOfContents />
      </div>

      <nav className="mt-8 grid gap-4 md:grid-cols-2 animate-slide-in-up delay-200">
        {prev ? (
          <Link
            href={`/blog/${prev.slug}/`}
            className="group p-5 bg-surface border border-border rounded-xl hover:border-border-hover hover:shadow-[var(--shadow-hover)] transition-all duration-300"
          >
            <span className="text-xs text-text-muted block mb-2">&larr; 上一篇</span>
            <span className="text-sm font-semibold text-text group-hover:text-accent transition-colors duration-200 line-clamp-1">
              {prev.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/blog/${next.slug}/`}
            className="group p-5 bg-surface border border-border rounded-xl hover:border-border-hover hover:shadow-[var(--shadow-hover)] transition-all duration-300 text-right"
          >
            <span className="text-xs text-text-muted block mb-2">下一篇 &rarr;</span>
            <span className="text-sm font-semibold text-text group-hover:text-accent transition-colors duration-200 line-clamp-1">
              {next.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </div>
  );
}
