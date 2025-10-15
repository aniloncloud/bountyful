import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Documentation files are excluded from deployment via .vercelignore
};

export default nextConfig;
