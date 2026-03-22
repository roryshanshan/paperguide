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
  imageFilename: string
  metaDescriptionEn: string
  metaDescriptionZh: string
  metaTitleEn: string
  metaTitleZh: string
  publishedAt: string
  slug: string
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

function getZhStageCopy(stage: StageConfig, degree: DegreeConfig, discipline: DisciplineConfig) {
  switch (stage.slug) {
    case 'proposal':
      return {
        challenge: `很多${degree.readerZh}在${discipline.titleZh}论文的选题与开题阶段，会把注意力放在“我想研究哪个大方向”，却没有把“我要回答什么问题”说清楚，最后容易出现题目过大、方法不稳、进度表失真的情况。`,
        focus: `如果你的方向聚焦在${discipline.focusZh}，建议一开始就围绕最稳定的${discipline.evidenceZh}来收缩边界，而不是先写很大的背景再回头补研究问题。`,
        structure: `开题文本建议按研究背景、问题提出、研究对象与范围、文献现状、方法路径、时间安排六个部分来组织，并提前确认你在写作周期内真的能持续拿到${discipline.evidenceZh}。`,
        step1: `先把题目缩到一个明确场景、群体、文本或样本范围，避免从“大领域”直接跳到论文标题。`,
        step2: `再用 5 篇左右核心文献梳理争议点，提炼你的关键词、研究问题与研究价值。`,
        step3: `最后用一张时间表检查资料获取、章节推进和导师反馈节奏，确保开题之后可以连续写下去。`,
        pitfalls: `最常见的问题是题目看起来完整，但研究问题仍然模糊，或者背景写得很多却没有真正说明为什么值得研究。修正时要优先收窄范围，并把“为什么研究、研究什么、怎么研究”写成三句清晰的话。`,
      }
    case 'literature-review':
      return {
        challenge: `到了文献综述与理论框架阶段，最容易出现“读了很多但综不起来”的情况。尤其是${discipline.focusZh}相关主题，资料来源分散、观点差异大，更需要有清晰的比较维度和归纳逻辑。`,
        focus: `对${degree.readerZh}来说，这一阶段的目标不是简单罗列文献，而是解释已有研究做到了什么、遗漏了什么、你的研究准备接在哪个位置。`,
        structure: `综述部分可以按照研究主题、核心概念、主要观点分歧、常用方法、理论框架与研究切口来组织，筛选材料时优先围绕${discipline.evidenceZh}展开。`,
        step1: `先建立文献矩阵，按照主题、方法、结论与不足做归类，别让阅读笔记永远停留在“摘抄”。`,
        step2: `再提炼 2 到 3 个真正与你论文问题有关的理论概念，避免框架太大、后文接不住。`,
        step3: `最后让综述自然过渡到你的研究问题，说明你为什么要继续往下做，而不是只把别人写过什么罗列一遍。`,
        pitfalls: `最常见的问题是只做摘要式综述，缺少比较、评价和过渡。修正时要删掉与核心问题关联弱的材料，并强化“评述”而不是“摘录”。`,
      }
    case 'methods-analysis':
      return {
        challenge: `研究方法与数据分析阶段，很多${degree.readerZh}会同时卡在方法选择、样本获取和结果解释上。对${discipline.titleZh}论文来说，如果方法与问题不匹配，再多材料也很难真正支撑论证。`,
        focus: `在${degree.labelZh}的标准下，这一步的关键是把问题、方法、数据和分析逻辑连成一条线，让每个方法决策都能对应回论文主问题。`,
        structure: `方法部分建议依次说明研究设计、样本或材料来源、指标或编码维度、分析步骤、有效性与局限，并把${discipline.evidenceZh}提前准备完整。`,
        step1: `先反推研究问题到底需要什么证据，再决定用问卷、访谈、案例、实验、文本分析还是模型比较。`,
        step2: `再把数据清理、编码、指标口径和分析流程写成可复现的步骤，避免方法部分像模板。`,
        step3: `最后在结果部分只呈现与研究问题直接相关的发现，把描述和解释区分开，不要把所有数据都堆进正文。`,
        pitfalls: `常见问题是方法写得像流水模板、结果写得像数据堆叠，或者分析与前文问题脱节。修正时要把每一个分析动作都解释成“为了回答哪个问题”。`,
      }
    default:
      return {
        challenge: `进入修改定稿与答辩阶段后，很多${degree.readerZh}会发现问题不在“不会写”，而在“不会取舍”。章节之间重复、评语回应不集中、答辩陈述没有主线，都会直接影响最后呈现。`,
        focus: `这一阶段最重要的不是继续补很多新材料，而是统一论点主线、解决高优先级问题，并让正文、摘要、PPT 与答辩表达保持一致。`,
        structure: `可以按整体逻辑检查、章节修订、格式与引文、评语回应、摘要与答辩材料准备五条线推进，并结合${discipline.evidenceZh}重新核对关键论据是否完整。`,
        step1: `先按“致命问题、重要问题、细节问题”三层处理导师或评审意见，别一上来就埋头改格式。`,
        step2: `再逐章检查摘要、目录、结论和正文是否在表达同一条中心论点，删掉重复段落和弱证据。`,
        step3: `最后围绕研究背景、方法、核心发现、贡献与局限，反复演练 5 到 8 分钟的答辩陈述。`,
        pitfalls: `最常见的问题是只改字句不改结构，或者答辩 PPT 漂亮但与正文脱节。修正时一定先抓主线，再处理格式和措辞。`,
      }
  }
}

