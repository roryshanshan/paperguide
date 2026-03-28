import 'server-only'

import { cache } from 'react'

import type { CardPostData } from '@/components/Card'
import type { Post } from '@/payload-types'
import type { SiteLocale } from '@/utilities/siteLocale'

type ArchivePostsResult = {
  docs: CardPostData[]
  page: number
  totalDocs: number
  totalPages: number
}

type SitemapEntry = {
  lastmod: string
  loc: string
}

type CategoryReference = Extract<NonNullable<Post['categories']>[number], object>
type MediaReference = Extract<NonNullable<Post['heroImage']>, object>

type AcademicFallbackPost = {
  category: {
    labels: Record<SiteLocale, string>
    slug: string
  }
  content: Record<SiteLocale, NonNullable<Post['content']>>
  imageFilename: string
  metaDescription: Record<SiteLocale, string>
  metaTitle: Record<SiteLocale, string>
  publishedAt: string
  relatedSlugs: string[]
  slug: string
  title: Record<SiteLocale, string>
}

const DEFAULT_MEDIA_HEIGHT = 900
const DEFAULT_MEDIA_WIDTH = 1600

const buildStableId = (value: string): number => {
  let hash = 0

  for (const char of value) {
    hash = (hash * 31 + char.charCodeAt(0)) | 0
  }

  return Math.abs(hash) || 1
}

const text = (value: string) => ({
  type: 'text',
  detail: 0,
  format: 0,
  mode: 'normal',
  style: '',
  text: value,
  version: 1,
})

const paragraph = (value: string) => ({
  type: 'paragraph',
  children: [text(value)],
  direction: 'ltr' as const,
  format: '',
  indent: 0,
  textFormat: 0,
  version: 1,
})

const heading = (value: string, tag: 'h2' | 'h3' = 'h2') => ({
  type: 'heading',
  children: [text(value)],
  direction: 'ltr' as const,
  format: '',
  indent: 0,
  tag,
  version: 1,
})

const richText = (
  blocks: Array<ReturnType<typeof heading> | ReturnType<typeof paragraph>>,
): NonNullable<Post['content']> => ({
  root: {
    type: 'root',
    children: blocks,
    direction: 'ltr' as const,
    format: '' as const,
    indent: 0,
    version: 1,
  },
})

