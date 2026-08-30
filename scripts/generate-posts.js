const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

const postsDirectory = path.join(__dirname, "../content/posts");
const outputFile = path.join(__dirname, "../src/lib/posts-data.json");

function generatePostsData() {
  if (!fs.existsSync(postsDirectory)) {
    fs.writeFileSync(outputFile, JSON.stringify({ posts: [], categories: [], tags: [] }));
    return;
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
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
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  const categories = [...new Set(posts.flatMap((p) => p.categories))].sort();
  const tags = [...new Set(posts.flatMap((p) => p.tags))].sort();

  const data = { posts, categories, tags };
  fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
  console.log(`Generated ${outputFile} with ${posts.length} posts`);
}

generatePostsData();
