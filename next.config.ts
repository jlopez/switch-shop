import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Canonical /shop/ with a trailing slash, so the Apache-style relative links resolve for DBI, Tinfoil and browsers alike
  trailingSlash: true,
};

export default nextConfig;