function getEnStageCopy(stage: StageConfig, degree: DegreeConfig, discipline: DisciplineConfig) {
  switch (stage.slug) {
    case 'proposal':
      return {
        challenge: `Many ${degree.readerEn} enter the ${discipline.titleEn} proposal stage with a broad topic area in mind but no sharply defined research question, which leads to oversized titles, unstable methods, and unrealistic timelines.`,
        focus: `If your project is about ${discipline.focusEn}, narrow the scope around the most reliable ${discipline.evidenceEn} before you draft large sections of background.`,
        structure: `A stronger proposal usually moves through background, problem statement, research scope, literature snapshot, methods pathway, and timeline, while checking that the ${discipline.evidenceEn} can be accessed throughout the writing cycle.`,
        step1: `Start by limiting the project to a concrete context, population, text set, or case range instead of naming a huge field.`,
        step2: `Then review a small core set of papers to clarify the keywords, research question, and practical value of the study.`,
        step3: `Finally, test the feasibility with a simple schedule that covers data access, chapter drafting, and advisor feedback.`,
        pitfalls: `The most common problem is a title that sounds complete while the question stays blurry. Tighten the scope first, then write three direct sentences for why the topic matters, what exactly is being studied, and how you will study it.`,
      }
    case 'literature-review':
      return {
        challenge: `The literature review stage often becomes a pile of reading notes. In ${discipline.focusEn}, sources are often scattered and argumentative positions vary, so you need a firm comparison framework instead of more summaries.`,
        focus: `For ${degree.readerEn}, the goal is not to list what others wrote but to explain what has been established, what remains unresolved, and where your study enters the conversation.`,
        structure: `A practical structure is to organize the review by themes, core concepts, major disagreements, methods, and the theoretical lens that will carry your own study, while screening material around ${discipline.evidenceEn}.`,
        step1: `Build a literature matrix that tags each source by theme, method, conclusion, and limitation.`,
        step2: `Then isolate two or three concepts that directly support your question instead of importing an oversized framework.`,
        step3: `Close the section by showing why your research question is the next logical move after the existing studies.`,
        pitfalls: `The usual weakness is a descriptive review with no evaluation or transition. Cut sources that are weakly related to the question and replace summary-heavy paragraphs with analytical comparison.`,
      }
    case 'methods-analysis':
      return {
        challenge: `At the methodology stage, many ${degree.readerEn} get stuck between method choice, sample access, and result interpretation. In ${discipline.titleEn} projects, even rich materials cannot support the argument if the method does not fit the question.`,
        focus: `At the ${degree.labelEn.toLowerCase()} level, this stage has to connect question, method, data, and analysis logic into one traceable chain.`,
        structure: `A stronger methods chapter explains the research design, material source, variables or coding dimensions, analysis steps, and the limits of the design, while preparing the ${discipline.evidenceEn} in advance.`,
        step1: `Work backward from the research question to decide what kind of evidence is actually needed.`,
        step2: `Write the data cleaning, coding, measurement, and analysis workflow as repeatable steps instead of generic method labels.`,
        step3: `In the results section, present only findings that directly answer the question and keep description separate from interpretation.`,
        pitfalls: `Typical problems include template-like methods sections, result dumps, and weak links between analysis and the original research question. Explain each analytical move in terms of the question it is meant to answer.`,
      }
    default:
      return {
        challenge: `By the revision and defense stage, the real problem is often not writing ability but prioritization. Repetition across chapters, scattered responses to comments, and a defense script without a clear backbone can all weaken the final presentation.`,
        focus: `At this point, do not keep expanding the manuscript blindly. The job is to align the core argument, solve high-priority issues first, and make the dissertation, abstract, slides, and oral explanation tell the same story.`,
        structure: `A practical revision workflow checks overall logic, chapter-level edits, formatting and references, response to comments, and abstract and defense materials, while rechecking the decisive ${discipline.evidenceEn}.`,
        step1: `Sort advisor or reviewer comments into critical, important, and minor issues before you touch wording.`,
        step2: `Then compare the abstract, table of contents, conclusion, and main chapters to confirm they express one consistent argument.`,
        step3: `Finally, rehearse a five-to-eight-minute defense explanation built around the background, methods, findings, contribution, and limitations.`,
        pitfalls: `A common mistake is to polish sentences while leaving structural problems untouched. Secure the main line first, then clean up formatting and phrasing.`,
      }
  }
}

