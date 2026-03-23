import Link from 'next/link'
import React from 'react'

import type { SiteLocale } from '@/utilities/siteLocale'
import { getAudienceCategoryPath, topicHubCategories } from '@/utilities/postTaxonomy'

export const PostTopicHubGrid: React.FC<{
  locale: SiteLocale
}> = ({ locale }) => {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
      {topicHubCategories.map((category, index) => (
        <Link
          className="group rounded-[1.75rem] border border-slate-200/80 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#fdba74] hover:shadow-[0_20px_50px_rgba(15,23,42,0.1)]"
          href={getAudienceCategoryPath(category.categorySlug)}
          key={category.categorySlug}
        >
          <div className="flex items-start justify-between gap-4">
            <span className="inline-flex rounded-full border border-[#fed7aa] bg-[#fff7ed] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c2410c]">
              {locale === 'en' ? `Topic 0${index + 1}` : `专题 0${index + 1}`}
            </span>
            <span className="text-sm font-medium text-slate-300 transition group-hover:text-[#fb923c]">
              {locale === 'en' ? 'Explore' : '查看'}
            </span>
          </div>

          <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-slate-950">
            {category.labels[locale]}
          </h3>
          <p className="mt-3 text-sm leading-7 text-slate-600">{category.hubDescriptions[locale]}</p>
        </Link>
      ))}
    </div>
  )
}
