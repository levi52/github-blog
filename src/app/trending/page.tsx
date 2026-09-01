import TrendingList from "@/components/TrendingList";

export const metadata = {
  title: "GitHub Trending - 每周热门开源项目",
  description: "发现本周 GitHub 上最热门的开源项目，按编程语言筛选，了解技术趋势。",
};

export default function TrendingPage() {
  return <TrendingList />;
}
