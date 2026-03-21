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
          heroImage: true,
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
        ? 'One-to-one thesis coaching and academic support for proposal, writing, revision, and defense preparation.'
        : '提供开题、写作、返修与答辩准备的一对一论文辅导与学术支持服务。',
    title: locale === 'en' ? 'PaperBridge | Thesis Coaching & Academic Support' : 'PaperBridge | 论文辅导与学术支持',
  }
}
