import type { Metadata } from 'next'

import type { Media, Page, Post, Config } from '../payload-types'

import { mergeOpenGraph } from './mergeOpenGraph'
import { getServerSideURL } from './getURL'

const getImageURL = (image?: Media | Config['db']['defaultIDType'] | null) => {
  const serverUrl = getServerSideURL()

  let url = serverUrl + '/website-template-OG.webp'

  if (image && typeof image === 'object' && 'url' in image) {
    const ogUrl = image.sizes?.og?.url

    url = ogUrl ? serverUrl + ogUrl : serverUrl + image.url
  }

  return url
}

export const generateMeta = async (args: {
  doc: Partial<Page> | Partial<Post> | null
  openGraphType?: 'article' | 'website'
  pathname?: string
}): Promise<Metadata> => {
  const { doc, openGraphType, pathname } = args

  const ogImage = getImageURL(doc?.meta?.image)
  const serverUrl = getServerSideURL()
  const normalizedTitle = doc?.meta?.title?.trim()

  const title = normalizedTitle
    ? normalizedTitle.endsWith('| PaperBridge')
      ? normalizedTitle
      : `${normalizedTitle} | PaperBridge`
    : 'PaperBridge | Thesis Coaching & Academic Support'

  const url =
    pathname && pathname !== '/'
      ? `${serverUrl}${pathname.startsWith('/') ? pathname : `/${pathname}`}`
      : serverUrl

  return {
    description: doc?.meta?.description,
    openGraph: mergeOpenGraph({
      description: doc?.meta?.description || '',
      images: ogImage
        ? [
            {
              url: ogImage,
            },
          ]
        : undefined,
      title,
      url,
      ...(openGraphType ? { type: openGraphType } : {}),
    }),
    title,
  }
}
