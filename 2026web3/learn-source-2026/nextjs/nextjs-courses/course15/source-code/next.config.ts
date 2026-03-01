import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        /**
         * Next.js 增强安全性配置：
         * 1. 默认情况下，next/image 不允许从外部域名加载图片。
         * 2. remotePatterns 明确指定允许加载图片的外部域名。
         * 3. 这可以防止恶意用户利用你的 Next.js 服务器优化任意域名的图片，节省服务器资源。
         */
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },
}

export default nextConfig
