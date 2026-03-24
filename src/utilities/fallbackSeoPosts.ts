import 'server-only'

import { cache } from 'react'

import type { CardPostData } from '@/components/Card'
import type { Post } from '@/payload-types'
import { getAudienceCategory, parseSeoPostSlug } from '@/utilities/postTaxonomy'
import type { SiteLocale } from '@/utilities/siteLocale'
import { buildCatalog, type GeneratedPost } from '../../scripts/seed-seo-posts'

type ArchivePostsResult = {
  docs: CardPostData[]
  page: number
  totalDocs: number
  totalPages: number
}

type SitemapEntry = {
  lastmod: string
  loc: string
}

type CategoryReference = Extract<NonNullable<Post['categories']>[number], object>
type MediaReference = Extract<NonNullable<Post['heroImage']>, object>

const DEFAULT_MEDIA_ALT = 'PaperBridge article cover'
const DEFAULT_MEDIA_HEIGHT = 900
const DEFAULT_MEDIA_WIDTH = 1600

const buildStableId = (value: string): number => {
  let hash = 0

  for (const char of value) {
    hash = (hash * 31 + char.charCodeAt(0)) | 0
  }

  return Math.abs(hash) || 1
}

const getFallbackCatalog = cache(() =>
  buildCatalog()
    .slice()
    .sort((left, right) => {
      return new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime()
    }),
)

const getLocalizedTitle = (locale: SiteLocale, post: GeneratedPost) =>
  locale === 'en' ? post.titleEn : post.titleZh

const getLocalizedMetaTitle = (locale: SiteLocale, post: GeneratedPost) =>
  locale === 'en' ? post.metaTitleEn : post.metaTitleZh

const getLocalizedMetaDescription = (locale: SiteLocale, post: GeneratedPost) =>
  locale === 'en' ? post.metaDescriptionEn : post.metaDescriptionZh

const buildCategoryReference = (locale: SiteLocale, categorySlug: string): CategoryReference => {
  const category = getAudienceCategory(categorySlug)

  return {
    id: buildStableId(categorySlug),
    slug: categorySlug,
    title: category?.labels[locale] ?? categorySlug,
  } as CategoryReference
}

const buildMediaReference = (post: GeneratedPost): MediaReference => {
  return {
    alt: DEFAULT_MEDIA_ALT,
    filename: post.imageFilename,
    height: DEFAULT_MEDIA_HEIGHT,
    id: buildStableId(post.imageFilename),
    mimeType: 'image/webp',
    updatedAt: post.publishedAt,
    url: `/media/${post.imageFilename}`,
    width: DEFAULT_MEDIA_WIDTH,
  } as MediaReference
}

const buildCardPostData = (locale: SiteLocale, post: GeneratedPost): CardPostData => {
  const category = buildCategoryReference(locale, post.categorySlug)
  const heroImage = buildMediaReference(post)

  return {
    categories: [category] as CardPostData['categories'],
    heroImage: heroImage as CardPostData['heroImage'],
    meta: {
      description: getLocalizedMetaDescription(locale, post),
      image: heroImage,
      title: getLocalizedMetaTitle(locale, post),
    } as CardPostData['meta'],
    slug: post.slug,
    title: getLocalizedTitle(locale, post),
  }
}

const getCatalogEntryBySlug = (slug: string) => {
  return getFallbackCatalog().find((post) => post.slug === slug) ?? null
}

