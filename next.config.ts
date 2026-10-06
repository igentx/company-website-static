import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,

  poweredByHeader: false,
  compress: true,

  async redirects() {
    return [
      // Apex (non-www) → www primary domain (308 via permanent: true). Vercel domain settings should mirror this.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'igentx.com' }],
        destination: 'https://www.igentx.com/:path*',
        permanent: true,
      },
      { source: '/en', destination: '/', permanent: true },
      { source: '/en/:path*', destination: '/:path*', permanent: true },
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
      // DaycareMate → Clayox rebrand (product + blogs)
      {
        source: '/products/daycaremate',
        destination: '/products/clayox',
        permanent: true,
      },
      {
        source: '/blog/daycaremate-childcare-management-software-guide',
        destination: '/blog/clayox-childcare-management-software-guide',
        permanent: true,
      },
      {
        source: '/blog/ai-translation-daycaremate-multilingual-uae',
        destination: '/blog/ai-translation-clayox-multilingual-uae',
        permanent: true,
      },
      {
        source: '/blog/bloomwave-daycaremate-digital-transformation',
        destination: '/blog/bloomwave-clayox-digital-transformation',
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
      { source: '/about', destination: '/en/about' },
      { source: '/refund-policy', destination: '/en/refund-policy' },
      { source: '/uae', destination: '/en/uae' },
      { source: '/services', destination: '/en/services' },
      { source: '/services/:slug+', destination: '/en/services/:slug+' },
      { source: '/products', destination: '/en/products' },
      { source: '/products/ai-customer-service-agent', destination: '/en/products/ai-customer-service-agent' },
      { source: '/products/clayox', destination: '/en/products/clayox' },
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
