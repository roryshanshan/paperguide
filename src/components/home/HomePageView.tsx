import { ArrowRight, BadgeCheck, BookOpenText, GraduationCap, Handshake, ShieldCheck, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { ConsultationForm } from '@/components/ConsultationForm'
import { Card, type CardPostData } from '@/components/Card'
import { PostTopicHubGrid } from '@/components/PostTopicHubGrid'
import type { HomepageFallback } from '@/utilities/homepageFallback'
import type { SiteLocale } from '@/utilities/siteLocale'

const serviceIcons = [GraduationCap, Sparkles, ShieldCheck]
const mentorIcons = [Handshake, BookOpenText, BadgeCheck]

export type HomepageStarterPath = {
  articleTitle: string
  categoryLabel: string
  description: string
  href: string
  routeLabel: string
  stageLabel: string
}

export const HomePageView: React.FC<{
  articles: CardPostData[]
  content: HomepageFallback
  locale: SiteLocale
  starterPaths: HomepageStarterPath[]
}> = ({ articles, content, locale, starterPaths }) => {
  const articleCopy =
    locale === 'en'
      ? {
          empty: 'Publish your first guide and it will appear here automatically.',
          title: 'Latest guides',
          viewAll: 'View all articles',
        }
      : {
          empty: '发布第一篇文章后，这里会自动展示最新内容。',
          title: '最新指南',
          viewAll: '查看全部文章',
        }
  const sectionCopy =
    locale === 'en'
      ? {
          articles: 'Insight Library',
          cta: 'Start Here',
          faq: 'FAQ',
          mentors: 'Mentor Profiles',
          process: 'Work Process',
          services: 'Academic Support',
          stories: 'Student Outcomes',
          topics: 'Writing Topic Hubs',
          paths: 'Starter Routes',
        }
      : {
          articles: '内容中心',
          cta: '开始咨询',
          faq: '常见问题',
          mentors: '导师阵容',
          process: '服务流程',
          services: '论文辅导',
          stories: '学员结果',
          topics: '写作专题',
          paths: '起步路线',
        }
  const consultationCopy =
    locale === 'en'
      ? {
          caption: 'WeChat Contact',
          hint: 'Scan the QR code to add WeChat directly and start the consultation faster.',
          title: 'Add WeChat by QR code',
        }
      : {
          caption: '微信咨询',
          hint: '扫码添加微信，直接沟通选题、修改和答辩安排会更快。',
          title: '扫码添加微信',
        }

  return (
    <article className="pb-24">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.35),transparent_28%),radial-gradient(circle_at_80%_10%,rgba(15,23,42,0.18),transparent_26%),linear-gradient(180deg,#fff7ed_0%,#ffffff_58%,#fffaf5_100%)] pt-32 pb-20">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f97316]/60 to-transparent" />
        <div className="container relative">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_420px] lg:items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#f97316]/15 bg-white/75 px-4 py-2 text-xs font-medium tracking-[0.28em] text-[#9a3412] shadow-sm backdrop-blur">
                <span className="size-2 rounded-full bg-[#f97316]" />
                {content.hero.metricTitle}
              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.04em] text-slate-950 md:text-6xl">
                {content.hero.title}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600 md:text-lg">
                {content.hero.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {content.hero.links.map((item) => (
                  <Link
                    className={
                      item === content.hero.links[0]
                        ? 'inline-flex h-12 items-center justify-center rounded-full bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-slate-800'
                        : 'inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50'
                    }
                    href={item.url}
                    key={item.label}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {content.hero.pills.map((pill) => (
                  <span
                    className="rounded-full border border-slate-200/80 bg-white px-4 py-2 text-sm text-slate-600 shadow-sm"
                    key={pill}
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/60 bg-white/80 p-6 shadow-[0_30px_80px_rgba(15,23,42,0.12)] backdrop-blur">
              <p className="text-xs uppercase tracking-[0.28em] text-slate-400">
                {content.hero.metricCaption}
              </p>

              <div className="mt-6 grid gap-4">
                {content.hero.metrics.map((metric) => (
                  <div
                    className="rounded-[1.5rem] border border-slate-100 bg-slate-50/80 p-5"
                    key={metric.label}
                  >
                    <div className="text-3xl font-semibold tracking-[-0.04em] text-slate-950">
                      {metric.value}
                    </div>
                    <div className="mt-2 text-sm leading-6 text-slate-500">{metric.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container -mt-6">
        <div className="grid gap-5 rounded-[2rem] border border-slate-100 bg-slate-950 p-6 text-white shadow-[0_24px_60px_rgba(15,23,42,0.18)] md:grid-cols-3 md:p-8">
          {content.hero.metrics.map((metric) => (
            <div className="border-b border-white/10 pb-4 md:border-b-0 md:border-r md:pb-0 md:pr-5 last:border-0 last:pr-0" key={metric.label}>
              <p className="text-sm uppercase tracking-[0.24em] text-white/45">{metric.label}</p>
              <p className="mt-3 text-3xl font-semibold tracking-[-0.04em]">{metric.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mt-24" id="services">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-[#c2410c]">{sectionCopy.services}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 md:text-4xl">
              {content.services.title}
            </h2>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {content.services.items.map((item, index) => {
            const Icon = serviceIcons[index % serviceIcons.length]

            return (
              <div
                className="rounded-[2rem] border border-slate-100 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)]"
                key={item.title}
              >
                <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-[#fff7ed] text-[#ea580c]">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{item.description}</p>
                <ul className="mt-6 space-y-3">
                  {item.points.map((point) => (
                    <li className="flex items-start gap-3 text-sm text-slate-700" key={point}>
                      <span className="mt-2 size-1.5 rounded-full bg-[#f97316]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </section>

      <section className="container mt-24" id="mentors">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-[#0f766e]">{sectionCopy.mentors}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 md:text-4xl">
              {content.mentors.title}
            </h2>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {content.mentors.items.map((item, index) => {
            const Icon = mentorIcons[index % mentorIcons.length]

            return (
              <div
                className="rounded-[2rem] border border-slate-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-7"
                key={item.name}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-slate-950">{item.name}</p>
                    <p className="mt-1 text-sm text-slate-500">{item.title}</p>
                  </div>
                  <div className="inline-flex size-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
                    <Icon className="size-5" />
                  </div>
                </div>
                <p className="mt-5 text-sm leading-7 text-slate-600">{item.bio}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.focus.map((focus) => (
                    <span
                      className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm"
                      key={focus}
                    >
                      {focus}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section className="mt-24 bg-[linear-gradient(180deg,#fffaf5_0%,#ffffff_100%)] py-20">
        <div className="container">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.32em] text-[#be123c]">{sectionCopy.stories}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 md:text-4xl">
              {content.stories.title}
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {content.stories.items.map((item) => (
              <div
                className="rounded-[2rem] border border-[#fed7aa] bg-white p-7 shadow-[0_18px_50px_rgba(249,115,22,0.08)]"
                key={`${item.degree}-${item.headline}`}
              >
                <div className="inline-flex rounded-full bg-[#fff7ed] px-3 py-1 text-xs font-semibold text-[#c2410c]">
                  {item.degree}
                </div>
                <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                  {item.headline}
                </h3>
                <div className="mt-5 space-y-3 text-sm leading-7 text-slate-600">
                  <p>{item.topic}</p>
                  <p className="font-medium text-slate-900">{item.outcome}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mt-24">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.32em] text-[#1d4ed8]">{sectionCopy.process}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 md:text-4xl">
            {content.process.title}
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-4">
          {content.process.items.map((item) => (
            <div className="rounded-[2rem] border border-slate-100 bg-slate-50 p-6" key={item.step}>
              <p className="text-sm font-semibold tracking-[0.28em] text-[#2563eb]">{item.step}</p>
              <h3 className="mt-5 text-xl font-semibold text-slate-950">{item.title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container mt-24">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-[#c2410c]">{sectionCopy.topics}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 md:text-4xl">
              {locale === 'en' ? 'Browse high-intent thesis writing channels' : '按真实写作问题进入专题频道'}
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
              {locale === 'en'
                ? 'Start from topic selection, literature review, structure writing, methods, or revision workflow instead of guessing where to read next.'
                : '从选题、综述、结构、方法和返修流程切入，不用再在文章列表里盲找下一篇该看什么。'}
            </p>
          </div>
          <Link
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800 transition hover:text-slate-950"
            href="/posts"
          >
            {locale === 'en' ? 'Open article center' : '打开文章中心'}
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <PostTopicHubGrid locale={locale} />
      </section>

      {starterPaths.length > 0 && (
        <section className="container mt-24">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-[#0f766e]">{sectionCopy.paths}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 md:text-4xl">
                {locale === 'en'
                  ? 'Start from a route, not from a random article'
                  : '先走一条起步路线，而不是随机点进一篇文章'}
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
                {locale === 'en'
                  ? 'These picks are designed for readers who want one useful first read before diving into the full topic hub.'
                  : '这几条路线适合想先找一篇真正有用的起步文章，再慢慢进入整个专题频道的读者。'}
              </p>
            </div>
            <Link
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800 transition hover:text-slate-950"
              href="/posts"
            >
              {locale === 'en' ? 'Browse all guides' : '浏览全部文章'}
              <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-4">
            {starterPaths.map((path) => (
              <Link
                className="group rounded-[2rem] border border-slate-200/80 bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#99f6e4] hover:shadow-[0_22px_60px_rgba(15,23,42,0.1)]"
                href={path.href}
                key={`${path.categoryLabel}-${path.articleTitle}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex rounded-full border border-[#ccfbf1] bg-[#f0fdfa] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
                    {path.routeLabel}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.22em] text-slate-400 transition group-hover:text-[#0f766e]">
                    {path.stageLabel}
                  </span>
                </div>

                <p className="mt-5 text-xs uppercase tracking-[0.24em] text-slate-500">{path.categoryLabel}</p>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-slate-950">
                  {path.articleTitle}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">{path.description}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition group-hover:text-[#0f766e]">
                  {locale === 'en' ? 'Open first read' : '打开起步文章'}
                  <ArrowRight className="size-4" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="container mt-24">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-[#7c3aed]">{sectionCopy.articles}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 md:text-4xl">
              {articleCopy.title}
            </h2>
          </div>
          <Link
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800 transition hover:text-slate-950"
            href="/posts"
          >
            {articleCopy.viewAll}
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {articles.length > 0 ? (
          <div className="grid gap-6 lg:grid-cols-3">
            {articles.map((article) => (
              <Card className="h-full rounded-[2rem]" doc={article} key={article.slug} relationTo="posts" />
            ))}
          </div>
        ) : (
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-slate-50 p-8 text-sm text-slate-600">
            {articleCopy.empty}
          </div>
        )}
      </section>

      <section className="container mt-24" id="faq">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.32em] text-[#475569]">{sectionCopy.faq}</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 md:text-4xl">
            {content.faqs.title}
          </h2>
        </div>

        <div className="grid gap-4">
          {content.faqs.items.map((item) => (
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

      <section className="container mt-24" id="consultation">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_360px] lg:items-start">
          <ConsultationForm copy={content.consultation} locale={locale} />

          <aside className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] lg:sticky lg:top-28">
            <p className="text-xs uppercase tracking-[0.32em] text-[#16a34a]">{consultationCopy.caption}</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
              {consultationCopy.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600">{consultationCopy.hint}</p>

            <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-slate-200 bg-[#f6fffb] p-4">
              <div className="overflow-hidden rounded-[1.25rem] bg-white shadow-sm">
                <Image
                  alt={locale === 'en' ? 'WeChat QR code for consultation' : '微信咨询二维码'}
                  className="h-auto w-full"
                  height={1455}
                  priority={false}
                  src="/wechat-qr.jpg"
                  width={1074}
                />
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="container mt-24">
        <div className="rounded-[2.25rem] bg-[linear-gradient(135deg,#0f172a_0%,#1e293b_45%,#9a3412_100%)] px-8 py-10 text-white lg:px-12 lg:py-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.32em] text-white/55">{sectionCopy.cta}</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">
                {content.cta.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/72">{content.cta.description}</p>
            </div>
            <Link
              className="inline-flex h-12 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              href={content.cta.primary.url}
            >
              {content.cta.primary.label}
            </Link>
          </div>
        </div>
      </section>
    </article>
  )
}