function buildChinesePost(degree: DegreeConfig, discipline: DisciplineConfig, stage: StageConfig) {
  const stageCopy = getZhStageCopy(stage, degree, discipline)
  const titleZh = `${degree.labelZh}${discipline.titleZh}${stage.titleZh}指南`
  const metaTitleZh = `${degree.labelZh}${discipline.titleZh}${stage.titleZh}写作指南 | PaperBridge`
  const metaDescriptionZh = `面向${degree.readerZh}的${discipline.titleZh}${stage.titleZh}实操文章，覆盖结构安排、资料准备、常见风险与推进节奏。`

  const contentZh = createRichText([
    createHeading(`为什么${degree.readerZh}会在${discipline.titleZh}${stage.titleZh}阶段卡住`),
    createParagraph(stageCopy.challenge),
    createParagraph(
      `${degree.standardZh}对于${discipline.focusZh}这类方向尤其重要，因为论文一旦前期边界没收住，后面很容易出现材料很多、主线很散的问题。`,
    ),
    createParagraph(stageCopy.focus),
    createHeading('这一阶段最该先完成什么'),
    createParagraph(
      `如果你正在推进${discipline.titleZh}论文，最先要做的不是把所有资料都收集齐，而是先确认当前阶段必须交付的关键结果。对${degree.readerZh}来说，写作节奏应该围绕“主问题是否更清楚、材料是否更可控、章节是否更能支撑论证”来判断，而不是只看字数增长。`,
    ),
    createHeading('建议的章节与材料安排'),
    createParagraph(stageCopy.structure),
    createHeading('三步推进法'),
    createHeading('第一步：先锁定最小可执行范围', 'h3'),
    createParagraph(stageCopy.step1),
    createHeading('第二步：把证据和论证顺序排清楚', 'h3'),
    createParagraph(stageCopy.step2),
    createHeading('第三步：用时间表逼出可行性', 'h3'),
    createParagraph(stageCopy.step3),
    createHeading('常见问题与修正建议'),
    createParagraph(stageCopy.pitfalls),
    createHeading('结语'),
    createParagraph(
      `这篇${degree.labelZh}${discipline.titleZh}${stage.titleZh}文章的核心目的，是帮你把任务拆成可以连续执行的动作。只要主问题、关键证据和章节逻辑始终对齐，论文推进就会比单纯堆资料稳定得多。`,
    ),
  ])

  return {
    titleZh,
    metaTitleZh,
    metaDescriptionZh,
    contentZh,
  }
}

