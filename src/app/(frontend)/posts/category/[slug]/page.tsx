import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PostAudiencePills } from '@/components/PostAudiencePills'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import React from 'react'

import type { CardPostData } from '@/components/Card'

import { generateMeta } from '@/utilities/generateMeta'
import {
  audienceCategories,
  getAudienceCategory,
  getAudienceCategoryPath,
  getPostStage,
  parseSeoPostSlug,
  postStages,
} from '@/utilities/postTaxonomy'
import { getSiteLocale } from '@/utilities/siteLocale'

type Args = {
  params: Promise<{
    slug: string
  }>
}

export const revalidate = 600

const CATEGORY_PAGE_SIZE = 400

export default async function CategoryPage({ params: paramsPromise }: Args) {
  const locale = await getSiteLocale()
  const { slug } = await paramsPromise
  const category = getAudienceCategory(slug)

  if (!category) notFound()

  const payload = await getPayload({ config: configPromise })
  const posts = await payload
    .find({
      collection: 'posts',
      depth: 1,
      limit: CATEGORY_PAGE_SIZE,
      locale,
      overrideAccess: false,
      pagination: false,
      sort: '-publishedAt',
      select: {
        heroImage: true,
        title: true,
        slug: true,
        categories: true,
        meta: true,
      },
    })
    .catch(() => ({ docs: [] as CardPostData[] }))

  const matchingPosts = posts.docs.filter((post) => {
    return parseSeoPostSlug(post.slug)?.categorySlug === category.categorySlug
  })

  const stageSections = postStages
    .map((stage) => ({
      posts: matchingPosts.filter((post) => parseSeoPostSlug(post.slug)?.stageSlug === stage.slug),
      stage,
    }))
    .filter((section) => section.posts.length > 0)

  return (
    <div className="pt-24 pb-24">
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
          {locale === 'en' ? 'Degree Hub' : '学位分类'}
        </p>
        <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-slate-950 md:text-5xl">
          {category.hubTitles[locale]}
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">
          {category.hubDescriptions[locale]}
        </p>
        <PostAudiencePills activeCategorySlug={category.categorySlug} locale={locale} />
      </div>

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
        {stageSections.map((section) => (
          <section key={section.stage.slug}>
            <div className="container mb-8">
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
            </div>
            <CollectionArchive posts={section.posts} />
          </section>
        ))}
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
