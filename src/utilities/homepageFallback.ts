import type { SiteLocale } from './siteLocale'

type LinkItem = {
  label: string
  url: string
}

type Metric = {
  label: string
  value: string
}

type Service = {
  description: string
  points: string[]
  title: string
}

type Mentor = {
  bio: string
  focus: string[]
  name: string
  title: string
}

type CaseStudy = {
  degree: string
  headline: string
  outcome: string
  topic: string
}

type ProcessStep = {
  description: string
  step: string
  title: string
}

type FAQItem = {
  answer: string
  question: string
}

export type HomepageFallback = {
  consultation: {
    buttonLabel: string
    description: string
    disclaimer: string
    title: string
  }
  cta: {
    description: string
    primary: LinkItem
    title: string
  }
  faqs: {
    items: FAQItem[]
    title: string
  }
  hero: {
    description: string
    links: LinkItem[]
    metricCaption: string
    metricTitle: string
    metrics: Metric[]
    pills: string[]
    title: string
  }
  mentors: {
    items: Mentor[]
    title: string
  }
  process: {
    items: ProcessStep[]
    title: string
  }
  services: {
    items: Service[]
    title: string
  }
  stories: {
    items: CaseStudy[]
    title: string
  }
}

const zhHomepage: HomepageFallback = {
  consultation: {
    buttonLabel: '提交咨询',
    description: '留下基础信息后，我们会根据学历、研究方向和当前进度，为你匹配更合适的辅导老师。',
    disclaimer: '我们只做论文辅导与学术支持，不代写、不出售论文。',
    title: '免费获取一对一论文辅导方案',
  },
  cta: {
    description: '告诉我们专业、截止时间和当前难点，我们会先帮你判断最值得优先处理的下一步。',
    primary: {
      label: '查看文章与指南',
      url: '/posts',
    },
    title: '想先判断自己卡在哪一步？',
  },
  faqs: {
    items: [
      {
        answer:
          '我们更偏向学术教练模式，会根据你的研究阶段安排选题、文献、方法、结构和修改建议，帮助你独立完成论文。',
        question: '你们和普通写作机构有什么区别？',
      },
      {
        answer:
          '可以。我们会在导师匹配前了解你的专业、学校要求、论文进度和目标，再安排更贴近方向的老师。',
        question: '可以匹配具体研究方向的老师吗？',
      },
      {
        answer:
          '支持。很多同学在开题、终稿冲刺、返修和答辩前来做短周期强化，我们会按时间节点重排重点任务。',
        question: '已经快截止了，还来得及吗？',
      },
      {
        answer:
          '支持中英文论文，常见场景包括毕业论文、期刊投稿、proposal、methodology 修订、答辩准备等。',
        question: '中英文论文都能辅导吗？',
      },
    ],
    title: '常见问题',
  },
  hero: {
    description:
      '面向本科、硕士、博士阶段的论文辅导服务，覆盖选题、结构、方法、返修与答辩准备。',
    links: [
      {
        label: '立即咨询',
        url: '#consultation',
      },
      {
        label: '查看服务',
        url: '#services',
      },
    ],
    metricCaption: '从开题到答辩，一站式梳理论文推进路径',
    metricTitle: '论文辅导与学术支持',
    metrics: [
      {
        label: '研究阶段拆解',
        value: '6 大环节',
      },
      {
        label: '适配学历层级',
        value: '本/硕/博',
      },
      {
        label: '语言支持',
        value: '中英辅导',
      },
    ],
    pills: ['论文开题', '框架搭建', '研究方法', '返修打磨', '模拟答辩'],
    title: '帮毕业生把论文难题拆成可以执行的步骤',
  },
  mentors: {
    items: [
      {
        bio: '适合需要重建论文结构、研究逻辑和阶段计划的同学，强调“每次沟通都有可交付结果”。',
        focus: ['开题报告', '研究设计', '论文结构'],
        name: '张教授',
        title: '管理学与教育研究导师',
      },
      {
        bio: '擅长帮助工程类和计算机方向学生梳理实验设计、数据分析路径与英文论文表达。',
        focus: ['实验方案', '结果分析', '英文写作'],
        name: '陈教授',
        title: '计算机与智能系统导师',
      },
      {
        bio: '更适合返修、盲审意见处理和答辩前冲刺，善于在有限时间内帮助学生聚焦关键修改点。',
        focus: ['返修意见', '答辩准备', '终稿打磨'],
        name: '王教授',
        title: '跨学科论文评阅与答辩指导',
      },
    ],
    title: '导师风格展示',
  },
  process: {
    items: [
      {
        description: '提交专业方向、学历层级、当前进度和最头疼的问题。',
        step: '01',
        title: '需求诊断',
      },
      {
        description: '结合研究方向与目标，匹配更适合的辅导老师和沟通节奏。',
        step: '02',
        title: '导师匹配',
      },
      {
        description: '拆成阶段目标、文献任务、写作计划和反馈节点。',
        step: '03',
        title: '方案制定',
      },
      {
        description: '按周推进，围绕论文文本、研究方法和答辩准备持续优化。',
        step: '04',
        title: '持续辅导',
      },
    ],
    title: '服务流程',
  },
  services: {
    items: [
      {
        description: '围绕选题、研究问题、理论基础和论文框架，帮助你把模糊想法落成可推进的方案。',
        points: ['适合卡在开题前', '明确研究边界', '梳理章节逻辑'],
        title: '开题与框架搭建',
      },
      {
        description: '聚焦文献综述、研究方法、数据分析和学术表达，补齐论文最容易失分的部分。',
        points: ['方法选择建议', '文献综述梳理', '中英文表达修订'],
        title: '写作与方法指导',
      },
      {
        description: '针对返修意见、预审反馈和答辩准备，提供短周期高强度冲刺支持。',
        points: ['盲审意见处理', '终稿润色', '模拟答辩'],
        title: '返修与答辩冲刺',
      },
    ],
    title: '核心服务',
  },
  stories: {
    items: [
      {
        degree: '硕士',
        headline: '从“题目太大”到稳定完成开题',
        outcome: '4 周完成研究边界收束与开题汇报',
        topic: '教育技术方向',
      },
      {
        degree: '博士',
        headline: '重做研究设计后顺利回应预审意见',
        outcome: '2 轮修改后通过学院预审',
        topic: '公共管理方向',
      },
      {
        degree: '本科',
        headline: '从不会写文献综述到形成完整初稿',
        outcome: '6 周建立论文写作节奏',
        topic: '计算机应用方向',
      },
    ],
    title: '学员案例',
  },
}

