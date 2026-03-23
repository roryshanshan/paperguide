import type { SiteLocale } from '@/utilities/siteLocale'

export const audienceCategories = [
  {
    categorySlug: 'undergraduate-thesis',
    degreeSlug: 'undergraduate',
    kind: 'degree',
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
    kind: 'degree',
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
    kind: 'degree',
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
  {
    categorySlug: 'research-topic-planning',
    degreeSlug: 'research-topic',
    kind: 'topic',
    labels: {
      en: 'Topic Selection',
      zh: '选题与问题定义',
    },
    hubDescriptions: {
      en: 'Long-form writing guides on narrowing topics, defining research questions, checking feasibility, and turning vague interests into workable paper plans.',
      zh: '围绕选题缩题、研究问题、创新表达与可行性判断，整理更贴近真实写作卡点的长文内容。',
    },
    hubTitles: {
      en: 'Topic Selection and Question Design',
      zh: '选题与问题定义文章库',
    },
  },
  {
    categorySlug: 'literature-reading-review',
    degreeSlug: 'literature-reading',
    kind: 'topic',
    labels: {
      en: 'Literature Review',
      zh: '文献阅读与综述',
    },
    hubDescriptions: {
      en: 'A practical hub focused on search strategy, literature grouping, review structure, and reading notes that can actually feed the paper.',
      zh: '聚焦检索策略、文献分组、综述结构和可复用阅读笔记，让“读过很多”真正变成“写得出来”。',
    },
    hubTitles: {
      en: 'Literature Reading and Review Library',
      zh: '文献阅读与综述文章库',
    },
  },
  {
    categorySlug: 'structure-abstract-writing',
    degreeSlug: 'paper-structure',
    kind: 'topic',
    labels: {
      en: 'Structure Writing',
      zh: '摘要引言与结构写作',
    },
    hubDescriptions: {
      en: 'Guides on mini abstracts, introduction logic, section boundaries, results-discussion separation, and synchronized revision of the front and back matter.',
      zh: '围绕迷你摘要、引言逻辑、章节分工、结果讨论拆分与前后文联动修改，补齐论文结构表达的高频短板。',
    },
    hubTitles: {
      en: 'Abstract, Introduction, and Structure Writing',
      zh: '摘要引言与结构写作文章库',
    },
  },
  {
    categorySlug: 'methods-data-presentation',
    degreeSlug: 'methods-data',
    kind: 'topic',
    labels: {
      en: 'Methods and Data',
      zh: '方法设计与结果表达',
    },
    hubDescriptions: {
      en: 'A deeper article track for hypotheses, theory-to-method translation, evidence maps, figures, and answering detailed method questions clearly.',
      zh: '聚焦研究假设、理论落地、证据地图、图表表达和方法追问回应，帮助把分析链条真正写实。',
    },
    hubTitles: {
      en: 'Methods Design and Evidence Presentation',
      zh: '方法设计与结果表达文章库',
    },
  },
  {
    categorySlug: 'submission-defense-workflow',
    degreeSlug: 'submission-workflow',
    kind: 'topic',
    labels: {
      en: 'Revision and Submission',
      zh: '返修投稿与答辩',
    },
    hubDescriptions: {
      en: 'Long-form workflow notes on novelty statements, reviewer responses, cover letters, proofs, defense preparation, and version consistency.',
      zh: '围绕 novelty statement、返修信、投稿材料、proof 校样、答辩准备与版本一致性，形成更贴近真实发表流程的文章库。',
    },
    hubTitles: {
      en: 'Revision, Submission, and Defense Workflow',
      zh: '返修投稿与答辩文章库',
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
export type AudienceCategoryKind = AudienceCategory['kind']

export const topicHubCategories = audienceCategories.filter((category) => category.kind === 'topic')
export const degreeHubCategories = audienceCategories.filter((category) => category.kind === 'degree')

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

  const category = [...audienceCategories]
    .sort((left, right) => right.degreeSlug.length - left.degreeSlug.length)
    .find((entry) => slug.startsWith(`${entry.degreeSlug}-`))
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
