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

type CategoryHubEnhancement = {
  featuredQuestions: {
    en: string[]
    zh: string[]
  }
  startTips: {
    en: string[]
    zh: string[]
  }
}

export const topicHubCategories = audienceCategories.filter((category) => category.kind === 'topic')
export const degreeHubCategories = audienceCategories.filter((category) => category.kind === 'degree')

export const categoryHubEnhancements: Partial<Record<AudienceCategorySlug, CategoryHubEnhancement>> =
  {
    'research-topic-planning': {
      featuredQuestions: {
        en: [
          'How do I narrow an interesting topic into an answerable question?',
          'What makes a proposal look feasible instead of ambitious only?',
          'When should I shrink the scope instead of changing the whole topic?',
          'How can I tell whether a topic is searchable and worth developing?',
        ],
        zh: [
          '怎么把一个有兴趣的方向压成可回答的问题？',
          '开题里的可行性到底要怎么写才不空？',
          '什么时候该缩题，什么时候才真的需要换题？',
          '怎么判断一个题目既能检索、又值得继续做？',
        ],
      },
      startTips: {
        en: [
          'Start from the proposal-stage articles if the topic still feels broad or unstable.',
          'Move into the review-stage pieces once you need a sharper gap statement or entry point.',
          'Use the revision-stage articles when the title already drifted and needs to be tightened again.',
        ],
        zh: [
          '如果题目还偏大、偏虚，先从“选题与开题”阶段文章读起。',
          '当你需要研究缺口和切入点时，再进入“文献综述”阶段内容。',
          '如果题目已经跑偏，就直接看“修改定稿”阶段的收题文章。',
        ],
      },
    },
    'literature-reading-review': {
      featuredQuestions: {
        en: [
          'How do I stop forgetting papers right after reading them?',
          'What is the difference between a source summary and a real comparison sentence?',
          'How should citations be layered inside a literature review?',
          'When should earlier studies reappear in the analysis section?',
        ],
        zh: [
          '为什么文献总是边读边忘，怎么建立可复用笔记？',
          '综述里的比较句到底和摘要句差在哪？',
          '引用怎么分层，才不会越写越乱？',
          '分析部分什么时候需要回引前人研究？',
        ],
      },
      startTips: {
        en: [
          'Begin with the proposal-stage search and matrix articles if your reading still feels scattered.',
          'Go next to the review-stage pieces when the sources exist but the review still reads like a list.',
          'Save the revision-stage articles for the moment an advisor says the review lacks depth or focus.',
        ],
        zh: [
          '如果阅读还很散，先看检索策略和文献矩阵这类开篇文章。',
          '当文献已经有了但综述还像流水账时，再读综述结构类文章。',
          '导师说综述不深或引用很乱时，直接进返修阶段内容会更省时间。',
        ],
      },
    },
    'structure-abstract-writing': {
      featuredQuestions: {
        en: [
          'How is a mini abstract different from the final abstract?',
          'Why do the introduction and review keep repeating each other?',
          'How can each paragraph advance only one judgment?',
          'What should be checked in a final structural review before submission?',
        ],
        zh: [
          '迷你摘要和正式摘要到底分别解决什么问题？',
          '为什么引言和综述总会写串、写重？',
          '怎么让每一段只推进一个判断？',
          '定稿前做结构体检应该查什么？',
        ],
      },
      startTips: {
        en: [
          'Start with the proposal-stage pieces if the title and abstract still feel impossible to compress.',
          'Read the review-stage and methods-stage articles when the front matter and body keep overlapping.',
          'Jump to the final-stage structural check if the draft already exists but still reads loosely.',
        ],
        zh: [
          '如果题目和摘要一直压不紧，先读开题阶段的结构文章。',
          '当前文、正文和分析总在抢活时，再看综述和方法阶段内容。',
          '如果全文已经写完但还是松，直接看定稿阶段的结构体检最有效。',
        ],
      },
    },
    'methods-data-presentation': {
      featuredQuestions: {
        en: [
          'Do I really need hypotheses for this paper?',
          'How can theory become variables, cases, or coding rules?',
          'Why do I have data but still cannot write the analysis?',
          'How should I explain non-significant results without overreaching?',
        ],
        zh: [
          '这篇论文到底需不需要研究假设？',
          '理论框架怎么真正落到变量、案例和编码上？',
          '为什么手里有数据，分析还是写不出来？',
          '结果不显著时，怎样写才不失真也不虚？',
        ],
      },
      startTips: {
        en: [
          'Read the proposal-stage method-design pieces first if your question and evidence still do not line up.',
          'Move into the methods-stage articles when you already have data but the analytical line is still unclear.',
          'Use the revision-stage pieces once reviewers or advisors start pressing on evidence, robustness, or explanation.',
        ],
        zh: [
          '如果问题和证据还对不齐，先从前面的研究设计文章开始看。',
          '已经有数据但分析线不清时，再进入方法分析阶段的内容。',
          '当导师或评审开始追问证据、稳健性和解释边界时，优先看返修阶段文章。',
        ],
      },
    },
    'submission-defense-workflow': {
      featuredQuestions: {
        en: [
          'What does a real journal-fit cover letter need besides the abstract?',
          'How should reviewer comments be answered without sounding fragmented?',
          'Which support files should be ready before submission?',
          'What exactly should be checked in proofs and final QA?',
        ],
        zh: [
          'Cover Letter 除了摘要复述，还必须写清什么？',
          '回复审稿人意见时，怎样逐条回应又不失主线？',
          '投稿前到底要准备哪些配套文件和说明？',
          'proof 和最终 QA 到底该逐项看什么？',
        ],
      },
      startTips: {
        en: [
          'Start from the proposal-stage reader-positioning pieces if you are still thinking about future submission only vaguely.',
          'Read the introduction and methods-stage workflow articles when submission materials are starting to form.',
          'Go straight to the revision-stage response and proof articles once editor or reviewer feedback is already on the table.',
        ],
        zh: [
          '如果只是模糊地想着以后投稿，先看最前面的读者定位文章。',
          '当 Cover Letter、补充材料和版本说明开始成形时，再读中段流程文章。',
          '编辑信、审稿意见或 proof 已经来了，就直接读最后一阶段的返修文章。',
        ],
      },
    },
  }

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
