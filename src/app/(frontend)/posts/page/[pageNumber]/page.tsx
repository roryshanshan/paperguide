import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { PostAudiencePills } from '@/components/PostAudiencePills'
import { PostTopicHubGrid } from '@/components/PostTopicHubGrid'
import { getCachedArchivePosts } from '@/utilities/getCachedPostQueries'
import React from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'
import { getSiteLocale } from '@/utilities/siteLocale'

export const revalidate = 600
const POSTS_PER_PAGE = 12

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const locale = await getSiteLocale()
  const { pageNumber } = await paramsPromise

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const posts = await getCachedArchivePosts(locale, sanitizedPageNumber, POSTS_PER_PAGE)
    .catch(() => ({
      docs: [],
      page: sanitizedPageNumber,
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
            ? 'Browse long-form writing guidance, thesis workflow articles, and problem-based academic support content.'
            : '浏览长文写作指南、论文流程文章和按真实卡点组织的辅导内容。'}
        </p>
        <PostAudiencePills locale={locale} />
      </div>

      <div className="container mb-16">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.32em] text-[#c2410c]">
            {locale === 'en' ? 'Topic Hubs' : '专题频道'}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {locale === 'en'
              ? 'Jump straight into the writing bottleneck you need to solve'
              : '直接进入你现在最需要解决的写作卡点'}
          </h2>
        </div>
        <PostTopicHubGrid locale={locale} />
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
        {posts?.page && posts?.totalPages > 1 && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const locale = await getSiteLocale()
  const { pageNumber } = await paramsPromise
  return {
    title:
      locale === 'en'
        ? `Articles Page ${pageNumber || ''} | PaperBridge`
        : `文章列表第 ${pageNumber || ''} 页 | PaperBridge`,
  }
}

export async function generateStaticParams() {
  try {
    const { getPayload } = await import('payload')
    const { default: config } = await import('@payload-config')
    const payload = await getPayload({ config })
    const { totalDocs } = await payload.count({
      collection: 'posts',
      overrideAccess: false,
    })
    const totalPages = Math.ceil(totalDocs / POSTS_PER_PAGE)
    const pages: { pageNumber: string }[] = []

    for (let i = 1; i <= totalPages; i++) {
      pages.push({ pageNumber: String(i) })
    }

    return pages
  } catch (error) {
    console.warn('[posts/page/[pageNumber]] Skipping static params generation during build.', error)
    return []
  }
}