function buildEnglishPost(degree: DegreeConfig, discipline: DisciplineConfig, stage: StageConfig) {
  const stageCopy = getEnStageCopy(stage, degree, discipline)
  const titleEn = `${degree.labelEn} ${discipline.titleEn} ${stage.titleEn} Guide`
  const metaTitleEn = `${degree.labelEn} ${discipline.titleEn} ${stage.titleEn} Guide | PaperBridge`
  const metaDescriptionEn = `A practical ${discipline.titleEn.toLowerCase()} guide for ${degree.readerEn}, covering structure, evidence preparation, common risks, and a workable writing rhythm.`

  const contentEn = createRichText([
    createHeading(
      `Why ${degree.readerEn} get stuck at the ${discipline.titleEn} ${stage.titleEn} stage`,
    ),
    createParagraph(stageCopy.challenge),
    createParagraph(
      `${degree.standardEn} That standard matters even more in projects about ${discipline.focusEn}, because weak boundaries early on usually create scattered evidence and a weak argumentative line later.`,
    ),
    createParagraph(stageCopy.focus),
    createHeading('What should be finished first at this stage'),
    createParagraph(
      `When you are drafting a ${discipline.titleEn} thesis, the first priority is not to collect everything. It is to identify the stage-specific output that actually moves the dissertation forward. For ${degree.readerEn}, a productive rhythm means the question is becoming sharper, the materials are becoming more controllable, and the chapters are carrying the argument more clearly.`,
    ),
    createHeading('A practical chapter and evidence arrangement'),
    createParagraph(stageCopy.structure),
    createHeading('A three-step working method'),
    createHeading('Step 1: Define the smallest workable scope', 'h3'),
    createParagraph(stageCopy.step1),
    createHeading('Step 2: Sequence the evidence and argument', 'h3'),
    createParagraph(stageCopy.step2),
    createHeading('Step 3: Test feasibility with a timeline', 'h3'),
    createParagraph(stageCopy.step3),
    createHeading('Common risks and how to correct them'),
    createParagraph(stageCopy.pitfalls),
    createHeading('Conclusion'),
    createParagraph(
      `The point of this ${degree.labelEn.toLowerCase()} ${discipline.titleEn.toLowerCase()} ${stage.titleEn.toLowerCase()} article is to turn a vague writing burden into repeatable actions. When the main question, core evidence, and chapter logic stay aligned, the thesis becomes much easier to advance with confidence.`,
    ),
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
    for (const discipline of disciplines) {
      for (const degree of degrees) {
        const zh = buildChinesePost(degree, discipline, stage)
        const en = buildEnglishPost(degree, discipline, stage)
        const publishedAt = new Date(
          startDate.getTime() + index * 24 * 60 * 60 * 1000,
        ).toISOString()

        posts.push({
          slug: `${degree.slug}-${discipline.slug}-${stage.slug}-guide`,
          categorySlug: degree.categorySlug,
          imageFilename: resolveImageFilename(degree, stage),
          publishedAt,
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

async function loadExistingPostSlugs(
  payload: Awaited<ReturnType<typeof getPayload>>,
  slugs: string[],
) {
  const existingSlugs = new Set<string>()

  for (const slugChunk of chunk(slugs, 50)) {
    const existing = await payload.find({
      collection: 'posts',
      depth: 0,
      limit: slugChunk.length,
      pagination: false,
      select: {
        slug: true,
      },
      where: {
        slug: {
          in: slugChunk,
        },
      },
    })

    for (const doc of existing.docs) {
      if (doc.slug) {
        existingSlugs.add(doc.slug)
      }
    }
  }

  return existingSlugs
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

  const existingSlugs = await loadExistingPostSlugs(
    payload,
    catalog.map((post) => post.slug),
  )

  let createdCount = 0

  for (const post of catalog) {
    if (existingSlugs.has(post.slug)) {
      continue
    }

    const category = categoriesBySlug.get(post.categorySlug)
    const heroImage = mediaByFilename.get(post.imageFilename)

    if (!category || !heroImage) {
      throw new Error(`Missing category or media for post ${post.slug}`)
    }

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

    if (createdCount % 25 === 0) {
      console.log(`[seed:seo] Created ${createdCount} / ${catalog.length} articles...`)
    }
  }

  console.log(`[seed:seo] Completed. Created ${createdCount} new SEO articles.`)
}

main().catch((error) => {
  console.error('[seed:seo] Failed to seed SEO articles.')
  console.error(error)
  process.exit(1)
})
