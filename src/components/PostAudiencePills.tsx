import React from 'react'

import type { SiteLocale } from '@/utilities/siteLocale'

const pillCopy = {
  en: ['Undergraduate Thesis', "Master's Thesis", 'PhD Thesis'],
  zh: ['本科论文', '研究生论文', '博士论文'],
} satisfies Record<SiteLocale, string[]>

export const PostAudiencePills: React.FC<{
  locale: SiteLocale
}> = ({ locale }) => {
  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {pillCopy[locale].map((item) => (
        <span
          className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium tracking-[0.18em] text-slate-600 uppercase"
          key={item}
        >
          {item}
        </span>
      ))}
    </div>
  )
}
