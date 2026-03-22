import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { PostAudiencePills } from '@/components/PostAudiencePills'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { getSiteLocale } from '@/utilities/siteLocale'

export const revalidate = 600
const POSTS_PER_PAGE = 12

export default async function Page() {
  const locale = await getSiteLocale()
  const payload = await getPayload({ config: configPromise })

  const posts = await payload
    .find({
      collection: 'posts',
      depth: 1,
      limit: POSTS_PER_PAGE,
      locale,
      sort: '-publishedAt',
      overrideAccess: false,
      select: {
        heroImage: true,
        title: true,
        slug: true,
        categories: true,
        meta: true,
      },
    })
    .catch(() => ({
      docs: [],
      page: 1,
      totalDocs: 0,
      totalPages: 1,
    }))

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <p className="text-xs uppercase tracking-[0.32em] text-[#c2410c]">
          {locale === 'en' ? 'Article Library' : '文章中心'}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950">
          {locale === 'en' ? 'Articles and guidance' : '文章与论文辅导指南'}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
          {locale === 'en'
            ? 'Browse thesis guides, writing strategies, revision notes, and case-based academic support articles.'
            : '浏览论文方法、写作策略、返修建议与案例拆解等学术辅导内容。'}
        </p>
        <PostAudiencePills locale={locale} />
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={POSTS_PER_PAGE}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={posts.docs} />

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getSiteLocale()

  return {
    title: locale === 'en' ? 'Articles | PaperBridge' : '文章中心 | PaperBridge',
  }
}
