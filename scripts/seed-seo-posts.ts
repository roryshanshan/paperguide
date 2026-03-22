import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import configPromise from '../src/payload.config'
import { getPayload } from 'payload'

type DegreeConfig = {
  categorySlug: string
  labelEn: string
  labelZh: string
  readerEn: string
  readerZh: string
  slug: string
  standardEn: string
  standardZh: string
}

type DisciplineConfig = {
  evidenceEn: string
  evidenceZh: string
  focusEn: string
  focusZh: string
  slug: string
  titleEn: string
  titleZh: string
}

type StageConfig = {
  slug: string
  titleEn: string
  titleZh: string
}

type GeneratedPost = {
  categorySlug: string
  contentEn: ReturnType<typeof createRichText>
  contentZh: ReturnType<typeof createRichText>
  degreeSlug: string
  disciplineSlug: string
  imageFilename: string
  metaDescriptionEn: string
  metaDescriptionZh: string
  metaTitleEn: string
  metaTitleZh: string
  publishedAt: string
  slug: string
  stageSlug: string
  titleEn: string
  titleZh: string
}

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)
const projectRoot = path.resolve(dirname, '..')

const degrees: DegreeConfig[] = [
  {
    slug: 'undergraduate',
    categorySlug: 'undergraduate-thesis',
    labelZh: '本科论文',
    labelEn: 'Undergraduate Thesis',
    readerZh: '本科生',
    readerEn: 'undergraduate students',
    standardZh: '重点是把题目做窄、把结构搭稳，并把基础学术规范真正落实到正文里。',
    standardEn:
      'The priority is to narrow the topic, stabilize the structure, and handle the core academic conventions cleanly.',
  },
  {
    slug: 'masters',
    categorySlug: 'masters-thesis',
    labelZh: '研究生论文',
    labelEn: "Master's Thesis",
    readerZh: '研究生',
    readerEn: "master's students",
    standardZh: '重点是让理论、方法、数据和分析链条彼此对齐，避免只有材料没有论证。',
    standardEn:
      'The main task is to align theory, methods, data, and argument so the paper is analytical rather than merely descriptive.',
  },
  {
    slug: 'doctoral',
    categorySlug: 'doctoral-thesis',
    labelZh: '博士论文',
    labelEn: 'PhD Thesis',
    readerZh: '博士生',
    readerEn: 'doctoral students',
    standardZh: '重点是凸显原创性、研究贡献和论证深度，让每一章都服务于核心命题。',
    standardEn:
      'The core standard is originality, contribution, and argumentative depth, with every chapter serving the central claim.',
  },
]

const disciplines: DisciplineConfig[] = [
  {
    slug: 'management',
    titleZh: '管理学',
    titleEn: 'Management',
    focusZh: '组织管理与绩效改进',
    focusEn: 'organizational management and performance improvement',
    evidenceZh: '企业案例、访谈记录和制度文件',
    evidenceEn: 'company cases, interview records, and policy documents',
  },
  {
    slug: 'education',
    titleZh: '教育学',
    titleEn: 'Education',
    focusZh: '课堂教学与学习成效',
    focusEn: 'teaching practice and learning outcomes',
    evidenceZh: '教学设计、课堂观察和问卷反馈',
    evidenceEn: 'lesson plans, classroom observations, and survey feedback',
  },
  {
    slug: 'finance',
    titleZh: '金融学',
    titleEn: 'Finance',
    focusZh: '资本市场与公司财务决策',
    focusEn: 'capital markets and corporate financial decisions',
    evidenceZh: '年报数据、财务指标和政策资料',
    evidenceEn: 'annual reports, financial indicators, and policy materials',
  },
  {
    slug: 'accounting',
    titleZh: '会计学',
    titleEn: 'Accounting',
    focusZh: '财务披露与审计治理',
    focusEn: 'financial disclosure and audit governance',
    evidenceZh: '财报披露、审计意见和公司治理数据',
    evidenceEn: 'financial disclosures, audit opinions, and governance data',
  },
  {
    slug: 'economics',
    titleZh: '经济学',
    titleEn: 'Economics',
    focusZh: '政策效应与经济行为分析',
    focusEn: 'policy effects and economic behavior',
    evidenceZh: '统计年鉴、微观样本和政策冲击数据',
    evidenceEn: 'statistical yearbooks, micro-level samples, and policy-shock data',
  },
  {
    slug: 'law',
    titleZh: '法学',
    titleEn: 'Law',
    focusZh: '规范解释与司法适用',
    focusEn: 'legal interpretation and judicial application',
    evidenceZh: '法条、裁判文书和司法解释',
    evidenceEn: 'statutes, judicial cases, and legal interpretations',
  },
  {
    slug: 'chinese-literature',
    titleZh: '汉语言文学',
    titleEn: 'Chinese Literature',
    focusZh: '文本细读与文学史脉络',
    focusEn: 'close reading and literary history',
    evidenceZh: '作品文本、评论资料和历史语境材料',
    evidenceEn: 'primary texts, critical essays, and historical context materials',
  },
  {
    slug: 'journalism',
    titleZh: '新闻传播',
    titleEn: 'Journalism and Communication',
    focusZh: '媒介内容与传播效果',
    focusEn: 'media content and communication effects',
    evidenceZh: '媒体文本、平台数据和受众反馈',
    evidenceEn: 'media texts, platform data, and audience feedback',
  },
  {
    slug: 'linguistics',
    titleZh: '英语语言学',
    titleEn: 'Linguistics',
    focusZh: '语言使用与语料分析',
    focusEn: 'language use and corpus analysis',
    evidenceZh: '语料库样本、访谈材料和课堂语料',
    evidenceEn: 'corpus samples, interviews, and classroom language data',
  },
  {
    slug: 'sociology',
    titleZh: '社会学',
    titleEn: 'Sociology',
    focusZh: '社会结构与群体行为',
    focusEn: 'social structure and group behavior',
    evidenceZh: '访谈、观察记录和调查数据',
    evidenceEn: 'interviews, observation notes, and survey data',
  },
  {
    slug: 'psychology',
    titleZh: '心理学',
    titleEn: 'Psychology',
    focusZh: '心理机制与行为反应',
    focusEn: 'psychological mechanisms and behavioral responses',
    evidenceZh: '量表数据、实验设计和受试者反馈',
    evidenceEn: 'scale data, experiment designs, and participant feedback',
  },
  {
    slug: 'public-administration',
    titleZh: '公共管理',
    titleEn: 'Public Administration',
    focusZh: '政策执行与治理绩效',
    focusEn: 'policy implementation and governance performance',
    evidenceZh: '政策文本、案例访谈和治理指标',
    evidenceEn: 'policy documents, case interviews, and governance indicators',
  },
  {
    slug: 'computer-science',
    titleZh: '计算机科学',
    titleEn: 'Computer Science',
    focusZh: '算法设计与系统实现',
    focusEn: 'algorithm design and system implementation',
    evidenceZh: '数据集、模型实验结果和系统日志',
    evidenceEn: 'datasets, model results, and system logs',
  },
  {
    slug: 'software-engineering',
    titleZh: '软件工程',
    titleEn: 'Software Engineering',
    focusZh: '需求分析与工程质量控制',
    focusEn: 'requirements analysis and engineering quality control',
    evidenceZh: '需求文档、项目数据和测试结果',
    evidenceEn: 'requirement documents, project data, and test results',
  },
  {
    slug: 'artificial-intelligence',
    titleZh: '人工智能',
    titleEn: 'Artificial Intelligence',
    focusZh: '模型训练与任务优化',
    focusEn: 'model training and task optimization',
    evidenceZh: '训练数据、实验对比和评估指标',
    evidenceEn: 'training data, experiment comparisons, and evaluation metrics',
  },
  {
    slug: 'data-science',
    titleZh: '数据科学',
    titleEn: 'Data Science',
    focusZh: '数据处理与预测分析',
    focusEn: 'data processing and predictive analysis',
    evidenceZh: '数据清洗记录、特征工程和模型评估结果',
    evidenceEn: 'data-cleaning logs, feature engineering, and model evaluations',
  },
  {
    slug: 'electronic-information',
    titleZh: '电子信息工程',
    titleEn: 'Electronic Information Engineering',
    focusZh: '电路系统与信号处理',
    focusEn: 'circuit systems and signal processing',
    evidenceZh: '电路测试结果、仿真数据和实验记录',
    evidenceEn: 'circuit test results, simulation data, and lab records',
  },
  {
    slug: 'mechanical-engineering',
    titleZh: '机械工程',
    titleEn: 'Mechanical Engineering',
    focusZh: '结构设计与性能验证',
    focusEn: 'structural design and performance validation',
    evidenceZh: '结构参数、实验曲线和仿真结果',
    evidenceEn: 'structural parameters, test curves, and simulation results',
  },
  {
    slug: 'civil-engineering',
    titleZh: '土木工程',
    titleEn: 'Civil Engineering',
    focusZh: '工程结构与施工管理',
    focusEn: 'engineering structures and construction management',
    evidenceZh: '工程案例、监测数据和规范要求',
    evidenceEn: 'project cases, monitoring data, and code requirements',
  },
  {
    slug: 'materials-engineering',
    titleZh: '材料工程',
    titleEn: 'Materials Engineering',
    focusZh: '材料制备与性能表征',
    focusEn: 'material preparation and performance characterization',
    evidenceZh: '实验表征、测试曲线和材料参数',
    evidenceEn: 'characterization results, test curves, and material parameters',
  },
  {
    slug: 'environmental-engineering',
    titleZh: '环境工程',
    titleEn: 'Environmental Engineering',
    focusZh: '污染治理与环境监测',
    focusEn: 'pollution control and environmental monitoring',
    evidenceZh: '监测数据、处理流程和排放指标',
    evidenceEn: 'monitoring data, process records, and emission indicators',
  },
  {
    slug: 'pharmacy',
    titleZh: '药学',
    titleEn: 'Pharmacy',
    focusZh: '药物评价与实验验证',
    focusEn: 'drug evaluation and laboratory validation',
    evidenceZh: '实验记录、文献证据和药效评价',
    evidenceEn: 'lab records, literature evidence, and efficacy evaluations',
  },
  {
    slug: 'nursing',
    titleZh: '护理学',
    titleEn: 'Nursing',
    focusZh: '护理干预与临床实践',
    focusEn: 'nursing interventions and clinical practice',
    evidenceZh: '问卷、访谈和临床观察记录',
    evidenceEn: 'questionnaires, interviews, and clinical observation notes',
  },
  {
    slug: 'biology',
    titleZh: '生物科学',
    titleEn: 'Biological Sciences',
    focusZh: '生物过程与实验机制',
    focusEn: 'biological processes and experimental mechanisms',
    evidenceZh: '实验数据、文献综述和结果图谱',
    evidenceEn: 'experimental data, literature reviews, and result figures',
  },
  {
    slug: 'design-studies',
    titleZh: '设计学',
    titleEn: 'Design Studies',
    focusZh: '设计策略与用户体验',
    focusEn: 'design strategy and user experience',
    evidenceZh: '用户访谈、作品分析和场景测试',
    evidenceEn: 'user interviews, portfolio analysis, and scenario testing',
  },
]

