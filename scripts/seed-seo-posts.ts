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

type WritingHubArticleConfig = {
  checklistEn: [string, string, string]
  checklistZh: [string, string, string]
  closeEn: string
  closeZh: string
  deliverableEn: string
  deliverableZh: string
  introEn: string
  introZh: string
  riskEn: string
  riskZh: string
  stepsEn: [string, string, string]
  stepsZh: [string, string, string]
  strategyEn: string
  strategyZh: string
  submissionEn: string
  submissionZh: string
  titleEn: string
  titleZh: string
  zhihuAngleEn: string
  zhihuAngleZh: string
}

type WritingHubConfig = {
  articles: Record<string, WritingHubArticleConfig>
  categorySlug: string
  evidenceEn: string
  evidenceZh: string
  focusEn: string
  focusZh: string
  labelEn: string
  labelZh: string
  readerEn: string
  readerZh: string
  slug: string
  standardEn: string
  standardZh: string
  topicSlug: string
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
  'research-topic-planning': { zh: '选题与问题定义', en: 'Topic Selection' },
  'literature-reading-review': { zh: '文献阅读与综述', en: 'Literature Review' },
  'structure-abstract-writing': { zh: '摘要引言与结构写作', en: 'Structure Writing' },
  'methods-data-presentation': { zh: '方法设计与结果表达', en: 'Methods and Data' },
  'submission-defense-workflow': { zh: '返修投稿与答辩', en: 'Revision and Submission' },
}

const writingHubs: WritingHubConfig[] = [
  {
    slug: 'research-topic',
    topicSlug: 'question-design',
    categorySlug: 'research-topic-planning',
    labelZh: '选题与问题定义',
    labelEn: 'Topic Selection',
    readerZh: '论文写作者',
    readerEn: 'thesis and paper writers',
    focusZh: '缩题、问题定义和可行性判断',
    focusEn: 'scope control, question design, and feasibility checks',
    evidenceZh: '关键词树、核心文献入口和可取得资料',
    evidenceEn: 'keyword trees, core literature entry points, and feasible source access',
    standardZh: '重点是把宽泛兴趣压成能回答、能检索、能持续推进的研究问题。',
    standardEn:
      'The goal is to compress broad interest into a research question that can be answered, searched, and steadily developed.',
    articles: {
      proposal: {
        titleZh: '论文选题总是太大？先把“兴趣”压成“能回答的问题”',
        titleEn:
          'Topic too broad? Compress a general interest into a question the paper can actually answer',
        introZh:
          '很多人一开始并不是没有方向，而是方向太多，结果题目里同时放进对象、现象、方法和价值判断，写出来像一个愿望清单，却不像一个能推进的研究问题。',
        introEn:
          'Many writers do not start without direction. They start with too many directions at once, so the title tries to contain the object, the phenomenon, the method, and the value claim all together and ends up reading like a wish list instead of a workable research question.',
        zhihuAngleZh:
          '知乎里关于“题目太大怎么办”的高频讨论，反复暴露的不是表达能力差，而是很多人先写了一个好像很重要的大命题，却没有先判断它到底能被什么材料、什么时间和什么篇幅真正回答。',
        zhihuAngleEn:
          'Across recurring Zhihu discussions about overly broad topics, the repeated issue is not poor wording but the habit of naming a grand problem before checking what evidence, time, and length can actually answer it.',
        strategyZh:
          '更稳的做法，是先把题目拆成对象、场景、冲突和判断动作四层，然后删到只剩一条主问题。只要主问题能被回答，副标题、创新表达和背景铺陈都可以后移。',
        strategyEn:
          'A steadier move is to split the topic into object, setting, tension, and judgment move, then cut until only one main question remains. Once that question is answerable, subtitles, novelty language, and background framing can all come later.',
        stepsZh: [
          '先写出你真正想研究的对象和场景，避免只剩“影响、机制、路径”这种空泛大词。',
          '再把题目改写成一个可以被证据回答的问句，检查它是不是同时要求了太多层面的解释。',
          '最后拿时间、资料和篇幅回压题目，凡是当前阶段回答不了的部分，先从主问题里删掉。',
        ],
        stepsEn: [
          'Write down the object and setting you genuinely want to study so the topic is not reduced to broad words like impact, mechanism, or path.',
          'Rewrite the title as an evidence-answerable question and check whether it is secretly demanding too many layers of explanation at once.',
          'Push the question back against time, source access, and length. Anything the current project cannot answer should be removed from the main question first.',
        ],
        submissionZh:
          '如果以后还想把这篇论文发展成投稿稿件，开题时就要顺手留下一页“问题定义说明”：为什么这个问题值得现在回答，读者会是谁，关键词如何进入数据库，哪些材料能够真正支撑结论。后面改成文章时，这一页会比空泛的研究意义更值钱。',
        submissionEn:
          'If this project may later become a submission draft, keep a one-page question-definition note from the beginning: why the question matters now, who the reader is, how the keywords enter databases, and what materials can genuinely support the conclusion. That note becomes far more useful than a vague significance paragraph when the thesis later turns into an article.',
        riskZh:
          '如果题目一直停留在“大方向正确”的层面，最常见的后果不是看起来不专业，而是正文越写越散，最后每一节都沾一点边，却没有任何一节真正回答核心问题。',
        riskEn:
          'If the topic remains at the level of a generally important direction, the most common consequence is not that it looks unprofessional but that the draft spreads wider and wider until every section is adjacent to the topic and none of them truly answer the core question.',
        checklistZh: [
          '1. 题目里是否已经写出对象、场景和判断动作，而不是只有抽象价值词。',
          '2. 这条主问题是否能被现有资料和篇幅回答，而不是默认后面再想办法补。',
          '3. 如果导师只看题目和 150 字摘要，能否立刻看出你到底要回答什么。',
        ],
        checklistEn: [
          '1. Does the title already name the object, the setting, and the judgment move instead of only broad value words?',
          '2. Can the main question be answered by the available sources and length instead of being left to future improvisation?',
          '3. If an advisor only saw the title and a 150-word abstract, would the actual question become visible immediately?',
        ],
        deliverableZh:
          '这一轮写完，你最好能拿到一个收紧后的题目、一句主问题、一张关键词入口表，以及一份说明“为什么现在这题能做”的简短备忘录。',
        deliverableEn:
          'By the end of this round, you should have a tightened title, one clear main question, a keyword-entry sheet, and a short memo explaining why the project is actually feasible now.',
        closeZh:
          '把兴趣压成问题，不是在削弱选题，而是在给整篇论文建立真正能往前推的抓手。',
        closeEn:
          'Compressing interest into a question does not weaken the topic. It gives the whole paper a handle that can actually move forward.',
      },
      'literature-review': {
        titleZh: '看了很多文献还是定不下题？用“争议-对象-方法”重写研究问题',
        titleEn:
          'Still cannot settle the topic after reading a lot? Rewrite the question through dispute, object, and method',
        introZh:
          '很多人定题困难不是因为没读文献，而是读完之后只记住了“这个领域很重要”“这个方向很多人在做”，却没有看见真正能切入的争议和落点。',
        introEn:
          'Many writers struggle to settle a topic not because they have not read enough but because their reading only leaves them with the impression that the field matters and many people are working on it, without revealing the actual disputes or entry points.',
        zhihuAngleZh:
          '知乎上关于“文献读了几十篇还不会定题”的讨论里，高频建议不是再去多读十篇，而是回到争议线、对象边界和方法差异，重新判断自己的问题究竟要从哪一刀切进去。',
        zhihuAngleEn:
          'In Zhihu discussions about reading dozens of papers without finding a topic, the recurring advice is not simply to read ten more but to return to the line of dispute, the object boundary, and the methodological difference and ask where the project should actually cut in.',
        strategyZh:
          '更有效的办法，是把文献不再按作者记，而是按“他们在争什么、争的是谁、各自凭什么这么判断”来重组。只要争议线出来，你的问题就不会继续漂在半空。',
        strategyEn:
          'A more effective move is to stop organizing literature by author name and start grouping it by what the studies are disputing, who or what that dispute is about, and what each side uses to justify its judgment. Once the dispute line appears, the question stops floating in midair.',
        stepsZh: [
          '先从核心文献里找出两个以上互相不完全一致的判断，写下它们真正分歧的点。',
          '再把争议对应到具体对象或场景，避免讨论一直停在“该领域普遍认为”的层面。',
          '最后比较这些研究在材料和方法上的差别，判断你的题目更适合补哪一条空缺。',
        ],
        stepsEn: [
          'Find at least two non-identical judgments in the core literature and write down the precise point where they diverge.',
          'Map that dispute onto a concrete object or setting so the review does not remain at the level of what the field generally believes.',
          'Compare the differences in material and method and decide which missing piece your project is best positioned to add.',
        ],
        submissionZh:
          '如果后续想写成期刊引言，这一步最好顺手产出一版 gap statement：现有讨论分别如何理解这个问题，为什么还不够，你的论文准备在哪个对象或场景上把它往前推一步。',
        submissionEn:
          'If you may later turn this into a journal introduction, use this stage to draft a gap statement: how existing work understands the issue, why that is still insufficient, and in what object or setting your paper will move the conversation one step forward.',
        riskZh:
          '如果文献只被当成“证明这个方向有人做”的背景材料，最后最容易出现的就是题目看上去很稳，正文却永远说不出自己到底在接哪一场学术讨论。',
        riskEn:
          'If the literature is treated only as background proving that the area exists, the topic may look stable while the draft still fails to say which academic conversation it is actually joining.',
        checklistZh: [
          '1. 你的问题是否已经对应到一条明确争议，而不是泛泛地“补充研究”。',
          '2. 文献分组是否基于分歧、对象和方法，而不是阅读顺序和作者名单。',
          '3. 你是否能用两三句话说明自己的题目打算补上哪一段空缺。',
        ],
        checklistEn: [
          '1. Is your question now tied to a clear dispute instead of vaguely claiming to add more research?',
          '2. Are the sources grouped by disagreement, object, and method rather than by reading order and author names?',
          '3. Can you explain in two or three sentences exactly which missing piece your topic intends to fill?',
        ],
        deliverableZh:
          '这一轮结束后，你应该至少拿到一张争议分组表、一句研究缺口、一版更聚焦的问题表达和一份可继续扩写的综述骨架。',
        deliverableEn:
          'By the end of this round, you should have a dispute-grouping sheet, one gap sentence, a more focused question, and a review skeleton that can be expanded without drifting.',
        closeZh:
          '真正能帮你定题的，从来不是“又读了多少篇”，而是你终于看见不同研究到底在哪里没有说到一起。',
        closeEn:
          'What truly helps a topic settle is rarely the number of papers you read. It is the moment you can finally see where the existing studies stop agreeing with one another.',
      },
      'methods-analysis': {
        titleZh: '题目立住后怎么反推方法？先检查证据能不能真的支撑判断',
        titleEn:
          'Once the topic is stable, how do you reverse-design the method? Start by testing whether the evidence can truly support the claim',
        introZh:
          '很多题目看上去已经定下来了，但一进入方法阶段就开始失速，因为作者发现自己想回答的问题太好看，手里的材料却不够支撑那么重的判断。',
        introEn:
          'Many topics appear settled until the methods stage begins and the project loses momentum because the question sounds stronger than the actual material can support.',
        zhihuAngleZh:
          '知乎里关于“题目有了，方法怎么定”的问题，反复出现的一条经验是先别挑最流行的方法，而是先问：你准备得出的那种判断，到底需要什么层级的证据。',
        zhihuAngleEn:
          'In Zhihu questions about choosing a method after finding a topic, one recurring lesson is not to pick the most fashionable method first but to ask what level of evidence the intended judgment actually requires.',
        strategyZh:
          '更稳的路径，是从“你想证明什么”倒推“至少要看到什么材料、哪些比较是必须的、哪些结论现在不能说”。方法不是装饰，而是限制你能安全说到哪一步的边界。',
        strategyEn:
          'A steadier path is to work backward from what you want to prove to the minimum materials you need to see, the comparisons that are necessary, and the claims you still cannot make safely. Method is not decoration. It sets the boundary of how far the argument can go.',
        stepsZh: [
          '先把你想得出的核心判断写出来，标记它需要的最低证据条件。',
          '再检查现有资料能否支撑这些条件，如果不能，就调整问题而不是硬撑方法。',
          '最后把样本、材料和分析动作写成一张对照表，确保每一步都服务主问题。',
        ],
        stepsEn: [
          'Write out the core judgment you hope to reach and mark the minimum evidence conditions it would require.',
          'Check whether your existing materials can satisfy those conditions. If not, adjust the question instead of forcing the method.',
          'Turn the sample, materials, and analytical moves into one alignment sheet so each step clearly serves the main question.',
        ],
        submissionZh:
          '如果后面可能投稿，这一阶段就要开始留存“方法决策痕迹”，包括为什么这样取样、为什么删掉某些设想、哪些结论故意不做过度扩展。编辑和审稿人真正信服的，往往是这些边界意识。',
        submissionEn:
          'If submission is a later possibility, this is the stage to preserve a trail of methodological decisions: why the sample was chosen this way, why some original ideas were dropped, and which claims were intentionally not extended. Editors and reviewers are often persuaded less by boldness than by visible boundary control.',
        riskZh:
          '如果方法只是为了给题目“配一个看起来专业的做法”，最容易发生的就是数据越来越多，论证却越来越虚，因为真正的证据要求从来没有被想清楚。',
        riskEn:
          'If the method is chosen only to give the topic a professional-looking procedure, the project often accumulates more data while the argument becomes weaker because the actual evidence requirement was never clarified.',
        checklistZh: [
          '1. 你的核心判断是否已经对应到最低证据要求，而不是默认材料会自己说明问题。',
          '2. 题目、样本和分析动作之间是否已经形成对照，而不是各自发展。',
          '3. 你是否明确写出了哪些结论当前材料还不能安全支持。',
        ],
        checklistEn: [
          '1. Is the core judgment already tied to a minimum evidence requirement instead of assuming the materials will speak for themselves?',
          '2. Are the topic, the sample, and the analytical moves aligned instead of drifting independently?',
          '3. Have you explicitly named which conclusions the current material still cannot support safely?',
        ],
        deliverableZh:
          '这一轮之后，你应该拿到一张问题-证据-方法对照表、一版可执行的方法说明，以及一条被现实条件压实后的研究主线。',
        deliverableEn:
          'After this round, you should have a question-evidence-method alignment sheet, an executable method note, and a research line that has been tightened by real constraints rather than wishful framing.',
        closeZh:
          '方法真正解决的，不是“让论文像论文”，而是让你的判断有了可以站住的证据底盘。',
        closeEn:
          'The real job of method is not to make the paper look academic. It is to give the judgment a defensible evidence base.',
      },
      'revision-defense': {
        titleZh: '写到一半发现题目跑偏怎么办：缩题、换题还是保留核心命题',
        titleEn:
          'What if the topic drifts halfway through the draft? Decide whether to narrow it, replace it, or keep the core claim',
        introZh:
          '很多论文不是在开始时选题失败，而是在写到中段才发现原来那条主线跑不下去。真正难的不是承认题目有问题，而是判断该缩哪一层、该保留哪一层。',
        introEn:
          'Many projects do not fail at the moment of topic selection. They fail halfway through, when the original line no longer moves. The hard part is not admitting the topic has a problem but deciding which layer to narrow and which layer to preserve.',
        zhihuAngleZh:
          '知乎上关于“要不要换题”的讨论里，一个高频提醒是：别一受挫就整题推翻。很多时候真正需要调整的不是对象本身，而是问题问得太重、太宽，或者章节任务和题目承诺对不上。',
        zhihuAngleEn:
          'In Zhihu discussions on whether to change the topic entirely, one repeated warning is not to demolish the whole project at the first setback. Often the object is still usable; the problem is that the question was asked too broadly or the chapter tasks no longer match the promise of the title.',
        strategyZh:
          '更稳的修正方式，是把题目拆成“核心命题、外层 framing、材料范围、方法力度”四部分，看看究竟是哪一层失真。只有先定位失真层，缩题或换题才不会把已经成立的部分一起砍掉。',
        strategyEn:
          'A steadier correction is to split the topic into the core claim, the outer framing, the material range, and the methodological intensity, then identify which layer has become distorted. Only after locating that layer can narrowing or replacing the topic avoid destroying what already works.',
        stepsZh: [
          '先判断真正失速的是主问题本身，还是章节安排、材料范围或写法承诺。',
          '再保留已经站稳的对象和材料，优先缩掉暂时支撑不住的外层命题。',
          '最后同步修改标题、摘要和目录，让新版题目和现有正文重新对齐。',
        ],
        stepsEn: [
          'Decide first whether the real failure lies in the main question itself or in the chapter plan, material range, or promise of the writing.',
          'Keep the object and materials that already stand, and narrow the outer claim that the project cannot currently support.',
          'Then revise the title, abstract, and outline together so the updated topic realigns with the draft that already exists.',
        ],
        submissionZh:
          '如果以后要投稿或答辩，这类调整更要留下版本说明：原来承诺了什么，为什么现在改，改后更能被什么材料支撑。这个解释在导师沟通、返修回应和答辩问答里都很关键。',
        submissionEn:
          'If submission or defense is still ahead, this kind of correction should leave a visible version note: what the original project promised, why the change was made, and what the revised framing is now better supported by. That explanation becomes useful in advisor discussions, response letters, and oral defense questions alike.',
        riskZh:
          '最危险的不是缩题，而是一边意识到原题跑不通，一边又舍不得改承诺，结果标题、摘要和正文各说各的，整篇论文的可信度会一起掉下来。',
        riskEn:
          'The most dangerous move is not narrowing the topic but realizing the original promise no longer works and still refusing to revise it. Then the title, abstract, and body begin telling different stories and the credibility of the whole paper falls with them.',
        checklistZh: [
          '1. 你是否已经定位清楚是哪一层出了问题，而不是笼统地觉得“这题不行了”。',
          '2. 标题、摘要、目录和正文是否已经同步到新的主线，而不是只改了表面说法。',
          '3. 你是否能解释为什么新版题目比旧版更可做、更可答、更可 defend。',
        ],
        checklistEn: [
          '1. Have you identified which layer actually failed instead of vaguely concluding that the whole topic no longer works?',
          '2. Are the title, abstract, outline, and main body already synchronized to the revised line instead of only changing surface wording?',
          '3. Can you explain why the new version is more feasible, more answerable, and more defensible than the old one?',
        ],
        deliverableZh:
          '这一轮之后，你应该得到一版收紧后的题目与摘要、一张版本调整说明，以及一套能向导师或评审解释“为什么这样改”的口径。',
        deliverableEn:
          'By the end of this round, you should have a tightened title and abstract, a version-adjustment note, and one stable explanation for why the project was revised in this particular direction.',
        closeZh:
          '题目跑偏并不等于前面都白写了，关键是你能不能把还能成立的核心命题保下来。',
        closeEn:
          'Topic drift does not mean the previous work was wasted. The real task is to preserve the core claim that still stands.',
      },
    },
  },
  {
    slug: 'literature-reading',
    topicSlug: 'review-workflow',
    categorySlug: 'literature-reading-review',
    labelZh: '文献阅读与综述',
    labelEn: 'Literature Review',
    readerZh: '论文写作者',
    readerEn: 'thesis and paper writers',
    focusZh: '检索、阅读、分类和综述组织',
    focusEn: 'search strategy, reading, grouping, and review organization',
    evidenceZh: '检索式、文献矩阵、阅读笔记和争议分组',
    evidenceEn: 'search strings, literature matrices, reading notes, and dispute groupings',
    standardZh: '重点不是把文献读得越多越好，而是把可复用的比较和判断尽早沉淀下来。',
    standardEn:
      'The point is not to read as many sources as possible but to deposit reusable comparison and judgment early.',
    articles: {
      proposal: {
        titleZh: '别上来就盲搜：先搭关键词树和第一版文献入口表',
        titleEn:
          'Do not begin with blind searching: build a keyword tree and a first literature entry sheet',
        introZh:
          '很多人一想到要写综述，就立刻去数据库里狂搜一轮，最后下载了一堆 PDF，却说不清哪些词真正有效、哪些入口最能靠近自己的问题。',
        introEn:
          'Many writers respond to the need for a review by rushing into databases and downloading a stack of PDFs, only to realize later that they cannot explain which search terms worked or which entry points actually led toward the question.',
        zhihuAngleZh:
          '知乎里关于“怎么找文献”的高频回答里，最值得拿来实践的不是“多下几篇”，而是先拆关键词、搭同义词树、记录哪些组合能稳定带来高价值结果。',
        zhihuAngleEn:
          'In recurring Zhihu answers on how to find literature, the most practical lesson is not to download more papers but to split the keywords, build a synonym tree, and record which combinations reliably produce high-value results.',
        strategyZh:
          '更稳的检索起点，是先把研究对象、现象、方法和边界词拆开，再组合成几条不同强度的检索式。这样后面读到的文献才会有路径感，而不是随机堆积。',
        strategyEn:
          'A steadier search start is to separate the research object, the phenomenon, the method, and the boundary terms, then recombine them into search strings of different intensity. That gives the reading process a path instead of a random pile.',
        stepsZh: [
          '先把题目里的大词拆成核心词、近义词和边界词，避免检索只靠一个习惯用词。',
          '再为不同数据库准备不同版本的检索式，并记录每组结果的质量差异。',
          '最后把高价值入口文献单独列出来，形成第一版阅读顺序和跟读路径。',
        ],
        stepsEn: [
          'Break the large terms in the topic into core terms, synonyms, and boundary terms so the search does not depend on one habitual phrase.',
          'Prepare different search strings for different databases and record the quality differences among the result sets.',
          'Separate the highest-value entry papers into a first reading order and a follow-the-citations path.',
        ],
        submissionZh:
          '如果以后想把综述写成更成熟的引言或 review，这份检索记录非常有价值。它会直接影响你后面能否解释“为什么选这些文献、为什么这些关键词代表这个领域”。',
        submissionEn:
          'If the review may later mature into a stronger introduction or even a standalone review, this search record becomes very valuable. It determines whether you can later explain why these sources were chosen and why these keywords represent the field.',
        riskZh:
          '如果一开始就盲搜，后面最容易出现的不是文献不够，而是完全复盘不了自己的阅读路径，结果综述写到一半就找不到稳定的检索逻辑。',
        riskEn:
          'If the search starts blindly, the later problem is often not too few sources but an inability to reconstruct the reading path, which leaves the review without a stable search logic halfway through.',
        checklistZh: [
          '1. 你是否已经有一张关键词树，而不是只靠脑海里的几个大词搜。',
          '2. 不同数据库的检索式和结果质量是否已经做过初步比较。',
          '3. 第一批入口文献是否已经被单独标记出来，形成可跟进的阅读清单。',
        ],
        checklistEn: [
          '1. Do you already have a keyword tree instead of relying on a few broad words from memory?',
          '2. Have you compared search strings and result quality across different databases at least once?',
          '3. Have the first batch of entry papers been marked clearly enough to form a followable reading list?',
        ],
        deliverableZh:
          '这一轮之后，你应该有一张关键词树、一份检索记录、一个高价值入口文献表和一条更可控的阅读路径。',
        deliverableEn:
          'After this round, you should have a keyword tree, a search log, a high-value entry-paper sheet, and a more controllable reading path.',
        closeZh:
          '检索做得越清楚，后面的综述越不靠运气，越靠你自己已经搭好的入口系统。',
        closeEn:
          'The clearer the search design becomes, the less the later review depends on luck and the more it depends on an entry system you deliberately built.',
      },
      'literature-review': {
        titleZh: '文献综述怎么分类才不是流水账：按争议、方法和结论分组',
        titleEn:
          'How can a literature review avoid becoming a timeline? Group sources by dispute, method, and conclusion',
        introZh:
          '很多综述看起来信息很多，但一段接一段地介绍“谁说了什么”，最后读者只会觉得材料密，却看不出作者自己的判断在哪里。',
        introEn:
          'Many reviews appear rich in information, yet they move paragraph by paragraph through who said what, leaving the reader with density but no sense of the writer’s own judgment.',
        zhihuAngleZh:
          '知乎上关于“综述为什么总像文献堆积”的讨论，经常会提到一个关键点：不是你不会总结，而是你一直在按文章排列，而没有按问题排列。',
        zhihuAngleEn:
          'Zhihu discussions on why literature reviews often feel like source piles repeatedly point to one issue: the problem is not an inability to summarize but the habit of arranging the review by paper instead of by question.',
        strategyZh:
          '更稳的综述结构，通常至少要同时处理三层：研究在争什么、他们各自怎么做、结论如何分化。只要按这三层分组，综述就会逐渐从“摘录整合”变成“比较判断”。',
        strategyEn:
          'A steadier review structure usually works across three layers at once: what the research is disputing, how the studies proceed, and how the conclusions split. Once those three layers organize the section, the review begins to move from summary toward comparison and judgment.',
        stepsZh: [
          '先把现有文献按争议线分组，每组都要有一句“他们在争什么”。',
          '再比较每组内部常用的方法和材料，写出为什么会出现不同结论。',
          '最后让每组文献都回到你的论文任务，说明这一组对你的研究意味着什么。',
        ],
        stepsEn: [
          'Group the existing literature by line of dispute, and make sure each group can be described by one sentence naming what it is debating.',
          'Compare the methods and materials inside each group and write down why different conclusions emerge.',
          'Return each group to your own project and explain what that cluster means for your study.',
        ],
        submissionZh:
          '如果这篇内容以后要变成期刊引言，最值得提前打磨的就是每组文献后的判断句。编辑和审稿人通常先看你是否真的看到了“研究之间的关系”，而不是只看你列了多少篇。',
        submissionEn:
          'If this material later becomes part of a journal introduction, the most valuable sentence to sharpen is the judgment line at the end of each group. Editors and reviewers often look first for whether you truly saw the relationships among studies, not for how many papers you listed.',
        riskZh:
          '如果综述始终按作者排队，最常见的后果不是“看起来不学术”，而是你明明读了很多，论文却始终生不出研究空白和理论位置。',
        riskEn:
          'If the review remains arranged author by author, the common consequence is not merely that it looks less academic but that the project cannot generate a real research gap or theoretical position despite extensive reading.',
        checklistZh: [
          '1. 每组文献是否都有一句争议定义，而不只是主题名称。',
          '2. 你是否写出了不同方法或材料如何导致不同结论。',
          '3. 每一组综述后面是否都能回扣到你的论文问题。',
        ],
        checklistEn: [
          '1. Does each literature group have a sentence defining its dispute rather than only a topic label?',
          '2. Have you written how differences in method or material produce different conclusions?',
          '3. Does every review cluster return explicitly to your own research question?',
        ],
        deliverableZh:
          '这一轮结束后，你应该得到一版按争议和方法组织的综述骨架、几句真正能用的比较句，以及一条更清楚的研究切入线。',
        deliverableEn:
          'By the end of this round, you should have a review skeleton organized by dispute and method, several reusable comparison sentences, and a clearer line of entry for your own study.',
        closeZh:
          '综述一旦按问题而不是按作者组织，作者自己的研究位置就开始真正显形。',
        closeEn:
          'Once the review is organized by problem rather than by author, the writer’s own position begins to appear for real.',
      },
      'methods-analysis': {
        titleZh: '读方法论文到底在记什么：把可复用操作和不可照搬条件分开',
        titleEn:
          'What should you extract from methods papers? Separate reusable operations from conditions that cannot be copied',
        introZh:
          '很多人读方法论文时会抄下模型、变量或步骤，却没有同时记住它成立的前提条件。结果看似学到了方法，真正写自己论文时却不知道哪些能用、哪些不能搬。',
        introEn:
          'Many writers copy models, variables, or steps from methods papers without recording the conditions that made those choices valid. The result is the illusion of learning a method without knowing what can be reused and what cannot simply be transplanted.',
        zhihuAngleZh:
          '知乎里关于“如何借鉴别人方法”的讨论里，一个很重要的提醒是：别只抄结论和流程，要抄的是问题类型、数据条件、操作口径和边界说明。',
        zhihuAngleEn:
          'In Zhihu discussions on borrowing methods from earlier papers, a crucial reminder is not to copy the conclusion or the workflow alone but to capture the problem type, the data conditions, the operational rules, and the boundary explanation.',
        strategyZh:
          '更有效的读法，是把方法论文拆成两层笔记：一层记可复用动作，一层记成立条件。只有两层一起记，你后面才能判断某个方法是真的适合自己，还是只是看起来高级。',
        strategyEn:
          'A more effective reading practice is to split each methods paper into two note layers: reusable actions and enabling conditions. Only when both are recorded can you decide whether a method truly fits your project or merely looks sophisticated.',
        stepsZh: [
          '先记录这篇方法文献解决的是什么问题，别上来就记技术细节。',
          '再把可复用的操作步骤和它成立所需的数据、样本或场景条件分别写开。',
          '最后回看自己的论文，判断哪些条件满足、哪些不满足，再决定要不要借用。',
        ],
        stepsEn: [
          'Record first what problem the methods paper is solving instead of rushing into technical details.',
          'Separate the reusable operations from the data, sample, or contextual conditions that make them valid.',
          'Return to your own paper, check which conditions are met and which are not, and only then decide whether to adopt the method.',
        ],
        submissionZh:
          '如果以后要投稿，这种条件意识非常重要。审稿人最常问的不是“你是不是用了某方法”，而是“你这个场景为什么可以这么用”。前期笔记留得越清楚，后面回应越稳。',
        submissionEn:
          'If submission is part of the later path, this awareness of conditions matters greatly. Reviewers rarely ask only whether you used a method; they ask why your context justifies using it. The clearer the earlier notes are, the steadier the later response becomes.',
        riskZh:
          '如果只抄方法步骤，不记成立前提，最容易发生的就是论文里塞进了一个漂亮方法，但它和自己的问题、样本或资料并不真正匹配。',
        riskEn:
          'If the workflow is copied without the enabling conditions, the paper often ends up with an elegant-looking method that does not genuinely match the question, the sample, or the available material.',
        checklistZh: [
          '1. 你的方法笔记是否已经区分“可复用动作”和“成立条件”。',
          '2. 你是否知道某个方法原来是为了解决什么类型的问题。',
          '3. 在借用之前，你是否检查过自己的样本、数据和场景是否真的满足前提。',
        ],
        checklistEn: [
          '1. Do your methods notes now separate reusable operations from enabling conditions?',
          '2. Do you know what type of problem the original method was designed to solve?',
          '3. Before borrowing it, have you checked whether your sample, data, and context actually satisfy its assumptions?',
        ],
        deliverableZh:
          '这一轮之后，你应该拿到一份更像“方法判断表”的阅读笔记，而不是只有术语和流程摘录。',
        deliverableEn:
          'After this round, your reading notes should look more like a method-judgment sheet than a list of terms and copied procedures.',
        closeZh:
          '方法文献最值得学的，往往不是它表面上的招式，而是它为什么在那个条件下成立。',
        closeEn:
          'The most valuable lesson in a methods paper is often not the visible technique but why it works under those conditions.',
      },
      'revision-defense': {
        titleZh: '导师说综述不够深时怎么补：补核心文献，不补无效材料',
        titleEn:
          'How do you respond when the advisor says the review lacks depth? Add core literature, not useless volume',
        introZh:
          '很多人一听到“综述不够深”，第一反应就是再搜几十篇、再补十几页。但真正让综述变深的，通常不是篇数，而是有没有补到核心争议和关键缺口。',
        introEn:
          'When advisors say the review lacks depth, many writers respond by collecting dozens more sources and adding more pages. Yet what deepens a review is usually not volume but whether the core disputes and crucial missing strands were actually added.',
        zhihuAngleZh:
          '知乎里关于“导师说综述不深怎么办”的经验贴，反复强调的都不是盲目加量，而是先问：缺的是代表性研究、最新争议，还是你自己的比较句和判断句。',
        zhihuAngleEn:
          'Zhihu posts on responding to feedback that a review is not deep repeatedly stress that the first question is not how much to add but whether the review is missing representative studies, current disputes, or the writer’s own comparison and judgment sentences.',
        strategyZh:
          '更稳的补法，是先诊断深度缺口属于哪一类，再定点补强。缺代表性研究就补核心文献，缺争议就补对立观点，缺判断就重写比较句，而不是把所有问题都交给“再加几篇”。',
        strategyEn:
          'A steadier fix is to diagnose which kind of depth is missing and then reinforce that exact layer. If representative work is missing, add the core studies. If the dispute is missing, add opposing views. If judgment is missing, rewrite the comparison sentences instead of handing every problem to the phrase add more papers.',
        stepsZh: [
          '先把导师或评审的“深度不够”拆成代表性、争议线和判断句三个维度。',
          '再对照现有综述，确认究竟是缺文献，还是文献在但没有被写成比较。',
          '最后只补最关键的一批核心材料，并同步重写分组段落的判断句。',
        ],
        stepsEn: [
          'Break the comment review lacks depth into three dimensions: representativeness, dispute line, and judgment sentence.',
          'Compare that diagnosis to the current draft and decide whether the issue is missing sources or sources that were never written comparatively.',
          'Add only the most critical core materials and rewrite the judgment lines of the grouped paragraphs at the same time.',
        ],
        submissionZh:
          '如果后面还要投稿，这一步尤其关键，因为编辑和审稿人通常不会因为你引用多就买账，他们更在意你是不是抓住了领域里真正决定定位的那几条文献线索。',
        submissionEn:
          'This step matters even more if submission is still ahead, because editors and reviewers are rarely convinced by citation volume alone. They care much more about whether you captured the few literature lines that actually determine positioning in the field.',
        riskZh:
          '最常见的误区，就是把“深度不够”理解成“数量不够”，最后综述更长了，但还是没有补到最值钱的代表性研究和比较判断。',
        riskEn:
          'The most common mistake is to read lack of depth as lack of quantity. The review becomes longer while still failing to add the most valuable representative studies and comparative judgments.',
        checklistZh: [
          '1. 你是否已经区分“缺文献”和“缺判断”这两类问题。',
          '2. 补进去的新材料是否真的是核心研究，而不是相关但低价值的外围文献。',
          '3. 综述重写后是否出现了更清楚的比较句和研究空白句。',
        ],
        checklistEn: [
          '1. Have you separated the problem of missing literature from the problem of missing judgment?',
          '2. Are the newly added materials truly core studies rather than loosely related peripheral sources?',
          '3. After revision, does the review contain clearer comparison sentences and a sharper gap statement?',
        ],
        deliverableZh:
          '这一轮后，你应该得到一版被核心研究重新校准过的综述，而不是一篇页数增加但结构没变的旧稿。',
        deliverableEn:
          'After this round, you should have a review recalibrated by core scholarship rather than an older draft that merely gained more pages.',
        closeZh:
          '综述的深度不是靠数量堆出来的，而是靠你终于补到了真正决定判断的位置。',
        closeEn:
          'Depth in a review is not built by quantity alone but by finally reinforcing the places where judgment is actually decided.',
      },
    },
  },
  {
    slug: 'paper-structure',
    topicSlug: 'section-writing',
    categorySlug: 'structure-abstract-writing',
    labelZh: '摘要引言与结构写作',
    labelEn: 'Structure Writing',
    readerZh: '论文写作者',
    readerEn: 'thesis and paper writers',
    focusZh: '摘要、引言、章节边界和论证展开',
    focusEn: 'abstracts, introductions, section boundaries, and argumentative flow',
    evidenceZh: '摘要草稿、引言结构、章节提纲和图表说明',
    evidenceEn: 'abstract drafts, introduction structure, section outlines, and figure notes',
    standardZh: '重点是让前文、正文和结尾各司其职，而不是每一段都在重复同一件事。',
    standardEn:
      'The goal is to let the front matter, the main body, and the ending do different jobs instead of repeating the same move everywhere.',
    articles: {
      proposal: {
        titleZh: '开题前先写迷你摘要：用 150 字测试题目、对象和贡献',
        titleEn:
          'Write a mini abstract before the proposal: test the topic, object, and contribution in 150 words',
        introZh:
          '很多人把摘要当成最后一步才写的东西，所以直到写了很久才发现题目、对象和贡献其实从来没有被压缩成一句可读的话。',
        introEn:
          'Many writers treat the abstract as something to write only at the very end, so they discover far too late that the topic, object, and contribution were never compressed into one readable line.',
        zhihuAngleZh:
          '知乎上关于“摘要怎么写”的高频经验里，一个特别值得借用的方法就是先写迷你摘要，因为它能提前暴露题目过大、对象不清和贡献太虚这些问题。',
        zhihuAngleEn:
          'Among recurring Zhihu suggestions on writing abstracts, one especially useful move is to draft a mini abstract first because it exposes broad topics, unclear objects, and vague contributions early.',
        strategyZh:
          '更稳的做法，是在开题前就先写一版 120 到 180 字的迷你摘要，强迫自己用最短篇幅交代对象、问题、做法和预期判断。写不顺，往往不是摘要的问题，而是题目本身还没站稳。',
        strategyEn:
          'A steadier move is to write a 120-to-180-word mini abstract before the proposal, forcing yourself to state the object, question, approach, and expected judgment in the shortest possible space. If it does not read clearly, the problem is often not the abstract but the topic itself.',
        stepsZh: [
          '先用一句话写研究对象和场景，不要一开始就塞满背景和意义。',
          '再用一句话说明你想回答什么，以及打算依靠什么材料或路径来回答。',
          '最后补一句可能的贡献或判断，检查它是不是具体到能被理解，而不是只有“有助于”。',
        ],
        stepsEn: [
          'Write one sentence naming the object and setting before adding background or significance.',
          'Add one sentence explaining what you want to answer and what material or route you expect to use.',
          'Finish with one sentence about the likely contribution or judgment and test whether it is concrete enough to be understood.',
        ],
        submissionZh:
          '如果后面还想投稿，这个迷你摘要会直接变成未来摘要和 Cover Letter 的底稿。越早把这三四句磨顺，后面越不容易出现“全文写完了，摘要还是说不清”的状况。',
        submissionEn:
          'If submission is a later goal, this mini abstract becomes the first draft of both the future abstract and the cover letter. The earlier these few sentences are sharpened, the less likely the full paper is to end with an abstract that still cannot explain itself.',
        riskZh:
          '如果摘要始终拖到最后才写，最常见的后果不是多花一点时间，而是题目和正文已经走了很远，作者却直到收尾才看见自己的主线其实没有被说清楚。',
        riskEn:
          'If the abstract is always postponed to the end, the common consequence is not merely extra work but the late discovery that the title and the body have traveled far without ever clarifying the real line of the paper.',
        checklistZh: [
          '1. 150 字内是否已经出现对象、问题、做法和预期判断。',
          '2. 迷你摘要是否能独立读懂，而不是必须靠后文背景补完。',
          '3. 如果写不顺，你是否回头修改了题目和问题，而不是只怪摘要难写。',
        ],
        checklistEn: [
          '1. Within 150 words, do the object, question, approach, and expected judgment already appear?',
          '2. Can the mini abstract be understood on its own instead of depending on later background?',
          '3. If it does not read clearly, did you revise the topic and question instead of blaming the abstract alone?',
        ],
        deliverableZh:
          '这一轮后，你应该拿到一版可复用的迷你摘要，以及一条更紧的题目和问题线。',
        deliverableEn:
          'By the end of this round, you should have a reusable mini abstract and a tighter line connecting the topic and the question.',
        closeZh:
          '摘要越早写，不是为了提前交差，而是为了尽早看见整篇论文最核心的表达有没有站住。',
        closeEn:
          'Writing the abstract early is not about finishing ahead of time. It is about seeing as soon as possible whether the core expression of the whole paper actually stands.',
      },
      'literature-review': {
        titleZh: '摘要、引言、综述总写串？先把三者的任务彻底分开',
        titleEn:
          'Abstract, introduction, and review keep blending together? Separate their jobs completely first',
        introZh:
          '很多论文前半部分会显得又长又绕，并不是作者没有内容，而是摘要、引言和综述在重复做同一件事，导致读者读了几页还不知道正文真正从哪里开始。',
        introEn:
          'Many papers feel long and circular in the opening pages not because the writer lacks material but because the abstract, introduction, and review are repeating the same job, leaving readers unsure where the paper really begins.',
        zhihuAngleZh:
          '知乎上关于“引言和综述有什么区别”的讨论里，一个高频误区就是把引言写成缩短版综述，或者把综述写成放大版摘要，结果三部分都失焦。',
        zhihuAngleEn:
          'In Zhihu discussions on the difference between an introduction and a literature review, a recurring mistake is turning the introduction into a shortened review or the review into an expanded abstract, which leaves all three sections unfocused.',
        strategyZh:
          '更清楚的分工通常是：摘要负责快速交代全貌，引言负责把读者带进问题，综述负责交代已有研究和你的进入位置。只要三者职责分开，前文就不会互相抢活。',
        strategyEn:
          'A clearer division of labor is simple: the abstract gives the whole picture quickly, the introduction brings the reader into the problem, and the review explains the existing research plus your point of entry. Once the jobs are separated, the opening sections stop competing with each other.',
        stepsZh: [
          '先检查摘要里有没有塞太多背景，如果有，就删到只剩必要信息。',
          '再让引言只承担“把问题立起来”的任务，不要提前展开整套文献梳理。',
          '最后把综述改成真正的研究关系说明，而不是把引言换个说法再写一遍。',
        ],
        stepsEn: [
          'Check whether the abstract carries too much background and cut it back to only what is necessary.',
          'Let the introduction do the job of establishing the problem instead of unfolding the whole literature map in advance.',
          'Rewrite the review as a section about research relationships rather than a second version of the introduction.',
        ],
        submissionZh:
          '如果后面要投稿，这一步尤其重要，因为编辑通常只看前几段就会形成第一印象。前文三部分分工越清楚，稿件越容易显得成熟、可读、知道自己在做什么。',
        submissionEn:
          'This step matters even more if the piece may later be submitted, because editors form their first impression in the first few paragraphs. The clearer the division among these sections, the more mature and readable the manuscript feels.',
        riskZh:
          '如果三部分一直混写，最容易出现的就是前文越来越长，信息越来越多，但读者始终看不到问题是如何被一步步推出来的。',
        riskEn:
          'If these three sections remain blended, the front matter often grows longer and denser while readers still cannot see how the central problem is being built step by step.',
        checklistZh: [
          '1. 摘要是否已经删到只保留快速交代全貌所需的信息。',
          '2. 引言是否把重点放在问题和切入，而不是重复综述内容。',
          '3. 综述是否真正说明了已有研究关系和你的进入位置。',
        ],
        checklistEn: [
          '1. Has the abstract been reduced to only the information needed to present the whole picture quickly?',
          '2. Does the introduction focus on the problem and point of entry instead of repeating review content?',
          '3. Does the review truly explain the relationships among prior studies and your own point of entry?',
        ],
        deliverableZh:
          '这一轮之后，你应该得到一套分工更清楚的前文结构，而不是三个相互重叠的开头。',
        deliverableEn:
          'After this round, you should have a front-end structure with clear division of labor instead of three overlapping openings.',
        closeZh:
          '当前文各部分都做回自己该做的事，读者对论文主线的把握会立刻清楚很多。',
        closeEn:
          'When each front section returns to its own job, the reader’s grasp of the paper’s main line becomes dramatically clearer.',
      },
      'methods-analysis': {
        titleZh: '结果和讨论总是糊成一团？用“发现-证据-解释”拆开写',
        titleEn:
          'Results and discussion keep collapsing together? Separate them through finding, evidence, and interpretation',
        introZh:
          '很多正文写到分析部分时开始变得吃力，不是因为没有结果，而是结果一出来就急着解释，解释完又回头补证据，最后整段像在打结。',
        introEn:
          'Many drafts become difficult at the analysis stage not because there are no results but because each result is explained too early, then evidence is added afterward, and the paragraph ties itself into a knot.',
        zhihuAngleZh:
          '知乎里关于“结果和讨论怎么区分”的高频建议里，最有用的一条通常是先把“你看到了什么”和“你怎么理解它”拆开写，不要在同一句里同时做三件事。',
        zhihuAngleEn:
          'One of the most useful recurring Zhihu suggestions on separating results from discussion is to split what you observed from how you interpret it instead of trying to do all three moves in one sentence.',
        strategyZh:
          '更稳的写法，是让每个分析单元至少经过三步：先说发现，再给证据，最后解释意义。这样结果负责呈现，讨论负责判断，读者也更容易跟上你的逻辑。',
        strategyEn:
          'A steadier writing pattern is to move each analytical unit through three steps: name the finding, give the evidence, then interpret the meaning. Results present, discussion judges, and readers can follow the logic more easily.',
        stepsZh: [
          '先把每个段落的第一句改成明确发现，不要一上来就下结论。',
          '再把支撑该发现的图表、数据或材料放紧，避免证据总是拖到后面才出现。',
          '最后另起一句做解释，说明这个发现为什么重要、和前文问题有什么关系。',
        ],
        stepsEn: [
          'Turn the first sentence of each paragraph into a clear finding instead of an immediate interpretation.',
          'Place the figure, data, or material supporting that finding close behind it instead of delaying the evidence.',
          'Use a separate sentence for interpretation, explaining why the finding matters and how it connects back to the question.',
        ],
        submissionZh:
          '如果后面要投稿，这种结构会直接影响可读性。编辑和审稿人常常不是不同意你的解释，而是根本还没看清你到底先发现了什么。把三步拆开，很多争议会自然减少。',
        submissionEn:
          'If the manuscript may later be submitted, this structure directly affects readability. Editors and reviewers often do not disagree with the interpretation so much as fail to see the finding clearly in the first place. Separating the three moves often removes that friction on its own.',
        riskZh:
          '如果结果和讨论一直混写，最容易出现的问题不是段落变长，而是你的核心发现会被自己的解释淹没，读者很难判断证据到底支持了什么。',
        riskEn:
          'If results and discussion remain blended, the main problem is not paragraph length but that the core finding gets buried under its own interpretation and the reader cannot tell what the evidence actually supports.',
        checklistZh: [
          '1. 每个分析段落是否都有一句清楚的发现句。',
          '2. 发现后面是否紧跟对应证据，而不是隔了几层解释才出现。',
          '3. 解释句是否独立承担意义判断，而不是把证据和意义揉成一团。',
        ],
        checklistEn: [
          '1. Does every analysis paragraph contain one clear finding sentence?',
          '2. Does the evidence follow the finding closely instead of appearing after layers of explanation?',
          '3. Does the interpretation sentence carry the judgment separately rather than mixing evidence and meaning together?',
        ],
        deliverableZh:
          '这一轮结束后，你应该拿到一版更清楚的分析段落模板，让结果和讨论都各自站住。',
        deliverableEn:
          'By the end of this round, you should have a cleaner paragraph template that allows both the results and the discussion to stand on their own.',
        closeZh:
          '把“看到什么”和“如何理解”拆开，不会削弱论证，反而会让论证更容易被读懂和接受。',
        closeEn:
          'Separating what you found from how you interpret it does not weaken the argument. It makes the argument easier to read and easier to trust.',
      },
      'revision-defense': {
        titleZh: '摘要、结论、答辩陈述怎么同步：先统一一句主张',
        titleEn:
          'How do you synchronize the abstract, conclusion, and defense script? Start from one shared claim sentence',
        introZh:
          '很多论文临近定稿时会出现一个典型问题：正文已经改过很多轮，但摘要、结论和答辩口径还停留在旧版本，结果同一篇论文对外会说出三套不同故事。',
        introEn:
          'A common late-stage problem is that the main body has already gone through many revisions while the abstract, the conclusion, and the defense script remain stuck in older versions, leaving the same project telling three different stories.',
        zhihuAngleZh:
          '知乎里关于“答辩怎么讲”和“摘要怎么改”的讨论常常会指向同一个根源问题：作者没有先把最核心的一句主张定下来，所以每个场景都在临时组织语言。',
        zhihuAngleEn:
          'Zhihu discussions on how to present a defense and how to revise an abstract often point back to the same root problem: the writer never fixed one central claim sentence first, so every context requires improvised wording.',
        strategyZh:
          '更稳的同步方式，是先写一句 25 到 40 字的核心主张，再让摘要、结论和答辩开场都围着它展开。三者可以长短不同，但判断方向必须一致。',
        strategyEn:
          'A steadier way to synchronize them is to draft one central claim sentence of about 25 to 40 words and let the abstract, the conclusion, and the defense opening all unfold around it. Their lengths can differ, but the direction of judgment must stay aligned.',
        stepsZh: [
          '先从正文里提炼一句最能代表研究贡献和边界的主张句。',
          '再检查摘要和结论是否都围绕这句话，而不是各自强调不同重点。',
          '最后用这句话做答辩开场，测试口头表达和书面表达是否已经打通。',
        ],
        stepsEn: [
          'Extract one claim sentence from the main body that best captures the contribution and the boundary of the study.',
          'Check whether the abstract and conclusion both revolve around that sentence instead of stressing different priorities.',
          'Use the same sentence to open the defense and test whether the oral and written versions now align.',
        ],
        submissionZh:
          '如果后续还要投稿或返修，这句核心主张也可以继续延伸成 Cover Letter 第一段和回复信中的总回应。越早统一口径，越不容易在不同场景里自相矛盾。',
        submissionEn:
          'If submission or revision still lies ahead, this same core claim can later anchor the first paragraph of the cover letter and the framing of the response file. The earlier the message is unified, the less likely the project is to contradict itself across contexts.',
        riskZh:
          '如果不同文本继续各说各的，最危险的不是风格不统一，而是读者会怀疑作者自己都没有想清楚这篇论文到底想证明什么。',
        riskEn:
          'If the different texts continue to tell different versions, the real danger is not stylistic inconsistency but that readers begin to suspect the writer has not decided what the paper is actually trying to prove.',
        checklistZh: [
          '1. 你是否已经写出一句可以同时放进摘要、结论和答辩开场的核心主张。',
          '2. 三个场景的表达是否只是长短不同，而不是判断方向不同。',
          '3. 如果导师追问贡献和局限，你是否能用同一套语言稳定回应。',
        ],
        checklistEn: [
          '1. Have you drafted one core claim sentence that can appear in the abstract, the conclusion, and the defense opening?',
          '2. Do the three contexts now differ mainly in length rather than in judgment direction?',
          '3. If an advisor asks about contribution and limitation, can you answer with one stable vocabulary set?',
        ],
        deliverableZh:
          '这一轮之后，你应该拿到一版统一口径的摘要、结论和答辩开场，而不是三个各自成稿的小文本。',
        deliverableEn:
          'After this round, you should have an abstract, conclusion, and defense opening that speak with one voice rather than three disconnected mini-texts.',
        closeZh:
          '论文越接近完成，越需要一句真正稳定的主张来把所有对外表达重新拧紧。',
        closeEn:
          'The closer the paper gets to completion, the more it needs one stable claim sentence to tighten every outward-facing expression again.',
      },
    },
  },
  {
    slug: 'methods-data',
    topicSlug: 'evidence-design',
    categorySlug: 'methods-data-presentation',
    labelZh: '方法设计与结果表达',
    labelEn: 'Methods and Data',
    readerZh: '论文写作者',
    readerEn: 'thesis and paper writers',
    focusZh: '理论落地、方法设计、证据组织和图表表达',
    focusEn: 'theory translation, method design, evidence organization, and figure presentation',
    evidenceZh: '样本说明、变量口径、图表脚本和分析记录',
    evidenceEn: 'sample notes, variable definitions, figure scripts, and analysis logs',
    standardZh: '重点不是把方法写得复杂，而是把证据链写得可复核、可解释、可回应追问。',
    standardEn:
      'The goal is not to make the method look complicated but to make the evidence chain reviewable, explainable, and answerable under scrutiny.',
    articles: {
      proposal: {
        titleZh: '研究假设不是必须装饰：先判断你的问题需不需要假设',
        titleEn:
          'A hypothesis is not mandatory decoration: decide first whether your question truly needs one',
        introZh:
          '很多人在写开题或研究设计时，会下意识地给题目配上一组假设，好像没有假设就不够学术。但并不是所有问题都适合写成假设驱动的结构。',
        introEn:
          'When drafting a proposal or research design, many writers instinctively attach a set of hypotheses to the project as if the paper would look less academic without them. Yet not every question is best framed as hypothesis-driven.',
        zhihuAngleZh:
          '知乎上关于“论文一定要有研究假设吗”的讨论里，一个高频共识是：先看你的问题属于检验型、解释型还是探索型，再决定假设是不是必要，而不是因为模板里有就照搬。',
        zhihuAngleEn:
          'In Zhihu discussions on whether a paper must contain hypotheses, a recurring consensus is to identify whether the question is testing, explanatory, or exploratory before deciding whether hypotheses are necessary rather than copying them from a template.',
        strategyZh:
          '更稳的判断方式，是先问这篇论文究竟要验证关系、比较差异，还是探索一个还没被说明清楚的现象。只有当问题本身需要前置判断时，假设才真正有意义。',
        strategyEn:
          'A steadier way to decide is to ask whether the paper is testing a relationship, comparing differences, or exploring a phenomenon that is still poorly understood. A hypothesis only becomes meaningful when the question itself requires an advance judgment.',
        stepsZh: [
          '先判断你的问题是检验型还是探索型，不要先写假设再找问题。',
          '再检查现有理论和文献是否已经足够支持一个前置判断。',
          '最后决定是写成假设、研究命题，还是直接用研究问题推进。',
        ],
        stepsEn: [
          'Decide whether the question is testing-based or exploratory instead of writing hypotheses before clarifying the problem.',
          'Check whether existing theory and literature are strong enough to support an advance judgment.',
          'Then choose among a formal hypothesis, a research proposition, or a question-led structure.',
        ],
        submissionZh:
          '如果以后会投稿，这一步尤其要想清楚，因为很多稿件在外审里被追问的并不是“为什么没有假设”，而是“为什么这里用了假设却没有足够理论支撑”。',
        submissionEn:
          'If submission is a future goal, this distinction matters even more, because many manuscripts are challenged in peer review not for lacking hypotheses but for using them without sufficient theoretical support.',
        riskZh:
          '如果把假设当成模板配件，最容易出现的问题就是前文硬写一套判断，后文却没有真正按那套判断去分析，整篇结构会因此变得非常僵。',
        riskEn:
          'If hypotheses are treated as template accessories, the paper often ends up forcing advance judgments in the front matter that the later analysis does not genuinely follow, which makes the whole structure stiff.',
        checklistZh: [
          '1. 你的问题类型是否真的需要前置判断，而不是为了形式加假设。',
          '2. 如果写假设，理论和文献是否足够支持它的方向性。',
          '3. 分析部分是否会真正围绕这些假设展开，而不是写完就放着不用。',
        ],
        checklistEn: [
          '1. Does your question truly require an advance judgment rather than adding hypotheses for form alone?',
          '2. If hypotheses are used, do theory and literature support their direction strongly enough?',
          '3. Will the analysis genuinely revolve around them instead of leaving them unused after the opening?',
        ],
        deliverableZh:
          '这一轮之后，你应该得到一个更适配问题类型的研究结构选择，而不是一套为了看起来规范才加上的假设。',
        deliverableEn:
          'After this round, you should have a research structure that fits the problem type instead of a set of hypotheses added merely to look formal.',
        closeZh:
          '真正成熟的方法设计，不是把所有常见部件都装上去，而是知道哪些部件你的问题根本不需要。',
        closeEn:
          'A mature method design is not about attaching every common component. It is about knowing which components the question does not need at all.',
      },
      'literature-review': {
        titleZh: '理论框架怎么落到变量或案例：别让框架停在名词介绍',
        titleEn:
          'How does a theoretical framework reach variables or cases? Do not let it stop at concept introduction',
        introZh:
          '很多论文会在前文写一段漂亮的理论框架，但一到方法和分析部分，这套框架就像被放在门口，后面既没有真正指导变量，也没有真正影响案例观察。',
        introEn:
          'Many papers offer an elegant theoretical framework in the early pages, yet by the time the methods and analysis arrive, that framework has been left at the door. It neither guides variables nor shapes case observation.',
        zhihuAngleZh:
          '知乎上关于“理论框架怎么写”的讨论里，一个高频提醒是：框架不是概念展览，而是后面问题设计、变量选择和分析视角的控制面板。',
        zhihuAngleEn:
          'A recurring Zhihu reminder in discussions on writing a theoretical framework is that the framework is not a display of concepts but the control panel for later question design, variable choice, and analytical perspective.',
        strategyZh:
          '更稳的做法，是让框架至少回答三个问题：你看什么、不看什么；你怎么把抽象概念落到变量或案例；你最后打算如何解释结果。只要这三层没有接起来，框架就还是装饰。',
        strategyEn:
          'A steadier approach is to make the framework answer at least three questions: what you will look at and what you will ignore, how abstract concepts will reach variables or cases, and how the results will eventually be interpreted. Without those links, the framework remains decoration.',
        stepsZh: [
          '先把框架中的核心概念写成具体观察维度或变量口径。',
          '再检查这些维度是否真的进入了样本选择、访谈提纲、编码规则或指标设计。',
          '最后提前写一段“如果出现某种结果，我会如何解释”的说明，让框架进入结果解读。',
        ],
        stepsEn: [
          'Translate the core concepts of the framework into concrete observation dimensions or variable definitions.',
          'Check whether those dimensions genuinely enter the sample choice, interview guide, coding rules, or indicator design.',
          'Draft a short note on how different possible results would be interpreted so the framework can enter the reading of the findings.',
        ],
        submissionZh:
          '如果以后要投稿，这种落地能力直接决定审稿人会不会觉得你的理论只是挂名。框架一旦真的进入方法和解释，论文的整体可信度会明显提升。',
        submissionEn:
          'If the work may later be submitted, this ability to operationalize the framework strongly shapes whether reviewers see the theory as real or nominal. Once it truly enters the method and interpretation, the whole paper becomes more credible.',
        riskZh:
          '如果框架只停留在概念介绍，最常见的后果就是前文显得很学术，后文却像另一篇论文，因为真正的分析标准从来没有被建立起来。',
        riskEn:
          'If the framework stops at concept introduction, the front end may look academic while the later sections feel like a different paper because the real analytical standard was never established.',
        checklistZh: [
          '1. 核心概念是否已经落成可观察、可编码或可比较的维度。',
          '2. 这些维度是否已经进入样本、访谈、编码或指标设计。',
          '3. 结果解释时是否能看见框架的影子，而不是只在前文出现一次。',
        ],
        checklistEn: [
          '1. Have the core concepts already become observable, codable, or comparable dimensions?',
          '2. Do those dimensions enter the sample, interview, coding, or indicator design?',
          '3. Can the framework still be seen in the interpretation of the results instead of appearing only once in the front matter?',
        ],
        deliverableZh:
          '这一轮后，你应该拿到一套真正落地的理论框架说明，让前文概念和后文方法不再断开。',
        deliverableEn:
          'After this round, you should have an operational framework note that reconnects the concepts in the front matter with the later method.',
        closeZh:
          '理论框架只有真的进入变量、案例和解释，才算从“写了”变成了“用了”。',
        closeEn:
          'A theoretical framework only moves from being written to being used once it reaches variables, cases, and interpretation.',
      },
      'methods-analysis': {
        titleZh: '数据很多却写不出分析：先做证据地图和图表脚本',
        titleEn:
          'You have plenty of data but cannot write the analysis? Start with an evidence map and figure script',
        introZh:
          '很多论文最痛苦的时刻，不是没数据，而是数据很多、表格很多、截图很多，却迟迟写不出有结构的分析，因为作者还没有把证据排成一条能讲的线。',
        introEn:
          'One of the most painful moments in writing is not having too little data but having plenty of data, tables, and screenshots and still being unable to write a structured analysis because the evidence has not yet been arranged into a line that can be told.',
        zhihuAngleZh:
          '知乎里关于“数据分析怎么写”的经验常会提到一个核心动作：先别急着下结论，先把每一个核心判断对应到哪张表、哪个图、哪段材料写清楚。',
        zhihuAngleEn:
          'A core move repeatedly mentioned in Zhihu advice on writing data analysis is not to rush into conclusions but to make clear which table, figure, or piece of material supports each central judgment.',
        strategyZh:
          '更稳的写法，是先做 evidence map，再做 figure script。前者负责对齐“判断-证据”，后者负责安排“证据以什么顺序被看见”。两张表一出来，分析段落会容易很多。',
        strategyEn:
          'A steadier route is to build an evidence map first and a figure script second. The first aligns judgment with evidence. The second arranges the order in which the evidence will be seen. Once those two sheets exist, the analytical paragraphs become much easier to write.',
        stepsZh: [
          '先列出你想在本章得出的几个核心判断，不要一上来就排图表。',
          '再把每个判断后面对应的图、表、案例或文本证据一一对上。',
          '最后为图表写一句“这张图在论证中负责什么”，按论证顺序而不是制作顺序来排版。',
        ],
        stepsEn: [
          'List the few core judgments you want this chapter to make before arranging figures or tables.',
          'Match each judgment to the figure, table, case, or textual evidence that actually supports it.',
          'Write one sentence explaining what each visual element does in the argument and order them by argumentative sequence rather than production sequence.',
        ],
        submissionZh:
          '如果以后要投稿，这套 evidence map 和 figure script 几乎会直接决定稿件的可读性。很多审稿意见之所以要求重写结果部分，根本原因就是图表顺序和论证顺序没有对齐。',
        submissionEn:
          'If the work may later be submitted, the evidence map and figure script will almost directly shape readability. Many reviewer requests to rewrite the results section stem from one basic mismatch: the order of visuals does not match the order of the argument.',
        riskZh:
          '如果图表只是按制作顺序堆上去，最容易发生的就是正文像在陪跑图表，而不是图表服务正文，读者很难看出每张图到底为什么出现。',
        riskEn:
          'If figures and tables are stacked in the order they were produced, the main text often becomes something that runs alongside the visuals instead of directing them, and readers cannot see why each figure appears.',
        checklistZh: [
          '1. 你是否已经列出少数几个真正重要的核心判断。',
          '2. 每个判断后面是否都对应了明确的图表或文本证据。',
          '3. 图表顺序是否已经按论证顺序重排，而不是按生成顺序堆放。',
        ],
        checklistEn: [
          '1. Have you listed the few core judgments that actually matter?',
          '2. Is each judgment matched to a concrete figure, table, or text-based piece of evidence?',
          '3. Has the figure order been rearranged to match the argument rather than the order in which the outputs were generated?',
        ],
        deliverableZh:
          '这一轮后，你应该拿到一张证据地图、一版图表脚本，以及更容易落笔的分析主线。',
        deliverableEn:
          'After this round, you should have an evidence map, a figure script, and an analytical line that is much easier to draft.',
        closeZh:
          '数据多不等于分析深，只有当证据真正被排成一条线，分析才会开始成形。',
        closeEn:
          'Having a lot of data is not the same as having a deep analysis. The analysis begins to exist only when the evidence is arranged into a line.',
      },
      'revision-defense': {
        titleZh: '被追问样本、变量和图表时怎么答：准备一套证据链说明',
        titleEn:
          'How do you answer detailed questions about samples, variables, and figures? Prepare one evidence-chain explanation',
        introZh:
          '很多人论文文本看起来已经差不多了，但一到答辩或返修阶段，只要被追问样本为什么这样选、变量为什么这样定、图表为什么这样排，就会瞬间卡住。',
        introEn:
          'Many drafts look almost finished until the defense or revision stage reveals a different weakness: the writer freezes when asked why the sample was chosen this way, why the variables were defined this way, or why the figures were arranged in this order.',
        zhihuAngleZh:
          '知乎上关于“答辩被问方法怎么办”的经验里，最实用的一类建议往往不是准备更多术语，而是准备一条从问题到证据再到结论的解释链。',
        zhihuAngleEn:
          'In Zhihu advice on handling method questions during a defense, the most practical suggestion is often not to memorize more terminology but to prepare one explanatory chain from question to evidence to conclusion.',
        strategyZh:
          '更稳的准备方式，是把样本、变量、图表和最终结论串成一条 evidence chain。你不是分别背四套答案，而是练会讲同一个逻辑链条，只是在不同追问点展开。',
        strategyEn:
          'A steadier preparation method is to connect the sample, the variables, the figures, and the final conclusion into one evidence chain. You are not memorizing four separate answers but learning to explain one logical chain from different entry points.',
        stepsZh: [
          '先把核心问题、样本选择、变量定义和关键图表写成一页逻辑链。',
          '再为每一环准备一句“为什么这样做而不是那样做”的比较解释。',
          '最后用导师或评审最可能追问的顺序做口头演练，检查哪里还说不顺。',
        ],
        stepsEn: [
          'Write the core question, sample choice, variable definitions, and key figures onto one logic sheet.',
          'Prepare one comparative sentence for each link explaining why this choice was made instead of a plausible alternative.',
          'Rehearse the explanation in the order that advisors or reviewers are most likely to question it and locate the points that still feel weak.',
        ],
        submissionZh:
          '如果后面要回审稿意见，这套 evidence chain 几乎可以直接变成回复信的骨架。评审问的是局部细节，你给出的却是整套逻辑，这会让回应显得更稳。',
        submissionEn:
          'If reviewer responses still lie ahead, this evidence chain can almost become the skeleton of the response file. Reviewers may ask about local details, but your answer will show the larger logic, which makes the response feel much steadier.',
        riskZh:
          '如果只准备零散答案，最容易在追问里被越问越乱，因为每个回答都像临时补丁，拼不回整篇论文的主线。',
        riskEn:
          'If you prepare only isolated answers, follow-up questions quickly create confusion because each reply acts like a temporary patch instead of reconnecting to the paper’s main line.',
        checklistZh: [
          '1. 你是否已经把问题、样本、变量、图表和结论串成一页逻辑链。',
          '2. 每一环是否都有“为什么这样做而不是那样做”的解释。',
          '3. 你是否做过一次顺着追问路径展开的口头演练。',
        ],
        checklistEn: [
          '1. Have you connected the question, sample, variables, figures, and conclusion on one logic sheet?',
          '2. Does each link already have an explanation for why this choice was made instead of another reasonable option?',
          '3. Have you rehearsed the chain orally in the likely order of follow-up questions?',
        ],
        deliverableZh:
          '这一轮之后，你应该拿到一套可以同时用于答辩和返修回应的证据链说明，而不是零碎的问答备忘。',
        deliverableEn:
          'By the end of this round, you should have one evidence-chain explanation usable for both defense and reviewer response instead of fragmented notes.',
        closeZh:
          '方法追问最怕的不是细，而是碎。只要你能把细节重新拉回同一条证据链，回答就会稳很多。',
        closeEn:
          'The hardest method questions are not necessarily detailed ones but fragmented ones. Once you can pull each detail back into the same evidence chain, the answer becomes much steadier.',
      },
    },
  },
  {
    slug: 'submission-workflow',
    topicSlug: 'revision-submission',
    categorySlug: 'submission-defense-workflow',
    labelZh: '返修投稿与答辩',
    labelEn: 'Revision and Submission',
    readerZh: '论文写作者',
    readerEn: 'thesis and paper writers',
    focusZh: '返修回应、投稿材料、proof 校样与答辩口径',
    focusEn: 'revision responses, submission materials, proofs, and defense messaging',
    evidenceZh: '反馈清单、Cover Letter、回复信、proof 和版本记录',
    evidenceEn: 'feedback lists, cover letters, response files, proofs, and version notes',
    standardZh: '重点是让不同场景下的表达彼此前后一致，而不是每到一个环节就重写一套说法。',
    standardEn:
      'The goal is to keep the message internally aligned across different contexts rather than rewriting a new story for every stage.',
    articles: {
      proposal: {
        titleZh: '如果以后想投稿，开题时就该想清哪些期刊读者',
        titleEn:
          'If submission may come later, think about the journal reader already at the proposal stage',
        introZh:
          '很多论文到了后期想投稿时才发现，原来的题目、摘要和结构都是按“交差给导师”写的，而不是按“让某类读者快速理解”写的。',
        introEn:
          'Many writers only discover late in the process that the original topic, abstract, and structure were written to satisfy an advisor rather than to help a specific type of reader understand the work quickly.',
        zhihuAngleZh:
          '知乎里关于“学位论文怎么改成投稿稿”的讨论里，一个高频提醒就是：越早想清目标读者，后面改稿成本越低，因为很多结构问题其实是读者定位问题。',
        zhihuAngleEn:
          'In Zhihu discussions on turning a thesis into a submission draft, one recurring reminder is that the earlier the target reader is defined, the lower the later revision cost becomes because many structural problems are really reader-positioning problems.',
        strategyZh:
          '更稳的做法，是在开题时就额外问一层：这篇东西以后更可能打动谁，他们最先会看什么，他们真正关心的是什么。只要这层先想过，后面从学位文本转向文章文本就不会全盘重写。',
        strategyEn:
          'A steadier move is to ask one extra question during the proposal stage: who is this most likely to convince later, what will they read first, and what do they actually care about? Once that layer has been considered, the shift from thesis text to article text becomes much less destructive.',
        stepsZh: [
          '先列出两到三类未来可能的读者，而不是泛泛地说“相关领域读者”。',
          '再判断这些读者第一眼最看重题目、摘要、方法还是结果呈现。',
          '最后用这个读者画像回看当前结构，提前删掉只对导师交代有用、对外部读者无效的部分。',
        ],
        stepsEn: [
          'List two or three plausible future reader groups instead of vaguely saying relevant field readers.',
          'Decide whether those readers will care first about the title, the abstract, the method, or the presentation of results.',
          'Use that reader profile to review the current structure and remove material that only serves internal coursework expectations but not outside readers.',
        ],
        submissionZh:
          '如果以后真的要投稿，这一步会直接决定你后面怎么写摘要、怎么选关键词、怎么开头写引言。很多“后期大改”本质上只是早期没有建立读者坐标。',
        submissionEn:
          'If submission really comes later, this step will directly shape how the abstract is written, how keywords are chosen, and how the introduction opens. Many late-stage major revisions are simply the cost of never establishing a reader coordinate early on.',
        riskZh:
          '如果读者一直不被定义，论文就容易永远处在“都想兼顾一点”的状态，最后谁都能看，但谁都不会觉得它是写给自己的。',
        riskEn:
          'If the reader is never defined, the paper tends to stay in a mode of trying to satisfy everyone a little, and the result is that anyone can read it while no one feels it was shaped for them.',
        checklistZh: [
          '1. 你是否已经列出未来最可能承接这篇内容的两到三类读者。',
          '2. 这些读者第一眼最重视的部分是否已经被你标出来。',
          '3. 当前结构里是否还留着大量只服务内部交付、不服务外部阅读的内容。',
        ],
        checklistEn: [
          '1. Have you listed the two or three reader groups most likely to receive this work later?',
          '2. Have you marked the parts those readers will care about first?',
          '3. Does the current structure still contain large sections that serve only internal submission rather than outside reading?',
        ],
        deliverableZh:
          '这一轮后，你应该得到一张目标读者画像和一版更面向外部阅读的结构判断，而不是只面向当前交稿场景。',
        deliverableEn:
          'After this round, you should have a target-reader profile and a structure judged more by outside reading needs than by the immediate course requirement.',
        closeZh:
          '越早把未来读者想清楚，后面从论文走向投稿时就越不需要推倒重来。',
        closeEn:
          'The earlier the future reader becomes clear, the less the project needs to be rebuilt when it moves from thesis to submission.',
      },
      'literature-review': {
        titleZh: '引言里的 novelty statement 怎么写：别只说“这个问题很重要”',
        titleEn:
          'How do you write a novelty statement in the introduction? Do not stop at saying the topic is important',
        introZh:
          '很多引言会花大量篇幅证明“这个问题很重要”，但到了真正该说贡献的时候，只剩一句模糊的“本文丰富了相关研究”，读者还是看不出新意到底在哪里。',
        introEn:
          'Many introductions spend a great deal of space proving that the problem matters, yet when the time comes to name the contribution, they collapse into a vague sentence about enriching the literature and still fail to show where the novelty actually lies.',
        zhihuAngleZh:
          '知乎里关于“论文创新点怎么写”的讨论，反复出现的一条经验是：重要性不等于新意。你要说的是前人做到哪里、你往前推进了哪一小步，而不是只说题目大。',
        zhihuAngleEn:
          'A repeated lesson in Zhihu discussions on writing the innovation point is that importance is not the same as novelty. The writer has to show how far prior work has gone and exactly which small step this paper moves beyond it.',
        strategyZh:
          '更稳的 novelty statement 通常会同时回答三件事：前人已经解决了什么，还缺什么，你的论文用什么对象、材料或角度把这个缺口往前推进。只说问题重要，不足以构成新意。',
        strategyEn:
          'A steady novelty statement usually answers three things at once: what earlier work has solved, what still remains missing, and how this paper moves that gap forward through a specific object, material set, or angle. Importance alone does not create novelty.',
        stepsZh: [
          '先用两三句话写清现有研究已经做到哪一步，不要一上来就跳到自己的贡献。',
          '再写出现有讨论仍然缺失的那一点，并说明为什么这个缺口值得处理。',
          '最后用一句具体的话说清你的论文将用什么材料或角度把它往前推进。',
        ],
        stepsEn: [
          'Write two or three sentences showing how far the existing literature has already gone before jumping to your contribution.',
          'State the specific missing piece that remains and why it is worth addressing.',
          'Then explain in one concrete sentence what material or angle the paper will use to move that gap forward.',
        ],
        submissionZh:
          '如果后面要投稿，这句话几乎就是编辑判断是否值得送审的第一眼内容。新意说得越具体，Cover Letter 和摘要里的价值表达也会越好写。',
        submissionEn:
          'If the work may later be submitted, this sentence is almost exactly what an editor reads to decide whether the manuscript deserves review. The more concrete the novelty becomes, the easier it is to write the value line in both the cover letter and the abstract.',
        riskZh:
          '如果新意一直停留在“问题重要、意义重大”的层面，最容易发生的就是引言看上去很热闹，但读者还是不知道这篇稿件为什么必须由你现在来写。',
        riskEn:
          'If novelty remains at the level of importance and significance, the introduction may sound energetic while readers still do not know why this manuscript needed to be written by this project now.',
        checklistZh: [
          '1. 你是否已经写出前人做到哪里，而不是直接跳到“本文贡献”。',
          '2. 缺口是否具体到读者能听懂，不是泛泛的“研究不足”。',
          '3. 你的新意表达是否说清了对象、材料或角度，而不是只有价值判断。',
        ],
        checklistEn: [
          '1. Have you written what prior work has already achieved instead of jumping straight to this paper contributes?',
          '2. Is the gap concrete enough for readers to understand rather than a generic statement of insufficiency?',
          '3. Does the novelty line name the object, material, or angle instead of only offering value language?',
        ],
        deliverableZh:
          '这一轮之后，你应该拿到一句真正能放进引言、摘要和 Cover Letter 的 novelty statement。',
        deliverableEn:
          'After this round, you should have one novelty statement that can genuinely live in the introduction, the abstract, and the cover letter.',
        closeZh:
          '新意不是把题目说大，而是把你推进的那一步说准。',
        closeEn:
          'Novelty is not making the topic sound larger. It is naming precisely the step your paper advances.',
      },
      'methods-analysis': {
        titleZh: '投稿前要不要准备补充材料、数据声明和 AI 使用说明',
        titleEn:
          'Should you prepare supplements, data statements, and AI-use disclosure before submission?',
        introZh:
          '很多人直到投稿系统里被要求上传补充材料、填写数据声明或说明 AI 使用时，才开始临时整理，结果整套稿件的版本和表达很容易乱掉。',
        introEn:
          'Many writers only begin organizing supplements, data statements, or AI-use disclosure when the submission system demands them, and by then the versions and wording across the manuscript often start to drift.',
        zhihuAngleZh:
          '知乎里关于“投稿前要准备什么”的讨论，经常会提到一个共同痛点：正文写完不等于稿件准备完，真正的 submission-ready 往往还差一整套配套文件和说明。',
        zhihuAngleEn:
          'Zhihu discussions on what needs to be ready before submission often point to the same pain point: finishing the main text does not mean the manuscript is ready. A submission-ready package usually still needs several supporting files and disclosures.',
        strategyZh:
          '更稳的做法，是把正文之外的支撑材料提前看成同一个系统：补充分析、数据说明、伦理声明、AI 使用说明、图表源文件和版本记录。它们不是附件，而是可信度的一部分。',
        strategyEn:
          'A steadier approach is to treat the support files outside the main text as one connected system: supplementary analyses, data notes, ethics statements, AI-use disclosure, figure source files, and version records. They are not just attachments but part of the manuscript’s credibility.',
        stepsZh: [
          '先列出目标期刊或后续场景可能要求的配套文件，不要等系统弹窗再准备。',
          '再把正文里涉及的数据、补充分析和工具使用逐项对应到说明文件。',
          '最后统一版本、命名和措辞，确保附件和正文讲的是同一件事。',
        ],
        stepsEn: [
          'List the support files likely to be required by the target journal or later workflow instead of waiting for the submission portal to ask.',
          'Match each data-related move, supplementary analysis, and tool use in the paper to a disclosure or support file.',
          'Unify the versions, file names, and wording so the attachments and the manuscript tell the same story.',
        ],
        submissionZh:
          '如果这一步提前做，后面不管是正式投稿还是答辩解释都会轻松很多。很多“文件不全”的问题，本质上都是前期没有把证据包当成正文的一部分来管理。',
        submissionEn:
          'Doing this early makes both formal submission and oral explanation much easier later. Many support-file problems are really just cases where the evidence package was never managed as part of the manuscript itself.',
        riskZh:
          '如果把这些东西都留到最后临时补，最容易出现的不是单个文件缺失，而是正文、附件和声明之间版本不一致，反而增加不必要风险。',
        riskEn:
          'If all of this is postponed until the last minute, the most common problem is not one missing file but version inconsistency among the manuscript, the attachments, and the disclosure statements, which creates unnecessary risk.',
        checklistZh: [
          '1. 你是否已经列出正文之外需要同步准备的配套文件。',
          '2. 数据、补充分析和 AI 使用是否都能对应到清晰的说明。',
          '3. 附件、正文和声明的版本与措辞是否已经统一。',
        ],
        checklistEn: [
          '1. Have you listed the support files that must be prepared alongside the main text?',
          '2. Can the data use, supplementary analyses, and AI use all be matched to clear explanations?',
          '3. Are the versions and wording now aligned across the attachments, the manuscript, and the disclosures?',
        ],
        deliverableZh:
          '这一轮之后，你应该拿到一套更像 submission-ready evidence pack 的材料清单，而不只是“正文完成”的错觉。',
        deliverableEn:
          'After this round, you should have something closer to a submission-ready evidence pack instead of the illusion that finishing the main text is enough.',
        closeZh:
          '真正准备投稿的人，整理的不只是正文，而是一整套能支撑正文的文件系统。',
        closeEn:
          'Writers who are truly preparing for submission organize not only the manuscript but the file system that supports it.',
      },
      'revision-defense': {
        titleZh: '返修信、Cover Letter、proof 和答辩口径怎么保持一致',
        titleEn:
          'How do you keep the response letter, cover letter, proofs, and defense message aligned?',
        introZh:
          '很多人到了最后阶段会被不同场景拉扯：返修时要逐条回应，投稿时要重新包装，proof 时要逐项校对，答辩时又要口头讲清。最容易出问题的不是工作量，而是口径开始分裂。',
        introEn:
          'Late in the process, writers are often pulled by different contexts at once: detailed replies in revision, reframing in the cover letter, item-by-item checking in proofs, and oral explanation in defense. The main challenge is not only volume but the way the message starts to split.',
        zhihuAngleZh:
          '知乎上关于“返修、投稿、答辩怎么一起准备”的讨论里，一个很实用的经验是把所有场景都拉回同一条主线，而不是每个文件各讲一套漂亮话。',
        zhihuAngleEn:
          'A practical lesson repeated in Zhihu discussions on preparing revision, submission, and defense together is to pull every context back to the same main line instead of allowing each file to tell its own polished story.',
        strategyZh:
          '更稳的做法，是先写一份 master line：你的核心主张、关键修改、主要证据和边界说明。然后让返修信、Cover Letter、proof 修改单和答辩开场都围绕这条主线展开，只是细节层级不同。',
        strategyEn:
          'A steadier approach is to draft one master line containing the core claim, the key revisions, the main evidence, and the boundary explanation. Then let the response letter, cover letter, proof corrections, and defense opening all work from that line at different levels of detail.',
        stepsZh: [
          '先整理一份 master line，写清主张、修改、证据和边界四项核心信息。',
          '再用这份 master line 回看各类文件，删掉互相打架的说法。',
          '最后按不同场景调整细节密度，但不改变核心判断方向。',
        ],
        stepsEn: [
          'Prepare a master line that records the core claim, the revision moves, the evidence base, and the boundary note.',
          'Use that line to review each file and remove wording that conflicts across contexts.',
          'Adjust only the density of detail for each context while keeping the judgment direction unchanged.',
        ],
        submissionZh:
          '如果这一步做得好，返修、投稿和答辩就不会互相拖累，反而会共享同一套表达资源。很多最后阶段的失误，不是不会写，而是没有一个统一底稿可供调用。',
        submissionEn:
          'When this step is done well, revision, submission, and defense stop competing with one another and begin to share the same expression resources. Many late-stage errors come less from weak writing than from lacking one unified base document to draw from.',
        riskZh:
          '如果每个文件都临时写一套话术，最容易出现的就是细节和判断互相矛盾，最后读者会感觉论文仍然没有真正定稿。',
        riskEn:
          'If each file is drafted independently from scratch, details and judgments begin to contradict one another and readers are left with the impression that the project is still not truly finalized.',
        checklistZh: [
          '1. 你是否已经写出一份可供所有场景复用的 master line。',
          '2. 返修信、Cover Letter、proof 修改和答辩开场是否都围绕同一条主线。',
          '3. 不同文件之间是否只存在细节密度差异，而不存在方向冲突。',
        ],
        checklistEn: [
          '1. Have you drafted one reusable master line for all major contexts?',
          '2. Do the response letter, cover letter, proof corrections, and defense opening all revolve around the same main line?',
          '3. Do the files differ only in detail density rather than in judgment direction?',
        ],
        deliverableZh:
          '这一轮之后，你应该拿到一套统一口径的提交与答辩材料，而不是四份彼此松散的独立文件。',
        deliverableEn:
          'By the end of this round, you should have a coordinated package for submission and defense instead of four loosely connected documents.',
        closeZh:
          '最后阶段真正节省时间的，不是分别写得更快，而是让所有文件都建立在同一条主线上。',
        closeEn:
          'What really saves time in the final stage is not writing each file faster but letting every file grow from the same main line.',
      },
    },
  },
  {
    slug: 'research-topic',
    topicSlug: 'feasibility-triage',
    categorySlug: 'research-topic-planning',
    labelZh: '选题与问题定义',
    labelEn: 'Topic Selection',
    readerZh: '论文写作者',
    readerEn: 'thesis and paper writers',
    focusZh: '可行性判断、资料路径和任务边界',
    focusEn: 'feasibility checks, source access, and task boundaries',
    evidenceZh: '资料清单、时间表、样本入口和任务拆解',
    evidenceEn: 'source lists, timelines, sample access points, and task breakdowns',
    standardZh: '重点不是把题目说得更大，而是把“现在能不能做、做到哪一步”说得更实。',
    standardEn:
      'The aim is not to make the topic sound bigger but to state more honestly whether it can be done now and how far it can go.',
    articles: {
      proposal: {
        titleZh: '开题总被问可行性？先把资料路径、时间和样本说实',
        titleEn:
          'Keep getting asked about feasibility in the proposal? Make the source path, timeline, and sample access concrete first',
        introZh:
          '很多开题看上去题目不差，真正被打回来的原因却是可行性没有说实。导师担心的往往不是你想得不对，而是你根本拿不到足够资料，或者时间撑不起题目承诺。',
        introEn:
          'Many proposals look fine at the level of topic choice, yet the real reason they get pushed back is that feasibility was never stated concretely. Advisors are often less worried that the idea is wrong than that the material is inaccessible or the timeline cannot support the promise of the title.',
        zhihuAngleZh:
          '知乎里关于“开题被说不够可行怎么办”的讨论，高频问题不是不会写框架，而是没有把样本入口、资料获取和时间分配写成一条现实路径。',
        zhihuAngleEn:
          'In Zhihu discussions about being told a proposal lacks feasibility, the repeated issue is not weak framing but the absence of a realistic path for sample access, source collection, and time allocation.',
        strategyZh:
          '更稳的写法，是把可行性拆成三层：资料能不能拿到、任务能不能按阶段完成、当前篇幅能不能承接这个问题。只要三层里有一层发虚，题目就需要再收一步。',
        strategyEn:
          'A steadier way to write feasibility is to split it into three layers: whether the sources are actually reachable, whether the tasks can be completed stage by stage, and whether the current length can really carry the question. If any one layer feels weak, the topic still needs to narrow.',
        stepsZh: [
          '先列出完成这题至少需要的资料和样本入口，别只写“后续搜集”。',
          '再把整个任务拆成几个阶段，检查每一阶段有没有明确产出。',
          '最后用现实时间反推题目边界，把当前周期做不完的承诺先删掉。',
        ],
        stepsEn: [
          'List the minimum sources and sample-entry paths needed to finish the topic instead of saying they will be collected later.',
          'Break the work into stages and check whether each stage has one concrete output.',
          'Use the real timeline to push back against the topic boundary and cut claims that cannot be completed in the present cycle.',
        ],
        submissionZh:
          '如果后面还想把这项研究继续写成长文或投稿稿，提早做可行性 triage 很值钱，因为它会直接决定后续样本说明、方法说明和局限表达是不是站得住。',
        submissionEn:
          'If the work may later grow into a long article or submission draft, doing a feasibility triage early is extremely useful because it will directly shape whether the later sample note, method note, and limitation statement can stand up.',
        riskZh:
          '如果可行性一直只停留在“应该能做”的层面，最常见的后果就是开题通过后才开始大面积缩题，前面写过的很多内容都要重来。',
        riskEn:
          'If feasibility remains at the level of it should probably work, the common consequence is that the topic has to be narrowed only after the proposal passes and a large share of the earlier writing must be redone.',
        checklistZh: [
          '1. 资料和样本入口是否已经写得具体，而不是停留在模糊设想。',
          '2. 每个阶段是否有明确任务和产出，而不是只有总时间表。',
          '3. 题目承诺是否已经被现实条件压实。',
        ],
        checklistEn: [
          '1. Are the source and sample-entry paths now concrete instead of speculative?',
          '2. Does each stage have a defined task and output rather than only a broad timeline?',
          '3. Has the promise of the topic already been tightened by real constraints?',
        ],
        deliverableZh:
          '这一轮之后，你应该得到一张可行性说明表、一版更实的时间任务拆解，以及一个被现实条件校准过的题目。',
        deliverableEn:
          'After this round, you should have a feasibility note, a more realistic task timeline, and a topic recalibrated by actual constraints.',
        closeZh:
          '可行性不是给导师看的客套话，而是整篇论文后面会不会崩的第一道预警。',
        closeEn:
          'Feasibility is not polite language for the advisor. It is the first warning system for whether the whole project will later collapse.',
      },
      'literature-review': {
        titleZh: '读文献时顺手做 feasibility triage：哪些题值得做，哪些先别碰',
        titleEn:
          'Run a feasibility triage while reading: which topics are worth pursuing now and which should wait',
        introZh:
          '很多人读文献时只看问题好不好，却不顺手判断这个问题当前能不能做。结果常常是被某个方向吸引很久，后来才发现资料门槛、方法门槛或篇幅门槛都太高。',
        introEn:
          'Many writers evaluate whether a topic looks interesting while reading but fail to judge whether it can actually be done now. The result is often spending a long time attracted to a direction only to discover later that the source, method, or length threshold is too high.',
        zhihuAngleZh:
          '知乎上关于“看了很多文献更迷茫”的讨论里，经常有人提到一个痛点：大家会评估价值，却不会同步评估成本，所以题目看起来都能做，最后真正能推进的很少。',
        zhihuAngleEn:
          'In Zhihu discussions about feeling more lost after reading a lot, one recurring pain point is that writers evaluate value but not cost, so many topics look possible while only a few can genuinely move forward.',
        strategyZh:
          '更稳的阅读法，是在笔记里同时记录“有多重要”和“现在多可做”。重要性告诉你值不值得碰，可行性告诉你当下该不该碰，两者要并排判断。',
        strategyEn:
          'A steadier reading practice is to record both how important a direction is and how doable it currently is. Importance tells you whether it is worth touching; feasibility tells you whether it should be pursued now. The two judgments need to sit side by side.',
        stepsZh: [
          '先在阅读笔记里增加一列可行性评价，不只记主题和发现。',
          '再把影响题目落地的关键门槛写出来，如数据、样本、方法或时间。',
          '最后用“高价值高可行”优先原则筛出值得先做的一批题目。',
        ],
        stepsEn: [
          'Add one feasibility column to the reading notes instead of recording only topic and finding.',
          'Write down the thresholds that affect execution, such as data, sample, method, or time.',
          'Use a high-value, high-feasibility priority rule to select the topics worth pursuing first.',
        ],
        submissionZh:
          '如果以后要写成长文或投稿，这种阅读中的 triage 会非常有帮助，因为它能提前暴露哪些方向虽然热，但短期内很难做成一篇站得住的稿件。',
        submissionEn:
          'If the project may later become a long-form piece or submission draft, this reading-stage triage is very helpful because it exposes early which directions are hot but still unlikely to become a defensible paper in the near term.',
        riskZh:
          '如果文献阅读只看价值不看成本，最常见的后果就是题目越来越激动人心，执行却越来越不现实。',
        riskEn:
          'If reading evaluates value without cost, the common outcome is that the topic becomes more exciting while the execution becomes less realistic.',
        checklistZh: [
          '1. 阅读笔记里是否已有“可行性”这一列。',
          '2. 每个方向的关键门槛是否已经写明。',
          '3. 你是否筛出了一批当前优先推进的题目。',
        ],
        checklistEn: [
          '1. Does the reading note already contain a feasibility column?',
          '2. Are the main thresholds of each direction written down clearly?',
          '3. Have you already filtered a set of topics worth prioritizing now?',
        ],
        deliverableZh:
          '这一轮之后，你应该得到一份“高价值但不一定当前可做”的区分表，而不是把所有好题都混在同一层优先级里。',
        deliverableEn:
          'After this round, you should have a sheet distinguishing high-value topics from topics that are actually workable now instead of treating every good topic as equally urgent.',
        closeZh:
          '真正高效的定题，不只是知道什么值得写，还知道什么现在先不要写。',
        closeEn:
          'Efficient topic selection means not only knowing what is worth writing but also knowing what should not be written yet.',
      },
      'methods-analysis': {
        titleZh: '别等开工后才发现样本拿不到：先做一张可行性压力测试表',
        titleEn:
          'Do not wait until analysis starts to discover the sample is inaccessible: build a feasibility stress-test sheet first',
        introZh:
          '很多研究设计的问题不是写法有误，而是太晚才发现样本、数据或案例根本拿不到。那时再调整，不只是方法要改，连题目和理论入口都要一起动。',
        introEn:
          'Many research-design problems do not begin as writing problems but as late discoveries that the sample, data, or cases are not actually accessible. By then, revising the method often means changing the topic and the theoretical entry as well.',
        zhihuAngleZh:
          '知乎里关于“方法定了才发现数据不够”的吐槽很多，背后反复出现的一点是：作者缺少一张在开工前就暴露风险的压力测试表。',
        zhihuAngleEn:
          'There are many Zhihu complaints about realizing too late that the chosen method lacks enough data, and behind them is the repeated absence of a stress-test sheet that could have exposed the risk earlier.',
        strategyZh:
          '更稳的做法，是在方法正式落下前先做一次压力测试：最理想情况是什么、最低可行情况是什么、哪一步一旦拿不到资料就必须改题或改方法。把风险先写出来，后面的调整才不会是慌乱反应。',
        strategyEn:
          'A steadier approach is to run a stress test before the method is finalized: what the ideal case would be, what the minimum viable case would be, and which missing source would force a change of topic or method. Once the risks are written down, later adjustment becomes deliberate rather than panicked.',
        stepsZh: [
          '先列出理想版、最低可行版和失败触发条件三栏。',
          '再把样本、数据、案例和时间逐项放进去，看哪一栏最脆弱。',
          '最后根据最脆弱的一栏回调题目、方法或结论力度。',
        ],
        stepsEn: [
          'Create three columns: ideal version, minimum viable version, and failure trigger.',
          'Place the sample, data, cases, and time resources into those columns to see which line is weakest.',
          'Use the weakest line to dial back the topic, the method, or the strength of the claim.',
        ],
        submissionZh:
          '如果后面要答辩或投稿，这张压力测试表非常有用，因为它会帮助你提前写出局限说明，而不是等被追问时才临时解释。',
        submissionEn:
          'If defense or submission comes later, this stress-test sheet is extremely useful because it helps you write the limitation note proactively instead of improvising explanations only when questioned.',
        riskZh:
          '如果可行性压力从来没有被提前测试，最容易发生的就是项目一旦掉一块关键材料，整条主线都跟着断掉。',
        riskEn:
          'If feasibility pressure is never tested in advance, the common danger is that once one key material drops out, the entire project line breaks with it.',
        checklistZh: [
          '1. 是否已经区分理想版和最低可行版。',
          '2. 哪一步最脆弱是否已经被明确指出。',
          '3. 题目和方法是否已针对最脆弱处做了调整。',
        ],
        checklistEn: [
          '1. Have the ideal version and the minimum viable version been separated clearly?',
          '2. Is the weakest link in the project already visible?',
          '3. Have the topic and method already been adjusted around that weak point?',
        ],
        deliverableZh:
          '这一轮之后，你应该拿到一张能提前暴露风险的可行性压力测试表，以及一版更稳的执行方案。',
        deliverableEn:
          'After this round, you should have a feasibility stress-test sheet that exposes risk early and a steadier execution plan.',
        closeZh:
          '方法越早经过压力测试，后面的大改就越少来自意外，越多来自主动选择。',
        closeEn:
          'The earlier the method goes through stress testing, the less later revision comes from surprise and the more it comes from deliberate choice.',
      },
      'revision-defense': {
        titleZh: '导师说题目太虚怎么改：用 feasibility note 解释为什么现在这版更稳',
        titleEn:
          'When the advisor says the topic is too vague, revise it through a feasibility note explaining why this version is steadier',
        introZh:
          '很多人被说“题目太虚”之后，第一反应是换几个更具体的词。但如果没有同时说明为什么现在这版更可做、更可支撑，题目改了也未必更稳。',
        introEn:
          'When writers hear that the topic is too vague, the first reaction is often to replace a few broad words with more concrete ones. Yet without explaining why the revised version is now more feasible and better supported, the topic may change without becoming steadier.',
        zhihuAngleZh:
          '知乎里关于“导师说题目太虚怎么办”的经验，经常会提到一点：真正让导师放心的不是题目换词，而是你能清楚解释为什么现在这版更能落地。',
        zhihuAngleEn:
          'In Zhihu advice on handling feedback that a topic is too vague, one repeated point is that what reassures the advisor is not the wording swap alone but your ability to explain why the new version can actually land better.',
        strategyZh:
          '更稳的返修方式，是配一页 feasibility note：旧题目哪里太虚、新题目具体收到了哪一层、这次为什么更符合资料和时间条件。这样修改就不只是表面动作，而是有理由的缩题。',
        strategyEn:
          'A steadier revision method is to attach a one-page feasibility note: where the old topic was too vague, which layer the new version has tightened, and why the revision now matches the available sources and time better. Then the change becomes a reasoned narrowing rather than a cosmetic edit.',
        stepsZh: [
          '先把旧题目中的虚词和过度承诺圈出来。',
          '再说明新题目具体收紧了对象、范围还是判断力度。',
          '最后用资料、时间和结构条件解释为什么新版更稳。',
        ],
        stepsEn: [
          'Mark the vague words and overpromises in the old topic first.',
          'Then explain whether the new topic tightened the object, the scope, or the strength of the claim.',
          'Finally, use source, time, and structural conditions to show why the revised version is steadier.',
        ],
        submissionZh:
          '如果后面还会答辩或投稿，这份说明也能继续复用，因为它本质上是在回答同一个问题：为什么现在这版比原来更可 defend。',
        submissionEn:
          'If defense or submission still lies ahead, this note can continue to be reused because it is answering the same underlying question: why the present version is more defensible than the original one.',
        riskZh:
          '如果只改题目不改解释，最容易出现的就是题目表面更具体了，但正文和结构还是旧逻辑，读者一眼就会感觉没有真正收束。',
        riskEn:
          'If the title changes without the explanation changing with it, the common result is a superficially more concrete topic attached to an old body and structure, which signals immediately that the project was never truly tightened.',
        checklistZh: [
          '1. 旧题目中的虚词和过度承诺是否已经被识别。',
          '2. 新题目具体收紧的是哪一层是否已经说清。',
          '3. 是否已经能解释为什么当前版本更稳。',
        ],
        checklistEn: [
          '1. Have the vague terms and overpromises in the old topic been identified clearly?',
          '2. Is the exact layer tightened by the new topic already stated?',
          '3. Can you now explain why the current version is steadier?',
        ],
        deliverableZh:
          '这一轮之后，你应该有一版收紧后的题目和一页“为什么这样改”的可行性说明。',
        deliverableEn:
          'After this round, you should have a tightened topic and a one-page feasibility explanation of why it was revised this way.',
        closeZh:
          '题目变稳的标志，不只是更具体，而是你终于能把“为什么这样改”讲清楚。',
        closeEn:
          'The sign that a topic has become steadier is not only that it sounds more concrete but that you can now explain clearly why it was revised in this way.',
      },
    },
  },
  {
    slug: 'literature-reading',
    topicSlug: 'literature-matrix',
    categorySlug: 'literature-reading-review',
    labelZh: '文献阅读与综述',
    labelEn: 'Literature Review',
    readerZh: '论文写作者',
    readerEn: 'thesis and paper writers',
    focusZh: '文献矩阵、引用层级和阅读笔记复用',
    focusEn: 'literature matrices, citation hierarchy, and reusable reading notes',
    evidenceZh: '文献矩阵、标签体系、核心引用和段落支持关系',
    evidenceEn: 'literature matrices, tag systems, core citations, and paragraph support links',
    standardZh: '重点不是记住更多文献细节，而是把后面写作真正要用到的比较关系留下来。',
    standardEn:
      'The goal is not to remember more isolated details but to preserve the comparative relationships that the later writing will actually need.',
    articles: {
      proposal: {
        titleZh: '读文献总是边读边忘？先搭文献矩阵和最小笔记规则',
        titleEn:
          'Keep forgetting papers as you read? Build a literature matrix and a minimal note-taking rule first',
        introZh:
          '很多人读文献时越读越慌，不是因为看不懂，而是因为读过的东西没有被放进同一个结构里。今天记住了作者和结论，过几天却完全想不起它和别的研究有什么关系。',
        introEn:
          'Many writers become more anxious as they read not because the papers are incomprehensible but because the material is never placed inside one shared structure. Today they remember the author and the conclusion; a few days later they cannot recall how the paper relates to anything else.',
        zhihuAngleZh:
          '知乎上关于“文献读完就忘”的讨论里，最常见的建议不是做更长笔记，而是先搭一个最小矩阵，让每篇文献至少能被放进同一组比较栏目里。',
        zhihuAngleEn:
          'In Zhihu discussions about forgetting papers immediately after reading them, the common suggestion is not longer notes but a minimal matrix that lets every paper enter the same comparison columns.',
        strategyZh:
          '更稳的阅读起点，是先固定几个永远要记的栏目，例如问题、方法、核心发现、局限、与你的关系。矩阵一旦稳定，阅读就会从“记信息”变成“积累比较”。',
        strategyEn:
          'A steadier reading start is to fix a few columns that will always be recorded: question, method, core finding, limitation, and relevance to your project. Once the matrix becomes stable, reading shifts from storing information to accumulating comparison.',
        stepsZh: [
          '先给每篇文献只设最少几个必填栏目，不要一开始就把模板做得过重。',
          '再把同一类文献放进同一组标签里，方便后面横向比较。',
          '最后每读完一篇都补一句“它对我的题目有什么用”，防止笔记只剩摘要。',
        ],
        stepsEn: [
          'Set only a few mandatory columns for each paper instead of building an overly heavy template at the beginning.',
          'Group similar papers under the same labels so they can be compared laterally.',
          'After each reading, add one sentence on what the paper is useful for in your own topic so the note does not remain a summary only.',
        ],
        submissionZh:
          '如果后面要写综述或投稿引言，这种最小矩阵会特别有价值，因为它让你能快速重建文献关系，而不是重新翻找一堆 PDF。',
        submissionEn:
          'If the material later feeds a review or a submission introduction, this minimal matrix becomes especially valuable because it allows the literature relationships to be rebuilt quickly instead of searching through piles of PDFs again.',
        riskZh:
          '如果阅读不进矩阵，最常见的后果就是文献看得越多，脑子里的线索越乱，写综述时只能重新从头找。',
        riskEn:
          'If the reading never enters a matrix, the common result is that the more papers you read, the messier the mental trace becomes, and the review has to be rebuilt from zero.',
        checklistZh: [
          '1. 是否已经固定最小必填栏目。',
          '2. 相似文献是否已有统一标签。',
          '3. 每篇笔记里是否都出现了“对我的题目有什么用”这句。',
        ],
        checklistEn: [
          '1. Have the minimum mandatory columns already been fixed?',
          '2. Do similar papers already share one tag system?',
          '3. Does each note contain one sentence explaining its use for your own topic?',
        ],
        deliverableZh:
          '这一轮之后，你应该得到一个可持续扩展的文献矩阵，而不是一堆彼此独立的阅读摘要。',
        deliverableEn:
          'After this round, you should have an expandable literature matrix rather than a pile of isolated reading summaries.',
        closeZh:
          '文献矩阵最重要的价值，不是整理得好看，而是让你以后还能把读过的东西重新调用出来。',
        closeEn:
          'The main value of a literature matrix is not aesthetic order but the ability to call earlier reading back into use later.',
      },
      'literature-review': {
        titleZh: '引用不是越多越稳：先分核心文献、背景文献和方法文献',
        titleEn:
          'More citations do not automatically make the review stronger: separate core, background, and methods references first',
        introZh:
          '很多综述引用很多，却还是显得没重点。问题往往不在数量，而在于所有引用被放在同一层，读者看不出哪些是真正支撑定位的核心文献，哪些只是补背景。',
        introEn:
          'Many reviews contain a large number of citations and still feel unfocused. The issue is often not quantity but the way every citation is placed on the same level, so the reader cannot tell which sources define positioning and which ones merely supply background.',
        zhihuAngleZh:
          '知乎里关于“综述引用太乱怎么办”的讨论，常会提到一个实用做法：把引用分层，不同层级服务不同写作任务。',
        zhihuAngleEn:
          'In Zhihu discussions on messy citation use in reviews, one practical move appears repeatedly: stratify the citations so different layers serve different writing tasks.',
        strategyZh:
          '更稳的引用结构，至少要分三层：核心文献负责研究定位，背景文献负责场景交代，方法文献负责说明技术或路径。分层之后，综述才不会所有引用都挤在一个句子里。',
        strategyEn:
          'A steadier citation structure usually needs at least three layers: core citations for positioning, background citations for context, and methods citations for technique or path. Once the layers exist, the review no longer needs to crowd every source into the same sentence.',
        stepsZh: [
          '先把现有引用按核心、背景、方法三层重新标记。',
          '再检查关键段落是否用了错误层级的文献来撑判断。',
          '最后让每一层引用只承担它该承担的任务，不再混用。',
        ],
        stepsEn: [
          'Relabel the current citations into core, background, and methods layers.',
          'Check whether the key paragraphs are using the wrong layer of sources to support major judgments.',
          'Let each citation layer perform only the job it was meant to perform instead of mixing them together.',
        ],
        submissionZh:
          '如果后面要投稿，这种引用分层很关键，因为编辑和审稿人会很快感觉出你有没有抓住领域里真正决定定位的那批文献。',
        submissionEn:
          'If the paper may later be submitted, this citation layering is crucial because editors and reviewers sense very quickly whether you have identified the literature that truly determines positioning in the field.',
        riskZh:
          '如果所有引用都被同层使用，最常见的后果就是段落看上去很满，判断却很轻，因为真正关键的文献没有被放到关键位置。',
        riskEn:
          'If every citation is used on the same layer, the common result is a paragraph that looks full while the judgment remains light because the truly central literature was never placed in the central spot.',
        checklistZh: [
          '1. 引用是否已按三层分开。',
          '2. 关键判断段落是否正在使用核心文献支撑。',
          '3. 背景和方法文献是否已退出不该承担的任务。',
        ],
        checklistEn: [
          '1. Have the citations been separated into three layers?',
          '2. Are the major judgment paragraphs now supported by core literature?',
          '3. Have the background and methods citations been removed from jobs they should not carry?',
        ],
        deliverableZh:
          '这一轮之后，你应该拿到一版层级更清楚的综述引用结构，而不是只增加了数量。',
        deliverableEn:
          'After this round, you should have a review with a clearer citation hierarchy instead of simply more references.',
        closeZh:
          '引用真正增加深度的时候，不是数量上来，而是层级开始清楚。',
        closeEn:
          'Citations begin to add depth not when the count rises but when the hierarchy becomes clear.',
      },
      'methods-analysis': {
        titleZh: '写分析时怎么回引前人：别把引用只留在综述里',
        titleEn:
          'How should earlier studies be cited in the analysis? Do not leave all citations inside the review alone',
        introZh:
          '很多论文把引用几乎都放在综述阶段，到了分析部分就只剩自己的结果。这样写当然简洁，但也容易让解释显得孤立，好像分析与前人没有持续对话。',
        introEn:
          'Many papers place nearly all citations inside the review and leave the analysis section with nothing but the writer’s own results. That approach may feel clean, but it often isolates the interpretation from the continuing conversation with earlier studies.',
        zhihuAngleZh:
          '知乎里关于“分析部分还要不要引用”的讨论常会提到一点：如果你的解释在和前人比较，却不显式回引，读者其实很难跟上比较关系。',
        zhihuAngleEn:
          'Zhihu discussions on whether citations still belong in the analysis often point out that if the interpretation is comparing itself to earlier studies without citing them explicitly, readers struggle to follow the comparison.',
        strategyZh:
          '更稳的做法，是只在真正需要对照或解释分歧时回引关键文献，而不是把分析重新写成综述。引用不是回潮，而是帮助读者看见你的结果在已有讨论中落在什么位置。',
        strategyEn:
          'A steadier approach is to bring key sources back only when comparison or disagreement needs to be interpreted, rather than turning the analysis into a second review. The citation returns not as repetition but as a way to show where the new result sits inside the existing discussion.',
        stepsZh: [
          '先找出分析中真正需要和前人比较的几个关键点。',
          '再为这些点各配一两篇最核心的对照文献，而不是整批搬回。',
          '最后把比较句写清，让引用服务解释而不是抢正文空间。',
        ],
        stepsEn: [
          'Identify the few key points in the analysis that genuinely need comparison with earlier work.',
          'Assign one or two central comparison sources to each point rather than bringing back a whole batch of literature.',
          'Write the comparison sentence clearly so the citation serves interpretation instead of taking over the paragraph.',
        ],
        submissionZh:
          '如果以后要投稿，这种适度回引很有帮助，因为审稿人通常会看你是否知道自己的结果与已有研究是接续、修正还是冲突。',
        submissionEn:
          'If the work may later be submitted, this selective return to earlier studies is useful because reviewers often look to see whether the manuscript knows whether its results continue, revise, or conflict with prior work.',
        riskZh:
          '如果分析部分完全不回引，最容易出现的就是解释像悬空评论；如果回引过多，又会把分析写回综述。关键是抓住必要的比较点。',
        riskEn:
          'If the analysis never cites earlier studies, the interpretation can feel suspended in the air; if it cites too many, the section collapses back into review. The key is to identify the necessary points of comparison.',
        checklistZh: [
          '1. 是否已经找出分析中最需要比较的几个点。',
          '2. 每个点是否只配了少量高价值对照文献。',
          '3. 比较句是否真正帮助解释结果。',
        ],
        checklistEn: [
          '1. Have the few most necessary comparison points in the analysis been identified?',
          '2. Is each point paired with only a small number of high-value comparison sources?',
          '3. Do the comparison sentences genuinely help interpret the result?',
        ],
        deliverableZh:
          '这一轮之后，你应该拿到一套“分析中何时回引、回引谁、回引来做什么”的清晰规则。',
        deliverableEn:
          'After this round, you should have a clear rule set for when the analysis should cite again, whom it should cite, and what that citation is meant to do.',
        closeZh:
          '分析阶段回引前人，不是为了看起来更满，而是为了让你的解释继续留在学术对话里。',
        closeEn:
          'Citing earlier work again in the analysis is not about filling space but about keeping your interpretation inside the academic conversation.',
      },
      'revision-defense': {
        titleZh: '导师说引用乱怎么办：重建引用层级和段落支持关系',
        titleEn:
          'What if the advisor says the citations are chaotic? Rebuild the citation hierarchy and paragraph support structure',
        introZh:
          '很多人收到“引用太乱”的反馈时，会先去检查格式，但真正的问题常常不只是格式，而是段落判断和引用支持关系没有对齐。',
        introEn:
          'When writers receive feedback that the citations are chaotic, they often begin by checking formatting. Yet the real issue is frequently not formatting alone but the mismatch between paragraph judgments and citation support.',
        zhihuAngleZh:
          '知乎里关于“引用乱怎么改”的经验常会提醒：别只修参考文献表，要回到正文看每个判断到底由谁支撑。',
        zhihuAngleEn:
          'Zhihu advice on fixing chaotic citation use often reminds writers not to stop at the bibliography but to return to the body and ask which source actually supports each judgment.',
        strategyZh:
          '更有效的返修方式，是先给段落找主判断，再让引用围着主判断重新站位。只要支持关系清楚，格式问题反而是最好修的那部分。',
        strategyEn:
          'A more effective revision is to identify the main judgment of each paragraph first and then reposition the citations around that judgment. Once the support relationship is clear, formatting becomes the easiest part to fix.',
        stepsZh: [
          '先在每个关键段落写出一句主判断。',
          '再检查当前引用里谁真正支撑这句，谁只是陪衬。',
          '最后删掉无效堆叠，重排支持顺序。',
        ],
        stepsEn: [
          'Write one main judgment sentence for each key paragraph first.',
          'Check which current citations genuinely support that sentence and which are merely decorative.',
          'Remove ineffective stacking and reorder the support structure.',
        ],
        submissionZh:
          '如果后面要投稿，这种返修非常值得，因为编辑和审稿人往往就是通过段落支持关系来判断作者有没有真正掌握这批文献。',
        submissionEn:
          'If submission may come later, this revision is highly worthwhile because editors and reviewers often judge whether the author truly understands the literature through the support structure of the paragraphs.',
        riskZh:
          '如果只修格式不修支持关系，最容易出现的就是参考文献表看起来更整齐了，正文判断却还是站不住。',
        riskEn:
          'If only the formatting is corrected while the support structure remains weak, the bibliography may look cleaner while the paragraph judgments still fail to stand.',
        checklistZh: [
          '1. 关键段落是否已有主判断句。',
          '2. 每条判断是否有明确核心支撑。',
          '3. 无效堆叠引用是否已经删除。',
        ],
        checklistEn: [
          '1. Does each key paragraph now have a main judgment sentence?',
          '2. Does every judgment have a clearly identified core support source?',
          '3. Have ineffective citation stacks been removed?',
        ],
        deliverableZh:
          '这一轮之后，你应该有一版引用关系更清楚的正文，而不是只完成了表面规范化。',
        deliverableEn:
          'After this round, you should have a body text with much clearer citation relationships instead of a merely normalized bibliography.',
        closeZh:
          '引用返修真正要修的，是判断和支持之间的关系，而不是文献表的美观程度。',
        closeEn:
          'The real target of citation revision is the relationship between judgment and support, not the appearance of the reference list.',
      },
    },
  },
  {
    slug: 'paper-structure',
    topicSlug: 'paragraph-logic',
    categorySlug: 'structure-abstract-writing',
    labelZh: '摘要引言与结构写作',
    labelEn: 'Structure Writing',
    readerZh: '论文写作者',
    readerEn: 'thesis and paper writers',
    focusZh: '段落推进、章节任务和结构过渡',
    focusEn: 'paragraph movement, chapter tasks, and structural transitions',
    evidenceZh: '任务句、过渡句、段落主张和章节提纲',
    evidenceEn: 'task sentences, transition lines, paragraph claims, and chapter outlines',
    standardZh: '重点不是让结构看起来完整，而是让每一段、每一章都知道自己为什么存在。',
    standardEn:
      'The goal is not to make the structure look complete but to let every paragraph and chapter know why it exists.',
    articles: {
      proposal: {
        titleZh: '目录定了还是写不动？先把每章改成一句任务句',
        titleEn:
          'The outline is set but the draft still will not move? Turn each chapter into one task sentence first',
        introZh:
          '很多人目录看上去已经很完整，但真到写作时还是卡住。问题常常不在目录有没有，而在于每章只是标题，没有任务。',
        introEn:
          'Many writers have an outline that looks complete and still cannot begin writing. The problem is often not the absence of chapters but the absence of tasks. Each chapter has a title but no job.',
        zhihuAngleZh:
          '知乎上关于“目录有了还是写不动”的讨论里，一个很常见的提醒是：标题不是任务，只有当每章能被改写成一句动作句时，写作才真正开始。',
        zhihuAngleEn:
          'In Zhihu discussions about having an outline but still failing to draft, one common reminder is that a title is not a task. Writing begins only when each chapter can be rewritten as an action sentence.',
        strategyZh:
          '更稳的推进方式，是把每章都改成一句“这一章要完成什么”的任务句。任务句一出现，材料放哪、段落怎么排、结尾怎么收都会更清楚。',
        strategyEn:
          'A steadier way to move forward is to rewrite every chapter as one sentence stating what that chapter must accomplish. Once the task sentence appears, the placement of material, the order of paragraphs, and the ending of the chapter all become clearer.',
        stepsZh: [
          '先把目录里的每个标题改写成一句任务句。',
          '再检查相邻章节的任务有没有重叠或空缺。',
          '最后让每章的材料都只服务它自己的任务，不再四处乱放。',
        ],
        stepsEn: [
          'Rewrite each chapter title in the outline as one task sentence.',
          'Check whether the tasks of adjacent chapters overlap or leave gaps.',
          'Let the materials of each chapter serve its own task only instead of drifting everywhere.',
        ],
        submissionZh:
          '如果以后要把这篇内容改成长文或投稿稿，章节任务句会特别有帮助，因为它能快速暴露哪些部分只是学位论文式铺陈，哪些部分是真正对外部读者有价值的内容。',
        submissionEn:
          'If the work later needs to become a long-form piece or submission draft, chapter task sentences are especially useful because they quickly expose which parts are only thesis-style buildup and which parts truly matter for outside readers.',
        riskZh:
          '如果目录只有标题没有任务，最容易出现的就是写着写着重复、跳跃或空转，因为章节边界从来没有被设清楚。',
        riskEn:
          'If the outline contains titles without tasks, the common result is repetition, jumping, or empty spinning because the chapter boundaries were never clearly set.',
        checklistZh: [
          '1. 每章是否已有一句明确任务句。',
          '2. 相邻章节之间是否不存在明显重叠。',
          '3. 章节内材料是否已围绕任务重排。',
        ],
        checklistEn: [
          '1. Does every chapter already have one clear task sentence?',
          '2. Are obvious overlaps between adjacent chapters gone?',
          '3. Have the materials inside each chapter been rearranged around the task?',
        ],
        deliverableZh:
          '这一轮之后，你应该拿到一版能直接带动正文推进的任务型目录。',
        deliverableEn:
          'After this round, you should have a task-driven outline that can directly pull the body forward.',
        closeZh:
          '目录能不能真正带动写作，关键不在标题好不好看，而在每章有没有明确任务。',
        closeEn:
          'Whether an outline can truly drive writing depends less on how elegant the titles sound and more on whether each chapter has a clear task.',
      },
      'literature-review': {
        titleZh: '段落为什么总是散：每段只推进一个判断',
        titleEn:
          'Why do paragraphs keep feeling loose? Let each paragraph advance only one judgment',
        introZh:
          '很多段落看上去内容很多，却读完只剩模糊印象。常见原因不是材料不足，而是同一段同时做太多事：交代背景、塞引用、下判断、补解释，全挤在一起。',
        introEn:
          'Many paragraphs seem full of material and still leave only a blurred impression. The usual reason is not insufficient content but that one paragraph is trying to do too many jobs at once: background, citations, judgment, and explanation are all squeezed together.',
        zhihuAngleZh:
          '知乎里关于“论文段落总写散”的经验常常会提到一个简单但有效的规则：一段只推进一个判断，剩下的信息都围绕它服务。',
        zhihuAngleEn:
          'Zhihu advice on loose academic paragraphs often comes back to one simple but effective rule: one paragraph should advance one judgment, and everything else should serve that movement.',
        strategyZh:
          '更稳的段落写法，是先写段落主张句，再把证据和解释排进去。只要主张句不稳定，后面的引用和材料只会越加越散。',
        strategyEn:
          'A steadier paragraph pattern is to draft the paragraph claim sentence first and then place the evidence and explanation around it. If that claim sentence is unstable, later citations and material will only make the paragraph more diffuse.',
        stepsZh: [
          '先为每个段落写一句主张句。',
          '再删掉不服务这句主张的材料。',
          '最后检查段尾是否把判断收住，而不是又开一个新话题。',
        ],
        stepsEn: [
          'Write one claim sentence for each paragraph first.',
          'Remove material that does not serve that claim.',
          'Check whether the paragraph ending closes the judgment instead of opening a new topic.',
        ],
        submissionZh:
          '如果后面要投稿，这种段落控制很关键，因为编辑和审稿人往往是通过段落推进感来判断一篇稿件是否成熟。',
        submissionEn:
          'If the manuscript may later be submitted, this paragraph control is crucial because editors and reviewers often judge maturity through the momentum of paragraph movement.',
        riskZh:
          '如果一段同时做三四件事，最容易出现的就是作者自己知道想说什么，读者却抓不住这一段到底推进了哪一个判断。',
        riskEn:
          'If one paragraph tries to do three or four things at once, the common result is that the writer knows what they meant while the reader cannot tell what judgment the paragraph actually advanced.',
        checklistZh: [
          '1. 每段是否都有一句主张句。',
          '2. 材料是否都服务于这句主张。',
          '3. 段尾是否真正收束了这一段。',
        ],
        checklistEn: [
          '1. Does each paragraph already have one claim sentence?',
          '2. Does the material in the paragraph all serve that claim?',
          '3. Does the paragraph ending truly close that unit?',
        ],
        deliverableZh:
          '这一轮之后，你应该拿到一套更稳定的段落模板，而不是靠临场拼句子。',
        deliverableEn:
          'After this round, you should have a more stable paragraph template instead of building each unit by improvisation.',
        closeZh:
          '段落一旦只推进一个判断，结构就会自然变得更清楚。',
        closeEn:
          'Once a paragraph advances only one judgment, the structure naturally becomes clearer.',
      },
      'methods-analysis': {
        titleZh: '章节之间怎么过渡：用 bridge sentences 让分析往前走',
        titleEn:
          'How should sections transition? Use bridge sentences to carry the analysis forward',
        introZh:
          '很多论文每一章单看都还可以，但连起来就像分开的几段材料。问题常常出在过渡，读者不知道前一章为什么会走到下一章。',
        introEn:
          'Many papers contain chapters that are individually acceptable and still feel disconnected when read together. The usual problem lies in transitions: readers cannot see why one chapter leads to the next.',
        zhihuAngleZh:
          '知乎里关于“结构为什么总是断”的讨论里，一个高频建议是写 bridge sentences，也就是明确说出上一段或上一章留下了什么问题，下一段为什么必须接着来。',
        zhihuAngleEn:
          'In Zhihu discussions on broken structure, one recurring suggestion is to write bridge sentences that explicitly state what question the previous section left behind and why the next section must follow.',
        strategyZh:
          '更稳的章节衔接，不靠目录自然过渡，而靠作者主动写出连接理由。bridge sentence 的任务不是总结，而是推动下一步。',
        strategyEn:
          'Steady section linkage does not come from the outline automatically. It comes from the writer actively stating the reason for the connection. A bridge sentence does not merely summarize. It pushes the next move.',
        stepsZh: [
          '先在每章结尾写一句“这一章解决了什么，但还留下什么”。',
          '再在下一章开头写一句“为什么现在必须讨论这一层”。',
          '最后检查全篇是否存在突然跳段或跳章的地方，并补上过渡。',
        ],
        stepsEn: [
          'Write one sentence at the end of each chapter explaining what it solved and what still remains.',
          'Add one sentence at the opening of the next chapter explaining why this next layer must now be discussed.',
          'Check the whole draft for abrupt jumps between paragraphs or sections and add the missing bridges.',
        ],
        submissionZh:
          '如果以后要投稿，这些过渡会显著影响可读性。很多稿件不是没有内容，而是内容之间没有被写出“为什么这样排”。',
        submissionEn:
          'If the manuscript later goes out for submission, these transitions strongly affect readability. Many drafts do not lack content; they lack an explicit explanation of why the content is arranged in this order.',
        riskZh:
          '如果过渡一直缺位，最容易出现的就是章节像并列堆放，读者只能自己猜结构逻辑。',
        riskEn:
          'If transitions remain absent, chapters start feeling like parallel piles and the reader is forced to guess the structural logic alone.',
        checklistZh: [
          '1. 各章结尾是否都留下了明确的下一步问题。',
          '2. 下一章开头是否说明了为什么要接着写。',
          '3. 全文跳跃处是否已经补上过渡。',
        ],
        checklistEn: [
          '1. Does each chapter ending leave a clear next question?',
          '2. Does the next chapter opening explain why the discussion must continue there?',
          '3. Have abrupt jumps in the draft been repaired with bridges?',
        ],
        deliverableZh:
          '这一轮之后，你应该得到一套能让全文顺着读下去的过渡句，而不是靠标题硬切章节。',
        deliverableEn:
          'After this round, you should have a set of transition lines that allows the whole draft to read forward instead of cutting chapters apart by title alone.',
        closeZh:
          '结构真正顺的时候，不是目录排得漂亮，而是读者始终知道为什么下一段会出现。',
        closeEn:
          'A structure truly feels smooth not when the outline looks elegant but when the reader always knows why the next section appears.',
      },
      'revision-defense': {
        titleZh: '定稿前怎么做结构体检：查重复、跳跃和空转段',
        titleEn:
          'How do you perform a final structural check before submission? Look for repetition, jumps, and empty-spinning paragraphs',
        introZh:
          '很多论文定稿前最需要的不是再润色几句，而是做一次结构体检。否则正文可能已经写很多了，但重复、跳跃和空转段仍然大量存在。',
        introEn:
          'Before final submission, many papers need less line editing and more a structural health check. Without that pass, the body may contain a great deal of writing while repetition, jumping, and empty-spinning paragraphs still remain everywhere.',
        zhihuAngleZh:
          '知乎上关于“论文定稿前怎么检查”的讨论，经常会提到一个很实用的办法：不是从头再读一次，而是专门按结构病症去查。',
        zhihuAngleEn:
          'Zhihu discussions on how to inspect a paper before final submission often recommend a practical move: do not merely reread from the beginning but check specifically for structural symptoms.',
        strategyZh:
          '更有效的体检方式，是分三类查：重复段、跳跃段、空转段。先识别结构病症，再决定删、并、补还是重排，这会比无目的通读更省时间。',
        strategyEn:
          'A more effective structural check looks for three kinds of problems: repetition, jumps, and empty-spinning paragraphs. Once the symptoms are identified, you can decide whether to cut, merge, add, or reorder, which is much faster than unfocused rereading.',
        stepsZh: [
          '先把内容重复但位置不同的段落圈出来。',
          '再找出逻辑突然跳转却没有过渡的地方。',
          '最后识别那些看似在写但实际上没有推进判断的空转段。',
        ],
        stepsEn: [
          'Mark the paragraphs that repeat similar content in different locations first.',
          'Then identify places where the logic jumps without a bridge.',
          'Finally, locate the paragraphs that appear busy but do not actually advance any judgment.',
        ],
        submissionZh:
          '如果后面要投稿或答辩，这种结构体检非常值，因为它直接影响读者第一遍读时能不能顺着你的主线走完。',
        submissionEn:
          'If submission or defense still lies ahead, this structural check is highly worthwhile because it directly shapes whether readers can follow the main line on the first pass.',
        riskZh:
          '如果定稿前只顾着修句子，不修结构病症，最常见的后果就是语言更顺了，论证却还是松的。',
        riskEn:
          'If the final stage only polishes sentences but ignores structural symptoms, the common result is smoother language resting on a still-loose argument.',
        checklistZh: [
          '1. 重复段是否已被合并或删除。',
          '2. 跳跃处是否补上了过渡。',
          '3. 空转段是否已经被重写或删去。',
        ],
        checklistEn: [
          '1. Have the repeated paragraphs been merged or removed?',
          '2. Have the jumps been repaired with transitions?',
          '3. Have the empty-spinning paragraphs been rewritten or deleted?',
        ],
        deliverableZh:
          '这一轮之后，你应该拿到一版结构更紧的终稿，而不是只做了表面润色。',
        deliverableEn:
          'After this round, you should have a final draft with a tighter structure rather than one that only received surface polishing.',
        closeZh:
          '终稿真正变稳，往往不是因为句子更漂亮，而是结构病症终于被处理掉了。',
        closeEn:
          'A final draft often becomes truly steadier not because the sentences are prettier but because the structural symptoms were finally treated.',
      },
    },
  },
  {
    slug: 'methods-data',
    topicSlug: 'robustness-interpretation',
    categorySlug: 'methods-data-presentation',
    labelZh: '方法设计与结果表达',
    labelEn: 'Methods and Data',
    readerZh: '论文写作者',
    readerEn: 'thesis and paper writers',
    focusZh: '稳健性检验、结果解释和边界判断',
    focusEn: 'robustness checks, result interpretation, and boundary judgments',
    evidenceZh: '稳健性方案、结果表、对照分析和边界说明',
    evidenceEn: 'robustness plans, result tables, comparison analyses, and boundary notes',
    standardZh: '重点不是把检验越堆越多，而是让每一个检验都真正服务于判断。',
    standardEn:
      'The goal is not to pile up more and more tests but to make every test genuinely serve the judgment.',
    articles: {
      proposal: {
        titleZh: '稳健性检验不是越多越好：先定义什么结果值得检验',
        titleEn:
          'Robustness checks are not better simply because there are more of them: define first which results are worth testing',
        introZh:
          '很多研究设计一说到稳健性，就默认后面多做几组检验一定更好。但如果没有先想清楚哪些结论最需要被验证，稳健性很容易变成展示工作量。',
        introEn:
          'Many research plans treat robustness as automatically improved by doing more checks. Yet without deciding which conclusions most need to be tested, robustness easily becomes a display of workload rather than a support for inference.',
        zhihuAngleZh:
          '知乎里关于“稳健性怎么做”的经验常会提醒：别把所有能做的都堆上去，先想清楚真正脆弱的结论在哪。',
        zhihuAngleEn:
          'Zhihu advice on robustness checks often repeats one reminder: do not pile on everything that can be done; identify first where the vulnerable conclusions actually lie.',
        strategyZh:
          '更稳的前期设计，是先判断哪些结果一旦不稳，整篇论文就要重写，哪些只是锦上添花。只有抓住关键点，后面的检验安排才不会变成表演。',
        strategyEn:
          'A steadier early design is to decide which results would force a rewrite of the paper if they failed and which ones are only nice to have. Only then can the later test plan avoid becoming performance for its own sake.',
        stepsZh: [
          '先列出你最关键的几个结论。',
          '再判断每个结论最可能被质疑的地方是什么。',
          '最后只围绕这些关键质疑设计稳健性方案。',
        ],
        stepsEn: [
          'List the few conclusions that matter most.',
          'Identify the most likely point of challenge for each conclusion.',
          'Design the robustness plan only around those key challenges.',
        ],
        submissionZh:
          '如果以后要投稿，这种前置筛选很有帮助，因为审稿人通常不是要求“多做所有检验”，而是要求你回应最关键的识别担忧。',
        submissionEn:
          'If the project may later be submitted, this early selection is useful because reviewers rarely ask for every possible test; they ask you to answer the most important identification concern.',
        riskZh:
          '如果稳健性设计没有重点，最常见的后果就是时间大量花在边缘检验上，真正关键的怀疑点却还没被碰到。',
        riskEn:
          'If the robustness design has no priority, the common result is spending enormous time on peripheral tests while the central doubt is still untouched.',
        checklistZh: [
          '1. 最关键结论是否已经列出。',
          '2. 每个结论的主要质疑点是否已识别。',
          '3. 稳健性方案是否围绕关键质疑展开。',
        ],
        checklistEn: [
          '1. Have the most important conclusions already been listed?',
          '2. Has the main challenge to each conclusion been identified?',
          '3. Is the robustness plan built around those key challenges?',
        ],
        deliverableZh:
          '这一轮之后，你应该拿到一套有优先级的稳健性方案，而不是一个无限扩张的检验清单。',
        deliverableEn:
          'After this round, you should have a prioritized robustness plan rather than an endlessly expanding test checklist.',
        closeZh:
          '稳健性做得成熟的标志，不是检验数量多，而是关键怀疑点被真正命中。',
        closeEn:
          'The sign of mature robustness work is not a large number of tests but that the key doubts are genuinely targeted.',
      },
      'literature-review': {
        titleZh: '看文献时顺手记检验口径：别到分析阶段才补救',
        titleEn:
          'Capture robustness patterns while reading literature: do not wait until analysis to improvise',
        introZh:
          '很多人做稳健性时才开始回头翻文献，结果既浪费时间，也容易把别人的做法机械搬过来，因为前期阅读没有顺手记下这些口径。',
        introEn:
          'Many writers only return to the literature when it is time to build robustness checks, which wastes time and encourages mechanical copying because those patterns were never recorded during earlier reading.',
        zhihuAngleZh:
          '知乎里关于“稳健性检验怎么补”的问题里，经常有人提到：要在读文献时就记别人怎么回应质疑，而不是等被追问才临时翻找。',
        zhihuAngleEn:
          'In Zhihu questions about adding robustness checks, one repeated suggestion is to record how earlier studies answered challenges during reading rather than hunting for examples only after being questioned.',
        strategyZh:
          '更高效的读法，是在文献笔记里增加“他们如何证明结果更稳”这一栏。这样你后面需要设计检验时，已经有一套可比较的口径库。',
        strategyEn:
          'A more efficient reading practice adds one column to the literature notes: how this study strengthens confidence in its result. Then later robustness design starts with a reusable comparison library instead of a search from zero.',
        stepsZh: [
          '先在阅读笔记里新增一列稳健性口径。',
          '再记录每篇文献是针对什么质疑做了什么回应。',
          '最后把高频检验方式按适用条件分类保存。',
        ],
        stepsEn: [
          'Add one robustness column to the reading note.',
          'Record what concern each paper was answering and what response it used.',
          'Save the recurring robustness patterns by their conditions of use.',
        ],
        submissionZh:
          '如果后面要投稿，这种口径库会很有用，因为很多返修并不是要求你从零设计新检验，而是要求你判断哪些检验适合你的问题。',
        submissionEn:
          'If submission is a future step, this pattern library is extremely useful because many revisions do not ask for brand new tests from scratch but for better judgment on which tests actually fit the problem.',
        riskZh:
          '如果把稳健性完全留到分析后补，最容易出现的就是检验方案东拼西凑，看起来忙，却没有明显针对性。',
        riskEn:
          'If robustness is left entirely until after the analysis, the common result is a patchwork test plan that looks busy without showing clear targeting.',
        checklistZh: [
          '1. 阅读笔记里是否已有稳健性口径这一列。',
          '2. 各类检验是否已按所回应的质疑分类。',
          '3. 是否已经积累出一套高频可复用的方式。',
        ],
        checklistEn: [
          '1. Does the reading note already contain a robustness column?',
          '2. Have the tests been classified by the concern they respond to?',
          '3. Have you already accumulated a reusable high-frequency set of patterns?',
        ],
        deliverableZh:
          '这一轮之后，你应该拿到一个能在方法阶段直接调用的稳健性口径库。',
        deliverableEn:
          'After this round, you should have a robustness pattern library that can be used directly in the methods stage.',
        closeZh:
          '最省时间的稳健性准备，不是最后补，而是前面读的时候就顺手记。',
        closeEn:
          'The most time-saving way to prepare robustness checks is not to patch them in at the end but to capture them while reading early.',
      },
      'methods-analysis': {
        titleZh: '结果不显著怎么写：先分清没有效果和没有证据',
        titleEn:
          'How should non-significant results be written? Separate no effect from no evidence first',
        introZh:
          '很多人遇到不显著结果就慌，觉得这段分析是不是没法写了。其实最关键的问题不是显著与否，而是你有没有分清“真的没有效果”和“当前证据不足以说明”。',
        introEn:
          'Many writers panic when they see non-significant results and assume the analysis can no longer be written. Yet the key issue is not significance alone but whether the draft distinguishes between no effect and insufficient evidence.',
        zhihuAngleZh:
          '知乎里关于“结果不显著怎么办”的经验里，一个很重要的提醒是：别把不显著直接写成没关系，要先回到设计、样本和识别强度上做判断。',
        zhihuAngleEn:
          'A crucial reminder in Zhihu discussions on handling non-significant results is not to translate non-significance straight into no relationship but to return to the design, sample, and strength of identification first.',
        strategyZh:
          '更稳的解释路径，是分三步：先报告结果，再判断证据强度，最后再谈可能意味着没有效果还是暂时看不出来。顺序一旦反过来，结论就很容易写过头。',
        strategyEn:
          'A steadier interpretation path moves in three steps: report the result, judge the strength of the evidence, and only then discuss whether it may indicate no effect or merely limited visibility. Once the order reverses, the conclusion is easily overstated.',
        stepsZh: [
          '先客观写出不显著结果本身，不急着解释。',
          '再结合样本、设计和稳健性判断证据强度。',
          '最后才谈这意味着没有效果还是只是当前看不清。',
        ],
        stepsEn: [
          'State the non-significant result itself objectively before interpreting it.',
          'Judge the strength of the evidence through the sample, design, and robustness context.',
          'Only then discuss whether the result suggests no effect or simply limited visibility at the current stage.',
        ],
        submissionZh:
          '如果以后要投稿，这种写法很重要，因为审稿人通常更在意作者有没有谨慎解释边界，而不是有没有把所有结果都写得“好看”。',
        submissionEn:
          'If the manuscript may later be submitted, this style matters because reviewers usually care more about cautious boundary control than about whether every result looks attractive.',
        riskZh:
          '如果把不显著直接写成“没有关系”，最容易出现的就是过度解释；如果直接跳过不写，又会让读者怀疑你在回避结果。',
        riskEn:
          'If non-significance is written immediately as no relationship, the common danger is over-interpretation; if it is skipped entirely, readers may suspect the result is being avoided.',
        checklistZh: [
          '1. 结果本身是否已客观呈现。',
          '2. 证据强度是否已被单独判断。',
          '3. 解释是否区分了“没有效果”和“没有证据”。',
        ],
        checklistEn: [
          '1. Has the result itself been presented objectively?',
          '2. Has the strength of evidence been judged separately?',
          '3. Does the interpretation distinguish between no effect and no evidence?',
        ],
        deliverableZh:
          '这一轮之后，你应该拿到一套能稳住不显著结果写法的解释框架。',
        deliverableEn:
          'After this round, you should have an interpretation framework that can handle non-significant results without panic.',
        closeZh:
          '不显著结果真正考验的，不是运气，而是作者对证据边界的判断力。',
        closeEn:
          'What non-significant results really test is not luck but the writer’s judgment about evidentiary boundaries.',
      },
      'revision-defense': {
        titleZh: '审稿人要稳健性怎么办：补关键检验，不补表演型检验',
        titleEn:
          'What if the reviewer asks for robustness checks? Add the critical tests, not performative ones',
        introZh:
          '很多人收到“建议增加稳健性检验”的意见后，会下意识地不断往上堆检验，好像做得越多越安全。但返修真正难的是判断审稿人的核心担忧在哪里。',
        introEn:
          'When writers receive a comment asking for more robustness checks, the instinct is often to keep piling on tests as if more automatically means safer. Yet the real challenge in revision is identifying the reviewer’s core concern.',
        zhihuAngleZh:
          '知乎里关于“审稿人要补稳健性怎么回”的经验，常会提醒别陷进表演型检验，重点是命中评审真正不放心的识别点。',
        zhihuAngleEn:
          'Zhihu advice on responding to reviewer requests for more robustness checks often warns against performative testing and stresses the need to hit the identification point the reviewer actually doubts.',
        strategyZh:
          '更稳的返修方式，是先把评论翻译成“他究竟在担心什么”，再决定哪一个检验最能回应，而不是把所有能想到的方式都做一遍。',
        strategyEn:
          'A steadier revision method is to translate the comment into the specific concern it reflects and then decide which one test responds best instead of running every possible test you can think of.',
        stepsZh: [
          '先把审稿意见改写成一条明确担忧。',
          '再选择最能回应这条担忧的关键检验。',
          '最后在回复信里解释为什么这个检验比其他备选更贴近问题。',
        ],
        stepsEn: [
          'Rewrite the reviewer comment into one explicit concern first.',
          'Choose the single most relevant test for that concern.',
          'Explain in the response file why this test is closer to the issue than the alternative options.',
        ],
        submissionZh:
          '如果这一步做得准，返修会显得很专业，因为你回应的是担忧本身，而不是机械堆工作量。',
        submissionEn:
          'When this step is done precisely, the revision feels professional because it answers the concern itself rather than mechanically displaying extra labor.',
        riskZh:
          '如果把返修理解成“多做一点总没错”，最容易掉进的就是检验越来越多、主线越来越散，回复却还是没有真正命中评审的问题。',
        riskEn:
          'If revision is treated as more is always safer, the usual trap is that the tests multiply, the main line spreads, and the response still fails to answer the reviewer’s real question.',
        checklistZh: [
          '1. 审稿意见里的核心担忧是否已经被翻译出来。',
          '2. 是否选中了最关键的回应检验。',
          '3. 回复信是否说明了为什么这样补最贴近问题。',
        ],
        checklistEn: [
          '1. Has the core concern inside the reviewer comment been translated explicitly?',
          '2. Was the most critical response test selected?',
          '3. Does the response letter explain why this addition fits the issue best?',
        ],
        deliverableZh:
          '这一轮之后，你应该拿到一版更聚焦的稳健性返修方案和一段更能说服人的回复说明。',
        deliverableEn:
          'After this round, you should have a more focused robustness revision plan and a more persuasive explanation in the response file.',
        closeZh:
          '返修里的稳健性真正比拼的，不是数量，而是判断是否打中了评论背后的担忧。',
        closeEn:
          'What robustness revision really tests is not quantity but whether the judgment hits the concern behind the comment.',
      },
    },
  },
  {
    slug: 'submission-workflow',
    topicSlug: 'reviewer-response',
    categorySlug: 'submission-defense-workflow',
    labelZh: '返修投稿与答辩',
    labelEn: 'Revision and Submission',
    readerZh: '论文写作者',
    readerEn: 'thesis and paper writers',
    focusZh: 'response mindset、Cover Letter、回复信和 final QA',
    focusEn: 'response mindset, cover letters, response files, and final QA',
    evidenceZh: '问题清单、期刊匹配说明、回复信和最终校对单',
    evidenceEn: 'question lists, journal-fit notes, response files, and final QA sheets',
    standardZh: '重点不是把每个文件写得单独漂亮，而是让它们一起服务同一条主线。',
    standardEn:
      'The goal is not to make each file sound polished in isolation but to make all of them serve one shared line.',
    articles: {
      proposal: {
        titleZh: '开题就练 response mindset：未来最可能被问哪三类问题',
        titleEn:
          'Practice a response mindset during the proposal: which three kinds of questions are most likely to come later',
        introZh:
          '很多人直到答辩或投稿后才第一次认真想“别人会怎么问我”。其实这种 response mindset 越早练，后面越不容易被临时追问打乱节奏。',
        introEn:
          'Many writers only seriously ask how others might question them once defense or submission is already underway. Yet the earlier a response mindset is practiced, the less likely later questioning is to break the rhythm of the project.',
        zhihuAngleZh:
          '知乎里关于“答辩紧张怎么办”的讨论，经常会提到一个共同经验：别只准备你想说什么，也要准备别人最可能怎么拆你的说法。',
        zhihuAngleEn:
          'Zhihu discussions on handling defense anxiety often repeat one shared lesson: do not prepare only what you want to say; prepare how others are most likely to dismantle what you say.',
        strategyZh:
          '更稳的开题训练，是提前列出未来最可能出现的三类问题：可行性质疑、贡献性质疑、方法性质疑。只要现在就开始按这三类反问自己，后面很多临时慌乱都会明显减少。',
        strategyEn:
          'A steadier proposal-stage practice is to list the three question types most likely to appear later: feasibility challenges, contribution challenges, and method challenges. Once you begin testing your own project against those three types now, much later panic disappears.',
        stepsZh: [
          '先列出最可能被问的三类问题。',
          '再为每类问题各写一条简短回应。',
          '最后检查现有题目和结构是否已经能支撑这些回应。',
        ],
        stepsEn: [
          'List the three types of questions you are most likely to face later.',
          'Write one short response line for each type.',
          'Check whether the current topic and structure can already support those responses.',
        ],
        submissionZh:
          '如果后面会投稿，这种 response mindset 非常有用，因为编辑信、审稿意见和答辩追问，本质上都在测试你能否稳定回应别人最在意的那几件事。',
        submissionEn:
          'If submission is a later goal, this response mindset is extremely useful because editor letters, reviewer comments, and defense questions all test whether you can answer the few things others care about most with stability.',
        riskZh:
          '如果前期完全不练回应视角，最容易出现的就是自己写的时候觉得很顺，一被追问却发现论证其实没有准备好。',
        riskEn:
          'If the response perspective is never practiced early, the common result is that the draft feels smooth while being written and then suddenly looks unprepared as soon as questions arrive.',
        checklistZh: [
          '1. 是否已经列出三类高概率问题。',
          '2. 每类问题是否已有一条简短回应。',
          '3. 现有结构是否能撑住这些回应。',
        ],
        checklistEn: [
          '1. Have the three high-probability question types been listed?',
          '2. Does each type already have one short response line?',
          '3. Can the current structure support those responses?',
        ],
        deliverableZh:
          '这一轮之后，你应该拿到一套初步 response mindset 清单，而不是只会正向介绍自己的题目。',
        deliverableEn:
          'After this round, you should have an initial response-mindset checklist instead of only a forward-facing description of your topic.',
        closeZh:
          '越早练会从别人的问题倒看自己的论文，后面真正被问到时就越不会慌。',
        closeEn:
          'The earlier you learn to look back at your paper through other people’s questions, the steadier you become when those questions actually arrive.',
      },
      'literature-review': {
        titleZh: 'Cover Letter 不是摘要复述：先写 journal fit 的逻辑',
        titleEn:
          'A cover letter is not a repeated abstract: write the journal-fit logic first',
        introZh:
          '很多 Cover Letter 看起来很工整，却只是把摘要换个口气再写一遍。真正缺失的，往往是“为什么这篇稿件适合这个刊物和它的读者”。',
        introEn:
          'Many cover letters look polished and still function only as abstracts in a different tone. What is usually missing is the logic of why the manuscript fits this journal and its readers specifically.',
        zhihuAngleZh:
          '知乎里关于“Cover Letter 怎么写”的讨论，经常会提到一点：编辑不是只想知道你研究了什么，更想知道为什么这篇稿件应该在这里被看见。',
        zhihuAngleEn:
          'Zhihu discussions on writing cover letters often point out that editors want not only to know what the paper studied but why this manuscript should be seen here.',
        strategyZh:
          '更稳的 Cover Letter 起点，是先写 journal fit：这个刊物关心什么读者、什么问题、什么方法或材料风格，而你的稿件为什么正好能接进去。没有这层逻辑，Cover Letter 很容易沦为摘要副本。',
        strategyEn:
          'A steadier starting point for the cover letter is journal fit: what readers, problems, and method or material styles the journal cares about and why your manuscript can enter exactly there. Without that logic, the cover letter easily degrades into an abstract copy.',
        stepsZh: [
          '先写清目标期刊最关心的读者和议题。',
          '再说明你的稿件在哪一点和它的范围真正贴合。',
          '最后才简要交代研究内容和贡献。',
        ],
        stepsEn: [
          'Write clearly who the journal’s readers are and which issues it cares about first.',
          'Then explain at what point your manuscript genuinely fits that scope.',
          'Only after that summarize the study content and contribution briefly.',
        ],
        submissionZh:
          '如果这一步做好，后面不管是第一次投稿还是重投新刊，改动都会更聚焦，因为你调整的是 journal fit，而不是只换措辞。',
        submissionEn:
          'If this step is done well, both first submissions and resubmissions become more focused because the revision targets journal fit rather than mere wording.',
        riskZh:
          '如果 Cover Letter 只是摘要复述，最常见的后果就是编辑仍然不知道为什么这篇稿件应该送进这个刊物的审稿流程。',
        riskEn:
          'If the cover letter only repeats the abstract, the common outcome is that the editor still does not know why this manuscript belongs in the review process of this journal.',
        checklistZh: [
          '1. 目标期刊的读者和议题是否已写清。',
          '2. 稿件和期刊范围的贴合点是否已明确说明。',
          '3. Cover Letter 是否不再只是摘要复述。',
        ],
        checklistEn: [
          '1. Are the journal’s readers and issues clearly named?',
          '2. Is the fit point between the manuscript and the journal scope explicit?',
          '3. Has the cover letter moved beyond repeating the abstract?',
        ],
        deliverableZh:
          '这一轮之后，你应该拿到一版真正围绕 journal fit 展开的 Cover Letter 底稿。',
        deliverableEn:
          'After this round, you should have a cover-letter draft genuinely built around journal fit.',
        closeZh:
          'Cover Letter 真正打动编辑的时候，不是摘要写得更顺，而是 fit 逻辑写得更准。',
        closeEn:
          'A cover letter persuades an editor not when it sounds like a smoother abstract but when its fit logic is sharper.',
      },
      'methods-analysis': {
        titleZh: '回复审稿人意见怎么写：逐条回应，但别失去主线',
        titleEn:
          'How should reviewer comments be answered? Respond point by point without losing the main line',
        introZh:
          '很多回复信最大的问题不是不礼貌，而是太碎。每一条都回应了，整份文件却像一堆局部补丁，看不出作者到底在如何系统修复稿件。',
        introEn:
          'The biggest problem in many response files is not tone but fragmentation. Every point may be answered, yet the document still reads like a pile of local patches with no sense of how the manuscript is being repaired as a whole.',
        zhihuAngleZh:
          '知乎里关于“回复审稿人意见”的经验，经常会提到一句话：逐条回应是形式，保持主线才是能力。',
        zhihuAngleEn:
          'Zhihu advice on responding to reviewers often condenses into one sentence: point-by-point response is the form, keeping the main line is the real skill.',
        strategyZh:
          '更稳的回复写法，是每条先明确承认问题，再说明修改动作，最后回到主线，解释这项修改如何让整篇稿件更稳。这样逐条回应也不会把全文拆散。',
        strategyEn:
          'A steadier response pattern states the issue clearly, explains the revision action, and then returns to the main line by showing how that change strengthens the manuscript as a whole. This keeps point-by-point response from scattering the paper.',
        stepsZh: [
          '先把评论译成一个明确的问题，而不是直接上解释。',
          '再写你具体改了什么、改在何处。',
          '最后补一句这项修改对整篇稿件意味着什么。',
        ],
        stepsEn: [
          'Translate the comment into one clear problem before beginning the explanation.',
          'State what was revised and where it was revised.',
          'Add one sentence explaining what this change means for the manuscript as a whole.',
        ],
        submissionZh:
          '如果回复信能做到这一点，返修质量会显得高很多，因为评审看到的不只是你很认真，而是你真的知道每条评论与主线的关系。',
        submissionEn:
          'When the response file does this well, the revision appears much stronger because reviewers see not only effort but a real understanding of how each comment connects to the main line.',
        riskZh:
          '如果回复只剩碎片动作，最容易出现的就是每条都在改，整篇稿件却还是没有被真正重新拧紧。',
        riskEn:
          'If the response is reduced to fragmented actions, the common result is that every point changes while the manuscript as a whole still fails to retighten.',
        checklistZh: [
          '1. 每条评论是否都被转写成明确问题。',
          '2. 修改动作和位置是否已写清。',
          '3. 是否补上了“这对主线意味着什么”的说明。',
        ],
        checklistEn: [
          '1. Has each comment been translated into a clear problem statement?',
          '2. Are the revision action and location stated clearly?',
          '3. Does the response explain what the change means for the main line?',
        ],
        deliverableZh:
          '这一轮之后，你应该拿到一份既逐条回应、又能看见整体修复逻辑的回复信。',
        deliverableEn:
          'After this round, you should have a response file that is both point-by-point and visibly guided by an overall repair logic.',
        closeZh:
          '回复信真正成熟的时候，不是每条都回了，而是每条都还能回到同一条主线。',
        closeEn:
          'A response file becomes truly mature not when every point is answered but when every answer can still return to the same main line.',
      },
      'revision-defense': {
        titleZh: 'proof 校样到底看什么：用 final QA list 收最后一轮',
        titleEn:
          'What exactly should be checked in page proofs? Use a final QA list to close the last round',
        introZh:
          '很多人进入 proof 阶段后会放松，以为大局已定，只需随手看下拼写。结果最容易漏掉的恰恰是图表编号、链接、作者信息、声明文本和术语一致性这些最后还会出错的细节。',
        introEn:
          'Many writers relax once the proof stage begins and assume the major work is already done, checking only spelling casually. Yet the details most likely to fail here are figure numbering, links, author information, disclosure text, and terminology consistency.',
        zhihuAngleZh:
          '知乎里关于“proof 阶段还要注意什么”的经验通常都会提醒：别把 proof 当成形式流程，它其实是最后一次完整 QA。',
        zhihuAngleEn:
          'Zhihu discussions on what to watch during the proof stage usually share the same reminder: do not treat proofs as a formality; they are the last complete QA round.',
        strategyZh:
          '更稳的做法，是提前列一个 final QA list，按标题、作者、摘要、正文、图表、参考文献、附件链接、声明文本和术语一致性逐项核对。这样最后一轮不会只靠眼缘。',
        strategyEn:
          'A steadier approach is to prepare a final QA list in advance and check title, authors, abstract, body, figures, references, supplement links, disclosure text, and terminology consistency one by one. Then the last round stops depending on casual visual scanning.',
        stepsZh: [
          '先把 final QA list 按模块列出来。',
          '再按顺序完整通读 proof，而不是哪儿顺眼看哪儿。',
          '最后把发现的问题按允许修改范围整理提交。',
        ],
        stepsEn: [
          'Build the final QA list by module first.',
          'Read through the proof in sequence instead of checking random items that catch the eye.',
          'Organize the discovered issues according to what the proof stage allows to be corrected.',
        ],
        submissionZh:
          '如果这一步做得细，最后的正式版本会稳很多。很多所谓的“小错误”其实直接影响可读性、可追溯性和专业感。',
        submissionEn:
          'When this step is done carefully, the final published version becomes much steadier. Many so-called small errors directly affect readability, traceability, and professionalism.',
        riskZh:
          '如果 proof 阶段只被当成收尾形式，最容易出现的就是文字没问题，但编号、链接、说明和版本信息悄悄出错。',
        riskEn:
          'If the proof stage is treated as a mere closing formality, the common result is that the wording remains fine while numbering, links, notes, and version details quietly break.',
        checklistZh: [
          '1. final QA list 是否已分模块列好。',
          '2. proof 是否按顺序完整通读过。',
          '3. 问题是否已按允许修改范围整理。',
        ],
        checklistEn: [
          '1. Has the final QA list been prepared by module?',
          '2. Has the proof been read through completely in order?',
          '3. Have the issues been organized according to the allowed correction range?',
        ],
        deliverableZh:
          '这一轮之后，你应该拿到一份真正能撑住最后版本的 QA 清单和修正表。',
        deliverableEn:
          'After this round, you should have a QA list and correction sheet that can genuinely protect the final version.',
        closeZh:
          'proof 阶段真正值钱的，不是再润色一句，而是把最后可能掉链子的细节全部收住。',
        closeEn:
          'What makes the proof stage valuable is not polishing one more sentence but closing every detail that could still break at the very end.',
      },
    },
  },
  {
    slug: 'research-topic',
    topicSlug: 'keyword-positioning',
    categorySlug: 'research-topic-planning',
    labelZh: '选题与问题定义',
    labelEn: 'Topic Selection',
    readerZh: '论文写作者',
    readerEn: 'thesis and paper writers',
    focusZh: '关键词定位、题目命名和检索可见性',
    focusEn: 'keyword positioning, title naming, and search visibility',
    evidenceZh: '关键词树、数据库检索结果和题目版本记录',
    evidenceEn: 'keyword trees, database search results, and title version notes',
    standardZh: '重点不是把题目写得更好看，而是让题目、关键词和读者入口真正对齐。',
    standardEn:
      'The goal is not to make the title sound prettier but to align the title, the keywords, and the reader entry points.',
    articles: {
      proposal: {
        titleZh: '题目和关键词别分开想：开题时就把检索入口一起定',
        titleEn:
          'Do not treat the title and keywords separately: define the search entry points during the proposal stage',
        introZh:
          '很多人写题目时只考虑表达好不好听，写关键词时又随手补几个大词，结果题目和检索入口像两套系统，后面不管是综述、摘要还是投稿定位都容易跑偏。',
        introEn:
          'Many writers choose a title mainly by how polished it sounds and add a few broad keywords later as an afterthought. The result is that the title and the search entry points behave like two different systems, which later destabilizes the review, the abstract, and the submission positioning.',
        zhihuAngleZh:
          '知乎里关于“题目和关键词怎么定”的高频问题，反复暴露的是一个习惯：大家会把题目当门面、把关键词当填空题，却很少把它们当成同一条检索链来设计。',
        zhihuAngleEn:
          'Across recurring Zhihu questions on choosing titles and keywords, one habit shows up again and again: titles are treated as presentation while keywords are treated as blanks to fill, instead of both being designed as one search chain.',
        strategyZh:
          '更稳的开题做法，是先把题目拆成对象词、问题词和边界词，再给每一层准备可替代关键词。只要三层能同时回到同一个研究问题，题目和关键词就不会各说各话。',
        strategyEn:
          'A steadier proposal-stage move is to split the title into an object term, a problem term, and a boundary term, then prepare alternative keywords for each layer. As long as all three layers point back to the same research question, the title and the keywords will not drift apart.',
        stepsZh: [
          '先把题目拆成对象、问题和边界三个词组。',
          '再为每个词组准备两到三个数据库里常见的替代说法。',
          '最后检查题目和关键词是否都能把读者带回同一个问题。',
        ],
        stepsEn: [
          'Break the title into an object phrase, a problem phrase, and a boundary phrase.',
          'Prepare two or three database-friendly alternatives for each phrase.',
          'Check whether both the title and the keyword set lead readers back to the same problem.',
        ],
        submissionZh:
          '如果以后还要投稿，这一步很值钱，因为很多后期的大改其实只是前期没有把题目、关键词和读者入口一起设计好。',
        submissionEn:
          'If submission may come later, this step is highly valuable because many late major revisions are simply the cost of never designing the title, keywords, and reader entry together at the start.',
        riskZh:
          '如果题目和关键词一直分开想，最常见的后果就是题目看起来很稳，数据库检索却抓不到真正相关文献，后面写作会越来越吃力。',
        riskEn:
          'If the title and keywords keep being designed separately, the common result is a title that looks stable while database searching misses the most relevant literature, making later writing progressively harder.',
        checklistZh: [
          '1. 题目是否已经拆成对象、问题和边界三层。',
          '2. 每一层是否都有可替代关键词。',
          '3. 题目和关键词是否都指向同一个研究问题。',
        ],
        checklistEn: [
          '1. Has the title already been split into object, problem, and boundary layers?',
          '2. Does each layer have alternative keyword options?',
          '3. Do the title and keywords both point to the same research question?',
        ],
        deliverableZh:
          '这一轮之后，你应该拿到一版更稳定的题目、一套可检索关键词和一张能继续扩写的入口词表。',
        deliverableEn:
          'After this round, you should have a steadier title, a searchable keyword set, and an entry-term sheet that can keep expanding later.',
        closeZh:
          '题目和关键词一旦在开题时就对齐，后面的综述、摘要和投稿定位都会顺很多。',
        closeEn:
          'Once the title and keywords align during the proposal stage, the review, the abstract, and the submission positioning all become much smoother later.',
      },
      'literature-review': {
        titleZh: '检索越搜越散？先用关键词分层把文献入口重新收紧',
        titleEn:
          'Does the search keep scattering? Re-tighten the literature entry by layering your keywords',
        introZh:
          '很多人写综述时会发现同一个方向搜出来的东西越来越杂，最后不是文献太少，而是入口太乱，检索词彼此并不服务同一条问题线。',
        introEn:
          'Many writers discover during the review stage that search results become more and more heterogeneous. The problem is often not too little literature but an entry system that has become too messy, with search terms no longer serving the same question line.',
        zhihuAngleZh:
          '知乎里关于“检索词越改越乱怎么办”的讨论，经常会提到一个简单但有效的做法：把关键词分层，而不是一股脑往检索式里堆。',
        zhihuAngleEn:
          'Zhihu discussions on search terms getting more chaotic often point to one simple but effective move: layer the keywords instead of stuffing every possible term into one search expression.',
        strategyZh:
          '更稳的综述检索法，是把关键词分成核心词、限定词和补充词。核心词决定你在找什么，限定词决定你找哪一类，补充词则帮助你调细结果，而不是从一开始就把所有词平铺使用。',
        strategyEn:
          'A steadier review-stage search practice is to divide keywords into core terms, limiting terms, and support terms. Core terms determine what you are looking for, limiting terms define which subset you want, and support terms help refine the results instead of throwing every term in flatly from the start.',
        stepsZh: [
          '先找出不能动的核心词，别让它跟着每次检索一起漂。',
          '再把地区、时间、对象或方法放进限定词层。',
          '最后只在需要时才加入补充词收窄结果。',
        ],
        stepsEn: [
          'Identify the non-negotiable core terms first so they do not drift every time the search changes.',
          'Place region, time, object, or method items into the limiting layer.',
          'Add support terms only when you need to narrow the result set further.',
        ],
        submissionZh:
          '如果以后要写成更成熟的引言或 review，这种分层检索会非常有用，因为你可以更清楚地解释“为什么是这一批文献，而不是另一批”。',
        submissionEn:
          'If the material later becomes a stronger introduction or a review article, this layered search strategy is extremely useful because it lets you explain much more clearly why this literature set was chosen instead of another one.',
        riskZh:
          '如果检索词一直不分层，最容易出现的就是结果看起来很多，真正可用于综述骨架的却很少。',
        riskEn:
          'If the search terms never gain layers, the common result is a large result set with very few papers that can actually support the review structure.',
        checklistZh: [
          '1. 核心词是否已经固定下来。',
          '2. 限定词和补充词是否已分开。',
          '3. 这套检索词是否还能稳定回到同一条问题线。',
        ],
        checklistEn: [
          '1. Have the core terms been stabilized?',
          '2. Are the limiting and support terms now separated?',
          '3. Does the search set still return to one coherent question line?',
        ],
        deliverableZh:
          '这一轮之后，你应该得到一套更稳定的分层检索式和一批更适合进入综述骨架的文献入口。',
        deliverableEn:
          'After this round, you should have a more stable layered search system and a literature entry set that better fits the review skeleton.',
        closeZh:
          '关键词一旦分层，综述入口就不再靠运气，而是开始由你主动控制。',
        closeEn:
          'Once the keywords are layered, the review entry stops depending on luck and starts being actively controlled by the writer.',
      },
      'methods-analysis': {
        titleZh: '关键词要不要和变量口径一致：先看你到底在测什么',
        titleEn:
          'Should keywords match the variable definitions? Decide first what the study is actually measuring',
        introZh:
          '很多题目和摘要里写的是一个概念，到了方法和变量定义时却换成了另一套口径。读者未必立刻指出来，但这种错位会让整个研究看起来很不稳。',
        introEn:
          'Many projects name one concept in the title and abstract and then shift into a different vocabulary when defining variables or coding rules. Readers may not point it out immediately, but this mismatch makes the whole study feel unstable.',
        zhihuAngleZh:
          '知乎里关于“题目、变量和摘要是不是要统一”的讨论，反复出现的核心提醒就是：至少要知道你是在改表达，还是在改研究对象本身。',
        zhihuAngleEn:
          'Zhihu discussions on whether the title, variables, and abstract should stay unified repeatedly return to the same reminder: the writer must know whether they are only changing wording or changing the actual object of study.',
        strategyZh:
          '更稳的做法，是先把题目关键词和方法口径逐个对照。哪些是同义改写，哪些其实已经换了测量对象或分析边界，要在这里一次看清。',
        strategyEn:
          'A steadier move is to compare the title keywords and the methodological definitions one by one. Some differences are harmless paraphrases, while others quietly replace the measured object or the analytical boundary. That distinction needs to be made clearly here.',
        stepsZh: [
          '先把题目和摘要里的核心词抄出来。',
          '再对照变量、编码或样本口径，看哪些词已经变形。',
          '最后决定是回改题目表达，还是回改方法定义。',
        ],
        stepsEn: [
          'List the core terms used in the title and abstract first.',
          'Compare them to the variable, coding, or sample definitions and mark which ones have shifted.',
          'Then decide whether the title wording must be revised or the method definition itself needs correction.',
        ],
        submissionZh:
          '如果后面要投稿，这一步非常关键，因为编辑和审稿人很容易对“题目说的是 A，方法测的是 B”这种错位产生第一眼不信任。',
        submissionEn:
          'If the work may later be submitted, this step is crucial because editors and reviewers quickly lose trust when the title appears to promise A while the method is clearly measuring B.',
        riskZh:
          '如果关键词和方法口径一直错位，最常见的后果就是题目吸引了一类读者，正文却在回答另一类问题。',
        riskEn:
          'If the keywords and method definitions remain misaligned, the common outcome is that the title attracts one kind of reader while the body answers a different kind of question.',
        checklistZh: [
          '1. 题目和摘要里的核心词是否已经列清。',
          '2. 变量或编码口径是否和这些词真正对应。',
          '3. 是否已经区分表达变化和对象变化。',
        ],
        checklistEn: [
          '1. Have the core terms from the title and abstract been listed clearly?',
          '2. Do the variable or coding definitions genuinely correspond to them?',
          '3. Have you separated wording shifts from actual object shifts?',
        ],
        deliverableZh:
          '这一轮之后，你应该得到一版题目、摘要和方法口径更一致的研究表达。',
        deliverableEn:
          'After this round, you should have a research expression in which the title, abstract, and methodological definitions are much more aligned.',
        closeZh:
          '题目和方法一旦说同一种语言，整篇论文的可信度会立刻抬起来。',
        closeEn:
          'Once the title and the method begin speaking the same language, the credibility of the whole paper rises immediately.',
      },
      'revision-defense': {
        titleZh: '定稿前题目和关键词要不要重写：先看现在这版到底吸引了谁',
        titleEn:
          'Should the title and keywords be rewritten before final submission? Check who the current version is actually attracting',
        introZh:
          '很多人到定稿前才发现，现在这版题目吸引来的读者，和正文真正适合的读者并不是同一群。这个问题如果不处理，答辩和投稿定位都会变得很别扭。',
        introEn:
          'Many writers only realize near the final stage that the current title is attracting readers who are not the same group the body is actually written for. If that mismatch is left unresolved, both defense framing and submission positioning become awkward.',
        zhihuAngleZh:
          '知乎里关于“标题要不要临门一脚再改”的经验，常会提醒别只看好不好听，而要看现在这版到底把哪类读者带进来了。',
        zhihuAngleEn:
          'Zhihu advice on whether a title should be revised right before submission often warns against judging only by sound or elegance. The real question is which readers the current version is inviting in.',
        strategyZh:
          '更稳的收口方式，是回看标题、关键词、摘要和正文第一段，判断它们吸引的读者是不是同一类。如果不是，就要在这一步统一入口口径。',
        strategyEn:
          'A steadier final-stage move is to review the title, keywords, abstract, and first paragraph together and ask whether they are inviting the same kind of reader. If they are not, the entry language needs to be unified now.',
        stepsZh: [
          '先判断当前标题和关键词最像在吸引哪类读者。',
          '再对照正文第一段，看内容真正对谁有用。',
          '最后决定是重写标题关键词，还是微调正文开场。',
        ],
        stepsEn: [
          'Judge first which reader group the current title and keywords appear to attract most strongly.',
          'Compare that with the first paragraph of the body and ask who the content is actually useful for.',
          'Then decide whether the title and keywords must be rewritten or the opening of the body should be adjusted slightly.',
        ],
        submissionZh:
          '如果后面要投稿，这一步会直接影响 editor first impression；如果要答辩，也会影响老师们第一眼理解你在做什么。',
        submissionEn:
          'If submission is next, this step directly shapes the editor’s first impression; if defense is next, it shapes how examiners understand the project at first glance.',
        riskZh:
          '如果收尾时不处理入口错位，最容易出现的就是标题越看越亮眼，正文却越显得不对应。',
        riskEn:
          'If this entry mismatch is not repaired at the final stage, the title often grows more eye-catching while the body looks less and less aligned with it.',
        checklistZh: [
          '1. 当前标题和关键词吸引的读者是否已判断清楚。',
          '2. 正文第一段真正服务的读者是否一致。',
          '3. 是否已经统一了入口口径。',
        ],
        checklistEn: [
          '1. Has the reader attracted by the current title and keywords been identified clearly?',
          '2. Is that the same reader served by the first paragraph of the body?',
          '3. Has the entry language now been unified?',
        ],
        deliverableZh:
          '这一轮之后，你应该拿到一版对外入口更统一的题目、关键词和摘要组合。',
        deliverableEn:
          'After this round, you should have a more unified outward-facing combination of title, keywords, and abstract.',
        closeZh:
          '定稿时重写题目和关键词，不是为了更花哨，而是为了让正确的读者被正确地带进来。',
        closeEn:
          'Rewriting the title and keywords at the final stage is not about decoration but about letting the right readers enter through the right door.',
      },
    },
  },
  {
    slug: 'literature-reading',
    topicSlug: 'gap-writing',
    categorySlug: 'literature-reading-review',
    labelZh: '文献阅读与综述',
    labelEn: 'Literature Review',
    readerZh: '论文写作者',
    readerEn: 'thesis and paper writers',
    focusZh: '研究缺口、比较句和切入点表达',
    focusEn: 'research gaps, comparison sentences, and entry-point framing',
    evidenceZh: '比较句、争议线和 gap statement 草稿',
    evidenceEn: 'comparison sentences, dispute lines, and gap-statement drafts',
    standardZh: '重点不是把“研究不足”写得更大，而是把你的切入点说得更准。',
    standardEn:
      'The goal is not to make the insufficiency sound larger but to make your point of entry more precise.',
    articles: {
      proposal: {
        titleZh: '别先写研究意义：先练一句真正成立的 gap sentence',
        titleEn:
          'Do not begin with significance first: practice one gap sentence that actually stands',
        introZh:
          '很多人写开题时会很快进入“这个问题很重要”，但如果还没有一句真正成立的研究缺口，后面的意义写得再热闹也很容易飘。',
        introEn:
          'Many writers move quickly into explaining why a problem matters during the proposal stage, but if there is not yet one gap sentence that actually stands, even a lively significance section remains unstable.',
        zhihuAngleZh:
          '知乎里关于“研究缺口怎么找”的讨论，常会提醒一个简单事实：重要性和缺口不是一回事，前者告诉你值不值得做，后者才说明你准备从哪里切进去。',
        zhihuAngleEn:
          'Zhihu discussions on finding a research gap often return to one simple fact: importance and gap are not the same thing. The first tells you whether a topic is worth doing, while the second shows where you intend to enter it.',
        strategyZh:
          '更稳的开题动作，是先练一句 gap sentence：前人做到哪里、还差哪一小步、你为什么刚好适合补这一步。只要这句话站住，后面的意义、创新和目录都会更容易收束。',
        strategyEn:
          'A steadier proposal-stage move is to practice one gap sentence: how far prior work has gone, what small step is still missing, and why your project is particularly suited to fill it. Once that sentence stands, the significance, novelty, and outline all become easier to tighten.',
        stepsZh: [
          '先写出前人已经做到哪一步。',
          '再指出仍然缺的那一小步，不要一上来就说整个领域都不够。',
          '最后补一句为什么你的题目能正好接这一步。',
        ],
        stepsEn: [
          'Write how far prior work has already gone first.',
          'Point to the small missing step that remains instead of saying the whole field is insufficient.',
          'Add one sentence explaining why your topic can take exactly that next step.',
        ],
        submissionZh:
          '如果以后要投稿，这句 gap sentence 几乎会贯穿摘要、引言和 Cover Letter，所以越早写稳越值钱。',
        submissionEn:
          'If submission may come later, this gap sentence will likely run through the abstract, the introduction, and the cover letter, so stabilizing it early is highly valuable.',
        riskZh:
          '如果研究意义先行、缺口后补，最常见的后果就是题目看起来很重要，真正切口却一直不清楚。',
        riskEn:
          'If significance comes first and the gap is patched in later, the common result is a topic that looks important while the real entry point remains unclear.',
        checklistZh: [
          '1. 前人做到哪里是否已经写清。',
          '2. 缺的那一小步是否具体。',
          '3. 你的题目为什么适合接这一步是否已说明。',
        ],
        checklistEn: [
          '1. Is the current reach of prior work clearly stated?',
          '2. Is the missing next step concrete?',
          '3. Is it already explained why your project fits that step?',
        ],
        deliverableZh:
          '这一轮之后，你应该拿到一句能真正支撑开题的 gap sentence，而不是只有一段泛泛的研究意义。',
        deliverableEn:
          'After this round, you should have one gap sentence that can truly support the proposal instead of only a broad significance paragraph.',
        closeZh:
          '真正能撑起一个题目的，不是重要性喊得多大，而是缺口说得多准。',
        closeEn:
          'What truly holds up a topic is not how loudly importance is claimed but how precisely the gap is named.',
      },
      'literature-review': {
        titleZh: '研究缺口怎么写不空：用比较句把“还差哪一步”说出来',
        titleEn:
          'How do you write a research gap without sounding empty? Use comparison sentences to state what step is still missing',
        introZh:
          '很多综述里都会出现“现有研究还存在不足”，但这种写法最容易让读者觉得只是模板。真正有力的缺口，通常是通过比较句自然长出来的。',
        introEn:
          'Many reviews contain a line saying that existing research still has limitations, but this phrasing often feels template-driven. A convincing gap usually grows naturally out of comparison sentences instead.',
        zhihuAngleZh:
          '知乎里关于“研究不足总写得很空怎么办”的讨论，常会提到一个关键点：不要先写结论，再去找理由；要先通过比较把理由写出来，缺口才会显得真实。',
        zhihuAngleEn:
          'Zhihu discussions on empty-sounding limitation statements often stress one key point: do not write the conclusion first and search for reasons later; let the reasons emerge through comparison so the gap feels real.',
        strategyZh:
          '更稳的综述写法，是先比较不同研究做到了什么、没做到什么、为什么没做到，然后再把你的 gap sentence 写出来。这样缺口就不是凭空宣布，而是从比较里被推出来。',
        strategyEn:
          'A steadier review practice is to compare what different studies achieved, what they did not achieve, and why they did not, before writing the gap sentence. Then the gap is not declared out of nowhere but pushed out of the comparison itself.',
        stepsZh: [
          '先写两三句真正的比较句。',
          '再从这些比较中归纳还差的一步。',
          '最后把 gap sentence 缩成一句能放进引言里的话。',
        ],
        stepsEn: [
          'Write two or three real comparison sentences first.',
          'Extract the still-missing step from those comparisons.',
          'Compress the gap sentence into one line that can live inside the introduction later.',
        ],
        submissionZh:
          '如果以后要投稿，这种通过比较长出来的缺口会更有说服力，因为编辑和审稿人能看到你不是在硬说“前人都不够”。',
        submissionEn:
          'If submission is ahead, a gap that grows out of comparison is more persuasive because editors and reviewers can see that you are not simply forcing the claim that prior work was insufficient.',
        riskZh:
          '如果综述里的缺口只是模板句，最常见的后果就是引言和综述都很热闹，真正的新意却一直悬空。',
        riskEn:
          'If the review relies on template gap statements, the common result is a lively introduction and review with novelty still hanging in the air.',
        checklistZh: [
          '1. 是否已经写出真正的比较句。',
          '2. 缺口是否是从比较里归纳出来的。',
          '3. 最后的 gap sentence 是否足够短而有力。',
        ],
        checklistEn: [
          '1. Have real comparison sentences already been written?',
          '2. Was the gap derived from those comparisons?',
          '3. Is the final gap sentence short and strong enough?',
        ],
        deliverableZh:
          '这一轮之后，你应该拿到一套可复用的比较句和一句更真实的 gap sentence。',
        deliverableEn:
          'After this round, you should have a reusable set of comparison sentences and a more credible gap sentence.',
        closeZh:
          '缺口写得稳，往往不是因为你说得更大，而是因为比较句终于写出来了。',
        closeEn:
          'A gap usually becomes steady not because it sounds larger but because the comparison sentences were finally written clearly.',
      },
      'methods-analysis': {
        titleZh: '分析结果出来后，怎么回扣最初那个研究缺口',
        titleEn:
          'Once the analysis is done, how do you return to the original research gap',
        introZh:
          '很多论文在分析阶段会出现一个常见问题：结果写出来了，但和前面铺过的研究缺口没有重新接上，导致前文和后文像两套系统。',
        introEn:
          'A common problem in the analysis stage is that the results are finally written, but they never reconnect to the research gap laid out in the earlier sections, leaving the front and back of the paper feeling like separate systems.',
        zhihuAngleZh:
          '知乎里关于“为什么结果写完还是像没闭环”的讨论，经常会提到一点：分析结束后没有主动回扣前面的 gap sentence。',
        zhihuAngleEn:
          'Zhihu discussions on why the paper still feels open-ended after the analysis often point to one issue: the writer never actively returns to the earlier gap sentence after the findings appear.',
        strategyZh:
          '更稳的分析收法，是在关键结果段之后加一句回扣：这组结果到底补了前人哪一块、修正了哪一块，还是暴露了原来缺口判断需要重写。只要这一步不做，闭环感很难出来。',
        strategyEn:
          'A steadier way to close the analysis is to add one return sentence after the key result sections: which part of prior work this finding fills, revises, or reveals must be rewritten. Without that move, closure is hard to achieve.',
        stepsZh: [
          '先把最初的 gap sentence 再拿出来。',
          '再判断这组结果是填补、修正还是动摇了它。',
          '最后用一两句明确把结果和缺口重新接上。',
        ],
        stepsEn: [
          'Bring the original gap sentence back into view first.',
          'Decide whether the findings fill it, revise it, or destabilize it.',
          'Reconnect the findings to that gap in one or two explicit sentences.',
        ],
        submissionZh:
          '如果以后要投稿，这一步会非常影响读者是否觉得稿件闭环。很多看起来“结果不少”的稿件，其实只是没有把结果重新拉回到最初的问题上。',
        submissionEn:
          'If the manuscript may later be submitted, this step strongly shapes whether readers experience the paper as closed and coherent. Many drafts that seem full of results are simply failing to pull those results back to the initial question.',
        riskZh:
          '如果结果不回扣缺口，最常见的后果就是综述和分析各自成立，但整篇论文还是显得没有闭环。',
        riskEn:
          'If the findings never return to the gap, the review and the analysis may each stand alone while the whole paper still feels unclosed.',
        checklistZh: [
          '1. 最初的 gap sentence 是否已重新拿出来核对。',
          '2. 是否判断清楚结果对缺口的关系。',
          '3. 是否已写出明确回扣句。',
        ],
        checklistEn: [
          '1. Has the original gap sentence been brought back for comparison?',
          '2. Is the relationship between the findings and that gap clearly judged?',
          '3. Has an explicit return sentence been written?',
        ],
        deliverableZh:
          '这一轮之后，你应该拿到一版真正能让前文和后文接上的分析收束句。',
        deliverableEn:
          'After this round, you should have an analytical closing sentence that genuinely reconnects the front and back of the paper.',
        closeZh:
          '结果真正让论文闭环的时候，不是它们写出来了，而是它们重新回到了最初那个缺口上。',
        closeEn:
          'Results truly close a paper not when they merely appear but when they return to the original gap that launched the study.',
      },
      'revision-defense': {
        titleZh: '导师说研究缺口不成立时，怎么改而不是整段推翻',
        titleEn:
          'How do you revise when the advisor says the research gap does not hold, without demolishing the whole section',
        introZh:
          '很多人一听到“这个缺口不成立”，就会想把整段综述推翻重写。但真正更有效的做法，往往是先判断到底是比较句不够、对象不对，还是 gap sentence 写得过满。',
        introEn:
          'When writers hear that the research gap does not hold, many immediately want to rewrite the whole review section from scratch. Yet the more effective move is often to decide whether the problem lies in weak comparison sentences, a mismatched object, or a gap sentence that claimed too much.',
        zhihuAngleZh:
          '知乎里关于“研究缺口被导师质疑怎么办”的经验，经常会提醒：先修支撑逻辑，再决定要不要推翻结论，不要一上来就大面积返工。',
        zhihuAngleEn:
          'Zhihu advice on handling criticism of the research gap often reminds writers to repair the support logic first and decide later whether the conclusion itself must change, rather than beginning with total rework.',
        strategyZh:
          '更稳的返修思路，是把 gap sentence 拆回三部分：前人做到哪里、还差什么、你为什么能补。先看哪一段最弱，再只补那一段，而不是整段全砍。',
        strategyEn:
          'A steadier revision path is to split the gap sentence back into its three parts: how far prior work has gone, what remains missing, and why your project can fill it. Check which part is weakest and strengthen only that part instead of deleting the whole section.',
        stepsZh: [
          '先把原来的 gap sentence 拆回三段逻辑。',
          '再定位最薄弱的是哪一段。',
          '最后只补比较句、改对象或收缩表达，而不是全段重写。',
        ],
        stepsEn: [
          'Split the original gap sentence back into its three logical parts first.',
          'Locate which part is weakest.',
          'Then strengthen the comparison, adjust the object, or shrink the claim rather than rewriting the whole section.',
        ],
        submissionZh:
          '如果后面还要投稿，这种拆解式返修很有用，因为编辑和审稿人质疑“gap 不成立”时，你也需要知道到底该修哪一层。',
        submissionEn:
          'If submission still lies ahead, this decomposed revision style is very useful because when editors or reviewers challenge the gap, you also need to know exactly which layer must be repaired.',
        riskZh:
          '如果一被质疑就整段推翻，最容易把本来还成立的比较和定位也一起拆掉，返工成本会非常高。',
        riskEn:
          'If the whole section is demolished at the first challenge, the comparison work and positioning that were still valid often get destroyed too, which makes the revision cost much higher.',
        checklistZh: [
          '1. gap sentence 是否已拆回三段逻辑。',
          '2. 最薄弱的一段是否已定位出来。',
          '3. 返修是否只针对薄弱层而不是全盘推翻。',
        ],
        checklistEn: [
          '1. Has the gap sentence been decomposed into three parts again?',
          '2. Is the weakest part already identified?',
          '3. Does the revision target that weak layer rather than rewriting everything?',
        ],
        deliverableZh:
          '这一轮之后，你应该拿到一版被重新校准过的 gap sentence，而不是一段被彻底推倒的旧稿。',
        deliverableEn:
          'After this round, you should have a recalibrated gap sentence instead of a discarded old section with nothing stable left.',
        closeZh:
          '研究缺口被质疑时，最重要的不是推翻自己，而是看清到底是哪一层还没站稳。',
        closeEn:
          'When a research gap is challenged, the most important move is not to overturn yourself but to see clearly which layer has not yet stood firmly.',
      },
    },
  },
  {
    slug: 'paper-structure',
    topicSlug: 'results-discussion-boundary',
    categorySlug: 'structure-abstract-writing',
    labelZh: '摘要引言与结构写作',
    labelEn: 'Structure Writing',
    readerZh: '论文写作者',
    readerEn: 'thesis and paper writers',
    focusZh: '结果、讨论、结论的边界和前后衔接',
    focusEn: 'the boundaries among results, discussion, and conclusion',
    evidenceZh: '结果句、解释句、结论句和章节过渡',
    evidenceEn: 'result lines, interpretation lines, conclusion lines, and section transitions',
    standardZh: '重点不是让每部分都写得很多，而是让不同部分别再重复做同一件事。',
    standardEn:
      'The goal is not to make every section longer but to stop different sections from performing the same job repeatedly.',
    articles: {
      proposal: {
        titleZh: '开写前先分清结果、讨论、结论各自做什么',
        titleEn:
          'Before drafting, separate clearly what the results, discussion, and conclusion each need to do',
        introZh:
          '很多论文到了后期才发现结果、讨论和结论几乎写成三遍同样的话。这个问题往往不是后期才出现，而是前期就没有把三者任务分清。',
        introEn:
          'Many papers realize only late that the results, discussion, and conclusion have become three repetitions of almost the same language. The problem usually starts earlier, when the jobs of those sections were never separated in advance.',
        zhihuAngleZh:
          '知乎里关于“结果和讨论到底怎么分”的提问非常多，背后暴露的是一个共同问题：很多人从一开始就没有给这三部分设不同任务。',
        zhihuAngleEn:
          'Zhihu contains many questions about separating results and discussion, and behind them sits one shared problem: many writers never assigned different jobs to these three sections in the first place.',
        strategyZh:
          '更稳的前期规划，是先写三句任务定义：结果负责呈现看到什么，讨论负责解释这意味着什么，结论负责收束整篇论文最终站住了什么。只要三句任务定义先写好，后面重复会大幅减少。',
        strategyEn:
          'A steadier early plan is to write three task definitions first: results show what was found, discussion explains what those findings mean, and conclusion states what the whole paper finally establishes. Once these task sentences exist, repetition later drops sharply.',
        stepsZh: [
          '先给结果、讨论、结论各写一句任务句。',
          '再检查三句里是否有职责重叠。',
          '最后让目录和段落安排围绕这三句分工。',
        ],
        stepsEn: [
          'Write one task sentence for the results, discussion, and conclusion respectively.',
          'Check whether any of those sentences overlap in function.',
          'Let the outline and paragraph arrangement follow that division of labor.',
        ],
        submissionZh:
          '如果以后会投稿，这种分工越早明确越有帮助，因为很多编辑和审稿人的第一印象问题，其实都来自结果、讨论和结论边界混乱。',
        submissionEn:
          'If submission may come later, the earlier this division is clarified the better, because many first-impression problems for editors and reviewers come from blurred boundaries among results, discussion, and conclusion.',
        riskZh:
          '如果前期不做这一步，最常见的后果就是分析越来越长，结论越来越空，讨论又像第二遍结果。',
        riskEn:
          'If this step is skipped early, the common result is an ever-longer analysis, an increasingly empty conclusion, and a discussion that reads like a second version of the results.',
        checklistZh: [
          '1. 三部分是否已有独立任务句。',
          '2. 任务之间是否没有明显重叠。',
          '3. 目录安排是否已经跟着分工走。',
        ],
        checklistEn: [
          '1. Do the three sections already have separate task sentences?',
          '2. Are the tasks no longer visibly overlapping?',
          '3. Does the outline arrangement already follow that division?',
        ],
        deliverableZh:
          '这一轮之后，你应该拿到一版更清楚的章节分工说明，而不是靠后期补救重复。',
        deliverableEn:
          'After this round, you should have a much clearer section-division plan instead of relying on late-stage repair of repetition.',
        closeZh:
          '结果、讨论、结论一旦任务先分清，后面的结构压力会轻很多。',
        closeEn:
          'Once the tasks of results, discussion, and conclusion are separated early, the later structural pressure becomes much lighter.',
      },
      'literature-review': {
        titleZh: '引言别把讨论提前写完：先给“解释”留到后面',
        titleEn:
          'Do not finish the discussion inside the introduction: leave explanation for later on purpose',
        introZh:
          '很多引言会在前几段就把作者想说的话都解释完，到了真正讨论时只能换种措辞再说一遍，结果全文看起来既重复又失去推进感。',
        introEn:
          'Many introductions explain almost everything the writer wants to say in the opening paragraphs, leaving the later discussion to repeat the same ideas in a different tone. The whole paper then feels repetitive and loses momentum.',
        zhihuAngleZh:
          '知乎里关于“引言为什么总写得太满”的经验，经常会提醒一个问题：不是信息太多，而是解释来得太早。',
        zhihuAngleEn:
          'Zhihu advice on overfilled introductions often returns to one problem: the issue is not too much information but explanation arriving too early.',
        strategyZh:
          '更稳的引言写法，是只把问题立起来，把争议和切口交代清楚，先不要急着把全部解释讲完。讨论真正值钱，是因为它能在结果出来之后再接着推进解释。',
        strategyEn:
          'A steadier introduction establishes the problem, the dispute, and the entry point without rushing to explain everything at once. Discussion becomes valuable precisely because it advances interpretation after the findings have appeared.',
        stepsZh: [
          '先删掉引言里那些已经像讨论段的解释句。',
          '再保留问题、争议和切口所需的最少信息。',
          '最后让引言在“为什么重要”和“为什么现在要做”处停住。',
        ],
        stepsEn: [
          'Cut the explanation sentences in the introduction that already read like discussion paragraphs.',
          'Keep only the minimum material needed for the problem, the dispute, and the point of entry.',
          'Let the introduction stop at why the issue matters and why it should be studied now.',
        ],
        submissionZh:
          '如果后面要投稿，这种控制很关键，因为编辑通常希望前文快而清楚，而不是一开头就进入过量解释。',
        submissionEn:
          'If the manuscript may later be submitted, this control is crucial because editors usually want the front matter to be fast and clear rather than overloaded with early interpretation.',
        riskZh:
          '如果引言提前做完了讨论的活，后面最常见的后果就是讨论区写不出新东西，只能重复。',
        riskEn:
          'If the introduction finishes the work of the discussion too early, the common result is that the later discussion has nothing new to do except repeat.',
        checklistZh: [
          '1. 引言里的解释句是否已被识别并收回。',
          '2. 问题、争议和切口是否仍然清楚。',
          '3. 是否已经给讨论部分留出真正的任务空间。',
        ],
        checklistEn: [
          '1. Have the explanation-heavy sentences in the introduction been identified and pulled back?',
          '2. Are the problem, dispute, and entry point still clear?',
          '3. Has real task space been preserved for the discussion section?',
        ],
        deliverableZh:
          '这一轮之后，你应该得到一版更轻、更快、又不失方向感的引言。',
        deliverableEn:
          'After this round, you should have an introduction that is lighter, faster, and still directionally clear.',
        closeZh:
          '引言真正写得稳的时候，不是说得更多，而是知道哪些解释要先忍住。',
        closeEn:
          'An introduction becomes steady not by saying more but by knowing which explanations to hold back for later.',
      },
      'methods-analysis': {
        titleZh: '结果和讨论怎么拆：先写发现，再写意义，最后收束边界',
        titleEn:
          'How should results and discussion be separated? State the finding first, then the meaning, and then the boundary',
        introZh:
          '很多分析部分的难点，不是没有结果，而是一个段落里同时出现发现、解释和结论，最后谁都没站稳。',
        introEn:
          'The difficulty in many analysis sections is not a lack of findings but the fact that one paragraph tries to carry the finding, the interpretation, and the conclusion all at once, leaving none of them stable.',
        zhihuAngleZh:
          '知乎里关于“结果和讨论总写在一起”的讨论，最常见的建议就是先拆动作：看到什么、意味着什么、边界在哪，别在同一句里全做完。',
        zhihuAngleEn:
          'In Zhihu discussions on results and discussion collapsing together, the most common advice is to split the moves: what was seen, what it means, and where the boundary lies, rather than doing all three in one sentence.',
        strategyZh:
          '更稳的分析段结构，是发现句、证据句、解释句、边界句。顺序一旦固定，结果和讨论就会自然分开，而不是永远打架。',
        strategyEn:
          'A steadier analytical paragraph follows a sequence of finding sentence, evidence sentence, interpretation sentence, and boundary sentence. Once the order is fixed, results and discussion begin to separate naturally instead of fighting constantly.',
        stepsZh: [
          '先把第一句改成明确发现。',
          '再把证据放到紧跟其后的位置。',
          '最后单独写解释和边界，不让它们挤进发现句里。',
        ],
        stepsEn: [
          'Turn the first sentence into a clear finding.',
          'Place the evidence immediately after it.',
          'Write the interpretation and the boundary separately rather than pushing them into the finding sentence.',
        ],
        submissionZh:
          '如果以后要投稿，这种拆法会非常提升可读性，因为评审更容易先看懂发现，再判断自己是否同意解释。',
        submissionEn:
          'If the work may later be submitted, this separation greatly improves readability because reviewers can understand the finding first and then decide whether they accept the interpretation.',
        riskZh:
          '如果发现、意义和边界一直混在一起，最常见的后果就是分析像在打结，读者抓不住哪一句最重要。',
        riskEn:
          'If finding, meaning, and boundary remain mixed together, the common result is an analysis that feels knotted, with readers unable to tell which sentence matters most.',
        checklistZh: [
          '1. 第一读句是否已经明确是发现句。',
          '2. 证据是否紧跟在发现后面。',
          '3. 解释和边界是否已被单独写出。',
        ],
        checklistEn: [
          '1. Is the opening sentence now clearly a finding sentence?',
          '2. Does the evidence follow that finding closely?',
          '3. Have interpretation and boundary been written separately?',
        ],
        deliverableZh:
          '这一轮之后，你应该拿到一套更稳定的结果/讨论段落模板。',
        deliverableEn:
          'After this round, you should have a far more stable paragraph template for separating results and discussion.',
        closeZh:
          '结果和讨论真正拆开之后，分析会变得更清楚，讨论也会更有力。',
        closeEn:
          'Once results and discussion are truly separated, the analysis becomes clearer and the discussion becomes stronger.',
      },
      'revision-defense': {
        titleZh: '结论别再重复前文：定稿前只保留最终真正站住的那几句',
        titleEn:
          'Do not let the conclusion repeat the whole draft: keep only the sentences that truly stand at the end',
        introZh:
          '很多结论部分写到最后会像一份缩写版全文：前文说过的话再压一遍，看起来很完整，却没有真正收住全篇最值钱的判断。',
        introEn:
          'Many conclusions end up reading like an abbreviated version of the whole paper: everything said earlier is compressed once more, which looks complete while still failing to close on the most valuable judgments of the study.',
        zhihuAngleZh:
          '知乎里关于“结论怎么写不重复”的经验，经常会提醒一个动作：结论不是重新讲一遍过程，而是只留下最后真正站住的判断。',
        zhihuAngleEn:
          'Zhihu advice on writing conclusions without repetition often returns to one move: the conclusion is not a second telling of the process but a place to keep only the judgments that finally stand.',
        strategyZh:
          '更稳的定稿动作，是把结论当成筛选，不是当成缩写。哪些判断已经站住、哪些边界必须保留、哪些启示值得最后留给读者，只保留这些内容即可。',
        strategyEn:
          'A steadier final-stage move is to treat the conclusion as selection rather than summary. Keep only the judgments that now stand, the boundaries that must remain visible, and the implications worth leaving with the reader.',
        stepsZh: [
          '先把结论里的过程性句子划掉。',
          '再筛出真正站住的判断和边界句。',
          '最后让结论只保留最值钱的几句话。',
        ],
        stepsEn: [
          'Cross out the process-heavy sentences in the conclusion first.',
          'Select the judgments and boundary sentences that truly stand.',
          'Let the conclusion keep only the few lines that matter most.',
        ],
        submissionZh:
          '如果后面要答辩或投稿，这种收束会很重要，因为结论往往直接影响别人最后记住的是什么。',
        submissionEn:
          'If defense or submission is next, this tightening matters greatly because the conclusion often determines what others remember last.',
        riskZh:
          '如果结论继续把全篇重复一遍，最常见的后果就是看起来完整，真正的主张却不够突出。',
        riskEn:
          'If the conclusion keeps repeating the whole paper, the common result is a draft that looks complete while the central claim still does not stand out enough.',
        checklistZh: [
          '1. 过程性句子是否已经删掉。',
          '2. 真正站住的判断是否已筛出。',
          '3. 结论是否只保留最关键的几句。',
        ],
        checklistEn: [
          '1. Have the process-heavy sentences been removed?',
          '2. Have the judgments that truly stand been selected?',
          '3. Does the conclusion now keep only the most important lines?',
        ],
        deliverableZh:
          '这一轮之后，你应该拿到一版不再泛泛重复、而是更像真正收束的结论。',
        deliverableEn:
          'After this round, you should have a conclusion that no longer repeats broadly and instead feels like a real closing move.',
        closeZh:
          '结论真正有力的时候，不是说得更多，而是终于只剩最该留下的那几句。',
        closeEn:
          'A conclusion becomes truly strong not by saying more but by finally keeping only the few lines that deserve to remain.',
      },
    },
  },
  {
    slug: 'methods-data',
    topicSlug: 'figure-storytelling',
    categorySlug: 'methods-data-presentation',
    labelZh: '方法设计与结果表达',
    labelEn: 'Methods and Data',
    readerZh: '论文写作者',
    readerEn: 'thesis and paper writers',
    focusZh: '图表叙事、可视化顺序和图注说明',
    focusEn: 'figure storytelling, visualization order, and caption writing',
    evidenceZh: '图表草稿、表格顺序、图注和结果主线',
    evidenceEn: 'figure drafts, table order, captions, and the main result line',
    standardZh: '重点不是做更多图，而是让每张图都知道自己为什么在这里。',
    standardEn:
      'The goal is not to produce more visuals but to make each one know why it appears where it does.',
    articles: {
      proposal: {
        titleZh: '图表不是最后才想：开题时就先画一版结果路线图',
        titleEn:
          'Do not leave visuals until the end: sketch a result route map already at the proposal stage',
        introZh:
          '很多人把图表完全当成后期包装，等结果出来才临时决定用什么图、什么表。这样做当然快，但也容易让结果表达一直缺少方向感。',
        introEn:
          'Many writers treat figures and tables as late-stage packaging and decide only after the results arrive what kind of visuals to use. That can feel efficient, but it also leaves the presentation of results without clear direction.',
        zhihuAngleZh:
          '知乎里关于“图表怎么准备”的讨论，经常会提到一个容易被忽略的动作：即使前期没有结果，也可以先画一版你希望读者未来怎么读结果的路线图。',
        zhihuAngleEn:
          'Zhihu discussions on preparing figures often mention one overlooked move: even before the results exist, you can sketch how you want readers to travel through them later.',
        strategyZh:
          '更稳的前期设计，是先画一版结果路线图：哪类发现可能需要图、哪类更适合表、顺序大概怎么排。这样后面结果一出来，表达就不会从零开始。',
        strategyEn:
          'A steadier early design is to sketch a result route map: which kinds of findings will likely need figures, which are better suited to tables, and what the rough order may be. Then when the results arrive, the presentation no longer starts from zero.',
        stepsZh: [
          '先列出你最可能想呈现的几类结果。',
          '再为每类结果初步判断更适合图还是表。',
          '最后画一版读者未来浏览这些结果的顺序草图。',
        ],
        stepsEn: [
          'List the main kinds of results you are most likely to present.',
          'Make a first judgment on whether each result type is better shown as a figure or a table.',
          'Sketch the order in which future readers will move through those results.',
        ],
        submissionZh:
          '如果以后要投稿，这种结果路线图会很有帮助，因为很多稿件的图表问题并不是美观，而是顺序和叙事完全后补。',
        submissionEn:
          'If submission may come later, this result route map is very useful because many figure problems in manuscripts are not aesthetic but narrative and sequencing problems that were patched in too late.',
        riskZh:
          '如果图表思路完全留到最后，最常见的后果就是结果已经有了，但图表叙事还没开始，后期压力会非常大。',
        riskEn:
          'If all visual planning is postponed to the end, the common result is that the findings exist while the visual narrative has not yet begun, which creates heavy late-stage pressure.',
        checklistZh: [
          '1. 最可能的结果类型是否已列出。',
          '2. 每类结果是否已初步判断图/表形式。',
          '3. 是否已画出浏览顺序草图。',
        ],
        checklistEn: [
          '1. Have the likely result types been listed?',
          '2. Has each type received an initial figure/table judgment?',
          '3. Has a reading-order sketch already been made?',
        ],
        deliverableZh:
          '这一轮之后，你应该拿到一版结果路线图，而不是把图表留成后期纯包装任务。',
        deliverableEn:
          'After this round, you should have a result route map rather than leaving visuals as pure late-stage packaging work.',
        closeZh:
          '图表越早被纳入思考，结果表达就越不容易在最后一刻失控。',
        closeEn:
          'The earlier visuals enter the thinking process, the less likely the presentation of results is to lose control at the last moment.',
      },
      'literature-review': {
        titleZh: '看文献时顺手记图表套路：别等做图时才从零模仿',
        titleEn:
          'Capture figure patterns while reading literature: do not imitate from scratch only when visualizing later',
        introZh:
          '很多人做图表时才开始大量翻文献，看别人怎么画。这种临时模仿当然常见，但也容易只学到外观，没学到图表真正承担的叙事任务。',
        introEn:
          'Many writers begin browsing the literature intensively for visual ideas only when it is finally time to make figures and tables. That emergency imitation is common, but it often copies appearance without learning the narrative role those visuals actually serve.',
        zhihuAngleZh:
          '知乎里关于“图表不会做怎么办”的讨论，经常会提到一个很实用的习惯：读文献时就顺手记下图表是怎么讲故事的，而不是只看排版好不好看。',
        zhihuAngleEn:
          'Zhihu discussions on not knowing how to build figures often recommend one very practical habit: while reading papers, record how the visuals tell the story rather than judging only whether the layout looks nice.',
        strategyZh:
          '更高效的阅读法，是在笔记里加一栏“图表承担了什么任务”。只要你知道某张图是在展示趋势、比较差异还是支撑关键结论，后面做自己的图时就不会只剩模仿样式。',
        strategyEn:
          'A more efficient reading practice is to add one note column: what job does this visual perform? Once you know whether a figure is showing a trend, comparing differences, or carrying a key conclusion, your own later visuals stop being mere style imitation.',
        stepsZh: [
          '先在阅读笔记里增加一列图表任务。',
          '再为典型图表标注它在叙事中负责什么。',
          '最后整理出几种可复用的视觉任务类型。',
        ],
        stepsEn: [
          'Add one figure-role column to the reading notes.',
          'Label what each representative visual is doing inside the narrative.',
          'Organize the recurring visual roles into a small reusable set.',
        ],
        submissionZh:
          '如果以后要投稿，这种图表任务库很有帮助，因为它让你做图时更关注“这张图要完成什么”，而不是只关注形式。',
        submissionEn:
          'If submission is a later goal, this visual-role library is highly useful because it makes figure design focus on what the visual must accomplish rather than on format alone.',
        riskZh:
          '如果只在做图时临时模仿，最常见的后果就是图很像，叙事却和自己的论文不匹配。',
        riskEn:
          'If visual imitation happens only at the moment of creation, the common result is figures that look similar to published ones while failing to match the narrative of your own paper.',
        checklistZh: [
          '1. 阅读笔记里是否已有图表任务这一列。',
          '2. 是否已经标注典型图表承担的叙事功能。',
          '3. 是否整理出可复用的视觉任务类型。',
        ],
        checklistEn: [
          '1. Does the reading note now contain a figure-role column?',
          '2. Have the narrative functions of representative visuals been labeled?',
          '3. Has a reusable set of visual task types been organized?',
        ],
        deliverableZh:
          '这一轮之后，你应该拿到一套图表任务库，而不是只有零散的视觉印象。',
        deliverableEn:
          'After this round, you should have a visual-role library rather than only scattered visual impressions.',
        closeZh:
          '图表真正能借鉴的时候，不是外观像，而是你知道它在替论文完成什么任务。',
        closeEn:
          'A visual becomes truly borrowable not when it looks similar but when you know what task it is performing for the paper.',
      },
      'methods-analysis': {
        titleZh: '这张结果该做成图还是表：先看它要让读者一眼看到什么',
        titleEn:
          'Should this result become a figure or a table? Decide by what the reader needs to see at a glance',
        introZh:
          '很多图表选择困难，并不在于软件不会用，而在于作者没有先判断这组结果最想让读者“立刻看到”的是什么。',
        introEn:
          'Many figure-versus-table dilemmas are not caused by a lack of software skill but by the absence of a prior decision on what the reader needs to see immediately in that result set.',
        zhihuAngleZh:
          '知乎里关于“图和表怎么选”的讨论，最常见的提醒就是别先问哪种更高级，而要先问你想让读者一眼抓住趋势、比较还是精确信息。',
        zhihuAngleEn:
          'Zhihu discussions on choosing between a figure and a table repeatedly stress that the first question is not which format looks more advanced but whether the reader must catch a trend, a comparison, or precise values at a glance.',
        strategyZh:
          '更稳的选择逻辑，是把结果先分成三类：要看趋势、要看比较、要看精确值。趋势更适合图，比对也常适合图，精确值往往更适合表。只要任务先分清，选择就不会一直犹豫。',
        strategyEn:
          'A steadier selection logic is to divide results into three needs first: seeing a trend, seeing a comparison, or seeing precise values. Trends often fit figures, comparisons often also fit figures, and precise values usually belong in tables. Once the task is clear, the choice stops wavering.',
        stepsZh: [
          '先判断这组结果最想让读者一眼看到什么。',
          '再把任务归到趋势、比较或精确值之一。',
          '最后据此决定图表形式，并写一句理由。',
        ],
        stepsEn: [
          'Decide what the reader most needs to see at a glance in this result set.',
          'Classify that need as trend, comparison, or precise value.',
          'Choose the format accordingly and write one sentence explaining why.',
        ],
        submissionZh:
          '如果以后要投稿，这种判断会很值钱，因为很多“图表太多”或“表格过重”的意见，根本原因都是格式没有和阅读任务对齐。',
        submissionEn:
          'If submission may come later, this judgment is very valuable because many comments that figures are excessive or tables are too heavy stem from a mismatch between format and reading task.',
        riskZh:
          '如果图表形式只是凭习惯选，最常见的后果就是读者花了很多时间，还是没能一眼抓住你最想强调的东西。',
        riskEn:
          'If the figure/table choice is made only by habit, the common result is that readers spend a long time looking without immediately seeing what you wanted to emphasize most.',
        checklistZh: [
          '1. 这组结果的一眼任务是否已判断清楚。',
          '2. 是否已归类为趋势、比较或精确值。',
          '3. 图/表形式是否有明确理由支持。',
        ],
        checklistEn: [
          '1. Has the at-a-glance task of the result set been judged clearly?',
          '2. Has it been classified as trend, comparison, or precise value?',
          '3. Is the figure/table choice supported by an explicit reason?',
        ],
        deliverableZh:
          '这一轮之后，你应该得到一套更稳定的图表选择规则，而不是靠习惯临场决定。',
        deliverableEn:
          'After this round, you should have a more stable rule set for choosing between figures and tables instead of deciding by habit in the moment.',
        closeZh:
          '图表选得对，读者会先看到你最重要的发现；选错了，再好的结果也容易被埋掉。',
        closeEn:
          'When the figure/table choice is right, readers see the key finding first; when it is wrong, even strong results are easily buried.',
      },
      'revision-defense': {
        titleZh: '图注和表注怎么改得能答辩也能投稿',
        titleEn:
          'How should figure and table captions be revised so they work for both defense and submission',
        introZh:
          '很多图表本身没太大问题，真正让答辩和投稿阶段变吃力的，反而是图注和表注太弱。读者知道有结果，却不知道该怎么看、该信什么。',
        introEn:
          'Many visuals themselves are not the main problem. What often makes both defense and submission harder are captions that remain too weak. Readers know there is a result but do not know how to read it or what to trust in it.',
        zhihuAngleZh:
          '知乎里关于“图表被说看不懂怎么办”的经验，常会提醒一个细节：很多时候不是图坏，而是图注没有承担解释任务。',
        zhihuAngleEn:
          'Zhihu advice on figures being called unclear often points to one detail: the figure may not be bad; the caption simply failed to perform its explanatory job.',
        strategyZh:
          '更稳的返修方式，是把图注和表注分成三层：这张图表展示什么、关键看点在哪里、读者阅读时要注意什么边界。这样图注就不再只是名字，而是阅读说明。',
        strategyEn:
          'A steadier revision method divides figure and table captions into three layers: what this visual shows, where the key reading point lies, and what boundary the reader should keep in mind. Then the caption stops being a label and becomes reading guidance.',
        stepsZh: [
          '先检查当前图注是否只剩标题式命名。',
          '再补上关键看点和阅读提示。',
          '最后加一句必要的边界说明，避免过度解读。',
        ],
        stepsEn: [
          'Check first whether the current caption is doing nothing beyond naming the visual.',
          'Add the key reading point and a reading cue.',
          'Finish with a necessary boundary note to prevent over-reading.',
        ],
        submissionZh:
          '如果后面要投稿，这种图注升级很重要，因为编辑和审稿人经常通过图表和图注判断稿件是否已经足够清楚成熟。',
        submissionEn:
          'If the work may later be submitted, this caption upgrade matters a great deal because editors and reviewers often judge the clarity and maturity of a manuscript through the visuals and their captions.',
        riskZh:
          '如果图注一直只是命名，最常见的后果就是图表明明有信息，读者却不知道该往哪里看。',
        riskEn:
          'If captions remain names only, the common result is that the visuals contain information while readers still do not know where to look.',
        checklistZh: [
          '1. 图注是否已不再只是命名。',
          '2. 关键看点和阅读提示是否已补上。',
          '3. 必要的边界说明是否已加入。',
        ],
        checklistEn: [
          '1. Has the caption moved beyond simple naming?',
          '2. Have the key reading point and cue been added?',
          '3. Has a necessary boundary note been included?',
        ],
        deliverableZh:
          '这一轮之后，你应该得到一批更能支撑答辩和投稿的图注表注，而不是只有形式完整。',
        deliverableEn:
          'After this round, you should have captions that can better support both defense and submission rather than visuals that are only formally complete.',
        closeZh:
          '图表真正变清楚的时候，不只是图画得更好，而是图注终于开始替读者导航。',
        closeEn:
          'A visual becomes truly clearer not only when it is drawn better but when the caption finally begins guiding the reader through it.',
      },
    },
  },
  {
    slug: 'submission-workflow',
    topicSlug: 'desk-reject-resubmission',
    categorySlug: 'submission-defense-workflow',
    labelZh: '返修投稿与答辩',
    labelEn: 'Revision and Submission',
    readerZh: '论文写作者',
    readerEn: 'thesis and paper writers',
    focusZh: 'desk reject、首轮判断和重投路线',
    focusEn: 'desk rejection, first-round judgment, and resubmission routes',
    evidenceZh: '编辑信、摘要首屏、期刊匹配和重投策略说明',
    evidenceEn: 'editor letters, first-screen abstract lines, journal fit, and resubmission strategy notes',
    standardZh: '重点不是把所有拒稿都当成失败，而是判断第一轮到底在哪个地方失分。',
    standardEn:
      'The goal is not to treat every rejection as failure but to decide where the first round actually lost points.',
    articles: {
      proposal: {
        titleZh: '如果以后怕 desk reject，开题时就别把首屏写成背景堆积',
        titleEn:
          'If you want to reduce later desk-reject risk, do not let the first screen become a pile of background during the proposal stage',
        introZh:
          '很多稿件的 desk reject 并不是因为研究完全不成立，而是前两屏看不到对象、贡献和读者入口。这个问题其实在开题阶段就能提前暴露出来。',
        introEn:
          'Many desk rejections do not happen because the study fails entirely but because the first two screens do not show the object, the contribution, or the reader entry clearly enough. That problem can often be exposed as early as the proposal stage.',
        zhihuAngleZh:
          '知乎里关于“为什么总被 desk reject”的讨论，经常会提到一个非常基础的原因：前面铺背景太多，真正有用的信息出场太晚。',
        zhihuAngleEn:
          'Zhihu discussions on repeated desk rejection often point to one very basic reason: too much background arrives too early and the useful information enters too late.',
        strategyZh:
          '更稳的前期训练，是把题目、迷你摘要和引言首段当成同一个“首屏组件”来写：对象是谁、问题是什么、你准备补哪一步，越快出现越好。',
        strategyEn:
          'A steadier early practice is to treat the title, mini abstract, and opening paragraph of the introduction as one shared first-screen component: who the object is, what the question is, and which step you plan to add should appear as early as possible.',
        stepsZh: [
          '先检查首段里有没有对象、问题和贡献三项。',
          '再删掉会把这三项往后推的背景句。',
          '最后让首屏信息优先于铺陈信息。',
        ],
        stepsEn: [
          'Check whether the opening already contains the object, the question, and the contribution.',
          'Remove background sentences that push those three items later.',
          'Let first-screen information come before scene-setting information.',
        ],
        submissionZh:
          '如果以后真要投稿，这一步会直接减少首轮误伤，因为编辑在最短时间里就能看到这篇稿件到底属于什么问题和什么读者。',
        submissionEn:
          'If the manuscript later goes out for submission, this step directly reduces first-round losses because the editor can quickly see what problem and reader the paper belongs to.',
        riskZh:
          '如果首屏一直是背景堆积，最常见的后果就是真正有价值的内容还没出场，编辑已经失去兴趣。',
        riskEn:
          'If the first screen remains a background pile, the common result is that the valuable content has not yet appeared before the editor has already lost interest.',
        checklistZh: [
          '1. 首屏是否已出现对象、问题和贡献。',
          '2. 背景句是否已被压缩。',
          '3. 重要信息是否足够早出现。',
        ],
        checklistEn: [
          '1. Do the first lines already show the object, the question, and the contribution?',
          '2. Have background sentences been compressed?',
          '3. Is the important information appearing early enough?',
        ],
        deliverableZh:
          '这一轮之后，你应该拿到一版更像“首轮可读”的题目、摘要和引言开头。',
        deliverableEn:
          'After this round, you should have a title, abstract, and opening paragraph that feel much more first-round readable.',
        closeZh:
          '越早练首屏表达，后面越不容易在最短的一轮里被误伤。',
        closeEn:
          'The earlier you practice first-screen expression, the less likely the manuscript is to be lost in the shortest round later on.',
      },
      'literature-review': {
        titleZh: '投稿前先做 editor scan：让摘要和引言能扛住 60 秒判断',
        titleEn:
          'Run an editor scan before submission: make the abstract and introduction survive a 60-second judgment',
        introZh:
          '很多人投稿前会检查格式、参考文献和语法，却很少用“编辑只看 60 秒”的标准重新扫一遍摘要和引言。结果该出现的信息还是出得太慢。',
        introEn:
          'Many writers check formatting, references, and grammar before submission, yet rarely rescan the abstract and introduction under the assumption that an editor may look for only sixty seconds. As a result, the right information still arrives too late.',
        zhihuAngleZh:
          '知乎里关于“编辑第一眼看什么”的讨论，常会提醒：不要用作者视角读自己的稿，而要用只给一分钟的外部视角去扫。',
        zhihuAngleEn:
          'Zhihu discussions on what editors notice first often remind writers not to read from an author’s perspective but from the perspective of an outside reader who gives the manuscript only one minute.',
        strategyZh:
          '更稳的投稿前动作，是做一次 editor scan：题目、摘要、引言开头、关键词四处一起看，问自己如果只给一分钟，别人能不能判断这篇稿件值不值得继续读。',
        strategyEn:
          'A steadier pre-submission move is to run an editor scan: read the title, abstract, opening introduction, and keywords together and ask whether someone given only a minute could decide whether the manuscript is worth continuing.',
        stepsZh: [
          '先只读题目、关键词和摘要，不看正文。',
          '再补读引言前两段，判断重要信息是否仍然太晚。',
          '最后把延迟贡献判断的句子继续压缩。',
        ],
        stepsEn: [
          'Read only the title, keywords, and abstract first without touching the body.',
          'Add the first two introduction paragraphs and ask whether the important information is still too delayed.',
          'Compress the sentences that postpone the contribution judgment.',
        ],
        submissionZh:
          '如果这一步做得细，很多可能的 desk reject 风险会在正式投稿前就暴露出来，而不是等编辑替你指出。',
        submissionEn:
          'When this step is done carefully, many potential desk-reject risks are exposed before formal submission instead of being pointed out by the editor later.',
        riskZh:
          '如果投稿前没有 editor scan，最常见的后果就是作者觉得稿件已经很完整，但第一轮判断仍然抓不到重点。',
        riskEn:
          'If no editor scan is performed before submission, the common result is that the author feels the manuscript is complete while the first-round judgment still fails to catch the point.',
        checklistZh: [
          '1. 是否已做过只看首屏的扫描。',
          '2. 引言前两段是否足够快进入问题。',
          '3. 贡献判断是否没有被继续拖后。',
        ],
        checklistEn: [
          '1. Has a first-screen-only scan already been done?',
          '2. Do the first two introduction paragraphs enter the problem quickly enough?',
          '3. Is the contribution judgment no longer delayed too far?',
        ],
        deliverableZh:
          '这一轮之后，你应该拿到一版更扛得住 editor scan 的投稿前文本入口。',
        deliverableEn:
          'After this round, you should have a pre-submission entry package that can survive an editor scan much better.',
        closeZh:
          '投稿前真正要扛住的，不只是排版，而是那一分钟里别人能不能抓住你的价值。',
        closeEn:
          'What the manuscript really needs to survive before submission is not only formatting but that first minute in which someone must grasp its value.',
      },
      'methods-analysis': {
        titleZh: '重投前别只换刊：先做一次 resubmission triage',
        titleEn:
          'Do not just change journals before resubmitting: run a resubmission triage first',
        introZh:
          '很多人被 desk reject 后会第一时间换刊重投，看起来动作很快，但如果没有先分清是范围不合、首屏不够强，还是方法说明太弱，下一轮很容易重复同样的问题。',
        introEn:
          'Many writers respond to a desk rejection by changing journals immediately and resubmitting fast. The motion looks energetic, but without separating scope mismatch, weak first-screen framing, and thin method explanation, the next round often repeats the same problem.',
        zhihuAngleZh:
          '知乎里关于“desk reject 后怎么办”的经验，常会提醒一个动作：先做 triage，而不是直接把稿件扔进下一个系统。',
        zhihuAngleEn:
          'Zhihu advice on what to do after a desk rejection often recommends one move above all: perform a triage before dropping the manuscript straight into the next system.',
        strategyZh:
          '更稳的重投思路，是把 desk reject 先拆成三类原因：期刊 fit、首轮表达、方法与证据说明。只有先知道问题属于哪一类，换刊和改稿的优先级才不会乱。',
        strategyEn:
          'A steadier resubmission logic is to split desk rejection into three possible causes first: journal fit, first-round framing, and method/evidence explanation. Only then do the priorities of changing journals and revising the manuscript stop becoming chaotic.',
        stepsZh: [
          '先从编辑信里提取最可能的拒稿类型。',
          '再决定哪些问题要靠换刊，哪些必须靠改稿。',
          '最后写一页 resubmission note，再开始新一轮操作。',
        ],
        stepsEn: [
          'Extract the most likely rejection type from the editor letter first.',
          'Decide which problems require a different journal and which demand manuscript revision.',
          'Write a one-page resubmission note before beginning the next round.',
        ],
        submissionZh:
          '如果这一步做得好，重投效率会高很多，因为你不会一边换刊一边把原来真正该修的问题继续带着走。',
        submissionEn:
          'If this step is done well, resubmission becomes much more efficient because you stop carrying the real unresolved problem from one journal to the next.',
        riskZh:
          '如果被 desk reject 后只做“换刊动作”，最常见的后果就是第二轮继续卡在同一个地方。',
        riskEn:
          'If a desk rejection triggers only the motion of changing journals, the common result is getting stuck again at the same place in the next round.',
        checklistZh: [
          '1. desk reject 类型是否已判断清楚。',
          '2. 换刊问题和改稿问题是否已分开。',
          '3. 是否已经写出 resubmission note。',
        ],
        checklistEn: [
          '1. Has the desk-rejection type been judged clearly?',
          '2. Have change-journal problems and revise-manuscript problems been separated?',
          '3. Has a resubmission note already been written?',
        ],
        deliverableZh:
          '这一轮之后，你应该得到一版更清楚的重投路线，而不是只是一份准备重新上传的旧稿。',
        deliverableEn:
          'After this round, you should have a much clearer resubmission route rather than only an old draft prepared for re-upload.',
        closeZh:
          '重投真正拉开差距的，不是动作快，而是先把失败类型看准。',
        closeEn:
          'What truly improves resubmission is not speed alone but correctly reading the failure type first.',
      },
      'revision-defense': {
        titleZh: 'desk reject 后怎么判断是改摘要、改引言，还是整稿重排',
        titleEn:
          'After a desk rejection, how do you decide whether to revise the abstract, the introduction, or the whole structure',
        introZh:
          '很多作者在 desk reject 后容易陷入两种极端：要么只换几句摘要，要么整篇稿件推倒重来。真正更有效的判断，往往是先看失分究竟发生在首屏、结构还是证据链。',
        introEn:
          'After a desk rejection, writers often fall into two extremes: changing only a few lines in the abstract or rebuilding the whole manuscript from scratch. The more effective judgment usually begins by locating whether the loss happened on the first screen, in the structure, or in the evidence chain.',
        zhihuAngleZh:
          '知乎里关于“desk reject 后要不要大改”的讨论，经常会提醒：不是所有拒稿都需要整稿重写，关键是看编辑在哪一层失去兴趣。',
        zhihuAngleEn:
          'Zhihu discussions on whether a desk-rejected paper needs a major rewrite often remind writers that not every rejection demands a total reconstruction. The key is locating the layer at which the editor lost interest.',
        strategyZh:
          '更稳的后拒稿判断，是先用三层排查：摘要与标题有没有失手、引言和结构有没有拖慢、方法和证据链有没有让稿件显得不够稳。不同层的问题，对应完全不同的返工强度。',
        strategyEn:
          'A steadier post-rejection judgment works through three layers first: did the abstract and title fail, did the introduction and structure slow the paper down, or did the method and evidence chain make the manuscript feel unstable? Different layers demand very different revision intensity.',
        stepsZh: [
          '先判断问题更像首屏问题、结构问题还是证据问题。',
          '再只对应该层做最小必要的大改。',
          '最后重新检查新版本是否还保留原来已成立的部分。',
        ],
        stepsEn: [
          'Judge first whether the problem is primarily a first-screen issue, a structure issue, or an evidence issue.',
          'Apply the minimum necessary major revision only to that layer.',
          'Then check whether the new version still preserves the parts that already worked.',
        ],
        submissionZh:
          '如果后面要重投，这种层次判断非常有用，因为它能避免“明明只该重写前两页，却把整篇结构一起推翻”的过度返工。',
        submissionEn:
          'If resubmission follows, this layered judgment is extremely useful because it prevents over-revision, such as rewriting the whole structure when the real problem was only in the first two pages.',
        riskZh:
          '如果不分层判断就直接重写，最常见的后果就是返工很多，但真正让编辑失去兴趣的地方还没有被准确击中。',
        riskEn:
          'If rewriting begins without layered diagnosis, the common result is a large amount of revision while the place that actually lost the editor’s interest still remains unaddressed.',
        checklistZh: [
          '1. 问题层级是否已经判断清楚。',
          '2. 返工是否只针对对应层展开。',
          '3. 原来已经成立的部分是否被保住。',
        ],
        checklistEn: [
          '1. Has the problem layer been diagnosed clearly?',
          '2. Is the rework targeted only at that layer?',
          '3. Have the parts that already worked been preserved?',
        ],
        deliverableZh:
          '这一轮之后，你应该拿到一份更精确的 desk reject 后返工策略，而不是情绪化大修。',
        deliverableEn:
          'After this round, you should have a more precise post-desk-rejection revision strategy rather than an emotional full rewrite.',
        closeZh:
          'desk reject 后最值钱的，不是立刻大改，而是先判断该改哪一层。',
        closeEn:
          'The most valuable move after a desk rejection is not immediate major rewriting but deciding first which layer truly needs to change.',
      },
    },
  },
]

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
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}别等写完再选刊：开题就先做一轮期刊匹配`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: test journal fit early instead of waiting until the paper is finished`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}会把“以后投什么期刊”留到论文写完再想，但等到那时才发现${discipline.titleZh}题目太散、结构太重、语言和图表都不符合目标读者的阅读习惯。`,
    introEn: ({ degree, discipline }) =>
      `Many ${degree.readerEn} postpone journal choice until the thesis is finished and only then discover that the ${discipline.titleEn} project is too broad or too thesis-shaped for the target readership.`,
    strategyZh: ({ discipline }) =>
      `更稳的做法，是在开题阶段就挑 3 到 5 本可能相关的期刊，看它们最近发表的研究问题、篇幅风格和证据偏好，再反过来校准你的${discipline.evidenceZh}与题目边界。`,
    strategyEn: ({ discipline }) =>
      `A steadier move is to select three to five plausible journals during the proposal stage, inspect their recent questions, article shape, and evidence preferences, and then use that information to calibrate your ${discipline.evidenceEn} and scope.`,
    stepsZh: () => [
      '先找出和自己题目最接近的几本期刊，快速浏览近两到三年的目录和摘要。',
      '再记录这些期刊更偏爱什么样的问题设定、方法路径和结果表达。',
      '最后把题目和目录改到一个既能完成论文、又保留后续投稿可能性的范围里。',
    ],
    stepsEn: () => [
      'Identify a few journals closest to your topic and scan their tables of contents and abstracts from the last two or three years.',
      'Track the kinds of questions, methods, and result presentations those journals prefer.',
      'Adjust the topic and outline so the project remains thesis-ready while still preserving a route to later submission.',
    ],
    riskZh: () =>
      '如果完全不看目标期刊，最常见的后果不是“投稿晚一点”，而是整篇论文从问题设置到表达方式都更像课程作业，不像面向学术读者的研究。',
    riskEn: () =>
      'If target journals are ignored completely, the usual result is not just a later submission but a thesis that reads like course work rather than research written for a scholarly audience.',
    closeZh: () => '选刊不一定在开题时就定死，但期刊匹配的思路越早进入，后面改文章时越不容易大拆大改。',
    closeEn: () =>
      'You do not need a final journal decision in the proposal, but the earlier journal-fit thinking enters the project, the less drastic the later article revision becomes.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}想把论文改成文章？开题时就要预留一条可投稿主线`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: reserve one submission-ready line early if you hope to publish later`,
    introZh: ({ degree, discipline }) =>
      `不少${degree.readerZh}一开始就希望毕业后把${discipline.titleZh}论文改成文章，但真正写作时还是按“大而全”的论文思路展开，结果到后期很难拆出一个能独立成立的投稿版本。`,
    introEn: ({ degree, discipline }) =>
      `Many ${degree.readerEn} hope to turn a finished ${discipline.titleEn} thesis into an article later, yet still write the whole project in an oversized thesis mode that is hard to convert into a stand-alone submission.`,
    strategyZh: ({ discipline }) =>
      `如果后面有投稿计划，开题时就应该先问自己：整篇论文里哪一个结果、比较或案例最可能独立成立，并能稳定依靠${discipline.evidenceZh}支撑。`,
    strategyEn: ({ discipline }) =>
      `If later publication is part of the plan, the proposal should already ask which one result, comparison, or case line could stand alone and be supported reliably by ${discipline.evidenceEn}.`,
    stepsZh: () => [
      '先在开题里划出一个最适合单独发展的核心问题。',
      '再让目录至少有一章或一节明显围绕这条主线服务，而不是平均分散火力。',
      '最后把可能投稿需要的图表、变量、案例和文献入口提前留出位置。',
    ],
    stepsEn: () => [
      'Mark one central question in the proposal that has the strongest stand-alone potential.',
      'Make sure at least one chapter or section clearly serves that line instead of spreading attention evenly.',
      'Reserve early space for the figures, variables, cases, and literature base that a later submission would need.',
    ],
    riskZh: () =>
      '如果前期没有预留投稿主线，后面改文章时就会发现每一章都重要，但没有哪一章足够集中，删什么都伤筋动骨。',
    riskEn: () =>
      'Without an early publication line, later article conversion often fails because every chapter feels important while none of them is concentrated enough to submit on its own.',
    closeZh: () => '论文和文章当然不是一回事，但开题时先预留一条投稿主线，能显著降低后续二次改写的成本。',
    closeEn: () =>
      'A thesis and an article are not the same form, but reserving one submission line in the proposal can sharply reduce the later cost of rewriting.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}开题前先想清未来读者：你的论文到底写给谁看`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: identify the future reader before the proposal gets too generic`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}写${discipline.titleZh}开题时默认唯一读者就是导师，于是背景铺得很全、概念解释很多，却没有真正想过未来学术读者最在意哪一个判断。`,
    introEn: ({ degree, discipline }) =>
      `Many ${degree.readerEn} assume the advisor is the only reader and therefore produce proposals rich in background and definition but weak in the one judgment a later scholarly reader would care about most.`,
    strategyZh: ({ discipline }) =>
      `更稳的开题不是只问“导师会不会过”，而是顺手再问一遍：如果这项研究以后面对${discipline.titleZh}领域的同行、编辑或审稿人，他们最先会看什么，最先质疑什么。`,
    strategyEn: ({ discipline }) =>
      `A stronger proposal asks not only whether the advisor will approve it but also what a later peer, editor, or reviewer in ${discipline.titleEn} would examine or challenge first.`,
    stepsZh: () => [
      '先写一句“这篇论文最希望说服谁，他们为什么会关心这个问题”。',
      '再把背景和理论部分压到刚好够用，让真正的研究判断更早出现。',
      '最后检查摘要式表述是不是还能同时说服导师和领域读者，而不是只满足课堂汇报口径。',
    ],
    stepsEn: () => [
      'Write one sentence naming the reader you most hope to persuade and why that reader should care.',
      'Compress the background and theory to what is necessary so the actual research judgment appears earlier.',
      'Check whether the framing can persuade both the advisor and field readers instead of sounding like a classroom report only.',
    ],
    riskZh: () =>
      '如果读者定位始终模糊，论文就很容易写成“什么都照顾到一点”，最后却没有一个判断真正打得准。',
    riskEn: () =>
      'If the reader target remains vague, the thesis often tries to satisfy everyone a little and ends up landing no central judgment sharply.',
    closeZh: () => '读者一旦被想清楚，开题里的题目、摘要、目录和研究价值都会更容易收束到同一条线上。',
    closeEn: () =>
      'Once the reader is defined clearly, the title, summary, outline, and value statement are far easier to align around one line.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}别把未来稿件写成类型不明：先判断更像 original article 还是 review`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: decide early whether the project is closer to an original article or a review`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}从开题开始就把${discipline.titleZh}论文写成“什么都想装进去”的大容器，等到后面想投稿时才发现这篇研究到底更像原始研究、综述，还是方法短文，始终没有被想清楚。`,
    introEn: ({ degree, discipline }) =>
      `Many ${degree.readerEn} turn a ${discipline.titleEn} project into a container for everything and only much later realize that the work never clarified whether it is closer to an original study, a review, or a shorter methods-oriented paper.`,
    strategyZh: ({ discipline }) =>
      `更稳的做法，是在开题阶段先判断输出类型：如果核心价值在于新结果和${discipline.evidenceZh}，那就按 original article 的逻辑收束；如果价值更偏整合与比较，就别硬把它写成结果过重的论文。`,
    strategyEn: ({ discipline }) =>
      `A steadier approach is to identify the likely output type during the proposal stage. If the value lies in new results and ${discipline.evidenceEn}, shape the work like an original article. If the value lies more in synthesis and comparison, do not force it into an overbuilt results-heavy paper.`,
    stepsZh: () => [
      '先判断你的核心贡献来自新结果、系统整合，还是方法路径本身。',
      '再比较不同文章类型对结构、证据和篇幅的要求，看看哪一种最贴近你的项目。',
      '最后让目录和研究问题服务这种输出类型，而不是一开始就把所有可能性都混在一起。',
    ],
    stepsEn: () => [
      'Decide whether the core contribution comes from new findings, structured synthesis, or the method path itself.',
      'Compare how different article types handle structure, evidence, and length, then choose the one that fits the project best.',
      'Let the outline and research question serve that output type instead of mixing every possible format together from the start.',
    ],
    riskZh: () =>
      '如果稿件类型始终不清，最容易出现的就是目录越来越长、材料越来越杂，但没有一种读者会觉得这篇文章是为自己写的。',
    riskEn: () =>
      'If the manuscript type remains unclear, the outline grows longer, the materials grow messier, and no reader feels that the paper was really shaped for them.',
    closeZh: () => '越早判断未来稿件更像哪一种，后面越容易把论文收成一个真正能成立的学术产品。',
    closeEn: () =>
      'The earlier you identify the likely manuscript type, the easier it becomes to turn the thesis into an academic product that actually holds together.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}标题和关键词别留到最后：开题就要按可检索性来写`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: make the title and keywords searchable during the proposal stage`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}在${discipline.titleZh}开题时喜欢写“大、稳、好看”的题目，但真正进入数据库检索和后续投稿环节后，才发现标题太虚，关键词也不能准确把论文送到对的读者面前。`,
    introEn: ({ degree, discipline }) =>
      `Many ${degree.readerEn} prefer large and polished titles in a ${discipline.titleEn} proposal, only to discover later that the title is too vague for search visibility and the keywords do not reach the right readers.`,
    strategyZh: ({ discipline }) =>
      `更稳的题目写法，通常会同时照顾三个层面：研究对象、核心问题和场景边界。关键词也不该只是概念堆积，而要能和${discipline.evidenceZh}、方法路径以及潜在期刊读者的检索习惯接起来。`,
    strategyEn: ({ discipline }) =>
      `A steadier title usually balances three layers at once: the research object, the central problem, and the boundary of the setting. Keywords should not be a pile of concepts but should connect to ${discipline.evidenceEn}, the method path, and the search habits of likely journal readers.`,
    stepsZh: () => [
      '先把标题拆成对象词、问题词和边界词，检查有没有哪一层缺位。',
      '再为每一层准备可替换关键词，判断哪些更适合数据库检索和摘要呈现。',
      '最后让题目和关键词一起回扣研究问题，而不是各自说各自的话。',
    ],
    stepsEn: () => [
      'Break the title into an object term, a problem term, and a boundary term, then see which layer is missing.',
      'Prepare alternative keywords for each layer and test which ones work better for databases and abstract framing.',
      'Make the title and keyword set point back to the same research question instead of functioning separately.',
    ],
    riskZh: () =>
      '如果标题和关键词一直停留在“大词”层面，后面最常见的问题就是综述搜不准、摘要写不紧、投稿定位也总是偏。',
    riskEn: () =>
      'If the title and keywords stay at the broad-term level, the common downstream problems are imprecise searching, loose abstracts, and unstable submission positioning.',
    closeZh: () => '题目和关键词越早按可检索性校准，后面的综述、摘要和投稿材料就越容易互相咬合。',
    closeEn: () =>
      'The earlier the title and keyword set are calibrated for searchability, the easier it becomes for the review, abstract, and submission materials to reinforce one another.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}开题就先写一个迷你摘要：用 150 字测试题目是否站得住`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: draft a mini abstract during the proposal to stress-test the topic`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}觉得摘要要等${discipline.titleZh}论文写完才能写，但越是这样，越容易到后面才发现题目、方法和结果链条其实并没有提前讲顺。`,
    introEn: ({ degree, discipline }) =>
      `Many ${degree.readerEn} assume the abstract belongs only at the end of a ${discipline.titleEn} project, but that often delays the moment when they discover the topic, method, and result chain were never clear enough in the first place.`,
    strategyZh: ({ discipline }) =>
      `更稳的做法，是在开题阶段先写一个 120 到 180 字的迷你摘要，强迫自己用最短篇幅讲清问题、方法方向和${discipline.evidenceZh}来源。摘要写不顺，通常说明题目本身还没稳。`,
    strategyEn: ({ discipline }) =>
      `A steadier move is to write a 120- to 180-word mini abstract during the proposal stage, forcing the problem, method direction, and source of ${discipline.evidenceEn} into a short controlled form. If the abstract cannot be written cleanly, the topic itself is usually not stable yet.`,
    stepsZh: () => [
      '先用一句话写出论文到底研究什么，而不是为什么这个领域很重要。',
      '再用一句话说明你准备如何研究，以及主要证据从哪里来。',
      '最后用一句话写出潜在结果或预期贡献，看它是否真的能和前两句接上。',
    ],
    stepsEn: () => [
      'Write one sentence on what the thesis actually studies instead of why the field is important.',
      'Add one sentence on how the study will be conducted and where the main evidence comes from.',
      'Finish with one sentence on the likely result or contribution and test whether it truly connects with the earlier two lines.',
    ],
    riskZh: () =>
      '如果迷你摘要总是写成三段背景介绍，通常不是摘要技巧差，而是研究问题、边界和判断方向根本还没有收稳。',
    riskEn: () =>
      'If the mini abstract keeps turning into three lines of background, the issue is usually not abstract technique but an unstable research question, boundary, and judgment path.',
    closeZh: () => '早写一版摘要，不是为了提前交作业，而是为了尽快发现题目哪里还站不住。',
    closeEn: () =>
      'Writing an early abstract is not about finishing homework in advance. It is about locating where the topic still fails to stand.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}如果以后想投 special issue：开题就别把问题写得太死`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: keep some framing flexibility early if a future special issue might fit`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}会在写${discipline.titleZh}论文时完全按单一题目推进，等后面看到相关 special issue 征稿，才发现自己的问题表述太窄、结构太硬，几乎无法对接新的议题窗口。`,
    introEn: ({ degree, discipline }) =>
      `Many ${degree.readerEn} drive a ${discipline.titleEn} thesis through one fixed framing and only later, when a relevant special-issue call appears, realize that the question has been written too narrowly and too rigidly to adapt.`,
    strategyZh: ({ discipline }) =>
      `更稳的做法，不是把题目写得模糊，而是在开题时保留一点 framing flexibility：核心问题要清楚，但对应用场景、比较角度和${discipline.evidenceZh}呈现方式不要一开始就锁死到只剩一种写法。`,
    strategyEn: ({ discipline }) =>
      `The steadier approach is not vagueness but framing flexibility. The core question should stay clear, while the application scene, comparison angle, and presentation of ${discipline.evidenceEn} should not be frozen so early that only one later framing remains possible.`,
    stepsZh: () => [
      '先把论文的核心判断和可变外层区分开，知道什么不能动、什么还可以调。',
      '再让目录中至少保留一个能根据未来读者或栏目方向重新命名的模块。',
      '最后检查题目和摘要是否既具体，又保留一定的转向空间。',
    ],
    stepsEn: () => [
      'Separate the non-negotiable core judgment from the outer framing elements that can still move later.',
      'Keep at least one module in the outline that could be renamed or reframed for a future audience or issue theme.',
      'Check that the title and abstract remain specific while still preserving some room for later directional adjustment.',
    ],
    riskZh: () =>
      '如果前期把 framing 锁得过死，后面一旦遇到更合适的投稿窗口，调整成本会远高于重写摘要那么简单。',
    riskEn: () =>
      'If the framing is locked too tightly too early, later adaptation to a better submission window becomes far more expensive than merely rewriting the abstract.',
    closeZh: () => '保留一点可转向空间，不会削弱论文，反而能让后续发表路径更灵活。',
    closeEn: () =>
      'Keeping some room for reframing does not weaken the thesis. It often makes later publication paths more flexible.',
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
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}综述可以倒着读：先看目标期刊近三年的引言`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: rebuild the review by reading recent target-journal introductions backwards`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}做${discipline.titleZh}综述时，只会从数据库结果往前堆，却很少反过来看近三年目标期刊是怎样界定问题、铺陈争议和摆出研究空白的。`,
    introEn: ({ degree, discipline }) =>
      `Many ${degree.readerEn} build a ${discipline.titleEn} review only from raw database hits and rarely read backwards from how target journals frame problems, debates, and gaps in recent introductions.`,
    strategyZh: ({ discipline }) =>
      `倒着读的价值在于，它能快速告诉你这个领域现在怎样组织综述、怎样引出贡献，以及${discipline.evidenceZh}通常被放在论证链的什么位置。`,
    strategyEn: ({ discipline }) =>
      `Reading backwards helps you see how the field currently organizes reviews, introduces contribution, and positions ${discipline.evidenceEn} inside the argumentative chain.`,
    stepsZh: () => [
      '先挑几本最相关的期刊，连续读近三年的相关文章引言和文献综述段。',
      '再记录这些文章重复出现的关键词、争议点和研究缺口写法。',
      '最后把自己的综述提纲改成更接近领域真实写法，而不是只按课堂笔记拼装。',
    ],
    stepsEn: () => [
      'Select a few of the most relevant journals and read their introductions and review sections from the last three years in sequence.',
      'Track the recurring terms, debate points, and gap patterns that appear across them.',
      'Adjust your own review outline so it resembles the field’s actual writing logic rather than a classroom note structure.',
    ],
    riskZh: () =>
      '如果综述完全不接领域当下的写法，最大的问题不只是“像学生作业”，而是你可能会错过当前真正被讨论的切口。',
    riskEn: () =>
      'If the review never engages with current field writing patterns, it may not only feel student-like but also miss the entry points that are actively being discussed now.',
    closeZh: () => '读目标期刊的引言，不是为了模仿句子，而是为了校准综述的视角和节奏。',
    closeEn: () =>
      'Reading target-journal introductions is not about copying sentences but about calibrating the angle and rhythm of the review.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}术语总是前后不一？先做双语术语表和缩写表`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: build a bilingual terminology sheet before key terms drift`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}写${discipline.titleZh}综述时，会出现同一个概念来回换说法、中文和英文对应不稳、缩写时有时无的情况，读到后面连自己都容易混乱。`,
    introEn: ({ degree, discipline }) =>
      `Many ${degree.readerEn} let the same ${discipline.titleEn} concept drift across multiple Chinese and English labels, with unstable abbreviations that later confuse even the writer.`,
    strategyZh: ({ discipline }) =>
      `术语表不是格式洁癖，而是综述控制力的一部分。尤其当你同时处理中文文献、英文文献和${discipline.evidenceZh}时，统一术语会直接决定论证是否顺畅。`,
    strategyEn: ({ discipline }) =>
      `A terminology sheet is not a formatting obsession. It is part of controlling the review. When you move across Chinese sources, English sources, and ${discipline.evidenceEn}, stable terminology directly affects argumentative clarity.`,
    stepsZh: () => [
      '先列出题目、摘要和综述里会反复出现的核心术语。',
      '再给每个术语固定中文写法、英文对应、缩写形式和不建议混用的替代表达。',
      '最后在正文里统一替换，并给新出现的概念继续补充到术语表中。',
    ],
    stepsEn: () => [
      'List the core terms that recur in the title, abstract, and literature review.',
      'Fix one Chinese label, one English equivalent, one abbreviation pattern, and the variants you do not want to mix for each term.',
      'Standardize the draft accordingly and keep adding new concepts to the sheet as they appear.',
    ],
    riskZh: () =>
      '术语一旦漂移，最直接的后果就是综述像在谈很多相似问题，却始终没有把同一个问题讲透。',
    riskEn: () =>
      'Once terminology drifts, the review starts sounding like it addresses many similar issues while never fully developing the same issue across the chapter.',
    closeZh: () => '术语先统一，后面的摘要、图表、讨论和投稿材料也会更容易保持一致。',
    closeEn: () =>
      'Once the terminology is stabilized, the abstract, figures, discussion, and later submission materials become much easier to keep consistent.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}想写出亮点，综述里先给 novelty 找坐标`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: locate the novelty in the review before you claim it later`,
    introZh: ({ degree, discipline }) =>
      `不少${degree.readerZh}到结论或投稿阶段才开始硬提“创新点”，但如果综述前面没有先把前人做到哪里、哪里还有断点说清，这种创新声明通常站不稳。`,
    introEn: ({ degree, discipline }) =>
      `Many ${degree.readerEn} try to declare novelty only at the conclusion or submission stage, but that claim rarely stands if the literature review never clarified where earlier work stops.`,
    strategyZh: ({ discipline }) =>
      `亮点不是突然冒出来的句子，而是综述里慢慢建立的坐标系：前人做到了什么、遗漏了什么、你为什么能用${discipline.evidenceZh}往前推进一步。`,
    strategyEn: ({ discipline }) =>
      `A contribution claim is not a sentence that appears suddenly. It is a coordinate system built inside the review: what earlier work achieved, what it left unresolved, and why ${discipline.evidenceEn} lets you move one step further.`,
    stepsZh: () => [
      '先给每个文献主题簇写出“现有工作最强的一点”和“仍然没讲透的一点”。',
      '再把这些断点归并成一到两个真正支撑自己论文的贡献方向。',
      '最后检查摘要、引言和结论里提到的亮点，是否都能在综述中找到依据。',
    ],
    stepsEn: () => [
      'Write one strongest achievement and one unresolved weakness for each literature cluster.',
      'Combine those breaks into one or two contribution directions that genuinely support your thesis.',
      'Check whether every highlight claimed in the abstract, introduction, or conclusion is already grounded in the review.',
    ],
    riskZh: () =>
      '如果综述里没有给 novelty 找到坐标，后面所谓的亮点往往只剩下态度感，很难变成真正的学术判断。',
    riskEn: () =>
      'If the review never locates the novelty, later highlights often shrink into attitude statements instead of academic judgments with real support.',
    closeZh: () => '综述先把贡献坐标搭起来，后面的摘要、封面信和投稿自述都会更有底气。',
    closeEn: () =>
      'When the review builds the coordinates of contribution first, the later abstract, cover letter, and submission positioning become much easier to justify.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}高被引综述怎么借：借框架，不借结论`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: use influential reviews for structure, not as borrowed conclusions`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}读到${discipline.titleZh}领域里那几篇高被引综述后，会下意识地沿用它们的判断，结果自己的综述看上去很完整，真正的研究位置却被前人框死了。`,
    introEn: ({ degree, discipline }) =>
      `Many ${degree.readerEn} read a few highly cited reviews in ${discipline.titleEn} and then inherit not only the structure but also the earlier conclusions, which can leave the new review polished but intellectually boxed in.`,
    strategyZh: ({ discipline }) =>
      `高被引综述最值得借的，不是它替你做好的结论，而是它组织问题、梳理争议和连接${discipline.evidenceZh}的方式。框架可以学，判断必须重做。`,
    strategyEn: ({ discipline }) =>
      `What influential reviews offer most usefully is not a ready-made conclusion but a way of organizing questions, disputes, and links to ${discipline.evidenceEn}. The structure can be learned; the judgment still has to be rebuilt.`,
    stepsZh: () => [
      '先拆出高被引综述的组织方式，看它按什么逻辑分组而不是只看它得出了什么。',
      '再对照近年的研究进展，判断哪些结论已经老化、哪些争议已经移动。',
      '最后只保留对自己综述真正有帮助的结构骨架，把判断句重新写成你的版本。',
    ],
    stepsEn: () => [
      'Separate the organizational logic of the influential review from its conclusions and note how it groups the field.',
      'Compare that map with more recent studies to see which judgments have aged and which disputes have moved.',
      'Keep only the structural skeleton that still helps and rewrite the judgment sentences in your own voice.',
    ],
    riskZh: () =>
      '如果高被引综述被整段照搬，你的文献综述会很像“翻译和复述”，却很难体现当前研究位置和自己的判断力度。',
    riskEn: () =>
      'If the influential review is borrowed too directly, the literature review starts to look like translation and repetition rather than a current map with your own analytical force.',
    closeZh: () => '借综述最好的方式，是让它帮你省掉重搭框架的时间，而不是替你做出判断。',
    closeEn: () =>
      'The best use of a major review is to save time on frame-building, not to outsource your judgment to it.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}参考文献别等定稿再救：综述阶段先做可追溯清单`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: build a traceable citation list during the review instead of fixing references at the end`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}写${discipline.titleZh}综述时，先把文献内容抄进笔记，等到定稿阶段才想起补全页码、DOI、出版信息和引用对应关系，结果后面越修越乱。`,
    introEn: ({ degree, discipline }) =>
      `Many ${degree.readerEn} extract ideas from ${discipline.titleEn} sources first and leave page numbers, DOIs, publication details, and citation matching for the final stage, which later turns cleanup into chaos.`,
    strategyZh: ({ discipline }) =>
      `可追溯清单的核心，不只是方便排版，而是确保每一个判断句背后都能迅速回到原出处。尤其当你横跨${discipline.evidenceZh}和多语种来源时，这种可追溯性会直接影响综述质量。`,
    strategyEn: ({ discipline }) =>
      `The point of a traceable citation list is not only formatting convenience. It ensures that every judgment sentence can quickly return to its original source. When the review spans ${discipline.evidenceEn} and multilingual sources, that traceability directly affects quality.`,
    stepsZh: () => [
      '先给每条文献记录完整的来源信息，而不是只保留标题和作者。',
      '再把每条引用和你准备使用它的段落、判断或图表位置对应起来。',
      '最后定期检查是否存在“笔记里有结论、清单里找不到原文”的断链情况。',
    ],
    stepsEn: () => [
      'Record the full source details for each item instead of saving only the title and author.',
      'Map each reference to the paragraph, judgment, or figure where you expect to use it.',
      'Check regularly for broken links where the note contains a claim but the original source can no longer be traced cleanly.',
    ],
    riskZh: () =>
      '如果引用关系在综述阶段没有先收稳，最后最容易出现的问题不是格式小错，而是关键判断找不到可靠出处。',
    riskEn: () =>
      'If citation control is not stabilized during the review stage, the biggest final problem is often not small formatting errors but key claims with no reliable trace back to the source.',
    closeZh: () => '参考文献越早变成可追溯系统，后面的改稿、投稿和答辩准备就越省力。',
    closeEn: () =>
      'The earlier the references become a traceable system, the easier later revision, submission, and defense preparation become.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}自引怎么用才不显得刻意：综述里先判定是否真的必要`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: use self-citation in the review only when it is genuinely necessary`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}在${discipline.titleZh}综述里一遇到自己或课题组相关工作，就会陷入两个极端：要么完全不敢引用，要么为了证明连续性而把自引堆得过重。`,
    introEn: ({ degree, discipline }) =>
      `Many ${degree.readerEn} swing between two extremes in a ${discipline.titleEn} review when their own earlier work is relevant: they either avoid self-citation entirely or pile it in too heavily to signal continuity.`,
    strategyZh: ({ discipline }) =>
      `更稳的判断标准不是“是不是自己的文章”，而是这条文献在当前问题链里是否真的不可替代，是否能帮助读者理解${discipline.evidenceZh}、方法路径或研究断点，而不是只是在增加存在感。`,
    strategyEn: ({ discipline }) =>
      `The steadier standard is not authorship identity but whether the item is actually irreplaceable in the current problem chain, helping the reader understand ${discipline.evidenceEn}, the method path, or the break in the field rather than merely increasing visibility.`,
    stepsZh: () => [
      '先把自己相关工作和他人同类工作并列，判断它是否真的多提供了一层必要信息。',
      '再检查自引是否改变了综述结构，还是只是重复证明自己做过这个题。',
      '最后让每一次自引都能回答“没有它，这段会少掉什么”。',
    ],
    stepsEn: () => [
      'Place your own relevant work next to comparable external work and test whether it adds a genuinely necessary layer.',
      'Check whether the self-citation changes the structure of the review or merely repeats that you have worked on the topic before.',
      'Make sure each self-citation can answer the question: what would this paragraph lose without it?',
    ],
    riskZh: () =>
      '自引一旦失去必要性，读者最直接的感受通常不是“信息更多”，而是综述开始带出明显的防御性或自我放大感。',
    riskEn: () =>
      'Once self-citation loses necessity, the reader usually does not feel more informed but senses defensiveness or self-amplification in the review.',
    closeZh: () => '自引本身不是问题，问题是它有没有真正服务综述判断。',
    closeEn: () =>
      'Self-citation is not the problem by itself. The real question is whether it genuinely serves the judgment of the review.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}别让综述看起来像参考文献清单：先压掉低价值引用`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: prune low-value citations before the review starts reading like a bibliography`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}为了显得读得多，会在${discipline.titleZh}综述里不断加引用，结果段落越来越密，但真正支撑判断的高价值文献反而被淹没了。`,
    introEn: ({ degree, discipline }) =>
      `Many ${degree.readerEn} keep adding references to make a ${discipline.titleEn} review look well read, but the paragraphs become denser while the high-value sources that actually support the judgment are buried.`,
    strategyZh: ({ discipline }) =>
      `更稳的做法，是把文献先分成“核心必引、补充背景、可删可不删”三层，再判断哪些引用真正帮助你解释${discipline.evidenceZh}、争议和研究空白。`,
    strategyEn: ({ discipline }) =>
      `A steadier method is to sort the references into core must-cite items, background support, and optional extras, then ask which citations really help explain ${discipline.evidenceEn}, the debate, and the research gap.`,
    stepsZh: () => [
      '先标出每一段里真正承担判断功能的核心文献。',
      '再删掉那些只增加数量、却不改变论证方向的低价值引用。',
      '最后检查删减后段落是否更容易读懂，且判断关系是否更突出。',
    ],
    stepsEn: () => [
      'Mark the sources in each paragraph that actually carry the judgmental load.',
      'Remove low-value citations that add quantity without changing the argumentative direction.',
      'Check whether the paragraph becomes easier to read and whether the judgment structure grows more visible after pruning.',
    ],
    riskZh: () =>
      '如果综述总想靠引用数量建立权威感，最容易牺牲的就是可读性和判断强度。',
    riskEn: () =>
      'If the review tries to build authority mainly through citation volume, readability and judgment strength are often the first casualties.',
    closeZh: () => '删掉低价值引用，不会让综述变薄，通常只会让它更有判断力。',
    closeEn: () =>
      'Removing low-value citations rarely makes the review weaker. It usually makes the judgment sharper.',
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
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}统计分析计划别等出结果才补：先写一页 analysis plan`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: write a one-page analysis plan before the results exist`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}做${discipline.titleZh}研究时，是先把数据收回来再想怎么分析，结果到方法章节只能反向解释，整条分析链显得很被动。`,
    introEn: ({ degree, discipline }) =>
      `Many ${degree.readerEn} in ${discipline.titleEn} collect the data first and only then decide how to analyze them, which leaves the methods chapter sounding retrospective and improvised.`,
    strategyZh: ({ discipline }) =>
      `更稳的做法，是在正式跑结果前先写一页 analysis plan，明确研究问题、变量口径、主要检验、备选检验，以及这些分析如何对应${discipline.evidenceZh}。`,
    strategyEn: ({ discipline }) =>
      `A steadier approach is to write a one-page analysis plan before running the results, specifying the question, variable definitions, main tests, fallback tests, and how each step uses ${discipline.evidenceEn}.`,
    stepsZh: () => [
      '先把每个研究问题后面要对应的分析动作一一写清。',
      '再列出主要模型或统计检验，以及可能出现异常情况时的备选处理方案。',
      '最后让结果表格和图形都提前对应到这份 plan，而不是边做边想。',
    ],
    stepsEn: () => [
      'Map each research question to the analysis action that is supposed to answer it.',
      'List the main models or tests together with fallback treatments for likely irregular cases.',
      'Let later tables and figures correspond to that plan instead of being invented on the fly.',
    ],
    riskZh: () =>
      '如果分析计划完全靠后补，方法章节最容易出现的问题就是“统计做了很多，但每一步为什么要做并不清楚”。',
    riskEn: () =>
      'If the analysis plan is created too late, the methods chapter often shows many statistics without making clear why each step was necessary.',
    closeZh: () => 'analysis plan 不会限制你的灵活性，反而能让方法、结果和回复质疑时都更有依据。',
    closeEn: () =>
      'An analysis plan does not reduce flexibility. It gives the methods, results, and later responses to criticism a much firmer basis.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}图表不是最后排版：先按投稿规格反推结果展示`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: design figures and tables early instead of treating them as final formatting`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}会把${discipline.titleZh}论文里的图表留到最后统一处理，但真到临门一脚时才发现图不够清楚、表太多、结果线索也没有被真正突出。`,
    introEn: ({ degree, discipline }) =>
      `Many ${degree.readerEn} leave figures and tables to the end of a ${discipline.titleEn} thesis and only then discover that the visuals are unclear, excessive, or poorly aligned with the argument.`,
    strategyZh: ({ discipline }) =>
      `图表真正的作用不是“把结果摆上去”，而是帮你筛选最值得被看到的发现。越早按潜在投稿规格反推图表结构，${discipline.evidenceZh}就越容易被组织得更清楚。`,
    strategyEn: ({ discipline }) =>
      `The real function of figures and tables is not just to display results but to force a decision about what deserves to be seen first. The earlier you reverse-engineer them from plausible submission standards, the clearer the ${discipline.evidenceEn} becomes.`,
    stepsZh: () => [
      '先判断哪些结果必须进主文、哪些更适合做补充表或补充图。',
      '再给每个图表写一句标题式结论，检查它是否真的推进了论文主张。',
      '最后统一变量命名、图例、单位和注释，避免正文与图表互相打架。',
    ],
    stepsEn: () => [
      'Decide which findings belong in the main text and which should live in supplementary tables or figures.',
      'Write one conclusion-like sentence for each figure or table title and test whether it advances the thesis claim.',
      'Standardize variable names, legends, units, and notes so the visuals and prose stop fighting each other.',
    ],
    riskZh: () =>
      '如果图表只是最后排版动作，最容易发生的不是“不好看”，而是关键结果没有被清楚展示，读者也抓不住你的重点。',
    riskEn: () =>
      'When visuals are treated only as final formatting, the core problem is not aesthetics but that the key findings never become legible enough for the reader to grasp.',
    closeZh: () => '把图表前置思考，结果章节会更紧，后面改投稿格式时也会轻松很多。',
    closeEn: () =>
      'Thinking about figures and tables early usually tightens the results chapter and makes later submission formatting far easier.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}图文摘要和 Highlights 怎么准备：先把论文压成一条结果链`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: prepare graphical-abstract logic and highlights by compressing the result chain`,
    introZh: ({ degree, discipline }) =>
      `不少${degree.readerZh}直到准备投稿材料时，才第一次被迫把${discipline.titleZh}论文压缩成几条 highlights 或一张图文摘要，这时往往才发现自己的结果主线其实还不够集中。`,
    introEn: ({ degree, discipline }) =>
      `Many ${degree.readerEn} first attempt highlights or a graphical abstract only when submission materials are due and then discover that the result line of the ${discipline.titleEn} thesis is still too diffuse.`,
    strategyZh: ({ discipline }) =>
      `无论最后是否真的需要图文摘要，提前做一次“压缩实验”都很有用。它会逼你判断问题、方法、核心结果和${discipline.evidenceZh}之间到底哪一条链最值得保留。`,
    strategyEn: ({ discipline }) =>
      `Whether or not a final submission will require a graphical abstract, doing one round of compression early is useful. It forces you to decide which chain from problem to method, result, and ${discipline.evidenceEn} is most worth preserving.`,
    stepsZh: () => [
      '先用 3 到 5 条 bullets 写出这篇论文最想留下的发现和意义。',
      '再尝试把这些 bullets 改写成一张图或一条流程线，看看哪里还不够清楚。',
      '最后反推正文，删除那些无法进入 highlights 的冗余信息或弱结果。',
    ],
    stepsEn: () => [
      'Write three to five bullets naming the findings and meanings the paper most needs to leave behind.',
      'Convert those bullets into one visual or one process line and note where the logic still feels unclear.',
      'Use that compression to remove redundant information or weak findings from the main draft.',
    ],
    riskZh: () =>
      '如果论文永远压不成几条 highlights，往往说明主线还太散，或者结果之间的层级关系还没有真正建立。',
    riskEn: () =>
      'If the thesis can never be compressed into a few highlights, that usually means the core line is still too diffuse or the hierarchy among findings has not been established yet.',
    closeZh: () => '能被压缩清楚的论文，通常也更容易被编辑、审稿人和答辩老师迅速读懂。',
    closeEn: () =>
      'A thesis that can be compressed clearly is usually much easier for editors, reviewers, and examiners to understand quickly.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}补充材料和数据附件怎么准备：别等投稿系统逼你才找`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: prepare supplements and data appendices before the submission system forces you to`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}做${discipline.titleZh}研究时，会把补充材料、原始表格、附录说明和数据附件散落在各处，等到真正准备投稿或答辩材料时才发现文件不全、命名混乱、版本也对不上。`,
    introEn: ({ degree, discipline }) =>
      `Many ${degree.readerEn} in ${discipline.titleEn} keep supplements, raw tables, appendix notes, and data attachments scattered across folders until submission or defense preparation reveals that the files are incomplete, mislabeled, or version-mismatched.`,
    strategyZh: ({ discipline }) =>
      `更稳的做法，是在方法阶段就把主文结果、补充表格、代码或计算说明，以及与${discipline.evidenceZh}相关的附件路线分开整理，让每份文件都知道自己将来服务哪一种问题。`,
    strategyEn: ({ discipline }) =>
      `A steadier approach is to organize the main findings, supplementary tables, code or calculation notes, and attachments tied to ${discipline.evidenceEn} during the methods stage, so each file already knows what future question it is supposed to answer.`,
    stepsZh: () => [
      '先列出哪些材料必须进正文，哪些更适合留在附录或补充文件里。',
      '再统一文件命名、版本说明和引用关系，避免一个结果对应多个模糊版本。',
      '最后检查读者离开正文后，是否还能通过附件看懂你的方法、结果和边界条件。',
    ],
    stepsEn: () => [
      'List which materials belong in the main text and which are better placed in appendices or supplementary files.',
      'Standardize file names, version notes, and cross-references so one result does not point to multiple ambiguous versions.',
      'Check whether a reader leaving the main text can still understand your method, findings, and boundary conditions through the attachments.',
    ],
    riskZh: () =>
      '如果附件系统一直是临时拼凑，最常见的问题不是文件多，而是关键材料真正需要时反而找不到最可信的版本。',
    riskEn: () =>
      'If the supplement system remains improvised, the common problem is not having too many files but being unable to find the most trustworthy version when it is finally needed.',
    closeZh: () => '附件和补充材料先整理好，后面的投稿包件、审稿回复和答辩追问都会轻松很多。',
    closeEn: () =>
      'Once the supplements and appendices are organized early, submission packaging, reviewer responses, and defense follow-up all become much easier.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}报告规范别等投稿前才查：方法章节先跑一遍 checklist`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: run a reporting checklist during methods drafting instead of waiting until submission`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}把${discipline.titleZh}论文里的报告规范当成投稿前的“最后对照表”，结果经常到最后才发现样本说明、流程细节或图表信息缺了关键一块。`,
    introEn: ({ degree, discipline }) =>
      `Many ${degree.readerEn} treat reporting guidelines in ${discipline.titleEn} as a last-minute submission checklist and only then discover that key sample details, process steps, or figure information were never written down properly.`,
    strategyZh: ({ discipline }) =>
      `更稳的做法，是在方法章节成形时就先跑一遍 checklist。无论你所在领域用的是哪类规范，它的价值都不是应付格式，而是帮助你检查${discipline.evidenceZh}、步骤说明和限制条件有没有被真正写清。`,
    strategyEn: ({ discipline }) =>
      `A steadier move is to run a reporting checklist when the methods chapter first takes shape. Whatever guideline your field uses, its value is not formatting compliance alone but checking whether ${discipline.evidenceEn}, procedural details, and limitations have actually been described.`,
    stepsZh: () => [
      '先找出本领域最接近你研究设计的报告规范或方法清单。',
      '再逐条核对哪些信息已经写进正文，哪些还停留在脑子里或笔记里。',
      '最后把补上的细节真正放回方法和图表说明中，而不是只在清单上打勾。',
    ],
    stepsEn: () => [
      'Identify the reporting guide or method checklist that is closest to your study design.',
      'Check line by line which details are already in the draft and which still exist only in your head or notes.',
      'Return the missing details to the methods and figure notes rather than merely ticking the checklist.',
    ],
    riskZh: () =>
      '如果 checklist 只在最后出场，最容易出现的情况就是你知道缺什么，却已经没有足够时间把这些缺口补进论文主线里。',
    riskEn: () =>
      'If the checklist appears only at the end, the common outcome is knowing what is missing but no longer having enough time to integrate those gaps into the main manuscript cleanly.',
    closeZh: () => '报告规范越早进入方法写作，后面的投稿和审稿阶段就越少出现“本来做了，却没写出来”的遗憾。',
    closeEn: () =>
      'The earlier reporting guidance enters the methods draft, the fewer “we did it but failed to write it” regrets appear later in submission and review.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}文件夹和版本别乱：先搭一个可复核的研究工作区`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: build a reviewable research workspace before files and versions drift`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}做${discipline.titleZh}研究时，正文、数据、图表、附件和返修稿分散在不同文件夹里，等到要解释结果来源时，连自己都得先花时间找版本。`,
    introEn: ({ degree, discipline }) =>
      `Many ${degree.readerEn} keep the manuscript, data, figures, supplements, and revision copies of a ${discipline.titleEn} project scattered across folders, which means even they need time to reconstruct the version trail when asked where a result came from.`,
    strategyZh: ({ discipline }) =>
      `更稳的研究工作区，不只是为了整洁，而是为了让${discipline.evidenceZh}、分析脚本、图表输出和正文之间保留清楚的来路关系。可复核的文件结构，本身就是研究可信度的一部分。`,
    strategyEn: ({ discipline }) =>
      `A steadier research workspace is not about neatness alone. It preserves clear pathways among ${discipline.evidenceEn}, analysis scripts, figure outputs, and the manuscript. A reviewable file structure is itself part of research credibility.`,
    stepsZh: () => [
      '先把原始材料、处理中间件、结果输出和正文草稿分成不同层级存放。',
      '再统一版本命名和日期规则，避免“最终版”和“最终最终版”反复出现。',
      '最后确保每张图、每个表和每段关键结果都能追溯到相应的来源文件。',
    ],
    stepsEn: () => [
      'Separate raw material, intermediate processing files, result outputs, and manuscript drafts into different layers.',
      'Standardize naming and date rules so the project stops generating endless “final” and “final-final” files.',
      'Make sure each figure, table, and key result can be traced back to the file that produced it.',
    ],
    riskZh: () =>
      '文件结构一旦失控，方法章节最容易出问题的不是写不出来，而是写出来以后你自己也很难证明每一步到底怎么来的。',
    riskEn: () =>
      'Once the file structure slips out of control, the methods chapter problem is often not writing it but being unable to prove clearly how each step actually happened.',
    closeZh: () => '先把研究工作区搭稳，后面的返修、投稿和答辩都更容易站住。',
    closeEn: () =>
      'Once the research workspace is stable, later revision, submission, and defense all become easier to defend.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}别把所有稳健性检验都堆到最后：先判断哪些才真的有用`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: choose robustness checks deliberately instead of piling them on at the end`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}会在${discipline.titleZh}方法部分后期疯狂补稳健性检验，结果表格越做越多，但真正能回答质疑的关键检验并没有被优先安排。`,
    introEn: ({ degree, discipline }) =>
      `Many ${degree.readerEn} start adding robustness checks aggressively late in the methods stage of a ${discipline.titleEn} project, producing more and more tables without prioritizing the checks that actually answer likely criticism.`,
    strategyZh: ({ discipline }) =>
      `更稳的做法，是先判断你的结论最容易被从哪里质疑，再倒推最有解释力的稳健性检验。稳健性不是数量竞赛，而是证明${discipline.evidenceZh}和结果链条没有被某个单点设定绑架。`,
    strategyEn: ({ discipline }) =>
      `A steadier move is to identify first where the conclusion is most vulnerable to criticism and then choose the robustness checks with the strongest explanatory value. Robustness is not a quantity race. It is a way of showing that the ${discipline.evidenceEn} and result chain are not being driven by one arbitrary setting.`,
    stepsZh: () => [
      '先列出结论最可能被挑战的两到三个薄弱点。',
      '再为每个薄弱点匹配一个最直接的稳健性检验，而不是机械复制相似模型。',
      '最后决定哪些检验值得进主文，哪些更适合留在附录或补充材料。',
    ],
    stepsEn: () => [
      'List the two or three points where the conclusion is most likely to be challenged.',
      'Match each weak point to one direct robustness check instead of mechanically repeating similar models.',
      'Decide which checks deserve the main text and which belong in appendices or supplements.',
    ],
    riskZh: () =>
      '如果稳健性检验只是越多越好，最常见的结果就是正文负担越来越重，但真正重要的解释反而被一堆次要结果淹没。',
    riskEn: () =>
      'If robustness checking becomes a more-is-better exercise, the common result is a heavier manuscript in which the most important explanation is buried under secondary outputs.',
    closeZh: () => '把稳健性检验做成“有针对性的回应”，通常比单纯堆结果更能说服读者。',
    closeEn: () =>
      'Turning robustness checks into targeted responses usually persuades readers far more than simply piling on extra outputs.',
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
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}Cover Letter 别写成自夸信：投稿包要回答编辑最关心什么`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: write the cover letter as an editor-facing submission note, not self-praise`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}第一次准备${discipline.titleZh}投稿材料时，会把 Cover Letter 写成“这篇文章很有价值”的自我推荐信，但编辑真正想先知道的并不是你有多努力。`,
    introEn: ({ degree, discipline }) =>
      `When ${degree.readerEn} prepare a first ${discipline.titleEn} submission package, the cover letter often becomes a praise note about the paper, while editors are looking for something more practical.`,
    strategyZh: ({ discipline }) =>
      `更有效的 Cover Letter，通常只需要回答三件事：这篇稿件在研究什么、为什么适合这本期刊、以及${discipline.evidenceZh}支撑下最值得被快速看见的结果是什么。`,
    strategyEn: ({ discipline }) =>
      `A stronger cover letter usually answers three things only: what the manuscript studies, why it fits this journal, and what result supported by ${discipline.evidenceEn} deserves to be seen quickly.`,
    stepsZh: () => [
      '先用一到两句说明论文的问题、对象和结果，不要先从宏大背景写起。',
      '再明确点出这本期刊为什么是合适的发表场景，而不是群发式套话。',
      '最后补充必要的声明信息，但不要让信件变成冗长摘要。',
    ],
    stepsEn: () => [
      'Use the opening one or two sentences to state the question, object, and result instead of starting with a grand background.',
      'Name why this journal is a plausible publication venue instead of using broadcast-style generic praise.',
      'Add the necessary declarations, but do not let the letter turn into a long abstract.',
    ],
    riskZh: () =>
      '如果 Cover Letter 只会说“文章很重要”，却说不出为什么适合这本期刊，编辑很难从第一页就判断这份投稿值不值得继续送审。',
    riskEn: () =>
      'If the cover letter only says the manuscript is important without explaining journal fit, the editor has little reason to feel confident about sending it out for review.',
    closeZh: () => '一封好的 Cover Letter 不是替论文加戏，而是帮编辑更快看懂这篇稿件为什么应该出现在这里。',
    closeEn: () =>
      'A good cover letter does not dramatize the paper. It helps the editor see quickly why the manuscript belongs here.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}回复审稿意见怎么写：先分承认、补证、解释三类`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: answer reviewer comments by separating concession, added evidence, and explanation`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}一拿到${discipline.titleZh}审稿意见，就急着逐条硬回，结果要么口气太冲，要么解释很多却没有真正补到证据。`,
    introEn: ({ degree, discipline }) =>
      `Many ${degree.readerEn} react to ${discipline.titleEn} reviewer comments by answering line by line too quickly, which often leads either to an overly defensive tone or to long explanations without real added evidence.`,
    strategyZh: ({ discipline }) =>
      `更稳的回复信写法，是先判断每条意见属于哪一类：需要承认并修改、需要补充${discipline.evidenceZh}或分析、还是需要礼貌解释为什么原方案仍然成立。`,
    strategyEn: ({ discipline }) =>
      `A steadier response-letter strategy is to classify each comment first: admit and revise, add ${discipline.evidenceEn} or analysis, or explain politely why the original choice can still stand.`,
    stepsZh: () => [
      '先把所有意见整理成表格，标明问题类型和准备采取的动作。',
      '再在回复信里做到“感谢意见 + 明确动作 + 指出修改位置”三步完整出现。',
      '最后检查语气是否合作、证据是否足够、改动是否真的进入正文，而不是只停留在回复里。',
    ],
    stepsEn: () => [
      'Organize all comments into a table that labels the issue type and the action you plan to take.',
      'Make sure each response includes three parts: appreciation, a concrete action, and the exact location of revision.',
      'Check at the end whether the tone is collaborative, the evidence is sufficient, and the actual manuscript was changed rather than the response letter alone.',
    ],
    riskZh: () =>
      '回复审稿意见最容易失败的地方，不是承认问题，而是表面上回应了，正文却没有真正同步修改。',
    riskEn: () =>
      'The common failure in reviewer responses is not admitting weakness but appearing to answer the point while leaving the manuscript itself largely unchanged.',
    closeZh: () => '把回复信写成“问题处理记录”，而不是情绪反应，返修质量通常会稳很多。',
    closeEn: () =>
      'When the response letter becomes a record of problem handling rather than an emotional reaction, the quality of revision usually rises sharply.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}投稿前格式排查怎么做：标题页、图表和补充材料一次过`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: run a full pre-submission format check on title page, visuals, and supplements`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}以为投稿前的格式排查只是改参考文献和行距，但真正容易被编辑退回重整的，常常是标题页信息、图表命名、文件拆分和补充材料不完整。`,
    introEn: ({ degree, discipline }) =>
      `Many ${degree.readerEn} think pre-submission formatting only means references and spacing, while editors often send papers back because of title-page details, figure naming, file splitting, or incomplete supplements.`,
    strategyZh: ({ discipline }) =>
      `更稳的做法，是在投稿前做一次 package check，把主文、标题页、图表、附录、补充材料和涉及${discipline.evidenceZh}的说明文件当成一个整体来审。`,
    strategyEn: ({ discipline }) =>
      `A steadier move is to run one package check before submission, treating the main manuscript, title page, visuals, appendices, supplements, and files tied to ${discipline.evidenceEn} as one submission bundle.`,
    stepsZh: () => [
      '先按期刊要求列出必须上传和可选上传的全部文件清单。',
      '再逐项检查标题页信息、图表编号、文件命名、匿名化要求和补充材料是否对应一致。',
      '最后用“编辑第一次打开这些文件时会不会迷路”这个标准再审一次。',
    ],
    stepsEn: () => [
      'List all mandatory and optional files required by the journal before uploading anything.',
      'Check the title-page details, figure numbering, file names, anonymization rules, and supplement links for consistency.',
      'Run one final pass with the question: would an editor get lost the first time these files are opened?',
    ],
    riskZh: () =>
      '格式排查做得不完整，最大的代价不是多花几分钟，而是明明内容已成熟，却因为包件混乱拖慢了后续流程。',
    riskEn: () =>
      'An incomplete format check costs more than a few minutes. It can slow the whole process even when the manuscript itself is already mature.',
    closeZh: () => '投稿前把文件包件整理清楚，既是效率问题，也是专业感问题。',
    closeEn: () =>
      'A clean submission package is both an efficiency issue and a professionalism issue.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}会议摘要、海报和 PPT 怎么拆：别缩短全文，先重做信息层级`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: turn the thesis into an abstract, poster, or PPT by rebuilding information hierarchy`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}把${discipline.titleZh}论文拿去做会议摘要、海报或 PPT 时，第一反应是“把全文缩短”，结果内容看似精简了，现场表达却依然拥挤。`,
    introEn: ({ degree, discipline }) =>
      `When ${degree.readerEn} turn a ${discipline.titleEn} thesis into a conference abstract, poster, or PPT, the first instinct is often to shorten everything, but the result still feels crowded in presentation.`,
    strategyZh: ({ discipline }) =>
      `更有效的转换方式，不是压缩全文，而是重做信息层级：哪一句问题必须被先听懂，哪一个结果最值得被看见，哪一项${discipline.evidenceZh}最适合支撑现场讲解。`,
    strategyEn: ({ discipline }) =>
      `A stronger conversion does not simply shorten the whole thesis. It rebuilds the information hierarchy: what question must be understood first, what result deserves immediate attention, and which ${discipline.evidenceEn} best supports live explanation.`,
    stepsZh: () => [
      '先判断这次输出面对的是摘要读者、海报观众还是口头报告听众。',
      '再把论文内容缩成“问题 - 方法 - 发现 - 意义”四层，而不是保留原章节顺序。',
      '最后检查每一页或每一块版面是否只有一个真正的焦点，避免现场信息过载。',
    ],
    stepsEn: () => [
      'Decide first whether the output is for abstract readers, poster viewers, or an oral-presentation audience.',
      'Compress the thesis into four layers: problem, method, finding, and meaning, rather than preserving the original chapter order.',
      'Check that each slide or poster block has one real focus only, so the live setting does not become overloaded.',
    ],
    riskZh: () =>
      '如果只是机械缩短全文，最容易发生的就是信息量很大但层级很乱，观众听完仍然抓不住你最想强调的发现。',
    riskEn: () =>
      'If the full thesis is only shortened mechanically, the common outcome is heavy information with weak hierarchy, leaving the audience unsure what finding mattered most.',
    closeZh: () => '会议材料做得好，考验的不是删了多少字，而是你有没有重新组织研究的可听、可看、可记忆版本。',
    closeEn: () =>
      'Strong conference material is judged less by how many words were cut than by whether the research was rebuilt into something audible, visible, and memorable.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}为什么会被 desk reject：投稿前先查范围、贡献和包件`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: reduce desk-rejection risk by checking scope, contribution, and package fit`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}以为 desk reject 只和期刊档次有关，但不少${discipline.titleZh}稿件在送审前就被退回，真正原因往往是范围不匹配、贡献不够清楚，或投稿包件看起来不完整。`,
    introEn: ({ degree, discipline }) =>
      `Many ${degree.readerEn} assume desk rejection is mainly about journal prestige, yet many ${discipline.titleEn} manuscripts are returned before review because the scope is off, the contribution is unclear, or the submission package looks incomplete.`,
    strategyZh: ({ discipline }) =>
      `desk reject 的自查重点，通常不是“我是不是不够好”，而是三个更具体的问题：题目和摘要是否真的贴合期刊范围，核心结果是否足够明确，以及${discipline.evidenceZh}与附件文件是否已准备到编辑能快速判断的程度。`,
    strategyEn: ({ discipline }) =>
      `The useful desk-rejection self-check is usually not “am I good enough?” but three sharper questions: does the title and abstract genuinely fit the journal scope, is the core result sufficiently clear, and are ${discipline.evidenceEn} plus supporting files prepared enough for an editor to judge quickly?`,
    stepsZh: () => [
      '先把期刊 aims and scope 与你的标题、摘要并排对照，看是否存在明显错位。',
      '再检查编辑读完第一页后，能否一句话说出你的核心贡献。',
      '最后确认标题页、图表、补充材料和必要声明是否已经齐套，避免内容成熟却包件失分。',
    ],
    stepsEn: () => [
      'Place the journal aims and scope next to your title and abstract and test whether there is a visible mismatch.',
      'Check whether an editor could summarize your core contribution in one sentence after reading the first page.',
      'Confirm that the title page, visuals, supplements, and required declarations are complete so the package does not weaken a mature manuscript.',
    ],
    riskZh: () =>
      '如果投稿前没有做这轮 desk-reject 自查，最让人沮丧的情况就是研究并非没有价值，却因为定位和包件问题连外审都进不去。',
    riskEn: () =>
      'Without this desk-rejection check, the most frustrating outcome is a study with real value failing to reach external review because of positioning and packaging problems.',
    closeZh: () => '先把 scope、贡献和包件查稳，通常比盲目多投几本期刊更能提升首轮送审概率。',
    closeEn: () =>
      'Stabilizing scope, contribution, and submission packaging usually helps more than simply trying more journals blindly.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}推荐审稿人怎么想：不是找熟人，而是找真正懂问题的人`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: choose suggested reviewers for problem fit, not familiarity`,
    introZh: ({ degree, discipline }) =>
      `不少${degree.readerZh}第一次投稿时，一遇到“是否推荐审稿人”就发怵，要么随手不填，要么只想到和自己研究方向大致相关的人，却没有认真判断他们是否真正懂这篇稿子的核心问题。`,
    introEn: ({ degree }) =>
      `Many ${degree.readerEn} freeze the first time a submission system asks for suggested reviewers, either leaving the field empty or listing vaguely related names without asking whether those scholars actually understand the core problem of the manuscript.`,
    strategyZh: ({ discipline }) =>
      `更稳的推荐思路，不是找“看起来厉害的人”，而是找那些近年持续处理类似问题、方法或${discipline.evidenceZh}的人，并同时避开明显存在利益冲突或判断偏差风险的对象。`,
    strategyEn: ({ discipline }) =>
      `A stronger reviewer-suggestion strategy is not to find people who merely look prestigious but to identify scholars who have recently worked on similar questions, methods, or ${discipline.evidenceEn}, while avoiding obvious conflict-of-interest or bias risks.`,
    stepsZh: () => [
      '先从近几年与你论文最接近的参考文献和目标期刊文章里筛选候选人。',
      '再判断这些人是更懂你的问题、方法，还是更可能因为立场过近或过远而影响判断。',
      '最后准备一份简洁名单，并给自己留一份回避名单以防投稿系统需要。',
    ],
    stepsEn: () => [
      'Start from the references and target-journal papers closest to your manuscript in the last few years.',
      'Judge whether each person truly understands your question and method, or whether they are too close or too distant in stance to be ideal.',
      'Prepare a concise candidate list and keep a separate avoid-list ready in case the submission system asks for it.',
    ],
    riskZh: () =>
      '推荐审稿人最容易出错的地方，不是名单不够长，而是根本没有从“谁最可能公正理解这篇稿子”出发来想。',
    riskEn: () =>
      'The common error in suggesting reviewers is not a short list but failing to begin from the question of who is most likely to understand the manuscript fairly.',
    closeZh: () => '审稿人推荐不是人情操作，而是投稿定位的一部分。',
    closeEn: () =>
      'Reviewer suggestion is not social maneuvering. It is part of positioning the submission intelligently.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}作者贡献、利益冲突和数据声明怎么写：别让行政项拖累投稿`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: write contribution, conflict, and data statements before admin details slow submission`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}准备${discipline.titleZh}投稿时，最容易忽视的不是正文，而是作者贡献、利益冲突、致谢、数据可用性这类看似行政化的声明项。等到系统逐项索要时，整个流程常常突然卡住。`,
    introEn: ({ degree, discipline }) =>
      `Many ${degree.readerEn} preparing a ${discipline.titleEn} submission overlook not the manuscript itself but the apparently administrative statements on author contribution, conflicts of interest, acknowledgments, and data availability. The workflow often stalls when the system asks for them all at once.`,
    strategyZh: ({ discipline }) =>
      `这些声明最稳的处理方式，是把它们当成研究完整性的一部分，而不是投稿前临时拼接的附件。尤其当论文涉及${discipline.evidenceZh}、多人协作或数据共享时，它们会直接影响编辑对稿件专业度的判断。`,
    strategyEn: ({ discipline }) =>
      `The steadiest way to handle these statements is to treat them as part of research integrity rather than last-minute submission add-ons. When the paper involves ${discipline.evidenceEn}, collaboration, or data sharing, they directly shape an editor’s sense of professionalism.`,
    stepsZh: () => [
      '先在投稿前把作者分工、致谢对象和潜在利益冲突梳理成简表。',
      '再准备一版可直接进入系统的标准化声明文本，避免现场临时拼写。',
      '最后检查这些声明与正文方法、数据来源和附件说明是否彼此一致。',
    ],
    stepsEn: () => [
      'Prepare a short table of author roles, acknowledgment targets, and possible conflicts before submission starts.',
      'Draft standardized statement text that can be pasted into the system directly instead of being improvised live.',
      'Check that these statements remain consistent with the methods, data source description, and supplemental files.',
    ],
    riskZh: () =>
      '如果这些声明一直拖到最后，最常见的问题不是写不出来，而是写出来后和正文互相矛盾，或者临时追认信息导致节奏全乱。',
    riskEn: () =>
      'If these statements are delayed until the end, the common problem is not failing to write them but producing text that conflicts with the manuscript or disrupts the whole workflow through last-minute confirmation.',
    closeZh: () => '把这些声明提前写顺，投稿流程会明显更稳，编辑对稿件的第一印象也会更专业。',
    closeEn: () =>
      'Writing these statements early usually makes submission much smoother and creates a more professional first impression on the editorial side.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}AI 工具使用说明怎么处理：先查期刊政策，再区分润色和生成`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: handle AI-use disclosure by checking journal policy before submission`,
    introZh: ({ degree, discipline }) =>
      `越来越多${degree.readerZh}会在${discipline.titleZh}写作、润色、图示整理或语言检查中用到 AI 工具，但真正到投稿阶段时，大家最容易慌的不是“用没用”，而是“哪些使用需要声明，怎么声明才不失真”。`,
    introEn: ({ degree, discipline }) =>
      `More and more ${degree.readerEn} use AI tools in ${discipline.titleEn} drafting, polishing, figure organization, or language checking, yet the point of anxiety at submission is often not whether AI was used but what needs to be disclosed and how to state it accurately.`,
    strategyZh: ({ discipline }) =>
      `更稳的处理方式，是先查目标期刊或出版社的最新政策，再区分语言润色、格式辅助、图示整理与内容生成这些不同层级的使用。只要这一步不先做清，涉及${discipline.evidenceZh}和原创判断的边界就容易变模糊。`,
    strategyEn: ({ discipline }) =>
      `A steadier approach is to check the latest journal or publisher policy first and then distinguish among language polishing, formatting assistance, figure organization, and actual content generation. Without that separation, the boundary around originality and ${discipline.evidenceEn} becomes hard to state clearly.`,
    stepsZh: () => [
      '先记录你在论文准备过程中实际使用过哪些 AI 工具、用在什么环节、是否经过人工复核。',
      '再核对目标期刊对 AI 辅助写作、图示制作和声明格式的具体要求。',
      '最后只按事实写说明，不夸大也不掩盖，并保证正文中的研究判断和责任归属仍然清楚。',
    ],
    stepsEn: () => [
      'Document which AI tools were actually used, at what stage, and whether the output was reviewed manually.',
      'Check the target journal’s specific requirements on AI-assisted writing, figure preparation, and disclosure format.',
      'State only the facts, without exaggeration or concealment, and make sure responsibility for the manuscript’s judgments remains clear.',
    ],
    riskZh: () =>
      '如果 AI 使用说明完全靠临场发挥，最容易出现的问题不是格式不美观，而是说明和真实使用不匹配，或与期刊政策发生冲突。',
    riskEn: () =>
      'If AI-use disclosure is improvised on the spot, the main risk is not awkward wording but a mismatch between the statement, the actual workflow, and the journal policy.',
    closeZh: () => '先查政策、再写说明，通常比等投稿系统弹窗后临时补一句要稳得多。',
    closeEn: () =>
      'Checking policy first and writing the disclosure deliberately is far steadier than improvising a sentence when the submission system suddenly asks for it.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}被拒后先别急着改题目：先判断是范围错了还是贡献没讲清`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: after rejection, decide whether the issue was scope fit or contribution clarity before rewriting everything`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}在${discipline.titleZh}稿件被拒后，第一反应就是把标题和摘要大改一遍，甚至整个题目都想推倒重来。但很多拒稿并不是研究彻底失败，而是范围、读者定位或贡献表达出了偏差。`,
    introEn: ({ degree, discipline }) =>
      `Many ${degree.readerEn} respond to a rejected ${discipline.titleEn} manuscript by immediately rewriting the title, abstract, or even the entire topic. Yet many rejections do not mean the study failed completely; they mean the scope fit, audience targeting, or contribution framing was off.`,
    strategyZh: ({ discipline }) =>
      `更稳的拒稿处理方式，是先做 rejection triage：编辑信和评审意见究竟在说范围不匹配、结果不够强、${discipline.evidenceZh}不足，还是写法让人看不出价值。只有先分清问题类型，重投才不会乱。`,
    strategyEn: ({ discipline }) =>
      `A steadier rejection response is to run a rejection triage first. Is the editor letter signaling a scope mismatch, a weak result, insufficient ${discipline.evidenceEn}, or a writing problem that hid the value? Resubmission becomes much more controlled once the failure type is clear.`,
    stepsZh: () => [
      '先把拒稿信息拆成定位问题、证据问题、结构问题和表达问题四类。',
      '再判断哪些问题必须换期刊解决，哪些问题主要靠改摘要、引言或结果呈现就能改善。',
      '最后在动正文前先写一版重投策略说明，避免情绪化大改。',
    ],
    stepsEn: () => [
      'Separate the rejection message into positioning, evidence, structure, and expression problems.',
      'Decide which problems require a different journal and which can be improved mainly by changing the abstract, introduction, or result presentation.',
      'Write a resubmission strategy note before editing the manuscript so the rewrite is not driven by emotion alone.',
    ],
    riskZh: () =>
      '如果拒稿后第一步就是大面积重写，最容易发生的不是进步，而是把原本有效的部分也一起拆掉，结果下一版依然没有真正对准问题。',
    riskEn: () =>
      'If the first move after rejection is massive rewriting, the common danger is not improvement but dismantling parts that already worked while still missing the real issue in the next round.',
    closeZh: () => '拒稿后最值钱的动作通常不是立刻大修，而是先把失败类型看准。',
    closeEn: () =>
      'After rejection, the most valuable move is often not immediate major revision but accurately identifying the failure type first.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}重投要不要换标题和摘要：先看编辑第一眼是在哪里失去兴趣`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: decide whether title and abstract need rewriting by locating where editor interest was lost`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}重投${discipline.titleZh}稿件时，会机械地把标题和摘要都换一版，但如果没有判断编辑到底是在 scope、亮点、方法还是${discipline.evidenceZh}层面失去兴趣，这种改动常常只是表面工作。`,
    introEn: ({ degree, discipline }) =>
      `Many ${degree.readerEn} mechanically replace the title and abstract when resubmitting a ${discipline.titleEn} manuscript, but those changes often stay superficial if they never identify whether the editor lost interest at the level of scope, novelty, method, or ${discipline.evidenceEn}.`,
    strategyZh: ({ discipline }) =>
      `更稳的重投思路，是先回看原稿前两页：标题有没有把对象和贡献说准，摘要有没有过早铺背景，结果句有没有真正显示${discipline.evidenceZh}支持下的新信息。`,
    strategyEn: ({ discipline }) =>
      `A steadier resubmission approach is to reread the first two pages of the original draft. Did the title name the object and contribution precisely? Did the abstract overinvest in background? Did the result sentence actually show new information supported by ${discipline.evidenceEn}?`,
    stepsZh: () => [
      '先定位编辑最可能在标题、摘要或引言的哪一个点上停住。',
      '再重写最先出问题的那一层，而不是一次性把前文全部推翻。',
      '最后让新标题、新摘要和目标期刊范围重新对齐，再决定是否需要同步调整正文结构。',
    ],
    stepsEn: () => [
      'Locate the point in the title, abstract, or introduction where an editor was most likely to stop engaging.',
      'Rewrite that layer first instead of overturning the entire front end of the paper at once.',
      'Realign the new title and abstract with the target journal scope before deciding whether the main body needs synchronized structural changes.',
    ],
    riskZh: () =>
      '如果重投时只是“换个说法”，而不是解决第一眼定位问题，稿件很容易在新期刊那里重复遭遇相似的第一轮误判。',
    riskEn: () =>
      'If resubmission only changes the wording without fixing the first-impression positioning problem, the manuscript may face the same early misunderstanding at the next journal.',
    closeZh: () => '重投时改标题和摘要当然重要，但前提是你知道第一眼到底哪里掉了分。',
    closeEn: () =>
      'Title and abstract changes matter in resubmission, but only when you already know where the first impression truly failed.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}proof 校样怎么改：别把最后一轮当成小修小补`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: treat page proofs as a final integrity check, not minor cosmetics`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}把${discipline.titleZh}稿件进入 proof 阶段理解成“已经结束”，于是只草草看几眼拼写和格式。但真正到这一步时，图表、公式、作者信息、补充材料链接和术语一致性都还可能出问题。`,
    introEn: ({ degree, discipline }) =>
      `Many ${degree.readerEn} treat the proof stage of a ${discipline.titleEn} manuscript as effectively finished and only skim spelling and layout, while figures, equations, author details, supplement links, and terminology consistency can still break at this point.`,
    strategyZh: ({ discipline }) =>
      `更稳的 proof 思路，不是继续大修论点，而是做最后一轮完整性检查：排版后${discipline.evidenceZh}是否仍然被准确呈现，图表编号和交叉引用是否仍然成立，作者和声明信息是否全部正确。`,
    strategyEn: ({ discipline }) =>
      `A steadier proof-stage mindset is not to reopen the argument but to run a last integrity check: is ${discipline.evidenceEn} still presented accurately after typesetting, do figure numbers and cross-references still work, and are the author and declaration details fully correct?`,
    stepsZh: () => [
      '先按标题、作者、摘要、正文、图表、参考文献、补充链接的顺序完整过一遍。',
      '再重点检查排版后最容易出错的符号、单位、注释、图题和链接信息。',
      '最后把所有修改控制在 proof 允许的范围内，避免把最后一轮又拖回大修状态。',
    ],
    stepsEn: () => [
      'Read through the title, authors, abstract, main text, figures, references, and supplement links in order.',
      'Check carefully the symbols, units, notes, captions, and links most likely to break after typesetting.',
      'Keep all changes within what the proof stage allows so the final round does not collapse back into major revision.',
    ],
    riskZh: () =>
      '如果 proof 阶段只被当成形式确认，最容易漏掉的往往不是拼写，而是那些会直接影响可读性和可追溯性的细节错误。',
    riskEn: () =>
      'If the proof stage is treated only as formal confirmation, the details most likely to be missed are often not spelling errors but the ones that directly affect readability and traceability.',
    closeZh: () => 'proof 不是结束前的走流程，而是全文最后一次被完整校准的机会。',
    closeEn: () =>
      'Proofs are not merely a final administrative step. They are the last full opportunity to recalibrate the manuscript.',
  },
  {
    titleZh: ({ degree, discipline }) =>
      `${degree.labelZh}${discipline.titleZh}预印本和重复发表边界怎么拿捏：先分清传播、重写和重投`,
    titleEn: ({ degree, discipline }) =>
      `${degree.labelEn} ${discipline.titleEn}: distinguish preprint sharing, legitimate rewriting, and duplicate publication`,
    introZh: ({ degree, discipline }) =>
      `很多${degree.readerZh}在处理${discipline.titleZh}论文公开传播时，会把预印本、会议版本、学位论文公开和正式期刊投稿混在一起理解，结果最担心的往往是“会不会算重复发表”，但真正该分清的是不同传播形式之间的边界。`,
    introEn: ({ degree, discipline }) =>
      `Many ${degree.readerEn} blur preprints, conference versions, thesis disclosure, and formal journal submission together when handling public circulation of a ${discipline.titleEn} project. The fear usually centers on duplicate publication, but the real task is distinguishing the boundaries among different forms of dissemination.`,
    strategyZh: ({ discipline }) =>
      `更稳的处理方式，是先查目标期刊或出版社对预印本、会议版本和已公开学位论文的政策，再判断你的稿件与原版之间在结果、结构和${discipline.evidenceZh}层面究竟发生了多大变化。`,
    strategyEn: ({ discipline }) =>
      `A steadier approach is to check the target journal or publisher policy on preprints, conference versions, and publicly available theses first, and then judge how much the manuscript has changed from the earlier version in results, structure, and ${discipline.evidenceEn}.`,
    stepsZh: () => [
      '先列清你这项研究已经以哪些形式出现过，以及每一版对外公开到了什么程度。',
      '再对照期刊政策判断哪些属于允许传播、哪些需要声明、哪些可能触及重复发表风险。',
      '最后在投稿材料和正文说明里如实交代版本关系，避免后面解释不清。',
    ],
    stepsEn: () => [
      'List the forms in which the research has already appeared and how public each version has become.',
      'Check the journal policy to distinguish what is acceptable sharing, what requires disclosure, and what may approach duplicate-publication risk.',
      'State the version relationship honestly in the submission materials and manuscript notes so the history stays transparent.',
    ],
    riskZh: () =>
      '如果传播边界一直靠猜，最容易出现的问题不是“多写了几句话”，而是等投稿后才发现版本关系解释不清，平白增加风险。',
    riskEn: () =>
      'If the dissemination boundary is handled by guesswork, the main problem is not a few extra sentences but discovering after submission that the version history cannot be explained clearly.',
    closeZh: () => '把预印本、会议稿和正式稿的关系先理顺，通常比后面临时解释要安全得多。',
    closeEn: () =>
      'Clarifying the relationship among preprints, conference versions, and the formal paper early is usually far safer than trying to explain it later under pressure.',
  },
]

// Themes are original syntheses inspired by academic writing guidance from university writing centers,
// libraries, researcher training resources, and publication-support resource hubs.
const stageThemes: Record<StageConfig['slug'], ContentTheme[]> = {
  proposal: proposalThemes,
  'literature-review': literatureReviewThemes,
  'methods-analysis': methodsThemes,
  'revision-defense': revisionThemes,
}

type PostBuildArgs = ThemeArgs & {
  stage: StageConfig
}

type StageNarrative = {
  checklistEn: (args: PostBuildArgs) => [string, string, string]
  checklistZh: (args: PostBuildArgs) => [string, string, string]
  deliverableEn: (args: PostBuildArgs) => string
  deliverableZh: (args: PostBuildArgs) => string
  diagnosisEn: (args: PostBuildArgs) => string
  diagnosisZh: (args: PostBuildArgs) => string
  materialsEn: (args: PostBuildArgs) => string
  materialsZh: (args: PostBuildArgs) => string
  qualityEn: (args: PostBuildArgs) => string
  qualityZh: (args: PostBuildArgs) => string
  reviewerEn: (args: PostBuildArgs) => string
  reviewerZh: (args: PostBuildArgs) => string
  workflowEn: (args: PostBuildArgs) => string
  workflowZh: (args: PostBuildArgs) => string
}

const stageNarratives: Record<StageConfig['slug'], StageNarrative> = {
  proposal: {
    diagnosisZh: ({ degree, discipline }) =>
      `在开题阶段，真正拖慢进度的通常不是不会写，而是题目边界、研究对象和可取得的${discipline.evidenceZh}没有同时站稳。对${degree.readerZh}来说，先删掉模糊概念，往往比再补两页背景更有价值。`,
    diagnosisEn: ({ degree, discipline }) =>
      `At the proposal stage, the real delay usually comes from an unstable combination of topic boundary, research object, and access to ${discipline.evidenceEn}. For ${degree.readerEn}, cutting vague concepts early is often more useful than adding more background pages.`,
    reviewerZh: ({ degree, discipline }) =>
      `导师看开题时，通常先问三件事：问题是否够具体，范围是否与${degree.labelZh}训练强度匹配，获取${discipline.evidenceZh}的路径是否现实。如果这三点答不清，格式再完整也很容易被打回重做。`,
    reviewerEn: ({ degree, discipline }) =>
      `When advisors read a proposal, they usually ask three things first: is the question specific enough, is the scope realistic for ${degree.labelEn} training, and is the route to ${discipline.evidenceEn} genuinely feasible? If those three points are unclear, a polished format will not rescue the draft.`,
    workflowZh: ({ discipline }) =>
      `建议把开题拆成“问题句、关键词、文献入口、资料来源、目录草案、时间表”六个动作逐一推进。每完成一步，就回头检查它有没有让${discipline.titleZh}项目的问题更清楚，而不是只让文档更长。`,
    workflowEn: ({ discipline }) =>
      `A stronger workflow is to move through six linked actions: the question sentence, keyword plan, literature entry points, source map, draft outline, and timeline. After each move, check whether the ${discipline.titleEn} project has become clearer rather than merely longer.`,
    materialsZh: ({ discipline }) =>
      `开题阶段最有价值的，不是把所有材料都找齐，而是确认哪些${discipline.evidenceZh}是必需材料、哪些只是补充说明。只要核心证据链可获得，题目就具备往下做的条件。`,
    materialsEn: ({ discipline }) =>
      `The key at proposal stage is not collecting every possible source but distinguishing which ${discipline.evidenceEn} are essential and which are only supplementary. Once the core evidence chain is feasible, the project becomes workable.`,
    qualityZh: ({ degree }) =>
      `一份合格的开题初稿，应该让导师一眼看到题目边界、研究问题、关键文献入口和执行节奏。对${degree.readerZh}来说，稳比大更重要，能做完比看起来宏大更重要。`,
    qualityEn: ({ degree }) =>
      `A solid proposal draft should let the advisor see the boundary, the question, the literature entry points, and the execution rhythm immediately. For ${degree.readerEn}, control matters more than scale and finishability matters more than ambition.`,
    deliverableZh: ({ degree }) =>
      `这一轮完成后，你最好能拿出一个可以直接汇报的开题包：清楚的题目、可回答的问题、初步目录、关键文献清单和可执行时间表。对${degree.readerZh}来说，这比空泛的研究愿景更有说服力。`,
    deliverableEn: ({ degree }) =>
      `By the end of this round, you should have a proposal package that can be shown immediately: a clear title, an answerable question, a working outline, a short list of key sources, and an executable timeline. For ${degree.readerEn}, this is more persuasive than a grand but vague vision.`,
    checklistZh: ({ discipline }) => [
      `1. 题目里是否已经写出对象、范围和研究场景，而不是只有大而空的${discipline.titleZh}概念。`,
      `2. 核心问题后面是否能直接接上${discipline.evidenceZh}与预期分析动作，而不是停留在口号层面。`,
      '3. 时间安排是否对应到了具体任务，而不是只写“查文献、写论文、准备答辩”这种空泛流程。',
    ],
    checklistEn: ({ discipline }) => [
      `1. Does the title already name the object, scope, and research scene instead of only broad ${discipline.titleEn} language?`,
      `2. Can the main question connect directly to ${discipline.evidenceEn} and actual analysis moves instead of staying at the slogan level?`,
      '3. Does the timeline map onto concrete tasks rather than generic lines like read, write, and defend?',
    ],
  },
  'literature-review': {
    diagnosisZh: ({ degree, discipline }) =>
      `文献综述写不深，往往不是因为读得太少，而是没有把“研究争议、解释路径、方法取向”分开整理。尤其在${discipline.titleZh}写作里，如果你只是按作者名单往下排，${degree.readerZh}读再多也很难形成自己的判断。`,
    diagnosisEn: ({ degree, discipline }) =>
      `Weak literature reviews are usually not caused by reading too little but by failing to separate debates, explanatory paths, and methodological choices. In ${discipline.titleEn}, a list of authors rarely helps ${degree.readerEn} build a position.`,
    reviewerZh: ({ degree, discipline }) =>
      `导师在这一阶段最关心的，不是你看了多少篇，而是你能不能说清楚：现有研究主要分成哪几路，它们各自解决了什么，没有解决什么，以及你的${discipline.focusZh}研究将从哪里接进去。`,
    reviewerEn: ({ degree, discipline }) =>
      `At this stage, advisors care less about the number of sources and more about whether you can explain the main strands of research, what each strand solves, what it leaves unresolved, and where your own ${discipline.focusEn} project enters the discussion.`,
    workflowZh: ({ discipline }) =>
      `更稳的综述流程通常是“搭主题簇、找分歧点、补理论工具、回到自身问题”。只要你每读一批${discipline.titleZh}文献都记录它服务哪个论点，综述就不会沦为资料堆。`,
    workflowEn: ({ discipline }) =>
      `A steadier review workflow is to build thematic clusters, identify disputes, add the right theoretical tools, and return to your own question. If each batch of ${discipline.titleEn} reading is tied to a specific argument, the review stops being a pile of sources.`,
    materialsZh: ({ discipline }) =>
      `文献综述阶段最需要管理的是“核心文献、方法参考、背景资料”三层来源。尤其是${discipline.evidenceZh}相关研究，要把高频引用与真正能支撑你章节分析的材料区分开。`,
    materialsEn: ({ discipline }) =>
      `At review stage, the most useful source management separates core scholarship, method references, and contextual material. In work involving ${discipline.evidenceEn}, highly cited items still need to be distinguished from sources that genuinely support your chapter analysis.`,
    qualityZh: ({ degree }) =>
      `一份成熟的文献综述，不是把前人观点复述完整，而是要让读者看出研究脉络、关键争议和你准备采用的解释位置。对${degree.readerZh}来说，综述写得越有框架感，后面的章节越不会散。`,
    qualityEn: ({ degree }) =>
      `A mature literature review does not merely restate earlier work. It shows the research trajectory, the central disputes, and the interpretive position you are taking. For ${degree.readerEn}, the stronger the frame here, the less fragmented the later chapters become.`,
    deliverableZh: ({ discipline }) =>
      `这一轮结束后，你应该至少拿到一张可以继续扩写的综述骨架：主题分组、代表性研究、核心争议、理论抓手，以及这些内容如何回到你的${discipline.titleZh}研究问题。`,
    deliverableEn: ({ discipline }) =>
      `By the end of this round, you should have a literature-review skeleton that can keep growing: thematic groups, representative studies, core disputes, theoretical handles, and a clear bridge back to the ${discipline.titleEn} question.`,
    checklistZh: ({ discipline }) => [
      `1. 综述是否按问题和争议分类，而不是只按年份或作者顺序堆叠${discipline.titleZh}文献。`,
      '2. 每一类文献后面是否都写出了“它帮助我解决什么”与“它留下了什么空位”。',
      '3. 理论框架是否已经成为分析工具，而不是只停留在概念定义和名词解释。',
    ],
    checklistEn: ({ discipline }) => [
      `1. Is the review organized by questions and debates rather than only by year or author order in ${discipline.titleEn}?`,
      '2. Does each cluster state what it helps you solve and what gap still remains?',
      '3. Has the theoretical frame become an analytic tool instead of staying as a set of definitions?',
    ],
  },
  'methods-analysis': {
    diagnosisZh: ({ degree, discipline }) =>
      `方法和分析部分最容易失守的地方，是研究问题、分析单位和数据处理方式没有真正对齐。特别是${discipline.titleZh}项目，一旦问题问的是机制，方法却只能给出描述性结果，${degree.readerZh}后面就会越写越虚。`,
    diagnosisEn: ({ degree, discipline }) =>
      `Methodology sections usually break down when the research question, the unit of analysis, and the data treatment are not truly aligned. In ${discipline.titleEn}, if the question asks about mechanism but the method only yields description, ${degree.readerEn} quickly lose argumentative depth.`,
    reviewerZh: ({ degree, discipline }) =>
      `导师会重点看三件事：为什么选这个方法，它如何处理${discipline.evidenceZh}，以及结果能否支撑你前面提出的判断。如果方法只是“看起来专业”，却不能回答问题，评审会非常敏感。`,
    reviewerEn: ({ degree, discipline }) =>
      `Advisors usually test three things here: why this method was chosen, how it works with ${discipline.evidenceEn}, and whether the results can actually support the earlier claim. Reviewers notice quickly when a method looks technical but does not answer the question.`,
    workflowZh: ({ discipline }) =>
      `比较稳的推进顺序通常是“明确问题、确定分析单位、整理数据或材料、定义指标或编码规则、执行分析、解释局限”。把这条链条在${discipline.titleZh}项目里写顺，方法章节才会有可信度。`,
    workflowEn: ({ discipline }) =>
      `A reliable sequence is to clarify the question, set the unit of analysis, organize the data or materials, define indicators or coding rules, run the analysis, and explain the limits. Once this chain is visible in a ${discipline.titleEn} project, the methodology gains credibility.`,
    materialsZh: ({ discipline }) =>
      `这一阶段最需要保存的不是漂亮结论，而是原始记录和处理痕迹：样本筛选依据、变量定义、编码规则、图表来源、异常值处理说明。尤其面对${discipline.evidenceZh}，这些痕迹会决定别人是否相信你的结果。`,
    materialsEn: ({ discipline }) =>
      `At this stage, the most important assets are not polished conclusions but the raw traces of work: sample filters, variable definitions, coding rules, figure sources, and explanations of how outliers were handled. With ${discipline.evidenceEn}, those traces often determine whether readers trust the result.`,
    qualityZh: ({ degree }) =>
      `一份成熟的方法与分析稿，应该让读者明白你为什么这样做、具体怎么做、这样做能得到什么、又有哪些边界条件。对${degree.readerZh}而言，方法部分的透明度常常比复杂度更重要。`,
    qualityEn: ({ degree }) =>
      `A mature methods-and-analysis draft should make clear why this approach was chosen, how it was executed, what it can reveal, and where its boundary conditions sit. For ${degree.readerEn}, transparency is often more valuable than sheer complexity.`,
    deliverableZh: ({ discipline }) =>
      `这一轮结束后，你最好形成一套可重复说明的方法包：问题与假设、数据或文本来源、处理流程、关键图表、初步结果，以及这些结果如何回应${discipline.titleZh}核心命题。`,
    deliverableEn: ({ discipline }) =>
      `By the end of this round, you should have a method pack that can be explained repeatedly: the question and assumptions, the data or text source, the processing workflow, the key figures, the initial findings, and how those findings answer the central ${discipline.titleEn} claim.`,
    checklistZh: ({ discipline }) => [
      `1. 研究问题、分析单位和${discipline.evidenceZh}之间是否已经形成一一对应，而不是各写各的。`,
      '2. 数据清洗、编码或实验步骤是否记录到了别人能够复核的程度。',
      '3. 结果部分是否已经区分“观察到什么”“这意味着什么”“还有哪些不能过度解释”的边界。',
    ],
    checklistEn: ({ discipline }) => [
      `1. Do the research question, the unit of analysis, and ${discipline.evidenceEn} now match one another directly?`,
      '2. Are the cleaning, coding, or experimental steps documented clearly enough for someone else to review?',
      '3. Does the results section separate what was observed, what it means, and what should not be overclaimed?',
    ],
  },
  'revision-defense': {
    diagnosisZh: ({ degree, discipline }) =>
      `修改定稿阶段最容易卡住的，不是工作量大，而是反馈优先级没有排出来。很多${degree.readerZh}会同时改格式、补文献、调图表、改表述，结果忙了很久，却没有真正解决${discipline.titleZh}论文最核心的质疑。`,
    diagnosisEn: ({ degree, discipline }) =>
      `The final revision stage usually stalls not because the workload is large but because feedback has not been prioritized. Many ${degree.readerEn} revise formatting, references, tables, and wording all at once, yet still fail to answer the central challenge in the ${discipline.titleEn} thesis.`,
    reviewerZh: ({ degree, discipline }) =>
      `导师和答辩老师在定稿前最关注的是：你的修改是否回应了核心问题，摘要与结论是否同步更新，关键图表和${discipline.evidenceZh}能否支撑口头答辩中的追问。形式整洁当然重要，但逻辑修复优先级更高。`,
    reviewerEn: ({ degree, discipline }) =>
      `Before submission or defense, advisors and examiners mainly care about whether the revision answers the main criticism, whether the abstract and conclusion were updated consistently, and whether the key figures plus ${discipline.evidenceEn} can support oral defense questions. Clean formatting matters, but logical repair matters more.`,
    workflowZh: ({ discipline }) =>
      `更稳的定稿流程通常是“列反馈清单、分主次修改、检查章节联动、同步摘要结论、模拟答辩提问”。只要你每次修改都回到${discipline.titleZh}论文的核心主张，定稿就不会越改越散。`,
    workflowEn: ({ discipline }) =>
      `A steadier final-draft workflow is to list feedback, revise by priority, check chapter linkage, sync the abstract and conclusion, and simulate defense questions. As long as each change returns to the central ${discipline.titleEn} claim, revision stays coherent.`,
    materialsZh: ({ discipline }) =>
      `这一阶段最该随手整理的，是可快速调用的答辩材料：关键页码、核心图表、指标解释、案例片段、补充文献、以及涉及${discipline.evidenceZh}的原始出处。答辩现场能否迅速回应，常常取决于这些细节准备。`,
    materialsEn: ({ discipline }) =>
      `The materials worth organizing now are quick-access defense assets: key page numbers, core figures, indicator explanations, case excerpts, supporting references, and the original sources behind ${discipline.evidenceEn}. Fast responses in a defense often depend on this preparation.`,
    qualityZh: ({ degree }) =>
      `一篇达到定稿状态的论文，应该在术语、章节目标、图表编号、摘要结论和口头表达上保持一致。对${degree.readerZh}来说，最后这一轮不是简单润色，而是把整篇论文重新拧紧。`,
    qualityEn: ({ degree }) =>
      `A thesis that is truly ready for submission should be consistent in terminology, chapter goals, figure numbering, abstract-conclusion language, and oral explanation. For ${degree.readerEn}, this last round is not cosmetic editing but a final tightening of the whole argument.`,
    deliverableZh: ({ degree }) =>
      `这一轮结束后，你应该拿到的是一个完整交付包：更新后的定稿、反馈回应清单、答辩问题提纲，以及一套能在短时间内说明研究贡献和局限的表达脚本。对${degree.readerZh}来说，这会显著降低临场失控的概率。`,
    deliverableEn: ({ degree }) =>
      `By the end of this round, you should have a full delivery package: the revised final draft, a response list to feedback, a defense question outline, and a short script for explaining the contribution and limits. For ${degree.readerEn}, that preparation sharply reduces the chance of losing control under pressure.`,
    checklistZh: ({ discipline }) => [
      `1. 所有高优先级反馈是否已经落实到对应章节，而不是只在批注里“知道要改”。`,
      `2. 摘要、引言、结论与${discipline.titleZh}核心发现是否已经同步，不存在正文改了但前后文没跟上的问题。`,
      '3. 针对答辩可能被追问的样本、方法、贡献和局限，是否已经准备好简洁且一致的回答口径。',
    ],
    checklistEn: ({ discipline }) => [
      '1. Have the high-priority comments been resolved in the relevant chapters instead of only being acknowledged in notes?',
      `2. Are the abstract, introduction, and conclusion now synchronized with the core ${discipline.titleEn} findings?`,
      '3. Do you already have concise and consistent responses for defense questions about sample choice, method, contribution, and limitations?',
    ],
  },
}

const stageStepSupportZh: Record<
  StageConfig['slug'],
  Array<(args: PostBuildArgs) => string>
> = {
  proposal: [
    ({ discipline }) =>
      `这一步的目标不是把题目写得漂亮，而是让选题对象、比较维度和研究边界在第一页就能被看懂。只要边界收稳，${discipline.evidenceZh}的入口也会跟着变清楚。`,
    () =>
      '把问题句改成可以被验证或反驳的问句之后，后面的目录、文献和方法才有主轴。否则你写出来的每一节都像在说相关内容，却始终没有回答同一个问题。',
    ({ degree }) =>
      `对${degree.readerZh}来说，第三步最关键的是判断计划是否做得完。材料来源、时间安排和预期成果只要有一环是虚的，开题通过率就会明显下降。`,
  ],
  'literature-review': [
    () =>
      '第一步最怕的是一边读一边堆摘录，却没有及时做分类。只要你先按主题、立场或方法分组，综述的骨架就会先于细节出现。',
    ({ discipline }) =>
      `第二步要把理论真正变成工具：它帮助你解释${discipline.focusZh}中的哪一个矛盾、比较哪一类材料、回应哪一种争议，都应该写得清清楚楚。`,
    ({ degree }) =>
      `到了第三步，就要让综述回到你自己的论文任务上。对${degree.readerZh}来说，最有说服力的“研究空白”不是别人没写过，而是别人还没把问题讲到你准备推进的那一步。`,
  ],
  'methods-analysis': [
    ({ discipline }) =>
      `第一步的作用，是把问题、样本和${discipline.evidenceZh}绑定在一起。只要三者中有一项漂浮，后面的分析就很容易出现“数据很多，但回答不了问题”的情况。`,
    () =>
      '第二步最该做的是留下可复核的处理中间件，比如变量口径、编码规则、实验参数和异常样本说明。这样你后面改图表或补分析时，才不会每次都从头返工。',
    ({ degree }) =>
      `第三步要主动写出边界条件。对${degree.readerZh}而言，能够说明结果适用于什么情境、不适用于什么情境，往往比把结论写得过满更专业。`,
  ],
  'revision-defense': [
    () =>
      '第一步先排优先级，能直接修复研究逻辑的反馈一定先改，格式和措辞类问题放在后面。这样时间再紧，也不会只忙表面工作。',
    ({ discipline }) =>
      `第二步要检查章节联动，尤其是涉及${discipline.evidenceZh}的图表、案例和方法说明。只要正文更新了，摘要、引言和结论就必须一起跟上。`,
    ({ degree }) =>
      `第三步最好做一次模拟答辩。对${degree.readerZh}来说，把最容易被追问的贡献、局限和方法选择先讲顺，现场表现通常会稳很多。`,
  ],
}

const stageStepSupportEn: Record<
  StageConfig['slug'],
  Array<(args: PostBuildArgs) => string>
> = {
  proposal: [
    ({ discipline }) =>
      `The aim of the first move is not a prettier title but a title whose object, comparison dimension, and boundary are immediately visible. Once the scope is controlled, the path to ${discipline.evidenceEn} becomes much clearer.`,
    () =>
      'Once the problem sentence becomes answerable and debatable, the outline, literature, and method all gain a shared axis. Without that shift, every section may sound relevant while still failing to answer the same question.',
    ({ degree }) =>
      `For ${degree.readerEn}, the third move is where realism matters most. If source access, timing, or expected output remains vague, the proposal will still look unstable even after substantial writing.`,
  ],
  'literature-review': [
    () =>
      'The first move fails when reading notes are collected without being grouped. As soon as the sources are sorted by theme, position, or method, the frame of the review starts appearing before the detailed prose.',
    ({ discipline }) =>
      `The second move is where theory must become a tool: what tension in ${discipline.focusEn} it helps explain, what materials it helps compare, and which dispute it helps answer should all be explicit.`,
    ({ degree }) =>
      `By the third move, the review has to return to your own project. For ${degree.readerEn}, the strongest gap is rarely that no one has written on the topic; it is that the discussion has not yet been pushed to the point your thesis is targeting.`,
  ],
  'methods-analysis': [
    ({ discipline }) =>
      `The first move ties the question, sample, and ${discipline.evidenceEn} together. If any one of those floats independently, the analysis often becomes rich in data but weak in explanatory value.`,
    () =>
      'The second move should preserve reproducible traces such as variable rules, coding decisions, experiment settings, and notes on irregular samples. Those traces save enormous time when you later revise figures or extend the analysis.',
    ({ degree }) =>
      `The third move should name the boundary conditions directly. For ${degree.readerEn}, being clear about where the results do and do not apply often signals more maturity than writing an inflated conclusion.`,
  ],
  'revision-defense': [
    () =>
      'The first move is triage. Revisions that repair the research logic must come before formatting and wording changes, or the process becomes busy without becoming effective.',
    ({ discipline }) =>
      `The second move checks chapter linkage, especially where figures, cases, and method explanations depend on ${discipline.evidenceEn}. Once the body changes, the abstract, introduction, and conclusion must move with it.`,
    ({ degree }) =>
      `The third move is a defense rehearsal. For ${degree.readerEn}, pre-answering likely questions about contribution, limits, and method choice usually makes the live presentation much steadier.`,
  ],
}

function buildDegreeLensZh({ degree, discipline, stage }: PostBuildArgs) {
  if (degree.slug === 'undergraduate') {
    return `对${degree.readerZh}来说，${stage.titleZh}最重要的是把基础动作做准：不要试图一口气覆盖整个${discipline.focusZh}领域，而是先证明你能在有限范围内把问题、材料和结构接稳。`
  }

  if (degree.slug === 'masters') {
    return `对${degree.readerZh}来说，评审通常会更看重“分析链条有没有闭合”。也就是说，你提出的问题、调用的理论、使用的${discipline.evidenceZh}和最后的结论，必须能顺着一条线讲通。`
  }

  return `对${degree.readerZh}来说，标准会再往前一步：除了完成${stage.titleZh}任务，还要让论文显出对${discipline.focusZh}的独立判断、方法意识和研究贡献，不能只是把既有材料重新排列。`
}

function buildDegreeLensEn({ degree, discipline, stage }: PostBuildArgs) {
  if (degree.slug === 'undergraduate') {
    return `For ${degree.readerEn}, the key in ${stage.titleEn.toLowerCase()} is getting the fundamentals right. There is no need to cover the whole field of ${discipline.focusEn}; the priority is to show that the problem, materials, and structure can hold together inside a limited scope.`
  }

  if (degree.slug === 'masters') {
    return `For ${degree.readerEn}, reviewers often look hardest at whether the analytical chain is closed. The question, theory, ${discipline.evidenceEn}, and final interpretation should all be explainable as one connected line.`
  }

  return `For ${degree.readerEn}, the standard moves one step further. Beyond completing the ${stage.titleEn.toLowerCase()} task, the thesis needs to show independent judgment about ${discipline.focusEn}, methodological awareness, and a visible research contribution rather than a rearrangement of existing material.`
}

function buildEvidenceAlignmentZh({ discipline, stage }: PostBuildArgs) {
  return `不管你现在处在${stage.titleZh}还是后续章节推进期，最好都留下一张证据对照表：核心判断是什么，对应使用哪类${discipline.evidenceZh}，这些材料的局限会如何影响结论范围。这样后面越改越不容易失控。`
}

function buildEvidenceAlignmentEn({ discipline, stage }: PostBuildArgs) {
  return `Whether you are still in ${stage.titleEn.toLowerCase()} or already moving into later chapters, it helps to keep an evidence map: what the core claim is, which type of ${discipline.evidenceEn} supports it, and how the limitations of those materials narrow the conclusion. That map prevents later revisions from drifting out of control.`
}

const publicationThemeMarkersZh = [
  '期刊',
  '投稿',
  'Cover Letter',
  '审稿',
  'desk reject',
  '重投',
  'proof',
  '预印本',
  '图文摘要',
  'Highlights',
  '会议摘要',
  'PPT',
  '关键词',
  '读者',
  '数据声明',
  'AI 工具',
  'original article',
  'review',
  'special issue',
  '自引',
]

const publicationThemeMarkersEn = [
  'journal',
  'submission',
  'cover letter',
  'reviewer',
  'desk rejection',
  'resubmission',
  'proof',
  'preprint',
  'graphical abstract',
  'highlights',
  'conference',
  'ppt',
  'keyword',
  'reader',
  'data statement',
  'ai',
  'original article',
  'review',
  'special issue',
  'self-citation',
]

function hasThemeMarker(title: string, markers: string[]) {
  const normalized = title.toLowerCase()

  return markers.some((marker) => normalized.includes(marker.toLowerCase()))
}

function buildPublicationBridgeZh({ degree, discipline, stage }: PostBuildArgs) {
  if (stage.slug === 'proposal') {
    return `如果你后面还准备把这项研究发展成投稿稿件，现在最值得多做的一步，是先让题目、摘要式表述和潜在期刊读者之间形成基本对应。对${degree.readerZh}来说，越早把研究问题写成别人看得懂、数据库搜得到、并且能由${discipline.evidenceZh}支撑的表达，后面从论文转向文章时就越不容易整盘重来。`
  }

  if (stage.slug === 'literature-review') {
    return `如果后面准备投稿，文献综述不能只服务于“把导师交代清楚”，还要服务于“让编辑和审稿人迅速看见你的研究坐标”。对${degree.readerZh}来说，这意味着综述里不仅要交代前人做了什么，还要让读者看见你如何借助${discipline.evidenceZh}把问题继续往前推，而不是只把参考文献越堆越厚。`
  }

  if (stage.slug === 'methods-analysis') {
    return `如果你后面还要走投稿或公开传播这条线，方法部分最该提前补的就是透明度和可复核性。对${degree.readerZh}来说，样本口径、指标定义、图表来源、稳健性检验和${discipline.evidenceZh}的整理痕迹越早留清楚，后面面对编辑、审稿人或答辩追问时就越不容易陷入“其实做了但当时没写出来”的被动。`
  }

  return `如果你后面准备把论文继续送到投稿、重投或公开传播阶段，这一轮最该额外检查的是“读者第一次看到这份稿件时会不会迅速抓到重点”。对${degree.readerZh}来说，这意味着摘要、结论、图表、补充材料和${discipline.evidenceZh}的说明都要开始围绕同一条主线服务，而不是正文改好了，前后端材料却仍然各说各话。`
}

function buildPublicationBridgeEn({ degree, discipline, stage }: PostBuildArgs) {
  if (stage.slug === 'proposal') {
    return `If you may eventually turn this project into a submission-ready paper, one extra move matters now: make the topic, abstract-style framing, and likely journal reader correspond early. For ${degree.readerEn}, the sooner the question becomes something readers can understand, databases can surface, and ${discipline.evidenceEn} can support, the less painful the later shift from thesis to article will be.`
  }

  if (stage.slug === 'literature-review') {
    return `If publication is a later goal, the literature review cannot serve only advisor clarity. It also has to help editors and reviewers see your research position quickly. For ${degree.readerEn}, that means the review must show not only what earlier work did but how your study can move the discussion forward through ${discipline.evidenceEn}.`
  }

  if (stage.slug === 'methods-analysis') {
    return `If this work may later enter submission or wider circulation, the method section should start building transparency and reviewability now. For ${degree.readerEn}, the earlier the sample rules, indicator definitions, figure sources, robustness checks, and traces of ${discipline.evidenceEn} are documented, the easier it becomes to answer editors, reviewers, or examiners without falling back on “we did it but failed to write it clearly.”`
  }

  return `If the thesis may continue into submission, resubmission, or broader circulation, this round should already test whether a first-time reader would grasp the point quickly. For ${degree.readerEn}, that means the abstract, conclusion, figures, supplements, and explanation of ${discipline.evidenceEn} should now revolve around one visible line instead of functioning as disconnected materials.`
}

function buildPublicationBonusZh({ degree, discipline, stage }: PostBuildArgs, titleZh: string) {
  if (!hasThemeMarker(titleZh, publicationThemeMarkersZh)) {
    return null
  }

  if (stage.slug === 'proposal') {
    return `这类题目天然带着“以后还要面对编辑或同行”的视角，所以在开题阶段就值得多问一层：如果别人只给你两分钟看标题、关键词和迷你摘要，他们能不能立刻看出研究对象、判断方向和${discipline.evidenceZh}的进入方式。对${degree.readerZh}来说，这种提前压力测试通常比再补一页背景更能暴露真正的薄弱点。`
  }

  if (stage.slug === 'literature-review') {
    return `这类题目到了综述阶段，真正重要的不是把概念讲得多全，而是让编辑、审稿人或领域读者能看见你站在什么位置说话。也就是说，你的综述需要同时处理前人脉络、当前争议和${discipline.evidenceZh}能够补上的那一块，而不能只停留在“我读过很多”的展示层面。`
  }

  if (stage.slug === 'methods-analysis') {
    return `这类题目在方法层面尤其强调“别人是否能信服你的处理过程”。所以除了跑出结果，更要提前考虑图表、补充材料、声明文本和${discipline.evidenceZh}的整理方式，因为这些内容后来会直接决定稿件在投稿系统、外审和答辩场景里的表现。`
  }

  return `这类题目到了修改和投稿阶段，关键已经不是单点修辞，而是整套材料能不能前后一致。标题、摘要、Cover Letter、回复信、图表说明和${discipline.evidenceZh}的版本关系，只要有一处掉链子，读者就会感觉这篇稿件的主线还没有真正拧紧。`
}

function buildPublicationBonusEn({ degree, discipline, stage }: PostBuildArgs, titleEn: string) {
  if (!hasThemeMarker(titleEn, publicationThemeMarkersEn)) {
    return null
  }

  if (stage.slug === 'proposal') {
    return `Topics like this already carry a future editor-and-peer perspective, so the proposal stage should ask one extra question: if someone only had two minutes with the title, keywords, and a mini abstract, would they understand the object, the judgment direction, and how ${discipline.evidenceEn} enters the study? For ${degree.readerEn}, that stress test usually reveals weak points faster than another page of background ever will.`
  }

  if (stage.slug === 'literature-review') {
    return `At the review stage, this kind of topic is not mainly about naming every concept. It is about making your position legible to editors, reviewers, and field readers. The review therefore has to connect earlier scholarship, the current dispute, and the piece that ${discipline.evidenceEn} allows your study to add.`
  }

  if (stage.slug === 'methods-analysis') {
    return `For topics like this, the methodological issue is not only whether a result exists but whether the process can be trusted. Figures, supplements, disclosure text, and the organization of ${discipline.evidenceEn} all begin to matter here because they will shape how the manuscript performs in submission, review, and defense settings later on.`
  }

  return `At the revision and submission stage, topics like this succeed or fail less on isolated wording choices than on whether the full material set stays internally aligned. The title, abstract, cover letter, response file, visual notes, and the versioning of ${discipline.evidenceEn} all need to tell the same story.`
}

function buildDepthPriorityZh({ degree, discipline, stage }: PostBuildArgs) {
  if (stage.slug === 'proposal') {
    return `如果你想把这篇内容继续扩成更像可投稿的长文，最该优先补深的通常不是背景铺陈，而是三层判断：这个问题为什么值得现在回答，现有研究为什么还没把它讲透，以及你手上的${discipline.evidenceZh}究竟能把论证推进到哪一步。对${degree.readerZh}来说，先把这三层写实，比把题目写得更宏大更能拉开深度。`
  }

  if (stage.slug === 'literature-review') {
    return `综述类文章要写得更深，重点也不在于多列几篇文献，而在于把“现有共识、关键分歧、尚未解决的解释缺口”拆开来写。对${degree.readerZh}来说，只要你能明确指出不同研究如何处理${discipline.focusZh}、为何会得出不同结论、以及你的论文准备补哪一段，综述就会从资料整理升级成真正的学术对话。`
  }

  if (stage.slug === 'methods-analysis') {
    return `方法和分析部分如果想写得更扎实，优先增加的不是更多结果截图，而是决策过程本身：样本为什么这样筛，变量为什么这样定，异常值为什么这样处理，哪些稳健性检验真的会改变解释。对${degree.readerZh}来说，把${discipline.evidenceZh}背后的方法判断说透，往往比单纯多放一张图更能体现研究成熟度。`
  }

  return `到了修改定稿阶段，文章深度往往体现在“你如何解释修改逻辑”，而不只是“你改了多少地方”。对${degree.readerZh}来说，更值得补写的是为什么保留某些论点、为什么删去某些枝节、摘要和结论为何必须同步调整，以及${discipline.evidenceZh}对应的关键图表为什么足以支撑最终版本。`
}

function buildDepthPriorityEn({ degree, discipline, stage }: PostBuildArgs) {
  if (stage.slug === 'proposal') {
    return `If you want this piece to grow into something closer to a submission-ready long article, depth usually comes less from adding background and more from clarifying three judgments: why the question matters now, why existing work has not resolved it yet, and how far your available ${discipline.evidenceEn} can actually push the argument. For ${degree.readerEn}, writing those three layers clearly often adds more depth than making the title sound larger.`
  }

  if (stage.slug === 'literature-review') {
    return `A deeper review does not come from naming more sources. It comes from separating the current consensus, the core disputes, and the explanatory gap that remains unresolved. For ${degree.readerEn}, once the review shows how earlier studies handled ${discipline.focusEn}, why they reached different conclusions, and exactly where the thesis enters that gap, the section starts reading like scholarship rather than reading notes.`
  }

  if (stage.slug === 'methods-analysis') {
    return `When the methods and analysis section needs more depth, the most valuable addition is rarely more screenshots of results. It is the decision trail itself: why the sample was defined this way, why variables were operationalized this way, how irregular cases were handled, and which robustness checks would genuinely change the interpretation. For ${degree.readerEn}, explaining the judgment behind ${discipline.evidenceEn} often signals more maturity than simply adding another figure.`
  }

  return `At the revision and finalization stage, depth often shows up in how you explain the logic of revision rather than the sheer number of edits. For ${degree.readerEn}, it is worth expanding why some claims were retained, why some branches were removed, why the abstract and conclusion had to change together, and why the key figures based on ${discipline.evidenceEn} are sufficient to support the final version.`
}

function buildSubmissionReadyPackZh({ degree, discipline, stage }: PostBuildArgs) {
  if (stage.slug === 'proposal') {
    return `如果你后面确实想把这题继续做成投稿稿件，建议现在就同步搭一个“投稿准备草包”：一页目标读者画像、两到三个可能承接该主题的栏目或期刊方向、一版 150 字迷你摘要，以及一张“题目关键词-${discipline.evidenceZh}-预期贡献”的对照表。这样以后从学位论文转成文章时，你不是从零开始改，而是在一套已经想过发表路径的框架里继续推进。`
  }

  if (stage.slug === 'literature-review') {
    return `综述阶段最值得顺手搭建的，是一个可投稿化的引言材料包：高价值核心引用、争议分组、研究缺口句、理论进入点，以及一句能够把${discipline.evidenceZh}与贡献说清楚的 novelty statement。对${degree.readerZh}来说，这套材料以后不管是写引言、Cover Letter 还是答辩陈述，都会直接复用。`
  }

  if (stage.slug === 'methods-analysis') {
    return `如果以后会进入投稿流程，这一阶段最好就开始整理 submission-ready evidence pack：样本筛选规则、编码本、变量口径、图表源文件、异常值说明、补充分析、伦理或数据声明草稿。很多${degree.readerZh}的稿件并不是输在“结果不够多”，而是输在编辑和审稿人追问时，作者拿不出一套前后一致的处理记录。`
  }

  return `定稿前最值得准备的，是一套完整的 response package：一页式贡献总结、修改前后差异表、Cover Letter 主线、答辩高频问题、以及涉及${discipline.evidenceZh}的版本说明。这样无论你下一步是交导师、进答辩还是改投期刊，整套表达都会保持稳定，不会每到一个场景就换一套说法。`
}

function buildSubmissionReadyPackEn({ degree, discipline, stage }: PostBuildArgs) {
  if (stage.slug === 'proposal') {
    return `If you really want this project to move toward journal submission later, it helps to build a rough submission pack now: a one-page audience profile, two or three plausible journal or section directions, a 150-word mini abstract, and a map connecting the title terms, ${discipline.evidenceEn}, and the intended contribution. Then the later shift from thesis to article becomes an extension of an existing plan rather than a rewrite from zero.`
  }

  if (stage.slug === 'literature-review') {
    return `At the review stage, the most reusable package is an introduction kit for future submission: the highest-value core references, the dispute clusters, the gap sentence, the theory entry point, and one novelty statement that connects your contribution to ${discipline.evidenceEn}. For ${degree.readerEn}, that material can later feed the introduction, the cover letter, and even the oral defense framing.`
  }

  if (stage.slug === 'methods-analysis') {
    return `If submission is part of the later path, this is the stage to start assembling a submission-ready evidence pack: sample-screening rules, coding sheets, variable definitions, figure source files, notes on outliers, supplementary analyses, and draft ethics or data statements. Many manuscripts do not fail because the results are too few. They fail because the author cannot present one consistent processing record when editors and reviewers ask follow-up questions.`
  }

  return `Before the final draft goes out, the most valuable preparation is a full response package: a one-page contribution summary, a before-and-after revision table, the core cover-letter line, likely defense questions, and a version note for the pieces tied to ${discipline.evidenceEn}. That package keeps the story stable whether the next step is advisor review, oral defense, or submission to another journal.`
}

function buildChineseMetaDescription(args: PostBuildArgs, theme: ContentTheme) {
  return `适合${args.degree.readerZh}的${args.discipline.titleZh}${args.stage.titleZh}指南，重点讲清${theme
    .titleZh(args)
    .replace(`${args.degree.labelZh}${args.discipline.titleZh}`, '')}，以及导师最关心的边界、证据与写作质量标准。`
}

function buildEnglishMetaDescription(args: PostBuildArgs) {
  return `A practical ${args.stage.titleEn.toLowerCase()} guide for ${args.degree.readerEn} in ${args.discipline.titleEn}, covering scope control, evidence planning, advisor expectations, and stronger thesis writing decisions.`
}

function serializeRichText(value: unknown) {
  return JSON.stringify(value ?? null)
}

function buildChinesePost(
  degree: DegreeConfig,
  discipline: DisciplineConfig,
  stage: StageConfig,
  themeSeed: number,
) {
  const theme = stageThemes[stage.slug][themeSeed % stageThemes[stage.slug].length]
  const args = { degree, discipline }
  const postArgs = { degree, discipline, stage }
  const narrative = stageNarratives[stage.slug]
  const titleZh = theme.titleZh(args)
  const metaTitleZh = `${titleZh} | PaperBridge`
  const metaDescriptionZh = buildChineseMetaDescription(postArgs, theme)
  const [step1, step2, step3] = theme.stepsZh(args)
  const [check1, check2, check3] = narrative.checklistZh(postArgs)
  const publicationBonusZh = buildPublicationBonusZh(postArgs, titleZh)

  const contentZh = createRichText([
    createHeading('先判断真正卡在哪'),
    createParagraph(theme.introZh(args)),
    createParagraph(
      `${degree.standardZh}这在${discipline.focusZh}相关写作里尤其关键，因为导师最后看的不是你写了多少背景，而是你的判断能否落到${discipline.evidenceZh}、目录结构和章节任务上。`,
    ),
    createParagraph(narrative.diagnosisZh(postArgs)),
    createHeading('导师和评审通常会怎么判断'),
    createParagraph(narrative.reviewerZh(postArgs)),
    createParagraph(buildDegreeLensZh(postArgs)),
    createHeading('把问题拆成可以推进的写作任务'),
    createParagraph(theme.strategyZh(args)),
    createParagraph(narrative.workflowZh(postArgs)),
    createHeading('可以直接照着走的三个关键动作'),
    createHeading('第一步', 'h3'),
    createParagraph(step1),
    createParagraph(stageStepSupportZh[stage.slug][0](postArgs)),
    createHeading('第二步', 'h3'),
    createParagraph(step2),
    createParagraph(stageStepSupportZh[stage.slug][1](postArgs)),
    createHeading('第三步', 'h3'),
    createParagraph(step3),
    createParagraph(stageStepSupportZh[stage.slug][2](postArgs)),
    createHeading('资料和证据怎么安排才不会后面返工'),
    createParagraph(narrative.materialsZh(postArgs)),
    createParagraph(buildEvidenceAlignmentZh(postArgs)),
    createHeading('这一稿的质量标准是什么'),
    createParagraph(narrative.qualityZh(postArgs)),
    createHeading('如果你后面还想继续走投稿或公开传播'),
    createParagraph(buildPublicationBridgeZh(postArgs)),
    ...(publicationBonusZh ? [createParagraph(publicationBonusZh)] : []),
    createHeading('想把这篇内容继续写深并往投稿版本靠'),
    createParagraph(buildDepthPriorityZh(postArgs)),
    createParagraph(buildSubmissionReadyPackZh(postArgs)),
    createHeading('最容易踩的坑'),
    createParagraph(theme.riskZh(args)),
    createHeading('交稿前自检清单'),
    createParagraph(check1),
    createParagraph(check2),
    createParagraph(check3),
    createHeading('写完这一轮后你应该得到什么'),
    createParagraph(narrative.deliverableZh(postArgs)),
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
  themeSeed: number,
) {
  const theme = stageThemes[stage.slug][themeSeed % stageThemes[stage.slug].length]
  const args = { degree, discipline }
  const postArgs = { degree, discipline, stage }
  const narrative = stageNarratives[stage.slug]
  const titleEn = theme.titleEn(args)
  const metaTitleEn = `${titleEn} | PaperBridge`
  const metaDescriptionEn = buildEnglishMetaDescription(postArgs)
  const [step1, step2, step3] = theme.stepsEn(args)
  const [check1, check2, check3] = narrative.checklistEn(postArgs)
  const publicationBonusEn = buildPublicationBonusEn(postArgs, titleEn)

  const contentEn = createRichText([
    createHeading('Find the real bottleneck first'),
    createParagraph(theme.introEn(args)),
    createParagraph(
      `${degree.standardEn} That matters even more in projects about ${discipline.focusEn}, where the argument is eventually judged by whether it stands up against ${discipline.evidenceEn}, chapter logic, and actual writing decisions.`,
    ),
    createParagraph(narrative.diagnosisEn(postArgs)),
    createHeading('What advisors and reviewers usually test'),
    createParagraph(narrative.reviewerEn(postArgs)),
    createParagraph(buildDegreeLensEn(postArgs)),
    createHeading('Turn the problem into executable writing work'),
    createParagraph(theme.strategyEn(args)),
    createParagraph(narrative.workflowEn(postArgs)),
    createHeading('Three moves you can apply immediately'),
    createHeading('Step 1', 'h3'),
    createParagraph(step1),
    createParagraph(stageStepSupportEn[stage.slug][0](postArgs)),
    createHeading('Step 2', 'h3'),
    createParagraph(step2),
    createParagraph(stageStepSupportEn[stage.slug][1](postArgs)),
    createHeading('Step 3', 'h3'),
    createParagraph(step3),
    createParagraph(stageStepSupportEn[stage.slug][2](postArgs)),
    createHeading('Handle materials and evidence before they cause rework'),
    createParagraph(narrative.materialsEn(postArgs)),
    createParagraph(buildEvidenceAlignmentEn(postArgs)),
    createHeading('What quality should look like in this draft'),
    createParagraph(narrative.qualityEn(postArgs)),
    createHeading('If this work may later move toward submission or public circulation'),
    createParagraph(buildPublicationBridgeEn(postArgs)),
    ...(publicationBonusEn ? [createParagraph(publicationBonusEn)] : []),
    createHeading('If you want to deepen this piece and move it closer to submission'),
    createParagraph(buildDepthPriorityEn(postArgs)),
    createParagraph(buildSubmissionReadyPackEn(postArgs)),
    createHeading('The easiest trap to fall into'),
    createParagraph(theme.riskEn(args)),
    createHeading('Quick pre-submission checklist'),
    createParagraph(check1),
    createParagraph(check2),
    createParagraph(check3),
    createHeading('What this round of work should produce'),
    createParagraph(narrative.deliverableEn(postArgs)),
    createParagraph(theme.closeEn(args)),
  ])

  return {
    titleEn,
    metaTitleEn,
    metaDescriptionEn,
    contentEn,
  }
}

function resolveWritingHubImageFilename(stage: StageConfig) {
  if (stage.slug === 'proposal') return 'paperbridge-masters-planning.webp'
  if (stage.slug === 'revision-defense') return 'paperbridge-defense-revision.webp'

  return 'paperbridge-methods-data.webp'
}

function buildWritingHubStepSupportZh(
  hub: WritingHubConfig,
  stage: StageConfig,
  stepIndex: number,
) {
  if (stage.slug === 'proposal') {
    if (stepIndex === 0) {
      return `第一步最重要的是先把${hub.focusZh}收进一个可执行范围，不要让题目或任务继续停在“方向正确但抓不住”的状态。`
    }

    if (stepIndex === 1) {
      return `第二步要把${hub.evidenceZh}和问题本身绑定起来。只要入口材料没有对应到主问题，后面的推进就会越来越凭感觉。`
    }

    return `第三步的关键是现实校准：时间、资料、输出形式都要和当前任务对上。再漂亮的想法，只要当前阶段做不完，就还不是一个稳的题目。`
  }

  if (stage.slug === 'literature-review') {
    if (stepIndex === 0) {
      return `这一阶段第一步最怕的，就是把阅读继续维持在“越多越安心”的状态。只有先分清关系和争议，综述才会开始长出判断。`
    }

    if (stepIndex === 1) {
      return `第二步要真正把比较写出来，而不是只说“也有研究认为”。能够比较${hub.evidenceZh}的不同处理方式，综述才会有分析感。`
    }

    return `第三步一定要回到你自己的论文任务上。综述不是孤立展示你读了什么，而是解释这些阅读如何为后文服务。`
  }

  if (stage.slug === 'methods-analysis') {
    if (stepIndex === 0) {
      return `第一步不是急着跑结果，而是先决定你到底要让哪条判断站住。只要主判断不清，方法和数据就会越做越散。`
    }

    if (stepIndex === 1) {
      return `第二步要给${hub.evidenceZh}留痕。后面无论是返修、答辩还是改写文章，真正帮你稳住局面的往往都是这些处理中间件。`
    }

    return `第三步要主动写清边界条件。能说明哪些地方现在还不能说满，通常比把结果包装得过度确定更专业。`
  }

  if (stepIndex === 0) {
    return `最后阶段的第一步总是先排优先级。能够修复逻辑和主线的问题，永远要先于格式、措辞和局部润色。`
  }

  if (stepIndex === 1) {
    return `第二步一定要做联动检查，确保摘要、结论、图表和说明文件都跟上了当前版本，而不是正文已经改了，外围文本还停在旧口径。`
  }

  return `第三步最好做一次面向外部读者的压力测试：让别人只看核心材料时，也能快速理解你到底改了什么、现在这版为什么更稳。`
}

function buildWritingHubStepSupportEn(
  hub: WritingHubConfig,
  stage: StageConfig,
  stepIndex: number,
) {
  if (stage.slug === 'proposal') {
    if (stepIndex === 0) {
      return `The first move at this stage is to bring ${hub.focusEn} into an executable range instead of leaving the topic in the state of sounding right while still being impossible to grasp.`
    }

    if (stepIndex === 1) {
      return `The second move has to connect ${hub.evidenceEn} directly to the question itself. If the entry materials are not tied to the main problem, the project will drift further into guesswork.`
    }

    return `The third move is reality calibration: time, sources, and output format all need to match the current task. An elegant idea is not yet a stable topic if it cannot be finished under present conditions.`
  }

  if (stage.slug === 'literature-review') {
    if (stepIndex === 0) {
      return `The first danger at this stage is staying in the mode where more reading always feels safer. The review only starts gaining judgment once relationships and disputes become visible.`
    }

    if (stepIndex === 1) {
      return `The second move is where comparison has to become explicit rather than hidden inside phrases like some studies also suggest. The review begins to feel analytical only when different treatments of ${hub.evidenceEn} can be compared directly.`
    }

    return `The third move must return to your own paper. A review is not a display of what was read in isolation; it explains how that reading prepares the work ahead.`
  }

  if (stage.slug === 'methods-analysis') {
    if (stepIndex === 0) {
      return `The first move is not to rush toward results but to decide which line of judgment needs to stand. Without that, method and data both spread out without direction.`
    }

    if (stepIndex === 1) {
      return `The second move should leave traces for ${hub.evidenceEn}. In later revision, defense, or article conversion, those intermediate records often become the exact pieces that stabilize the explanation.`
    }

    return `The third move is to state the boundary conditions openly. Being clear about what still cannot be claimed is often more professional than packaging the result as too certain.`
  }

  if (stepIndex === 0) {
    return `In the final stage, the first move is always triage. Problems that repair the logic and the main line have to come before formatting, wording, or local polishing.`
  }

  if (stepIndex === 1) {
    return `The second move has to be a linkage check so that the abstract, conclusion, figures, and support files all reflect the current version rather than leaving the body revised and the surrounding texts behind.`
  }

  return `The third move works best as a stress test for outside readers: if someone only sees the key materials, can they still understand what changed and why the present version is stronger?`
}

function buildWritingHubDepthZh(hub: WritingHubConfig, stage: StageConfig) {
  if (stage.slug === 'proposal') {
    return `如果你想把这篇内容继续写深，优先补的不是更长的背景，而是更扎实的判断：为什么这个问题值得现在回答、为什么当前切法比其他切法更稳、以及${hub.evidenceZh}能把结论推进到哪一步。`
  }

  if (stage.slug === 'literature-review') {
    return `想把综述写深，关键不是再加很多材料，而是让“争议、比较、切口”三件事同时出现。只有当阅读真正开始服务你的研究位置，综述才会从资料整理变成论证前提。`
  }

  if (stage.slug === 'methods-analysis') {
    return `分析部分要写深，重点通常在于解释决策过程而不是展示更多输出。你为什么这样选、这样删、这样解释，这些判断一旦写透，方法部分的厚度会明显提升。`
  }

  return `定稿阶段的深度，往往体现在你能否说明“为什么这版更成立”。修改逻辑、证据链条和表达边界越清楚，最后的版本就越像真正收束过的稿件。`
}

function buildWritingHubDepthEn(hub: WritingHubConfig, stage: StageConfig) {
  if (stage.slug === 'proposal') {
    return `If you want to deepen this piece, the first thing to expand is rarely more background. It is firmer judgment: why this question matters now, why the present angle is steadier than nearby alternatives, and how far ${hub.evidenceEn} can actually carry the claim.`
  }

  if (stage.slug === 'literature-review') {
    return `To deepen the review, the real task is not adding more material but making dispute, comparison, and entry point appear together. Only when the reading truly serves your position does the review stop being source management and start becoming a premise for argument.`
  }

  if (stage.slug === 'methods-analysis') {
    return `When the analysis section needs more depth, the most valuable expansion usually lies in the decision process rather than in more output. Why you chose this route, rejected another, and interpreted the evidence in this way is what thickens the methods section.`
  }

  return `Depth at the final stage often depends on whether you can explain why this version now stands better. The clearer the logic of revision, the evidence chain, and the boundary of expression become, the more the final draft feels genuinely tightened.`
}

function buildWritingHubPackageZh(hub: WritingHubConfig, stage: StageConfig) {
  if (stage.slug === 'proposal') {
    return `现在就值得顺手建立一份小型写作包：题目说明、关键词树、入口文献、迷你摘要和阶段任务表。对${hub.readerZh}来说，这套小包以后会直接演化成更成熟的开题材料和投稿底稿。`
  }

  if (stage.slug === 'literature-review') {
    return `这一阶段最好留下的是一套可复用的综述包：文献分组表、争议线、比较句和研究缺口句。后面不管是写引言、写综述还是回复“深度不够”的意见，都会反复用到。`
  }

  if (stage.slug === 'methods-analysis') {
    return `到了方法和分析阶段，最值钱的写作包通常是 evidence pack：样本说明、变量口径、图表脚本、补充分析和版本注记。以后无论答辩还是投稿，这些都是最容易救场的材料。`
  }

  return `最后阶段最好整理的是统一口径包：核心主张、关键修改、证据链、版本说明和口头表达提纲。只要这套包成型，不同场景下的输出就不容易再互相打架。`
}

function buildWritingHubPackageEn(hub: WritingHubConfig, stage: StageConfig) {
  if (stage.slug === 'proposal') {
    return `This is a good moment to build a small writing pack: a topic note, a keyword tree, entry papers, a mini abstract, and a stage task sheet. For ${hub.readerEn}, that pack often grows directly into stronger proposal materials and later submission drafts.`
  }

  if (stage.slug === 'literature-review') {
    return `The most reusable package at this stage is a review kit: literature clusters, dispute lines, comparison sentences, and a gap statement. Those pieces are used again and again in introductions, reviews, and revision responses about depth.`
  }

  if (stage.slug === 'methods-analysis') {
    return `At the methods and analysis stage, the most valuable writing pack is usually an evidence pack: sample notes, variable definitions, figure scripts, supplementary analyses, and version notes. Those materials repeatedly become the most useful resources in both defense and submission.`
  }

  return `At the final stage, the package worth building is the alignment pack: the core claim, the key revisions, the evidence chain, the version note, and the oral explanation outline. Once that exists, outputs for different contexts stop fighting one another.`
}

function buildWritingHubChinesePost(hub: WritingHubConfig, stage: StageConfig) {
  const article = hub.articles[stage.slug]

  if (!article) return null

  const [step1, step2, step3] = article.stepsZh
  const [check1, check2, check3] = article.checklistZh
  const titleZh = article.titleZh
  const metaTitleZh = `${titleZh} | PaperBridge`
  const metaDescriptionZh = `知乎高频论文写作问题整理：围绕${hub.labelZh}中的“${titleZh}”，讲清推进逻辑、常见误区和后续投稿衔接。`

  const contentZh = createRichText([
    createHeading('先判断这个问题为什么总会卡住'),
    createParagraph(article.introZh),
    createParagraph(
      `${hub.standardZh}这类内容真正要处理的，不是再补一点零散技巧，而是让${hub.focusZh}围绕同一条主线真正收束起来。`,
    ),
    createParagraph(article.zhihuAngleZh),
    createHeading('更稳的推进逻辑'),
    createParagraph(article.strategyZh),
    createParagraph(
      `只要你能把${hub.evidenceZh}和当前问题对应起来，这篇内容就不会继续停留在“知道问题存在，但不知道怎么往下写”的状态。`,
    ),
    createHeading('三个可以直接执行的动作'),
    createHeading('第一步', 'h3'),
    createParagraph(step1),
    createParagraph(buildWritingHubStepSupportZh(hub, stage, 0)),
    createHeading('第二步', 'h3'),
    createParagraph(step2),
    createParagraph(buildWritingHubStepSupportZh(hub, stage, 1)),
    createHeading('第三步', 'h3'),
    createParagraph(step3),
    createParagraph(buildWritingHubStepSupportZh(hub, stage, 2)),
    createHeading('想把这篇内容继续写深'),
    createParagraph(buildWritingHubDepthZh(hub, stage)),
    createParagraph(buildWritingHubPackageZh(hub, stage)),
    createHeading('如果后续还要投稿、返修或答辩'),
    createParagraph(article.submissionZh),
    createParagraph(
      `越早把${hub.evidenceZh}整理成可复用的说明，后面就越不容易在不同场景里临时重组口径。`,
    ),
    createHeading('最容易踩的坑'),
    createParagraph(article.riskZh),
    createHeading('自检清单'),
    createParagraph(check1),
    createParagraph(check2),
    createParagraph(check3),
    createHeading('写完这一轮后你应该得到什么'),
    createParagraph(article.deliverableZh),
    createParagraph(article.closeZh),
  ])

  return {
    titleZh,
    metaTitleZh,
    metaDescriptionZh,
    contentZh,
  }
}

function buildWritingHubEnglishPost(hub: WritingHubConfig, stage: StageConfig) {
  const article = hub.articles[stage.slug]

  if (!article) return null

  const [step1, step2, step3] = article.stepsEn
  const [check1, check2, check3] = article.checklistEn
  const titleEn = article.titleEn
  const metaTitleEn = `${titleEn} | PaperBridge`
  const metaDescriptionEn = `A Zhihu-inspired long-form writing guide on ${hub.labelEn.toLowerCase()}, covering ${titleEn.toLowerCase()}, common mistakes, execution steps, and later submission alignment.`

  const contentEn = createRichText([
    createHeading('Find out why this problem keeps returning'),
    createParagraph(article.introEn),
    createParagraph(
      `${hub.standardEn} The real task here is not to collect scattered tips but to make ${hub.focusEn} converge around one workable line.`,
    ),
    createParagraph(article.zhihuAngleEn),
    createHeading('A steadier way to move forward'),
    createParagraph(article.strategyEn),
    createParagraph(
      `As soon as ${hub.evidenceEn} are matched to the actual problem, the draft stops living in the zone of knowing the issue exists without knowing how to write through it.`,
    ),
    createHeading('Three moves you can apply immediately'),
    createHeading('Step 1', 'h3'),
    createParagraph(step1),
    createParagraph(buildWritingHubStepSupportEn(hub, stage, 0)),
    createHeading('Step 2', 'h3'),
    createParagraph(step2),
    createParagraph(buildWritingHubStepSupportEn(hub, stage, 1)),
    createHeading('Step 3', 'h3'),
    createParagraph(step3),
    createParagraph(buildWritingHubStepSupportEn(hub, stage, 2)),
    createHeading('How to deepen this piece further'),
    createParagraph(buildWritingHubDepthEn(hub, stage)),
    createParagraph(buildWritingHubPackageEn(hub, stage)),
    createHeading('If submission, revision, or defense may come next'),
    createParagraph(article.submissionEn),
    createParagraph(
      `The earlier ${hub.evidenceEn} are turned into reusable explanations, the less likely the project is to rebuild its message from scratch in every later context.`,
    ),
    createHeading('The easiest trap to fall into'),
    createParagraph(article.riskEn),
    createHeading('Quick self-check'),
    createParagraph(check1),
    createParagraph(check2),
    createParagraph(check3),
    createHeading('What this round should leave you with'),
    createParagraph(article.deliverableEn),
    createParagraph(article.closeEn),
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
      for (const [degreeIndex, degree] of degrees.entries()) {
        const themeSeed = disciplineIndex * degrees.length + degreeIndex
        const zh = buildChinesePost(degree, discipline, stage, themeSeed)
        const en = buildEnglishPost(degree, discipline, stage, themeSeed)
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

  for (const hub of writingHubs) {
    for (const stage of stages) {
      const zh = buildWritingHubChinesePost(hub, stage)
      const en = buildWritingHubEnglishPost(hub, stage)

      if (!zh || !en) continue

      const publishedAt = new Date(startDate.getTime() + index * 24 * 60 * 60 * 1000).toISOString()

      posts.push({
        slug: `${hub.slug}-${hub.topicSlug}-${stage.slug}-guide`,
        categorySlug: hub.categorySlug,
        degreeSlug: hub.slug,
        disciplineSlug: hub.topicSlug,
        imageFilename: resolveWritingHubImageFilename(stage),
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
  content?: unknown
  id: number
  meta?: {
    description?: string | null
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
      locale: 'zh',
      pagination: false,
      select: {
        content: true,
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

  console.log(
    `[seed:seo] Preparing ${catalog.length} SEO articles across ${Object.keys(categoryLocaleLabels).length} content categories.`,
  )

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
  const relationSyncSlugs = new Set<string>()

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
        content: post.contentZh,
        id: created.id,
        meta: {
          description: post.metaDescriptionZh,
          title: post.metaTitleZh,
        },
        publishedAt: post.publishedAt,
        slug: post.slug,
        title: post.titleZh,
      })
      relationSyncSlugs.add(post.slug)

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
      existing.meta?.description !== post.metaDescriptionZh ||
      existing.publishedAt !== post.publishedAt ||
      serializeRichText(existing.content) !== serializeRichText(post.contentZh)
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
        content: post.contentZh,
        id: existing.id,
        meta: {
          description: post.metaDescriptionZh,
          title: post.metaTitleZh,
        },
        publishedAt: post.publishedAt,
        slug: post.slug,
        title: post.titleZh,
      })
      relationSyncSlugs.add(post.slug)
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
    if (!relationSyncSlugs.has(post.slug)) continue

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
