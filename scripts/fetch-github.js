const fs = require("fs");
const path = require("path");

const GITHUB_USERNAME = "levi52";
const OUTPUT_FILE = path.join(__dirname, "..", "src", "lib", "github-data.json");

const headers = {
  Accept: "application/vnd.github.v3+json",
  ...(process.env.GITHUB_TOKEN && {
    Authorization: `token ${process.env.GITHUB_TOKEN}`,
  }),
};

async function fetchJSON(url) {
  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

async function main() {
  console.log(`Fetching GitHub data for ${GITHUB_USERNAME}...`);

  const profile = await fetchJSON(`https://api.github.com/users/${GITHUB_USERNAME}`);
  const repos = await fetchJSON(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`
  );

  const data = {
    profile: {
      name: profile.name || profile.login,
      login: profile.login,
      avatar: profile.avatar_url,
      bio: profile.bio || "",
      blog: profile.blog || "",
      publicRepos: profile.public_repos,
      created: profile.created_at,
      followers: profile.followers,
      following: profile.following,
    },
    repos: repos
      .filter((r) => !r.fork)
      .map((repo) => ({
        name: repo.name,
        description: repo.description || "",
        language: repo.language || "Unknown",
        url: repo.html_url,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        topics: repo.topics || [],
        updatedAt: repo.updated_at,
      })),
    fetchedAt: new Date().toISOString(),
  };

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));
  console.log(`Saved GitHub data to ${OUTPUT_FILE}`);
}

main().catch((err) => {
  console.error("Error fetching GitHub data:", err.message);
  process.exit(1);
});
