import { getServerSideSitemap } from 'next-sitemap'
import { getCachedPostSitemapEntries } from '@/utilities/getCachedPostQueries'
import { getServerSideURL } from '@/utilities/getURL'

export async function GET() {
  const sitemap = await getCachedPostSitemapEntries(getServerSideURL())

  return getServerSideSitemap(sitemap)
}
