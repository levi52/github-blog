const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const postsDirectory = path.join(__dirname, "../content/posts");
const outputFile = path.join(__dirname, "../src/lib/posts-data.json");

function generatePostsData() {
  if (!fs.existsSync(postsDirectory)) {
    fs.writeFileSync(outputFile, JSON.stringify({ posts: [], categories: [], tags: [], series: [] }));
    return;
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
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
      posts: seriesPosts.sort((a, b) => (a.seriesOrder || 0) - (b.seriesOrder || 0)),
    });
  });

  const data = { posts, categories, tags, series };
  fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
  console.log(`Generated ${outputFile} with ${posts.length} posts (excluded drafts)`);
}

generatePostsData();
