const DEFAULT_PRODUCTION_URL = 'https://paperguide.vercel.app'
const LOCAL_HOSTNAMES = new Set(['127.0.0.1', '0.0.0.0', 'localhost'])

const normalizeSiteUrl = (value, allowLocal = false) => {
  if (!value) return null

  const trimmed = String(value).trim()

  if (!trimmed) return null

  const shouldUseHttp = /^(https?:\/\/)?(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?$/i.test(trimmed)
  const candidate = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `${shouldUseHttp ? 'http' : 'https'}://${trimmed}`

  try {
    const normalized = new URL(candidate)

    if (!allowLocal && LOCAL_HOSTNAMES.has(normalized.hostname)) {
      return null
    }

    return normalized.origin
  } catch {
    return null
  }
}

const SITE_URL =
  normalizeSiteUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ||
  normalizeSiteUrl(process.env.NEXT_PUBLIC_SERVER_URL) ||
  DEFAULT_PRODUCTION_URL

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  exclude: ['/posts-sitemap.xml', '/pages-sitemap.xml', '/*', '/posts/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/admin/*', '/consultation-admin/*', '/next/*', '/set-locale'],
      },
    ],
    additionalSitemaps: [`${SITE_URL}/pages-sitemap.xml`, `${SITE_URL}/posts-sitemap.xml`],
  },
}
