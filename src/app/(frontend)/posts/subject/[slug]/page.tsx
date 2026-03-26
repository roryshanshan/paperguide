import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { CollectionArchive } from '@/components/CollectionArchive'
import { JsonLd } from '@/components/JsonLd'
import { generateMeta } from '@/utilities/generateMeta'
import { getCachedDisciplinePosts, type CategoryPostData } from '@/utilities/getCachedPostQueries'
import {
  audienceCategories,
  getAudienceCategory,
  getAudienceCategoryPath,
  getPostStage,
  parseSeoPostSlug,
  postStages,
} from '@/utilities/postTaxonomy'
import {
  getSubjectDiscipline,
  getSubjectGroup,
  getSubjectGroupRecommendations,
  getSubjectHotQuestions,
  getSubjectOverview,
  getSubjectPath,
  getSubjectStageDescription,
  subjectDisciplines,
} from '@/utilities/subjectNavigation'
import {
  buildBreadcrumbSchema,
  buildCollectionPageSchema,
  buildPostItemListSchema,
  getSchemaBreadcrumbId,
  getSchemaItemListId,
} from '@/utilities/schema'
import { getSiteLocale } from '@/utilities/siteLocale'

type Args = {
  params: Promise<{
    slug: string
  }>
}

export const revalidate = 600

const DISCIPLINE_PAGE_LIMIT = 24
const SUBJECT_SCHEMA_ITEM_LIMIT = 24

const degreeCategorySlugs = ['undergraduate-thesis', 'masters-thesis', 'doctoral-thesis'] as const

const degreeLabelMap = {
  'doctoral-thesis': {
    en: 'PhD',
    zh: '博士',
  },
  'masters-thesis': {
    en: "Master's",
    zh: '研究生',
  },
  'undergraduate-thesis': {
    en: 'Undergraduate',
    zh: '本科',
  },
} as const

const stageOrder = [
  'proposal',
  'literature-review',
  'methods-analysis',
  'revision-defense',
] as const

type DegreeStarter = {
  category: (typeof audienceCategories)[number]
  categorySlug: (typeof degreeCategorySlugs)[number]
  label: string
  starter: CategoryPostData
}

