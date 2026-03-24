import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getServerSideURL } from '@/utilities/getURL'
import { audienceCategories, getAudienceCategoryPath } from '@/utilities/postTaxonomy'
import { getSubjectPath, subjectDisciplines } from '@/utilities/subjectNavigation'

const getPagesSitemap = unstable_cache(
  async () => {
    const SITE_URL = getServerSideURL()
    const dateFallback = new Date().toISOString()
    const payload = await getPayload({ config })
    const results = await payload
      .find({
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
      .catch(() => ({ docs: [] as { slug?: string | null; updatedAt?: string | null }[] }))

    const defaultSitemap = [
      {
        loc: `${SITE_URL}/`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/search`,
        lastmod: dateFallback,
      },
      {
        loc: `${SITE_URL}/posts`,
        lastmod: dateFallback,
      },
      ...audienceCategories.map((category) => ({
        loc: `${SITE_URL}${getAudienceCategoryPath(category.categorySlug)}`,
        lastmod: dateFallback,
      })),
      ...subjectDisciplines.map((discipline) => ({
        loc: `${SITE_URL}${getSubjectPath(discipline.slug)}`,
        lastmod: dateFallback,
      })),
    ]

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

    const merged = new Map<string, { lastmod: string; loc: string }>()

    for (const entry of [...defaultSitemap, ...sitemap]) {
      merged.set(entry.loc, entry)
    }

    return Array.from(merged.values())
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