const academicFallbackPosts: AcademicFallbackPost[] = [
  {
    slug: 'masters-topic-timeline',
    publishedAt: '2026-03-20T09:00:00.000Z',
    imageFilename: 'paperbridge-masters-planning.webp',
    category: {
      slug: 'research-topic-planning',
      labels: {
        zh: '选题与问题定义',
        en: 'Topic Selection',
      },
    },
    title: {
      zh: '硕士论文如何尽早定题并排出可执行时间线',
      en: "How to Lock a Master's Thesis Topic Early and Build a Workable Timeline",
    },
    metaTitle: {
      zh: '硕士论文定题与时间线规划',
      en: "Master's Thesis Topic and Timeline Planning",
    },
    metaDescription: {
      zh: '帮助硕士研究生尽早完成论文定题、收窄研究边界，并排出能够真正执行的写作时间线。',
      en: "A practical framework for master's students to narrow a topic, define the research boundary, and build a timeline that can actually be executed.",
    },
    relatedSlugs: ['methods-and-data-alignment', 'doctoral-literature-framework'],
    content: {
      zh: richText([
        heading('为什么很多硕士论文会卡在前两个月'),
        paragraph(
          '很多同学不是不会写，而是题目过大、资料路径不清、导师沟通也缺少明确决策点。看起来一直很忙，但真正能进入论文结构的内容并不多。',
        ),
        heading('定题前先做三层筛选'),
        paragraph(
          '第一层看学术价值，题目至少要回答一个明确问题。第二层看资料和数据是否可得。第三层看工作量是否匹配学位周期，硕士论文尤其要控制边界。',
        ),
        heading('把题目压缩成可验证的问题'),
        paragraph(
          '建议把题目写成“研究对象 + 关键变量或机制 + 特定场景 + 方法路径”的形式。只要一句话还说不清研究对象和变量，说明边界还没有收紧。',
        ),
        heading('一个适合硕士阶段的 12 周时间线'),
        paragraph(
          '第 1 到 2 周做选题筛选和核心阅读，第 3 到 5 周完成综述框架和研究设计，第 6 到 8 周推进数据或案例整理，第 9 到 10 周写主体章节，第 11 到 12 周集中做逻辑补强、格式统一和导师反馈修改。',
        ),
        heading('结语'),
        paragraph(
          '如果你能在定题阶段同时写清楚问题、资料、方法和时间线，后面的写作效率会明显提升，导师沟通也会更顺。',
        ),
      ]),
      en: richText([
        heading('Why many master\'s theses stall in the first two months'),
        paragraph(
          'The issue is rarely a lack of effort. More often the topic is too broad, the evidence path is unclear, and supervisor meetings are not built around clear decisions. Students stay busy, but little of that work becomes usable thesis structure.',
        ),
        heading('Run a three-layer filter before locking the topic'),
        paragraph(
          'First, test academic value. Second, test data availability. Third, test workload fit. A master\'s thesis should be manageable long before it looks ambitious.',
        ),
        heading('Turn the topic into a research question you can verify'),
        paragraph(
          'A useful format is “research object + key variable or mechanism + specific context + method path.” If one sentence still cannot define the object and variables, the boundary is not tight enough.',
        ),
        heading('A realistic 12-week plan'),
        paragraph(
          'Weeks 1 to 2 focus on topic filtering and core reading. Weeks 3 to 5 produce the review structure and research design. Weeks 6 to 8 collect data or case materials. Weeks 9 to 10 draft the core chapters. Weeks 11 to 12 are for logic repair, formatting, and revisions.',
        ),
        heading('Closing note'),
        paragraph(
          'When the question, evidence, method, and timeline are defined together at the start, the rest of the project becomes much more stable and easier to discuss with a supervisor.',
        ),
      ]),
    },
  },
  {
    slug: 'doctoral-literature-framework',
    publishedAt: '2026-03-18T09:00:00.000Z',
    imageFilename: 'paperbridge-doctoral-review.webp',
    category: {
      slug: 'literature-reading-review',
      labels: {
        zh: '文献阅读与综述',
        en: 'Literature Review',
      },
    },
    title: {
      zh: '博士论文文献综述怎么搭框架，避免“堆文献”',
      en: 'How to Structure a Doctoral Literature Review Without Just Stacking Sources',
    },
    metaTitle: {
      zh: '博士论文文献综述框架搭建',
      en: 'Doctoral Literature Review Framework',
    },
    metaDescription: {
      zh: '面向博士生的文献综述写作框架，帮助把资料堆积转化为研究脉络、争议点和理论位置。',
      en: 'A doctoral-level framework for turning a large body of reading into a coherent review with debates, gaps, and a clear research position.',
    },
    relatedSlugs: ['masters-topic-timeline', 'defense-and-revision-checklist'],
    content: {
      zh: richText([
        heading('博士综述最怕的不是写不长，而是没有主线'),
        paragraph(
          '博士阶段通常读得很多，但真正困难的是如何把大量资料转化为清晰的研究脉络。如果每篇文献都只是摘要式介绍，综述就会变成材料堆放，而不是研究定位。',
        ),
        heading('先搭问题线，再放文献块'),
        paragraph(
          '有效的综述不是按作者逐篇排，而是先围绕核心问题拆出几条分析主线，例如概念界定、理论分歧、方法差异和结论冲突。',
        ),
        heading('把综述写成研究地图'),
        paragraph(
          '一个成熟的博士综述应该同时回答三个问题：这个领域已经知道什么，争议还卡在哪，以及你的研究准备切入哪个缺口。',
        ),
        heading('用矩阵法整理文献会更高效'),
        paragraph(
          '建议至少整理研究对象、理论视角、方法、样本、主要结论和局限性。这样更容易看出哪些文献只是重复，哪些才真的存在冲突和推进空间。',
        ),
        heading('结语'),
        paragraph(
          '当综述能够同时呈现研究脉络、学术争议和你的切入位置时，它就不再是“前置章节”，而是整篇博士论文最重要的论证起点。',
        ),
      ]),
      en: richText([
        heading('The real problem is not length but lack of a line of argument'),
        paragraph(
          'Doctoral students often read a great deal, but the challenge is turning that reading into a structured research narrative. If every source is introduced one by one, the review becomes storage rather than positioning.',
        ),
        heading('Build a question line first, then place literature under it'),
        paragraph(
          'A strong review is usually organized around analytical lines such as concept definition, theoretical disagreement, methodological difference, and conflicting findings.',
        ),
        heading('Treat the review as a research map'),
        paragraph(
          'A mature review should show what the field already knows, where the active disputes remain, and where your own study will enter. Without that gap logic, the review cannot lead naturally to the research question.',
        ),
        heading('Use a literature matrix to make patterns visible'),
        paragraph(
          'Track the research object, theoretical lens, method, sample, main findings, and limitations. Once this is visible, real tension in the literature becomes much easier to see.',
        ),
        heading('Closing note'),
        paragraph(
          'When a literature review presents the field, the debates, and your entry point at the same time, it becomes the argumentative foundation of the dissertation rather than a formal chapter added at the front.',
        ),
      ]),
    },
  },
  {
    slug: 'methods-and-data-alignment',
    publishedAt: '2026-03-16T09:00:00.000Z',
    imageFilename: 'paperbridge-methods-data.webp',
    category: {
      slug: 'methods-data-presentation',
      labels: {
        zh: '方法设计与结果表达',
        en: 'Methods and Data',
      },
    },
    title: {
      zh: '研究问题、方法与数据如何对齐：别让论文“看起来会做，其实做不动”',
      en: 'Aligning Research Questions, Methods, and Data So the Thesis Is Actually Doable',
    },
    metaTitle: {
      zh: '研究问题、方法与数据对齐',
      en: 'Align Research Questions, Methods, and Data',
    },
    metaDescription: {
      zh: '帮助研究生和博士生把研究问题、方法与数据放在同一逻辑链上，避免论文设计失衡。',
      en: 'A practical guide for graduate and doctoral students to align research questions, methods, and data before a thesis design becomes unstable.',
    },
    relatedSlugs: ['masters-topic-timeline', 'doctoral-literature-framework'],
    content: {
      zh: richText([
        heading('很多论文的问题不在写作，而在设计链条断裂'),
        paragraph(
          '看起来很完整的论文方案，常常会在真正推进时卡住，原因是研究问题、方法和数据来源并没有对齐。问题问得太大、方法选得太重、数据却拿不到，后面的写作就会非常被动。',
        ),
        heading('先从问题类型倒推方法'),
        paragraph(
          '如果你要解释因果机制，就需要有能够支撑比较或识别的设计；如果你要理解经验过程，访谈或文本分析可能更合适；如果你要描述现状和差异，问卷和统计模型更有效。',
        ),
        heading('数据必须提前验证可得性与质量'),
        paragraph(
          '在开题阶段就应该确认数据是否真的可以拿到，样本量是否足够，变量是否能够操作化。很多方案纸面上成立，但一到执行层面就会发现数据质量完全撑不起问题。',
        ),
        heading('建议先做小型试跑'),
        paragraph(
          '无论是访谈提纲、编码框架，还是统计变量表，最好都先做一次小范围试跑。试跑不是提前完成研究，而是尽快暴露方法和数据之间的断点。',
        ),
        heading('结语'),
        paragraph(
          '论文能不能顺利写下去，往往不是由写作技巧决定，而是由研究设计是否自洽决定。问题、方法与数据越早对齐，后续修改成本就越低。',
        ),
      ]),
      en: richText([
        heading('Many theses fail at the design stage, not the writing stage'),
        paragraph(
          'A proposal can look polished on paper and still collapse in execution because the question, the method, and the data source do not truly fit together.',
        ),
        heading('Choose the method by working backward from the question type'),
        paragraph(
          'If the project aims to explain a causal mechanism, the design needs some form of comparison or identification. If it aims to understand process, interviews or text analysis may fit better. If it aims to describe patterns, surveys and statistical models may be more suitable.',
        ),
        heading('Test data availability and quality early'),
        paragraph(
          'Before the proposal is finalized, confirm whether the data can really be obtained, whether the sample is adequate, and whether the variables can be operationalized.',
        ),
        heading('Run a small pilot before full execution'),
        paragraph(
          'Interview guides, coding frames, and variable lists all benefit from a small pilot. The point is to expose the breakpoints between the method and the data as early as possible.',
        ),
        heading('Closing note'),
        paragraph(
          'Whether a thesis moves smoothly is often determined less by writing skill than by design coherence. The earlier the question, method, and data are aligned, the lower the cost of revision later.',
        ),
      ]),
    },
  },
  {
    slug: 'defense-and-revision-checklist',
    publishedAt: '2026-03-14T09:00:00.000Z',
    imageFilename: 'paperbridge-defense-revision.webp',
    category: {
      slug: 'submission-defense-workflow',
      labels: {
        zh: '返修投稿与答辩',
        en: 'Revision and Submission',
      },
    },
    title: {
      zh: '预答辩和终稿修改清单：研究生与博士都适用',
      en: "A Defense and Final Revision Checklist for Master's and Doctoral Students",
    },
    metaTitle: {
      zh: '论文预答辩与终稿修改清单',
      en: 'Thesis Defense and Final Revision Checklist',
    },
    metaDescription: {
      zh: '适用于硕士和博士的答辩前检查与终稿修改清单，帮助提升表达清晰度和回复效率。',
      en: "A practical checklist for pre-defense preparation and final revision that helps both master's and doctoral students respond more clearly and efficiently.",
    },
    relatedSlugs: ['doctoral-literature-framework', 'methods-and-data-alignment'],
    content: {
      zh: richText([
        heading('答辩前的核心任务不是继续堆内容，而是整理风险'),
        paragraph(
          '到了预答辩或终稿阶段，最有价值的工作往往不是再新增很多材料，而是快速识别评委最可能质疑的环节，并把回应路径提前准备好。',
        ),
        heading('先做一页问题回应表'),
        paragraph(
          '建议把导师和同门之前提过的问题集中成一页表格，包含问题、影响章节、准备怎么改、是否已经完成。这个动作能帮助你把零散意见变成有顺序的修改计划。',
        ),
        heading('优先检查摘要、导论、结论是否同一条主线'),
        paragraph(
          '很多论文的问题不是单章写得差，而是摘要写一个重点、正文展开另一个重点、结论又强调第三个重点。答辩老师通常对这种前后不一致最敏感。',
        ),
        heading('最后整体过一遍图表、注释和参考文献'),
        paragraph(
          '格式问题虽然不决定研究质量，但会显著影响整体专业感。图表编号、注释口径、参考文献样式和正文引用一致性，都应该在最后 48 小时集中核对。',
        ),
        heading('结语'),
        paragraph(
          '预答辩和终稿阶段的效率，来自于对问题的排序和表达的一致性。把风险点先整理清楚，往往比盲目继续加内容更有效。',
        ),
      ]),
      en: richText([
        heading('The priority before defense is not more material but better risk control'),
        paragraph(
          'At the pre-defense and final submission stage, the most valuable work is usually not adding more pages. It is identifying the questions examiners are most likely to raise and preparing clear response paths in advance.',
        ),
        heading('Create a one-page response sheet'),
        paragraph(
          'Collect recurring comments from supervisors and peers into a single table with four columns: issue, affected chapter, revision plan, and completion status.',
        ),
        heading('Check whether the abstract, introduction, and conclusion still tell the same story'),
        paragraph(
          'A common problem is internal inconsistency: the abstract emphasizes one contribution, the body develops another, and the conclusion highlights a third. Examiners notice this quickly because it weakens the whole argument.',
        ),
        heading('Review figures, notes, and references as one final package'),
        paragraph(
          'Formatting does not define research quality, but it strongly shapes professionalism. Figure numbering, note style, citation consistency, and reference formatting should all be checked together in the last forty-eight hours.',
        ),
        heading('Closing note'),
        paragraph(
          'Efficiency at the defense stage comes from prioritizing issues and keeping the whole thesis on one argumentative line. Clear risk sorting is usually more effective than continuously adding new material.',
        ),
      ]),
    },
  },
]