export default async function SubjectPage({ params: paramsPromise }: Args) {
  const locale = await getSiteLocale()
  const { slug } = await paramsPromise
  const discipline = getSubjectDiscipline(slug)

  if (!discipline) notFound()

  const posts = await getCachedDisciplinePosts(
    locale,
    discipline.slug,
    DISCIPLINE_PAGE_LIMIT,
  ).catch(() => [] as CategoryPostData[])
  const matchingPosts = Array.isArray(posts) ? posts : []
  const schemaPosts = matchingPosts.slice(0, SUBJECT_SCHEMA_ITEM_LIMIT)
  const group = getSubjectGroup(discipline.groupSlug)
  const topicRecommendations = getSubjectGroupRecommendations(discipline)
  const hotQuestions = getSubjectHotQuestions(discipline, locale)
  const pagePath = getSubjectPath(discipline.slug)
  const pageTitle =
    locale === 'en'
      ? `${discipline.title.en} thesis writing hub`
      : `${discipline.title.zh}论文写作导航`
  const pageDescription = getSubjectOverview(discipline, locale)
  const breadcrumbId = getSchemaBreadcrumbId(pagePath)
  const itemListId = schemaPosts.length > 0 ? getSchemaItemListId(pagePath) : undefined

  const degreeStarters: DegreeStarter[] = degreeCategorySlugs.flatMap((categorySlug) => {
    const category = getAudienceCategory(categorySlug)
    const degreePosts = matchingPosts.filter(
      (post) => parseSeoPostSlug(post.slug)?.categorySlug === categorySlug,
    )

    const starter =
      stageOrder
        .map((stageSlug) =>
          degreePosts.find((post) => parseSeoPostSlug(post.slug)?.stageSlug === stageSlug),
        )
        .find(Boolean) || null

    if (!category || !starter) return []

    return [
      {
        category,
        categorySlug,
        label: degreeLabelMap[categorySlug][locale],
        starter,
      },
    ]
  })

  const stageSections = postStages
    .map((stage) => ({
      posts: matchingPosts.filter((post) => parseSeoPostSlug(post.slug)?.stageSlug === stage.slug),
      stage,
    }))
    .filter((section) => section.posts.length > 0)

  const linkedHotQuestions = hotQuestions.map((item) => {
    const stagePosts =
      stageSections.find((section) => section.stage.slug === item.stageSlug)?.posts || []
    const linkedPost =
      degreeCategorySlugs
        .map((categorySlug) =>
          stagePosts.find((post) => parseSeoPostSlug(post.slug)?.categorySlug === categorySlug),
        )
        .find(Boolean) ||
      stagePosts.at(0) ||
      null

    return {
      href: linkedPost?.slug ? `/posts/${linkedPost.slug}` : null,
      question: item.question,
      stageLabel: getPostStage(item.stageSlug)?.labels[locale] || '',
    }
  })

  return (
    <div className="pt-24 pb-24">
      <JsonLd
        data={[
          buildBreadcrumbSchema({
            items: [
              { name: locale === 'en' ? 'Home' : '首页', path: '/' },
              { name: locale === 'en' ? 'Articles' : '文章中心', path: '/posts' },
              { name: discipline.title[locale], path: pagePath },
            ],
            path: pagePath,
          }),
          buildCollectionPageSchema({
            breadcrumbId,
            description: pageDescription,
            locale,
            mainEntityId: itemListId,
            path: pagePath,
            title: pageTitle,
          }),
          schemaPosts.length > 0
            ? buildPostItemListSchema({
                locale,
                path: pagePath,
                posts: schemaPosts,
              })
            : null,
        ]}
      />
      <div className="container">
        <nav className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-500">
          <Link className="transition hover:text-[#c2410c]" href="/">
            {locale === 'en' ? 'Home' : '首页'}
          </Link>
          <span>/</span>
          <Link className="transition hover:text-[#c2410c]" href="/posts">
            {locale === 'en' ? 'Articles' : '文章中心'}
          </Link>
          <span>/</span>
          <span className="text-slate-800">{discipline.title[locale]}</span>
        </nav>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_360px]">
          <section className="rounded-[2rem] border border-slate-200/80 bg-white p-7 shadow-sm md:p-8">
            <p className="text-xs uppercase tracking-[0.32em] text-[#c2410c]">
              {locale === 'en' ? 'Subject Navigation' : '学科导航'}
            </p>
            <h1 className="mt-3 max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-slate-950 md:text-5xl">
              {pageTitle}
            </h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600 md:text-base">
              {pageDescription}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-[#fed7aa] bg-[#fff7ed] px-4 py-2 text-sm text-[#c2410c]">
                {locale === 'en' ? 'Focus:' : '聚焦：'}
                {discipline.focus[locale]}
              </span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600">
                {locale === 'en' ? 'Evidence:' : '材料：'}
                {discipline.evidence[locale]}
              </span>
              {group && (
                <span className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600">
                  {group.label[locale]}
                </span>
              )}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/80 p-5">
                <div className="text-xs uppercase tracking-[0.24em] text-slate-500">
                  {locale === 'en' ? 'Article Count' : '文章数量'}
                </div>
                <div className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-slate-950">
                  {matchingPosts.length}
                </div>
              </div>
              <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/80 p-5">
                <div className="text-xs uppercase tracking-[0.24em] text-slate-500">
                  {locale === 'en' ? 'Degree Tracks' : '学位路径'}
                </div>
                <div className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-slate-950">
                  {degreeStarters.length}
                </div>
              </div>
              <div className="rounded-[1.5rem] border border-slate-200/80 bg-slate-50/80 p-5">
                <div className="text-xs uppercase tracking-[0.24em] text-slate-500">
                  {locale === 'en' ? 'Writing Stages' : '写作阶段'}
                </div>
                <div className="mt-3 text-3xl font-semibold tracking-[-0.05em] text-slate-950">
                  {stageSections.length}
                </div>
              </div>
            </div>
          </section>

          <aside className="rounded-[2rem] border border-slate-200/80 bg-slate-950 p-6 text-white shadow-[0_22px_60px_rgba(15,23,42,0.16)]">
            <p className="text-xs uppercase tracking-[0.28em] text-white/55">
              {locale === 'en' ? 'How To Use' : '怎么用这个入口'}
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
              {locale === 'en'
                ? 'Enter by subject first, then follow the writing stage'
                : '先按学科认门，再顺着写作阶段往下读'}
            </h2>
            <div className="mt-6 space-y-4">
              {[
                locale === 'en'
                  ? `Start with the degree track that matches your current draft pressure.`
                  : `先选与你当前进度最接近的本科、研究生或博士入口。`,
                locale === 'en'
                  ? `Use the stage blocks below to decide whether you are stuck on topic, review, methods, or final revision.`
                  : `再用下面的阶段分区判断自己卡在选题、综述、方法还是定稿。`,
                locale === 'en'
                  ? `When the discipline fit is clear but the writing problem is not, jump to the recommended topic hubs.`
                  : `如果学科明确、但写作问题还不清，就先去看推荐专题频道。`,
              ].map((tip, index) => (
                <div className="flex items-start gap-4" key={tip}>
                  <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-7 text-white/78">{tip}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                className="inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                href="/posts"
              >
                {locale === 'en' ? 'Back to article center' : '返回文章中心'}
              </Link>
              <Link
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/15 px-5 text-sm font-semibold text-white transition hover:bg-white/8"
                href="/#consultation"
              >
                {locale === 'en' ? 'Ask for help' : '进入咨询'}
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <section className="container mt-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_360px]">
          <div className="rounded-[2rem] border border-slate-200/80 bg-[linear-gradient(180deg,#eff6ff_0%,#ffffff_100%)] p-6 shadow-sm md:p-7">
            <p className="text-xs uppercase tracking-[0.28em] text-[#1d4ed8]">
              {locale === 'en' ? 'Subject Support' : '学科辅导'}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
              {locale === 'en'
                ? `${discipline.title.en} papers improve faster when subject fit and writing route match`
                : `${discipline.title.zh}方向的论文，学科匹配和修改路线一起看会更稳`}
            </h2>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
              {locale === 'en'
                ? 'This page helps when the discipline is already clear but the writing route still feels scattered. Pair the subject guide with the thesis coaching page so topic, methods, revision order, and deadline pressure are handled in one path.'
                : '这个页面适合“专业方向已经明确，但修改路线还很散”的情况。把学科导航和论文辅导服务页一起使用，更容易把选题、方法、返修顺序和时间压力放到一条线上处理。'}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                className="inline-flex h-11 items-center justify-center rounded-full bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800"
                href="/lunwen-fudao"
              >
                {locale === 'en' ? 'Open thesis coaching page' : '查看论文辅导服务页'}
              </Link>
              <Link
                className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                href="/posts"
              >
                {locale === 'en' ? 'Back to article center' : '返回文章中心'}
              </Link>
            </div>
          </div>

          <aside className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
              {locale === 'en' ? 'Best Used For' : '更适合这类情况'}
            </p>
            <div className="mt-5 space-y-4">
              {[
                locale === 'en'
                  ? 'The discipline is fixed, but the chapter logic and evidence route still feel weak.'
                  : '专业方向已经定了，但章节逻辑和证据路线还不稳。',
                locale === 'en'
                  ? 'Need to map this discipline to degree stage and the right article sequence.'
                  : '需要把这个学科和学历阶段、阅读顺序对应起来。',
                locale === 'en'
                  ? 'Want one-to-one thesis guidance without crossing academic integrity boundaries.'
                  : '需要一对一论文指导，但坚持学术规范边界。',
              ].map((point) => (
                <div className="flex items-start gap-3" key={point}>
                  <span className="mt-1 inline-flex size-2.5 shrink-0 rounded-full bg-[#2563eb]" />
                  <p className="text-sm leading-7 text-slate-600">{point}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {degreeStarters.length > 0 && (
        <section className="container mt-12">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[#0f766e]">
                {locale === 'en' ? 'Degree Tracks' : '学位入口'}
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
                {locale === 'en'
                  ? `Pick the ${discipline.title.en} track that matches your current stage`
                  : `先选最贴近你阶段的 ${discipline.title.zh} 路径`}
              </h2>
            </div>
            <p className="max-w-3xl text-sm leading-7 text-slate-600">
              {locale === 'en'
                ? 'Each track starts with one recommended first read so you do not have to guess where to begin.'
                : '每条路径都先给一篇建议先读的文章，避免一上来就在列表里盲找。'}
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {degreeStarters.map((item) => (
              <Link
                className="group rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#99f6e4] hover:shadow-[0_22px_60px_rgba(15,23,42,0.1)]"
                href={`/posts/${item.starter.slug}`}
                key={`${item.categorySlug}-${item.starter.slug}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex rounded-full border border-[#ccfbf1] bg-[#f0fdfa] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#0f766e]">
                    {item.label}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.24em] text-slate-400">
                    {item.category.labels[locale]}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-slate-950">
                  {item.starter.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  {locale === 'en'
                    ? `Start here if you want the ${discipline.title.en} version of the ${item.label.toLowerCase()} writing route.`
                    : `如果你想先走 ${item.label} 阶段更常见的 ${discipline.title.zh} 写法，就先读这篇。`}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 transition group-hover:text-[#0f766e]">
                  {locale === 'en' ? 'Open starter' : '打开起步文章'}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="container mt-12 grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_420px]">
        <section className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm md:p-7">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[#c2410c]">
                {locale === 'en' ? 'Hot Questions' : '热门问题'}
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
                {locale === 'en'
                  ? `Start from the repeated writing pain points in ${discipline.title.en}`
                  : `先从 ${discipline.title.zh} 里最常反复出现的写作卡点开始`}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-slate-500">
              {locale === 'en'
                ? 'These questions are linked to the stage where readers usually get stuck first.'
                : '这些问题直接对应最常卡住读者的阶段入口。'}
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {linkedHotQuestions.map((item) => {
              const cardClassName =
                'rounded-[1.5rem] border border-slate-200/80 bg-slate-50/70 p-5 transition hover:border-[#fdba74] hover:bg-[#fff7ed]'

              if (!item.href) {
                return (
                  <div className={cardClassName} key={item.question}>
                    <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                      {item.stageLabel}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-slate-700">{item.question}</p>
                  </div>
                )
              }

              return (
                <Link className={`block ${cardClassName}`} href={item.href} key={item.question}>
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                      {item.stageLabel}
                    </p>
                    <span className="text-xs font-medium text-[#c2410c]">
                      {locale === 'en' ? 'Open' : '查看'}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-7 text-slate-700">{item.question}</p>
                </Link>
              )
            })}
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
              {locale === 'en' ? 'Recommended Topic Hubs' : '推荐专题频道'}
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
              {locale === 'en'
                ? 'Jump from the subject into the writing problem'
                : '从学科入口，直接跳到对应写作问题'}
            </h2>
            <div className="mt-6 space-y-4">
              {topicRecommendations.map((category) => (
                <Link
                  className="block rounded-[1.35rem] border border-slate-200/80 bg-slate-50/70 p-4 transition hover:border-[#fdba74] hover:bg-[#fff7ed]"
                  href={getAudienceCategoryPath(category.categorySlug)}
                  key={category.categorySlug}
                >
                  <p className="text-[11px] uppercase tracking-[0.24em] text-slate-500">
                    {locale === 'en' ? 'Topic Hub' : '专题入口'}
                  </p>
                  <p className="mt-2 text-sm font-medium leading-7 text-slate-900">
                    {category.labels[locale]}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {category.hubDescriptions[locale]}
                  </p>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-sm">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500">
              {locale === 'en' ? 'Included Degree Libraries' : '已覆盖的学位文章库'}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {audienceCategories
                .filter((category) =>
                  degreeCategorySlugs.includes(
                    category.categorySlug as (typeof degreeCategorySlugs)[number],
                  ),
                )
                .map((category) => (
                  <Link
                    className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-600 transition hover:border-[#fdba74] hover:text-[#c2410c]"
                    href={getAudienceCategoryPath(category.categorySlug)}
                    key={category.categorySlug}
                  >
                    {category.labels[locale]}
                  </Link>
                ))}
            </div>
          </section>
        </aside>
      </section>

      <div className="mt-14 space-y-14">
        {stageSections.map((section) => (
          <section key={section.stage.slug}>
            <div className="container mb-8 space-y-6">
              <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                    {discipline.title[locale]}
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
                    {section.stage.labels[locale]}
                  </h2>
                </div>
                <p className="text-sm text-slate-500">
                  {locale === 'en'
                    ? `${section.posts.length} articles in this stage`
                    : `该阶段共 ${section.posts.length} 篇文章`}
                </p>
              </div>

              <div className="rounded-[1.75rem] border border-slate-200/80 bg-[linear-gradient(180deg,#fffaf5_0%,#ffffff_100%)] p-5 shadow-sm md:p-6">
                <p className="text-sm leading-7 text-slate-600">
                  {getSubjectStageDescription(discipline, section.stage.slug, locale)}
                </p>
              </div>
            </div>
            <CollectionArchive posts={section.posts} />
          </section>
        ))}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const locale = await getSiteLocale()
  const { slug } = await paramsPromise
  const discipline = getSubjectDiscipline(slug)

  if (!discipline) {
    return {}
  }

  return generateMeta({
    doc: {
      meta: {
        description: getSubjectOverview(discipline, locale),
        title:
          locale === 'en'
            ? `${discipline.title.en} thesis writing hub`
            : `${discipline.title.zh}论文写作导航`,
      },
    },
    pathname: getSubjectPath(discipline.slug),
  })
}

export function generateStaticParams() {
  return subjectDisciplines.map((discipline) => ({
    slug: discipline.slug,
  }))
}
