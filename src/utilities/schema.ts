import type { Media, Page, Post } from '@/payload-types'

import { getMediaUrl } from '@/utilities/getMediaUrl'
import { getServerSideURL } from '@/utilities/getURL'
import type { SiteLocale } from '@/utilities/siteLocale'

type SchemaObject = Record<string, unknown>

type BreadcrumbItem = {
  name: string
  path: string
}

type FAQItem = {
  answer: string
  question: string
}

type PostListSchemaItem = Pick<Post, 'slug' | 'title' | 'meta'> & {
  heroImage?: Post['heroImage']
  publishedAt?: string | null
  updatedAt?: string
}

type BuildWebPageSchemaArgs = {
  breadcrumbId?: string
  dateModified?: string | null
  datePublished?: string | null
  description?: string | null
  imageUrl?: string | null
  locale: SiteLocale
  mainEntityId?: string
  path: string
  title: string
  type?: string
}

const SITE_NAME = 'PaperBridge'
const SERVER_URL = getServerSideURL()
const DEFAULT_SITE_DESCRIPTION = {
  en: 'Thesis coaching and thesis guidance for undergraduate, master, and PhD students across proposal, writing, revision, and defense preparation.',
  zh: '提供本科、硕士、博士阶段的一对一论文辅导与论文指导服务，覆盖开题、写作、返修与答辩准备。',
} as const

const isMedia = (value: unknown): value is Media => {
  return Boolean(value && typeof value === 'object' && 'url' in value)
}

export const getSchemaLanguage = (locale: SiteLocale) => {
  return locale === 'en' ? 'en' : 'zh-CN'
}

export const getDefaultSchemaDescription = (locale: SiteLocale) => {
  return DEFAULT_SITE_DESCRIPTION[locale]
}

export const getSchemaAbsoluteUrl = (path: string) => {
  if (/^https?:\/\//.test(path)) {
    return path
  }

  if (path === '/' || path === '') {
    return SERVER_URL
  }

  return new URL(path.startsWith('/') ? path : `/${path}`, `${SERVER_URL}/`).toString()
}

export const getSchemaDefaultImageUrl = () => {
  return getSchemaAbsoluteUrl('/website-template-OG.webp')
}

export const getSchemaOrganizationId = () => {
  return `${SERVER_URL}#organization`
}

export const getSchemaWebsiteId = () => {
  return `${SERVER_URL}#website`
}

export const getSchemaWebPageId = (path: string) => {
  return `${getSchemaAbsoluteUrl(path)}#webpage`
}

export const getSchemaBreadcrumbId = (path: string) => {
  return `${getSchemaAbsoluteUrl(path)}#breadcrumb`
}

export const getSchemaItemListId = (path: string) => {
  return `${getSchemaAbsoluteUrl(path)}#itemlist`
}

export const getSchemaServiceId = (path: string) => {
  return `${getSchemaAbsoluteUrl(path)}#service`
}

export const getSchemaFaqId = (path: string) => {
  return `${getSchemaAbsoluteUrl(path)}#faq`
}

export const getSchemaMediaUrl = (image?: Media | number | null) => {
  if (!isMedia(image) || !image.url) {
    return getSchemaDefaultImageUrl()
  }

  const resolvedUrl = getMediaUrl(image.sizes?.og?.url || image.url)

  if (!resolvedUrl) {
    return getSchemaDefaultImageUrl()
  }

  return getSchemaAbsoluteUrl(resolvedUrl)
}

export const getSchemaPostImageUrl = (post: Pick<Post, 'heroImage' | 'meta'>) => {
  const image =
    isMedia(post.heroImage) ? post.heroImage : isMedia(post.meta?.image) ? post.meta.image : null

  return getSchemaMediaUrl(image)
}

export const getSchemaPageImageUrl = (page: Pick<Page, 'hero' | 'meta'>) => {
  const image =
    isMedia(page.meta?.image) ? page.meta.image : isMedia(page.hero?.media) ? page.hero.media : null

  return getSchemaMediaUrl(image)
}

export const buildOrganizationSchema = (locale: SiteLocale): SchemaObject => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': getSchemaOrganizationId(),
    description: getDefaultSchemaDescription(locale),
    inLanguage: getSchemaLanguage(locale),
    logo: {
      '@type': 'ImageObject',
      url: getSchemaAbsoluteUrl('/favicon.svg'),
    },
    name: SITE_NAME,
    url: SERVER_URL,
  }
}

