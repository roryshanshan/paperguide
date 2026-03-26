import type { Metadata } from 'next'

import Link from 'next/link'
import React from 'react'

import { ConsultationForm } from '@/components/ConsultationForm'
import { JsonLd } from '@/components/JsonLd'
import { PostAudiencePills } from '@/components/PostAudiencePills'
import { PostSubjectHubGrid } from '@/components/PostSubjectHubGrid'
import { generateMeta } from '@/utilities/generateMeta'
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildServiceSchema,
  buildWebPageSchema,
  getSchemaBreadcrumbId,
  getSchemaDefaultImageUrl,
  getSchemaServiceId,
} from '@/utilities/schema'
import { getSiteLocale } from '@/utilities/siteLocale'

export const revalidate = 3600

const servicePagePath = '/lunwen-fudao'

const serviceContent = {
  en: {
    audienceCards: [
      {
        cta: '/posts/category/undergraduate-thesis',
        label: 'Undergraduate thesis coaching',
        text: 'Useful when the topic is still broad, the literature review feels patchy, or the final draft needs to be stabilized quickly.',
      },
      {
        cta: '/posts/category/masters-thesis',
        label: "Master's thesis guidance",
        text: 'Best for aligning theory, methods, data, and argument when the dissertation has material but not yet a strong analytical line.',
      },
      {
        cta: '/posts/category/doctoral-thesis',
        label: 'PhD dissertation support',
        text: 'Focused on contribution framing, chapter-level logic, reviewer response, and defense preparation under higher originality pressure.',
      },
    ],
    audienceLabels: ['Undergraduate students', "Master's students", 'PhD students'],
    breadcrumbLabel: 'Thesis Coaching',
    checklist: [
      'Clarify the real bottleneck before editing the wrong section.',
      'Translate advice into a chapter-by-chapter action list.',
      'Keep every round ethical: guidance only, no ghostwriting.',
    ],
    consultation: {
      buttonLabel: 'Request thesis coaching',
      description:
        'Share your degree level, discipline, timeline, and current bottleneck. We will suggest a more suitable thesis coaching route.',
      disclaimer: 'Guidance only. This service does not provide ghostwriting.',
      title: 'Get a thesis coaching plan',
    },
    ctaAside: {
      links: [
        { href: '/posts', label: 'Browse articles' },
        { href: '/posts/category/masters-thesis', label: "Open master's hub" },
      ],
      points: [
        'Topic scope and research question become more answerable.',
        'The literature review starts supporting the argument instead of sitting beside it.',
        'Methods, data, and chapter structure become easier to defend.',
      ],
      title: 'What usually improves first',
    },
    description:
      'PaperBridge provides thesis coaching and thesis guidance for undergraduate, master, and PhD students. The service focuses on proposal planning, literature review, methodology, revision, and defense preparation through ethical one-to-one academic support.',
    faqTitle: 'Common questions about thesis coaching',
    faqs: [
      {
        answer:
          'No. The service focuses on diagnosis, explanation, revision strategy, and one-to-one guidance so the student can complete the paper independently.',
        question: 'Do you provide ghostwriting?',
      },
      {
        answer:
          'Most requests cluster around proposal planning, literature review structure, methods justification, revision under deadline, and defense preparation.',
        question: 'What problems are most suitable for thesis guidance?',
      },
      {
        answer:
          'Yes. The service covers Chinese and English thesis support, especially when structure, logic, and response to reviewer-style questions need to be improved.',
        question: 'Can you support English-language papers?',
      },
      {
        answer:
          'Usually by degree level, discipline, timeline, and the stage where the draft is currently stuck. The goal is to shorten the path to the next useful revision round.',
        question: 'How is a coaching path usually matched?',
      },
    ],
    h1: 'Thesis coaching and thesis guidance service',
    intro:
      'This page is the core service entry for readers searching for thesis coaching, thesis guidance, and one-to-one dissertation support. It is designed for students who need a clearer next step, not another vague list of generic writing tips.',
    pageTitle: 'Thesis Coaching and Guidance Service',
    process: [
      {
        description:
          'Start from the current bottleneck: topic, review, methods, revision, or defense pressure.',
        title: '1. Diagnose the actual problem',
      },
      {
        description:
          'Match the degree level, discipline, timeline, and text sample to a more suitable coaching route.',
        title: '2. Build a focused guidance plan',
      },
      {
        description:
          'Convert the plan into concrete chapter actions, revision notes, and reading priorities.',
        title: '3. Push the draft forward',
      },
      {
        description:
          'Use the article library and subject hubs as ongoing support instead of treating guidance as a one-off conversation.',
        title: '4. Keep the process sustainable',
      },
    ],
    sectionLabel: 'Service Page',
    serviceLabel: 'What the service usually covers',
    servicePoints: [
      'Proposal planning and narrowing an oversized topic',
      'Literature review structure and source comparison logic',
      'Methodology justification and evidence presentation',
      'Revision strategy for blind review or supervisor feedback',
      'Defense preparation and response rehearsal',
      'Chinese and English thesis guidance under real deadlines',
    ],
    serviceType: 'Thesis coaching and thesis guidance',
    title: 'A stronger landing page for high-intent thesis support queries',
  },
  zh: {
    audienceCards: [
      {
        cta: '/posts/category/undergraduate-thesis',
        label: '本科论文辅导',
        text: '适合题目太大、综述搭不起来、结构总是散，或者终稿时间很紧，需要先把论文稳住的阶段。',
      },
      {
        cta: '/posts/category/masters-thesis',
        label: '硕士论文指导',
        text: '更适合理论、方法、数据和论证总对不齐的情况，尤其是材料不少，但分析主线还不够强的时候。',
      },
      {
        cta: '/posts/category/doctoral-thesis',
        label: '博士论文辅导',
        text: '重点放在研究贡献、章节逻辑、返修回应和答辩准备，适合原创性和论证深度要求更高的阶段。',
      },
    ],
    audienceLabels: ['本科生', '硕士生', '博士生'],
    breadcrumbLabel: '论文辅导',
    checklist: [
      '先判断真正卡住的节点，不把时间浪费在错误章节上。',
      '把建议落成章节级修改清单，而不是停留在泛泛提醒。',
      '坚持合规边界，只做辅导与指导，不代写。',
    ],
    consultation: {
      buttonLabel: '提交论文辅导需求',
      description:
        '留下学历、研究方向、时间节点和当前最棘手的问题，我们会先帮你判断更适合的论文辅导路径。',
      disclaimer: '只做辅导与指导，不代写、不出售论文。',
      title: '获取论文辅导与论文指导方案',
    },
    ctaAside: {
      links: [
        { href: '/posts', label: '浏览文章中心' },
        { href: '/posts/category/masters-thesis', label: '查看研究生论文库' },
      ],
      points: [
        '选题范围和研究问题会更快收敛。',
        '文献综述开始真正服务论证，而不是只是堆材料。',
        '方法、数据和章节结构会更容易经得住老师或答辩追问。',
      ],
      title: '通常最先改善的几个位置',
    },
    description:
      'PaperBridge 提供面向本科、硕士、博士阶段的一对一论文辅导与论文指导服务，覆盖开题、文献综述、研究方法、返修修改和答辩准备，坚持学术支持边界，不代写。',
    faqTitle: '论文辅导常见问题',
    faqs: [
      {
        answer:
          '不提供代写。我们的工作重点是诊断问题、解释逻辑、制定修改策略和一对一指导，帮助你独立完成论文。',
        question: '你们会代写论文吗？',
      },
      {
        answer:
          '最常见的是开题缩题、文献综述结构、方法论选择、盲审返修、答辩准备，以及时间很紧时的修改优先级判断。',
        question: '哪些问题最适合做论文指导？',
      },
      {
        answer:
          '可以。网站同时支持中文和英文论文辅导，尤其适合结构、逻辑、表达和审稿式追问回应需要一起提升的情况。',
        question: '中英文论文都能辅导吗？',
      },
      {
        answer:
          '通常会结合学历层级、研究方向、截止时间和当前卡住的章节来安排，目标是尽快进入下一轮真正有效的修改。',
        question: '论文辅导一般怎么匹配？',
      },
    ],
    h1: '论文辅导与论文指导服务',
    intro:
      '这是站内专门承接“论文辅导”“论文指导”“毕业论文辅导”等高意图搜索的核心服务页。它面向真正需要一对一支持的同学，不只是泛泛给一堆写作建议，而是帮助你更快找到下一步该怎么改。',
    pageTitle: '论文辅导与论文指导服务',
    process: [
      {
        description: '先判断你到底卡在选题、综述、方法、返修还是答辩压力上。',
        title: '1. 先诊断真正的问题',
      },
      {
        description: '结合学历、专业、时间节点和样稿状态，匹配更合适的论文指导路径。',
        title: '2. 制定聚焦的辅导方案',
      },
      {
        description: '把建议拆成章节级动作、修改顺序和阅读清单，避免每次沟通都重新开始。',
        title: '3. 把论文往前推进',
      },
      {
        description: '再用文章库和学科导航做持续支持，而不是把辅导当成一次性解答。',
        title: '4. 建立可持续的写作节奏',
      },
    ],
    sectionLabel: '服务页',
    serviceLabel: '论文辅导通常覆盖这些场景',
    servicePoints: [
      '开题缩题与研究问题明确',
      '文献综述结构与文献比较逻辑',
      '研究方法选择、论证与结果表达',
      '盲审意见、导师反馈与返修优先级',
      '答辩准备、问答演练与终稿一致性',
      '中英文论文指导与截止前冲刺支持',
    ],
    serviceType: '论文辅导与论文指导',
    title: '把高意图服务词落到真正可转化的页面上',
  },
} as const

