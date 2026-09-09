/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: "https://levi52.github.io/github-blog",
  generateRobotsTxt: true,
  sitemapSize: 7000,
  // Emit into the exported build output (gitignored) instead of public/.
  // Writing to public/ rewrote tracked files on every local `npm run build`
  // and left the repo permanently dirty; GitHub Pages deploys from ./out.
  outDir: "./out",
};

module.exports = config;
