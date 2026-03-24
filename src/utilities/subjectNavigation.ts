import {
  getAudienceCategory,
  type AudienceCategorySlug,
  type PostStageSlug,
} from '@/utilities/postTaxonomy'
import type { SiteLocale } from '@/utilities/siteLocale'

type SubjectGroupSlug =
  | 'business-governance'
  | 'education-humanities'
  | 'social-behavior'
  | 'computing-data'
  | 'engineering'
  | 'health-life'
  | 'design-creative'

export type SubjectGroup = {
  description: {
    en: string
    zh: string
  }
  label: {
    en: string
    zh: string
  }
  recommendedCategorySlugs: AudienceCategorySlug[]
  slug: SubjectGroupSlug
}

export type SubjectDiscipline = {
  audience: {
    en: string
    zh: string
  }
  evidence: {
    en: string
    zh: string
  }
  featured: boolean
  focus: {
    en: string
    zh: string
  }
  groupSlug: SubjectGroupSlug
  slug: string
  title: {
    en: string
    zh: string
  }
}

export const subjectGroups: SubjectGroup[] = [
  {
    slug: 'business-governance',
    label: {
      en: 'Business, Finance, and Governance',
      zh: '经管法与治理',
    },
    description: {
      en: 'Common writing tasks around organizations, markets, policy interpretation, and governance outcomes.',
      zh: '围绕组织管理、资本市场、政策解释和治理绩效的高频论文写作场景。',
    },
    recommendedCategorySlugs: [
      'research-topic-planning',
      'methods-data-presentation',
      'submission-defense-workflow',
    ],
  },
  {
    slug: 'education-humanities',
    label: {
      en: 'Education, Language, and Communication',
      zh: '教育语言与传播',
    },
    description: {
      en: 'Useful for teaching practice, textual reading, discourse analysis, and communication-oriented projects.',
      zh: '适合教学实践、文本细读、话语分析和传播研究类论文。',
    },
    recommendedCategorySlugs: [
      'literature-reading-review',
      'structure-abstract-writing',
      'academic-voice-argument',
    ],
  },
  {
    slug: 'social-behavior',
    label: {
      en: 'Social and Behavioral Research',
      zh: '社会与行为研究',
    },
    description: {
      en: 'For projects involving interviews, surveys, behavior patterns, group dynamics, and interpretive analysis.',
      zh: '适用于访谈、问卷、行为模式、群体互动和解释性分析类研究。',
    },
    recommendedCategorySlugs: [
      'literature-reading-review',
      'methods-data-presentation',
      'research-integrity-ethics',
    ],
  },
  {
    slug: 'computing-data',
    label: {
      en: 'Computing and Data Intelligence',
      zh: '计算机与数据智能',
    },
    description: {
      en: 'Focused on algorithms, system design, evaluation pipelines, datasets, and reproducible technical reporting.',
      zh: '聚焦算法设计、系统实现、实验评估、数据集和可复现的技术表达。',
    },
    recommendedCategorySlugs: [
      'research-topic-planning',
      'methods-data-presentation',
      'global-publishing-peer-review',
    ],
  },
  {
    slug: 'engineering',
    label: {
      en: 'Engineering and Applied Technology',
      zh: '工程技术',
    },
    description: {
      en: 'Covers experiments, simulation, design validation, engineering cases, and performance-oriented argumentation.',
      zh: '覆盖实验、仿真、设计验证、工程案例和性能导向的论文论证。',
    },
    recommendedCategorySlugs: [
      'research-topic-planning',
      'methods-data-presentation',
      'research-integrity-ethics',
    ],
  },
  {
    slug: 'health-life',
    label: {
      en: 'Health, Medicine, and Life Science',
      zh: '医药健康与生命科学',
    },
    description: {
      en: 'Useful for clinical observation, intervention studies, laboratory workflows, and evidence-sensitive reporting.',
      zh: '适合临床观察、干预研究、实验流程和对证据敏感的结果表达。',
    },
    recommendedCategorySlugs: [
      'methods-data-presentation',
      'research-integrity-ethics',
      'global-publishing-peer-review',
    ],
  },
  {
    slug: 'design-creative',
    label: {
      en: 'Design and Creative Research',
      zh: '设计与创意研究',
    },
    description: {
      en: 'Built for design strategy, user insight, project narratives, and portfolio-backed academic writing.',
      zh: '面向设计策略、用户洞察、项目叙事和作品支撑型论文写作。',
    },
    recommendedCategorySlugs: [
      'literature-reading-review',
      'structure-abstract-writing',
      'academic-voice-argument',
    ],
  },
] as const

