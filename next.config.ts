import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site (no server/runtime). Emits a plain `out/` folder that
  // any static host (AWS Amplify, S3, etc.) can serve directly.
  output: "export",
  // Static export can't use the on-demand Image Optimizer. We use plain <img>,
  // so this is a safety net rather than a requirement.
  images: { unoptimized: true },
  // Emit `route/index.html` so clean URLs map to files on static hosts.
  trailingSlash: true,
};

export default nextConfig;
