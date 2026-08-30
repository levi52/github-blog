import Link from "next/link";
import PostCard from "@/components/PostCard";
import postsData from "@/lib/posts-data.json";

export default function Home() {
  const recentPosts = postsData.posts.slice(0, 5);

  return (
    <div className="max-w-5xl mx-auto px-6">
      <section className="pt-20 pb-16 animate-slide-in-up">
        <p className="text-sm text-text-muted tracking-widest uppercase mb-4">Welcome</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6">
          Hi, I&apos;m <span className="text-accent">Levi5</span>
        </h1>
        <p className="text-lg text-text-secondary max-w-xl leading-relaxed">
          I write about programming, technology, and things I find interesting.
        </p>
        <div className="mt-8 flex items-center gap-4">
          <Link
            href="/about/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-text text-bg text-sm font-medium rounded-full hover:shadow-[var(--shadow-hover)] hover:scale-105 active:scale-95 transition-all duration-200"
          >
            About
          </Link>
          <Link
            href="/blog/"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-sm font-medium rounded-full hover:border-border-hover hover:bg-surface-hover hover:shadow-[var(--shadow)] transition-all duration-200"
          >
            View Blog
          </Link>
        </div>
      </section>

      <section className="pb-20">
        <div className="flex items-baseline justify-between mb-8 animate-slide-in-up delay-200">
          <h2 className="text-xl font-semibold tracking-tight">Recent Posts</h2>
          <Link href="/blog/" className="text-sm text-text-muted hover:text-accent transition-colors duration-200">
            View all &rarr;
          </Link>
        </div>
        {recentPosts.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 md:items-stretch">
            {recentPosts.map((post, i) => (
              <div key={post.slug} className={`animate-slide-in-up delay-${(i + 2) * 100}`}>
                <PostCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-text-muted text-sm">
            No posts yet. Create your first post in{" "}
            <code className="text-accent">content/posts/</code>.
          </p>
        )}
      </section>
    </div>
  );
}
