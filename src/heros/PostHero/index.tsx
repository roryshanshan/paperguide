import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Post } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'
import { cn } from '@/utilities/ui'

export const PostHero: React.FC<{
  post: Post
}> = ({ post }) => {
  const { categories, heroImage, meta, populatedAuthors, publishedAt, title } = post

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''
  const heroImageResource =
    heroImage && typeof heroImage === 'object' && 'url' in heroImage ? heroImage : null
  const metaImageResource =
    meta?.image && typeof meta.image === 'object' && 'url' in meta.image ? meta.image : null
  const heroMedia =
    heroImageResource || metaImageResource
  const hasHeroMedia = Boolean(heroMedia)
  const labelClassName = hasHeroMedia ? 'text-white/70' : 'text-slate-500'
  const valueClassName = hasHeroMedia ? 'text-white' : 'text-slate-700'
  const categoriesClassName = hasHeroMedia ? 'text-white/80' : 'text-slate-500'

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        hasHeroMedia
          ? '-mt-[10.4rem] flex min-h-[80vh] items-end'
          : 'border-b border-slate-200/80 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.22),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(15,23,42,0.08),transparent_28%),linear-gradient(180deg,#fff7ed_0%,#ffffff_78%)] pt-28 pb-12',
      )}
    >
      {!hasHeroMedia && (
        <>
          <div className="absolute right-[-4rem] top-[-3rem] h-40 w-40 rounded-full bg-[#fdba74]/35 blur-3xl" />
          <div className="absolute left-[12%] bottom-[-4rem] h-32 w-32 rounded-full bg-slate-200/60 blur-3xl" />
        </>
      )}

      <div
        className={cn(
          'container z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr]',
          hasHeroMedia ? 'pb-8 text-white' : 'text-slate-950',
        )}
      >
        <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
          <div className={cn('mb-6 text-sm uppercase', categoriesClassName)}>
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category

                const titleToUse = categoryTitle || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <React.Fragment key={index}>
                    {titleToUse}
                    {!isLast && <React.Fragment>, &nbsp;</React.Fragment>}
                  </React.Fragment>
                )
              }
              return null
            })}
          </div>

          <div className="">
            <h1
              className={cn(
                'mb-6 text-3xl md:text-5xl lg:text-6xl',
                !hasHeroMedia && 'max-w-4xl tracking-[-0.04em]',
              )}
            >
              {title}
            </h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-16">
            {hasAuthors && (
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <p className={cn('text-sm', labelClassName)}>Author</p>

                  <p className={valueClassName}>{formatAuthors(populatedAuthors)}</p>
                </div>
              </div>
            )}
            {publishedAt && (
              <div className="flex flex-col gap-1">
                <p className={cn('text-sm', labelClassName)}>Date Published</p>

                <time className={valueClassName} dateTime={publishedAt}>
                  {formatDateTime(publishedAt)}
                </time>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={cn('select-none', hasHeroMedia ? 'min-h-[80vh]' : 'hidden')}>
        {heroMedia && (
          <Media fill priority imgClassName="-z-10 object-cover" resource={heroMedia} />
        )}
        {hasHeroMedia && (
          <div className="absolute pointer-events-none left-0 bottom-0 h-1/2 w-full bg-linear-to-t from-black to-transparent" />
        )}
      </div>
    </div>
  )
}
