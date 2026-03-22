'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { cn } from '@/utilities/ui'

export const HeaderNav: React.FC<{
  className?: string
  data: HeaderType
  itemClassName?: string
  onItemClick?: () => void
}> = ({ className, data, itemClassName, onItemClick }) => {
  const navItems = data?.navItems || []

  return (
    <nav className={cn('flex items-center gap-1 overflow-x-auto', className)}>
      {navItems.map(({ link }, i) => {
        return (
          <CMSLink
            className={cn(
              'whitespace-nowrap rounded-full px-4 py-2 text-sm text-white/76 transition hover:bg-white/8 hover:text-white',
              itemClassName,
            )}
            key={i}
            onClick={onItemClick}
            {...link}
            appearance="inline"
          />
        )
      })}
    </nav>
  )
}
