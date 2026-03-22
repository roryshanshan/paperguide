import React from 'react'
import Link from 'next/link'

import type { SiteLocale } from '@/utilities/siteLocale'
import {
  audienceCategories,
  type AudienceCategorySlug,
  getAudienceCategoryPath,
} from '@/utilities/postTaxonomy'

export const PostAudiencePills: React.FC<{
  activeCategorySlug?: AudienceCategorySlug
  locale: SiteLocale
}> = ({ activeCategorySlug, locale }) => {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {audienceCategories.map((item) => {
        const isActive = item.categorySlug === activeCategorySlug

        return (
          <Link
            aria-current={isActive ? 'page' : undefined}
            className={`inline-flex items-center rounded-full border px-4 py-2 text-xs font-medium tracking-[0.18em] uppercase transition ${
              isActive
                ? 'border-[#c2410c] bg-[#fff7ed] text-[#c2410c] shadow-[0_10px_24px_rgba(249,115,22,0.12)]'
                : 'border-slate-200 bg-white text-slate-600 hover:border-[#fdba74] hover:text-[#c2410c]'
            }`}
            href={getAudienceCategoryPath(item.categorySlug)}
            key={item.categorySlug}
          >
            {item.labels[locale]}
          </Link>
        )
      })}
    </div>
  )
}
