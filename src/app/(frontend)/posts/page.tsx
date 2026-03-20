import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { getSiteLocale } from '@/utilities/siteLocale'

export const revalidate = 600

export default async function Page() {
  const locale = await getSiteLocale()
  const payload = await getPayload({ config: configPromise })

  const posts = await payload
    .find({
      collection: 'posts',
      depth: 1,
      limit: 12,
      locale,
      overrideAccess: false,
      select: {
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
          {locale === 'en' ? 'Knowledge Base' : '学术内容'}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950">
          {locale === 'en' ? 'Articles and guidance' : '文章与论文辅导指南'}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
          {locale === 'en'
            ? 'Use the Payload admin panel to publish bilingual articles, thesis guides, and service pages.'
            : '你可以在 Payload 后台持续发布论文指南、案例拆解和服务页面内容。'}
        </p>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={posts.page}
          limit={12}
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