const stages: StageConfig[] = [
  {
    slug: 'proposal',
    titleZh: '选题与开题',
    titleEn: 'Topic Selection and Proposal',
  },
  {
    slug: 'literature-review',
    titleZh: '文献综述与理论框架',
    titleEn: 'Literature Review and Theoretical Framework',
  },
  {
    slug: 'methods-analysis',
    titleZh: '研究方法与数据分析',
    titleEn: 'Methodology and Data Analysis',
  },
  {
    slug: 'revision-defense',
    titleZh: '修改定稿与答辩',
    titleEn: 'Revision, Final Draft, and Defense',
  },
]

const categoryLocaleLabels: Record<string, { en: string; zh: string }> = {
  'undergraduate-thesis': { zh: '本科论文', en: 'Undergraduate Thesis' },
  'masters-thesis': { zh: '研究生论文', en: "Master's Thesis" },
  'doctoral-thesis': { zh: '博士论文', en: 'PhD Thesis' },
}

const mediaAltText: Record<string, string> = {
  'paperbridge-defense-revision.webp': 'PaperBridge thesis revision desk scene',
  'paperbridge-doctoral-review.webp': 'PaperBridge doctoral thesis review workspace',
  'paperbridge-masters-planning.webp': 'PaperBridge thesis planning notebook and laptop',
  'paperbridge-methods-data.webp': 'PaperBridge research methods and data analysis workspace',
}

const createTextNode = (text: string) => ({
  type: 'text' as const,
  detail: 0,
  format: 0,
  mode: 'normal' as const,
  style: '',
  text,
  version: 1,
})

const createParagraph = (text: string) => ({
  type: 'paragraph' as const,
  children: [createTextNode(text)],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  textFormat: 0,
  version: 1,
})

const createHeading = (text: string, tag: 'h2' | 'h3' = 'h2') => ({
  type: 'heading' as const,
  children: [createTextNode(text)],
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  tag,
  version: 1,
})

function createRichText(
  children: Array<ReturnType<typeof createParagraph> | ReturnType<typeof createHeading>>,
) {
  return {
    root: {
      type: 'root' as const,
      children,
      direction: 'ltr' as const,
      format: '' as const,
      indent: 0,
      version: 1,
    },
  }
}

function resolveImageFilename(degree: DegreeConfig, stage: StageConfig): string {
  if (stage.slug === 'proposal') return 'paperbridge-masters-planning.webp'
  if (stage.slug === 'literature-review') return 'paperbridge-methods-data.webp'
  if (stage.slug === 'revision-defense') return 'paperbridge-defense-revision.webp'
  if (degree.slug === 'doctoral') return 'paperbridge-doctoral-review.webp'
  return 'paperbridge-methods-data.webp'
}

type ThemeArgs = {
  degree: DegreeConfig
  discipline: DisciplineConfig
}

type ContentTheme = {
  closeEn: (args: ThemeArgs) => string
  closeZh: (args: ThemeArgs) => string
  introEn: (args: ThemeArgs) => string
  introZh: (args: ThemeArgs) => string
  riskEn: (args: ThemeArgs) => string
  riskZh: (args: ThemeArgs) => string
  stepsEn: (args: ThemeArgs) => [string, string, string]
  stepsZh: (args: ThemeArgs) => [string, string, string]
  strategyEn: (args: ThemeArgs) => string
  strategyZh: (args: ThemeArgs) => string
  titleEn: (args: ThemeArgs) => string
  titleZh: (args: ThemeArgs) => string
}

const proposalThemes: ContentTheme[] = [
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}开题别先堆背景：先把研究问题问对`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: fix the research question before you expand the background`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}写${discipline.titleZh}开题时，会先铺行业背景和研究意义，却迟迟说不清要解释什么现象、比较什么对象、凭什么判断结论。`,
    introEn: ({ degree, discipline }) =>
      `Many ${degree.readerEn} drafting a ${discipline.titleEn} proposal expand the background first and only later realize that the actual question is still vague.`,
    strategyZh: ({ discipline }) =>
      `更稳的做法，是先写出“研究对象 + 比较维度 + 场景边界”的问题句，再检查这句话后面能不能接上${discipline.evidenceZh}。`,
    strategyEn: ({ discipline }) =>
      `A stronger move is to write one direct question that already contains the object of study, the comparison dimension, and the scope, and then test whether it can be answered with ${discipline.evidenceEn}.`,
    stepsZh: () => [
      '先把题目缩到一个具体场景、群体、文本集合或案例区间。',
      '再把问题句改成“为什么”“如何”或“在何种条件下”这样的可回答问句。',
      '最后检查每个关键词后面是否都有证据路径，而不是停留在大词上。',
    ],
    stepsEn: () => [
      'Reduce the topic to a concrete context, population, text set, or case range.',
      'Turn the core sentence into a why, how, or under-what-conditions question.',
      'Check that every keyword points to an actual evidence path instead of a slogan.',
    ],
    riskZh: () =>
      '最常见的错误是题目像口号、问题像摘要、方法像装饰。只要问题没有问准，后面的文献和方法都会跟着发散。',
    riskEn: () =>
      'The common failure pattern is a title that sounds ambitious, a question that reads like a summary, and a method that never really connects back to the problem.',
    closeZh: ({ degree }) =>
      `开题里最值钱的一页，不是背景最长的一页，而是把问题问准的一页。这件事对${degree.readerZh}尤其重要。`,
    closeEn: ({ degree }) =>
      `The most valuable page in a proposal is not the longest background page but the page where the question becomes clear. That matters especially for ${degree.readerEn}.`,
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}选题过大怎么收：三步缩小论文范围`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: how to narrow an oversized thesis topic`,
    introZh: ({ degree, discipline }) =>
      `${degree.readerZh}做${discipline.titleZh}论文时，经常一开始就选了一个“看起来重要”的大题，但等到写目录时才发现对象太多、变量太散、材料根本收不完。`,
    introEn: ({ degree, discipline }) =>
      `${degree.readerEn} in ${discipline.titleEn} often choose a topic that sounds important and only later discover that the scope is too wide to manage.`,
    strategyZh: ({ discipline }) =>
      `缩范围不是删掉热度，而是把热度换成边界。最实用的边界通常来自时间、地区、样本类型和可稳定获得的${discipline.evidenceZh}。`,
    strategyEn: ({ discipline }) =>
      `Narrowing a topic does not mean losing relevance. It means replacing scale with boundaries such as time, geography, sample type, and reliable ${discipline.evidenceEn}.`,
    stepsZh: () => [
      '先删掉那些你暂时无法同时处理的对象、时期和比较维度。',
      '再只保留一个真正决定论文方向的变量、案例或问题场景。',
      '最后用一句话说明为什么缩到这个范围后，论文反而更有解释力。',
    ],
    stepsEn: () => [
      'Cut extra objects, periods, and comparison dimensions that you cannot handle together.',
      'Keep only one variable, case path, or problem scene that truly determines the paper.',
      'Explain why the narrower frame actually improves the explanatory power of the thesis.',
    ],
    riskZh: () =>
      '选题过大的直接后果，不是字数不够，而是目录永远在改、方法永远定不下来、写到中段就开始失速。',
    riskEn: () =>
      'An oversized topic usually leads to endless outline changes, unstable methods, and a manuscript that slows down halfway through.',
    closeZh: () => '范围收准之后，导师更容易给到具体反馈，你自己也更容易判断每一章到底该写什么。',
    closeEn: () =>
      'Once the scope is controlled, advisor feedback becomes more concrete and each chapter becomes easier to define.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}开题最难的不是题目，而是把主张写得可辩可证`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: make the main claim debatable and supportable`,
    introZh: ({ degree, discipline }) =>
      `不少${degree.readerZh}会把开题写成“我要介绍这个话题”的说明文，但${discipline.titleZh}论文真正需要的是一个可以被论证、也可能被反驳的主张。`,
    introEn: ({ degree, discipline }) =>
      `Many ${degree.readerEn} turn the proposal into a topic description, while a stronger ${discipline.titleEn} project needs a claim that can be argued for and challenged.`,
    strategyZh: ({ discipline }) =>
      `如果你的核心句里只有“重要”“必要”“值得关注”这类评价词，而没有与${discipline.evidenceZh}相连的判断标准，那么主张通常还没有立起来。`,
    strategyEn: ({ discipline }) =>
      `If the central sentence only says the topic is important without a standard that can be checked against ${discipline.evidenceEn}, the claim is still too soft.`,
    stepsZh: () => [
      '先把“我想写什么”改成“我准备证明什么”。',
      '再给这个主张配上两个最关键的支撑条件，而不是十个零散理由。',
      '最后检查反方最可能质疑的点，看看你的主张能不能扛住。',
    ],
    stepsEn: () => [
      'Turn “what I want to discuss” into “what I am trying to show.”',
      'Support the claim with two decisive conditions instead of ten scattered reasons.',
      'Test the sentence against the most likely counterargument before you move on.',
    ],
    riskZh: () => '如果主张永远停留在态度表态，论文后面就只能重复材料，无法形成真正的论证推进。',
    riskEn: () =>
      'If the claim remains a general position statement, the paper usually falls back into repeating materials instead of building an argument.',
    closeZh: () => '主张写硬一点，目录、文献和方法自然就会开始围着它转，而不是各写各的。',
    closeEn: () =>
      'Once the claim becomes sharper, the outline, literature, and methods start revolving around it instead of drifting apart.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}开题报告怎么排结构：不是六段堆满，而是顺着问题走`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: structure the proposal around the problem, not a checklist`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}知道开题报告要写背景、文献、方法和计划，但真正交出去的版本还是像拼装件，因为每一段都在说话，却没有共同服务一个问题。`,
    introEn: ({ degree, discipline }) =>
      `Many ${degree.readerEn} know the standard proposal sections, but the draft still feels assembled rather than argued because the sections do not serve one shared problem.`,
    strategyZh: ({ discipline }) =>
      `写${discipline.titleZh}开题时，更稳的顺序通常是：先提出问题，再交代为什么值得研究，接着说明别人做到哪里、你打算怎样用${discipline.evidenceZh}继续往前做。`,
    strategyEn: ({ discipline }) =>
      `In a ${discipline.titleEn} proposal, a better order is to name the problem first, explain why it matters, show where the literature stands, and then explain how ${discipline.evidenceEn} will move the study forward.`,
    stepsZh: () => [
      '先给每个部分写一句“这一段为主问题解决什么”。',
      '再删掉那些和主问题没有直接关系的背景、概念或案例。',
      '最后把方法和时间安排写成对前文问题的回应，而不是独立附件。',
    ],
    stepsEn: () => [
      'Write one sentence for what each section contributes to the central problem.',
      'Delete background material, concepts, or cases that do not directly support the question.',
      'Present the method and timeline as answers to the earlier sections rather than detached add-ons.',
    ],
    riskZh: () =>
      '最常见的问题不是少写一节，而是每节都完整却彼此不咬合，导师读完仍然不知道论文的核心路径。',
    riskEn: () =>
      'The common issue is not a missing section but a complete set of sections that still fail to connect into a recognizable research path.',
    closeZh: () => '开题结构一旦顺着问题走，导师的反馈也会更聚焦，不会只停留在“再具体一点”。',
    closeEn: () =>
      'Once the proposal follows the problem line, advisor feedback becomes more specific and more useful.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}开题前先定关键词：文献检索会决定你后面怎么写`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: build the keyword plan before the proposal`,
    introZh: ({ degree, discipline }) =>
      `开题总卡壳，有时不是思路不够，而是关键词太模糊。尤其是${discipline.titleZh}这种跨概念、跨场景的题目，检索词一旦太宽，文献就会越读越乱。`,
    introEn: ({ degree, discipline }) =>
      `Proposal work often stalls not because ideas are missing but because the keyword set is still too fuzzy. In ${discipline.titleEn}, vague search language quickly produces scattered reading.`,
    strategyZh: ({ discipline }) =>
      `真正有用的关键词方案，至少要同时包含核心概念、同义替换、对象限定和材料来源，这样你才能在${discipline.evidenceZh}周边稳定扩展阅读。`,
    strategyEn: ({ discipline }) =>
      `A useful keyword plan combines the core concept, synonyms, population or object limits, and source type so the search can stay anchored to ${discipline.evidenceEn}.`,
    stepsZh: () => [
      '先写出你题目里的三个核心词，并给每个词准备 2 到 3 个替代表达。',
      '再补上时间、地区、方法或对象限定词，让结果更贴近论文边界。',
      '最后记录哪些词真正搜到了高质量文献，哪些词只是制造噪音。',
    ],
    stepsEn: () => [
      'Write down three core terms from the topic and add two or three substitutes for each.',
      'Add time, region, method, or population filters so the search matches the thesis boundary.',
      'Track which terms lead to strong sources and which ones only create noise.',
    ],
    riskZh: () =>
      '如果检索词一直是大词，后面写文献综述时就会不断重复“看过很多但抓不住主线”的感觉。',
    riskEn: () =>
      'If the search language stays broad, the later literature review usually feels overloaded and directionless.',
    closeZh: () => '关键词不是检索前的小动作，而是开题能否扎实落地的第一道工序。',
    closeEn: () =>
      'Keyword planning is not a minor pre-search task. It is one of the first real foundations of a workable proposal.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}开题资料别乱堆：先做一张来源地图`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: map your source base before the proposal grows`,
    introZh: ({ degree, discipline }) =>
      `${degree.readerZh}写开题时最容易高估自己能拿到的材料，尤其是当${discipline.titleZh}项目既涉及理论，又需要${discipline.evidenceZh}时，资料入口一乱，整个计划就会虚。`,
    introEn: ({ degree, discipline }) =>
      `${degree.readerEn} often overestimate what materials will be available. In ${discipline.titleEn} projects that depend on both theory and ${discipline.evidenceEn}, a messy source base weakens the whole plan.`,
    strategyZh: ({ discipline }) =>
      `更稳的开题准备方式，是先把资料来源分成核心文献、支撑材料和补充案例三层，并提前判断哪一层最依赖${discipline.evidenceZh}。`,
    strategyEn: ({ discipline }) =>
      `A stronger preparation method is to separate the source base into core literature, supporting material, and supplementary cases, then identify which layer most depends on ${discipline.evidenceEn}.`,
    stepsZh: () => [
      '先列出论文真正离不开的 5 到 8 个关键来源。',
      '再给每类材料标记获取方式、更新时间和可靠性。',
      '最后把暂时拿不到的材料从主线里移出去，别让它拖住开题。 ',
    ],
    stepsEn: () => [
      'List the five to eight sources or material paths the paper truly cannot do without.',
      'Tag each source type with access route, update rhythm, and reliability.',
      'Move hard-to-access material out of the main line until it becomes realistic to obtain.',
    ],
    riskZh: () =>
      '最危险的情况不是资料少，而是你以为资料很多，等真正写作时才发现关键环节没有稳定来源。',
    riskEn: () =>
      'The real danger is not having too few sources. It is assuming the base is rich and only later discovering that the crucial materials are unstable or missing.',
    closeZh: () =>
      '来源地图做清楚之后，开题里的时间安排和方法说明才会像真的能执行，而不是纸面计划。',
    closeEn: () =>
      'Once the source map is clear, the timeline and method section start to look executable rather than merely optimistic.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}开题能不能过，先看样本和时间表够不够现实`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: check sample access and timeline before the proposal feels finished`,
    introZh: ({ degree, discipline }) =>
      `很多看上去写得不错的${discipline.titleZh}开题，真正被导师卡住的点并不是逻辑，而是样本拿不到、周期太短、任务拆分不现实。`,
    introEn: ({ degree, discipline }) =>
      `Many polished-looking ${discipline.titleEn} proposals are blocked not by logic but by sample access, short timelines, or unrealistic task planning.`,
    strategyZh: ({ discipline }) =>
      `如果你的研究必须依赖${discipline.evidenceZh}，那就应该把“怎么拿到、多久拿到、拿不到怎么办”写进开题，而不是默认一切顺利。`,
    strategyEn: ({ discipline }) =>
      `If the project depends on ${discipline.evidenceEn}, the proposal has to explain how that material will be obtained, when it will be available, and what the fallback path is.`,
    stepsZh: () => [
      '先把论文过程拆成检索、收集、分析、成稿和返修几个阶段。',
      '再给每个阶段标出最容易拖延的关键节点。',
      '最后设置一个备选样本或备选材料路径，避免研究因为单点失败停摆。',
    ],
    stepsEn: () => [
      'Break the project into search, collection, analysis, drafting, and revision stages.',
      'Mark the stage where delay is most likely to happen.',
      'Create one backup sample route or backup material path so the study does not collapse on a single dependency.',
    ],
    riskZh: () =>
      '论文计划最容易失真，不是因为你不努力，而是因为前期没有把时间和样本的风险摊开算。',
    riskEn: () =>
      'A thesis plan usually fails not because the student is lazy but because timing and sample risks were never calculated openly at the start.',
    closeZh: () => '一个现实的时间表，本身就是开题论证的一部分。',
    closeEn: () =>
      'A realistic timeline is part of the argument of the proposal, not just an appendix.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}研究价值怎么写：别空喊创新，先说明你补上了哪块空白`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: write the value of the study without empty innovation claims`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}在${discipline.titleZh}开题里都会写“具有理论意义和现实意义”，但如果你说不清到底补上了哪块空白，这句话几乎没有说服力。`,
    introEn: ({ degree, discipline }) =>
      `Many ${degree.readerEn} write that the project has theoretical and practical significance, but the sentence convinces no one if the gap still stays abstract.`,
    strategyZh: ({ discipline }) =>
      `研究价值更像一个“补位说明”：前人在哪个环节停住了，你打算用${discipline.evidenceZh}把哪个空缺补上，读者因此能多知道什么。`,
    strategyEn: ({ discipline }) =>
      `Research value works best as a gap statement: where the existing work stops, how ${discipline.evidenceEn} helps you extend it, and what readers learn because of that extension.`,
    stepsZh: () => [
      '先把前人已经回答得比较充分的部分和仍然薄弱的部分并列出来。',
      '再用一句话说明你的研究到底新增了哪一层解释、比较或证据。',
      '最后把研究价值写成结果导向，而不是写成态度导向。',
    ],
    stepsEn: () => [
      'Set the well-covered part of the literature next to the weak or missing part.',
      'State exactly what layer of explanation, comparison, or evidence your study adds.',
      'Write the value statement as an outcome claim rather than an attitude claim.',
    ],
    riskZh: () =>
      '最容易出问题的地方，是把“这个话题很重要”误当成“我的研究有价值”。这两句话不是一回事。',
    riskEn: () =>
      'The easiest mistake is to confuse “the topic is important” with “this particular study adds value.” They are not the same sentence.',
    closeZh: () => '开题里的研究价值写得越具体，后面做文献综述和结论时越不容易漂。',
    closeEn: () =>
      'The more concrete the value statement becomes in the proposal, the less likely the later review and conclusion sections are to drift.',
  },
]

