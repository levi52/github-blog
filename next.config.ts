import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/github-blog",
  trailingSlash: true,
};

export default nextConfig;
