import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { ArticleJsonLd } from '@/components/ArticleJsonLd'
import type { CardPostData } from '@/components/Card'
import { JsonLd } from '@/components/JsonLd'
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
import {
  getCachedFallbackRelatedPosts,
  getCachedPostBySlug,
} from '@/utilities/getCachedPostQueries'
import {
  getAudienceCategory,
  getAudienceCategoryHrefBySlug,
  getPostStage,
  parseSeoPostSlug,
} from '@/utilities/postTaxonomy'
import {
  buildBreadcrumbSchema,
  buildWebPageSchema,
  getSchemaBreadcrumbId,
  getSchemaPostImageUrl,
} from '@/utilities/schema'
import { getSiteLocale } from '@/utilities/siteLocale'
import {
  getCanonicalSubjectDisciplineSlug,
  getSubjectDiscipline,
  getSubjectPath,
} from '@/utilities/subjectNavigation'
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
    (
      category,
    ): category is NonNullable<Post['categories']>[number] & { title?: string; slug?: string } =>
      typeof category === 'object' && category !== null,
  )
  const primaryCategoryHref =
    primaryCategory && typeof primaryCategory === 'object'
      ? getAudienceCategoryHrefBySlug(primaryCategory.slug)
      : null
  const seoPost = parseSeoPostSlug(post.slug)
  const seoCategory = seoPost ? getAudienceCategory(seoPost.categorySlug) : null
  const normalizedDisciplineSlug = seoPost
    ? getCanonicalSubjectDisciplineSlug(seoPost.disciplineSlug) ?? seoPost.disciplineSlug
    : null
  const subjectDiscipline = normalizedDisciplineSlug
    ? getSubjectDiscipline(normalizedDisciplineSlug)
    : null
  const stageLabel = seoPost ? getPostStage(seoPost.stageSlug)?.labels[locale] || null : null
  const pagePath = `/posts/${post.slug}`
  const pageTitle = post.meta?.title || post.title
  const breadcrumbItems = [
    { name: locale === 'en' ? 'Home' : '首页', path: '/' },
    { name: locale === 'en' ? 'Articles' : '文章中心', path: '/posts' },
    ...(primaryCategory && primaryCategory.title && primaryCategoryHref
      ? [{ name: primaryCategory.title, path: primaryCategoryHref }]
      : []),
    { name: pageTitle, path: pagePath },
  ]

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <JsonLd
        data={[
          buildBreadcrumbSchema({
            items: breadcrumbItems,
            path: pagePath,
          }),
          buildWebPageSchema({
            breadcrumbId: getSchemaBreadcrumbId(pagePath),
            dateModified: post.updatedAt,
            datePublished: post.publishedAt || post.createdAt,
            description: post.meta?.description,
            imageUrl: getSchemaPostImageUrl(post),
            locale,
            path: pagePath,
            title: pageTitle,
          }),
        ]}
      />
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
          <section className="mx-auto mt-12 max-w-[48rem] rounded-[2rem] border border-slate-200/80 bg-[linear-gradient(180deg,#fff7ed_0%,#ffffff_100%)] p-6 shadow-sm md:p-7">
            <p className="text-xs uppercase tracking-[0.28em] text-[#c2410c]">
              {locale === 'en' ? 'Thesis Coaching' : '论文辅导'}
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
              {locale === 'en'
                ? 'Turn this article into a focused revision route'
                : '把这篇文章真正变成可执行的论文修改路径'}
            </h2>
            <p className="mt-4 text-sm leading-7 text-slate-600">
              {locale === 'en'
                ? 'If this article matches the problem you are facing, continue with the thesis coaching page, the matching topic hub, and the relevant subject guide so the next revision round does not start from scratch.'
                : '如果这篇文章正好对应你现在的卡点，可以继续串着看论文辅导服务页、对应专题页和相关学科导航，把下一轮修改真正落成动作，而不是看完又回到原地。'}
            </p>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Link
                className="rounded-[1.5rem] border border-[#fdba74] bg-white px-5 py-4 transition hover:border-[#fb923c] hover:bg-[#fffaf5]"
                href="/lunwen-fudao"
              >
                <p className="text-[11px] uppercase tracking-[0.24em] text-[#c2410c]">
                  {locale === 'en' ? 'Service Page' : '服务页'}
                </p>
                <p className="mt-2 text-base font-semibold text-slate-950">
                  {locale === 'en' ? 'Open thesis coaching and guidance' : '查看论文辅导与论文指导'}
                </p>
              </Link>

              <Link
                className="rounded-[1.5rem] border border-slate-200 bg-white px-5 py-4 transition hover:border-[#fdba74] hover:bg-[#fffaf5]"
                href={
                  seoCategory ? getAudienceCategoryHrefBySlug(seoCategory.categorySlug) || '/posts' : '/posts'
                }
              >
                <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                  {locale === 'en' ? 'Topic Hub' : '专题页'}
                </p>
                <p className="mt-2 text-base font-semibold text-slate-950">
                  {seoCategory
                    ? locale === 'en'
                      ? `Back to ${seoCategory.labels.en}`
                      : `回到${seoCategory.labels.zh}文章库`
                    : locale === 'en'
                      ? 'Browse article center'
                      : '浏览文章中心'}
                </p>
              </Link>

              <Link
                className="rounded-[1.5rem] border border-slate-200 bg-white px-5 py-4 transition hover:border-[#fdba74] hover:bg-[#fffaf5]"
                href={subjectDiscipline ? getSubjectPath(subjectDiscipline.slug) : '/posts#subject-navigation'}
              >
                <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                  {locale === 'en' ? 'Subject Guide' : '学科导航'}
                </p>
                <p className="mt-2 text-base font-semibold text-slate-950">
                  {subjectDiscipline
                    ? locale === 'en'
                      ? `${subjectDiscipline.title.en} writing hub`
                      : `${subjectDiscipline.title.zh}论文写作导航`
                    : locale === 'en'
                      ? 'Open subject navigation'
                      : '打开学科导航'}
                </p>
              </Link>
            </div>

            {stageLabel && (
              <p className="mt-5 text-xs uppercase tracking-[0.22em] text-slate-500">
                {locale === 'en'
                  ? `Current writing stage: ${stageLabel}`
                  : `当前写作阶段：${stageLabel}`}
              </p>
            )}
          </section>
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

    const disciplineSlug =
      getCanonicalSubjectDisciplineSlug(seoPost.disciplineSlug) ?? seoPost.disciplineSlug

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
                contains: `${seoPost.degreeSlug}-${disciplineSlug}-`,
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

const toCardPostData = (
  post: Pick<Post, 'categories' | 'heroImage' | 'meta' | 'slug' | 'title'>,
) => {
  return {
    categories: post.categories,
    heroImage: post.heroImage,
    meta: post.meta,
    slug: post.slug,
    title: post.title,
  } satisfies CardPostData
}