const getAcademicCatalog = cache(() =>
  academicFallbackPosts
    .slice()
    .sort((left, right) => {
      return new Date(right.publishedAt).getTime() - new Date(left.publishedAt).getTime()
    }),
)

const buildCategoryReference = (
  locale: SiteLocale,
  post: AcademicFallbackPost,
): CategoryReference => {
  return {
    id: buildStableId(post.category.slug),
    slug: post.category.slug,
    title: post.category.labels[locale],
  } as CategoryReference
}

const buildMediaReference = (post: AcademicFallbackPost): MediaReference => {
  return {
    alt: post.metaDescription.zh,
    filename: post.imageFilename,
    height: DEFAULT_MEDIA_HEIGHT,
    id: buildStableId(post.imageFilename),
    mimeType: 'image/webp',
    updatedAt: post.publishedAt,
    url: `/media/${post.imageFilename}`,
    width: DEFAULT_MEDIA_WIDTH,
  } as MediaReference
}

const buildCardPostData = (locale: SiteLocale, post: AcademicFallbackPost): CardPostData => {
  const category = buildCategoryReference(locale, post)
  const heroImage = buildMediaReference(post)

  return {
    categories: [category] as CardPostData['categories'],
    heroImage: heroImage as CardPostData['heroImage'],
    meta: {
      description: post.metaDescription[locale],
      image: heroImage,
      title: post.metaTitle[locale],
    } as CardPostData['meta'],
    slug: post.slug,
    title: post.title[locale],
  }
}

