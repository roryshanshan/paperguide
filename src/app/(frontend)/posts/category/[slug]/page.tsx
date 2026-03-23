import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PostAudiencePills } from '@/components/PostAudiencePills'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import React from 'react'

import type { CardPostData } from '@/components/Card'

import { generateMeta } from '@/utilities/generateMeta'
import {
  audienceCategories,
  categoryHubEnhancements,
  getAudienceCategory,
  getAudienceCategoryPath,
  getPostStage,
  parseSeoPostSlug,
  postStages,
} from '@/utilities/postTaxonomy'
import { getSiteLocale } from '@/utilities/siteLocale'

type Args = {
  params: Promise<{
    slug: string
  }>
}

export const revalidate = 600

const CATEGORY_PAGE_SIZE = 400

type CategoryPostData = CardPostData & {
  publishedAt?: string | null
}

export default async function CategoryPage({ params: paramsPromise }: Args) {
  const locale = await getSiteLocale()
  const { slug } = await paramsPromise
  const category = getAudienceCategory(slug)

  if (!category) notFound()

  const payload = await getPayload({ config: configPromise })
  const posts = await payload
    .find({
      collection: 'posts',
      depth: 1,
      limit: CATEGORY_PAGE_SIZE,
      locale,
      overrideAccess: false,
      pagination: false,
      sort: '-publishedAt',
      select: {
        heroImage: true,
        title: true,
        slug: true,
        categories: true,
        meta: true,
        publishedAt: true,
      },
    })
    .catch(() => ({ docs: [] as CategoryPostData[] }))

  const matchingPosts = posts.docs.filter((post) => {
    return parseSeoPostSlug(post.slug)?.categorySlug === category.categorySlug
  })
  const hubEnhancement = categoryHubEnhancements[category.categorySlug]
  const latestPosts = matchingPosts.slice(0, 3)

  const stageSections = postStages
    .map((stage) => ({
      posts: matchingPosts.filter((post) => parseSeoPostSlug(post.slug)?.stageSlug === stage.slug),
      stage,
    }))
    .filter((section) => section.posts.length > 0)

  return (
    <div className="pt-24 pb-24">
      <div className="container">
        <nav className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-500">
          <Link className="transition hover:text-[#c2410c]" href="/">
            {locale === 'en' ? 'Home' : '首页'}
          </Link>
          <span>/</span>
          <Link className="transition hover:text-[#c2410c]" href="/posts">
            {locale === 'en' ? 'Articles' : '文章中心'}
          </Link>
          <span>/</span>
          <span className="text-slate-800">{category.labels[locale]}</span>
        </nav>

        <p className="mt-8 text-xs uppercase tracking-[0.32em] text-[#c2410c]">
          {category.kind === 'topic'
            ? locale === 'en'
              ? 'Topic Hub'
              : '专题分类'
            : locale === 'en'
              ? 'Degree Hub'
              : '学位分类'}
        </p>
        <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-slate-950 md:text-5xl">
          {category.hubTitles[locale]}
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">
          {category.hubDescriptions[locale]}
        </p>
        <PostAudiencePills activeCategorySlug={category.categorySlug} locale={locale} />
      </div>

      {category.kind === 'topic' && hubEnhancement && (
        <div className="container mt-12 grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_420px]">
          <section className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm md:p-7">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[#c2410c]">
                  {locale === 'en' ? 'Hot Questions' : '热门问题'}
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
                  {locale === 'en'
                    ? 'Start from the problem you are actually stuck on'
                    : '先从你现在真正卡住的问题开始读'}
                </h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-slate-500">
                {locale === 'en'
                  ? 'These questions reflect the most repeated writing bottlenecks inside this channel.'
                  : '这些问题对应的是这个专题里最常反复出现的写作卡点。'}
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {hubEnhancement.featuredQuestions[locale].map((question) => (
                <div
                  className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/70 p-5"
                  key={question}
                >
                  <p className="text-sm leading-7 text-slate-700">{question}</p>
                </div>
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-[2rem] border border-slate-200/80 bg-slate-950 p-6 text-white shadow-[0_22px_60px_rgba(15,23,42,0.16)]">
              <p className="text-xs uppercase tracking-[0.28em] text-white/55">
                {locale === 'en' ? 'Start Here' : '开始浏览'}
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
                {locale === 'en'
                  ? 'A reading order that usually wastes less time'
                  : '一条通常更省时间的阅读顺序'}
              </h2>
              <div className="mt-6 space-y-4">
                {hubEnhancement.startTips[locale].map((tip, index) => (
                  <div className="flex items-start gap-4" key={tip}>
                    <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
                      {index + 1}
                    </span>
                    <p className="text-sm leading-7 text-white/78">{tip}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                    {locale === 'en' ? 'Latest Updates' : '最新更新'}
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                    {locale === 'en'
                      ? 'Most recently seeded reads in this channel'
                      : '这个专题最近生成的几篇文章'}
                  </h2>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {latestPosts.map((post) => {
                  const parsed = parseSeoPostSlug(post.slug)
                  const stageLabel = parsed ? getPostStage(parsed.stageSlug)?.labels[locale] : null

                  return (
                    <Link
                      className="block rounded-[1.35rem] border border-slate-200/80 bg-slate-50/70 p-4 transition hover:border-[#fdba74] hover:bg-[#fff7ed]"
                      href={`/posts/${post.slug}`}
                      key={post.slug}
                    >
                      {stageLabel && (
                        <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                          {stageLabel}
                        </p>
                      )}
                      <p className="mt-2 text-sm font-medium leading-7 text-slate-800">{post.title}</p>
                    </Link>
                  )
                })}
              </div>
            </section>
          </aside>
        </div>
      )}

      <div className="container mt-12 grid gap-6 md:grid-cols-4">
        {postStages.map((stage) => {
          const stageLabel = getPostStage(stage.slug)?.labels[locale] || stage.slug
          const count = stageSections.find((section) => section.stage.slug === stage.slug)?.posts.length || 0

          return (
            <div
              className="rounded-[1.5rem] border border-slate-200/80 bg-white p-5 shadow-sm"
              key={stage.slug}
            >
              <div className="text-xs uppercase tracking-[0.24em] text-slate-500">{stageLabel}</div>
              <div className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-slate-950">
                {count}
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {locale === 'en' ? 'Articles in this stage' : '该阶段文章数量'}
              </p>
            </div>
          )
        })}
      </div>

      <div className="mt-14 space-y-14">
        {stageSections.map((section) => (
          <section key={section.stage.slug}>
            <div className="container mb-8">
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                    {locale === 'en' ? category.labels.en : category.labels.zh}
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
                    {section.stage.labels[locale]}
                  </h2>
                </div>
                <p className="text-sm text-slate-500">
                  {locale === 'en'
                    ? `${section.posts.length} articles in this topic stage`
                    : `该阶段共 ${section.posts.length} 篇文章`}
                </p>
              </div>
            </div>
            <CollectionArchive posts={section.posts} />
          </section>
        ))}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const locale = await getSiteLocale()
  const { slug } = await paramsPromise
  const category = getAudienceCategory(slug)

  if (!category) {
    return {}
  }

  return generateMeta({
    doc: {
      meta: {
        description: category.hubDescriptions[locale],
        title: category.hubTitles[locale],
      },
    },
    pathname: getAudienceCategoryPath(category.categorySlug),
  })
}

export function generateStaticParams() {
  return audienceCategories.map((category) => ({
    slug: category.categorySlug,
  }))
}
