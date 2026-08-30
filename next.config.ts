import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: process.env.GITHUB_ACTIONS ? "/github-blog" : "",
  trailingSlash: true,
  allowedDevOrigins: ["172.30.201.212"],
};

export default nextConfig;
