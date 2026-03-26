import type { Metadata } from 'next'

import Link from 'next/link'
import React from 'react'

import { ConsultationForm } from '@/components/ConsultationForm'
import { JsonLd } from '@/components/JsonLd'
import { ServicePageGrid } from '@/components/ServicePageGrid'
import { generateMeta } from '@/utilities/generateMeta'
import {
  getAudienceCategory,
  getAudienceCategoryPath,
} from '@/utilities/postTaxonomy'
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildServiceSchema,
  buildWebPageSchema,
  getSchemaBreadcrumbId,
  getSchemaDefaultImageUrl,
  getSchemaServiceId,
} from '@/utilities/schema'
import {
  getServiceLandingPage,
  type ServiceLandingPageSlug,
} from '@/utilities/serviceLandingPages'
import { getSiteLocale } from '@/utilities/siteLocale'
import {
  getSubjectDiscipline,
  getSubjectGroup,
  getSubjectPath,
} from '@/utilities/subjectNavigation'

export const renderServiceLandingPage = async (slug: ServiceLandingPageSlug) => {
  const locale = await getSiteLocale()
  const page = getServiceLandingPage(slug)
  const copy = page.copy[locale]
  const breadcrumbId = getSchemaBreadcrumbId(page.path)
  const serviceId = getSchemaServiceId(page.path)
  const relatedCategories = page.relatedCategorySlugs
    .map((categorySlug) => getAudienceCategory(categorySlug))
    .filter((category): category is NonNullable<ReturnType<typeof getAudienceCategory>> => Boolean(category))
  const relatedSubjects = page.relatedSubjectSlugs
    .map((subjectSlug) => getSubjectDiscipline(subjectSlug))
    .filter(
      (discipline): discipline is NonNullable<ReturnType<typeof getSubjectDiscipline>> =>
        Boolean(discipline),
    )

  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema({
            items: [
              { name: locale === 'en' ? 'Home' : '首页', path: '/' },
              { name: copy.breadcrumbLabel, path: page.path },
            ],
            path: page.path,
          }),
          buildWebPageSchema({
            breadcrumbId,
            description: copy.description,
            imageUrl: getSchemaDefaultImageUrl(),
            locale,
            mainEntityId: serviceId,
            path: page.path,
            title: copy.pageTitle,
          }),
          buildServiceSchema({
            audience: copy.audienceLabels,
            description: copy.description,
            locale,
            name: copy.pageTitle,
            path: page.path,
            serviceType: copy.serviceType,
          }),
          buildFaqSchema({
            items: copy.faqs,
            path: page.path,
          }),
        ]}
      />

      <article className="pb-24">
        <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.28),transparent_30%),radial-gradient(circle_at_82%_14%,rgba(15,23,42,0.18),transparent_28%),linear-gradient(180deg,#fff7ed_0%,#ffffff_62%,#fffaf5_100%)] pt-28 pb-20">
          <div className="container relative">
            <nav className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-500">
              <Link className="transition hover:text-[#c2410c]" href="/">
                {locale === 'en' ? 'Home' : '首页'}
              </Link>
              <span>/</span>
              <span className="text-slate-800">{copy.breadcrumbLabel}</span>
            </nav>

            <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_380px] lg:items-start">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-[#c2410c]">
                  {copy.sectionLabel}
                </p>
                <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] text-slate-950 md:text-6xl">
                  {copy.h1}
                </h1>
                <p className="mt-6 max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
                  {copy.intro}
                </p>
                <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-600 md:text-base">
                  {copy.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    className="inline-flex h-12 items-center justify-center rounded-full bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-slate-800"
                    href="#consultation"
                  >
                    {copy.heroPrimaryCtaLabel}
                  </Link>
                  <Link
                    className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                    href="/posts"
                  >
                    {copy.heroSecondaryCtaLabel}
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {copy.audienceLabels.map((item) => (
                    <span
                      className="rounded-full border border-slate-200/80 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm"
                      key={item}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <aside className="rounded-[2rem] border border-white/60 bg-white/85 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">{copy.title}</p>
                <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                  {copy.serviceLabel}
                </h2>
                <div className="mt-6 grid gap-3">
                  {copy.servicePoints.map((point) => (
                    <div
                      className="rounded-[1.25rem] border border-slate-100 bg-slate-50/80 px-4 py-3 text-sm leading-7 text-slate-700"
                      key={point}
                    >
                      {point}
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="container mt-20">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.32em] text-[#0f766e]">
              {locale === 'en' ? 'Start Here' : '先从这里进入'}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 md:text-4xl">
              {copy.cardsTitle}
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">{copy.cardsIntro}</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {copy.cards.map((item) => (
              <Link
                className="group rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#fdba74] hover:shadow-[0_22px_60px_rgba(15,23,42,0.08)]"
                href={item.cta}
                key={item.label}
              >
                <div className="inline-flex rounded-full border border-[#fed7aa] bg-[#fff7ed] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c2410c]">
                  {item.label}
                </div>
                <p className="mt-5 text-sm leading-7 text-slate-600">{item.text}</p>
                <div className="mt-6 text-sm font-semibold text-slate-900 transition group-hover:text-[#c2410c]">
                  {locale === 'en' ? 'Open this route' : '打开这条路线'}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {page.relatedServiceSlugs.length > 0 && (
          <section className="container mt-20">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.32em] text-[#1d4ed8]">
                {locale === 'en' ? 'Service Cluster' : '服务集群'}
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 md:text-4xl">
                {locale === 'en'
                  ? 'Related service pages around the same thesis workflow'
                  : '同一条论文流程里的相关服务页'}
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
                {locale === 'en'
                  ? 'These pages cover adjacent writing stages so the site does not rely on one generic service entry only.'
                  : '这些页面覆盖相邻的写作阶段，让整站不只靠一个泛服务页承接意图。'}
              </p>
            </div>

            <ServicePageGrid excludeSlug={slug} locale={locale} slugs={page.relatedServiceSlugs} />
          </section>
        )}

        <section className="container mt-20 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm md:p-7">
            <p className="text-xs uppercase tracking-[0.32em] text-[#c2410c]">
              {locale === 'en' ? 'Topic Hubs' : '专题入口'}
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
              {locale === 'en'
                ? 'Topic pages that match this service intent'
                : '和这个服务页最贴近的专题页面'}
            </h2>
            <div className="mt-6 grid gap-4">
              {relatedCategories.map((category) => (
                <Link
                  className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/70 p-5 transition hover:border-[#fdba74] hover:bg-[#fff7ed]"
                  href={getAudienceCategoryPath(category.categorySlug)}
                  key={category.categorySlug}
                >
                  <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                    {category.kind === 'degree'
                      ? locale === 'en'
                        ? 'Degree Hub'
                        : '学历入口'
                      : locale === 'en'
                        ? 'Topic Hub'
                        : '专题入口'}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold text-slate-950">{category.labels[locale]}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {category.hubDescriptions[locale]}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm md:p-7">
            <p className="text-xs uppercase tracking-[0.32em] text-[#0f766e]">
              {locale === 'en' ? 'Subject Guides' : '学科导航'}
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-slate-950">
              {locale === 'en'
                ? 'Relevant discipline pages for this service route'
                : '和这个服务路线更贴近的学科页面'}
            </h2>
            <div className="mt-6 grid gap-4">
              {relatedSubjects.map((discipline) => {
                const group = getSubjectGroup(discipline.groupSlug)

                return (
                  <Link
                    className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/70 p-5 transition hover:border-[#bbf7d0] hover:bg-[#f0fdf4]"
                    href={getSubjectPath(discipline.slug)}
                    key={discipline.slug}
                  >
                    <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                      {group?.label[locale] || (locale === 'en' ? 'Subject' : '学科')}
                    </p>
                    <h3 className="mt-3 text-lg font-semibold text-slate-950">
                      {discipline.title[locale]}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {discipline.audience[locale]}
                    </p>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        <section className="container mt-20">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.32em] text-[#2563eb]">
              {locale === 'en' ? 'How It Works' : '推进路径'}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 md:text-4xl">
              {copy.processTitle}
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">{copy.processIntro}</p>
          </div>

          <div className="grid gap-5 lg:grid-cols-4">
            {copy.process.map((item) => (
              <div className="rounded-[2rem] border border-slate-100 bg-slate-50 p-6" key={item.title}>
                <h3 className="text-lg font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="container mt-20" id="faq">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.32em] text-[#475569]">
              {locale === 'en' ? 'FAQ' : '常见问题'}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 md:text-4xl">
              {copy.faqTitle}
            </h2>
          </div>

          <div className="grid gap-4">
            {copy.faqs.map((item) => (
              <details
                className="group rounded-[1.5rem] border border-slate-200 bg-white px-6 py-5"
                key={item.question}
              >
                <summary className="cursor-pointer list-none text-lg font-semibold text-slate-950">
                  {item.question}
                </summary>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="container mt-20" id="consultation">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_360px] lg:items-start">
            <ConsultationForm copy={copy.consultation} locale={locale} />

            <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] lg:sticky lg:top-28">
              <p className="text-xs uppercase tracking-[0.32em] text-[#16a34a]">
                {locale === 'en' ? 'Service Signals' : '服务信号'}
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                {copy.ctaAside.title}
              </h3>
              <div className="mt-5 space-y-3">
                {copy.ctaAside.points.map((point) => (
                  <div
                    className="rounded-[1.25rem] border border-slate-100 bg-slate-50/80 px-4 py-3 text-sm leading-7 text-slate-700"
                    key={point}
                  >
                    {point}
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-col gap-3">
                {copy.ctaAside.links.map((item) => (
                  <Link
                    className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 px-5 text-sm font-semibold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50"
                    href={item.href}
                    key={item.href}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        </section>
      </article>
    </>
  )
}

export const generateServiceLandingPageMetadata = async (
  slug: ServiceLandingPageSlug,
): Promise<Metadata> => {
  const locale = await getSiteLocale()
  const page = getServiceLandingPage(slug)
  const copy = page.copy[locale]

  return generateMeta({
    doc: {
      meta: {
        description: copy.description,
        title: copy.pageTitle,
      },
    },
    pathname: page.path,
  })
}
