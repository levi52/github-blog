import postsData from "./posts-data.json";

export interface PostData {
  slug: string;
  title: string;
  date: string;
  summary: string;
  categories: string[];
  tags: string[];
  coverImage?: string;
  pinned?: boolean;
  draft?: boolean;
  series?: string;
  seriesOrder?: number;
}

export interface SeriesData {
  name: string;
  posts: PostData[];
}

export function getAllPostsClient(): PostData[] {
  return postsData.posts as PostData[];
}

export function getAllCategoriesClient(): string[] {
  return postsData.categories;
}

export function getAllTagsClient(): string[] {
  return postsData.tags;
}

export function getTagCountsClient(): Record<string, number> {
  const tagCounts: Record<string, number> = {};
  (postsData.posts as PostData[]).forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  return tagCounts;
}

export function getPostsByCategoryClient(category: string): PostData[] {
  return (postsData.posts as PostData[]).filter((post) => post.categories.includes(category));
}

export function getPostsByTagClient(tag: string): PostData[] {
  return (postsData.posts as PostData[]).filter((post) => post.tags.includes(tag));
}

export function searchPostsClient(query: string): PostData[] {
  const lowerQuery = query.toLowerCase();
  return (postsData.posts as PostData[]).filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.summary.toLowerCase().includes(lowerQuery) ||
      post.tags.some((t) => t.toLowerCase().includes(lowerQuery)) ||
      post.categories.some((c) => c.toLowerCase().includes(lowerQuery))
  );
}

export function getAllSeriesClient(): SeriesData[] {
  return (postsData as any).series || [];
}

export function getSeriesByNameClient(name: string): SeriesData | null {
  const allSeries = getAllSeriesClient();
  return allSeries.find((s) => s.name === name) || null;
}

export function getPostsBySeriesClient(series: string): PostData[] {
  return (postsData.posts as PostData[])
    .filter((post) => post.series === series)
    .sort((a, b) => (a.seriesOrder || 0) - (b.seriesOrder || 0));
}
