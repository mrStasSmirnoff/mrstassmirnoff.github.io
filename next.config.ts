import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build HTML files in out/; GitHub Pages cannot run a Node.js server.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
