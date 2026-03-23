import React from 'react'

import type { Post } from '@/payload-types'

import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getServerSideURL } from '@/utilities/getURL'

const getImageUrl = (post: Post) => {
  const image =
    post.heroImage && typeof post.heroImage === 'object' && 'url' in post.heroImage
      ? post.heroImage
      : post.meta?.image && typeof post.meta.image === 'object' && 'url' in post.meta.image
        ? post.meta.image
        : null

  if (!image?.url) return `${getServerSideURL()}/website-template-OG.webp`

  const resolvedUrl = getMediaUrl(image.sizes?.og?.url || image.url)

  if (!resolvedUrl) {
    return `${getServerSideURL()}/website-template-OG.webp`
  }

  return resolvedUrl.startsWith('http') ? resolvedUrl : `${getServerSideURL()}${resolvedUrl}`
}

export const ArticleJsonLd: React.FC<{
  locale: 'zh' | 'en'
  post: Post
}> = ({ locale, post }) => {
  const siteUrl = getServerSideURL()
  const authorNames = post.populatedAuthors?.map((author) => author.name).filter(Boolean) || [
    'PaperBridge Editorial Team',
  ]
  const articleSection =
    post.categories
      ?.map((category) => (typeof category === 'object' ? category.title : null))
      .filter(Boolean) || []

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    articleSection,
    author: authorNames.map((name) => ({
      '@type': 'Person',
      name,
    })),
    dateModified: post.updatedAt,
    datePublished: post.publishedAt || post.createdAt,
    description: post.meta?.description || undefined,
    headline: post.meta?.title || post.title,
    image: [getImageUrl(post)],
    inLanguage: locale === 'en' ? 'en' : 'zh-CN',
    mainEntityOfPage: `${siteUrl}/posts/${post.slug}`,
    publisher: {
      '@type': 'Organization',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/favicon.svg`,
      },
      name: 'PaperBridge',
      url: siteUrl,
    },
  }

  return (
    <script
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      type="application/ld+json"
    />
  )
}
