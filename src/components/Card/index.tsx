'use client'
import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import { getAudienceCategoryHrefBySlug } from '@/utilities/postTaxonomy'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title'> & {
  heroImage?: Post['heroImage']
}

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { className, doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, heroImage, meta, title } = doc || {}
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`
  const firstCategory = categories?.find((category) => typeof category === 'object' && category !== null)
  const categoryLabel = firstCategory && typeof firstCategory === 'object' ? firstCategory.title : null
  const metaImageResource =
    metaImage && typeof metaImage === 'object' && 'url' in metaImage ? metaImage : null
  const heroImageResource =
    heroImage && typeof heroImage === 'object' && 'url' in heroImage ? heroImage : null
  const imageResource =
    metaImageResource || heroImageResource
  const titleInitial = titleToUse?.trim().charAt(0) || 'P'

  return (
    <article
      className={cn(
        'group h-full overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:cursor-pointer hover:shadow-[0_24px_60px_rgba(15,23,42,0.12)]',
        className,
      )}
      ref={card.ref}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-slate-200/70 bg-slate-100">
        {imageResource ? (
          <Media
            fill
            className="absolute inset-0"
            imgClassName="object-cover transition duration-700 group-hover:scale-[1.04]"
            pictureClassName="block h-full w-full"
            resource={imageResource}
            size="(max-width: 1024px) 100vw, 33vw"
          />
        ) : (
          <div className="relative flex h-full flex-col justify-between bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.34),transparent_38%),radial-gradient(circle_at_80%_20%,rgba(15,23,42,0.12),transparent_28%),linear-gradient(180deg,#fff7ed_0%,#ffffff_100%)] p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full border border-white/80 bg-white/75 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-slate-600 shadow-sm">
                {categoryLabel || 'PaperBridge'}
              </span>
              <span className="size-10 rounded-full border border-white/70 bg-white/35 shadow-[0_12px_30px_rgba(249,115,22,0.18)]" />
            </div>
            <div className="flex items-end justify-between gap-4">
              <span className="text-5xl font-semibold leading-none tracking-[-0.08em] text-slate-900/80">
                {titleInitial}
              </span>
              <div className="h-20 w-20 rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.42),rgba(255,255,255,0))]" />
            </div>
          </div>
        )}
      </div>
      <div className="p-5">
        {showCategories && hasCategories && (
          <div className="mb-4 text-xs uppercase tracking-[0.28em] text-slate-500">
            {showCategories && hasCategories && (
              <div>
                {categories?.map((category, index) => {
                  if (typeof category === 'object') {
                    const { title: titleFromCategory } = category

                    const categoryTitle = titleFromCategory || 'Untitled category'
                    const categoryHref = getAudienceCategoryHrefBySlug(category.slug)

                    const isLast = index === categories.length - 1

                    return (
                      <Fragment key={index}>
                        {categoryHref ? (
                          <Link className="transition hover:text-[#c2410c]" href={categoryHref}>
                            {categoryTitle}
                          </Link>
                        ) : (
                          categoryTitle
                        )}
                        {!isLast && <Fragment>, &nbsp;</Fragment>}
                      </Fragment>
                    )
                  }

                  return null
                })}
              </div>
            )}
          </div>
        )}
        {titleToUse && (
          <div className="prose">
            <h3 className="m-0 text-xl font-semibold tracking-[-0.03em] text-slate-950">
              <Link className="not-prose transition hover:text-[#c2410c]" href={href} ref={link.ref}>
                {titleToUse}
              </Link>
            </h3>
          </div>
        )}
        {description && (
          <div className="mt-3">
            {description && <p className="text-sm leading-7 text-slate-600">{sanitizedDescription}</p>}
          </div>
        )}
      </div>
    </article>
  )
}