const literatureReviewThemes: ContentTheme[] = [
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}文献矩阵怎么搭：别边读边忘，先把材料放进表里`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: build a literature matrix before the review gets messy`,
    introZh: ({ degree, discipline }) =>
      `${degree.readerZh}写${discipline.titleZh}文献综述时最常见的痛点，不是找不到文章，而是看过很多却记不住差别，最后综述只能按年份流水账地写。`,
    introEn: ({ degree, discipline }) =>
      `${degree.readerEn} working on a ${discipline.titleEn} review often do not struggle to find articles but to remember how the studies actually differ from one another.`,
    strategyZh: ({ discipline }) =>
      `文献矩阵最有用的列，不是“标题和作者”而是主题、方法、核心发现、不足，以及它和${discipline.evidenceZh}之间的关系。`,
    strategyEn: ({ discipline }) =>
      `The most useful columns in a literature matrix are not title and author but theme, method, central finding, limitation, and the relation to ${discipline.evidenceEn}.`,
    stepsZh: () => [
      '先只读最核心的 15 到 20 篇，把同类研究放进同一组。',
      '再给每组文献写一句共同发现和一句共同局限。',
      '最后让综述段落围绕这些比较句展开，而不是围绕单篇文章展开。',
    ],
    stepsEn: () => [
      'Start with the most central 15 to 20 sources and group similar studies together.',
      'Write one shared finding and one shared limitation for each group.',
      'Build review paragraphs around those comparison sentences rather than around single articles.',
    ],
    riskZh: () => '如果没有矩阵，文献综述就很容易被阅读顺序绑架，看完谁先出现，正文里就先写谁。',
    riskEn: () =>
      'Without a matrix, the review becomes hostage to reading order, which means the first article you read often gets written first for no good reason.',
    closeZh: () => '矩阵不是整理强迫症，而是把“读过很多”变成“能比较、能判断”的最短路径。',
    closeEn: () =>
      'A literature matrix is not busywork. It is one of the shortest routes from “I read a lot” to “I can compare and judge.”',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}综述卡住时，先重写关键词和检索式`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: rewrite the search language when the review stalls`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}以为文献综述写不下去是因为自己不会概括，其实问题常常更早，出在检索式太宽、关键词太单一。`,
    introEn: ({ degree, discipline }) =>
      `${degree.readerEn} often think the literature review is stuck because summary skills are weak, when the real problem is usually the search language itself.`,
    strategyZh: ({ discipline }) =>
      `如果你围绕${discipline.focusZh}只搜一个大词，文献集合就很难稳定。更有效的做法，是把关键词拆成核心概念、替代表达、对象限定和方法限定，并不断回看哪些词能真正靠近${discipline.evidenceZh}。`,
    strategyEn: ({ discipline }) =>
      `A review on ${discipline.focusEn} rarely stabilizes if you search with one broad term. Break the search into core concepts, synonyms, object limits, and method limits, then test which combinations actually lead toward ${discipline.evidenceEn}.`,
    stepsZh: () => [
      '先把题目里的大词换成 2 到 3 组可替代的小词。',
      '再把对象、地区、时间或方法加进检索式里，让结果更可控。',
      '最后记录哪些组合带来了高价值文献，形成可复用的检索笔记。',
    ],
    stepsEn: () => [
      'Translate each large term in the topic into two or three smaller alternatives.',
      'Add object, region, time, or method filters so the results become more controllable.',
      'Track which combinations produced high-value sources and keep that record for later searches.',
    ],
    riskZh: () => '如果检索式一直模糊，后面写综述时就会不断陷入“材料很多但彼此没关系”的疲劳感。',
    riskEn: () =>
      'When the search expression remains fuzzy, the review quickly turns into a pile of disconnected material that is hard to synthesize.',
    closeZh: () => '综述写不动时，先别急着写句子，先回到检索式。',
    closeEn: () =>
      'When the review stops moving, do not force more paragraphs first. Rework the search strategy.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}文献综述别只会摘要：你需要的是比较句`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: stop summarizing article by article and start comparing`,
    introZh: ({ degree, discipline }) =>
      `${degree.readerZh}写${discipline.titleZh}综述时，最容易把每篇文献各写一段，最后看起来资料很多，但真正的观点推进却很弱。`,
    introEn: ({ degree, discipline }) =>
      `${degree.readerEn} often write one paragraph per source in a ${discipline.titleEn} review, which creates volume but not much analytical movement.`,
    strategyZh: ({ discipline }) =>
      `综述更像在写“研究之间的关系”而不是“研究逐篇介绍”。尤其是当你的材料横跨${discipline.evidenceZh}时，比较句会比摘要句更能支撑判断。`,
    strategyEn: ({ discipline }) =>
      `A review is really about the relationships among studies rather than isolated source summaries. That matters even more when the material spans ${discipline.evidenceEn}.`,
    stepsZh: () => [
      '先找出两篇以上文献在观点、方法或结论上的相同点。',
      '再写出它们真正分歧的地方，而不是只写“还有其他研究”。',
      '最后让每段以一个判断句收尾，说明这组文献对你的论文意味着什么。',
    ],
    stepsEn: () => [
      'Identify where two or more studies align in method, claim, or result.',
      'Write the real point of disagreement instead of saying there are other studies.',
      'End each paragraph with one judgment sentence about what that cluster means for your thesis.',
    ],
    riskZh: () =>
      '如果整段都在复述别人说了什么，而没有写你怎么判断，综述就很难被看成真正的学术写作。',
    riskEn: () =>
      'If a paragraph only repeats what others said and never shows your judgment, the review rarely reads like real academic writing.',
    closeZh: () => '比较句一旦写出来，综述就不再只是阅读记录，而开始变成论证基础。',
    closeEn: () =>
      'Once comparison sentences appear, the review stops being a reading log and starts becoming argumentative infrastructure.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}理论框架怎么落地：别堆概念，先决定它帮你解释什么`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: use a theoretical framework to explain something specific`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}在${discipline.titleZh}综述里引用很多概念，但到了论文中段才发现这些概念彼此并不协同，最后框架像装饰，不像工具。`,
    introEn: ({ degree, discipline }) =>
      `${degree.readerEn} often collect too many concepts in a ${discipline.titleEn} review and later discover that the framework behaves more like decoration than an analytical tool.`,
    strategyZh: ({ discipline }) =>
      `理论框架最重要的问题，不是“这个理论大不大”，而是“它能不能帮助你解释${discipline.focusZh}里的某个具体难点，并和${discipline.evidenceZh}接起来”。`,
    strategyEn: ({ discipline }) =>
      `The crucial question about a framework is not whether it is famous or large, but whether it helps explain one concrete difficulty inside ${discipline.focusEn} and can connect to ${discipline.evidenceEn}.`,
    stepsZh: () => [
      '先只保留与你研究问题最贴近的 1 到 2 个核心概念。',
      '再明确每个概念在论文里负责解释什么，而不是泛泛出现。',
      '最后让方法和结果部分都能回扣这个框架，而不是只在综述里出现一次。',
    ],
    stepsEn: () => [
      'Keep only one or two concepts that are directly tied to the research question.',
      'Define exactly what each concept is expected to explain inside the thesis.',
      'Make sure the methods and results can still speak back to the framework later on.',
    ],
    riskZh: () => '最大的问题不是理论少，而是理论多到彼此打架，最后谁都没真正发挥解释力。',
    riskEn: () =>
      'The problem is rarely too little theory. It is usually too much theory fighting for attention and explaining nothing decisively.',
    closeZh: () => '理论框架一旦落到具体解释任务上，综述和正文之间就会建立更稳的桥。',
    closeEn: () =>
      'When the framework is tied to a specific explanatory task, the bridge between the review and the later chapters becomes much stronger.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}研究空白怎么找：不是硬说没人写，而是看谁还没写透`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: find a research gap without pretending no one has written on it`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}一提研究空白，就习惯写“国内外研究较少”或“尚未形成系统研究”，但导师通常更关心：到底哪一层没写透？`,
    introEn: ({ degree, discipline }) =>
      `${degree.readerEn} often describe the research gap as “few studies exist,” but advisors usually ask a sharper question: what exactly remains underexplained?`,
    strategyZh: ({ discipline }) =>
      `找空白更像在找断点。也许${discipline.titleZh}领域已经有很多研究，但在对象比较、方法组合、时间跨度或${discipline.evidenceZh}的使用上，仍然存在一段没有接上的地方。`,
    strategyEn: ({ discipline }) =>
      `Finding a gap is more like finding a break in the chain. ${discipline.titleEn} may already have many studies, but there can still be a break in comparison design, method mix, time scope, or the use of ${discipline.evidenceEn}.`,
    stepsZh: () => [
      '先区分“没人写过”和“有人写过但没有写透”。',
      '再用一句话指出前人具体停在了哪一层。',
      '最后把你的研究定义成对这个断点的推进，而不是对整个领域的重写。',
    ],
    stepsEn: () => [
      'Separate “no one has written on this” from “the topic exists but remains incomplete.”',
      'State the exact layer where the existing work stops.',
      'Define your project as an extension of that break rather than a rewrite of the whole field.',
    ],
    riskZh: () => '如果空白写得太空，研究价值就会一起变空，后面的结论也很难站住。',
    riskEn: () =>
      'If the gap stays vague, the value statement weakens with it and the conclusion later becomes harder to defend.',
    closeZh: () => '一个具体的空白，通常比一个巨大的口号更能让导师相信这篇论文值得写。',
    closeEn: () =>
      'A specific gap usually persuades far better than a huge declaration about the whole field.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}综述写不快，就先把注释和阅读笔记改成“可调用”`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: make your reading notes callable before you write faster`,
    introZh: ({ degree, discipline }) =>
      `不少${degree.readerZh}读${discipline.titleZh}文献时记了很多笔记，但真正写综述时却还是要回去重翻 PDF，因为笔记只记录了“内容”，没有记录“可怎么用”。`,
    introEn: ({ degree, discipline }) =>
      `${degree.readerEn} may keep a lot of notes on ${discipline.titleEn} sources and still have to reopen the PDFs while drafting because the notes captured content but not use.`,
    strategyZh: ({ discipline }) =>
      `可调用的笔记，至少要写清这篇文献能回答什么问题、用了什么方法、和${discipline.evidenceZh}有什么关系、后面适合放在哪一段里。`,
    strategyEn: ({ discipline }) =>
      `Callable notes should record what question a source answers, what method it uses, how it relates to ${discipline.evidenceEn}, and where it might be used later in the draft.`,
    stepsZh: () => [
      '先把纯摘抄型笔记改成“摘要 + 评价 + 用途”的三段格式。',
      '再给笔记打上主题标签，避免后面重新分类。',
      '最后每读完一组文献，都写一句可以直接进入正文的判断句。',
    ],
    stepsEn: () => [
      'Convert raw notes into a three-part pattern: summary, evaluation, and future use.',
      'Tag each note by theme so you do not need to classify everything again later.',
      'After each reading cluster, write one judgment sentence that could go straight into the review.',
    ],
    riskZh: () => '如果笔记永远只是摘录，综述写作就会一直停留在“重找材料”的低效率循环里。',
    riskEn: () =>
      'If the notes remain mere excerpts, the review stays trapped in the low-efficiency cycle of refinding material instead of writing with it.',
    closeZh: () => '笔记系统一旦能被调用，综述速度会明显提升，且更容易写出层次。',
    closeEn: () =>
      'Once the note system becomes callable, review writing usually speeds up and gains much better structure.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}什么时候该做系统综述，什么时候不用把自己逼进系统综述`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: when a systematic review approach helps and when it does not`,
    introZh: ({ degree, discipline }) =>
      `“要不要做系统综述”是很多${degree.readerZh}在${discipline.titleZh}写作里会遇到的焦虑点。不是所有综述都要走系统综述路线，但不是所有综述都能随意写。`,
    introEn: ({ degree, discipline }) =>
      `${degree.readerEn} in ${discipline.titleEn} often worry about whether a systematic review design is necessary. The answer is usually more nuanced than yes or no.`,
    strategyZh: ({ discipline }) =>
      `如果你的目标是透明说明检索范围、筛选标准和材料边界，那么系统综述思路会很有帮助；如果你的论文核心在于解释和建模，那么重点更可能是如何让${discipline.evidenceZh}形成清晰的论证链。`,
    strategyEn: ({ discipline }) =>
      `If the goal is transparent reporting of search range, inclusion criteria, and material boundaries, a systematic review logic can help. If the thesis is mainly interpretive, the stronger task may be to build a clear argument from ${discipline.evidenceEn}.`,
    stepsZh: () => [
      '先判断你需要的是“完整检索透明度”还是“针对问题的解释深度”。',
      '再决定是否要明确写出检索数据库、纳入标准和排除标准。',
      '最后让综述形式服务论文目标，而不是为了看起来规范就套一种形式。',
    ],
    stepsEn: () => [
      'Decide whether the project needs full search transparency or deeper problem-focused interpretation.',
      'Then choose whether database lists, inclusion rules, and exclusion rules need to be made explicit.',
      'Let the review form serve the thesis objective instead of forcing a format for appearance alone.',
    ],
    riskZh: () =>
      '最容易出错的地方，是把系统综述当作标签，而没有真正提供透明流程；或者明明不需要，却把自己困在过重的流程里。',
    riskEn: () =>
      'A common mistake is to claim a systematic approach without giving a transparent process, or to burden the project with an unnecessarily heavy review protocol.',
    closeZh: () => '综述形式选对了，后面的写作阻力会小很多。',
    closeEn: () =>
      'Choosing the right review form early usually removes a great deal of friction later in the project.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}数据库怎么选：不是搜得越多越好，而是搜得越准越好`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: choose databases for fit, not for maximum quantity`,
    introZh: ({ degree, discipline }) =>
      `${degree.readerZh}做${discipline.titleZh}综述时，常常一上来就把所有能想到的平台都搜一遍，结果却花了大量时间筛低质量结果。`,
    introEn: ({ degree, discipline }) =>
      `${degree.readerEn} often search every database they can think of for a ${discipline.titleEn} review and then spend most of the time screening weak results.`,
    strategyZh: ({ discipline }) =>
      `数据库选择要围绕问题类型和材料类型。如果论文核心依赖${discipline.evidenceZh}，就应该优先找最可能稳定收录这类材料的平台，而不是平台越多越安心。`,
    strategyEn: ({ discipline }) =>
      `Database choice should follow the question type and material type. If the thesis depends on ${discipline.evidenceEn}, prioritize the platforms most likely to index that material well instead of searching everywhere.`,
    stepsZh: () => [
      '先分清你需要的是理论文献、实证研究、案例资料还是方法论文。',
      '再给每类材料匹配 1 到 2 个主数据库，而不是无限扩展。',
      '最后把检索结果质量纳入判断，别只看结果数量。',
    ],
    stepsEn: () => [
      'Separate the need for theory papers, empirical studies, case materials, and methods papers.',
      'Match each material type to one or two lead databases rather than expanding without limit.',
      'Judge the search by source quality and fit instead of counting hits alone.',
    ],
    riskZh: () => '数据库选错，后面再怎么写综述都会有“资料总觉得缺关键东西”的隐性问题。',
    riskEn: () =>
      'When the database choice is off, the review often carries a hidden weakness because the key materials never fully entered the pool.',
    closeZh: () => '搜得准，比搜得广更能提升综述质量。',
    closeEn: () => 'Precision usually improves a review far more than endless expansion.',
  },
]

