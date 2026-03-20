import { HeaderClient } from './Component.client'
import { getDefaultHeaderNavigation } from '@/utilities/homepageFallback'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getSiteLocale } from '@/utilities/siteLocale'
import React from 'react'

import type { Header } from '@/payload-types'

export async function Header() {
  const locale = await getSiteLocale()
  const headerData: Header = await getCachedGlobal('header', 1, locale)()

  const localizedNavItems =
    headerData?.navItems && headerData.navItems.length > 0
      ? headerData.navItems
      : getDefaultHeaderNavigation(locale).map((item) => ({
          link: {
            label: item.label,
            type: 'custom' as const,
            url: item.url,
          },
        }))

  return <HeaderClient data={{ ...headerData, navItems: localizedNavItems }} locale={locale} />
}
