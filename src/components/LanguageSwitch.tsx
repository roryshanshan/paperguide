'use client'

import { Globe } from 'lucide-react'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'

import { cn } from '@/utilities/ui'
import type { SiteLocale } from '@/utilities/siteLocale'

export const LanguageSwitch: React.FC<{
  locale: SiteLocale
}> = ({ locale }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const buildHref = (targetLocale: SiteLocale) => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('locale')

    const redirect = `${pathname}${params.toString() ? `?${params.toString()}` : ''}`

    return `/set-locale?locale=${targetLocale}&redirect=${encodeURIComponent(redirect)}`
  }

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 p-1 text-xs">
      <Globe className="ml-1 size-3.5 opacity-70" />
      {(['zh', 'en'] as const).map((item) => (
        <a
          className={cn(
            'rounded-full px-3 py-1.5 transition-colors',
            locale === item
              ? 'bg-white text-slate-950'
              : 'text-white/78 hover:bg-white/10 hover:text-white',
          )}
          href={buildHref(item)}
          key={item}
        >
          {item === 'zh' ? '中文' : 'EN'}
        </a>
      ))}
    </div>
  )
}