const methodsThemes: ContentTheme[] = [
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}方法和方法论别混着写：先说明你为什么这样研究`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: separate method from methodology before you write the chapter`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}写${discipline.titleZh}方法章节时，会把“问卷、访谈、案例分析”直接罗列出来，但没有先说明为什么这些方法适合自己的问题。`,
    introEn: ({ degree, discipline }) =>
      `${degree.readerEn} often list surveys, interviews, or case analysis in a ${discipline.titleEn} methods chapter without first explaining why those choices fit the question.`,
    strategyZh: ({ discipline }) =>
      `方法论更像“研究为什么这样设计”，方法才是具体动作。尤其当论文依赖${discipline.evidenceZh}时，你要先讲研究逻辑，再讲工具。`,
    strategyEn: ({ discipline }) =>
      `Methodology explains why the study is designed in a certain way, while methods describe the concrete actions. That distinction matters whenever the project relies on ${discipline.evidenceEn}.`,
    stepsZh: () => [
      '先用 2 到 3 句话说明研究问题决定了什么样的证据需求。',
      '再写清每一种方法具体负责解决哪个子问题。',
      '最后让数据来源、分析步骤和研究限制都回扣这个逻辑。',
    ],
    stepsEn: () => [
      'Use two or three sentences to explain how the research question determines the evidence need.',
      'State what sub-question each chosen method is expected to solve.',
      'Link the data source, analysis steps, and limits back to that logic.',
    ],
    riskZh: () => '最常见的问题是方法列表很长，但导师读完仍然不知道你为什么非得这样做。',
    riskEn: () =>
      'The common problem is a long method list that still leaves the reader unsure why those choices were necessary.',
    closeZh: () => '只要先把研究逻辑讲清，方法章节就不会再像模板拼接。',
    closeEn: () =>
      'Once the research logic is clear, the methods chapter stops feeling like a stitched template.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}访谈提纲怎么写：问题不是越多越好，而是越能引出证据越好`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: write an interview guide that elicits evidence instead of small talk`,
    introZh: ({ degree, discipline }) =>
      `需要访谈的${discipline.titleZh}论文，最容易出问题的地方不是“有没有提纲”，而是提纲问得太散，最后拿到的回答很难支持分析。`,
    introEn: ({ degree, discipline }) =>
      `In ${discipline.titleEn} projects that rely on interviews, the problem is often not the lack of an interview guide but a guide that produces unfocused answers.`,
    strategyZh: ({ discipline }) =>
      `好的访谈提纲不是聊天顺序表，而是围绕研究问题去追问${discipline.evidenceZh}里最关键的信息点。`,
    strategyEn: ({ discipline }) =>
      `A strong interview guide is not a conversation script. It is a route toward the most decisive pieces of ${discipline.evidenceEn} needed by the research question.`,
    stepsZh: () => [
      '先把研究问题拆成几个必须通过访谈才能回答的子问题。',
      '再为每个子问题设计一个主问题和一个追问方向。',
      '最后删掉那些听起来礼貌、实际上不产生分析价值的问题。',
    ],
    stepsEn: () => [
      'Break the research question into the sub-questions that only interviews can answer.',
      'Design one lead question and one follow-up direction for each sub-question.',
      'Delete polite but analytically weak prompts that do not generate useful material.',
    ],
    riskZh: () => '如果提纲只是泛泛聊天，访谈做得再多，后面也很难形成高质量编码和论证。',
    riskEn: () =>
      'If the guide stays generic, even a large number of interviews will struggle to support strong coding and analysis later.',
    closeZh: () => '访谈提纲一旦围着证据点来写，后面的整理和编码会轻松很多。',
    closeEn: () =>
      'Once the interview guide is built around evidence points, transcription, coding, and later interpretation become much easier.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}问卷设计别只会堆题：先想清你要测什么`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: design the survey around what must be measured`,
    introZh: ({ degree, discipline }) =>
      `${degree.readerZh}做${discipline.titleZh}问卷时，最容易把问卷写成“想到什么问什么”，结果回收了一批数据，却发现核心变量并没有被稳定测到。`,
    introEn: ({ degree, discipline }) =>
      `${degree.readerEn} designing a ${discipline.titleEn} survey often ask whatever comes to mind and later discover that the central variables were never measured clearly.`,
    strategyZh: ({ discipline }) =>
      `问卷设计的第一步不是写题目，而是先定义构念、变量和它们与${discipline.evidenceZh}之间的关系，再决定哪些题项真的需要。`,
    strategyEn: ({ discipline }) =>
      `The first survey-design task is not drafting items but defining the constructs, variables, and their relation to ${discipline.evidenceEn}, then deciding which items are actually necessary.`,
    stepsZh: () => [
      '先列出你论文里最关键的 2 到 4 个变量或维度。',
      '再让每个变量对应一组可解释、可统计的题项。',
      '最后在回收前试填一次，检查选项和题序是否会制造偏差。',
    ],
    stepsEn: () => [
      'List the two to four variables or dimensions that really matter for the thesis.',
      'Map each variable to a small set of interpretable and analyzable items.',
      'Pilot the questionnaire once before distribution and check whether item order or options create bias.',
    ],
    riskZh: () => '最容易出事的地方，是题目很多但变量定义很虚，最后统计很热闹，结论却没有抓手。',
    riskEn: () =>
      'The frequent failure point is a long questionnaire with weak variable definitions, which creates lively statistics but weak conclusions.',
    closeZh: () => '问卷题项越能对准变量，后面的统计和讨论就越容易真正服务论文主问题。',
    closeEn: () =>
      'The more tightly the items map onto the variables, the easier it becomes for the analysis and discussion to serve the central question.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}样本和案例怎么选：不是方便就行，而是要能解释问题`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: choose samples and cases for explanatory fit, not convenience alone`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}在${discipline.titleZh}研究里默认“能拿到什么就写什么”，但样本和案例如果只是方便取得，而不是为了回答问题，结论通常会很弱。`,
    introEn: ({ degree, discipline }) =>
      `${degree.readerEn} in ${discipline.titleEn} often default to using whatever sample or case is easiest to access, but convenience alone rarely produces a persuasive conclusion.`,
    strategyZh: ({ discipline }) =>
      `样本选择真正要回答的是：这组对象为什么能代表你要解释的现象？以及它和${discipline.evidenceZh}之间的连接是否稳定。`,
    strategyEn: ({ discipline }) =>
      `Sample or case selection should answer a stricter question: why can this set of cases illuminate the phenomenon, and how stable is the connection to ${discipline.evidenceEn}?`,
    stepsZh: () => [
      '先写清你的样本是为了比较、解释还是验证。',
      '再说明为什么这组样本比其他候选更能支撑研究问题。',
      '最后把样本的局限写进方法章节，避免结论越界。',
    ],
    stepsEn: () => [
      'Clarify whether the sample is meant for comparison, explanation, or validation.',
      'Explain why this sample serves the question better than the obvious alternatives.',
      'State the limits of the sample directly so the final conclusion does not overreach.',
    ],
    riskZh: () => '样本选择如果只靠“拿得到”，后面最容易被质疑的就是外推边界和结论可信度。',
    riskEn: () =>
      'When the sample is selected only because it is accessible, the later attack point is usually the credibility and boundary of the conclusion.',
    closeZh: () => '样本说明写清楚之后，研究的可信度会比单纯增加样本数量更明显地提升。',
    closeEn: () =>
      'A well-argued sample choice often improves credibility more than simply increasing the number of cases.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}定性编码怎么开始：先做代码本，别边读边随手起标签`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: start qualitative coding with a codebook, not improvised labels`,
    introZh: ({ degree, discipline }) =>
      `需要做编码的${discipline.titleZh}论文，经常一开始标签很多，越往后越乱，因为前期没有先定义代码，而是边读材料边临时命名。`,
    introEn: ({ degree, discipline }) =>
      `In ${discipline.titleEn} projects that require coding, the label set often multiplies too quickly because the codes were invented on the fly instead of being defined first.`,
    strategyZh: ({ discipline }) =>
      `代码本最关键的内容，不是名字好不好听，而是每个代码对应什么现象、使用边界在哪里、和${discipline.evidenceZh}中的什么证据相关。`,
    strategyEn: ({ discipline }) =>
      `The important part of a codebook is not the elegance of the labels but the phenomenon each code captures, its boundary, and its link to ${discipline.evidenceEn}.`,
    stepsZh: () => [
      '先把初始代码控制在一个可管理的数量，不要一上来就拆得过细。',
      '再给每个代码写一句定义和一个正例、反例。',
      '最后在小样本上试编码一次，看看哪些代码需要合并或拆分。',
    ],
    stepsEn: () => [
      'Keep the initial code set small enough to manage instead of over-splitting from the start.',
      'Write one definition plus one positive and one negative example for each code.',
      'Pilot the codebook on a small sample and see which codes need to be merged or divided.',
    ],
    riskZh: () => '如果代码没有边界，后面的分析很容易变成“我感觉这里像什么”，可解释性会迅速下降。',
    riskEn: () =>
      'Without clear boundaries, coding slips into intuition-only labeling and the interpretive strength drops quickly.',
    closeZh: () => '代码本先立起来，定性分析才更像研究，而不是材料摘录。',
    closeEn: () =>
      'Once the codebook is established, qualitative analysis starts behaving like research rather than note collection.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}指标和变量怎么定：写不清定义，后面就很难分析`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: define indicators and variables before you analyze`,
    introZh: ({ degree, discipline }) =>
      `${degree.readerZh}在${discipline.titleZh}方法章节里最容易跳过的一步，就是变量和指标的定义。看起来节省时间，其实会把麻烦全部推到结果部分。`,
    introEn: ({ degree, discipline }) =>
      `One of the most skipped moves in a ${discipline.titleEn} methods chapter is defining the variables and indicators clearly, which only postpones the confusion to the results section.`,
    strategyZh: ({ discipline }) =>
      `变量定义的核心，不只是给出术语解释，而是说明它如何在${discipline.evidenceZh}中被观察、记录和比较。`,
    strategyEn: ({ discipline }) =>
      `A variable definition should do more than explain a term. It should show how the variable is observed, recorded, and compared inside ${discipline.evidenceEn}.`,
    stepsZh: () => [
      '先写出核心变量的工作定义，而不是只写教科书定义。',
      '再解释这个变量在你的数据里具体用什么口径体现。',
      '最后让分析表格、图形和正文表述都统一使用同一套定义。',
    ],
    stepsEn: () => [
      'Write working definitions for the core variables instead of relying on textbook phrases alone.',
      'Explain the exact measurement or coding rule used in your own data.',
      'Make sure the tables, figures, and prose all use the same variable definitions.',
    ],
    riskZh: () => '变量定义一旦前后变化，最直接的后果就是统计结果和论文解释对不上。',
    riskEn: () =>
      'When variable definitions shift during the project, the immediate result is a mismatch between the analysis output and the written interpretation.',
    closeZh: () => '定义先统一，后面的方法、结果和讨论才会讲同一种语言。',
    closeEn: () =>
      'Once the definitions are stable, the methods, results, and discussion can finally speak the same language.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}结果和讨论怎么分：别让数据描述吞掉解释`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: separate results from discussion so interpretation survives`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}在${discipline.titleZh}论文里把结果和讨论写成一锅粥，要么全是数据复述，要么一边出结果一边跳结论，读者很难跟上逻辑。`,
    introEn: ({ degree, discipline }) =>
      `${degree.readerEn} often collapse results and discussion into a single stream in ${discipline.titleEn}, which makes the logic hard to follow.`,
    strategyZh: ({ discipline }) =>
      `更清楚的做法，是让结果部分先回答“看到了什么”，讨论部分再回答“这意味着什么”。尤其当你处理的是${discipline.evidenceZh}时，这种分工能明显提升可读性。`,
    strategyEn: ({ discipline }) =>
      `A clearer pattern is to let the results answer “what was found” and the discussion answer “what it means.” That division is especially useful when dealing with ${discipline.evidenceEn}.`,
    stepsZh: () => [
      '先在结果部分只保留和研究问题直接相关的发现。',
      '再把解释、比较和理论回扣移到讨论里单独展开。',
      '最后检查有没有重复解读同一个结果，导致正文变得拖沓。',
    ],
    stepsEn: () => [
      'Keep only findings directly tied to the research question inside the results section.',
      'Move explanation, comparison, and theory linkage into the discussion.',
      'Check whether the same finding is being interpreted twice and slowing the chapter down.',
    ],
    riskZh: () => '结果和讨论一旦混写，最容易出现的问题就是数据很多，但读者始终抓不到你的解释线。',
    riskEn: () =>
      'Once results and discussion are blended, the reader may see a lot of data but still miss the interpretive thread.',
    closeZh: () => '把描述和解释分开，不是形式主义，而是让结论更容易成立。',
    closeEn: () =>
      'Separating description from interpretation is not formalism. It is one of the cleanest ways to strengthen the conclusion.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}效度、伦理和数据管理别放最后补：方法章节一开始就该交代`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: handle validity, ethics, and data management early in the methods chapter`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}会把效度、伦理和数据管理当成最后补的“格式项”，但在${discipline.titleZh}研究里，这些内容直接决定材料能不能用、结论能不能站住。`,
    introEn: ({ degree, discipline }) =>
      `${degree.readerEn} often treat validity, ethics, and data management as checklist items to add at the end, but in ${discipline.titleEn} they directly affect whether the evidence and conclusions can be defended.`,
    strategyZh: ({ discipline }) =>
      `只要研究依赖${discipline.evidenceZh}，你就应该尽早交代数据如何保存、对象如何保护、结果如何避免偏差，而不是等导师提醒才回头补。`,
    strategyEn: ({ discipline }) =>
      `Whenever a study depends on ${discipline.evidenceEn}, the chapter should explain early how the data are stored, how participants or sources are protected, and how bias is being controlled.`,
    stepsZh: () => [
      '先说明研究过程中最需要控制的风险是什么。',
      '再写出你如何降低偏差、保护对象或保证数据完整。',
      '最后把这些安排和方法选择联系起来，而不是独立列一个空泛小节。',
    ],
    stepsEn: () => [
      'State the main risk that must be controlled in the research process.',
      'Explain how bias is reduced, participants or sources are protected, and data integrity is maintained.',
      'Link those arrangements back to the method choice instead of leaving them as a detached checklist section.',
    ],
    riskZh: () => '如果这些问题只在最后补一句，方法章节看起来会很薄，答辩时也很容易被追问。',
    riskEn: () =>
      'If these issues appear only as a final sentence, the methods chapter feels thin and becomes an easy target during defense.',
    closeZh: () => '把风险控制写进方法设计，本身就是研究可信度的一部分。',
    closeEn: () =>
      'Writing risk control into the method design is part of building research credibility.',
  },
]

