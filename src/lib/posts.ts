import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content/posts");

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

export interface PostContent extends PostData {
  contentHtml: string;
}

export interface SeriesData {
  name: string;
  posts: PostData[];
}

function getAllPostsRaw(): PostData[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      const date = data.date ? (data.date instanceof Date ? data.date.toISOString().split("T")[0] : String(data.date)) : "";

      return {
        slug,
        title: data.title || "",
        date,
        summary: data.summary || "",
        categories: data.categories || [],
        tags: data.tags || [],
        coverImage: data.coverImage || undefined,
        pinned: data.pinned || false,
        draft: data.draft || false,
        series: data.series || undefined,
        seriesOrder: data.seriesOrder || undefined,
      };
    });

  return allPostsData.sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return a.date > b.date ? -1 : 1;
  });
}

export function getAllPosts(): PostData[] {
  return getAllPostsRaw().filter((post) => !post.draft);
}

export function getAllPostsIncludingDrafts(): PostData[] {
  return getAllPostsRaw();
}

export function getPostBySlug(slug: string): PostContent | null {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = remark().use(html).processSync(content);
  const contentHtml = processedContent.toString();

  const date = data.date ? (data.date instanceof Date ? data.date.toISOString().split("T")[0] : String(data.date)) : "";

  return {
    slug,
    title: data.title || "",
    date,
    summary: data.summary || "",
    categories: data.categories || [],
    tags: data.tags || [],
    coverImage: data.coverImage || undefined,
    pinned: data.pinned || false,
    draft: data.draft || false,
    series: data.series || undefined,
    seriesOrder: data.seriesOrder || undefined,
    contentHtml,
  };
}

export function getAllCategories(): string[] {
  const posts = getAllPosts();
  const categories = new Set<string>();
  posts.forEach((post) => post.categories.forEach((c) => categories.add(c)));
  return Array.from(categories).sort();
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tags = new Set<string>();
  posts.forEach((post) => post.tags.forEach((t) => tags.add(t)));
  return Array.from(tags).sort();
}

export function getPostsByCategory(category: string): PostData[] {
  return getAllPosts().filter((post) => post.categories.includes(category));
}

export function getPostsByTag(tag: string): PostData[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}

export function searchPosts(query: string): PostData[] {
  const lowerQuery = query.toLowerCase();
  return getAllPosts().filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.summary.toLowerCase().includes(lowerQuery) ||
      post.tags.some((t) => t.toLowerCase().includes(lowerQuery)) ||
      post.categories.some((c) => c.toLowerCase().includes(lowerQuery))
  );
}

export function getAdjacentPosts(slug: string): { prev: PostData | null; next: PostData | null } {
  const posts = getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  return {
    prev: index < posts.length - 1 ? posts[index + 1] : null,
    next: index > 0 ? posts[index - 1] : null,
  };
}

export function getAllSeries(): SeriesData[] {
  const posts = getAllPosts();
  const seriesMap = new Map<string, PostData[]>();

  posts.forEach((post) => {
    if (post.series) {
      const existing = seriesMap.get(post.series) || [];
      existing.push(post);
      seriesMap.set(post.series, existing);
    }
  });

  const series: SeriesData[] = [];
  seriesMap.forEach((posts, name) => {
    series.push({
      name,
      posts: posts.sort((a, b) => (a.seriesOrder || 0) - (b.seriesOrder || 0)),
    });
  });

  return series;
}

export function getSeriesByName(name: string): SeriesData | null {
  const allSeries = getAllSeries();
  return allSeries.find((s) => s.name === name) || null;
}

export function getPostsBySeries(series: string): PostData[] {
  return getAllPosts()
    .filter((post) => post.series === series)
    .sort((a, b) => (a.seriesOrder || 0) - (b.seriesOrder || 0));
}
