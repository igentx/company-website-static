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

      // Legacy English crawl URLs (Google 404s) → live equivalents.
      // Use :path+ (one or more) for nested rules so the bare landing path is not
      // matched with an empty capture and incorrectly sent to "/".
      // Middleware also applies these (including /ar) before the generic /ar strip.
      {
        source: '/case-studies-landing-page',
        destination: '/case-studies',
        permanent: true,
      },
      {
        source: '/case-studies-landing-page/:path+',
        destination: '/:path+',
        permanent: true,
      },
      {
        source: '/blog/services/:path*',
        destination: '/services/:path*',
        permanent: true,
      },
      // /service rules: exact pluralisation, then blog crawl paths, then strip prefix.
      { source: '/service', destination: '/services', permanent: true },
      {
        source: '/service/blog/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/service/:path*',
        destination: '/:path*',
        permanent: true,
      },
      // /web-development-uae was never a real app route (docs example only).
      // Live page is /services/web-development-uae.
      {
        source: '/web-development-uae',
        destination: '/services/web-development-uae',
        permanent: true,
      },

      // Broken "$"-prefixed crawls from bad relative links
      { source: '/\\$/:path*', destination: '/:path*', permanent: true },
      { source: '/%24/:path*', destination: '/:path*', permanent: true },

      // Arabic locale was removed (no content/ar). Prefer direct legacy→canonical
      // mappings so /ar/<legacy> reaches a 200 in one hop. Middleware also strips
      // /ar then applies the same English legacy map in one response.
      {
        source: '/ar/case-studies-landing-page',
        destination: '/case-studies',
        permanent: true,
      },
      {
        source: '/ar/case-studies-landing-page/:path+',
        destination: '/:path+',
        permanent: true,
      },
      {
        source: '/ar/blog/services/:path*',
        destination: '/services/:path*',
        permanent: true,
      },
      { source: '/ar/service', destination: '/services', permanent: true },
      {
        source: '/ar/service/blog/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/ar/service/:path*',
        destination: '/:path*',
        permanent: true,
      },
      {
        source: '/ar/web-development-uae',
        destination: '/services/web-development-uae',
        permanent: true,
      },
      { source: '/ar', destination: '/', permanent: true },
      { source: '/ar/:path*', destination: '/:path*', permanent: true },

      // Broken relative-link crawl paths → canonical blog posts
      {
        source: '/blog/blog/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
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
