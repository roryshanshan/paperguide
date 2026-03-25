import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
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

const loadDynamicPagesSitemap = async (siteURL: string, dateFallback: string) => {
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

  return results.docs
    ? results.docs
        .filter((page) => Boolean(page?.slug))
        .map((page) => {
          return {
            loc: page?.slug === 'home' ? `${siteURL}/` : `${siteURL}/${page?.slug}`,
            lastmod: page.updatedAt || dateFallback,
          }
        })
    : []
}

export const revalidate = 3600

export async function GET() {
  const siteURL = getServerSideURL()
  const dateFallback = new Date().toISOString()
  const defaultSitemap = buildDefaultPagesSitemap(siteURL, dateFallback)

  try {
    const sitemap = await loadDynamicPagesSitemap(siteURL, dateFallback)
    const merged = new Map<string, PageSitemapEntry>()

    for (const entry of [...defaultSitemap, ...sitemap]) {
      merged.set(entry.loc, entry)
    }

    return getServerSideSitemap(Array.from(merged.values()))
  } catch (error) {
    console.warn('[pages-sitemap] Falling back to built-in page URLs.', error)

    return getServerSideSitemap(defaultSitemap)
  }
}
