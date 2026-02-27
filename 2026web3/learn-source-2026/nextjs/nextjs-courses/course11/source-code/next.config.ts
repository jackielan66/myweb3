import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // https://nextjs.org/docs/app/api-reference/directives/use-cache#usage
  
  // @ts-ignore - Types might not be updated yet in this environment
  // cacheComponents: true,
  
  experimental: {
     // fallback for older versions or if the warning was misleading
     // cacheComponents: true,
     // dynamicIO: true,
  },
};

export default nextConfig;
