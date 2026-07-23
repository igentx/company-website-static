import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,

  poweredByHeader: false,
  compress: true,

  async redirects() {
    return [
      { source: '/en', destination: '/', permanent: true },
      { source: '/en/(.*)', destination: '/$1', permanent: true },
      {
        source: '/case-studies/web-development-uae-startup-moduluxe-group',
        destination: '/case-studies/moduluxe-group',
        permanent: true,
      },
      {
        source: '/case-studies/web-development-startup-dr-door',
        destination: '/case-studies/dr-door',
        permanent: true,
      },
    ]
  },

  async rewrites() {
    return [
      { source: '/', destination: '/en' },
      { source: '/contact', destination: '/en/contact' },
      { source: '/privacy', destination: '/en/privacy' },
      { source: '/terms', destination: '/en/terms' },
      { source: '/uae', destination: '/en/uae' },
      { source: '/services', destination: '/en/services' },
      { source: '/services/:slug+', destination: '/en/services/:slug+' },
      { source: '/products', destination: '/en/products' },
      { source: '/products/ai-customer-service-agent', destination: '/en/products/ai-customer-service-agent' },
      { source: '/products/daycaremate', destination: '/en/products/daycaremate' },
      { source: '/case-studies', destination: '/en/case-studies' },
      { source: '/case-studies/moduluxe-group', destination: '/en/case-studies/web-development-uae-startup-moduluxe-group' },
      { source: '/case-studies/dr-door', destination: '/en/case-studies/web-development-startup-dr-door' },
      {
        source: '/case-studies/bloomwave-learning-daycare',
        destination: '/en/case-studies/bloomwave-learning-daycare',
      },
      { source: '/blog', destination: '/en/blog' },
      { source: '/blog/:slug*', destination: '/en/blog/:slug*' },
    ]
  },

  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts', '.tsx'],
    }
    return config
  },
}

export default nextConfig