const getRelatedCatalogEntries = (slug: string) => {
  const parsedTarget = parseSeoPostSlug(slug)

  if (!parsedTarget) return []

  const catalog = getFallbackCatalog()
  const sameDiscipline = catalog.filter((candidate) => {
    const parsedCandidate = parseSeoPostSlug(candidate.slug)

    if (!parsedCandidate || candidate.slug === slug) return false

    return (
      parsedCandidate.degreeSlug === parsedTarget.degreeSlug &&
      parsedCandidate.disciplineSlug === parsedTarget.disciplineSlug
    )
  })

  if (sameDiscipline.length >= 3) {
    return sameDiscipline.slice(0, 3)
  }

  const merged = new Map<string, GeneratedPost>()

  for (const candidate of sameDiscipline) {
    merged.set(candidate.slug, candidate)
  }

  for (const candidate of catalog) {
    const parsedCandidate = parseSeoPostSlug(candidate.slug)

    if (!parsedCandidate || candidate.slug === slug) continue
    if (parsedCandidate.degreeSlug !== parsedTarget.degreeSlug) continue
    if (parsedCandidate.stageSlug !== parsedTarget.stageSlug) continue
    if (merged.has(candidate.slug)) continue

    merged.set(candidate.slug, candidate)
  }

  return Array.from(merged.values()).slice(0, 3)
}

export const getFallbackHomepagePosts = (locale: SiteLocale, limit: number): CardPostData[] => {
  return getFallbackCatalog()
    .slice(0, limit)
    .map((post) => buildCardPostData(locale, post))
}

export const getFallbackArchivePosts = (
  locale: SiteLocale,
  page: number,
  limit: number,
): ArchivePostsResult => {
  const catalog = getFallbackCatalog()
  const safeLimit = Math.max(limit, 1)
  const safePage = Math.max(page, 1)
  const totalDocs = catalog.length
  const totalPages = Math.max(Math.ceil(totalDocs / safeLimit), 1)
  const start = (safePage - 1) * safeLimit
  const docs = catalog
    .slice(start, start + safeLimit)
    .map((post) => buildCardPostData(locale, post))

  return {
    docs,
    page: safePage,
    totalDocs,
    totalPages,
  }
}

export const getFallbackCategoryPosts = (
  locale: SiteLocale,
  categorySlug: string,
  limit: number,
): CardPostData[] => {
  return getFallbackCatalog()
    .filter((post) => post.categorySlug === categorySlug)
    .slice(0, limit)
    .map((post) => buildCardPostData(locale, post))
}

export const getFallbackDisciplinePosts = (
  locale: SiteLocale,
  disciplineSlug: string,
  limit: number,
): CardPostData[] => {
  return getFallbackCatalog()
    .filter((post) => parseSeoPostSlug(post.slug)?.disciplineSlug === disciplineSlug)
    .slice(0, limit)
    .map((post) => buildCardPostData(locale, post))
}

export const getFallbackRelatedPosts = (locale: SiteLocale, slug: string): CardPostData[] => {
  return getRelatedCatalogEntries(slug).map((post) => buildCardPostData(locale, post))
}

export const getFallbackPostBySlug = (locale: SiteLocale, slug: string): Post | null => {
  const entry = getCatalogEntryBySlug(slug)

  if (!entry) return null

  const category = buildCategoryReference(locale, entry.categorySlug)
  const heroImage = buildMediaReference(entry)
  const relatedPosts = getFallbackRelatedPosts(locale, slug).map((post) => {
    return {
      categories: post.categories,
      heroImage: post.heroImage,
      meta: post.meta,
      slug: post.slug,
      title: post.title,
    } as Post
  })

  return {
    _status: 'published',
    authors: [],
    categories: [category],
    content: locale === 'en' ? entry.contentEn : entry.contentZh,
    createdAt: entry.publishedAt,
    heroImage,
    id: buildStableId(entry.slug),
    meta: {
      description: getLocalizedMetaDescription(locale, entry),
      image: heroImage,
      title: getLocalizedMetaTitle(locale, entry),
    },
    populatedAuthors: [],
    publishedAt: entry.publishedAt,
    relatedPosts,
    slug: entry.slug,
    title: getLocalizedTitle(locale, entry),
    updatedAt: entry.publishedAt,
  } as Post
}

export const getFallbackPostSitemapEntries = (siteURL: string): SitemapEntry[] => {
  const normalizedSiteURL = siteURL.replace(/\/$/, '')

  return getFallbackCatalog().map((post) => ({
    lastmod: post.publishedAt,
    loc: `${normalizedSiteURL}/posts/${post.slug}`,
  }))
}