const enHomepage: HomepageFallback = {
  consultation: {
    buttonLabel: 'Request a plan',
    description:
      'Share your degree level, discipline, timeline, and current bottleneck. We will suggest a more suitable mentoring path.',
    disclaimer: 'This website focuses on academic coaching and thesis guidance. It does not provide ghostwriting.',
    title: 'Get a tailored thesis coaching plan',
  },
  cta: {
    description:
      'Tell us your discipline, deadline, and current bottleneck. We will suggest the next step and a more suitable mentoring path.',
    primary: {
      label: 'Read our guides',
      url: '/posts',
    },
    title: 'Want a clearer plan before you push the thesis forward?',
  },
  faqs: {
    items: [
      {
        answer:
          'We position the service as academic coaching. Students keep authorship and execution, while mentors help with structure, methods, revision priorities, and writing strategy.',
        question: 'How is this different from a generic writing agency?',
      },
      {
        answer:
          'Yes. Matching can be based on discipline, degree level, current stage, and your immediate research challenge.',
        question: 'Can the mentor match my research field?',
      },
      {
        answer:
          'Yes. Short-cycle support works especially well for proposal review, final revision, and pre-defense preparation.',
        question: 'Can this help when the deadline is already close?',
      },
      {
        answer:
          'Yes. We support both Chinese and English thesis work, including proposals, revisions, and defense preparation materials.',
        question: 'Does the site support bilingual content?',
      },
    ],
    title: 'Frequently asked questions',
  },
  hero: {
    description:
      'One-to-one thesis coaching for bachelor, master, and PhD students, covering proposal, structure, methods, revision, and defense prep.',
    links: [
      {
        label: 'Free consultation',
        url: '#consultation',
      },
      {
        label: 'Explore services',
        url: '#services',
      },
    ],
    metricCaption: 'A practical service site for thesis guidance and academic support',
    metricTitle: 'Thesis coaching for bachelor, master, and PhD students',
    metrics: [
      {
        label: 'research workflow stages',
        value: '6 key steps',
      },
      {
        label: 'degree levels supported',
        value: 'BA / MA / PhD',
      },
      {
        label: 'language support',
        value: 'Chinese + English',
      },
    ],
    pills: ['proposal', 'outline', 'methods', 'revision', 'defense prep'],
    title: 'Turn thesis pressure into a guided step-by-step process',
  },
  mentors: {
    items: [
      {
        bio: 'Ideal for students who need to rebuild research logic, chapter structure, and a realistic writing plan.',
        focus: ['proposal framing', 'research design', 'chapter logic'],
        name: 'Prof. Zhang',
        title: 'Management and education research mentor',
      },
      {
        bio: 'Strong fit for engineering and computing students who need help with experiments, analysis logic, and English paper structure.',
        focus: ['experiment design', 'results analysis', 'English writing'],
        name: 'Prof. Chen',
        title: 'Computing and intelligent systems mentor',
      },
      {
        bio: 'Best for revision rounds, review comments, and final defense preparation under tight timelines.',
        focus: ['review response', 'defense prep', 'final polishing'],
        name: 'Prof. Wang',
        title: 'Interdisciplinary thesis review and defense coaching',
      },
    ],
    title: 'Mentor showcase',
  },
  process: {
    items: [
      {
        description: 'Share your discipline, degree level, timeline, and the thesis issues slowing you down.',
        step: '01',
        title: 'Diagnosis',
      },
      {
        description: 'Match a mentor profile and working rhythm that fits your topic and goals.',
        step: '02',
        title: 'Mentor matching',
      },
      {
        description: 'Break the work into milestones, reading tasks, writing goals, and feedback checkpoints.',
        step: '03',
        title: 'Action plan',
      },
      {
        description: 'Keep iterating on the manuscript, methods, and defense readiness week by week.',
        step: '04',
        title: 'Ongoing support',
      },
    ],
    title: 'How it works',
  },
  services: {
    items: [
      {
        description:
          'Clarify research questions, theoretical framing, and chapter architecture so the thesis can move forward with less confusion.',
        points: ['proposal support', 'scope control', 'chapter architecture'],
        title: 'Proposal and structure building',
      },
      {
        description:
          'Strengthen literature review, methodology, analysis flow, and academic writing quality where students often feel stuck.',
        points: ['method choices', 'literature mapping', 'bilingual writing support'],
        title: 'Writing and methods coaching',
      },
      {
        description:
          'Provide high-intensity support for reviewer comments, pre-defense edits, and last-mile manuscript polishing.',
        points: ['revision planning', 'final polishing', 'mock defense'],
        title: 'Revision and defense sprint',
      },
    ],
    title: 'Core services',
  },
  stories: {
    items: [
      {
        degree: 'Master',
        headline: 'Narrowed an oversized topic into a workable proposal',
        outcome: 'Proposal stabilized within four weeks',
        topic: 'Educational technology',
      },
      {
        degree: 'PhD',
        headline: 'Reworked the research design and passed pre-review',
        outcome: 'Pre-review cleared after two focused revision rounds',
        topic: 'Public administration',
      },
      {
        degree: 'Bachelor',
        headline: 'Built a full first draft from a weak literature review base',
        outcome: 'Writing rhythm established in six weeks',
        topic: 'Computer applications',
      },
    ],
    title: 'Student outcomes',
  },
}

export const getHomepageFallback = (locale: SiteLocale): HomepageFallback => {
  return locale === 'en' ? enHomepage : zhHomepage
}

export const getDefaultHeaderNavigation = (locale: SiteLocale): LinkItem[] => {
  if (locale === 'en') {
    return [
      { label: 'Home', url: '/' },
      { label: 'Services', url: '/#services' },
      { label: 'Mentors', url: '/#mentors' },
      { label: 'Articles', url: '/posts' },
      { label: 'FAQ', url: '/#faq' },
    ]
  }

  return [
    { label: '首页', url: '/' },
    { label: '服务内容', url: '/#services' },
    { label: '导师展示', url: '/#mentors' },
    { label: '学术文章', url: '/posts' },
    { label: '常见问题', url: '/#faq' },
  ]
}

export const getDefaultFooterLinks = (locale: SiteLocale): LinkItem[] => {
  if (locale === 'en') {
    return [
      { label: 'Services', url: '/#services' },
      { label: 'Consultation', url: '/#consultation' },
      { label: 'Articles', url: '/posts' },
    ]
  }

  return [
    { label: '服务内容', url: '/#services' },
    { label: '免费咨询', url: '/#consultation' },
    { label: '学术文章', url: '/posts' },
  ]
}