const getAcademicEntryBySlug = (slug: string) => {
  return getAcademicCatalog().find((post) => post.slug === slug) ?? null
}

export const getAcademicFallbackHomepagePosts = (
  locale: SiteLocale,
  limit: number,
): CardPostData[] => {
  return getAcademicCatalog()
    .slice(0, limit)
    .map((post) => buildCardPostData(locale, post))
}

export const getAcademicFallbackArchivePosts = (
  locale: SiteLocale,
  page: number,
  limit: number,
): ArchivePostsResult => {
  const catalog = getAcademicCatalog()
  const safeLimit = Math.max(limit, 1)
  const safePage = Math.max(page, 1)
  const totalDocs = catalog.length
  const totalPages = Math.max(Math.ceil(totalDocs / safeLimit), 1)
  const start = (safePage - 1) * safeLimit

  return {
    docs: catalog.slice(start, start + safeLimit).map((post) => buildCardPostData(locale, post)),
    page: safePage,
    totalDocs,
    totalPages,
  }
}

export const getAcademicFallbackCategoryPosts = (
  locale: SiteLocale,
  categorySlug: string,
  limit: number,
): CardPostData[] => {
  return getAcademicCatalog()
    .filter((post) => post.category.slug === categorySlug)
    .slice(0, limit)
    .map((post) => buildCardPostData(locale, post))
}

