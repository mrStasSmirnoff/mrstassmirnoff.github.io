import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";
import { siteUrl } from "./lib/urls";

export default function nextConfig(phase: string): NextConfig {
  // Local development stays at /. Production follows the actual Pages URL.
  const basePath = phase === PHASE_DEVELOPMENT_SERVER ? "" : new URL(siteUrl).pathname.replace(/\/$/, "");
  return {
    output: "export",
    trailingSlash: true,
    basePath,
    images: { unoptimized: true },
    env: { NEXT_PUBLIC_BASE_PATH: basePath },
  };
}
