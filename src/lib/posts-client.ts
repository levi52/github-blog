import postsData from "./posts-data.json";

export interface PostData {
  slug: string;
  title: string;
  date: string;
  summary: string;
  categories: string[];
  tags: string[];
  coverImage?: string;
}

export function getAllPostsClient(): PostData[] {
  return postsData.posts;
}

export function getAllCategoriesClient(): string[] {
  return postsData.categories;
}

export function getAllTagsClient(): string[] {
  return postsData.tags;
}

export function getTagCountsClient(): Record<string, number> {
  const tagCounts: Record<string, number> = {};
  postsData.posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  return tagCounts;
}

export function getPostsByCategoryClient(category: string): PostData[] {
  return postsData.posts.filter((post) => post.categories.includes(category));
}

export function getPostsByTagClient(tag: string): PostData[] {
  return postsData.posts.filter((post) => post.tags.includes(tag));
}

export function searchPostsClient(query: string): PostData[] {
  const lowerQuery = query.toLowerCase();
  return postsData.posts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.summary.toLowerCase().includes(lowerQuery) ||
      post.tags.some((t) => t.toLowerCase().includes(lowerQuery)) ||
      post.categories.some((c) => c.toLowerCase().includes(lowerQuery))
  );
}
