const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

const TRENDING_URL = "https://github.com/trending";
const OUTPUT_FILE = path.join(__dirname, "..", "src", "lib", "trending-data.json");

function getWeekStart(date) {
  const d = new Date(date);
  const dayOfWeek = d.getDay();
  const monday = new Date(d);
  monday.setDate(d.getDate() - ((dayOfWeek + 6) % 7));
  monday.setHours(0, 0, 0, 0);
  return monday;
}

function getWeekId(date) {
  const monday = getWeekStart(date);
  const yearStart = new Date(monday.getFullYear(), 0, 1);
  const weekNumber = Math.ceil(((monday - yearStart) / 86400000 + yearStart.getDay() + 1) / 7);
  return `${monday.getFullYear()}-W${String(weekNumber).padStart(2, "0")}`;
}

function getWeekDateRange(date) {
  const monday = getWeekStart(date);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return {
    startDate: monday.toISOString().split("T")[0],
    endDate: sunday.toISOString().split("T")[0],
  };
}

async function fetchTrending(language = "") {
  const url = language ? `${TRENDING_URL}/${language}?since=weekly` : `${TRENDING_URL}?since=weekly`;
  console.log(`Fetching trending from: ${url}`);

  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      Accept: "text/html,application/xhtml+xml",
      "Accept-Language": "en-US,en;q=0.9",
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch trending: ${res.status} ${res.statusText}`);
  }

  return res.text();
}

function parseTrending(html) {
  const $ = cheerio.load(html);
  const repos = [];

  $("article.Box-row").each((_, article) => {
    const $article = $(article);

    // 项目名称和链接
    const nameLink = $article.find("h2.h3 a");
    const repoPath = nameLink.attr("href") || "";
    const parts = repoPath.trim().split("/").filter(Boolean);
    if (parts.length < 2) return;

    const owner = parts[0];
    const repo = parts[1];

    // 项目描述
    const description = $article.find("p.col-9").text().trim() || "";

    // 编程语言
    const language = $article.find('span[itemprop="programmingLanguage"]').text().trim() || "";

    // 语言颜色
    const colorStyle = $article.find("span.repo-language-color").attr("style") || "";
    const colorMatch = colorStyle.match(/background-color:\s*(#[0-9a-fA-F]+)/);
    const langColor = colorMatch ? colorMatch[1] : "";

    // 总 Star 数
    const starsText = $article.find('a[href$="/stargazers"]').text().trim().replace(/,/g, "") || "0";
    const stars = parseInt(starsText, 10) || 0;

    // Fork 数
    const forksText = $article.find('a[href$="/forks"]').text().trim().replace(/,/g, "") || "0";
    const forks = parseInt(forksText, 10) || 0;

    // 本周 Star 增长
    const todayText = $article.find("span.d-inline-block.float-sm-right").text().trim();
    const todayMatch = todayText.match(/([\d,]+)\s+stars?\s+(today|this week|this month)/);
    const todayStars = todayMatch ? parseInt(todayMatch[1].replace(/,/g, ""), 10) || 0 : 0;

    repos.push({
      owner,
      repo,
      url: `https://github.com${repoPath}`,
      description,
      language,
      langColor,
      stars,
      forks,
      todayStars,
    });
  });

  return repos;
}

async function main() {
  console.log("Fetching GitHub Trending (weekly)...");

  const html = await fetchTrending();
  const repos = parseTrending(html);

  const now = new Date();
  const weekId = getWeekId(now);
  const { startDate, endDate } = getWeekDateRange(now);

  // 读取现有数据
  let existingData = { weeks: [] };
  if (fs.existsSync(OUTPUT_FILE)) {
    try {
      existingData = JSON.parse(fs.readFileSync(OUTPUT_FILE, "utf-8"));
    } catch (e) {
      console.log("Existing data file is invalid, starting fresh");
    }
  }

  // 检查是否已有本周数据，如果有则更新
  const existingWeekIndex = existingData.weeks.findIndex((w) => w.weekId === weekId);

  const weekData = {
    weekId,
    startDate,
    endDate,
    fetchedAt: now.toISOString(),
    repos,
  };

  if (existingWeekIndex >= 0) {
    existingData.weeks[existingWeekIndex] = weekData;
    console.log(`Updated existing data for week ${weekId}`);
  } else {
    existingData.weeks.unshift(weekData);
    console.log(`Added new data for week ${weekId}`);
  }

  // 按周ID降序排序（最新的在前）
  existingData.weeks.sort((a, b) => b.weekId.localeCompare(a.weekId));

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(existingData, null, 2));
  console.log(`Saved ${repos.length} trending repos. Total weeks: ${existingData.weeks.length}`);
}

main().catch((err) => {
  console.error("Error fetching trending:", err.message);
  process.exit(1);
});
