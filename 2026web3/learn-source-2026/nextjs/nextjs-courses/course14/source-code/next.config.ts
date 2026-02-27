import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

// https://next-intl.dev/docs/getting-started/app-router
// 配置 Next.js 国际化插件
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  
};

export default withNextIntl(nextConfig);
