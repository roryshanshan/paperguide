'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex max-w-[48vw] items-center gap-1 overflow-x-auto">
      {navItems.map(({ link }, i) => {
        return (
          <CMSLink
            className="whitespace-nowrap rounded-full px-4 py-2 text-sm text-white/76 transition hover:bg-white/8 hover:text-white"
            key={i}
            {...link}
            appearance="inline"
          />
        )
      })}
    </nav>
  )
}
