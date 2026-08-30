import Link from "next/link";
import PostCard from "@/components/PostCard";
import postsData from "@/lib/posts-data.json";

export default function Home() {
  const recentPosts = postsData.posts.slice(0, 5);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <section className="mb-12">
        <h1 className="text-3xl font-bold mb-4">Hi, I&apos;m Levi</h1>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          Welcome to my blog. I write about programming, technology, and things
          I find interesting.
        </p>
        <div className="mt-4 flex gap-4">
          <a
            href="https://github.com/levi52"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-4 py-2 border border-gray-300 dark:border-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            GitHub
          </a>
          <Link
            href="/blog/"
            className="text-sm px-4 py-2 border border-gray-300 dark:border-gray-700 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            View Blog
          </Link>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Recent Posts</h2>
          <Link href="/blog/" className="text-sm text-gray-500 hover:underline">
            View all &rarr;
          </Link>
        </div>
        {recentPosts.length > 0 ? (
          <div className="space-y-4">
            {recentPosts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">
            No posts yet. Create your first post in{" "}
            <code>content/posts/</code>.
          </p>
        )}
      </section>
    </div>
  );
}
