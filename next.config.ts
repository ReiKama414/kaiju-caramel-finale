import type { NextConfig } from "next";

const repo = "kaiju-caramel-finale";
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ||
  (process.env.GITHUB_ACTIONS === "true" ? `/${repo}` : "");

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true, qualities: [75, 90] },
  poweredByHeader: false,
  trailingSlash: true,
  agentRules: false,
  allowedDevOrigins: ["127.0.0.1"],
  devIndicators: false,
};

export default nextConfig;