export default async function ThesisCoachingPage() {
  const locale = await getSiteLocale()
  const copy = serviceContent[locale]
  const breadcrumbId = getSchemaBreadcrumbId(servicePagePath)
  const serviceId = getSchemaServiceId(servicePagePath)

  return (
    <>
      <JsonLd
        data={[
          buildBreadcrumbSchema({
            items: [
              { name: locale === 'en' ? 'Home' : '首页', path: '/' },
              { name: copy.breadcrumbLabel, path: servicePagePath },
            ],
            path: servicePagePath,
          }),
          buildWebPageSchema({
            breadcrumbId,
            description: copy.description,
            imageUrl: getSchemaDefaultImageUrl(),
            locale,
            mainEntityId: serviceId,
            path: servicePagePath,
            title: copy.pageTitle,
          }),
          buildServiceSchema({
            audience: [...copy.audienceLabels],
            description: copy.description,
            locale,
            name: copy.pageTitle,
            path: servicePagePath,
            serviceType: copy.serviceType,
          }),
          buildFaqSchema({
            items: copy.faqs,
            path: servicePagePath,
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
                    {locale === 'en' ? 'Request thesis coaching' : '获取论文辅导方案'}
                  </Link>
                  <Link
                    className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                    href="/posts"
                  >
                    {locale === 'en' ? 'Browse thesis guides' : '查看论文文章库'}
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  {copy.checklist.map((item) => (
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
              {locale === 'en' ? 'Degree Tracks' : '学历阶段'}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 md:text-4xl">
              {locale === 'en'
                ? 'Choose the thesis guidance route that matches your current degree'
                : '先选和你当前阶段匹配的论文指导路径'}
            </h2>
          </div>

          <PostAudiencePills locale={locale} />

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {copy.audienceCards.map((item) => (
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
                  {locale === 'en' ? 'Open related hub' : '打开对应入口'}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="container mt-20">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-[#1d4ed8]">
                {locale === 'en' ? 'Subject Navigation' : '学科导航'}
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 md:text-4xl">
                {locale === 'en'
                  ? 'Use discipline pages to make thesis coaching more specific'
                  : '先按学科进入，让论文辅导更快落到具体方向'}
              </h2>
            </div>
            <Link
              className="text-sm font-semibold text-slate-800 transition hover:text-slate-950"
              href="/posts#subject-navigation"
            >
              {locale === 'en' ? 'Open all subjects' : '查看全部学科'}
            </Link>
          </div>

          <PostSubjectHubGrid locale={locale} variant="featured" />
        </section>

        <section className="container mt-20">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.32em] text-[#2563eb]">
              {locale === 'en' ? 'How It Works' : '辅导怎么推进'}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 md:text-4xl">
              {locale === 'en'
                ? 'A service route that is built around the draft, not around generic advice'
                : '围绕你的稿子推进，而不是只给泛泛建议'}
            </h2>
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

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getSiteLocale()
  const copy = serviceContent[locale]

  return generateMeta({
    doc: {
      meta: {
        description: copy.description,
        title:
          locale === 'en'
            ? 'Thesis Coaching and Guidance Service'
            : '论文辅导与论文指导服务',
      },
    },
    pathname: servicePagePath,
  })
}