export const getAcademicFallbackRelatedPosts = (
  locale: SiteLocale,
  slug: string,
): CardPostData[] => {
  const entry = getAcademicEntryBySlug(slug)

  if (!entry) return []

  return entry.relatedSlugs
    .map((relatedSlug) => getAcademicEntryBySlug(relatedSlug))
    .filter((post): post is AcademicFallbackPost => Boolean(post))
    .map((post) => buildCardPostData(locale, post))
}

export const getAcademicFallbackPostBySlug = (locale: SiteLocale, slug: string): Post | null => {
  const entry = getAcademicEntryBySlug(slug)

  if (!entry) return null

  const category = buildCategoryReference(locale, entry)
  const heroImage = buildMediaReference(entry)
  const relatedPosts = getAcademicFallbackRelatedPosts(locale, slug).map((post) => {
    return {
      categories: post.categories,
      heroImage: post.heroImage,
      meta: post.meta,
      slug: post.slug,
      title: post.title,
    } as Post
  })

  return {
    _status: 'published',
    authors: [],
    categories: [category],
    content: entry.content[locale],
    createdAt: entry.publishedAt,
    heroImage,
    id: buildStableId(entry.slug),
    meta: {
      description: entry.metaDescription[locale],
      image: heroImage,
      title: entry.metaTitle[locale],
    },
    populatedAuthors: [],
    publishedAt: entry.publishedAt,
    relatedPosts,
    slug: entry.slug,
    title: entry.title[locale],
    updatedAt: entry.publishedAt,
  } as Post
}

export const getAcademicFallbackPostSitemapEntries = (siteURL: string): SitemapEntry[] => {
  const normalizedSiteURL = siteURL.replace(/\/$/, '')

  return getAcademicCatalog().map((post) => ({
    lastmod: post.publishedAt,
    loc: `${normalizedSiteURL}/posts/${post.slug}`,
  }))
}

export const getAcademicFallbackPostSlugs = (): string[] => {
  return getAcademicCatalog().map((post) => post.slug)
}
