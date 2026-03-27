import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { JsonLd } from '@/components/JsonLd'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { PostAudiencePills } from '@/components/PostAudiencePills'
import { PostSubjectHubGrid } from '@/components/PostSubjectHubGrid'
import { PostTopicHubGrid } from '@/components/PostTopicHubGrid'
import { ServicePageGrid } from '@/components/ServicePageGrid'
import { getCachedArchivePosts } from '@/utilities/getCachedPostQueries'
import Link from 'next/link'
import React from 'react'
import PageClient from './page.client'
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildPostItemListSchema,
  getSchemaBreadcrumbId,
  getSchemaItemListId,
} from '@/utilities/schema'
import { getSiteLocale } from '@/utilities/siteLocale'

export const revalidate = 600
const POSTS_PER_PAGE = 12

export default async function Page() {
  const locale = await getSiteLocale()
  const posts = await getCachedArchivePosts(locale, 1, POSTS_PER_PAGE).catch(() => ({
    docs: [],
    page: 1,
    totalDocs: 0,
    totalPages: 1,
  }))
  const pagePath = '/posts'
  const pageTitle =
    locale === 'en' ? 'Thesis coaching and guidance article center' : '论文辅导与论文指导文章中心'
  const pageDescription =
    locale === 'en'
      ? 'Browse thesis coaching articles, thesis guidance hubs, graduation thesis support pages, and long-form writing resources organized by subject, stage, and bottleneck.'
      : '聚合论文辅导文章、论文指导专题、毕业论文辅导服务页与按学科拆分的长文内容，方便围绕选题、综述、结构、方法、返修和答辩逐层进入。'
  const breadcrumbId = getSchemaBreadcrumbId(pagePath)
  const itemListId = posts.docs.length > 0 ? getSchemaItemListId(pagePath) : undefined

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <JsonLd
        data={[
          buildBreadcrumbSchema({
            items: [
              { name: locale === 'en' ? 'Home' : '首页', path: '/' },
              { name: locale === 'en' ? 'Articles' : '文章中心', path: pagePath },
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
          posts.docs.length > 0
            ? buildPostItemListSchema({
                locale,
                path: pagePath,
                posts: posts.docs,
              })
            : null,
        ]}
      />
      <div className="container mb-16">
        <p className="text-xs uppercase tracking-[0.32em] text-[#c2410c]">
          {locale === 'en' ? 'Article Library' : '文章中心'}
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950">
          {pageTitle}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">{pageDescription}</p>
        <Link
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-800 underline decoration-[#f97316]/45 underline-offset-4 transition hover:text-[#c2410c]"
          href="/lunwen-fudao"
        >
          {locale === 'en'
            ? 'Need one-to-one thesis coaching? Open the service page'
            : '需要一对一论文辅导？查看服务页'}
        </Link>
        <Link
          className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-slate-800 underline decoration-[#1d4ed8]/35 underline-offset-4 transition hover:text-[#1d4ed8]"
          href="/biyelunwen-fudao"
        >
          {locale === 'en'
            ? 'Looking for graduation thesis support? Start here'
            : '想找毕业论文辅导？先看这个入口'}
        </Link>
        <PostAudiencePills locale={locale} />
      </div>

      <div className="container mb-16">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.32em] text-[#1d4ed8]">
            {locale === 'en' ? 'Service Pages' : '服务页面'}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {locale === 'en'
              ? 'Need a stronger page for thesis coaching intent? Start here'
              : '如果你更像在找论文辅导服务页，可以先从这里进入'}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
            {locale === 'en'
              ? 'These pages are built for high-intent queries such as graduation thesis support, undergraduate thesis coaching, proposal guidance, revision, and defense preparation.'
              : '这些页面专门承接毕业论文辅导、本科论文辅导、硕士论文指导、开题报告指导、论文修改和答辩准备等高意图搜索。'}
          </p>
        </div>
        <ServicePageGrid locale={locale} />
      </div>

      <div className="container mb-16" id="subject-navigation">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.32em] text-[#1d4ed8]">
            {locale === 'en' ? 'Subject Navigation' : '学科导航'}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {locale === 'en' ? 'Enter the article library by discipline' : '先按专业方向进入文章库'}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
            {locale === 'en'
              ? 'These subject pages group the degree-based guides for management, education, law, computer science, nursing, design studies, and more.'
              : '这些学科页会先把管理学、教育学、法学、计算机、护理学、设计学等方向更相关的本硕博内容聚在一起，适合先认门再选文章。'}
          </p>
        </div>
        <PostSubjectHubGrid locale={locale} />
      </div>

      <div className="container mb-16">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.32em] text-[#c2410c]">
            {locale === 'en' ? 'Topic Hubs' : '专题频道'}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {locale === 'en'
              ? 'Choose a writing problem instead of browsing blindly'
              : '先选写作问题，再进对应文章库'}
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
            {locale === 'en'
              ? 'These channels group long-form guides by real writing bottlenecks such as topic selection, literature review, methods, and submission workflow.'
              : '这些频道按真实卡点组织长文内容，比如选题、综述、结构、方法和投稿返修，而不是只按学历分。'}
          </p>
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
    description:
      locale === 'en'
        ? 'Browse thesis coaching articles, graduation thesis support pages, and discipline-based thesis guidance resources.'
        : '浏览论文辅导文章、论文指导专题、毕业论文辅导服务页，以及面向本科、硕士、博士阶段的学术支持内容。',
    title:
      locale === 'en'
        ? 'Thesis Coaching Article Center | PaperBridge'
        : '论文辅导文章中心 | 论文指导与毕业论文辅导 | PaperBridge',
  }
}
