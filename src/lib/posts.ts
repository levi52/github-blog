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
}

export interface PostContent extends PostData {
  contentHtml: string;
}

export function getAllPosts(): PostData[] {
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

      return {
        slug,
        title: data.title || "",
        date: data.date || "",
        summary: data.summary || "",
        categories: data.categories || [],
        tags: data.tags || [],
        coverImage: data.coverImage || undefined,
      };
    });

  return allPostsData.sort((a, b) => (a.date > b.date ? -1 : 1));
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

  return {
    slug,
    title: data.title || "",
    date: data.date || "",
    summary: data.summary || "",
    categories: data.categories || [],
    tags: data.tags || [],
    coverImage: data.coverImage || undefined,
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
  return getAllPosts().filter((post) =>
    post.categories.includes(category)
  );
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