export const subjectDisciplines: SubjectDiscipline[] = [
  {
    slug: 'management',
    groupSlug: 'business-governance',
    featured: true,
    title: { zh: '管理学', en: 'Management' },
    focus: {
      zh: '组织管理与绩效改进',
      en: 'organizational management and performance improvement',
    },
    evidence: {
      zh: '企业案例、访谈记录和制度文件',
      en: 'company cases, interview records, and policy documents',
    },
    audience: {
      zh: '适合企业管理、组织行为、战略与运营类论文',
      en: 'Useful for organizational behavior, strategy, and operations papers',
    },
  },
  {
    slug: 'education',
    groupSlug: 'education-humanities',
    featured: true,
    title: { zh: '教育学', en: 'Education' },
    focus: { zh: '课堂教学与学习成效', en: 'teaching practice and learning outcomes' },
    evidence: {
      zh: '教学设计、课堂观察和问卷反馈',
      en: 'lesson plans, classroom observations, and survey feedback',
    },
    audience: {
      zh: '适合教学设计、课程改革、教育评价方向',
      en: 'Useful for curriculum reform, pedagogy, and education evaluation',
    },
  },
  {
    slug: 'finance',
    groupSlug: 'business-governance',
    featured: false,
    title: { zh: '金融学', en: 'Finance' },
    focus: {
      zh: '资本市场与公司财务决策',
      en: 'capital markets and corporate financial decisions',
    },
    evidence: {
      zh: '年报数据、财务指标和政策资料',
      en: 'annual reports, financial indicators, and policy materials',
    },
    audience: {
      zh: '适合资产定价、投融资与金融监管类选题',
      en: 'Useful for asset pricing, financing, and regulation topics',
    },
  },
  {
    slug: 'accounting',
    groupSlug: 'business-governance',
    featured: false,
    title: { zh: '会计学', en: 'Accounting' },
    focus: { zh: '财务披露与审计治理', en: 'financial disclosure and audit governance' },
    evidence: {
      zh: '财报披露、审计意见和公司治理数据',
      en: 'financial disclosures, audit opinions, and governance data',
    },
    audience: {
      zh: '适合财务披露、审计质量和治理研究',
      en: 'Useful for disclosure, audit quality, and governance studies',
    },
  },
  {
    slug: 'economics',
    groupSlug: 'business-governance',
    featured: true,
    title: { zh: '经济学', en: 'Economics' },
    focus: { zh: '政策效应与经济行为分析', en: 'policy effects and economic behavior' },
    evidence: {
      zh: '统计年鉴、微观样本和政策冲击数据',
      en: 'statistical yearbooks, micro-level samples, and policy-shock data',
    },
    audience: {
      zh: '适合区域经济、产业政策和实证分析类论文',
      en: 'Useful for regional economy, industrial policy, and empirical analysis',
    },
  },
  {
    slug: 'law',
    groupSlug: 'business-governance',
    featured: true,
    title: { zh: '法学', en: 'Law' },
    focus: { zh: '规范解释与司法适用', en: 'legal interpretation and judicial application' },
    evidence: {
      zh: '法条、裁判文书和司法解释',
      en: 'statutes, judicial cases, and legal interpretations',
    },
    audience: {
      zh: '适合法条解释、案例比较和制度演进研究',
      en: 'Useful for doctrinal analysis, case comparison, and institutional change',
    },
  },
  {
    slug: 'chinese-literature',
    groupSlug: 'education-humanities',
    featured: false,
    title: { zh: '汉语言文学', en: 'Chinese Literature' },
    focus: { zh: '文本细读与文学史脉络', en: 'close reading and literary history' },
    evidence: {
      zh: '作品文本、评论资料和历史语境材料',
      en: 'primary texts, critical essays, and historical context materials',
    },
    audience: {
      zh: '适合作品分析、文学思潮和文本阐释类论文',
      en: 'Useful for textual analysis, literary trends, and interpretation',
    },
  },
  {
    slug: 'journalism',
    groupSlug: 'education-humanities',
    featured: false,
    title: { zh: '新闻传播', en: 'Journalism and Communication' },
    focus: { zh: '媒介内容与传播效果', en: 'media content and communication effects' },
    evidence: {
      zh: '媒体文本、平台数据和受众反馈',
      en: 'media texts, platform data, and audience feedback',
    },
    audience: {
      zh: '适合媒介内容分析、平台传播和传播效果研究',
      en: 'Useful for media analysis, platform studies, and communication effects',
    },
  },
  {
    slug: 'linguistics',
    groupSlug: 'education-humanities',
    featured: false,
    title: { zh: '英语语言学', en: 'Linguistics' },
    focus: { zh: '语言使用与语料分析', en: 'language use and corpus analysis' },
    evidence: {
      zh: '语料库样本、访谈材料和课堂语料',
      en: 'corpus samples, interviews, and classroom language data',
    },
    audience: {
      zh: '适合语料分析、二语习得和课堂语言研究',
      en: 'Useful for corpus studies, second-language acquisition, and classroom discourse',
    },
  },
  {
    slug: 'sociology',
    groupSlug: 'social-behavior',
    featured: false,
    title: { zh: '社会学', en: 'Sociology' },
    focus: { zh: '社会结构与群体行为', en: 'social structure and group behavior' },
    evidence: {
      zh: '访谈、观察记录和调查数据',
      en: 'interviews, observation notes, and survey data',
    },
    audience: {
      zh: '适合群体研究、社区观察和社会问题分析',
      en: 'Useful for group studies, community observation, and social issue analysis',
    },
  },
  {
    slug: 'psychology',
    groupSlug: 'social-behavior',
    featured: true,
    title: { zh: '心理学', en: 'Psychology' },
    focus: { zh: '心理机制与行为反应', en: 'psychological mechanisms and behavioral responses' },
    evidence: {
      zh: '量表数据、实验设计和受试者反馈',
      en: 'scale data, experiment designs, and participant feedback',
    },
    audience: {
      zh: '适合实验研究、量表分析和行为机制解释',
      en: 'Useful for experiments, scale-based studies, and behavioral mechanisms',
    },
  },
  {
    slug: 'public-administration',
    groupSlug: 'business-governance',
    featured: false,
    title: { zh: '公共管理', en: 'Public Administration' },
    focus: { zh: '政策执行与治理绩效', en: 'policy implementation and governance performance' },
    evidence: {
      zh: '政策文本、案例访谈和治理指标',
      en: 'policy documents, case interviews, and governance indicators',
    },
    audience: {
      zh: '适合政策执行、公共服务和治理绩效论文',
      en: 'Useful for policy execution, public service, and governance studies',
    },
  },
  {
    slug: 'computer-science',
    groupSlug: 'computing-data',
    featured: true,
    title: { zh: '计算机科学', en: 'Computer Science' },
    focus: { zh: '算法设计与系统实现', en: 'algorithm design and system implementation' },
    evidence: {
      zh: '数据集、模型实验结果和系统日志',
      en: 'datasets, model results, and system logs',
    },
    audience: {
      zh: '适合算法、系统、网络与实验型论文',
      en: 'Useful for algorithm, systems, network, and experiment-driven papers',
    },
  },
  {
    slug: 'software-engineering',
    groupSlug: 'computing-data',
    featured: false,
    title: { zh: '软件工程', en: 'Software Engineering' },
    focus: {
      zh: '需求分析与工程质量控制',
      en: 'requirements analysis and engineering quality control',
    },
    evidence: {
      zh: '需求文档、项目数据和测试结果',
      en: 'requirement documents, project data, and test results',
    },
    audience: {
      zh: '适合需求分析、项目管理和软件质量方向',
      en: 'Useful for requirements, project management, and software quality topics',
    },
  },
  {
    slug: 'artificial-intelligence',
    groupSlug: 'computing-data',
    featured: true,
    title: { zh: '人工智能', en: 'Artificial Intelligence' },
    focus: { zh: '模型训练与任务优化', en: 'model training and task optimization' },
    evidence: {
      zh: '训练数据、实验对比和评估指标',
      en: 'training data, experiment comparisons, and evaluation metrics',
    },
    audience: {
      zh: '适合模型实验、任务优化和 AI 应用研究',
      en: 'Useful for model experiments, task optimization, and AI applications',
    },
  },
  {
    slug: 'data-science',
    groupSlug: 'computing-data',
    featured: false,
    title: { zh: '数据科学', en: 'Data Science' },
    focus: { zh: '数据处理与预测分析', en: 'data processing and predictive analysis' },
    evidence: {
      zh: '数据清洗记录、特征工程和模型评估结果',
      en: 'data-cleaning logs, feature engineering, and model evaluations',
    },
    audience: {
      zh: '适合数据挖掘、预测建模和分析流程研究',
      en: 'Useful for data mining, predictive modeling, and analytics workflows',
    },
  },
  {
    slug: 'electronic-information',
    groupSlug: 'engineering',
    featured: false,
    title: { zh: '电子信息工程', en: 'Electronic Information Engineering' },
    focus: { zh: '电路系统与信号处理', en: 'circuit systems and signal processing' },
    evidence: {
      zh: '电路测试结果、仿真数据和实验记录',
      en: 'circuit test results, simulation data, and lab records',
    },
    audience: {
      zh: '适合通信、信号、电路与嵌入式方向',
      en: 'Useful for communication, signal, circuit, and embedded-system projects',
    },
  },
  {
    slug: 'mechanical-engineering',
    groupSlug: 'engineering',
    featured: false,
    title: { zh: '机械工程', en: 'Mechanical Engineering' },
    focus: { zh: '结构设计与性能验证', en: 'structural design and performance validation' },
    evidence: {
      zh: '结构参数、实验曲线和仿真结果',
      en: 'structural parameters, test curves, and simulation results',
    },
    audience: {
      zh: '适合结构设计、制造工艺和性能验证论文',
      en: 'Useful for structural design, manufacturing, and performance validation',
    },
  },
  {
    slug: 'civil-engineering',
    groupSlug: 'engineering',
    featured: false,
    title: { zh: '土木工程', en: 'Civil Engineering' },
    focus: { zh: '工程结构与施工管理', en: 'engineering structures and construction management' },
    evidence: {
      zh: '工程案例、监测数据和规范要求',
      en: 'project cases, monitoring data, and code requirements',
    },
    audience: {
      zh: '适合结构、施工、工程管理和监测分析',
      en: 'Useful for structure, construction, and engineering management topics',
    },
  },
  {
    slug: 'materials-engineering',
    groupSlug: 'engineering',
    featured: false,
    title: { zh: '材料工程', en: 'Materials Engineering' },
    focus: {
      zh: '材料制备与性能表征',
      en: 'material preparation and performance characterization',
    },
    evidence: {
      zh: '实验表征、测试曲线和材料参数',
      en: 'characterization results, test curves, and material parameters',
    },
    audience: {
      zh: '适合材料制备、表征和性能机制研究',
      en: 'Useful for material preparation, characterization, and mechanism studies',
    },
  },
  {
    slug: 'environmental-engineering',
    groupSlug: 'engineering',
    featured: false,
    title: { zh: '环境工程', en: 'Environmental Engineering' },
    focus: { zh: '污染治理与环境监测', en: 'pollution control and environmental monitoring' },
    evidence: {
      zh: '监测数据、处理流程和排放指标',
      en: 'monitoring data, process records, and emission indicators',
    },
    audience: {
      zh: '适合环境治理、监测评价和工艺优化选题',
      en: 'Useful for pollution control, monitoring, and process optimization topics',
    },
  },
  {
    slug: 'pharmacy',
    groupSlug: 'health-life',
    featured: false,
    title: { zh: '药学', en: 'Pharmacy' },
    focus: { zh: '药物评价与实验验证', en: 'drug evaluation and laboratory validation' },
    evidence: {
      zh: '实验记录、文献证据和药效评价',
      en: 'lab records, literature evidence, and efficacy evaluations',
    },
    audience: {
      zh: '适合药物评价、实验验证和药学机制研究',
      en: 'Useful for drug evaluation, validation, and pharmacological studies',
    },
  },
  {
    slug: 'nursing',
    groupSlug: 'health-life',
    featured: true,
    title: { zh: '护理学', en: 'Nursing' },
    focus: { zh: '护理干预与临床实践', en: 'nursing interventions and clinical practice' },
    evidence: {
      zh: '问卷、访谈和临床观察记录',
      en: 'questionnaires, interviews, and clinical observation notes',
    },
    audience: {
      zh: '适合临床护理、患者体验和护理干预论文',
      en: 'Useful for clinical nursing, patient experience, and intervention papers',
    },
  },
  {
    slug: 'biology',
    groupSlug: 'health-life',
    featured: false,
    title: { zh: '生物科学', en: 'Biological Sciences' },
    focus: { zh: '生物过程与实验机制', en: 'biological processes and experimental mechanisms' },
    evidence: {
      zh: '实验数据、文献综述和结果图谱',
      en: 'experimental data, literature reviews, and result figures',
    },
    audience: {
      zh: '适合实验机制、生命过程和结果图谱类论文',
      en: 'Useful for mechanism studies, biological processes, and result-heavy papers',
    },
  },
  {
    slug: 'design-studies',
    groupSlug: 'design-creative',
    featured: true,
    title: { zh: '设计学', en: 'Design Studies' },
    focus: { zh: '设计策略与用户体验', en: 'design strategy and user experience' },
    evidence: {
      zh: '用户访谈、作品分析和场景测试',
      en: 'user interviews, portfolio analysis, and scenario testing',
    },
    audience: {
      zh: '适合用户研究、设计策略和作品分析型论文',
      en: 'Useful for user research, design strategy, and portfolio-backed studies',
    },
  },
] as const