const revisionThemes: ContentTheme[] = [
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}返修先改结构还是先改字句？先做一轮真正的“大修”`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: revise the structure before polishing the wording`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}返修${discipline.titleZh}论文时，一看到红字就开始逐句修，结果改了很久，核心逻辑却没有真正变强。`,
    introEn: ({ degree, discipline }) =>
      `${degree.readerEn} revising a ${discipline.titleEn} thesis often start fixing sentences as soon as comments appear, while the structural issues remain untouched.`,
    strategyZh: ({ discipline }) =>
      `更有效的返修顺序，是先看章节之间的论证关系，再看段落，再看句子。尤其是当论文依赖${discipline.evidenceZh}时，结构问题会直接影响证据是否被看见。`,
    strategyEn: ({ discipline }) =>
      `A stronger revision order is chapter logic first, paragraph work second, and sentence-level editing last. When the thesis depends on ${discipline.evidenceEn}, structural problems often hide the evidence itself.`,
    stepsZh: () => [
      '先圈出导师意见里真正影响结论成立的部分。',
      '再调整章节和段落顺序，让关键论点提前出现。',
      '最后再回到措辞、格式和引用细节上做精修。',
    ],
    stepsEn: () => [
      'Identify which comments actually affect whether the conclusion can stand.',
      'Reorder chapters or paragraphs so the central claims appear earlier and more clearly.',
      'Only then return to wording, formatting, and citation polishing.',
    ],
    riskZh: () => '如果只做字句层面的细修，论文会“看起来更顺”，但导师最关心的问题可能一个都没动。',
    riskEn: () =>
      'If the work stays at sentence level, the thesis may look smoother while the questions that mattered most remain unresolved.',
    closeZh: () => '返修最值钱的不是改了多少红字，而是主线有没有真正变得更稳。',
    closeEn: () =>
      'The value of revision is not how many marked lines were changed but whether the argumentative line became stronger.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}目录看不出主线？用 reverse outline 反查章节逻辑`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: use a reverse outline when the chapter logic is still blurry`,
    introZh: ({ degree, discipline }) =>
      `写到中后期时，${degree.readerZh}常常会觉得${discipline.titleZh}论文“每一章都不算错，但放在一起总觉得散”。这通常不是内容不够，而是主线没有被目录和段落清楚托住。`,
    introEn: ({ degree, discipline }) =>
      `Later in the project, ${degree.readerEn} often feel that each chapter of a ${discipline.titleEn} thesis is acceptable on its own but the manuscript still feels scattered as a whole.`,
    strategyZh: ({ discipline }) =>
      `reverse outline 的核心，是倒着问每一段到底在证明什么，以及它和${discipline.evidenceZh}中的哪一部分发生关系。`,
    strategyEn: ({ discipline }) =>
      `The core of a reverse outline is to ask what each paragraph is trying to prove and how it connects to the part of ${discipline.evidenceEn} that matters most.`,
    stepsZh: () => [
      '先给每一段或每个小节补一句“这一段在证明什么”。',
      '再检查这些句子能否顺着同一条论证链排下去。',
      '最后删掉那些无法说明作用的段落，或把它们移到更合理的位置。',
    ],
    stepsEn: () => [
      'Write one sentence for what each paragraph or subsection is trying to prove.',
      'Check whether those sentences can be lined up into one argumentative chain.',
      'Delete or relocate paragraphs whose purpose cannot be justified clearly.',
    ],
    riskZh: () => '目录和段落逻辑一旦断开，答辩时最容易被问到的就是“这一章为什么放在这里”。',
    riskEn: () =>
      'When the outline and paragraph logic disconnect, one of the first defense questions becomes “why is this chapter here?”',
    closeZh: () => '只要 reverse outline 做完一轮，论文的拖沓感通常会明显下降。',
    closeEn: () =>
      'A full reverse-outline pass often removes a surprising amount of drag from the manuscript.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}导师评语怎么回：先做回应矩阵，再动正文`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: respond to advisor comments with a revision matrix first`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}拿到${discipline.titleZh}论文评语后，会按顺序一条条改，但改到后面才发现有些意见彼此关联，甚至需要一起调整正文结构。`,
    introEn: ({ degree, discipline }) =>
      `${degree.readerEn} often work through ${discipline.titleEn} comments one by one and only later realize that several comments are linked and require a structural response.`,
    strategyZh: ({ discipline }) =>
      `回应矩阵比“边看边改”更有效，因为它会逼你先判断哪些意见影响主线，哪些意见只影响${discipline.evidenceZh}的呈现细节。`,
    strategyEn: ({ discipline }) =>
      `A revision matrix is stronger than editing comment by comment because it forces you to decide which comments change the main argument and which ones only affect the presentation of ${discipline.evidenceEn}.`,
    stepsZh: () => [
      '先把评语按主线问题、证据问题、表达问题三类分开。',
      '再为每条评语写上“准备怎么改”而不是直接进入正文。',
      '最后记录你改动到了哪一章哪一段，避免返修后自己也找不到变化。',
    ],
    stepsEn: () => [
      'Separate comments into argument, evidence, and expression issues.',
      'Write the planned response to each comment before reopening the manuscript.',
      'Track exactly which chapter or paragraph was changed so the revision stays auditable.',
    ],
    riskZh: () =>
      '如果不先做回应矩阵，最容易出现的情况就是改了很多局部，却没有真正回应导师最在意的那条主意见。',
    riskEn: () =>
      'Without a matrix, it is easy to change many local passages while missing the one comment the advisor cared about most.',
    closeZh: () => '先组织回应，再组织正文，返修会更有掌控感。',
    closeEn: () =>
      'When the response is organized before the manuscript is reopened, revision becomes much easier to control.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}摘要重写怎么做：把背景、方法、发现、价值压成一条线`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: rewrite the abstract as one clean line from problem to value`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}的${discipline.titleZh}摘要像缩短版正文，信息很多，却没有主次，也看不出研究到底解决了什么。`,
    introEn: ({ degree, discipline }) =>
      `Many ${discipline.titleEn} abstracts written by ${degree.readerEn} read like shortened body chapters: dense with information but weak in priority and outcome.`,
    strategyZh: ({ discipline }) =>
      `更有效的摘要顺序通常是：问题背景一句、研究对象与方法一句、核心发现一句、价值一句。尤其当论文材料来自${discipline.evidenceZh}时，这种压缩更能保留重点。`,
    strategyEn: ({ discipline }) =>
      `A stronger abstract usually follows a simple line: one sentence for the problem, one for the object and method, one for the main finding, and one for the value. That compression is especially useful when the paper relies on ${discipline.evidenceEn}.`,
    stepsZh: () => [
      '先把摘要里所有背景性铺垫压缩到 1 到 2 句。',
      '再只保留最能代表论文贡献的一个发现或判断。',
      '最后检查每句话是不是都在把读者推向结论，而不是绕圈。',
    ],
    stepsEn: () => [
      'Compress all background framing into one or two short sentences.',
      'Keep only the finding or judgment that best represents the contribution.',
      'Check whether every sentence pushes the reader toward the conclusion instead of circling around it.',
    ],
    riskZh: () => '摘要最容易出的问题，不是太短，而是太像目录简介，读完后仍然不知道你得出了什么。',
    riskEn: () =>
      'The common abstract problem is not excessive brevity but sounding like a table-of-contents summary that never reaches the actual takeaway.',
    closeZh: () => '摘要写顺了，答辩开场和投稿介绍也会跟着顺很多。',
    closeEn: () =>
      'Once the abstract becomes cleaner, the defense opening and journal pitch usually improve with it.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}论文太啰嗦怎么减：先砍重复解释，再精简句子`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: cut repetition before you polish individual sentences`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}会觉得${discipline.titleZh}论文“字数够了但还是显得虚”，本质上往往不是内容少，而是同一个意思在不同位置被解释了三遍。`,
    introEn: ({ degree, discipline }) =>
      `${degree.readerEn} often feel that a ${discipline.titleEn} thesis has enough words but still reads thin, which is usually caused by repeated explanation rather than lack of material.`,
    strategyZh: ({ discipline }) =>
      `减字最有效的方法，不是先改句子，而是先找论点、证据和解释之间的重复。尤其当正文围绕${discipline.evidenceZh}展开时，重复更容易把读者的注意力冲散。`,
    strategyEn: ({ discipline }) =>
      `The most effective way to cut length is not sentence-level editing at first but identifying where the claim, evidence, and explanation are being repeated. That matters even more when the manuscript relies heavily on ${discipline.evidenceEn}.`,
    stepsZh: () => [
      '先标出每一节最重要的一句，剩下的内容都要围着它服务。',
      '再删掉那些只是在换说法重复同一意思的句子。',
      '最后把长句拆短，把多余修饰语和空泛过渡语去掉。',
    ],
    stepsEn: () => [
      'Mark the most important sentence in each section and make the rest justify that line.',
      'Delete sentences that repeat the same point in different wording.',
      'Break long sentences and cut empty modifiers or weak transition phrases.',
    ],
    riskZh: () => '如果只修句子不删重复，论文会越来越顺口，但不会真正变紧。',
    riskEn: () =>
      'If you polish sentences without removing repetition, the prose may sound smoother but the manuscript will not become tighter.',
    closeZh: () => '真正的减字，不是牺牲内容，而是让真正重要的内容留下来。',
    closeEn: () =>
      'Real trimming does not sacrifice substance. It protects the substance by removing drag.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}答辩 PPT 怎么搭故事线：别照着目录念`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: build a defense slide story instead of reading the table of contents`,
    introZh: ({ degree, discipline }) =>
      `${degree.readerZh}准备${discipline.titleZh}答辩 PPT 时，最容易把全文目录缩短搬上去，结果页数很多、信息很满、听众却抓不到重点。`,
    introEn: ({ degree, discipline }) =>
      `${degree.readerEn} preparing a ${discipline.titleEn} defense slide deck often shrink the table of contents into slides, which creates density but not a memorable argument.`,
    strategyZh: ({ discipline }) =>
      `更有效的答辩故事线，通常只需要讲清楚四件事：为什么这个问题值得做、你怎么处理${discipline.evidenceZh}、最关键的发现是什么、它为什么重要。`,
    strategyEn: ({ discipline }) =>
      `A stronger defense story usually needs four things: why the problem matters, how ${discipline.evidenceEn} were handled, what the decisive finding is, and why it matters.`,
    stepsZh: () => [
      '先把答辩内容压成 5 到 8 分钟内能讲完的一条线。',
      '再让每一页只承担一个功能，不要同时塞背景、方法和结论。',
      '最后检查每页标题是否像一句结论，而不是像栏目名。',
    ],
    stepsEn: () => [
      'Compress the defense into one line that can be delivered in five to eight minutes.',
      'Give each slide one job instead of mixing background, method, and conclusion on the same page.',
      'Rewrite slide titles so they sound like mini conclusions rather than section labels.',
    ],
    riskZh: () => '答辩 PPT 最大的问题不是不够完整，而是太完整，完整到没人记得你的核心发现。',
    riskEn: () =>
      'The biggest slide problem is often not incompleteness but excess completeness, where no one remembers the central finding.',
    closeZh: () => '答辩不是朗读论文，而是帮助评委快速看见你论文最值得记住的那条线。',
    closeEn: () =>
      'A defense is not a live reading of the thesis. It is a way of making the most memorable line of the thesis visible fast.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}答辩最容易被问什么：先准备问题，不要只背稿`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: prepare for defense questions instead of memorizing a script only`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}准备${discipline.titleZh}答辩时只练开场陈述，但真正紧张的往往是问答环节，因为评委会直接追问方法、样本、局限和贡献。`,
    introEn: ({ degree, discipline }) =>
      `${degree.readerEn} often rehearse only the opening script for a ${discipline.titleEn} defense, while the real pressure appears in the question round.`,
    strategyZh: ({ discipline }) =>
      `更稳的准备方式，是围绕研究问题、${discipline.evidenceZh}、方法选择、核心发现和局限，提前把最可能被追问的 5 到 10 个问题写出来。`,
    strategyEn: ({ discipline }) =>
      `A stronger preparation routine is to draft five to ten likely questions around the research question, ${discipline.evidenceEn}, the method choice, the central finding, and the limitation line.`,
    stepsZh: () => [
      '先把你自己最怕被问的三类问题写下来。',
      '再把每个问题压成 30 到 60 秒可回答的版本。',
      '最后模拟一轮追问，检查你的答案会不会越答越散。',
    ],
    stepsEn: () => [
      'Write down the three kinds of questions you most fear.',
      'Compress each answer into a 30-to-60-second response.',
      'Simulate a follow-up round and check whether the answer stays focused under pressure.',
    ],
    riskZh: () => '如果只背稿不练问答，真正到现场时最容易出现的情况就是一句话越答越长，越答越偏。',
    riskEn: () =>
      'If you only memorize the script and never rehearse answers, the live response often becomes longer, looser, and less persuasive with each sentence.',
    closeZh: () => '答辩准备得越像问答训练，现场就越不像临场救火。',
    closeEn: () =>
      'The more the defense preparation resembles question training, the less the live session feels like improvisational rescue work.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}论文能不能改成文章：先拆出一个能独立成立的核心结果`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: turn the thesis into an article by isolating one publishable result`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}写完${discipline.titleZh}论文后，会想把它改成文章，但真正动手时才发现论文太长、线太多、每一章都像不能删。`,
    introEn: ({ degree, discipline }) =>
      `${degree.readerEn} often want to convert a finished ${discipline.titleEn} thesis into an article and then discover that the thesis is too broad to submit as it stands.`,
    strategyZh: ({ discipline }) =>
      `论文改文章的第一步不是压缩全文，而是先找出一个能独立成立的结果、比较或判断，再围绕它重选文献、方法和${discipline.evidenceZh}。`,
    strategyEn: ({ discipline }) =>
      `The first step in turning a thesis into an article is not compressing the whole dissertation but isolating one result, comparison, or judgment that can stand on its own, then rebuilding the literature, methods, and ${discipline.evidenceEn} around it.`,
    stepsZh: () => [
      '先判断论文里哪一个发现最适合单独发表。',
      '再删掉所有只是为完整版论文服务、却不服务这条结果的内容。',
      '最后按期刊读者的阅读习惯重写标题、摘要和引言。',
    ],
    stepsEn: () => [
      'Identify the single result from the thesis that has the strongest stand-alone value.',
      'Remove material that served the full thesis but does not serve that result.',
      'Rewrite the title, abstract, and introduction for journal readers rather than thesis examiners.',
    ],
    riskZh: () =>
      '如果只是把论文机械压短，文章会同时保留论文的重量和文章的篇幅限制，最后两边都不讨好。',
    riskEn: () =>
      'If the thesis is only shortened mechanically, the article keeps the dissertation’s weight while inheriting the journal’s length constraints, which satisfies neither form.',
    closeZh: () => '论文改文章真正考验的不是删字，而是重做重心。',
    closeEn: () =>
      'Turning a thesis into an article is less about deleting words and more about rebuilding the center of gravity.',
  },
]

