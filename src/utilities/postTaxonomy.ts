import type { SiteLocale } from '@/utilities/siteLocale'

export const audienceCategories = [
  {
    categorySlug: 'undergraduate-thesis',
    degreeSlug: 'undergraduate',
    labels: {
      en: 'Undergraduate Thesis',
      zh: '本科论文',
    },
    hubDescriptions: {
      en: 'Topic selection, literature review, methods, revision, and defense guidance tailored to undergraduate thesis writing.',
      zh: '围绕本科论文的选题、综述、方法、返修与答辩，整理更适合本科阶段的论文辅导内容。',
    },
    hubTitles: {
      en: 'Undergraduate Thesis Library',
      zh: '本科论文文章库',
    },
  },
  {
    categorySlug: 'masters-thesis',
    degreeSlug: 'masters',
    labels: {
      en: "Master's Thesis",
      zh: '研究生论文',
    },
    hubDescriptions: {
      en: 'A structured article hub for master-level writing strategy, empirical design, revision planning, and defense preparation.',
      zh: '聚焦研究生论文的写作策略、实证设计、修改定稿与答辩准备，方便按阶段系统浏览。',
    },
    hubTitles: {
      en: "Master's Thesis Library",
      zh: '研究生论文文章库',
    },
  },
  {
    categorySlug: 'doctoral-thesis',
    degreeSlug: 'doctoral',
    labels: {
      en: 'PhD Thesis',
      zh: '博士论文',
    },
    hubDescriptions: {
      en: 'A deeper article library for doctoral originality, research contribution, argument structure, revision, and defense readiness.',
      zh: '面向博士论文的原创性、研究贡献、论证结构、返修与答辩准备，形成更强的深度内容入口。',
    },
    hubTitles: {
      en: 'PhD Thesis Library',
      zh: '博士论文文章库',
    },
  },
] as const

export const postStages = [
  {
    slug: 'proposal',
    labels: {
      en: 'Topic Selection and Proposal',
      zh: '选题与开题',
    },
  },
  {
    slug: 'literature-review',
    labels: {
      en: 'Literature Review and Theoretical Framework',
      zh: '文献综述与理论框架',
    },
  },
  {
    slug: 'methods-analysis',
    labels: {
      en: 'Methodology and Data Analysis',
      zh: '研究方法与数据分析',
    },
  },
  {
    slug: 'revision-defense',
    labels: {
      en: 'Revision, Final Draft, and Defense',
      zh: '修改定稿与答辩',
    },
  },
] as const

export type AudienceCategory = (typeof audienceCategories)[number]
export type AudienceCategorySlug = AudienceCategory['categorySlug']
export type DegreeSlug = AudienceCategory['degreeSlug']
export type PostStage = (typeof postStages)[number]
export type PostStageSlug = PostStage['slug']

export const getAudienceCategory = (categorySlug: string | null | undefined) => {
  return audienceCategories.find((category) => category.categorySlug === categorySlug)
}

export const getAudienceCategoryHrefBySlug = (categorySlug: string | null | undefined) => {
  const category = getAudienceCategory(categorySlug)

  if (!category) return null

  return `/posts/category/${category.categorySlug}`
}

export const getAudienceCategoryPath = (categorySlug: AudienceCategorySlug) => {
  return `/posts/category/${categorySlug}`
}

export const getAudienceCategoryLabel = (
  categorySlug: string | null | undefined,
  locale: SiteLocale,
) => {
  return getAudienceCategory(categorySlug)?.labels[locale] ?? null
}

export const getPostStage = (stageSlug: string | null | undefined) => {
  return postStages.find((stage) => stage.slug === stageSlug)
}

export const parseSeoPostSlug = (slug: string | null | undefined) => {
  if (!slug) return null

  const category = audienceCategories.find((entry) => slug.startsWith(`${entry.degreeSlug}-`))
  const stage = postStages.find((entry) => slug.endsWith(`-${entry.slug}-guide`))

  if (!category || !stage) return null

  const prefix = `${category.degreeSlug}-`
  const suffix = `-${stage.slug}-guide`
  const disciplineSlug = slug.slice(prefix.length, slug.length - suffix.length)

  if (!disciplineSlug) return null

  return {
    categorySlug: category.categorySlug,
    degreeSlug: category.degreeSlug,
    disciplineSlug,
    stageSlug: stage.slug,
  } as const
}
