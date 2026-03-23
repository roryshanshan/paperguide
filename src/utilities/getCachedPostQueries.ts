import configPromise from '@payload-config'
import type { CardPostData } from '@/components/Card'
import type { Post } from '@/payload-types'
import {
  getFallbackArchivePosts as getBundledArchivePosts,
  getFallbackCategoryPosts as getBundledCategoryPosts,
  getFallbackHomepagePosts as getBundledHomepagePosts,
  getFallbackPostBySlug as getBundledPostBySlug,
  getFallbackPostSitemapEntries as getBundledPostSitemapEntries,
  getFallbackRelatedPosts as getBundledRelatedPosts,
} from '@/utilities/fallbackSeoPosts'
import { parseSeoPostSlug } from '@/utilities/postTaxonomy'
import type { SiteLocale } from '@/utilities/siteLocale'
import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'

const ARCHIVE_REVALIDATE_SECONDS = 900
const DETAIL_REVALIDATE_SECONDS = 3600

const archiveSelect = {
  categories: true,
  heroImage: true,
  meta: true,
  slug: true,
  title: true,
} as const

const categoryArchiveSelect = {
  ...archiveSelect,
  publishedAt: true,
} as const

const detailSelect = {
  authors: true,
  categories: true,
  content: true,
  createdAt: true,
  heroImage: true,
  meta: true,
  publishedAt: true,
  relatedPosts: true,
  slug: true,
  title: true,
  updatedAt: true,
} as const

export type CategoryPostData = CardPostData & {
  publishedAt?: string | null
}

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

const shouldUseFallbackCatalog = (error: unknown): boolean => {
  const message = error instanceof Error ? error.message : String(error)

  return /cannot connect to postgres|data transfer quota|connection terminated|connection ended unexpectedly|fetch failed|timeout|timed out|econn/i.test(
    message,
  )
}

const withFallbackCatalog = async <T>(
  scope: string,
  runQuery: () => Promise<T>,
  getFallbackResult: () => T,
): Promise<T> => {
  try {
    return await runQuery()
  } catch (error) {
    if (!shouldUseFallbackCatalog(error)) {
      throw error
    }

    console.warn(`[posts] Falling back to bundled SEO catalog for ${scope}.`, error)
    return getFallbackResult()
  }
}

const getHomepagePosts = async (locale: SiteLocale, limit: number): Promise<CardPostData[]> => {
  return withFallbackCatalog(
    `homepage posts (${locale})`,
    async () => {
      const payload = await getPayload({ config: configPromise })
      const posts = await payload.find({
        collection: 'posts',
        depth: 1,
        draft: false,
        limit,
        locale,
        overrideAccess: false,
        sort: '-publishedAt',
        select: archiveSelect,
      })

      return posts.docs as CardPostData[]
    },
    () => getBundledHomepagePosts(locale, limit),
  )
}

const getArchivePosts = async (
  locale: SiteLocale,
  page: number,
  limit: number,
): Promise<ArchivePostsResult> => {
  return withFallbackCatalog(
    `archive posts (${locale}, page ${page})`,
    async () => {
      const payload = await getPayload({ config: configPromise })
      const posts = await payload.find({
        collection: 'posts',
        depth: 1,
        draft: false,
        limit,
        locale,
        overrideAccess: false,
        page,
        sort: '-publishedAt',
        select: archiveSelect,
      })

      return {
        docs: posts.docs as CardPostData[],
        page: posts.page || page,
        totalDocs: posts.totalDocs || 0,
        totalPages: posts.totalPages || 1,
      }
    },
    () => getBundledArchivePosts(locale, page, limit),
  )
}

const getCategoryPosts = async (
  locale: SiteLocale,
  categorySlug: string,
  limit: number,
): Promise<CategoryPostData[]> => {
  return withFallbackCatalog(
    `category posts (${locale}, ${categorySlug})`,
    async () => {
      const payload = await getPayload({ config: configPromise })
      const posts = await payload.find({
        collection: 'posts',
        depth: 1,
        draft: false,
        limit,
        locale,
        overrideAccess: false,
        pagination: false,
        sort: '-publishedAt',
        select: categoryArchiveSelect,
        where: {
          'categories.slug': {
            equals: categorySlug,
          },
        },
      })

      return posts.docs as CategoryPostData[]
    },
    () => getBundledCategoryPosts(locale, categorySlug, limit) as CategoryPostData[],
  )
}

const getPostBySlug = async (locale: SiteLocale, slug: string): Promise<Post | null> => {
  return withFallbackCatalog(
    `post detail (${locale}, ${slug})`,
    async () => {
      const payload = await getPayload({ config: configPromise })
      const result = await payload.find({
        collection: 'posts',
        depth: 1,
        draft: false,
        limit: 1,
        locale,
        overrideAccess: false,
        pagination: false,
        select: detailSelect,
        where: {
          slug: {
            equals: slug,
          },
        },
      })

      return (result.docs?.[0] as Post | undefined) || null
    },
    () => getBundledPostBySlug(locale, slug),
  )
}

