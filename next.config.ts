import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/survey',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
