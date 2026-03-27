import { getServerSideSitemap } from 'next-sitemap'
import { getServerSideURL } from '@/utilities/getURL'
import { audienceCategories, getAudienceCategoryPath } from '@/utilities/postTaxonomy'
import { getServiceLandingPagePaths } from '@/utilities/serviceLandingPages'
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
    loc: `${siteURL}/posts`,
    lastmod,
  },
  ...getServiceLandingPagePaths().map((path) => ({
    loc: `${siteURL}${path}`,
    lastmod,
  })),
  ...audienceCategories.map((category) => ({
    loc: `${siteURL}${getAudienceCategoryPath(category.categorySlug)}`,
    lastmod,
  })),
  ...subjectDisciplines.map((discipline) => ({
    loc: `${siteURL}${getSubjectPath(discipline.slug)}`,
    lastmod,
  })),
]

export const revalidate = 3600

export async function GET() {
  const siteURL = getServerSideURL()
  const dateFallback = new Date().toISOString()

  return getServerSideSitemap(buildDefaultPagesSitemap(siteURL, dateFallback))
}
