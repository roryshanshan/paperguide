import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getCachedHomepagePosts } from '@/utilities/getCachedPostQueries'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React from 'react'

import { JsonLd } from '@/components/JsonLd'
import { HomePageView, type HomepageStarterPath } from '@/components/home/HomePageView'
import { getHomepageFallback } from '@/utilities/homepageFallback'
import { getAudienceCategory, getPostStage, parseSeoPostSlug } from '@/utilities/postTaxonomy'
import {
  buildPostItemListSchema,
  buildWebPageSchema,
  getSchemaDefaultImageUrl,
  getSchemaItemListId,
} from '@/utilities/schema'
import { getSiteLocale } from '@/utilities/siteLocale'
import deepMerge from '@/utilities/deepMerge'

export const revalidate = 900
const HOMEPAGE_POST_SCAN_LIMIT = 60

const homepageStarterRouteSpecs = [
  {
    categorySlug: 'research-topic-planning',
    descriptions: {
      en: 'Use this when the topic still feels broad and you need one article that helps it become answerable.',
      zh: '适合题目还偏大、偏虚的时候，先用一篇文章把问题真正压成可回答的状态。',
    },
    routeLabels: {
      en: 'Route 01',
      zh: '路线 01',
    },
  },
  {
    categorySlug: 'literature-reading-review',
    descriptions: {
      en: 'Start here when the literature already exists but the review still refuses to become a real comparison.',
      zh: '当文献已经有了，但综述还是搭不起来时，就先从这条路线进入。',
    },
    routeLabels: {
      en: 'Route 02',
      zh: '路线 02',
    },
  },
  {
    categorySlug: 'methods-data-presentation',
    descriptions: {
      en: 'Read this first when your question, evidence, and method still do not align into one analysis line.',
      zh: '如果问题、证据和方法总对不齐，这条路线最适合作为第一篇起步文章。',
    },
    routeLabels: {
      en: 'Route 03',
      zh: '路线 03',
    },
  },
  {
    categorySlug: 'submission-defense-workflow',
    descriptions: {
      en: 'Open this route when revision, reviewer response, or final submission pressure is starting to build.',
      zh: '当返修、审稿回应或最终提交开始让你有压力时，就从这条路线进入。',
    },
    routeLabels: {
      en: 'Route 04',
      zh: '路线 04',
    },
  },
] as const

export default async function HomePage() {
  const locale = await getSiteLocale()
  const { isEnabled: draft } = await draftMode()
  const payload = draft ? await getPayload({ config: configPromise }) : null
  const homepageResultPromise =
    draft && payload
      ? payload
          .findGlobal({
            draft,
            locale,
            slug: 'homepage',
          })
          .catch(() => null)
      : getCachedGlobal('homepage', 0, locale)().catch(() => null)
  const postsPromise =
    draft && payload
      ? payload
          .find({
            collection: 'posts',
            depth: 1,
            limit: HOMEPAGE_POST_SCAN_LIMIT,
            locale,
            sort: '-publishedAt',
            overrideAccess: true,
            select: {
              categories: true,
              heroImage: true,
              meta: true,
              slug: true,
              title: true,
            },
          })
          .then((result) => result.docs)
          .catch(() => [])
      : getCachedHomepagePosts(locale, HOMEPAGE_POST_SCAN_LIMIT).catch(() => [])

  const [homepageResult, posts] = await Promise.all([homepageResultPromise, postsPromise])

  const content = deepMerge(getHomepageFallback(locale), homepageResult || {})
  const latestArticles = posts.slice(0, 3)
  const pageTitle =
    locale === 'en'
      ? 'PaperBridge | Thesis Coaching & Academic Support'
      : 'PaperBridge | 论文辅导与学术支持'
  const pageDescription =
    locale === 'en'
      ? 'One-to-one thesis coaching and academic support for proposal, writing, revision, and defense preparation.'
      : '提供开题、写作、返修与答辩准备的一对一论文辅导与学术支持服务。'
  const itemListId = latestArticles.length > 0 ? getSchemaItemListId('/') : undefined
  const stagePriority = ['proposal', 'literature-review', 'methods-analysis', 'revision-defense']
  const starterPaths = homepageStarterRouteSpecs
    .map((spec) => {
      const category = getAudienceCategory(spec.categorySlug)

      if (!category) return null as HomepageStarterPath | null

      const matchingPosts = posts.filter((post) => {
        return parseSeoPostSlug(post.slug)?.categorySlug === spec.categorySlug
      })

      const recommendedPost =
        stagePriority
          .map((stageSlug) => {
            return matchingPosts.filter((post) => parseSeoPostSlug(post.slug)?.stageSlug === stageSlug).at(-1)
          })
          .find(Boolean) || matchingPosts.at(0)

      if (!recommendedPost?.slug || !recommendedPost.title) return null as HomepageStarterPath | null

      const parsed = parseSeoPostSlug(recommendedPost.slug)
      const stageLabel = parsed ? getPostStage(parsed.stageSlug)?.labels[locale] || '' : ''

      const starterPath: HomepageStarterPath = {
        articleTitle: recommendedPost.title,
        categoryLabel: String(category.labels[locale]),
        description: spec.descriptions[locale],
        href: `/posts/${recommendedPost.slug}`,
        routeLabel: spec.routeLabels[locale],
        stageLabel,
      }

      return starterPath
    })
    .filter((value): value is HomepageStarterPath => Boolean(value))

  return (
    <>
      <JsonLd
        data={[
          buildWebPageSchema({
            description: pageDescription,
            imageUrl: getSchemaDefaultImageUrl(),
            locale,
            mainEntityId: itemListId,
            path: '/',
            title: pageTitle,
          }),
          latestArticles.length > 0
            ? buildPostItemListSchema({
                locale,
                path: '/',
                posts: latestArticles,
              })
            : null,
        ]}
      />
      <HomePageView
        articles={latestArticles}
        content={content}
        locale={locale}
        starterPaths={starterPaths}
      />
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getSiteLocale()

  return {
    description:
      locale === 'en'
        ? 'Thesis coaching and thesis guidance for undergraduate, master, and PhD students, covering proposal, writing, revision, and defense preparation.'
        : '提供本科、硕士、博士阶段的一对一论文辅导与论文指导服务，覆盖开题、写作、返修与答辩准备。',
    title:
      locale === 'en'
        ? 'Thesis Coaching and Guidance Service | PaperBridge'
        : '论文辅导与论文指导服务 | PaperBridge',
  }
}