// Themes are original syntheses inspired by academic writing guidance from university writing centers,
// libraries, and researcher training resources.
const stageThemes: Record<StageConfig['slug'], ContentTheme[]> = {
  proposal: proposalThemes,
  'literature-review': literatureReviewThemes,
  'methods-analysis': methodsThemes,
  'revision-defense': revisionThemes,
}

function buildChinesePost(
  degree: DegreeConfig,
  discipline: DisciplineConfig,
  stage: StageConfig,
  disciplineIndex: number,
) {
  const theme = stageThemes[stage.slug][disciplineIndex % stageThemes[stage.slug].length]
  const args = { degree, discipline }
  const titleZh = theme.titleZh(args)
  const metaTitleZh = `${titleZh} | PaperBridge`
  const metaDescriptionZh = `围绕${discipline.titleZh}${stage.titleZh}的原创文章，面向${degree.readerZh}，重点处理${theme
    .titleZh(args)
    .replace(`${degree.labelZh}${discipline.titleZh}`, '')}。`
  const [step1, step2, step3] = theme.stepsZh(args)

  const contentZh = createRichText([
    createHeading('先抓住真正的卡点'),
    createParagraph(theme.introZh(args)),
    createParagraph(
      `${degree.standardZh}这在${discipline.focusZh}相关写作里尤其明显，因为你最终都要把判断落到${discipline.evidenceZh}上。`,
    ),
    createHeading('更稳的处理方式'),
    createParagraph(theme.strategyZh(args)),
    createHeading('可以直接照着走的三步'),
    createHeading('第一步', 'h3'),
    createParagraph(step1),
    createHeading('第二步', 'h3'),
    createParagraph(step2),
    createHeading('第三步', 'h3'),
    createParagraph(step3),
    createHeading('最容易踩的坑'),
    createParagraph(theme.riskZh(args)),
    createHeading('写完这一轮后你应该得到什么'),
    createParagraph(theme.closeZh(args)),
  ])

  return {
    titleZh,
    metaTitleZh,
    metaDescriptionZh,
    contentZh,
  }
}

