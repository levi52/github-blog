import BlogList from "@/components/BlogList";
import postsData from "@/lib/posts-data.json";

export default function BlogPage() {
  return (
    <BlogList
      initialPosts={postsData.posts}
      initialCategories={postsData.categories}
      initialTags={postsData.tags}
    />
  );
}
