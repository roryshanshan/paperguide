import Link from 'next/link'
import React from 'react'

import {
  featuredSubjectDisciplines,
  getSubjectGroup,
  getSubjectPath,
  subjectDisciplines,
  subjectGroups,
} from '@/utilities/subjectNavigation'
import type { SiteLocale } from '@/utilities/siteLocale'

export const PostSubjectHubGrid: React.FC<{
  locale: SiteLocale
  variant?: 'featured' | 'full'
}> = ({ locale, variant = 'full' }) => {
  const disciplines = variant === 'featured' ? featuredSubjectDisciplines : subjectDisciplines

  if (variant === 'featured') {
    return (
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {disciplines.map((discipline) => {
          const group = getSubjectGroup(discipline.groupSlug)

          return (
            <Link
              className="group rounded-[1.75rem] border border-slate-200/80 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#fdba74] hover:shadow-[0_20px_50px_rgba(15,23,42,0.1)]"
              href={getSubjectPath(discipline.slug)}
              key={discipline.slug}
            >
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex rounded-full border border-[#fed7aa] bg-[#fff7ed] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c2410c]">
                  {group?.label[locale] || (locale === 'en' ? 'Subject' : '学科')}
                </span>
                <span className="text-sm font-medium text-slate-300 transition group-hover:text-[#fb923c]">
                  {locale === 'en' ? 'Open' : '进入'}
                </span>
              </div>

              <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-slate-950">
                {discipline.title[locale]}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{discipline.focus[locale]}</p>
              <p className="mt-4 text-xs leading-6 text-slate-500">
                {locale === 'en' ? 'Common evidence:' : '常见材料：'}
                {discipline.evidence[locale]}
              </p>
            </Link>
          )
        })}
      </div>
    )
  }

  return (
    <div className="space-y-10">
      {subjectGroups.map((group) => {
        const groupedDisciplines = subjectDisciplines.filter(
          (discipline) => discipline.groupSlug === group.slug,
        )

        if (groupedDisciplines.length === 0) return null

        return (
          <section key={group.slug}>
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-[#c2410c]">
                  {group.label[locale]}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                  {locale === 'en'
                    ? `Browse ${groupedDisciplines.length} subject channels`
                    : `浏览这一组里的 ${groupedDisciplines.length} 个学科入口`}
                </h3>
              </div>
              <p className="max-w-3xl text-sm leading-7 text-slate-600">
                {group.description[locale]}
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {groupedDisciplines.map((discipline) => (
                <Link
                  className="group rounded-[1.75rem] border border-slate-200/80 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#fdba74] hover:shadow-[0_20px_50px_rgba(15,23,42,0.1)]"
                  href={getSubjectPath(discipline.slug)}
                  key={discipline.slug}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
                      {group.label[locale]}
                    </span>
                    <span className="text-sm font-medium text-slate-300 transition group-hover:text-[#fb923c]">
                      {locale === 'en' ? 'Open' : '查看'}
                    </span>
                  </div>

                  <h4 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-slate-950">
                    {discipline.title[locale]}
                  </h4>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {discipline.audience[locale]}
                  </p>
                  <div className="mt-5 rounded-[1.25rem] border border-slate-200/80 bg-slate-50/70 p-4">
                    <p className="text-[11px] uppercase tracking-[0.22em] text-slate-500">
                      {locale === 'en' ? 'Focus' : '核心场景'}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-700">
                      {discipline.focus[locale]}
                    </p>
                    <p className="mt-3 text-[11px] uppercase tracking-[0.22em] text-slate-500">
                      {locale === 'en' ? 'Evidence' : '常见材料'}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-700">
                      {discipline.evidence[locale]}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
