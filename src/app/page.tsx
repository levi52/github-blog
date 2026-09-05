import Link from "next/link";
import PostCard from "@/components/PostCard";
import Typewriter from "@/components/Typewriter";
import postsData from "@/lib/posts-data.json";

export default function Home() {
  const recentPosts = postsData.posts.slice(0, 4);

  return (
    <div className="max-w-5xl mx-auto px-6">
      <section className="pt-20 pb-16 animate-slide-in-up">
        <p className="text-sm text-text-muted tracking-widest uppercase mb-4">Welcome</p>
        <h1 className="font-heading text-4xl md:text-5xl tracking-tight leading-tight mb-6">
          Hi, I&apos;m{" "}
          <span className="text-accent">
            <Typewriter text="Levi5" speed={150} delay={500} />
          </span>
        </h1>
        <p className="text-lg text-text-secondary max-w-xl leading-relaxed">
          I write about programming, technology, and things I find interesting.
        </p>
        <div className="mt-8 flex items-center gap-4">
          <Link
            href="/about/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-text text-bg text-sm font-medium rounded-full hover:brightness-110 hover:shadow-lg transition-all duration-300 ease-out"
          >
            About
          </Link>
          <Link
            href="/blog/"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-sm font-medium rounded-full hover:border-accent hover:bg-accent/5 hover:shadow-md transition-all duration-300 ease-out"
          >
            View Blog
          </Link>
        </div>
      </section>

      <section className="pb-20">
        <div
          className="flex items-baseline justify-between mb-8 animate-slide-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <h2 className="font-heading text-xl tracking-tight">Recent Posts</h2>
          <Link href="/blog/" className="text-sm text-text-muted hover:text-accent transition-colors duration-200">
            View all &rarr;
          </Link>
        </div>
        {recentPosts.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 md:items-stretch">
            {recentPosts.map((post, i) => (
              <div
                key={post.slug}
                className="animate-slide-in-up"
                style={{ animationDelay: `${(i + 2) * 0.1}s` }}
              >
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