export const featuredSubjectDisciplines = subjectDisciplines.filter(
  (discipline) => discipline.featured,
)

const subjectDisciplineSlugs = subjectDisciplines
  .map((discipline) => discipline.slug)
  .sort((left, right) => right.length - left.length)

export const getSubjectPath = (slug: string) => `/posts/subject/${slug}`

export const getCanonicalSubjectDisciplineSlug = (slug: string | null | undefined) => {
  if (!slug) return null

  return (
    subjectDisciplineSlugs.find(
      (disciplineSlug) => slug === disciplineSlug || slug.startsWith(`${disciplineSlug}-`),
    ) ?? slug
  )
}

export const isSubjectDisciplineMatch = (
  candidateSlug: string | null | undefined,
  subjectSlug: string | null | undefined,
) => {
  const canonicalCandidate = getCanonicalSubjectDisciplineSlug(candidateSlug)
  const canonicalSubject = getCanonicalSubjectDisciplineSlug(subjectSlug)

  return Boolean(canonicalCandidate && canonicalSubject && canonicalCandidate === canonicalSubject)
}

export const getSubjectDiscipline = (slug: string | null | undefined) => {
  const canonicalSlug = getCanonicalSubjectDisciplineSlug(slug)

  return subjectDisciplines.find((discipline) => discipline.slug === canonicalSlug)
}