function buildEnglishPost(
  degree: DegreeConfig,
  discipline: DisciplineConfig,
  stage: StageConfig,
  disciplineIndex: number,
) {
  const theme = stageThemes[stage.slug][disciplineIndex % stageThemes[stage.slug].length]
  const args = { degree, discipline }
  const titleEn = theme.titleEn(args)
  const metaTitleEn = `${titleEn} | PaperBridge`
  const metaDescriptionEn = `An original ${discipline.titleEn.toLowerCase()} article for ${degree.readerEn}, focused on a concrete ${stage.titleEn.toLowerCase()} problem instead of a generic template.`
  const [step1, step2, step3] = theme.stepsEn(args)

  const contentEn = createRichText([
    createHeading('Find the real bottleneck first'),
    createParagraph(theme.introEn(args)),
    createParagraph(
      `${degree.standardEn} That becomes even more important in projects about ${discipline.focusEn}, where the argument must ultimately hold against ${discipline.evidenceEn}.`,
    ),
    createHeading('A steadier way to handle it'),
    createParagraph(theme.strategyEn(args)),
    createHeading('Three moves you can apply immediately'),
    createHeading('Step 1', 'h3'),
    createParagraph(step1),
    createHeading('Step 2', 'h3'),
    createParagraph(step2),
    createHeading('Step 3', 'h3'),
    createParagraph(step3),
    createHeading('The easiest trap to fall into'),
    createParagraph(theme.riskEn(args)),
    createHeading('What this round of work should produce'),
    createParagraph(theme.closeEn(args)),
  ])

  return {
    titleEn,
    metaTitleEn,
    metaDescriptionEn,
    contentEn,
  }
}

