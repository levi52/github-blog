import {
  getAllPosts,
  getAllCategories,
  getAllTags,
  getPostsByCategory,
  getPostsByTag,
  searchPosts,
} from "@/lib/posts";
import PostCard from "@/components/PostCard";
import SearchBox from "@/components/SearchBox";

export default function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; tag?: string; q?: string }>;
}) {
  const params = {
    category: undefined as string | undefined,
    tag: undefined as string | undefined,
    q: undefined as string | undefined,
  };

  // We need to handle this synchronously for static export
  // Use a wrapper to resolve the promise
  const resolvedParams = Object.assign(params, searchParams);

  let posts;
  if (resolvedParams.q) {
    posts = searchPosts(resolvedParams.q);
  } else if (resolvedParams.category) {
    posts = getPostsByCategory(resolvedParams.category);
  } else if (resolvedParams.tag) {
    posts = getPostsByTag(resolvedParams.tag);
  } else {
    posts = getAllPosts();
  }

  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>

      <SearchBox />

      {(resolvedParams.category || resolvedParams.tag || resolvedParams.q) && (
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <span>Filtered by:</span>
          {resolvedParams.category && (
            <span className="font-medium">{resolvedParams.category}</span>
          )}
          {resolvedParams.tag && (
            <span className="font-medium">#{resolvedParams.tag}</span>
          )}
          {resolvedParams.q && (
            <span className="font-medium">&quot;{resolvedParams.q}&quot;</span>
          )}
          <a href="/blog" className="text-blue-500 hover:underline ml-2">
            Clear
          </a>
        </div>
      )}

      <div className="flex gap-8">
        <div className="flex-1 space-y-4">
          {posts.length > 0 ? (
            posts.map((post) => <PostCard key={post.slug} post={post} />)
          ) : (
            <p className="text-gray-500 text-sm">No posts found.</p>
          )}
        </div>

        <aside className="w-48 shrink-0 hidden md:block">
          {categories.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold mb-2">Categories</h3>
              <ul className="space-y-1 text-sm">
                {categories.map((cat) => (
                  <li key={cat}>
                    <a
                      href={`/blog?category=${encodeURIComponent(cat)}`}
                      className="hover:underline text-gray-600 dark:text-gray-400"
                    >
                      {cat}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {tags.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-1">
                {tags.map((t) => (
                  <a
                    key={t}
                    href={`/blog?tag=${encodeURIComponent(t)}`}
                    className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded hover:opacity-80"
                  >
                    #{t}
                  </a>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
