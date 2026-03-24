import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { PostAudiencePills } from '@/components/PostAudiencePills'
import { PostSubjectHubGrid } from '@/components/PostSubjectHubGrid'
import { PostTopicHubGrid } from '@/components/PostTopicHubGrid'
import { getCachedArchivePosts } from '@/utilities/getCachedPostQueries'
import React from 'react'
import PageClient from './page.client'
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
            ? 'Browse thesis guides, topic-based writing hubs, revision notes, and long-form academic support articles.'
            : '浏览论文方法、专题写作频道、返修建议与长文辅导内容。'}
        </p>
        <PostAudiencePills locale={locale} />
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
    title: locale === 'en' ? 'Articles | PaperBridge' : '文章中心 | PaperBridge',
  }
}