export const getSubjectGroup = (slug: SubjectGroupSlug | string | null | undefined) => {
  return subjectGroups.find((group) => group.slug === slug)
}

export const getSubjectGroupRecommendations = (discipline: SubjectDiscipline) => {
  const group = getSubjectGroup(discipline.groupSlug)

  if (!group) return []

  return group.recommendedCategorySlugs
    .map((categorySlug) => getAudienceCategory(categorySlug))
    .filter((category): category is NonNullable<typeof category> => Boolean(category))
}

export const getSubjectOverview = (discipline: SubjectDiscipline, locale: SiteLocale) => {
  return locale === 'en'
    ? `${discipline.title.en} guidance focused on ${discipline.focus.en}, with practical routes for working through ${discipline.evidence.en}.`
    : `围绕 ${discipline.focus.zh} 展开，整理更适合 ${discipline.title.zh} 论文的写作路线，并重点处理 ${discipline.evidence.zh} 这类材料如何进入正文。`
}

export const getSubjectHotQuestions = (discipline: SubjectDiscipline, locale: SiteLocale) => {
  return [
    {
      question:
        locale === 'en'
          ? `How do I narrow a ${discipline.title.en} topic before it becomes too large to finish?`
          : `${discipline.title.zh}题目怎么在开题前压到真正做得完？`,
      stageSlug: 'proposal',
    },
    {
      question:
        locale === 'en'
          ? `What counts as the core literature when writing a ${discipline.title.en} review?`
          : `写${discipline.title.zh}综述时，哪些文献和争议算真正要先抓的核心内容？`,
      stageSlug: 'literature-review',
    },
    {
      question:
        locale === 'en'
          ? `How can ${discipline.evidence.en} become an evidence chain strong enough for analysis?`
          : `${discipline.evidence.zh}怎么转成能支撑结论的证据链？`,
      stageSlug: 'methods-analysis',
    },
    {
      question:
        locale === 'en'
          ? `What is the most common challenge in defense or submission for a ${discipline.title.en} paper?`
          : `${discipline.title.zh}论文在答辩或投稿前最容易被追问什么？`,
      stageSlug: 'revision-defense',
    },
  ] satisfies {
    question: string
    stageSlug: PostStageSlug
  }[]
}

