'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import type { Header } from '@/payload-types'

import { LanguageSwitch } from '@/components/LanguageSwitch'
import { Logo } from '@/components/Logo/Logo'
import { cn } from '@/utilities/ui'
import { HeaderNav } from './Nav'
import type { SiteLocale } from '@/utilities/siteLocale'

interface HeaderClientProps {
  data: Header
  locale: SiteLocale
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data, locale }) => {
  /* Storing the value in a useState to avoid hydration errors */
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState<string | null>(null)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    setMobileMenuOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  useEffect(() => {
    const { body } = document
    const previousOverflow = body.style.overflow

    if (mobileMenuOpen) {
      body.style.overflow = 'hidden'
    }

    return () => {
      body.style.overflow = previousOverflow
    }
  }, [mobileMenuOpen])

  const mobileCtaLabel = locale === 'en' ? 'Start consultation' : '立即咨询'

  return (
    <header
      className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/88 backdrop-blur"
      {...(theme ? { 'data-theme': theme } : {})}
    >
      <div className="container flex items-center justify-between gap-3 py-4 md:gap-6 md:py-5">
        <Link href="/">
          <Logo className="text-white" loading="eager" priority="high" />
        </Link>

        <div className="hidden items-center gap-4 md:flex">
          <HeaderNav className="max-w-[48vw]" data={data} />
          <LanguageSwitch locale={locale} />
        </div>

        <button
          aria-controls="mobile-nav-panel"
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          className="inline-flex size-11 items-center justify-center rounded-2xl border border-white/12 bg-white/8 text-white transition hover:bg-white/12 md:hidden"
          onClick={() => setMobileMenuOpen((value) => !value)}
          type="button"
        >
          {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        className={cn(
          'absolute inset-x-0 top-full border-b border-white/10 bg-slate-950/96 backdrop-blur transition md:hidden',
          mobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
        id="mobile-nav-panel"
      >
        <div className="container max-h-[calc(100dvh-5rem)] overflow-y-auto py-4">
          <div className="rounded-[1.75rem] border border-white/10 bg-white/6 p-3 shadow-[0_24px_60px_rgba(2,6,23,0.3)]">
            <HeaderNav
              className="flex-col items-stretch gap-2 overflow-visible"
              data={data}
              itemClassName="rounded-[1.1rem] border border-transparent bg-white/0 px-4 py-3 text-base font-medium text-white/88 hover:border-white/10 hover:bg-white/8"
              onItemClick={() => setMobileMenuOpen(false)}
            />
          </div>

          <div className="mt-3 rounded-[1.5rem] border border-white/10 bg-white/6 p-4">
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">
              {locale === 'en' ? 'Language' : '语言切换'}
            </p>
            <div className="mt-3">
              <LanguageSwitch locale={locale} />
            </div>
          </div>

          <Link
            className="mt-3 inline-flex h-12 w-full items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
            href="/#consultation"
            onClick={() => setMobileMenuOpen(false)}
          >
            {mobileCtaLabel}
          </Link>
        </div>
      </div>
    </header>
  )
}
