import postsData from "./posts-data.json";
import type { PostData, SeriesData } from "./post-types";
import { searchPostsWithResults, type PostSearchResult } from "./search";

export type { PostData, SeriesData, SeriesPost } from "./post-types";

const posts = postsData.posts as PostData[];
const series = (postsData as { series?: SeriesData[] }).series || [];

export function getAllPostsClient(): PostData[] {
  return posts;
}

export function getAllCategoriesClient(): string[] {
  return postsData.categories;
}

export function getAllTagsClient(): string[] {
  return postsData.tags;
}

export function getTagCountsClient(): Record<string, number> {
  const tagCounts: Record<string, number> = {};
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  return tagCounts;
}

export function getPostsByCategoryClient(category: string): PostData[] {
  return posts.filter((post) => post.categories.includes(category));
}

export function getPostsByTagClient(tag: string): PostData[] {
  return posts.filter((post) => post.tags.includes(tag));
}

/** Full-text search over titles, tags, categories, summaries and bodies. */
export function searchPostsWithResultsClient(query: string): PostSearchResult[] {
  return searchPostsWithResults(posts, query);
}

export function searchPostsClient(query: string): PostData[] {
  return searchPostsWithResultsClient(query).map((result) => result.post);
}

export function getAllSeriesClient(): SeriesData[] {
  return series;
}

export function getSeriesByNameClient(name: string): SeriesData | null {
  return series.find((s) => s.name === name) || null;
}

export function getPostsBySeriesClient(seriesName: string): PostData[] {
  return posts
    .filter((post) => post.series === seriesName)
    .sort((a, b) => (a.seriesOrder || 0) - (b.seriesOrder || 0));
}
