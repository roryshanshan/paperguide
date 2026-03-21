import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
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
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const posts = await payload
    .find({
      collection: 'posts',
      depth: 1,
      limit: POSTS_PER_PAGE,
      locale,
      page: sanitizedPageNumber,
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
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload
    .count({
      collection: 'posts',
      overrideAccess: false,
    })
    .catch(() => ({ totalDocs: 0 }))

  const totalPages = Math.ceil(totalDocs / POSTS_PER_PAGE)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
