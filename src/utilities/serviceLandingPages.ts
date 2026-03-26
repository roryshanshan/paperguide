import type { AudienceCategorySlug } from '@/utilities/postTaxonomy'
import type { SiteLocale } from '@/utilities/siteLocale'

type ConsultationCopy = {
  buttonLabel: string
  description: string
  disclaimer: string
  title: string
}

type FocusCard = {
  cta: string
  label: string
  text: string
}

type FAQItem = {
  answer: string
  question: string
}

type ProcessStep = {
  description: string
  title: string
}

type ServiceLandingPageCopy = {
  audienceLabels: string[]
  breadcrumbLabel: string
  cards: FocusCard[]
  cardsIntro: string
  cardsTitle: string
  consultation: ConsultationCopy
  ctaAside: {
    links: Array<{
      href: string
      label: string
    }>
    points: string[]
    title: string
  }
  description: string
  faqTitle: string
  faqs: FAQItem[]
  h1: string
  heroPrimaryCtaLabel: string
  heroSecondaryCtaLabel: string
  intro: string
  navTitle: string
  pageTitle: string
  process: ProcessStep[]
  processIntro: string
  processTitle: string
  sectionLabel: string
  serviceLabel: string
  servicePoints: string[]
  serviceType: string
  summary: string
  title: string
}

type ServiceLandingPageDefinition = {
  copy: Record<SiteLocale, ServiceLandingPageCopy>
  path: string
  relatedCategorySlugs: AudienceCategorySlug[]
  relatedServiceSlugs: ServiceLandingPageSlug[]
  relatedSubjectSlugs: string[]
}

const card = (label: string, text: string, cta: string): FocusCard => ({
  cta,
  label,
  text,
})

const consultation = (
  title: string,
  description: string,
  buttonLabel: string,
  locale: SiteLocale,
): ConsultationCopy => ({
  buttonLabel,
  description,
  disclaimer:
    locale === 'en'
      ? 'Guidance only. This service does not provide ghostwriting.'
      : '只做辅导与指导，不代写、不出售论文。',
  title,
})

const faq = (question: string, answer: string): FAQItem => ({
  answer,
  question,
})

const processStep = (title: string, description: string): ProcessStep => ({
  description,
  title,
})

export const serviceLandingPageOrder = [
  'lunwen-fudao',
  'biyelunwen-fudao',
  'benke-lunwen-fudao',
  'shuoshi-lunwen-zhidao',
  'boshi-lunwen-fudao',
  'kaiti-baogao-zhidao',
  'wenxian-zongshu-zhidao',
  'lunwen-xiugai-zhidao',
  'lunwen-dabian-zhidao',
] as const

export const featuredServiceLandingPageSlugs = [
  'lunwen-fudao',
  'biyelunwen-fudao',
  'benke-lunwen-fudao',
  'shuoshi-lunwen-zhidao',
  'kaiti-baogao-zhidao',
  'lunwen-xiugai-zhidao',
] as const

export type ServiceLandingPageSlug = (typeof serviceLandingPageOrder)[number]

