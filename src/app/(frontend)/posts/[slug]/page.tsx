import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { ArticleJsonLd } from '@/components/ArticleJsonLd'
import type { CardPostData } from '@/components/Card'
import { PayloadRedirects, handleRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import Link from 'next/link'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Post } from '@/payload-types'

import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import { getCachedFallbackRelatedPosts, getCachedPostBySlug } from '@/utilities/getCachedPostQueries'
import { getAudienceCategoryHrefBySlug, parseSeoPostSlug } from '@/utilities/postTaxonomy'
import { getSiteLocale } from '@/utilities/siteLocale'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export const revalidate = 3600
export const dynamic = 'force-dynamic'

export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config: configPromise })
    const posts = await payload.find({
      collection: 'posts',
      draft: false,
      limit: 1000,
      overrideAccess: false,
      pagination: false,
      select: {
        slug: true,
      },
    })

    return posts.docs
      .map(({ slug }) => slug)
      .filter((slug): slug is string => typeof slug === 'string' && slug.length > 0)
      .map((slug) => ({ slug }))
  } catch (error) {
    console.warn('[posts/[slug]] Skipping static params generation during build.', error)
    return []
  }
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const locale = await getSiteLocale()
  const { slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const url = '/posts/' + decodedSlug
  const post = await queryPostBySlug({ locale, slug: decodedSlug })

  if (!post) {
    await handleRedirects({ url })
    notFound()
  }

  const relatedDocsFromPost =
    post.relatedPosts?.filter((candidate): candidate is Post => typeof candidate === 'object') || []
  const relatedDocs: CardPostData[] =
    relatedDocsFromPost.length > 0
      ? relatedDocsFromPost.map((candidate) => toCardPostData(candidate))
      : await queryFallbackRelatedPosts({ locale, slug: decodedSlug })
  const primaryCategory = post.categories?.find(
    (category): category is NonNullable<Post['categories']>[number] & { title?: string; slug?: string } =>
      typeof category === 'object' && category !== null,
  )
  const primaryCategoryHref =
    primaryCategory && typeof primaryCategory === 'object'
      ? getAudienceCategoryHrefBySlug(primaryCategory.slug)
      : null

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <ArticleJsonLd locale={locale} post={post} />

      <PostHero locale={locale} post={post} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <nav className="mx-auto mb-6 flex max-w-[48rem] flex-wrap items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-500">
            <Link className="transition hover:text-[#c2410c]" href="/">
              {locale === 'en' ? 'Home' : '首页'}
            </Link>
            <span>/</span>
            <Link className="transition hover:text-[#c2410c]" href="/posts">
              {locale === 'en' ? 'Articles' : '文章中心'}
            </Link>
            {primaryCategory && primaryCategory.title && (
              <>
                <span>/</span>
                {primaryCategoryHref ? (
                  <Link className="transition hover:text-[#c2410c]" href={primaryCategoryHref}>
                    {primaryCategory.title}
                  </Link>
                ) : (
                  <span>{primaryCategory.title}</span>
                )}
              </>
            )}
          </nav>
          <RichText className="max-w-[48rem] mx-auto" data={post.content} enableGutter={false} />
          {relatedDocs.length > 0 && (
            <RelatedPosts
              className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
              docs={relatedDocs}
            />
          )}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const locale = await getSiteLocale()
  const { slug = '' } = await paramsPromise
  // Decode to support slugs with special characters
  const decodedSlug = decodeURIComponent(slug)
  const post = await queryPostBySlug({ locale, slug: decodedSlug })

  return generateMeta({
    doc: post,
    openGraphType: 'article',
    pathname: decodedSlug ? `/posts/${decodedSlug}` : '/posts',
  })
}

const queryPostBySlug = cache(async ({ locale, slug }: { locale: 'zh' | 'en'; slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  if (!draft) {
    return getCachedPostBySlug(locale, slug).catch(() => null)
  }

  const payload = await getPayload({ config: configPromise })
  const result = await payload.find({
    collection: 'posts',
    depth: 1,
    draft: true,
    limit: 1,
    locale,
    overrideAccess: true,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return (result.docs?.[0] as Post | undefined) || null
})

const queryFallbackRelatedPosts = cache(
  async ({ locale, slug }: { locale: 'zh' | 'en'; slug: string }): Promise<CardPostData[]> => {
    const { isEnabled: draft } = await draftMode()

    if (!draft) {
      return getCachedFallbackRelatedPosts(locale, slug).catch(() => [])
    }

    const seoPost = parseSeoPostSlug(slug)

    if (!seoPost) return []

    const payload = await getPayload({ config: configPromise })

    const sameDiscipline = await payload
      .find({
        collection: 'posts',
        depth: 1,
        draft: true,
        limit: 3,
        locale,
        overrideAccess: true,
        pagination: false,
        sort: '-publishedAt',
        select: {
          heroImage: true,
          title: true,
          slug: true,
          categories: true,
          meta: true,
        },
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
      .catch(() => ({ docs: [] as CardPostData[] }))

    if (sameDiscipline.docs.length >= 3) {
      return sameDiscipline.docs as CardPostData[]
    }

    const sameDegree = await payload
      .find({
        collection: 'posts',
        depth: 1,
        draft: true,
        limit: 12,
        locale,
        overrideAccess: true,
        pagination: false,
        sort: '-publishedAt',
        select: {
          heroImage: true,
          title: true,
          slug: true,
          categories: true,
          meta: true,
        },
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
      .catch(() => ({ docs: [] as CardPostData[] }))

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
)

const toCardPostData = (post: Pick<Post, 'categories' | 'heroImage' | 'meta' | 'slug' | 'title'>) => {
  return {
    categories: post.categories,
    heroImage: post.heroImage,
    meta: post.meta,
    slug: post.slug,
    title: post.title,
  } satisfies CardPostData
}
