import type { Metadata } from 'next'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React from 'react'

import { HomePageView } from '@/components/home/HomePageView'
import { getHomepageFallback } from '@/utilities/homepageFallback'
import { getSiteLocale } from '@/utilities/siteLocale'
import deepMerge from '@/utilities/deepMerge'

export default async function HomePage() {
  const locale = await getSiteLocale()
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const [homepageResult, posts] = await Promise.all([
    payload
      .findGlobal({
        draft,
        locale,
        slug: 'homepage',
      })
      .catch(() => null),
    payload
      .find({
        collection: 'posts',
        depth: 1,
        limit: 3,
        locale,
        overrideAccess: draft,
        select: {
          categories: true,
          meta: true,
          slug: true,
          title: true,
        },
      })
      .catch(() => ({
        docs: [],
      })),
  ])

  const content = deepMerge(getHomepageFallback(locale), homepageResult || {})

  return <HomePageView articles={posts.docs} content={content} locale={locale} />
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getSiteLocale()

  return {
    description:
      locale === 'en'
        ? 'A bilingual thesis coaching website with a real CMS backend for articles, pages, and consultation leads.'
        : '一个带真实 CMS 后台的中英文论文辅导网站，支持文章、页面和咨询线索管理。',
    title: locale === 'en' ? 'PaperBridge Thesis Coaching' : 'PaperBridge 论文辅导',
  }
}