export const serviceLandingPages: Record<ServiceLandingPageSlug, ServiceLandingPageDefinition> = {
  'lunwen-fudao': {
    path: '/lunwen-fudao',
    relatedCategorySlugs: [
      'undergraduate-thesis',
      'masters-thesis',
      'doctoral-thesis',
      'research-topic-planning',
      'submission-defense-workflow',
    ],
    relatedServiceSlugs: [
      'biyelunwen-fudao',
      'shuoshi-lunwen-zhidao',
      'kaiti-baogao-zhidao',
      'lunwen-xiugai-zhidao',
    ],
    relatedSubjectSlugs: ['management', 'education', 'computer-science', 'law'],
    copy: {
      en: {
        audienceLabels: ['Undergraduate students', "Master's students", 'PhD students'],
        breadcrumbLabel: 'Thesis Coaching',
        cards: [
          card(
            'Undergraduate route',
            'Useful when the topic is still large, the review is weak, and the first full thesis draft has not yet stabilized.',
            '/benke-lunwen-fudao',
          ),
          card(
            "Master's route",
            'Best when theory, methods, data, and analysis exist but still do not align into one convincing line.',
            '/shuoshi-lunwen-zhidao',
          ),
          card(
            'Revision route',
            'Open this when the draft exists but the real bottleneck is blind review feedback, chapter consistency, or final defense pressure.',
            '/lunwen-xiugai-zhidao',
          ),
        ],
        cardsIntro:
          'This page is the main service hub. If you already know the exact stage, jump directly into the more specific service pages below.',
        cardsTitle: 'Start from the route that matches the current bottleneck',
        consultation: consultation(
          'Get a thesis coaching and guidance plan',
          'Share your degree level, discipline, deadline, and the chapter that is currently stuck. We will suggest a more suitable support route first.',
          'Request thesis coaching',
          'en',
        ),
        ctaAside: {
          links: [
            { href: '/posts', label: 'Browse article center' },
            { href: '/biyelunwen-fudao', label: 'Open graduation thesis support' },
          ],
          points: [
            'The next revision round becomes more focused instead of broader.',
            'Topic, review, methods, and revision order stop competing with one another.',
            'The draft becomes easier to explain under supervisor or defense pressure.',
          ],
          title: 'What usually improves first',
        },
        description:
          'PaperBridge provides thesis coaching and thesis guidance for undergraduate, master, and PhD students across proposal planning, literature review, methodology, revision, and defense preparation.',
        faqTitle: 'Common questions about thesis coaching',
        faqs: [
          faq(
            'Do you provide ghostwriting?',
            'No. The service focuses on diagnosis, revision strategy, explanation, and one-to-one academic guidance so the student can complete the paper independently.',
          ),
          faq(
            'What kinds of problems fit thesis guidance best?',
            'The most common cases involve topic narrowing, literature review structure, methodology choices, revision under deadline, and defense preparation.',
          ),
          faq(
            'Can you support bilingual papers?',
            'Yes. The site supports both Chinese and English thesis guidance, especially when structure, argument, and reviewer-style responses need to improve together.',
          ),
          faq(
            'How is the route usually matched?',
            'Usually by degree level, discipline, timeline, and the part of the draft that is currently stuck. The goal is to shorten the path to the next useful revision round.',
          ),
        ],
        h1: 'Thesis coaching and thesis guidance service',
        heroPrimaryCtaLabel: 'Get a guidance plan',
        heroSecondaryCtaLabel: 'Browse article center',
        intro:
          'This is the core entry page for readers searching for thesis coaching, thesis guidance, and one-to-one dissertation support. It is built for students who need a clearer next step, not another vague list of generic writing tips.',
        navTitle: 'Thesis coaching',
        pageTitle: 'Thesis Coaching and Guidance Service',
        process: [
          processStep(
            '1. Diagnose the actual problem',
            'Start from the real bottleneck: topic, review, methods, revision, or defense pressure.',
          ),
          processStep(
            '2. Match a focused route',
            'Use degree level, discipline, deadline, and a sample chapter to match the more suitable support page and revision path.',
          ),
          processStep(
            '3. Turn advice into chapter actions',
            'Translate guidance into revision priorities, reading tasks, and the next text changes that actually move the draft.',
          ),
          processStep(
            '4. Keep the process sustainable',
            'Use the article library and subject hubs as ongoing support instead of treating guidance as a one-off conversation.',
          ),
        ],
        processIntro:
          'The service route is built around the draft itself rather than around generic encouragement or isolated comments.',
        processTitle: 'How the service usually moves forward',
        sectionLabel: 'Service Page',
        serviceLabel: 'What the service usually covers',
        servicePoints: [
          'Proposal planning and narrowing an oversized topic',
          'Literature review structure and comparison logic',
          'Methodology justification and evidence presentation',
          'Revision strategy for blind review or supervisor feedback',
          'Defense preparation and response rehearsal',
          'Chinese and English thesis guidance under real deadlines',
        ],
        serviceType: 'Thesis coaching and thesis guidance',
        summary:
          'A main service landing page for thesis coaching, thesis guidance, and one-to-one academic support.',
        title: 'A stronger landing page for high-intent thesis support queries',
      },
      zh: {
        audienceLabels: ['本科生', '硕士生', '博士生'],
        breadcrumbLabel: '论文辅导',
        cards: [
          card(
            '本科路线',
            '适合题目偏大、综述还弱、第一版毕业论文总搭不起来的阶段。',
            '/benke-lunwen-fudao',
          ),
          card(
            '硕士路线',
            '更适合理论、方法、数据和分析材料都有了，但还没真正拧成一条主线的情况。',
            '/shuoshi-lunwen-zhidao',
          ),
          card(
            '修改路线',
            '如果稿子已经有了，但真正卡在盲审意见、章节一致性或答辩压力上，就从这里进入。',
            '/lunwen-xiugai-zhidao',
          ),
        ],
        cardsIntro:
          '这是总服务页。如果你已经知道自己更像哪一种卡点，可以直接进入下面更具体的服务页面。',
        cardsTitle: '先按真正卡住的位置进入',
        consultation: consultation(
          '获取论文辅导与论文指导方案',
          '留下学历、专业方向、时间节点和当前最卡的章节，我们会先判断更适合的支持路径。',
          '提交论文辅导需求',
          'zh',
        ),
        ctaAside: {
          links: [
            { href: '/posts', label: '浏览文章中心' },
            { href: '/biyelunwen-fudao', label: '查看毕业论文辅导页' },
          ],
          points: [
            '下一轮修改会更聚焦，而不是越改越散。',
            '选题、综述、方法和返修顺序不会再互相打架。',
            '整篇论文会更容易经得住导师和答辩追问。',
          ],
          title: '通常会先改善的地方',
        },
        description:
          'PaperBridge 提供面向本科、硕士、博士阶段的一对一论文辅导与论文指导服务，覆盖开题、文献综述、研究方法、返修修改和答辩准备，坚持学术支持边界，不代写。',
        faqTitle: '论文辅导常见问题',
        faqs: [
          faq(
            '你们会代写论文吗？',
            '不提供代写。我们的工作重点是诊断问题、解释逻辑、制定修改策略和一对一指导，帮助你独立完成论文。',
          ),
          faq(
            '哪些问题最适合做论文指导？',
            '最常见的是开题缩题、文献综述结构、方法论选择、盲审返修、答辩准备，以及时间很紧时的修改优先级判断。',
          ),
          faq(
            '中英文论文都能辅导吗？',
            '可以。网站同时支持中文和英文论文辅导，尤其适合结构、逻辑、表达和审稿式追问回应需要一起提升的情况。',
          ),
          faq(
            '论文辅导一般怎么匹配？',
            '通常会结合学历层级、研究方向、截止时间和当前卡住的章节来安排，目标是尽快进入下一轮真正有效的修改。',
          ),
        ],
        h1: '论文辅导与论文指导服务',
        heroPrimaryCtaLabel: '获取辅导方案',
        heroSecondaryCtaLabel: '查看文章中心',
        intro:
          '这是站内专门承接“论文辅导”“论文指导”“毕业论文辅导”等高意图搜索的核心服务页。它面向真正需要一对一支持的同学，不只是泛泛给建议，而是帮助你更快找到下一步该怎么改。',
        navTitle: '论文辅导',
        pageTitle: '论文辅导与论文指导服务',
        process: [
          processStep('1. 先诊断真正的问题', '先判断你到底卡在选题、综述、方法、返修还是答辩压力上。'),
          processStep(
            '2. 匹配更聚焦的路径',
            '结合学历、学科、截止时间和样稿状态，匹配更合适的服务页和修改顺序。',
          ),
          processStep(
            '3. 把建议落到章节动作上',
            '把建议拆成章节级动作、阅读清单和优先级，不让每次沟通都重新开始。',
          ),
          processStep(
            '4. 建立可持续的写作节奏',
            '再用文章库和学科导航做持续支持，而不是把辅导当成一次性解答。',
          ),
        ],
        processIntro:
          '这套服务路线围绕你的稿子推进，而不是只给泛泛鼓励或零散点评。',
        processTitle: '论文辅导一般怎么往前推',
        sectionLabel: '服务页',
        serviceLabel: '论文辅导通常覆盖这些场景',
        servicePoints: [
          '开题缩题与研究问题明确',
          '文献综述结构与文献比较逻辑',
          '研究方法选择、论证与结果表达',
          '盲审意见、导师反馈与返修优先级',
          '答辩准备、问答演练与终稿一致性',
          '中英文论文指导与截止前冲刺支持',
        ],
        serviceType: '论文辅导与论文指导',
        summary: '承接论文辅导、论文指导和一对一学术支持的核心服务页。',
        title: '把高意图服务词落到真正可转化的页面上',
      },
    },
  },
  'biyelunwen-fudao': {
    path: '/biyelunwen-fudao',
    relatedCategorySlugs: [
      'undergraduate-thesis',
      'masters-thesis',
      'structure-abstract-writing',
      'submission-defense-workflow',
    ],
    relatedServiceSlugs: [
      'lunwen-fudao',
      'benke-lunwen-fudao',
      'lunwen-xiugai-zhidao',
      'lunwen-dabian-zhidao',
    ],
    relatedSubjectSlugs: ['management', 'education', 'computer-science', 'design-studies'],
    copy: {
      en: {
        audienceLabels: ['Final-year students', 'Graduation project writers', 'Undergraduate and master students'],
        breadcrumbLabel: 'Graduation Thesis Support',
        cards: [
          card(
            'Topic still too broad',
            'Useful when the graduation thesis topic sounds acceptable on paper but still refuses to become feasible once chapters start.',
            '/kaiti-baogao-zhidao',
          ),
          card(
            'First full draft is unstable',
            'Open this when the draft exists but the review, structure, and methods still feel disconnected.',
            '/lunwen-xiugai-zhidao',
          ),
          card(
            'Need to finish under deadline',
            'Best when the bottleneck is not effort itself but the wrong revision order before final submission.',
            '/lunwen-dabian-zhidao',
          ),
        ],
        cardsIntro:
          'Graduation thesis support works best when the route matches the real stage: proposal, first draft, or final revision.',
        cardsTitle: 'Enter by the stage where the graduation thesis is stuck',
        consultation: consultation(
          'Get a graduation thesis support plan',
          'Share your degree level, current chapter, deadline, and what is blocking the graduation thesis from moving forward.',
          'Request graduation thesis support',
          'en',
        ),
        ctaAside: {
          links: [
            { href: '/lunwen-fudao', label: 'Back to main thesis coaching page' },
            { href: '/posts/category/undergraduate-thesis', label: 'Open undergraduate hub' },
          ],
          points: [
            'The revision order becomes clearer under deadline pressure.',
            'The gap between supervisor expectations and the draft becomes easier to read.',
            'The paper starts moving toward submission instead of staying in endless re-editing.',
          ],
          title: 'What this page usually helps first',
        },
        description:
          'A focused landing page for graduation thesis support, covering topic narrowing, first-draft stabilization, revision planning, final consistency, and defense preparation.',
        faqTitle: 'Common questions about graduation thesis support',
        faqs: [
          faq(
            'Do you write the graduation thesis for students?',
            'No. The service stays within diagnosis, revision planning, explanation, and ethical one-to-one support.',
          ),
          faq(
            'Who usually needs graduation thesis support most?',
            'Students who have entered the real writing stage, are under a deadline, and need help deciding what to fix first.',
          ),
          faq(
            'Can this help if the first draft already exists?',
            'Yes. In many cases the problem is not starting from zero but reorganizing the review, structure, methods, and final logic more efficiently.',
          ),
          faq(
            'Does this page fit both bachelor and master graduation theses?',
            'Yes, especially when the need is practical graduation support rather than long-term publication coaching.',
          ),
        ],
        h1: 'Graduation thesis support for final draft, revision, and defense pressure',
        heroPrimaryCtaLabel: 'Get graduation thesis help',
        heroSecondaryCtaLabel: 'Browse related articles',
        intro:
          'This page is built for users searching for graduation thesis support. The emphasis is on moving the thesis toward a workable submission route rather than collecting more disconnected writing advice.',
        navTitle: 'Graduation thesis support',
        pageTitle: 'Graduation Thesis Support',
        process: [
          processStep(
            '1. Clarify the deadline reality',
            'Start from the true calendar pressure, the required submission package, and the chapters that still cannot stand on their own.',
          ),
          processStep(
            '2. Reorder the revision queue',
            'Decide what must be fixed first: topic, review, methods, structure, final formatting, or defense logic.',
          ),
          processStep(
            '3. Stabilize the full draft',
            'Push the thesis toward one readable line so the final version does not feel like several drafts stitched together.',
          ),
          processStep(
            '4. Prepare for delivery and questions',
            'Use the same route to support final submission, slides, and likely defense questions.',
          ),
        ],
        processIntro:
          'Graduation-stage support works when the service follows the final workflow rather than treating every chapter equally.',
        processTitle: 'How graduation thesis support usually runs',
        sectionLabel: 'Service Page',
        serviceLabel: 'What graduation thesis support usually handles',
        servicePoints: [
          'Narrowing the final topic and adjusting chapter scope',
          'Stabilizing the literature review and section transitions',
          'Restructuring methods and results for a complete draft',
          'Sorting supervisor feedback into a useful revision queue',
          'Final consistency check before submission',
          'Defense preparation close to the deadline',
        ],
        serviceType: 'Graduation thesis support',
        summary:
          'A service page for graduation thesis support under real submission, revision, and defense pressure.',
        title: 'A page designed for the graduation-stage writing bottleneck',
      },
      zh: {
        audienceLabels: ['毕业年学生', '毕业论文写作者', '本科与硕士阶段'],
        breadcrumbLabel: '毕业论文辅导',
        cards: [
          card(
            '题目还是太大',
            '适合题目听起来没问题，但一写正文就发现边界散、可行性弱的情况。',
            '/kaiti-baogao-zhidao',
          ),
          card(
            '初稿总稳不住',
            '如果已经有一版稿子，但综述、结构和方法总对不上，可以先走这条路线。',
            '/lunwen-xiugai-zhidao',
          ),
          card(
            '临近提交不会排优先级',
            '更适合真正的问题不是“不努力”，而是截止前总在错误顺序里来回改。',
            '/lunwen-dabian-zhidao',
          ),
        ],
        cardsIntro:
          '毕业论文辅导最怕的是阶段判断错。先分清现在更像开题、初稿还是定稿，推进速度会快很多。',
        cardsTitle: '先按毕业论文真正卡住的阶段进入',
        consultation: consultation(
          '获取毕业论文辅导方案',
          '留下学历、当前章节、截止时间和最卡的地方，我们先帮你判断毕业论文该怎么往前推。',
          '提交毕业论文需求',
          'zh',
        ),
        ctaAside: {
          links: [
            { href: '/lunwen-fudao', label: '返回总服务页' },
            { href: '/posts/category/undergraduate-thesis', label: '查看本科论文文章库' },
          ],
          points: [
            '截止前的修改顺序会更清楚。',
            '导师要求和现有稿子的差距会更容易看懂。',
            '论文会开始往“可提交”推进，而不是一直原地重写。',
          ],
          title: '这类页面通常先帮到哪里',
        },
        description:
          '毕业论文辅导页，重点处理开题定边界、初稿稳结构、返修排优先级、终稿一致性和答辩准备，适合真正处在毕业节点上的写作需求。',
        faqTitle: '毕业论文辅导常见问题',
        faqs: [
          faq(
            '你们会替学生写毕业论文吗？',
            '不会。服务边界仍然是诊断、解释、修改路线和一对一辅导，不提供代写。',
          ),
          faq(
            '什么样的人最适合做毕业论文辅导？',
            '已经进入真实写作阶段、又有明确提交节点，但不知道先改哪里的同学最适合。',
          ),
          faq(
            '已经有初稿了，还适合做毕业论文辅导吗？',
            '很适合。很多问题并不是从零开始，而是要把综述、结构、方法和终稿逻辑重新排顺。',
          ),
          faq(
            '本科和硕士毕业论文都适合吗？',
            '适合，尤其是你现在更需要“毕业节点上的实战支持”，而不是长期投稿规划的时候。',
          ),
        ],
        h1: '毕业论文辅导，围绕初稿、返修和答辩压力往前推',
        heroPrimaryCtaLabel: '获取毕业论文方案',
        heroSecondaryCtaLabel: '查看相关文章',
        intro:
          '这个页面专门承接“毕业论文辅导”这类搜索。重点不是再给一堆零散写作建议，而是帮助你把毕业论文真正推到能提交、能答辩的路径上。',
        navTitle: '毕业论文辅导',
        pageTitle: '毕业论文辅导',
        process: [
          processStep('1. 先看清毕业时间线', '先把提交节点、材料要求和当前最站不住的章节看清楚。'),
          processStep(
            '2. 重排修改队列',
            '判断先改题目、综述、方法、结构、格式还是答辩逻辑，不让所有问题同时压上来。',
          ),
          processStep(
            '3. 把整篇稿子稳住',
            '让论文从多版拼接感里走出来，真正形成一条可读、可讲、可提交的主线。',
          ),
          processStep(
            '4. 连到提交与答辩',
            '把同一条修改路径继续延伸到终稿提交、PPT 和高频答辩问题上。',
          ),
        ],
        processIntro:
          '毕业论文阶段最有效的支持，不是平均改每一章，而是顺着最终交付流程把关键节点压稳。',
        processTitle: '毕业论文辅导一般怎么推进',
        sectionLabel: '服务页',
        serviceLabel: '毕业论文辅导通常处理这些问题',
        servicePoints: [
          '终稿前重新收紧题目与章节范围',
          '把文献综述和章节转场重新稳住',
          '整理方法、结果和分析，让初稿更完整',
          '把导师意见拆成可执行的返修顺序',
          '提交前做终稿一致性检查',
          '截止前衔接答辩准备与问答演练',
        ],
        serviceType: '毕业论文辅导',
        summary: '面向毕业节点的毕业论文辅导页，适合初稿、返修、定稿和答辩阶段。',
        title: '给毕业节点用户的高意图服务页',
      },
    },
  },
  'benke-lunwen-fudao': {
    path: '/benke-lunwen-fudao',
    relatedCategorySlugs: [
      'undergraduate-thesis',
      'research-topic-planning',
      'literature-reading-review',
      'structure-abstract-writing',
    ],
    relatedServiceSlugs: [
      'lunwen-fudao',
      'biyelunwen-fudao',
      'kaiti-baogao-zhidao',
      'wenxian-zongshu-zhidao',
    ],
    relatedSubjectSlugs: ['management', 'education', 'design-studies', 'computer-science'],
    copy: {
      en: {
        audienceLabels: ['Undergraduate students', 'First thesis writers', 'Final-year bachelor students'],
        breadcrumbLabel: 'Undergraduate Thesis Support',
        cards: [
          card(
            'Topic still vague',
            'Useful when the undergraduate topic sounds acceptable but becomes too wide or too empty as soon as the outline begins.',
            '/kaiti-baogao-zhidao',
          ),
          card(
            'Review does not become writing',
            'Best when sources have been read but the literature review still feels like note stacking rather than a real section.',
            '/wenxian-zongshu-zhidao',
          ),
          card(
            'Structure keeps collapsing',
            'Open this when the chapters exist, but paragraph order, section boundaries, and introduction logic still do not hold together.',
            '/biyelunwen-fudao',
          ),
        ],
        cardsIntro:
          "Undergraduate thesis support is usually less about extreme depth and more about helping the student build a workable writing route for the first full paper.",
        cardsTitle: 'The most common undergraduate thesis bottlenecks',
        consultation: consultation(
          'Get an undergraduate thesis support plan',
          'Share your major, topic direction, current draft stage, and deadline. We will suggest the more suitable undergraduate thesis support route.',
          'Request undergraduate thesis support',
          'en',
        ),
        ctaAside: {
          links: [
            { href: '/posts/category/undergraduate-thesis', label: 'Open undergraduate library' },
            { href: '/kaiti-baogao-zhidao', label: 'Open proposal support page' },
          ],
          points: [
            'The topic becomes easier to answer within the real assignment boundary.',
            'The literature review starts feeding the paper instead of remaining separate reading notes.',
            'The first full draft becomes readable enough to revise rather than rewrite from zero.',
          ],
          title: 'What usually improves first',
        },
        description:
          'A dedicated page for undergraduate thesis support, focusing on topic narrowing, literature review basics, chapter structure, first-draft building, and graduation-stage revision.',
        faqTitle: 'Common questions about undergraduate thesis support',
        faqs: [
          faq(
            'Is undergraduate thesis support only for weak students?',
            'No. Many requests come from students who are serious but are writing a full academic paper for the first time and need a clearer route.',
          ),
          faq(
            'What matters most at the undergraduate stage?',
            'The practical priorities are usually topic feasibility, review structure, chapter order, and a draft that can actually be revised.',
          ),
          faq(
            'Can this help if the assignment is not highly theoretical?',
            'Yes. Undergraduate support often works best for applied topics, case-based writing, and papers that need clearer academic structure rather than extreme theoretical novelty.',
          ),
          faq(
            'Do you help with both Chinese and English undergraduate theses?',
            'Yes, especially when the student needs stronger structure, wording, and defense logic rather than ghostwriting.',
          ),
        ],
        h1: 'Undergraduate thesis support for topic, review, structure, and first draft',
        heroPrimaryCtaLabel: 'Get undergraduate thesis help',
        heroSecondaryCtaLabel: 'Browse undergraduate articles',
        intro:
          'This page is designed for queries such as undergraduate thesis support. It is especially useful for students facing their first full academic paper and needing a clearer route from topic to final draft.',
        navTitle: 'Undergraduate thesis support',
        pageTitle: 'Undergraduate Thesis Support',
        process: [
          processStep(
            '1. Turn the assignment into a workable topic',
            'Translate a broad course or major requirement into one answerable topic with a realistic scope.',
          ),
          processStep(
            '2. Build the review and outline together',
            'Use reading notes to support the paper structure instead of treating review and structure as unrelated tasks.',
          ),
          processStep(
            '3. Push the first draft into shape',
            'Stabilize chapter order, paragraph roles, and evidence use so the full thesis becomes revisable.',
          ),
          processStep(
            '4. Prepare the paper for submission',
            'Finish with final adjustments for supervisor feedback, formatting, and defense basics.',
          ),
        ],
        processIntro:
          'At the undergraduate stage, a good route usually matters more than sophisticated vocabulary or inflated novelty claims.',
        processTitle: 'How undergraduate thesis support usually works',
        sectionLabel: 'Service Page',
        serviceLabel: 'What undergraduate thesis support usually covers',
        servicePoints: [
          'Topic narrowing under real assignment limits',
          'Literature review basics that actually feed the paper',
          'Introduction, chapter, and paragraph structure',
          'Methods and evidence expressed at an undergraduate level',
          'First-draft building and revision order',
          'Graduation submission and defense basics',
        ],
        serviceType: 'Undergraduate thesis support',
        summary:
          'A focused service page for undergraduate thesis support, especially topic, review, structure, and first-draft pressure.',
        title: 'A degree-specific page for undergraduate thesis writing pressure',
      },
      zh: {
        audienceLabels: ['本科生', '第一次完整写论文的人', '毕业年学生'],
        breadcrumbLabel: '本科论文辅导',
        cards: [
          card(
            '题目还是很虚',
            '适合题目听起来能做，但一到列提纲就发现边界太大、问题太空的情况。',
            '/kaiti-baogao-zhidao',
          ),
          card(
            '看了文献还是写不出综述',
            '更适合资料已经看了不少，但综述部分还是像读书笔记堆叠，写不成论文正文的时候。',
            '/wenxian-zongshu-zhidao',
          ),
          card(
            '结构总撑不住',
            '如果章节有了，但段落顺序、章节分工和引言逻辑总稳不下来，可以先看这条路线。',
            '/biyelunwen-fudao',
          ),
        ],
        cardsIntro:
          '本科论文辅导往往不是追求“特别深”，而是先帮你建立一条能写得出来、能改得下去的完整路线。',
        cardsTitle: '本科论文最常见的几个卡点',
        consultation: consultation(
          '获取本科论文辅导方案',
          '留下专业、题目方向、当前进度和截止时间，我们会先判断更适合的本科论文支持路径。',
          '提交本科论文需求',
          'zh',
        ),
        ctaAside: {
          links: [
            { href: '/posts/category/undergraduate-thesis', label: '查看本科论文文章库' },
            { href: '/kaiti-baogao-zhidao', label: '查看开题指导页' },
          ],
          points: [
            '题目会更容易落到真实作业范围里。',
            '文献综述会开始真正服务正文，而不是停留在摘录。',
            '第一版完整初稿会变得可改，而不是一直写不成型。',
          ],
          title: '通常先改善的地方',
        },
        description:
          '本科论文辅导页，重点解决选题定边界、文献综述写不出来、章节结构不稳、初稿难成型和毕业节点返修等高频问题。',
        faqTitle: '本科论文辅导常见问题',
        faqs: [
          faq(
            '本科论文辅导是不是只适合基础差的同学？',
            '不是。很多需求来自认真准备、但第一次完整写学术论文，不知道怎么走完整路线的同学。',
          ),
          faq(
            '本科阶段最重要的到底是什么？',
            '通常不是堆很多高级概念，而是把题目可行性、综述结构、章节顺序和可修改的初稿先做出来。',
          ),
          faq(
            '偏应用型、案例型的本科论文也适合吗？',
            '适合。本科论文很多场景并不追求极强理论创新，而更需要清楚、规范、能成立的学术表达。',
          ),
          faq(
            '中英文本科论文都可以辅导吗？',
            '可以，尤其适合需要强化结构、表达、答辩逻辑，但不触碰代写边界的需求。',
          ),
        ],
        h1: '本科论文辅导，重点稳住选题、综述、结构和初稿',
        heroPrimaryCtaLabel: '获取本科论文方案',
        heroSecondaryCtaLabel: '查看本科文章库',
        intro:
          '这个页面专门承接“本科论文辅导”这类搜索，尤其适合第一次完整写毕业论文、需要从题目到初稿建立清晰路线的同学。',
        navTitle: '本科论文辅导',
        pageTitle: '本科论文辅导',
        process: [
          processStep('1. 把作业要求翻成可做的题目', '先把课程、专业或毕业要求压成一个真正可回答的问题。'),
          processStep(
            '2. 综述和提纲一起搭',
            '让阅读笔记直接服务论文结构，而不是把综述和正文提纲分成两套平行任务。',
          ),
          processStep(
            '3. 把初稿推成型',
            '稳住章节顺序、段落分工和证据使用，让整篇论文从“零散想法”变成可修改稿。',
          ),
          processStep(
            '4. 连到终稿与答辩',
            '最后再把导师反馈、格式细节和基础答辩准备一起接上。',
          ),
        ],
        processIntro:
          '本科阶段最需要的往往不是复杂术语，而是一条真正能把论文写完的路径。',
        processTitle: '本科论文辅导一般怎么推进',
        sectionLabel: '服务页',
        serviceLabel: '本科论文辅导通常覆盖这些问题',
        servicePoints: [
          '在真实作业边界里重新缩题',
          '把文献阅读变成真正可写的综述',
          '稳住引言、章节和段落结构',
          '用本科阶段能站住的方式写方法与材料',
          '推进第一版完整初稿和返修顺序',
          '衔接毕业提交与基础答辩准备',
        ],
        serviceType: '本科论文辅导',
        summary: '面向本科阶段的论文辅导页，重点解决选题、综述、结构和初稿难题。',
        title: '面向本科写作压力的学历型服务页',
      },
    },
  },
  'shuoshi-lunwen-zhidao': {
    path: '/shuoshi-lunwen-zhidao',
    relatedCategorySlugs: [
      'masters-thesis',
      'methods-data-presentation',
      'submission-defense-workflow',
      'academic-voice-argument',
    ],
    relatedServiceSlugs: [
      'lunwen-fudao',
      'biyelunwen-fudao',
      'lunwen-xiugai-zhidao',
      'boshi-lunwen-fudao',
    ],
    relatedSubjectSlugs: ['management', 'economics', 'public-administration', 'data-science'],
    copy: {
      en: {
        audienceLabels: ["Master's students", 'Empirical thesis writers', 'Students facing blind review'],
        breadcrumbLabel: "Master's Thesis Guidance",
        cards: [
          card(
            'The theory-method line is weak',
            'Useful when the concepts sound acceptable separately but do not yet support one empirical design.',
            '/kaiti-baogao-zhidao',
          ),
          card(
            'Results exist but do not persuade',
            'Open this when the real problem is not data shortage but weak explanation, evidence order, and chapter logic.',
            '/lunwen-xiugai-zhidao',
          ),
          card(
            'Need a stronger review and contribution line',
            'Best when the master-level draft has material but still cannot show what it adds.',
            '/wenxian-zongshu-zhidao',
          ),
        ],
        cardsIntro:
          "Master's thesis guidance usually sits between coursework writing and publication-level pressure. The key is to align methods, evidence, and contribution more tightly.",
        cardsTitle: "Common master's thesis bottlenecks",
        consultation: consultation(
          "Get a master's thesis guidance plan",
          'Share your discipline, empirical design, current chapter, and whether the current pressure comes from supervisor feedback, blind review, or final defense.',
          "Request master's thesis guidance",
          'en',
        ),
        ctaAside: {
          links: [
            { href: '/posts/category/masters-thesis', label: "Open master's thesis library" },
            { href: '/lunwen-xiugai-zhidao', label: 'Open revision support page' },
          ],
          points: [
            'The argument line becomes more persuasive at the chapter level.',
            'Methods and evidence are explained in a way that supports the actual research question.',
            'Blind review or supervisor feedback becomes easier to sort into a real revision queue.',
          ],
          title: "What master's thesis guidance often improves first",
        },
        description:
          "A page for master's thesis guidance, focusing on theory-method alignment, empirical design, chapter-level analysis, revision planning, and defense preparation.",
        faqTitle: "Common questions about master's thesis guidance",
        faqs: [
          faq(
            'Does this help only empirical dissertations?',
            'No, but it is especially helpful when the thesis needs a stronger connection among theory, evidence, and chapter logic.',
          ),
          faq(
            "What is the biggest difference between undergraduate and master's guidance?",
            'Master-level writing often needs a clearer analytical line, more defensible methods, and better explanation of why the research matters.',
          ),
          faq(
            'Can this help with blind review revision?',
            'Yes. Many master-level requests involve reorganizing reviewer or supervisor feedback into a sharper revision order.',
          ),
          faq(
            'Is publication guidance included here?',
            'The page focuses first on the thesis itself, but it also helps when the draft may later become a paper submission.',
          ),
        ],
        h1: "Master's thesis guidance for methods, analysis, revision, and defense",
        heroPrimaryCtaLabel: "Get master's thesis help",
        heroSecondaryCtaLabel: "Browse master's articles",
        intro:
          "This page is built for users searching for master's thesis guidance. It is especially relevant when the draft already contains material but still lacks a convincing analytical line.",
        navTitle: "Master's thesis guidance",
        pageTitle: "Master's Thesis Guidance",
        process: [
          processStep(
            '1. Re-read the real contribution line',
            'Clarify what the thesis is actually trying to explain or test instead of editing isolated chapters first.',
          ),
          processStep(
            '2. Align theory, method, and data',
            'Make sure the framework, design, and evidence answer the same question rather than sitting beside one another.',
          ),
          processStep(
            '3. Strengthen chapter-level persuasion',
            'Use revision rounds to sharpen the review, methods, results, and discussion as one argument.',
          ),
          processStep(
            '4. Prepare for review and defense',
            'Connect the same route to supervisor feedback, blind review responses, and defense explanation.',
          ),
        ],
        processIntro:
          "Master's-level support is usually strongest when the service can move from chapter fixes to one connected argument line.",
        processTitle: "How master's thesis guidance usually works",
        sectionLabel: 'Service Page',
        serviceLabel: "What master's thesis guidance usually covers",
        servicePoints: [
          'Clarifying the analytical line and research contribution',
          'Aligning theory, design, variables, and evidence',
          'Restructuring literature review and chapter argument',
          'Explaining methods and results more persuasively',
          'Sorting blind review and supervisor feedback',
          'Preparing the thesis for defense and later paper conversion',
        ],
        serviceType: "Master's thesis guidance",
        summary:
          "A service page for master's thesis guidance with emphasis on methods, analysis, revision, and defense readiness.",
        title: "A stronger page for master's dissertation intent",
      },
      zh: {
        audienceLabels: ['硕士生', '实证型论文写作者', '盲审与返修阶段学生'],
        breadcrumbLabel: '硕士论文指导',
        cards: [
          card(
            '理论和方法还没对上',
            '适合概念看起来都没问题，但放到同一个研究设计里就彼此支撑不起来的情况。',
            '/kaiti-baogao-zhidao',
          ),
          card(
            '结果有了但说服力不强',
            '如果真正的问题不是没数据，而是解释薄、证据顺序乱、章节逻辑散，可以先走这条路线。',
            '/lunwen-xiugai-zhidao',
          ),
          card(
            '综述和贡献线不够清楚',
            '更适合材料不少，但还说不清你的研究到底补了什么、为什么值得做的时候。',
            '/wenxian-zongshu-zhidao',
          ),
        ],
        cardsIntro:
          '硕士论文指导处在“不是纯课程作业、又还没完全进入发表逻辑”的中间地带，关键是把方法、证据和研究贡献拧得更紧。',
        cardsTitle: '硕士论文最常见的几个卡点',
        consultation: consultation(
          '获取硕士论文指导方案',
          '留下学科方向、研究设计、当前章节，以及现在的压力更像导师反馈、盲审返修还是答辩准备。',
          '提交硕士论文需求',
          'zh',
        ),
        ctaAside: {
          links: [
            { href: '/posts/category/masters-thesis', label: '查看研究生论文文章库' },
            { href: '/lunwen-xiugai-zhidao', label: '查看论文修改指导页' },
          ],
          points: [
            '章节层面的论证会更有说服力。',
            '方法和证据会更贴合真正的研究问题。',
            '盲审或导师反馈更容易整理成一条有效返修路线。',
          ],
          title: '硕士论文指导通常先改善哪里',
        },
        description:
          '硕士论文指导页，重点解决理论与方法对不齐、实证设计说服力不足、章节分析线不清、盲审返修难排顺序和答辩准备等问题。',
        faqTitle: '硕士论文指导常见问题',
        faqs: [
          faq(
            '硕士论文指导只适合实证型论文吗？',
            '不是，但它尤其适合需要把理论、证据和章节逻辑真正连起来的论文。',
          ),
          faq(
            '硕士论文和本科论文指导最大的区别是什么？',
            '硕士阶段更强调分析主线、方法可辩护性，以及研究为什么值得做，而不仅仅是把论文写完整。',
          ),
          faq(
            '盲审返修适合在这里处理吗？',
            '很适合。很多硕士阶段需求本质上就是把盲审或导师意见重新排成一条可执行返修队列。',
          ),
          faq(
            '这里会兼顾后续投稿吗？',
            '会先把学位论文本身处理好，但如果后续有投稿计划，这条路线也能为后面转论文打基础。',
          ),
        ],
        h1: '硕士论文指导，重点处理方法、分析、返修与答辩',
        heroPrimaryCtaLabel: '获取硕士论文方案',
        heroSecondaryCtaLabel: '查看研究生文章库',
        intro:
          '这个页面专门承接“硕士论文指导”这类搜索，尤其适合材料已经不少，但整篇稿子还没有形成清楚分析主线的情况。',
        navTitle: '硕士论文指导',
        pageTitle: '硕士论文指导',
        process: [
          processStep('1. 重新看清研究贡献线', '先看清论文到底要解释什么、证明什么，而不是一上来就零散修章节。'),
          processStep(
            '2. 把理论、方法和数据对齐',
            '让理论框架、研究设计和证据回答的是同一个问题，而不是各说各话。',
          ),
          processStep(
            '3. 强化章节级说服力',
            '通过一轮轮返修，把综述、方法、结果和讨论真正改成一条完整论证。',
          ),
          processStep(
            '4. 接到评审与答辩',
            '把同一条路径继续延伸到导师反馈、盲审回应和答辩表达中。',
          ),
        ],
        processIntro:
          '硕士阶段最有效的支持，往往是把“分散修章节”推进成“一条完整分析线”。',
        processTitle: '硕士论文指导一般怎么推进',
        sectionLabel: '服务页',
        serviceLabel: '硕士论文指导通常覆盖这些问题',
        servicePoints: [
          '理清研究问题和分析主线',
          '对齐理论框架、研究设计、变量与证据',
          '重组综述与章节论证结构',
          '增强方法说明和结果表达的说服力',
          '整理盲审与导师意见的返修顺序',
          '衔接答辩与后续转投稿的准备',
        ],
        serviceType: '硕士论文指导',
        summary: '面向硕士阶段的论文指导页，重点处理方法、分析、返修和答辩准备。',
        title: '承接硕士学位论文意图词的服务页',
      },
    },
  },
  'boshi-lunwen-fudao': {
    path: '/boshi-lunwen-fudao',
    relatedCategorySlugs: [
      'doctoral-thesis',
      'academic-voice-argument',
      'global-publishing-peer-review',
      'submission-defense-workflow',
    ],
    relatedServiceSlugs: [
      'lunwen-fudao',
      'shuoshi-lunwen-zhidao',
      'lunwen-xiugai-zhidao',
      'lunwen-dabian-zhidao',
    ],
    relatedSubjectSlugs: ['economics', 'law', 'artificial-intelligence', 'biology'],
    copy: {
      en: {
        audienceLabels: ['PhD students', 'Doctoral dissertation writers', 'Pre-defense researchers'],
        breadcrumbLabel: 'PhD Dissertation Support',
        cards: [
          card(
            'Contribution still feels blurry',
            'Useful when the dissertation contains chapters and evidence but still cannot state clearly what the work contributes.',
            '/wenxian-zongshu-zhidao',
          ),
          card(
            'Chapters do not form one argument',
            'Open this when each chapter seems acceptable alone but the dissertation still lacks one defensible line from start to finish.',
            '/lunwen-xiugai-zhidao',
          ),
          card(
            'Need stronger pre-defense response',
            'Best when the draft is close to completion but the pressure now comes from committee questions, originality claims, and final defense framing.',
            '/lunwen-dabian-zhidao',
          ),
        ],
        cardsIntro:
          'PhD dissertation support is usually less about finishing a text and more about making the research contribution legible, defensible, and chapter-consistent.',
        cardsTitle: 'Where doctoral dissertation support usually begins',
        consultation: consultation(
          'Get a PhD dissertation support plan',
          'Share your discipline, dissertation stage, the chapters that already exist, and the pressure point that feels most risky right now.',
          'Request PhD dissertation support',
          'en',
        ),
        ctaAside: {
          links: [
            { href: '/posts/category/doctoral-thesis', label: 'Open doctoral thesis library' },
            { href: '/lunwen-dabian-zhidao', label: 'Open defense support page' },
          ],
          points: [
            'The contribution claim becomes clearer and more repeatable.',
            'Chapter logic starts supporting one dissertation-level argument.',
            'Pre-defense and reviewer-style questions become easier to anticipate.',
          ],
          title: 'What doctoral dissertation support often improves first',
        },
        description:
          'A service page for PhD dissertation support, focusing on contribution framing, chapter-level coherence, revision under pre-defense pressure, and stronger response logic.',
        faqTitle: 'Common questions about PhD dissertation support',
        faqs: [
          faq(
            'What is the hardest part at the doctoral stage?',
            'Often it is not simply volume but clarifying contribution, unifying chapters, and defending the logic of the whole dissertation.',
          ),
          faq(
            'Can this page help when the dissertation already has several completed chapters?',
            'Yes. Many doctoral requests focus on turning multiple chapter drafts into one coherent dissertation argument.',
          ),
          faq(
            'Does this fit publication-oriented doctoral work too?',
            'Yes, especially when the student needs to connect dissertation logic with peer-review style expectations.',
          ),
          faq(
            'Is the service only for final defense?',
            'No. It is also useful much earlier when the doctoral project needs stronger contribution framing and chapter coordination.',
          ),
        ],
        h1: 'PhD dissertation support for contribution, chapter logic, revision, and defense',
        heroPrimaryCtaLabel: 'Get doctoral dissertation help',
        heroSecondaryCtaLabel: 'Browse doctoral articles',
        intro:
          'This page serves users searching for PhD dissertation support. It is designed for higher-pressure writing situations where originality, chapter coherence, and defense logic all matter together.',
        navTitle: 'PhD dissertation support',
        pageTitle: 'PhD Dissertation Support',
        process: [
          processStep(
            '1. Restate the dissertation-level contribution',
            'Clarify what the whole dissertation contributes before polishing isolated sections too early.',
          ),
          processStep(
            '2. Reconnect the chapters',
            'Make sure each chapter supports one larger question instead of competing for its own separate center.',
          ),
          processStep(
            '3. Tighten revision and response logic',
            'Use revision rounds to anticipate reviewer, committee, or supervisor-style objections more clearly.',
          ),
          processStep(
            '4. Prepare for defense pressure',
            'Translate the dissertation logic into explanations, chapter transitions, and defense responses that can stand under questioning.',
          ),
        ],
        processIntro:
          'At the doctoral stage, a strong route must keep contribution, coherence, and defensibility moving together.',
        processTitle: 'How PhD dissertation support usually works',
        sectionLabel: 'Service Page',
        serviceLabel: 'What PhD dissertation support usually covers',
        servicePoints: [
          'Clarifying the dissertation-level contribution',
          'Unifying chapter logic and transitions',
          'Strengthening literature position and argument language',
          'Revising results, discussion, and originality claims',
          'Preparing pre-defense and committee responses',
          'Linking dissertation work with publication expectations',
        ],
        serviceType: 'PhD dissertation support',
        summary:
          'A high-intent service page for PhD dissertation support, focused on contribution, coherence, revision, and defense readiness.',
        title: 'A page built for doctoral-level writing pressure',
      },
      zh: {
        audienceLabels: ['博士生', '博士学位论文写作者', '预答辩阶段研究者'],
        breadcrumbLabel: '博士论文辅导',
        cards: [
          card(
            '研究贡献还是说不清',
            '适合章节和材料都有了，但整篇博士论文到底贡献了什么，始终说不够清楚的情况。',
            '/wenxian-zongshu-zhidao',
          ),
          card(
            '章节之间还没连成一条线',
            '如果每章单看都还行，但拼在一起仍然不像一篇完整博士论文，就从这里进入。',
            '/lunwen-xiugai-zhidao',
          ),
          card(
            '预答辩和委员会追问压力大',
            '更适合正文接近完成，但现在最大的风险来自原创性表述、预答辩提问和最终陈述框架。',
            '/lunwen-dabian-zhidao',
          ),
        ],
        cardsIntro:
          '博士论文辅导往往不只是“把字写完”，而是让研究贡献、章节逻辑和可辩护性一起站住。',
        cardsTitle: '博士论文辅导通常从这些地方切入',
        consultation: consultation(
          '获取博士论文辅导方案',
          '留下学科方向、论文阶段、现有章节和你最担心的风险点，我们先判断博士论文该怎样推进更稳。',
          '提交博士论文需求',
          'zh',
        ),
        ctaAside: {
          links: [
            { href: '/posts/category/doctoral-thesis', label: '查看博士论文文章库' },
            { href: '/lunwen-dabian-zhidao', label: '查看论文答辩指导页' },
          ],
          points: [
            '研究贡献的表述会更清楚、更可复述。',
            '章节逻辑会开始真正服务整篇学位论文主线。',
            '预答辩和评审式追问会更容易提前预判。',
          ],
          title: '博士论文辅导通常先改善哪里',
        },
        description:
          '博士论文辅导页，重点处理研究贡献表达、章节逻辑统一、预答辩压力下的返修路线，以及更强的答辩与回应逻辑。',
        faqTitle: '博士论文辅导常见问题',
        faqs: [
          faq(
            '博士阶段最难的到底是什么？',
            '很多时候不是单纯字数多，而是要把研究贡献讲清、章节拧成一条线，并且能经得住整体追问。',
          ),
          faq(
            '已经写出好几章了，还适合做博士论文辅导吗？',
            '很适合。很多博士阶段需求正是要把多章草稿真正改造成一篇统一的学位论文。',
          ),
          faq(
            '有投稿导向的博士论文也适合吗？',
            '适合，尤其当你需要把学位论文逻辑和评审式期待接上时，这种辅导会更有价值。',
          ),
          faq(
            '这里只适合临近答辩的时候吗？',
            '不是。更早期如果研究贡献和章节协调就不稳，也很适合尽早介入。',
          ),
        ],
        h1: '博士论文辅导，重点处理研究贡献、章节逻辑、返修与答辩',
        heroPrimaryCtaLabel: '获取博士论文方案',
        heroSecondaryCtaLabel: '查看博士文章库',
        intro:
          '这个页面承接“博士论文辅导”这类搜索，适合原创性要求更高、章节之间必须真正连起来、而且预答辩与委员会追问压力更强的写作情境。',
        navTitle: '博士论文辅导',
        pageTitle: '博士论文辅导',
        process: [
          processStep('1. 重新表述整篇论文的贡献', '先把整篇博士论文到底贡献了什么讲清楚，再去局部打磨。'),
          processStep(
            '2. 把各章节重新接成一条线',
            '让每章回答的是同一个更大问题，而不是各自占一个中心。',
          ),
          processStep(
            '3. 收紧返修与回应逻辑',
            '在返修轮次里更早预判导师、评审或委员会可能提出的关键追问。',
          ),
          processStep(
            '4. 接到答辩场景',
            '把整篇学位论文逻辑翻成可以在预答辩和正式答辩中讲清的表达路线。',
          ),
        ],
        processIntro:
          '博士阶段真正有效的支持，必须让研究贡献、章节一致性和可辩护性一起往前走。',
        processTitle: '博士论文辅导一般怎么推进',
        sectionLabel: '服务页',
        serviceLabel: '博士论文辅导通常覆盖这些问题',
        servicePoints: [
          '重述整篇学位论文的研究贡献',
          '统一章节主线与过渡逻辑',
          '强化综述站位和论证语言',
          '返修结果、讨论与原创性表达',
          '准备预答辩与委员会回应逻辑',
          '衔接学位论文与投稿场景的期待',
        ],
        serviceType: '博士论文辅导',
        summary: '面向博士阶段的论文辅导页，重点处理研究贡献、章节统一、返修和答辩压力。',
        title: '承接博士学位论文强意图词的服务页',
      },
    },
  },
  'kaiti-baogao-zhidao': {
    path: '/kaiti-baogao-zhidao',
    relatedCategorySlugs: [
      'research-topic-planning',
      'undergraduate-thesis',
      'masters-thesis',
      'doctoral-thesis',
    ],
    relatedServiceSlugs: [
      'lunwen-fudao',
      'benke-lunwen-fudao',
      'shuoshi-lunwen-zhidao',
      'biyelunwen-fudao',
    ],
    relatedSubjectSlugs: ['management', 'education', 'law', 'public-administration'],
    copy: {
      en: {
        audienceLabels: ['Proposal writers', 'Students before topic approval', 'Early-stage thesis writers'],
        breadcrumbLabel: 'Proposal Guidance',
        cards: [
          card(
            'Topic is still too big',
            'Useful when the interesting direction exists, but the actual proposal still cannot become feasible or answerable.',
            '/benke-lunwen-fudao',
          ),
          card(
            'Research question is still fuzzy',
            'Open this when the topic sounds formal but still lacks one problem that can carry the full thesis.',
            '/lunwen-fudao',
          ),
          card(
            'Need clearer methods in the proposal',
            'Best when the proposal has a title and background but still cannot explain how the research will be done.',
            '/shuoshi-lunwen-zhidao',
          ),
        ],
        cardsIntro:
          'Proposal guidance is most useful before the draft spreads too far. The earlier the question, scope, and method become concrete, the less rework later chapters usually need.',
        cardsTitle: 'Proposal problems that usually need guidance first',
        consultation: consultation(
          'Get a proposal guidance plan',
          'Share your discipline, current topic, approval deadline, and which part of the proposal feels weakest right now.',
          'Request proposal guidance',
          'en',
        ),
        ctaAside: {
          links: [
            { href: '/posts/category/research-topic-planning', label: 'Open topic planning hub' },
            { href: '/wenxian-zongshu-zhidao', label: 'Open literature review guidance' },
          ],
          points: [
            'The topic becomes narrower without losing meaning.',
            'The proposal begins to show one answerable research question.',
            'Methods and evidence become visible earlier instead of being postponed to later panic.',
          ],
          title: 'What proposal guidance often improves first',
        },
        description:
          'A dedicated page for proposal guidance, focusing on topic narrowing, research question design, feasibility, theoretical positioning, and method planning before full drafting begins.',
        faqTitle: 'Common questions about proposal guidance',
        faqs: [
          faq(
            'When should a student ask for proposal guidance?',
            'Usually before the topic is approved or as soon as the proposal outline keeps expanding without becoming workable.',
          ),
          faq(
            'What is the most common proposal mistake?',
            'A topic that sounds important but still lacks a sharp question, feasible scope, or defendable method path.',
          ),
          faq(
            'Is proposal guidance useful only for beginners?',
            'No. It also helps experienced writers when the project direction is ambitious but still under-defined.',
          ),
          faq(
            'Can this page help across degree levels?',
            'Yes. The proposal stage exists across undergraduate, master, and doctoral writing, even if the depth differs.',
          ),
        ],
        h1: 'Proposal guidance for topic scope, research question, and feasibility',
        heroPrimaryCtaLabel: 'Get proposal guidance',
        heroSecondaryCtaLabel: 'Browse proposal articles',
        intro:
          'This page targets users searching for proposal guidance. It is designed for the stage where a title may already exist, but the proposal still cannot show one feasible and defensible research route.',
        navTitle: 'Proposal guidance',
        pageTitle: 'Proposal Guidance',
        process: [
          processStep(
            '1. Shrink the topic to a real question',
            'Translate a broad interest or assignment into one question that can actually guide the proposal.',
          ),
          processStep(
            '2. Test feasibility early',
            'Check evidence, methods, timeline, and writing pressure before the project grows too large.',
          ),
          processStep(
            '3. Build a proposal structure that can survive review',
            'Make the background, gap, approach, and expected contribution support one another.',
          ),
          processStep(
            '4. Hand the route to later drafting',
            'Use the proposal as the stable base for the review, methods, and later chapter writing.',
          ),
        ],
        processIntro:
          'A good proposal route saves later writing time because it prevents the thesis from growing on an unstable question.',
        processTitle: 'How proposal guidance usually works',
        sectionLabel: 'Service Page',
        serviceLabel: 'What proposal guidance usually covers',
        servicePoints: [
          'Narrowing an oversized topic',
          'Clarifying the core research question',
          'Checking evidence, method, and scope feasibility',
          'Building proposal background and gap logic',
          'Connecting theory and method earlier',
          'Preparing for proposal review or opening defense',
        ],
        serviceType: 'Proposal guidance',
        summary:
          'A service page focused on proposal guidance, especially topic narrowing, research question design, and feasibility.',
        title: 'A page for early-stage thesis intent',
      },
      zh: {
        audienceLabels: ['开题阶段学生', '待立题用户', '论文前期写作者'],
        breadcrumbLabel: '开题报告指导',
        cards: [
          card(
            '题目还是太大',
            '适合有兴趣方向了，但开题一写就发现题目太泛、太虚、很难落地的情况。',
            '/benke-lunwen-fudao',
          ),
          card(
            '研究问题还不够清楚',
            '如果题目看起来正式，但整份开题仍然缺一个真正能撑起全文的问题，就从这里进入。',
            '/lunwen-fudao',
          ),
          card(
            '方法部分总写不稳',
            '更适合标题和背景都有了，但一到“怎么做研究”就开始发虚的时候。',
            '/shuoshi-lunwen-zhidao',
          ),
        ],
        cardsIntro:
          '开题报告指导最有价值的时候，往往是在正文还没大面积展开之前。问题、边界和方法越早具体，后面返工越少。',
        cardsTitle: '开题阶段最常需要先处理的问题',
        consultation: consultation(
          '获取开题报告指导方案',
          '留下学科、当前题目、开题时间和最薄弱的部分，我们先帮你判断开题该怎么稳住。',
          '提交开题需求',
          'zh',
        ),
        ctaAside: {
          links: [
            { href: '/posts/category/research-topic-planning', label: '查看选题与问题定义文章库' },
            { href: '/wenxian-zongshu-zhidao', label: '查看文献综述指导页' },
          ],
          points: [
            '题目会在不失去意义的前提下收得更紧。',
            '开题会出现一个真正可回答的研究问题。',
            '方法和材料会更早露出来，不再拖到后面慌乱补救。',
          ],
          title: '开题指导通常先改善哪里',
        },
        description:
          '开题报告指导页，重点解决缩题、研究问题设计、可行性判断、理论站位和方法规划，适合在正文大规模展开前先把路线压稳。',
        faqTitle: '开题报告指导常见问题',
        faqs: [
          faq(
            '什么时候最适合做开题指导？',
            '通常是在立题前后，或者一旦发现开题提纲越写越大、越写越空的时候就很适合介入。',
          ),
          faq(
            '开题最常见的错误是什么？',
            '题目听起来重要，但缺少尖锐的问题、可行的边界和能说得清的方法路径。',
          ),
          faq(
            '只有基础弱的同学才需要开题指导吗？',
            '不是。很多同学的问题不是不会写，而是方向太 ambitious，却还没有被压成可做的项目。',
          ),
          faq(
            '本科、硕士、博士的开题都适用吗？',
            '适用。虽然深度不同，但开题阶段都需要把研究问题、边界和可行性先讲清楚。',
          ),
        ],
        h1: '开题报告指导，重点处理缩题、研究问题与可行性',
        heroPrimaryCtaLabel: '获取开题方案',
        heroSecondaryCtaLabel: '查看开题相关文章',
        intro:
          '这个页面专门承接“开题报告指导”这类搜索，适合标题已经有了，但整份开题还没有形成一条可行、可辩护、可继续写下去的研究路线时进入。',
        navTitle: '开题报告指导',
        pageTitle: '开题报告指导',
        process: [
          processStep('1. 把大题目压成真实问题', '先把兴趣方向或作业要求，翻成一个真正能引导开题的核心问题。'),
          processStep(
            '2. 提前做可行性检查',
            '在项目长太大之前，把材料、方法、时间和写作压力先对一遍。',
          ),
          processStep(
            '3. 搭出能经得住开题审查的结构',
            '让背景、研究缺口、研究路径和预期贡献之间互相支撑。',
          ),
          processStep(
            '4. 把路线交给后续正文',
            '让开题成为综述、方法和后续章节写作的稳定起点。',
          ),
        ],
        processIntro:
          '好的开题路线能直接省掉后面很多返工，因为它能防止整篇论文从一开始就长在不稳的问题上。',
        processTitle: '开题报告指导一般怎么推进',
        sectionLabel: '服务页',
        serviceLabel: '开题报告指导通常覆盖这些问题',
        servicePoints: [
          '给过大的题目做缩题处理',
          '明确真正的研究问题',
          '检查材料、方法和边界是否可行',
          '搭出背景与研究缺口逻辑',
          '更早把理论和方法接起来',
          '准备开题答辩与老师追问',
        ],
        serviceType: '开题报告指导',
        summary: '面向开题阶段的服务页，重点处理缩题、研究问题设计和可行性判断。',
        title: '承接论文前期意图词的服务页',
      },
    },
  },
  'wenxian-zongshu-zhidao': {
    path: '/wenxian-zongshu-zhidao',
    relatedCategorySlugs: [
      'literature-reading-review',
      'structure-abstract-writing',
      'masters-thesis',
      'doctoral-thesis',
    ],
    relatedServiceSlugs: [
      'lunwen-fudao',
      'benke-lunwen-fudao',
      'shuoshi-lunwen-zhidao',
      'kaiti-baogao-zhidao',
    ],
    relatedSubjectSlugs: ['education', 'sociology', 'nursing', 'economics'],
    copy: {
      en: {
        audienceLabels: ['Students writing literature reviews', 'Review-heavy theses', 'Early and middle-stage writers'],
        breadcrumbLabel: 'Literature Review Guidance',
        cards: [
          card(
            'Read a lot but still cannot write',
            'Useful when the review remains a set of notes and excerpts instead of a section with real comparison logic.',
            '/benke-lunwen-fudao',
          ),
          card(
            'The review keeps repeating the introduction',
            'Open this when the review and introduction blur together and the thesis loses its front-end structure.',
            '/lunwen-fudao',
          ),
          card(
            'Need stronger positioning',
            'Best when the literature exists but the thesis still cannot show where it enters the conversation.',
            '/shuoshi-lunwen-zhidao',
          ),
        ],
        cardsIntro:
          'Literature review guidance is not just about reading more. It is about building a structure that shows relationships, gaps, and the paper’s own entry point.',
        cardsTitle: 'Review problems that usually need guidance',
        consultation: consultation(
          'Get a literature review guidance plan',
          'Share your discipline, how much reading already exists, and whether the biggest pressure comes from structure, comparison, or how to connect the review to the paper.',
          'Request literature review guidance',
          'en',
        ),
        ctaAside: {
          links: [
            { href: '/posts/category/literature-reading-review', label: 'Open literature review hub' },
            { href: '/posts/category/structure-abstract-writing', label: 'Open structure writing hub' },
          ],
          points: [
            'The review starts comparing studies instead of listing them.',
            'The introduction and review stop repeating one another.',
            'The paper becomes clearer about where it enters the existing conversation.',
          ],
          title: 'What literature review guidance often improves first',
        },
        description:
          'A page for literature review guidance, covering search strategy, reading notes, grouping logic, gap design, introduction-review boundaries, and how the review feeds the whole thesis.',
        faqTitle: 'Common questions about literature review guidance',
        faqs: [
          faq(
            'Is literature review guidance only about finding more references?',
            'No. The main issue is often structure, comparison logic, and how the review supports the argument of the paper.',
          ),
          faq(
            'Why do many review sections still feel weak after heavy reading?',
            'Because reading volume alone does not create grouping, contrast, or a clear point of entry for the thesis.',
          ),
          faq(
            'Can this page help with both course theses and dissertations?',
            'Yes. The need to organize prior research clearly exists across undergraduate, master, and doctoral writing.',
          ),
          faq(
            'Does this also help with English-language literature reviews?',
            'Yes, especially when the challenge is synthesis, comparison language, and scholarly positioning.',
          ),
        ],
        h1: 'Literature review guidance for reading, grouping, structure, and positioning',
        heroPrimaryCtaLabel: 'Get literature review help',
        heroSecondaryCtaLabel: 'Browse review articles',
        intro:
          'This page is built for searches around literature review guidance. It focuses on turning reading volume into a review section that actually supports the paper instead of sitting beside it.',
        navTitle: 'Literature review guidance',
        pageTitle: 'Literature Review Guidance',
        process: [
          processStep(
            '1. Re-sort the reading material',
            'Turn a pile of notes into groups, tensions, and recurring questions that matter for the thesis.',
          ),
          processStep(
            '2. Separate review from introduction',
            'Make sure the introduction establishes the problem while the review explains research relationships and your point of entry.',
          ),
          processStep(
            '3. Build comparison into paragraphs',
            'Rewrite paragraphs so each one pushes a judgment rather than stacking article summaries.',
          ),
          processStep(
            '4. Connect the review to methods and contribution',
            'Use the review to support the research question, design choices, and contribution claim of the full paper.',
          ),
        ],
        processIntro:
          'A strong review route usually saves time later because it makes the thesis question and structure more stable.',
        processTitle: 'How literature review guidance usually works',
        sectionLabel: 'Service Page',
        serviceLabel: 'What literature review guidance usually covers',
        servicePoints: [
          'Search strategy and source sorting',
          'Turning notes into groups and comparisons',
          'Separating introduction from review',
          'Building gap logic and entry position',
          'Writing review paragraphs that carry judgments',
          'Linking the review back to methods and contribution',
        ],
        serviceType: 'Literature review guidance',
        summary:
          'A service page for literature review guidance, especially grouping logic, comparison writing, and positioning.',
        title: 'A page for review-intent search traffic',
      },
      zh: {
        audienceLabels: ['写综述的人', '综述占比重的论文', '论文前中期写作者'],
        breadcrumbLabel: '文献综述指导',
        cards: [
          card(
            '看了很多还是写不出来',
            '适合综述一直停留在摘录和读书笔记，始终写不成有比较逻辑的正文部分。',
            '/benke-lunwen-fudao',
          ),
          card(
            '综述总和引言写串',
            '如果综述和引言总在重复同一件事，导致论文前文越来越乱，可以先看这条路线。',
            '/lunwen-fudao',
          ),
          card(
            '站位还是不够清楚',
            '更适合文献已经有了，但你的论文还说不清自己从哪里切进去、补了什么的时候。',
            '/shuoshi-lunwen-zhidao',
          ),
        ],
        cardsIntro:
          '文献综述指导不只是帮你“再找几篇文献”，而是把阅读变成能显示研究关系、研究缺口和论文切入点的结构。',
        cardsTitle: '文献综述最常需要指导的几个位置',
        consultation: consultation(
          '获取文献综述指导方案',
          '留下学科、已读材料规模，以及现在更卡在结构、比较逻辑还是综述如何服务正文，我们先帮你判断路线。',
          '提交综述需求',
          'zh',
        ),
        ctaAside: {
          links: [
            { href: '/posts/category/literature-reading-review', label: '查看文献综述文章库' },
            { href: '/posts/category/structure-abstract-writing', label: '查看结构写作文章库' },
          ],
          points: [
            '综述会开始比较研究，而不是只罗列研究。',
            '引言和综述会各回各位，不再互相重复。',
            '论文会更清楚地说明自己是从哪里切入已有研究的。',
          ],
          title: '文献综述指导通常先改善哪里',
        },
        description:
          '文献综述指导页，重点处理检索路径、阅读笔记转写、文献分组、研究缺口设计、引言与综述分工，以及综述如何真正服务整篇论文。',
        faqTitle: '文献综述指导常见问题',
        faqs: [
          faq(
            '文献综述指导是不是就是帮我多找几篇参考文献？',
            '不是。真正关键的通常是结构、比较逻辑，以及综述如何支持整篇论文的论证。',
          ),
          faq(
            '为什么看了很多文献，综述还是很弱？',
            '因为阅读量本身不会自动生成分组、比较和切入点，这些都需要重新组织。',
          ),
          faq(
            '课程论文、学位论文都适合做综述指导吗？',
            '适合。无论本科、硕士还是博士，只要前人研究整理不清，整篇论文都会受影响。',
          ),
          faq(
            '英文综述也适合吗？',
            '适合，特别是当你卡在 synthesis、比较语言和学术站位表达上的时候。',
          ),
        ],
        h1: '文献综述指导，重点处理阅读、分组、结构和研究站位',
        heroPrimaryCtaLabel: '获取综述方案',
        heroSecondaryCtaLabel: '查看综述文章库',
        intro:
          '这个页面专门承接“文献综述指导”这类搜索，重点是把“读了很多”真正变成一段能支撑论文的综述，而不是停留在材料堆积。',
        navTitle: '文献综述指导',
        pageTitle: '文献综述指导',
        process: [
          processStep('1. 重新整理已读材料', '把一堆笔记重新整理成几组研究关系、冲突和高频问题。'),
          processStep(
            '2. 把综述和引言分开',
            '让引言负责立问题，综述负责解释已有研究关系和你的切入位置。',
          ),
          processStep(
            '3. 让每段都带比较判断',
            '把段落改成能推进判断的写法，而不是一篇篇文章摘要拼接。',
          ),
          processStep(
            '4. 把综述接回方法与贡献',
            '让综述真正服务研究问题、方法选择和整篇论文的贡献表达。',
          ),
        ],
        processIntro:
          '综述路线越清楚，后面的问题、结构和方法越容易稳定下来。',
        processTitle: '文献综述指导一般怎么推进',
        sectionLabel: '服务页',
        serviceLabel: '文献综述指导通常覆盖这些问题',
        servicePoints: [
          '检索策略与材料筛选',
          '把阅读笔记改造成文献分组与比较',
          '分开引言与综述的任务',
          '搭出研究缺口与论文切入点',
          '把综述段落写成真正有判断的文字',
          '让综述反过来支撑方法与研究贡献',
        ],
        serviceType: '文献综述指导',
        summary: '面向综述意图词的服务页，重点解决阅读分组、比较逻辑和研究站位。',
        title: '承接综述类搜索流量的服务页',
      },
    },
  },
  'lunwen-xiugai-zhidao': {
    path: '/lunwen-xiugai-zhidao',
    relatedCategorySlugs: [
      'submission-defense-workflow',
      'methods-data-presentation',
      'masters-thesis',
      'doctoral-thesis',
    ],
    relatedServiceSlugs: [
      'lunwen-fudao',
      'biyelunwen-fudao',
      'shuoshi-lunwen-zhidao',
      'lunwen-dabian-zhidao',
    ],
    relatedSubjectSlugs: ['finance', 'computer-science', 'nursing', 'mechanical-engineering'],
    copy: {
      en: {
        audienceLabels: ['Writers in revision stage', 'Students with supervisor feedback', 'Blind-review revision users'],
        breadcrumbLabel: 'Thesis Revision Guidance',
        cards: [
          card(
            'Too many comments, no clear order',
            'Useful when supervisor or reviewer feedback is not short, but the real problem is not knowing what to fix first.',
            '/biyelunwen-fudao',
          ),
          card(
            'Methods and results still do not align',
            'Open this when revision keeps circling because the question, evidence, and chapter logic were never fully aligned.',
            '/shuoshi-lunwen-zhidao',
          ),
          card(
            'Need final consistency before submission',
            'Best when the thesis already has content, but the risk now comes from internal contradiction, weak transitions, and unfinished final checks.',
            '/lunwen-dabian-zhidao',
          ),
        ],
        cardsIntro:
          'Revision guidance works best when feedback is translated into one practical queue rather than treated as a list of equally urgent edits.',
        cardsTitle: 'Revision problems that need a clearer route',
        consultation: consultation(
          'Get a thesis revision guidance plan',
          'Share the main source of feedback, the current deadline, and whether the most difficult part is chapter logic, method explanation, or final consistency.',
          'Request revision guidance',
          'en',
        ),
        ctaAside: {
          links: [
            { href: '/posts/category/submission-defense-workflow', label: 'Open revision workflow hub' },
            { href: '/lunwen-dabian-zhidao', label: 'Open defense guidance page' },
          ],
          points: [
            'Feedback becomes a real revision queue instead of emotional pressure.',
            'Repeated edits start converging around the main argument line.',
            'The final version becomes cleaner and easier to defend.',
          ],
          title: 'What revision guidance often improves first',
        },
        description:
          'A service page for thesis revision guidance, covering supervisor feedback, blind-review comments, revision prioritization, method-result alignment, and final consistency before submission or defense.',
        faqTitle: 'Common questions about thesis revision guidance',
        faqs: [
          faq(
            'Does revision guidance only mean language polishing?',
            'No. The most important revision issues are often structural, logical, methodological, and argument-related rather than only sentence-level wording.',
          ),
          faq(
            'What if the feedback feels contradictory?',
            'That is common. The key is to identify which comments are core and which are secondary so the revision route stays coherent.',
          ),
          faq(
            'Can this help with blind-review style feedback?',
            'Yes. Many revision cases focus on reorganizing reviewer-style concerns into one sharper set of changes.',
          ),
          faq(
            'Is revision guidance useful before the thesis is fully complete?',
            'Yes. It is often better to intervene before the final round if the same structural weakness keeps repeating.',
          ),
        ],
        h1: 'Thesis revision guidance for feedback, structure, consistency, and final pressure',
        heroPrimaryCtaLabel: 'Get revision guidance',
        heroSecondaryCtaLabel: 'Browse revision articles',
        intro:
          'This page serves users searching for thesis revision guidance. It is built for the stage where comments already exist, but the draft still lacks a coherent revision order.',
        navTitle: 'Thesis revision guidance',
        pageTitle: 'Thesis Revision Guidance',
        process: [
          processStep(
            '1. Sort the feedback by real impact',
            'Separate core issues from surface edits so the revision route does not lose its center.',
          ),
          processStep(
            '2. Return to the weak argument line',
            'Use the feedback to find the unstable part of the thesis: question, review, methods, results, or final framing.',
          ),
          processStep(
            '3. Revise by chapter priority',
            'Turn comments into a sequence that reduces repeated work and strengthens consistency across the draft.',
          ),
          processStep(
            '4. Prepare the final version',
            'Finish with final checks for terminology, structure, response logic, and defense readiness.',
          ),
        ],
        processIntro:
          'Good revision support is not just about doing more edits. It is about editing in the right order.',
        processTitle: 'How thesis revision guidance usually works',
        sectionLabel: 'Service Page',
        serviceLabel: 'What thesis revision guidance usually covers',
        servicePoints: [
          'Sorting supervisor and reviewer feedback',
          'Rebuilding the revision order by chapter priority',
          'Fixing method-result and structure misalignment',
          'Improving paragraph logic and transitions',
          'Cleaning final consistency before submission',
          'Preparing a steadier response for defense or review',
        ],
        serviceType: 'Thesis revision guidance',
        summary:
          'A service page focused on thesis revision guidance, especially feedback sorting, structure repair, and final consistency.',
        title: 'A page for revision-stage search intent',
      },
      zh: {
        audienceLabels: ['返修阶段写作者', '有导师意见的人', '盲审返修用户'],
        breadcrumbLabel: '论文修改指导',
        cards: [
          card(
            '意见很多，不知道先改什么',
            '适合导师或评审意见不少，但真正的问题不是“没人提意见”，而是根本不知道先改哪一块。',
            '/biyelunwen-fudao',
          ),
          card(
            '方法和结果还是对不齐',
            '如果返修总在绕圈，其实是研究问题、证据和章节逻辑从一开始就没完全对齐，可以先看这条路线。',
            '/shuoshi-lunwen-zhidao',
          ),
          card(
            '提交前需要做终稿一致性',
            '更适合稿子已经有内容，但现在最大的风险是前后矛盾、过渡薄弱和最后检查不到位的时候。',
            '/lunwen-dabian-zhidao',
          ),
        ],
        cardsIntro:
          '论文修改指导最有价值的地方，不是帮你“多改几遍”，而是把反馈重新翻成一条真正能执行的返修队列。',
        cardsTitle: '返修阶段最需要理顺的几个问题',
        consultation: consultation(
          '获取论文修改指导方案',
          '留下反馈来源、当前时间节点，以及你更卡在章节逻辑、方法说明还是终稿一致性，我们先帮你排顺返修路线。',
          '提交修改需求',
          'zh',
        ),
        ctaAside: {
          links: [
            { href: '/posts/category/submission-defense-workflow', label: '查看返修投稿文章库' },
            { href: '/lunwen-dabian-zhidao', label: '查看答辩指导页' },
          ],
          points: [
            '反馈会从情绪压力变成可执行清单。',
            '反复返工会开始围绕主线收敛，而不是越改越散。',
            '终稿会更干净，也更容易答辩。',
          ],
          title: '论文修改指导通常先改善哪里',
        },
        description:
          '论文修改指导页，重点处理导师意见、盲审反馈、返修优先级、方法与结果对齐，以及提交或答辩前的终稿一致性问题。',
        faqTitle: '论文修改指导常见问题',
        faqs: [
          faq(
            '论文修改指导是不是只是帮我润色语言？',
            '不是。最关键的返修问题通常在结构、逻辑、方法和论证层面，不只是句子表达。',
          ),
          faq(
            '意见看起来互相矛盾怎么办？',
            '这很常见。关键是先分清哪些意见是核心矛盾，哪些只是次要修饰，返修路线才能稳定。',
          ),
          faq(
            '盲审返修适合在这里处理吗？',
            '非常适合。很多返修需求本质上就是把评审式意见重新整理成一组更尖锐的核心修改。',
          ),
          faq(
            '论文还没完全写完，也适合做修改指导吗？',
            '适合。如果同一类结构问题反复出现，越早介入返修越省时间。',
          ),
        ],
        h1: '论文修改指导，重点处理反馈、结构、一致性和终稿压力',
        heroPrimaryCtaLabel: '获取修改方案',
        heroSecondaryCtaLabel: '查看返修文章库',
        intro:
          '这个页面专门承接“论文修改指导”这类搜索，适合意见已经来了，但整篇稿子还没有形成稳定返修顺序的时候进入。',
        navTitle: '论文修改指导',
        pageTitle: '论文修改指导',
        process: [
          processStep('1. 先按影响程度整理意见', '先把核心问题和表层修饰分开，不让返修路线失去中心。'),
          processStep(
            '2. 回到真正薄弱的主线位置',
            '借着意见重新找到论文最不稳的地方，是问题、综述、方法、结果还是终稿表达。',
          ),
          processStep(
            '3. 按章节优先级返修',
            '把意见翻成能减少重复返工、同时增强一致性的章节顺序。',
          ),
          processStep(
            '4. 完成终稿检查',
            '最后把术语、结构、回应逻辑和答辩准备一起收口。',
          ),
        ],
        processIntro:
          '好的论文修改支持，不是单纯多改几次，而是把每一轮修改放到正确顺序里。',
        processTitle: '论文修改指导一般怎么推进',
        sectionLabel: '服务页',
        serviceLabel: '论文修改指导通常覆盖这些问题',
        servicePoints: [
          '梳理导师意见和评审反馈',
          '按章节优先级重排返修顺序',
          '修正方法、结果和结构错位',
          '强化段落逻辑和章节过渡',
          '提交前完成终稿一致性清理',
          '为答辩或评审准备更稳的回应逻辑',
        ],
        serviceType: '论文修改指导',
        summary: '面向返修意图词的服务页，重点处理反馈整理、结构修复和终稿一致性。',
        title: '承接返修阶段搜索意图的服务页',
      },
    },
  },
  'lunwen-dabian-zhidao': {
    path: '/lunwen-dabian-zhidao',
    relatedCategorySlugs: [
      'submission-defense-workflow',
      'masters-thesis',
      'doctoral-thesis',
      'academic-voice-argument',
    ],
    relatedServiceSlugs: [
      'lunwen-fudao',
      'biyelunwen-fudao',
      'lunwen-xiugai-zhidao',
      'boshi-lunwen-fudao',
    ],
    relatedSubjectSlugs: ['public-administration', 'law', 'mechanical-engineering', 'education'],
    copy: {
      en: {
        audienceLabels: ['Students before defense', 'Pre-defense writers', 'Final presentation stage'],
        breadcrumbLabel: 'Defense Guidance',
        cards: [
          card(
            'The thesis still cannot be explained clearly',
            'Useful when the paper exists, but the student still cannot summarize the question, route, and contribution with confidence.',
            '/lunwen-xiugai-zhidao',
          ),
          card(
            'Need to prepare for likely questions',
            'Open this when the pressure now comes from supervisor, committee, or reviewer-style questioning rather than from drafting alone.',
            '/boshi-lunwen-fudao',
          ),
          card(
            'Slides and final version do not fully match',
            'Best when the thesis is close to submission but still needs stronger consistency among final manuscript, defense slides, and oral explanation.',
            '/biyelunwen-fudao',
          ),
        ],
        cardsIntro:
          'Defense guidance is not only about slide design. It is about making the thesis explainable under pressure.',
        cardsTitle: 'Where defense guidance usually helps most',
        consultation: consultation(
          'Get a defense guidance plan',
          'Share your defense date, degree level, and whether the main pressure is explanation, Q&A, or final consistency between the draft and the presentation.',
          'Request defense guidance',
          'en',
        ),
        ctaAside: {
          links: [
            { href: '/posts/category/submission-defense-workflow', label: 'Open defense workflow hub' },
            { href: '/lunwen-xiugai-zhidao', label: 'Open revision guidance page' },
          ],
          points: [
            'The thesis becomes easier to summarize in one coherent oral route.',
            'Likely questions can be grouped and anticipated earlier.',
            'Slides, oral answers, and the written draft start supporting one another.',
          ],
          title: 'What defense guidance often improves first',
        },
        description:
          'A page for thesis defense guidance, focusing on oral structure, question anticipation, contribution framing, final manuscript consistency, and stronger explanation under committee pressure.',
        faqTitle: 'Common questions about defense guidance',
        faqs: [
          faq(
            'Is defense guidance just about making slides?',
            'No. The key task is turning the written thesis into a clear spoken route that can survive questions.',
          ),
          faq(
            'When should students start defense preparation?',
            'Earlier than most people expect. Once the final argument line is visible, defense preparation becomes much more effective.',
          ),
          faq(
            'Can this page help with mock Q&A?',
            'Yes. It is especially useful when students need help anticipating likely committee or supervisor questions.',
          ),
          faq(
            'Does defense guidance still matter if the thesis is already approved?',
            'Yes, because approval does not automatically mean the research can be explained clearly and confidently in the room.',
          ),
        ],
        h1: 'Thesis defense guidance for explanation, Q&A, and final consistency',
        heroPrimaryCtaLabel: 'Get defense guidance',
        heroSecondaryCtaLabel: 'Browse defense articles',
        intro:
          'This page targets searches around thesis defense guidance. It is designed for the stage where the draft exists, but the student now needs a stronger oral route and steadier response logic.',
        navTitle: 'Defense guidance',
        pageTitle: 'Thesis Defense Guidance',
        process: [
          processStep(
            '1. Reduce the thesis to one explainable route',
            'Clarify the research question, path, evidence, and contribution in a way that can be spoken under time pressure.',
          ),
          processStep(
            '2. Group likely questions',
            'Anticipate likely committee or supervisor questions by clustering them around methods, logic, contribution, and limitation.',
          ),
          processStep(
            '3. Sync the thesis and the presentation',
            'Make the slides, oral summary, and final manuscript reinforce one another instead of competing.',
          ),
          processStep(
            '4. Rehearse with defense logic',
            'Use the route to practice responses that are concise, steady, and academically consistent.',
          ),
        ],
        processIntro:
          'A good defense route begins before the actual defense room because the thesis has to become speakable as well as readable.',
        processTitle: 'How defense guidance usually works',
        sectionLabel: 'Service Page',
        serviceLabel: 'What defense guidance usually covers',
        servicePoints: [
          'Summarizing the thesis into one oral route',
          'Anticipating likely defense questions',
          'Framing contribution and limitation more clearly',
          'Syncing manuscript, slides, and spoken explanation',
          'Practicing stable academic responses',
          'Reducing last-minute defense pressure',
        ],
        serviceType: 'Thesis defense guidance',
        summary:
          'A service page for thesis defense guidance, focused on oral explanation, Q&A, and final consistency.',
        title: 'A page for defense-stage search intent',
      },
      zh: {
        audienceLabels: ['答辩前学生', '预答辩用户', '最终展示阶段写作者'],
        breadcrumbLabel: '论文答辩指导',
        cards: [
          card(
            '论文还讲不清楚',
            '适合文字稿已经有了，但你自己还不能自信地把问题、路径和贡献顺着讲出来的时候。',
            '/lunwen-xiugai-zhidao',
          ),
          card(
            '需要准备高频追问',
            '如果现在的压力更像老师、委员会或评审式追问，而不是单纯继续写正文，就从这里进入。',
            '/boshi-lunwen-fudao',
          ),
          card(
            'PPT 和终稿还没完全对齐',
            '更适合正文快定了，但答辩稿、PPT 和最终论文之间还缺一致性的时候。',
            '/biyelunwen-fudao',
          ),
        ],
        cardsIntro:
          '论文答辩指导不只是做 PPT，更重要的是让整篇论文在压力下也能被讲清楚、答稳。',
        cardsTitle: '答辩指导通常最先处理的几个位置',
        consultation: consultation(
          '获取论文答辩指导方案',
          '留下答辩时间、学历阶段，以及你更担心表达、问答还是终稿和展示不一致，我们先帮你排顺准备路线。',
          '提交答辩需求',
          'zh',
        ),
        ctaAside: {
          links: [
            { href: '/posts/category/submission-defense-workflow', label: '查看答辩流程文章库' },
            { href: '/lunwen-xiugai-zhidao', label: '查看论文修改指导页' },
          ],
          points: [
            '整篇论文会更容易收成一条可口头表达的主线。',
            '高频提问会更早被归类、预判和准备。',
            'PPT、口头回答和书面论文会开始互相支撑。',
          ],
          title: '论文答辩指导通常先改善哪里',
        },
        description:
          '论文答辩指导页，重点处理口头表达结构、高频问答预判、研究贡献总结、终稿与 PPT 一致性，以及在委员会追问下更稳地说明论文。',
        faqTitle: '论文答辩指导常见问题',
        faqs: [
          faq(
            '答辩指导是不是只是帮我做 PPT？',
            '不是。更关键的是把书面论文重新翻成一条能在答辩场景下讲清、讲稳的口头路线。',
          ),
          faq(
            '什么时候开始准备答辩比较合适？',
            '比大多数人想得更早。一旦整篇论文主线出现，就可以开始把论文变成可讲述版本。',
          ),
          faq(
            '这里会做模拟问答吗？',
            '会，尤其适合需要提前预判导师或委员会高频问题的情况。',
          ),
          faq(
            '论文已经通过了，还需要答辩指导吗？',
            '需要。通过并不代表你已经能在现场把研究讲得足够清楚、足够有把握。',
          ),
        ],
        h1: '论文答辩指导，重点处理表达、问答和终稿一致性',
        heroPrimaryCtaLabel: '获取答辩方案',
        heroSecondaryCtaLabel: '查看答辩文章库',
        intro:
          '这个页面专门承接“论文答辩指导”这类搜索，适合正文已经基本成型，但现在需要把论文主线、问答逻辑和最终展示方式真正理顺的时候进入。',
        navTitle: '论文答辩指导',
        pageTitle: '论文答辩指导',
        process: [
          processStep('1. 把论文压成一条能讲的路线', '把研究问题、研究路径、证据和贡献压成能在限时里说清的一条主线。'),
          processStep(
            '2. 分类高频追问',
            '把老师或委员会可能问的问题按方法、逻辑、贡献、局限分类，提前准备。',
          ),
          processStep(
            '3. 对齐论文、PPT 和口头表达',
            '让答辩稿、幻灯片和书面终稿不再各讲一套，而是互相补强。',
          ),
          processStep(
            '4. 按答辩逻辑演练',
            '顺着这条路线练习更短、更稳、更符合学术场景的回答方式。',
          ),
        ],
        processIntro:
          '答辩准备最好在进现场之前就开始，因为论文必须先变成“可讲”的形态。',
        processTitle: '论文答辩指导一般怎么推进',
        sectionLabel: '服务页',
        serviceLabel: '论文答辩指导通常覆盖这些问题',
        servicePoints: [
          '把整篇论文压缩成一条口头主线',
          '预判高频答辩问题',
          '更清楚地总结贡献与局限',
          '对齐终稿、PPT 与口头表达',
          '练习更稳的学术回答方式',
          '降低临近答辩时的混乱与压力',
        ],
        serviceType: '论文答辩指导',
        summary: '面向答辩意图词的服务页，重点处理口头表达、问答和终稿一致性。',
        title: '承接答辩阶段搜索意图的服务页',
      },
    },
  },
}

export const getServiceLandingPage = (slug: ServiceLandingPageSlug) => {
  return serviceLandingPages[slug]
}

export const getServiceLandingPagePaths = () => {
  return serviceLandingPageOrder.map((slug) => serviceLandingPages[slug].path)
}

export const getServiceLandingPageSummary = (
  slug: ServiceLandingPageSlug,
  locale: SiteLocale,
) => {
  const page = getServiceLandingPage(slug)
  const copy = page.copy[locale]

  return {
    description: copy.summary,
    href: page.path,
    label: copy.breadcrumbLabel,
    title: copy.navTitle,
  }
}

export const getServiceLandingPageSummaries = (
  locale: SiteLocale,
  slugs: readonly ServiceLandingPageSlug[] = serviceLandingPageOrder,
) => {
  return slugs.map((slug) => getServiceLandingPageSummary(slug, locale))
}