function buildCatalog(): GeneratedPost[] {
  const posts: GeneratedPost[] = []
  const startDate = new Date('2025-05-01T08:00:00.000Z')
  let index = 0

  for (const stage of stages) {
    for (const [disciplineIndex, discipline] of disciplines.entries()) {
      for (const degree of degrees) {
        const zh = buildChinesePost(degree, discipline, stage, disciplineIndex)
        const en = buildEnglishPost(degree, discipline, stage, disciplineIndex)
        const publishedAt = new Date(
          startDate.getTime() + index * 24 * 60 * 60 * 1000,
        ).toISOString()

        posts.push({
          slug: `${degree.slug}-${discipline.slug}-${stage.slug}-guide`,
          categorySlug: degree.categorySlug,
          degreeSlug: degree.slug,
          disciplineSlug: discipline.slug,
          imageFilename: resolveImageFilename(degree, stage),
          publishedAt,
          stageSlug: stage.slug,
          titleZh: zh.titleZh,
          titleEn: en.titleEn,
          metaTitleZh: zh.metaTitleZh,
          metaTitleEn: en.metaTitleEn,
          metaDescriptionZh: zh.metaDescriptionZh,
          metaDescriptionEn: en.metaDescriptionEn,
          contentZh: zh.contentZh,
          contentEn: en.contentEn,
        })

        index += 1
      }
    }
  }

  return posts
}

function chunk<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = []

  for (let index = 0; index < items.length; index += size) {
    chunks.push(items.slice(index, index + size))
  }

  return chunks
}

async function ensureEditorialAuthor(payload: Awaited<ReturnType<typeof getPayload>>) {
  const existing = await payload.find({
    collection: 'users',
    depth: 0,
    limit: 1,
    pagination: false,
    where: {
      email: {
        equals: 'editorial@paperbridge.local',
      },
    },
  })

  if (existing.docs[0]) {
    return existing.docs[0]
  }

  return payload.create({
    collection: 'users',
    depth: 0,
    data: {
      email: 'editorial@paperbridge.local',
      name: 'PaperBridge Editorial Team',
      password: 'paperbridge-editorial-2026',
    },
  })
}

async function ensureMedia(
  payload: Awaited<ReturnType<typeof getPayload>>,
  filenameToEnsure: string,
) {
  const existing = await payload.find({
    collection: 'media',
    depth: 0,
    limit: 1,
    pagination: false,
    where: {
      filename: {
        equals: filenameToEnsure,
      },
    },
  })

  if (existing.docs[0]) {
    return existing.docs[0]
  }

  const filePath = path.resolve(projectRoot, 'public/media', filenameToEnsure)
  const buffer = await readFile(filePath)

  return payload.create({
    collection: 'media',
    depth: 0,
    data: {
      alt: mediaAltText[filenameToEnsure] || 'PaperBridge article cover',
    },
    file: {
      name: filenameToEnsure,
      data: buffer,
      mimetype: 'image/webp',
      size: buffer.byteLength,
    },
  })
}

async function ensureCategory(
  payload: Awaited<ReturnType<typeof getPayload>>,
  slug: string,
  titleZh: string,
  titleEn: string,
) {
  const existing = await payload.find({
    collection: 'categories',
    depth: 0,
    limit: 1,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const category =
    existing.docs[0] ||
    (await payload.create({
      collection: 'categories',
      depth: 0,
      data: {
        slug,
        title: titleZh,
      },
    }))

  await payload.update({
    collection: 'categories',
    id: category.id,
    locale: 'en',
    depth: 0,
    data: {
      title: titleEn,
    },
  })

  return category
}

type ExistingPostSnapshot = {
  id: number
  meta?: {
    title?: string | null
  } | null
  publishedAt?: string | null
  slug: string
  title: string
}

async function loadExistingPostsBySlug(
  payload: Awaited<ReturnType<typeof getPayload>>,
  slugs: string[],
) {
  const existingPosts = new Map<string, ExistingPostSnapshot>()

  for (const slugChunk of chunk(slugs, 50)) {
    const existing = await payload.find({
      collection: 'posts',
      depth: 0,
      limit: slugChunk.length,
      pagination: false,
      select: {
        id: true,
        meta: true,
        publishedAt: true,
        slug: true,
        title: true,
      },
      where: {
        slug: {
          in: slugChunk,
        },
      },
    })

    for (const doc of existing.docs) {
      if (doc.slug) {
        existingPosts.set(doc.slug, doc as ExistingPostSnapshot)
      }
    }
  }

  return existingPosts
}

async function main() {
  const shouldSeed = process.env.SEO_SEED_FORCE === '1' || process.env.VERCEL_ENV === 'production'
  const hasDatabaseUrl = Boolean(process.env.DATABASE_URL || process.env.POSTGRES_URL)
  const hasPayloadSecret = Boolean(process.env.PAYLOAD_SECRET)

  if (!shouldSeed) {
    console.log('[seed:seo] Skipping SEO content seed outside production build.')
    return
  }

  if (!hasDatabaseUrl || !hasPayloadSecret) {
    console.log('[seed:seo] Skipping SEO content seed because required env vars are missing.')
    return
  }

  const config = await configPromise
  const payload = await getPayload({ config })
  const catalog = buildCatalog()

  console.log(`[seed:seo] Preparing ${catalog.length} SEO articles across 3 degree categories.`)

  const uniqueFilenames = Array.from(new Set(catalog.map((post) => post.imageFilename)))
  const mediaDocs = await Promise.all(uniqueFilenames.map((name) => ensureMedia(payload, name)))
  const mediaByFilename = new Map(mediaDocs.map((doc) => [doc.filename, doc]))

  const categoryDocs = await Promise.all(
    Object.entries(categoryLocaleLabels).map(([slug, titles]) =>
      ensureCategory(payload, slug, titles.zh, titles.en),
    ),
  )
  const categoriesBySlug = new Map(categoryDocs.map((doc) => [doc.slug, doc]))

  const existingPosts = await loadExistingPostsBySlug(
    payload,
    catalog.map((post) => post.slug),
  )

  let createdCount = 0
  let updatedCount = 0
  const editorialAuthor = await ensureEditorialAuthor(payload)

  for (const post of catalog) {
    const category = categoriesBySlug.get(post.categorySlug)
    const heroImage = mediaByFilename.get(post.imageFilename)
    const existing = existingPosts.get(post.slug)

    if (!category || !heroImage) {
      throw new Error(`Missing category or media for post ${post.slug}`)
    }

    if (!existing) {
      const created = await payload.create({
        collection: 'posts',
        depth: 0,
        locale: 'zh',
        context: {
          disableRevalidate: true,
        },
        data: {
          slug: post.slug,
          _status: 'published',
          title: post.titleZh,
          content: post.contentZh,
          authors: [editorialAuthor.id],
          heroImage: heroImage.id,
          categories: [category.id],
          meta: {
            title: post.metaTitleZh,
            description: post.metaDescriptionZh,
            image: heroImage.id,
          },
          publishedAt: post.publishedAt,
          relatedPosts: [],
        },
      })

      existingPosts.set(post.slug, {
        id: created.id,
        meta: {
          title: post.metaTitleZh,
        },
        publishedAt: post.publishedAt,
        slug: post.slug,
        title: post.titleZh,
      })

      await payload.update({
        collection: 'posts',
        id: created.id,
        depth: 0,
        locale: 'en',
        context: {
          disableRevalidate: true,
        },
        data: {
          title: post.titleEn,
          content: post.contentEn,
          meta: {
            title: post.metaTitleEn,
            description: post.metaDescriptionEn,
            image: heroImage.id,
          },
        },
      })

      createdCount += 1
    } else if (
      existing.title !== post.titleZh ||
      existing.meta?.title !== post.metaTitleZh ||
      existing.publishedAt !== post.publishedAt
    ) {
      await payload.update({
        collection: 'posts',
        id: existing.id,
        depth: 0,
        locale: 'zh',
        context: {
          disableRevalidate: true,
        },
        data: {
          title: post.titleZh,
          content: post.contentZh,
          authors: [editorialAuthor.id],
          heroImage: heroImage.id,
          categories: [category.id],
          meta: {
            title: post.metaTitleZh,
            description: post.metaDescriptionZh,
            image: heroImage.id,
          },
          publishedAt: post.publishedAt,
          relatedPosts: [],
        },
      })

      await payload.update({
        collection: 'posts',
        id: existing.id,
        depth: 0,
        locale: 'en',
        context: {
          disableRevalidate: true,
        },
        data: {
          title: post.titleEn,
          content: post.contentEn,
          meta: {
            title: post.metaTitleEn,
            description: post.metaDescriptionEn,
            image: heroImage.id,
          },
        },
      })

      updatedCount += 1

      existingPosts.set(post.slug, {
        id: existing.id,
        meta: {
          title: post.metaTitleZh,
        },
        publishedAt: post.publishedAt,
        slug: post.slug,
        title: post.titleZh,
      })
    }

    const processedCount = createdCount + updatedCount

    if (processedCount > 0 && processedCount % 25 === 0) {
      console.log(
        `[seed:seo] Processed ${processedCount} / ${catalog.length} articles (created ${createdCount}, updated ${updatedCount})...`,
      )
    }
  }

  const postIdBySlug = new Map(
    Array.from(existingPosts.entries()).map(([slug, snapshot]) => [slug, snapshot.id]),
  )

  for (const post of catalog) {
    const currentId = postIdBySlug.get(post.slug)

    if (!currentId) continue

    const relatedIds = catalog
      .filter((candidate) => candidate.slug !== post.slug)
      .filter(
        (candidate) =>
          (candidate.disciplineSlug === post.disciplineSlug &&
            candidate.degreeSlug === post.degreeSlug) ||
          (candidate.disciplineSlug === post.disciplineSlug &&
            candidate.stageSlug === post.stageSlug),
      )
      .slice(0, 3)
      .map((candidate) => postIdBySlug.get(candidate.slug))
      .filter((value): value is number => typeof value === 'number')

    await payload.update({
      collection: 'posts',
      id: currentId,
      depth: 0,
      locale: 'zh',
      context: {
        disableRevalidate: true,
      },
      data: {
        authors: [editorialAuthor.id],
        relatedPosts: relatedIds,
      },
    })
  }

  console.log(
    `[seed:seo] Completed. Created ${createdCount} new SEO articles and updated ${updatedCount} existing ones.`,
  )
}

main().catch((error) => {
  console.error('[seed:seo] Failed to seed SEO articles.')
  console.error(error)
  process.exit(1)
})
