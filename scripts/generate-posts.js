/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");
const { marked } = require("marked");
const { plainTextFromHtml } = require("../src/lib/plain-text.ts");

const postsDirectory = path.join(__dirname, "../content/posts");
const outputFile = path.join(__dirname, "../src/lib/posts-data.json");

const postsDirResolved = path.resolve(postsDirectory);

/** Reduce Markdown to the plain-text body consumed by the client-side search. */
function toSearchBody(markdown) {
  if (!markdown) return "";
  return plainTextFromHtml(marked.parse(markdown, { async: false }));
}

function resolvePostPath(relative) {
  const fullPath = path.resolve(postsDirResolved, relative);
  return fullPath.startsWith(postsDirResolved + path.sep) ? fullPath : null;
}

function generatePostsData() {
  if (!fs.existsSync(postsDirectory)) {
    fs.writeFileSync(outputFile, JSON.stringify({ posts: [], categories: [], tags: [], series: [] }));
    return;
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter((name) => name.endsWith(".md"))
    .flatMap((fileName) => {
      const fullPath = resolvePostPath(fileName);
      if (!fullPath) return [];

      const slug = fileName.replace(/\.md$/, "");
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || "",
        date: data.date || "",
        summary: data.summary || "",
        searchBody: toSearchBody(content),
        categories: data.categories || [],
        tags: data.tags || [],
        coverImage: data.coverImage || undefined,
        pinned: data.pinned || false,
        draft: data.draft || false,
        series: data.series || undefined,
        seriesOrder: data.seriesOrder || undefined,
      };
    });

  const posts = allPosts
    .filter((post) => !post.draft)
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return a.date > b.date ? -1 : 1;
    });

  const categories = [...new Set(posts.flatMap((p) => p.categories))].sort();
  const tags = [...new Set(posts.flatMap((p) => p.tags))].sort();

  // Series entries are a lightweight index, not a second copy of the posts.
  // The series view only needs the name, the count, and slug + title per entry,
  // so duplicating searchBody/frontmatter here would bloat the payload twice over.
  const seriesMap = new Map();
  posts.forEach((post) => {
    if (post.series) {
      const existing = seriesMap.get(post.series) || [];
      existing.push(post);
      seriesMap.set(post.series, existing);
    }
  });

  const series = [];
  seriesMap.forEach((seriesPosts, name) => {
    series.push({
      name,
      posts: seriesPosts
        .slice()
        .sort((a, b) => (a.seriesOrder || 0) - (b.seriesOrder || 0))
        .map((post) => ({
          slug: post.slug,
          title: post.title,
          seriesOrder: post.seriesOrder,
        })),
    });
  });

  const data = { posts, categories, tags, series };
  fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
  console.log(`Generated ${outputFile} with ${posts.length} posts (excluded drafts)`);
}

generatePostsData();
