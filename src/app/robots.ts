import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/auth/callback',
          '/profile',
          '/wallet',
        ],
      },
    ],
    sitemap: 'https://unifesto.app/sitemap.xml',
  }
}
