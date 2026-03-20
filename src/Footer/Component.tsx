import { getCachedGlobal } from '@/utilities/getGlobals'
import { getDefaultFooterLinks } from '@/utilities/homepageFallback'
import { getSiteLocale } from '@/utilities/siteLocale'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'

export async function Footer() {
  const locale = await getSiteLocale()
  const footerData: Footer = await getCachedGlobal('footer', 1, locale)()

  const navItems =
    footerData?.navItems && footerData.navItems.length > 0
      ? footerData.navItems
      : getDefaultFooterLinks(locale).map((item) => ({
          link: {
            label: item.label,
            type: 'custom' as const,
            url: item.url,
          },
        }))

  const description =
    locale === 'en'
      ? 'A bilingual thesis coaching website with article publishing, editable pages, and a real admin backend.'
      : '一个可发布文章、可编辑页面、带真实后台的中英文论文辅导网站。'

  return (
    <footer className="mt-auto border-t border-slate-200 bg-[#fffaf5]">
      <div className="container flex flex-col gap-8 py-10 md:flex-row md:justify-between">
        <Link className="flex items-center" href="/">
          <Logo />
        </Link>

        <div className="max-w-xl">
          <p className="text-sm leading-7 text-slate-600">{description}</p>
          <nav className="mt-4 flex flex-wrap gap-4">
            {navItems.map(({ link }, i) => {
              return (
                <CMSLink className="text-sm font-medium text-slate-800" key={i} {...link} />
              )
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}
