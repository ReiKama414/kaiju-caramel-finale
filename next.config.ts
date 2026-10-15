import type { NextConfig } from "next";
const nextConfig: NextConfig = { output: "export", images: { unoptimized: true, qualities:[75,90] }, poweredByHeader: false, trailingSlash: true, agentRules:false, allowedDevOrigins:['127.0.0.1'], devIndicators:false };
export default nextConfig;