const getFallbackRelatedPosts = async (locale: SiteLocale, slug: string): Promise<CardPostData[]> => {
  return withFallbackCatalog(
    `related posts (${locale}, ${slug})`,
    async () => {
      const seoPost = parseSeoPostSlug(slug)

      if (!seoPost) return []

      const payload = await getPayload({ config: configPromise })
      const sameDiscipline = await payload.find({
        collection: 'posts',
        depth: 1,
        draft: false,
        limit: 3,
        locale,
        overrideAccess: false,
        pagination: false,
        sort: '-publishedAt',
        select: archiveSelect,
        where: {
          and: [
            {
              slug: {
                not_equals: slug,
              },
            },
            {
              slug: {
                contains: `${seoPost.degreeSlug}-${seoPost.disciplineSlug}-`,
              },
            },
          ],
        },
      })

      if (sameDiscipline.docs.length >= 3) {
        return sameDiscipline.docs as CardPostData[]
      }

      const sameDegree = await payload.find({
        collection: 'posts',
        depth: 1,
        draft: false,
        limit: 12,
        locale,
        overrideAccess: false,
        pagination: false,
        sort: '-publishedAt',
        select: archiveSelect,
        where: {
          and: [
            {
              slug: {
                not_equals: slug,
              },
            },
            {
              slug: {
                contains: `${seoPost.degreeSlug}-`,
              },
            },
          ],
        },
      })

      const merged = new Map<string, CardPostData>()

      for (const candidate of sameDiscipline.docs as CardPostData[]) {
        if (candidate.slug) {
          merged.set(candidate.slug, candidate)
        }
      }

      for (const candidate of sameDegree.docs as CardPostData[]) {
        if (!candidate.slug) continue

        const parsedCandidate = parseSeoPostSlug(candidate.slug)

        if (parsedCandidate?.stageSlug !== seoPost.stageSlug) continue
        if (candidate.slug === slug) continue
        if (merged.has(candidate.slug)) continue

        merged.set(candidate.slug, candidate)
      }

      return Array.from(merged.values()).slice(0, 3)
    },
    () => getBundledRelatedPosts(locale, slug),
  )
}

const getPostSitemapEntries = async (siteURL: string): Promise<SitemapEntry[]> => {
  return withFallbackCatalog(
    `post sitemap (${siteURL})`,
    async () => {
      const payload = await getPayload({ config: configPromise })
      const results = await payload.find({
        collection: 'posts',
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

      const dateFallback = new Date().toISOString()

      return results.docs
        ? results.docs
            .filter((post) => Boolean(post?.slug))
            .map((post) => ({
              loc: `${siteURL}/posts/${post?.slug}`,
              lastmod: post.updatedAt || dateFallback,
            }))
        : []
    },
    () => getBundledPostSitemapEntries(siteURL),
  )
}

export const getCachedHomepagePosts = (locale: SiteLocale, limit: number) =>
  unstable_cache(async () => getHomepagePosts(locale, limit), ['homepage-posts', locale, String(limit)], {
    revalidate: ARCHIVE_REVALIDATE_SECONDS,
    tags: ['posts-archive'],
  })()

export const getCachedArchivePosts = (locale: SiteLocale, page: number, limit: number) =>
  unstable_cache(async () => getArchivePosts(locale, page, limit), ['archive-posts', locale, String(page), String(limit)], {
    revalidate: ARCHIVE_REVALIDATE_SECONDS,
    tags: ['posts-archive'],
  })()

export const getCachedCategoryPosts = (locale: SiteLocale, categorySlug: string, limit: number) =>
  unstable_cache(async () => getCategoryPosts(locale, categorySlug, limit), ['category-posts', locale, categorySlug, String(limit)], {
    revalidate: ARCHIVE_REVALIDATE_SECONDS,
    tags: ['posts-archive'],
  })()

export const getCachedPostBySlug = (locale: SiteLocale, slug: string) =>
  unstable_cache(async () => getPostBySlug(locale, slug), ['post-by-slug', locale, slug], {
    revalidate: DETAIL_REVALIDATE_SECONDS,
    tags: ['posts-archive', `post-${slug}`],
  })()

export const getCachedFallbackRelatedPosts = (locale: SiteLocale, slug: string) =>
  unstable_cache(async () => getFallbackRelatedPosts(locale, slug), ['related-posts', locale, slug], {
    revalidate: DETAIL_REVALIDATE_SECONDS,
    tags: ['posts-archive', `post-${slug}`],
  })()

export const getCachedPostSitemapEntries = (siteURL: string) =>
  unstable_cache(async () => getPostSitemapEntries(siteURL), ['posts-sitemap', siteURL], {
    revalidate: DETAIL_REVALIDATE_SECONDS,
    tags: ['posts-sitemap'],
  })()
