import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { className } = props

  return (
    <div className={clsx('flex items-center gap-3 text-slate-950', className)}>
      <div className="relative flex size-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#f97316_0%,#ea580c_100%)] shadow-[0_12px_30px_rgba(249,115,22,0.35)]">
        <div className="absolute inset-1 rounded-[0.95rem] border border-white/20" />
        <span className="relative text-lg font-semibold tracking-[-0.06em]">文</span>
      </div>
      <div className="leading-none">
        <div className="text-base font-semibold tracking-[-0.04em] text-current">PaperBridge</div>
        <div className="mt-1 text-xs uppercase tracking-[0.32em] text-current opacity-60">
          Thesis Coaching
        </div>
      </div>
    </div>
  )
}
