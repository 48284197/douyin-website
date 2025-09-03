import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  // Removed output: 'export' to allow dynamic API routes
  output: 'standalone',
  // 优化配置
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@tiptap/react',
      '@tiptap/starter-kit',
      'date-fns',
    ],
  },
  
  // 压缩配置
  compress: true,
  
  // 图片优化
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  
  // Webpack优化
  webpack: (config, { isServer }) => {
    // 优化bundle大小
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    return config;
  },
};

export default nextConfig;