export const buildWebsiteSchema = (locale: SiteLocale): SchemaObject => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': getSchemaWebsiteId(),
    description: getDefaultSchemaDescription(locale),
    inLanguage: getSchemaLanguage(locale),
    name: SITE_NAME,
    potentialAction: {
      '@type': 'SearchAction',
      'query-input': 'required name=search_term_string',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SERVER_URL}/search?q={search_term_string}`,
      },
    },
    publisher: {
      '@id': getSchemaOrganizationId(),
    },
    url: SERVER_URL,
  }
}

export const buildBreadcrumbSchema = ({
  items,
  path,
}: {
  items: BreadcrumbItem[]
  path: string
}): SchemaObject => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': getSchemaBreadcrumbId(path),
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      item: getSchemaAbsoluteUrl(item.path),
      name: item.name,
      position: index + 1,
    })),
  }
}

export const buildWebPageSchema = ({
  breadcrumbId,
  dateModified,
  datePublished,
  description,
  imageUrl,
  locale,
  mainEntityId,
  path,
  title,
  type = 'WebPage',
}: BuildWebPageSchemaArgs): SchemaObject => {
  const schema: SchemaObject = {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': getSchemaWebPageId(path),
    about: {
      '@id': getSchemaOrganizationId(),
    },
    inLanguage: getSchemaLanguage(locale),
    isPartOf: {
      '@id': getSchemaWebsiteId(),
    },
    name: title,
    url: getSchemaAbsoluteUrl(path),
  }

  if (description) {
    schema.description = description
  }

  if (imageUrl) {
    schema.primaryImageOfPage = {
      '@type': 'ImageObject',
      url: imageUrl,
    }
  }

  if (breadcrumbId) {
    schema.breadcrumb = {
      '@id': breadcrumbId,
    }
  }

  if (mainEntityId) {
    schema.mainEntity = {
      '@id': mainEntityId,
    }
  }

  if (dateModified) {
    schema.dateModified = dateModified
  }

  if (datePublished) {
    schema.datePublished = datePublished
  }

  return schema
}

export const buildCollectionPageSchema = (
  args: Omit<BuildWebPageSchemaArgs, 'type'> & {
    type?: string
  },
): SchemaObject => {
  return buildWebPageSchema({
    ...args,
    type: args.type ?? 'CollectionPage',
  })
}

export const buildPostItemListSchema = ({
  locale,
  path,
  posts,
}: {
  locale: SiteLocale
  path: string
  posts: PostListSchemaItem[]
}): SchemaObject => {
  const validPosts = posts.filter(
    (post): post is PostListSchemaItem & { slug: string } =>
      typeof post.slug === 'string' && post.slug.length > 0,
  )

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': getSchemaItemListId(path),
    itemListElement: validPosts.map((post, index) => {
      const articleUrl = getSchemaAbsoluteUrl(`/posts/${post.slug}`)
      const articleTitle = post.meta?.title || post.title
      const article: SchemaObject = {
        '@type': 'Article',
        '@id': `${articleUrl}#article`,
        headline: articleTitle,
        image: [getSchemaPostImageUrl(post)],
        inLanguage: getSchemaLanguage(locale),
        name: articleTitle,
        url: articleUrl,
      }

      if (post.meta?.description) {
        article.description = post.meta.description
      }

      if (post.publishedAt) {
        article.datePublished = post.publishedAt
      }

      if (post.updatedAt) {
        article.dateModified = post.updatedAt
      }

      return {
        '@type': 'ListItem',
        item: article,
        name: articleTitle,
        position: index + 1,
        url: articleUrl,
      }
    }),
    itemListOrder: 'https://schema.org/ItemListOrderDescending',
    numberOfItems: validPosts.length,
    url: getSchemaAbsoluteUrl(path),
  }
}

export const buildArticleSchema = ({
  locale,
  post,
}: {
  locale: SiteLocale
  post: Post
}): SchemaObject => {
  const articleUrl = getSchemaAbsoluteUrl(`/posts/${post.slug}`)
  const authorNames = post.populatedAuthors?.map((author) => author.name).filter(Boolean) || [
    'PaperBridge Editorial Team',
  ]
  const articleSection =
    post.categories
      ?.map((category) => (typeof category === 'object' ? category.title : null))
      .filter(Boolean) || []

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${articleUrl}#article`,
    articleSection,
    author: authorNames.map((name) => ({
      '@type': 'Person',
      name,
    })),
    dateModified: post.updatedAt,
    datePublished: post.publishedAt || post.createdAt,
    description: post.meta?.description || undefined,
    headline: post.meta?.title || post.title,
    image: [getSchemaPostImageUrl(post)],
    inLanguage: getSchemaLanguage(locale),
    mainEntityOfPage: articleUrl,
    publisher: {
      '@id': getSchemaOrganizationId(),
    },
    url: articleUrl,
  }
}

export const buildServiceSchema = ({
  audience,
  description,
  locale,
  name,
  path,
  serviceType,
}: {
  audience?: ReadonlyArray<string>
  description: string
  locale: SiteLocale
  name: string
  path: string
  serviceType: string
}): SchemaObject => {
  const schema: SchemaObject = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': getSchemaServiceId(path),
    areaServed: {
      '@type': 'Country',
      name: locale === 'en' ? 'China' : '中国',
    },
    availableLanguage: ['zh-CN', 'en'],
    description,
    inLanguage: getSchemaLanguage(locale),
    name,
    provider: {
      '@id': getSchemaOrganizationId(),
    },
    serviceType,
    url: getSchemaAbsoluteUrl(path),
  }

  if (audience && audience.length > 0) {
    schema.audience = audience.map((name) => ({
      '@type': 'Audience',
      audienceType: name,
    }))
  }

  return schema
}

export const buildFaqSchema = ({
  items,
  path,
}: {
  items: ReadonlyArray<FAQItem>
  path: string
}): SchemaObject => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': getSchemaFaqId(path),
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
      name: item.question,
    })),
    url: getSchemaAbsoluteUrl(path),
  }
}
