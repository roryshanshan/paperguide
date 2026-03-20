'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { LanguageSwitch } from '@/components/LanguageSwitch'
import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import type { SiteLocale } from '@/utilities/siteLocale'

interface HeaderClientProps {
  data: Header
  locale: SiteLocale
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, locale }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header
      className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/88 backdrop-blur"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container flex items-center justify-between gap-6 py-5">
        <Link href="/">
          <Logo className="text-white" loading="eager" priority="high" />
        </Link>
        <div className="flex items-center gap-4">
          <HeaderNav data={data} />
          <LanguageSwitch locale={locale} />
        </div>
      </div>
    </header>
  )
}
