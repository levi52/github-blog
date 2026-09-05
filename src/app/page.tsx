import Link from "next/link";
import PostCard from "@/components/PostCard";
import Typewriter from "@/components/Typewriter";
import postsData from "@/lib/posts-data.json";

export default function Home() {
  const recentPosts = postsData.posts.slice(0, 4);

  return (
    <div className="max-w-5xl mx-auto px-6">
      <section className="pt-20 pb-16 animate-slide-in-up">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12">
          <div className="flex-1">
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
          </div>

          <div className="hidden md:block shrink-0" aria-hidden="true">
            <svg
              width="160"
              height="130"
              viewBox="0 0 160 130"
              fill="none"
              className="text-text-muted/40"
            >
              {/* Monitor body - all-in-one retro desktop */}
              <g transform="skewY(-3)">
                {/* Main body */}
                <rect x="20" y="15" width="120" height="95" rx="8" fill="var(--border)" />
                {/* Screen bezel */}
                <rect x="28" y="22" width="104" height="72" rx="4" fill="var(--bg)" />
                {/* Screen */}
                <rect x="35" y="28" width="90" height="58" rx="2" fill="var(--bg-secondary)" />
                {/* Terminal content */}
                <text x="42" y="42" fontSize="5" fill="var(--accent)" fontFamily="monospace">$</text>
                <text x="49" y="42" fontSize="4.5" fill="var(--text-muted)" fontFamily="monospace">npm run dev</text>
                <rect x="42" y="47" width="3.5" height="1.5" fill="var(--accent)" opacity="0.8">
                  <animate attributeName="opacity" values="0.8;0;0.8" dur="1.2s" repeatCount="indefinite" />
                </rect>
                {/* Floppy drive slot */}
                <rect x="95" y="100" width="30" height="4" rx="1" fill="var(--bg)" opacity="0.5" />
                {/* Power LED */}
                <circle cx="90" cy="102" r="1.5" fill="var(--accent)" opacity="0.6">
                  <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" />
                </circle>
                {/* Apple logo */}
                <circle cx="80" cy="102" r="2.5" fill="var(--text-muted)" opacity="0.3" />
              </g>
              {/* Shadow */}
              <ellipse cx="80" cy="120" rx="55" ry="4" fill="var(--text)" opacity="0.08" />
            </svg>
          </div>
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
