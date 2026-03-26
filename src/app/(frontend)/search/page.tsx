import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { JsonLd } from '@/components/JsonLd'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { Search } from '@/search/Component'
import PageClient from './page.client'
import { CardPostData } from '@/components/Card'
import { buildBreadcrumbSchema, buildWebPageSchema, getSchemaBreadcrumbId } from '@/utilities/schema'
import { getSiteLocale } from '@/utilities/siteLocale'

type Args = {
  searchParams: Promise<{
    q: string
  }>
}
export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query } = await searchParamsPromise
  const locale = await getSiteLocale()
  const payload = await getPayload({ config: configPromise })

  const posts = await payload
    .find({
      collection: 'search',
      depth: 1,
      limit: 12,
      locale,
      select: {
        title: true,
        slug: true,
        categories: true,
        meta: true,
      },
      // pagination: false reduces overhead if you don't need totalDocs
      pagination: false,
      ...(query
        ? {
            where: {
              or: [
                {
                  title: {
                    like: query,
                  },
                },
                {
                  'meta.description': {
                    like: query,
                  },
                },
                {
                  'meta.title': {
                    like: query,
                  },
                },
                {
                  slug: {
                    like: query,
                  },
                },
              ],
            },
          }
        : {}),
    })
    .catch(() => ({
      docs: [],
      totalDocs: 0,
    }))
  const pagePath = '/search'
  const normalizedQuery = query?.trim()
  const pageTitle =
    normalizedQuery && normalizedQuery.length > 0
      ? locale === 'en'
        ? `Search results for "${normalizedQuery}"`
        : `“${normalizedQuery}” 的搜索结果`
      : locale === 'en'
        ? 'Search'
        : '搜索'
  const pageDescription =
    locale === 'en'
      ? 'Search thesis guides, writing support articles, and topic-based academic content.'
      : '搜索论文辅导文章、写作指南和专题内容。'

  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema({
            items: [
              { name: locale === 'en' ? 'Home' : '首页', path: '/' },
              { name: locale === 'en' ? 'Search' : '搜索', path: pagePath },
            ],
            path: pagePath,
          }),
          buildWebPageSchema({
            breadcrumbId: getSchemaBreadcrumbId(pagePath),
            description: pageDescription,
            locale,
            path: pagePath,
            title: pageTitle,
            type: 'SearchResultsPage',
          }),
        ]}
      />
      <div className="pt-24 pb-24">
        <PageClient />
        <div className="container mb-16">
          <div className="prose dark:prose-invert max-w-none text-center">
            <h1 className="mb-8 lg:mb-16">{locale === 'en' ? 'Search' : '搜索'}</h1>

            <div className="max-w-[50rem] mx-auto">
              <Search />
            </div>
          </div>
        </div>

        {posts.totalDocs > 0 ? (
          <CollectionArchive posts={posts.docs as CardPostData[]} />
        ) : (
          <div className="container">{locale === 'en' ? 'No results found.' : '没有搜索结果。'}</div>
        )}
      </div>
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getSiteLocale()
  return {
    robots: {
      follow: false,
      index: false,
    },
    title: locale === 'en' ? 'Search | PaperBridge' : '搜索 | PaperBridge',
  }
}
