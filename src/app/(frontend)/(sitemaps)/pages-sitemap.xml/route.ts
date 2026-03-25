import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getServerSideURL } from '@/utilities/getURL'
import { audienceCategories, getAudienceCategoryPath } from '@/utilities/postTaxonomy'
import { getSubjectPath, subjectDisciplines } from '@/utilities/subjectNavigation'

type PageSitemapEntry = {
  lastmod: string
  loc: string
}

const buildDefaultPagesSitemap = (siteURL: string, lastmod: string): PageSitemapEntry[] => [
  {
    loc: `${siteURL}/`,
    lastmod,
  },
  {
    loc: `${siteURL}/search`,
    lastmod,
  },
  {
    loc: `${siteURL}/posts`,
    lastmod,
  },
  ...audienceCategories.map((category) => ({
    loc: `${siteURL}${getAudienceCategoryPath(category.categorySlug)}`,
    lastmod,
  })),
  ...subjectDisciplines.map((discipline) => ({
    loc: `${siteURL}${getSubjectPath(discipline.slug)}`,
    lastmod,
  })),
]

const getPagesSitemap = unstable_cache(
  async () => {
    const SITE_URL = getServerSideURL()
    const dateFallback = new Date().toISOString()
    const defaultSitemap = buildDefaultPagesSitemap(SITE_URL, dateFallback)

    try {
      const payload = await getPayload({ config })
      const results = await payload.find({
        collection: 'pages',
        overrideAccess: false,
        draft: false,
        depth: 0,
        limit: 1000,
        pagination: false,
        where: {
          _status: {
            equals: 'published',
          },
        },
        select: {
          slug: true,
          updatedAt: true,
        },
      })

      const sitemap = results.docs
        ? results.docs
            .filter((page) => Boolean(page?.slug))
            .map((page) => {
              return {
                loc: page?.slug === 'home' ? `${SITE_URL}/` : `${SITE_URL}/${page?.slug}`,
                lastmod: page.updatedAt || dateFallback,
              }
            })
        : []

      const merged = new Map<string, PageSitemapEntry>()

      for (const entry of [...defaultSitemap, ...sitemap]) {
        merged.set(entry.loc, entry)
      }

      return Array.from(merged.values())
    } catch (error) {
      console.warn('[pages-sitemap] Falling back to built-in page URLs.', error)

      return defaultSitemap
    }
  },
  ['pages-sitemap'],
  {
    tags: ['pages-sitemap'],
  },
)

export async function GET() {
  const sitemap = await getPagesSitemap()

  return getServerSideSitemap(sitemap)
}
