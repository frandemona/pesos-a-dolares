import type { MetadataRoute } from 'next'

/**
 * Generates the robots.txt metadata route configuration for search engine crawlers.
 *
 * @returns {MetadataRoute.Robots} The robots configuration object.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://www.pesosadolar.es/sitemap.xml',
  }
}
