import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllPosts } from "@/lib/posts";

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

  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      <Link
        href="/blog/"
        className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-accent transition-colors mb-10"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Blog
      </Link>

      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <time className="text-sm text-text-muted">{post.date}</time>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight mb-5">
          {post.title}
        </h1>
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
              className="text-xs px-2.5 py-1 bg-bg-secondary text-text-muted rounded-md hover:text-text-secondary transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </header>

      <div
        className="prose prose-lg max-w-none
          prose-headings:tracking-tight prose-headings:font-semibold
          prose-h2:text-xl prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-text-secondary prose-p:leading-relaxed
          prose-a:text-accent prose-a:no-underline hover:prose-a:underline
          prose-strong:text-text
          prose-code:text-accent prose-code:bg-accent/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal prose-code:before:content-[''] prose-code:after:content-['']
          prose-pre:bg-surface prose-pre:border prose-pre:border-border
          prose-li:text-text-secondary
          prose-blockquote:border-accent/30 prose-blockquote:text-text-muted"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </article>
  );
}
