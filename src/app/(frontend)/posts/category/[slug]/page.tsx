import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CollectionArchive } from '@/components/CollectionArchive'
import { JsonLd } from '@/components/JsonLd'
import { PostAudiencePills } from '@/components/PostAudiencePills'
import { getCachedCategoryPosts } from '@/utilities/getCachedPostQueries'
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
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildPostItemListSchema,
  getSchemaBreadcrumbId,
  getSchemaItemListId,
} from '@/utilities/schema'
import { getSiteLocale } from '@/utilities/siteLocale'

type Args = {
  params: Promise<{
    slug: string
  }>
}

export const revalidate = 600

const CATEGORY_PAGE_SIZE = 400
const CATEGORY_SCHEMA_ITEM_LIMIT = 24
const RECOMMENDED_PATH_STEPS = 3

type CategoryPostData = CardPostData & {
  publishedAt?: string | null
}

export default async function CategoryPage({ params: paramsPromise }: Args) {
  const locale = await getSiteLocale()
  const { slug } = await paramsPromise
  const category = getAudienceCategory(slug)

  if (!category) notFound()

  const posts = await getCachedCategoryPosts(locale, category.categorySlug, CATEGORY_PAGE_SIZE)
    .catch(() => ({ docs: [] as CategoryPostData[] }))
  const matchingPosts = Array.isArray(posts) ? posts : []
  const hubEnhancement = categoryHubEnhancements[category.categorySlug]
  const latestPosts = matchingPosts.slice(0, 3)
  const schemaPosts = matchingPosts.slice(0, CATEGORY_SCHEMA_ITEM_LIMIT)
  const pagePath = getAudienceCategoryPath(category.categorySlug)
  const pageTitle = category.hubTitles[locale]
  const pageDescription = category.hubDescriptions[locale]
  const breadcrumbId = getSchemaBreadcrumbId(pagePath)
  const itemListId = schemaPosts.length > 0 ? getSchemaItemListId(pagePath) : undefined

  const stageSections = postStages
    .map((stage) => ({
      posts: matchingPosts.filter((post) => parseSeoPostSlug(post.slug)?.stageSlug === stage.slug),
      stage,
    }))
    .filter((section) => section.posts.length > 0)
  const recommendedPathPosts = stageSections
    .map((section) => ({
      post: section.posts.at(-1),
      stage: section.stage,
    }))
    .filter(
      (
        section,
      ): section is {
        post: CategoryPostData
        stage: (typeof postStages)[number]
      } => Boolean(section.post),
    )
    .slice(0, RECOMMENDED_PATH_STEPS)
  const featuredQuestionCards = hubEnhancement
    ? hubEnhancement.featuredQuestions[locale].map((question, index) => {
        const linkedStage = postStages[index]
        const linkedSection = linkedStage
          ? stageSections.find((section) => section.stage.slug === linkedStage.slug)
          : null
        const linkedPost = linkedSection?.posts.at(-1) || matchingPosts.at(index) || null

        return {
          href: linkedPost?.slug ? `/posts/${linkedPost.slug}` : null,
          question,
          stageLabel: linkedStage?.labels[locale] || null,
        }
      })
    : []
  const stagePathCopy: Record<
    string,
    {
      en: string
      zh: string
    }
  > = {
    proposal: {
      en: 'Use this first to lock the question, scope, and feasibility before the draft spreads.',
      zh: '先用这一步把问题、边界和可行性收紧，避免正文一开始就散开。',
    },
    'literature-review': {
      en: 'Read this next when the sources exist but the gap, comparison, or review frame still feels weak.',
      zh: '当文献已经有了，但缺口、比较和综述骨架还不清时，就接着读这一步。',
    },
    'methods-analysis': {
      en: 'Move here once you need the question, evidence, and analysis line to finally align.',
      zh: '当你需要把问题、证据和分析主线真正对齐时，再进入这一阶段。',
    },
    'revision-defense': {
      en: 'Keep this for the round when response logic, defense pressure, or final consistency starts to matter.',
      zh: '当返修逻辑、答辩压力和最终一致性开始变重要时，就进入这一阶段。',
    },
  }
  const stageStarterCopy: Record<
    string,
    {
      en: string
      zh: string
    }
  > = {
    proposal: {
      en: 'Start here if the topic is still broad, unstable, or hard to make feasible.',
      zh: '如果题目还偏大、偏虚，或者总觉得不可行，就先从这里开始。',
    },
    'literature-review': {
      en: 'Use this as the first read when the sources exist but the review still will not take shape.',
      zh: '当文献已经找到了，但综述还是搭不起来时，先从这篇开始。',
    },
    'methods-analysis': {
      en: 'Read this first if the question, evidence, and analysis line still refuse to align.',
      zh: '如果问题、证据和分析主线总对不齐，先读这篇会更省时间。',
    },
    'revision-defense': {
      en: 'Start here once the draft exists and you need a steadier revision or defense route.',
      zh: '如果正文已经成形，需要更稳地进入返修或答辩，就先读这里。',
    },
  }

  return (
    <div className="pt-24 pb-24">
      <JsonLd
        data={[
          buildBreadcrumbSchema({
            items: [
              { name: locale === 'en' ? 'Home' : '首页', path: '/' },
              { name: locale === 'en' ? 'Articles' : '文章中心', path: '/posts' },
              { name: category.labels[locale], path: pagePath },
            ],
            path: pagePath,
          }),
          buildCollectionPageSchema({
            breadcrumbId,
            description: pageDescription,
            locale,
            mainEntityId: itemListId,
            path: pagePath,
            title: pageTitle,
          }),
          schemaPosts.length > 0
            ? buildPostItemListSchema({
                locale,
                path: pagePath,
                posts: schemaPosts,
              })
            : null,
        ]}
      />
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
          {pageTitle}
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">
          {pageDescription}
        </p>
        <PostAudiencePills activeCategorySlug={category.categorySlug} locale={locale} />
      </div>

      <section className="container mt-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_360px]">
          <div className="rounded-[2rem] border border-slate-200/80 bg-[linear-gradient(180deg,#fff7ed_0%,#ffffff_100%)] p-6 shadow-sm md:p-7">
            <p className="text-xs uppercase tracking-[0.28em] text-[#c2410c]">
              {locale === 'en' ? 'Service Route' : '服务路径'}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
              {locale === 'en'
                ? `${category.labels.en} support works best when diagnosis comes first`
                : `${category.labels.zh}相关问题，先诊断再读文章通常更省时间`}
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
              {locale === 'en'
                ? 'This hub is useful when you already know the bottleneck lives inside this part of the thesis. If the problem still feels messy, move through the thesis coaching page first and then come back here with a clearer revision order.'
                : '如果你已经知道问题大致落在这个专题里，这个文章库会很有用；如果你还说不清究竟该先改选题、结构、方法还是返修顺序，先走论文辅导服务页再回来读，会更容易形成真正可执行的修改路线。'}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                className="inline-flex h-11 items-center justify-center rounded-full bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800"
                href="/lunwen-fudao"
              >
                {locale === 'en' ? 'Open thesis coaching page' : '查看论文辅导服务页'}
              </Link>
              <Link
                className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                href="/#consultation"
              >
                {locale === 'en' ? 'Request consultation' : '提交咨询需求'}
              </Link>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
              {locale === 'en' ? 'What This Solves' : '适合解决'}
            </p>
            <div className="mt-5 space-y-4">
              {[
                locale === 'en'
                  ? 'Unclear revision priority even after reading several articles.'
                  : '已经看了不少文章，但还是判断不出先改哪里。',
                locale === 'en'
                  ? 'Need to connect this topic hub with degree stage, discipline, and deadline.'
                  : '需要把这个专题和学历阶段、学科背景、截止时间一起统筹。',
                locale === 'en'
                  ? 'Want ethical thesis guidance only, not ghostwriting.'
                  : '只需要合规的论文指导，不需要代写。',
              ].map((point) => (
                <div className="flex items-start gap-3" key={point}>
                  <span className="mt-1 inline-flex size-2.5 shrink-0 rounded-full bg-[#f97316]" />
                  <p className="text-sm leading-7 text-slate-600">{point}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

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
              {featuredQuestionCards.map((item) => {
                const cardClassName =
                  'rounded-[1.5rem] border border-slate-200/80 bg-slate-50/70 p-5 transition hover:border-[#fdba74] hover:bg-[#fff7ed]'

                if (!item.href) {
                  return (
                    <div className={cardClassName} key={item.question}>
                      {item.stageLabel && (
                        <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                          {item.stageLabel}
                        </p>
                      )}
                      <p className="mt-2 text-sm leading-7 text-slate-700">{item.question}</p>
                    </div>
                  )
                }

                return (
                  <Link className={`block ${cardClassName}`} href={item.href} key={item.question}>
                    <div className="flex items-start justify-between gap-4">
                      {item.stageLabel ? (
                        <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                          {item.stageLabel}
                        </p>
                      ) : (
                        <span />
                      )}
                      <span className="text-xs font-medium text-[#c2410c]">
                        {locale === 'en' ? 'Open' : '查看'}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-7 text-slate-700">{item.question}</p>
                  </Link>
                )
              })}
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

            {recommendedPathPosts.length > 0 && (
              <section className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
                  {locale === 'en' ? 'Recommended Path' : '推荐阅读路径'}
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                  {locale === 'en'
                    ? 'Three reads that usually make this channel click faster'
                    : '通常最能帮你快速进入这个专题的三篇文章'}
                </h2>

                <div className="mt-6 space-y-4">
                  {recommendedPathPosts.map(({ post, stage }, index) => (
                    <Link
                      className="block rounded-[1.35rem] border border-slate-200/80 bg-slate-50/70 p-4 transition hover:border-[#fdba74] hover:bg-[#fff7ed]"
                      href={`/posts/${post.slug}`}
                      key={`${stage.slug}-${post.slug}`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="inline-flex rounded-full border border-[#fed7aa] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c2410c]">
                          {locale === 'en' ? `Step ${index + 1}` : `第 ${index + 1} 步`}
                        </span>
                        <span className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                          {stage.labels[locale]}
                        </span>
                      </div>
                      <p className="mt-3 text-sm font-medium leading-7 text-slate-900">{post.title}</p>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        {stagePathCopy[stage.slug]?.[locale] || ''}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

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
        {stageSections.map((section) => {
          const recommendedStarter = section.posts.at(-1)

          return (
          <section key={section.stage.slug}>
            <div className="container mb-8 space-y-6">
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

              {recommendedStarter && (
                <div className="rounded-[1.75rem] border border-slate-200/80 bg-[linear-gradient(180deg,#fffaf5_0%,#ffffff_100%)] p-5 shadow-sm md:p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="max-w-2xl">
                      <p className="text-xs uppercase tracking-[0.24em] text-[#c2410c]">
                        {locale === 'en' ? 'Recommended Starter' : '建议先读'}
                      </p>
                      <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-slate-950">
                        {recommendedStarter.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {stageStarterCopy[section.stage.slug]?.[locale] || ''}
                      </p>
                    </div>

                    <Link
                      className="inline-flex h-11 items-center justify-center rounded-full bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800"
                      href={`/posts/${recommendedStarter.slug}`}
                    >
                      {locale === 'en' ? 'Read this first' : '先读这篇'}
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <CollectionArchive posts={section.posts} />
          </section>
        )})}
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
