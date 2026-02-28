import type { NextConfig } from "next";
import path from "node:path";

const SKIN = process.env.SKIN || "spa";

const skinPath = path.resolve(import.meta.dirname, `skins/${SKIN}`);

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      "@/skin": skinPath,
    },
  },
  webpack(config) {
    config.resolve.alias["@/skin"] = skinPath;
    return config;
  },
};

export default nextConfig;
