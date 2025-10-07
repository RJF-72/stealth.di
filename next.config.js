// apps/web-app/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      '@stealth-di/codefont-engine',
      '@stealth-di/image-generator',
      '@stealth-di/compression'
    ]
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
    };
    
    // Include CodeFont assets
    config.module.rules.push({
      test: /\.cf$/,
      type: 'asset/resource',
    });
    
    return config;
  },
  env: {
    CODEFONT_PATHS: JSON.stringify({
      CODING: '/codefonts/CODEGENIUS_X.cf',
      VISUAL: '/codefonts/VISUAL_GENIUS_PRO.cf',
      CONTENT: '/codefonts/CONTENT_CREATOR_PRO.cf'
    })
  }
};

module.exports = nextConfig;