export const getSubjectStageDescription = (
  discipline: SubjectDiscipline,
  stageSlug: PostStageSlug,
  locale: SiteLocale,
) => {
  const copy = {
    proposal:
      locale === 'en'
        ? `Start here if the topic still sounds larger than the ${discipline.evidence.en} you can realistically access.`
        : `如果题目承诺已经大过你眼下能稳定拿到的 ${discipline.evidence.zh}，就先从这一阶段开始收题。`,
    'literature-review':
      locale === 'en'
        ? `Use this stage to sort the most important debates, frameworks, and source lines in ${discipline.title.en}.`
        : `这一阶段重点是把 ${discipline.title.zh} 领域里最重要的争议线、框架和核心来源先理清。`,
    'methods-analysis':
      locale === 'en'
        ? `Read these pieces when you need to turn ${discipline.evidence.en} into a defensible analytical path.`
        : `当你要把 ${discipline.evidence.zh} 变成真正可支撑判断的分析路径时，优先看这一阶段。`,
    'revision-defense':
      locale === 'en'
        ? `Keep this stage for tightening the draft, preparing the defense, or aligning the manuscript for future submission.`
        : `这一阶段更适合收紧全文、准备答辩，或者提前把稿件往后续投稿的要求上对齐。`,
  } satisfies Record<PostStageSlug, string>

  return copy[stageSlug]
}
