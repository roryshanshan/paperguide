type CategorySlug = 'undergraduate-thesis' | 'masters-thesis' | 'doctoral-thesis'
type DegreeSlug = 'undergraduate' | 'masters' | 'doctoral'
type StageSlug = 'proposal' | 'literature-review' | 'methods-analysis' | 'revision-defense'

type ArticleTemplate = {
  categorySlug: CategorySlug
  checklistEn: string
  checklistZh: string
  closingEn: string
  closingZh: string
  degreeSlug: DegreeSlug
  disciplineSlug: string
  evidenceEn: string
  evidenceZh: string
  extensionEn: string
  extensionZh: string
  imageFilename: string
  introEn: string
  introZh: string
  metaDescriptionEn: string
  metaDescriptionZh: string
  metaTitleEn: string
  metaTitleZh: string
  pressureEn: string
  pressureZh: string
  reviewerEn: string
  reviewerZh: string
  slug: string
  sourceNoteEn: string
  sourceNoteZh: string
  stageSlug: StageSlug
  stepsEn: [string, string, string]
  stepsZh: [string, string, string]
  titleEn: string
  titleZh: string
  workflowEn: string
  workflowZh: string
}

type GeneratedLikePost = {
  categorySlug: CategorySlug
  contentEn: ReturnType<typeof createRichText>
  contentZh: ReturnType<typeof createRichText>
  degreeSlug: DegreeSlug
  disciplineSlug: string
  imageFilename: string
  metaDescriptionEn: string
  metaDescriptionZh: string
  metaTitleEn: string
  metaTitleZh: string
  slug: string
  stageSlug: StageSlug
  titleEn: string
  titleZh: string
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

const buildChineseContent = (article: ArticleTemplate) =>
  createRichText([
    createHeading('为什么这类稿子最容易写歪'),
    createParagraph(article.introZh),
    createParagraph(article.pressureZh),
    createHeading('导师和评审真正先看什么'),
    createParagraph(article.reviewerZh),
    createHeading('可执行的推进路线'),
    createParagraph(article.workflowZh),
    createHeading('第一步', 'h3'),
    createParagraph(article.stepsZh[0]),
    createHeading('第二步', 'h3'),
    createParagraph(article.stepsZh[1]),
    createHeading('第三步', 'h3'),
    createParagraph(article.stepsZh[2]),
    createHeading('证据怎么写进正文才有说服力'),
    createParagraph(article.evidenceZh),
    createHeading('如果你想把这篇继续写深'),
    createParagraph(article.extensionZh),
    createHeading('可以继续对照的公开资料'),
    createParagraph(article.sourceNoteZh),
    createHeading('交稿前最后检查'),
    createParagraph(article.checklistZh),
    createHeading('写完这一轮之后你应该得到什么'),
    createParagraph(article.closingZh),
  ])

const buildEnglishContent = (article: ArticleTemplate) =>
  createRichText([
    createHeading('Why this kind of paper goes off track so easily'),
    createParagraph(article.introEn),
    createParagraph(article.pressureEn),
    createHeading('What advisors and reviewers really check first'),
    createParagraph(article.reviewerEn),
    createHeading('A workable route forward'),
    createParagraph(article.workflowEn),
    createHeading('Step 1', 'h3'),
    createParagraph(article.stepsEn[0]),
    createHeading('Step 2', 'h3'),
    createParagraph(article.stepsEn[1]),
    createHeading('Step 3', 'h3'),
    createParagraph(article.stepsEn[2]),
    createHeading('How to place evidence inside the draft'),
    createParagraph(article.evidenceEn),
    createHeading('How to deepen the piece further'),
    createParagraph(article.extensionEn),
    createHeading('Public guides worth checking against'),
    createParagraph(article.sourceNoteEn),
    createHeading('Last check before submission'),
    createParagraph(article.checklistEn),
    createHeading('What this round should leave you with'),
    createParagraph(article.closingEn),
  ])

const sourceInspiredArticles: ArticleTemplate[] = [
  {
    categorySlug: 'masters-thesis',
    degreeSlug: 'masters',
    disciplineSlug: 'psychology',
    stageSlug: 'methods-analysis',
    slug: 'masters-psychology-results-discussion-effect-sizes-methods-analysis-guide',
    imageFilename: 'paperbridge-methods-data.webp',
    titleZh: '心理学结果和讨论别再混写：把显著性、效应量与理论解释分开落位',
    titleEn:
      'Stop Blending Results and Discussion in Psychology: Separate Significance, Effect Sizes, and Interpretation',
    metaTitleZh: '心理学结果和讨论别再混写：把显著性、效应量与理论解释分开落位',
    metaTitleEn:
      'Stop Blending Results and Discussion in Psychology: Separate Significance, Effect Sizes, and Interpretation',
    metaDescriptionZh:
      '围绕心理学实验报告中最常见的 results 与 discussion 混写问题，整理假设对应、统计句式、效应量呈现和理论解释分层的实操路线。',
    metaDescriptionEn:
      'A source-inspired guide to separating results and discussion in psychology papers, with practical advice on hypothesis mapping, statistical reporting, effect sizes, and interpretation.',
    introZh:
      '心理学论文最常见的失手，不是不会跑统计，而是把“结果是什么”和“结果意味着什么”写成一锅。很多初稿在结果部分一边报 p 值，一边直接跳到人格机制、社会文化解释和实践建议，读者还没看清数据，作者已经把理论结论写完了。',
    introEn:
      'One of the most common problems in psychology writing is not the statistics themselves, but the collapse of “what the data show” and “what the data mean” into a single paragraph. In many early drafts, the writer reports a p-value and immediately jumps to mechanism, theory, and application before the reader has even seen the evidentiary path.',
    pressureZh:
      'Purdue OWL 把 experimental report 看成一条研究故事线，Pomona 的写作 manual 则反复提醒每个 section 要承担不同任务。结果部分的责任是把假设、变量、比较和关键数值讲清楚；讨论部分才负责把这些发现放回理论、局限和未来研究里。如果这条分工不稳，全文看起来就像作者在替数据抢跑。',
    pressureEn:
      'Purdue OWL frames the experimental report as a research story, while Pomona’s manual keeps stressing that each section has a distinct job. The results section must clarify hypotheses, variables, comparisons, and key numbers; the discussion is where those findings are returned to theory, limitation, and future work. When that division collapses, the paper sounds as if the author is racing ahead of the data.',
    reviewerZh:
      '导师和评审通常先看三件事：每个假设是否都能在结果部分找到对应指标；表格或图像里的核心信息是否被正文准确转述；讨论中的理论解释有没有超出数据支持范围。心理学稿件一旦把“显著”误写成“重要”，把“相关”误写成“因果”，或者把空结果写成研究失败，可信度会立刻下降。',
    reviewerEn:
      'Advisors and reviewers usually check three things first: whether every hypothesis has a matching result, whether the tables and figures are accurately translated into prose, and whether the theoretical interpretation goes beyond what the data can support. The moment a psychology paper turns significance into importance, correlation into causation, or null findings into failure, its credibility drops fast.',
    workflowZh:
      '更稳的写法，是先做一张“假设对应表”：左边列假设或研究问题，中间列指标、统计检验和图表位置，右边列这一条发现允许你在讨论里说到哪一步。这样你写结果时只回答“看到了什么”，写讨论时再回答“这说明了什么、还不能说明什么”。',
    workflowEn:
      'A steadier route is to build a hypothesis matrix first: list each hypothesis or question, then the measure, test, and figure or table that answers it, and finally the level of interpretation the finding actually permits. That way the results section answers only “what did we observe,” while the discussion answers “what does this suggest, and what does it still not establish.”',
    stepsZh: [
      '先按假设重排结果，而不是按软件输出顺序抄写。每个小节都用一句判断开头，例如“假设一获得部分支持”，随后再给出均值、标准差、检验统计量、效应量和必要的置信区间，让读者先抓结论，再看证据。',
      '把结果段落里的语言压到描述层。你可以写“在高负荷条件下反应时间更长”，但不要立刻写“说明个体动机被削弱”。凡是涉及机制、理论整合、现实意义和替代解释的句子，先留到 discussion，再决定放在哪一段最合适。',
      '讨论部分按“核心发现、与既有文献的关系、可能机制、限制与替代解释、下一步问题”展开。这样即便结果并不漂亮，你也仍然能把论文写成一篇严肃的研究报告，而不是只在显著时兴奋、在不显著时慌张。',
    ],
    stepsEn: [
      'Reorder the results by hypothesis rather than by the sequence of software output. Open each subsection with a judgment sentence such as “Hypothesis 1 received partial support,” then supply the means, standard deviations, test statistics, effect sizes, and any needed confidence intervals so readers grasp the claim before the numbers.',
      'Keep the language in the results section strictly descriptive. You can write that reaction time increased under high load, but not yet that motivation weakened. Any sentence about mechanism, theoretical integration, practical meaning, or alternative explanation should be held for the discussion section.',
      'Structure the discussion around core finding, relation to prior literature, possible mechanism, limitation or alternative explanation, and next question. Even when the data are messy, this keeps the paper sounding like a serious research report rather than a draft that only knows how to celebrate significance and panic at null results.',
    ],
    evidenceZh:
      '心理学结果的说服力，往往来自正文对图表的二次解释。不要把图表当附件，也不要指望读者自己推导重点。正文里最好明确交代比较对象、方向、幅度和不确定性，并把 manipulation check、量表信度、样本排除标准这些容易被忽略的环节放在读者找得到的位置。',
    evidenceEn:
      'In psychology, persuasive reporting usually comes from how the prose interprets the table or figure rather than from the figure alone. Do not treat visuals as attachments and do not assume readers will infer the key point for themselves. The text should state the comparison, direction, magnitude, and uncertainty explicitly, while also making manipulation checks, scale reliability, and exclusion rules easy to locate.',
    extensionZh:
      '如果你想把这篇写得更像高质量研究型论文，可以进一步补三层内容：第一，解释为什么某个效应虽小却理论关键；第二，处理空结果而不是回避空结果；第三，交代你的统计选择与研究设计如何互相支撑。博士层面尤其要避免把统计术语当成熟悉感包装，而要把每个分析决策都写回研究问题本身。',
    extensionEn:
      'To deepen the piece into a stronger research paper, add three layers: explain why a small effect might still matter theoretically, handle null findings instead of dodging them, and show how the analytic choices align with the research design. At doctoral level in particular, statistical language should not function as decoration; each analytic decision should be tied back to the research question itself.',
    sourceNoteZh:
      '这类写法可以对照 Purdue OWL 关于 psychology experimental report 的 section logic，以及 Pomona College 的 Psychological Science Manual。前者强调 general-specific-general 的研究故事线，后者把 introduction、method、results、discussion 的信息边界拆得很清楚，尤其适合用来校正结果与讨论混写的问题。',
    sourceNoteEn:
      'Useful comparison points here include Purdue OWL’s psychology experimental report pages and Pomona College’s Psychological Science Manual. Purdue emphasizes the general-specific-general research story, while Pomona makes the information boundary between introduction, method, results, and discussion especially clear.',
    checklistZh:
      '最后检查时，逐条问自己：每个假设是否都有结果句和对应数值；每个理论解释是否都能回指到某条结果；没有显著的地方是否被诚实交代；读者只看 results，能不能知道发现是什么；只看 discussion，又能不能知道你的解释没有超过证据。',
    checklistEn:
      'Before submitting, ask: does every hypothesis have a result sentence and matching numbers; does every interpretation trace back to a result; are null or ambiguous findings handled honestly; can a reader see the findings by reading results alone; and can the same reader see that the discussion never outruns the evidence?',
    closingZh:
      '这一轮写完后，你应该得到的是两套边界清楚的段落系统：结果负责交代证据，讨论负责安放解释。只要这条界线立住，心理学实验报告就不再像统计输出加心得体会，而会更像一篇真正能被同行读懂的研究文章。',
    closingEn:
      'By the end of this revision, you should have two clearly separated paragraph systems: results that present evidence and discussion that places interpretation. Once that boundary holds, the paper stops reading like software output plus personal reflection and starts to sound like a research article that peers can actually trust.',
  },
  {
    categorySlug: 'doctoral-thesis',
    degreeSlug: 'doctoral',
    disciplineSlug: 'psychology',
    stageSlug: 'literature-review',
    slug: 'doctoral-psychology-introduction-hypothesis-chain-literature-review-guide',
    imageFilename: 'paperbridge-methods-data.webp',
    titleZh: '心理学引言不是文献堆砌：用“理论分歧—变量路径—可检验假设”收束开头',
    titleEn:
      'A Psychology Introduction Is Not a Literature Dump: Narrow It Through Theory, Variables, and Testable Hypotheses',
    metaTitleZh: '心理学引言不是文献堆砌：用“理论分歧—变量路径—可检验假设”收束开头',
    metaTitleEn:
      'A Psychology Introduction Is Not a Literature Dump: Narrow It Through Theory, Variables, and Testable Hypotheses',
    metaDescriptionZh:
      '针对心理学引言与文献综述常见的“研究很多、假设很弱”问题，整理理论分歧、变量路径和 study overview 收束的写法。',
    metaDescriptionEn:
      'A source-inspired guide to writing psychology introductions that move from theory and literature to variables, hypotheses, and a clean study overview.',
    introZh:
      '心理学引言最容易犯的错，不是文献太少，而是文献太多却没有方向。作者一会儿讲宏大背景，一会儿罗列经典研究，一会儿补几个最新变量，最后假设像临时拼出来的句子，读者看了半天也不知道这篇研究到底要解决哪一个真正的理论分歧。',
    introEn:
      'The most common problem in psychology introductions is not too little literature but too much literature without a direction. Writers move from big context to classic studies to new variables, and by the time the hypothesis appears it feels assembled at the last minute. The reader still cannot tell which real theoretical disagreement the study is meant to resolve.',
    pressureZh:
      'Purdue OWL 和 Pomona 的心理学写作资源都在提醒同一件事：引言不是百科式回顾，而是为 study overview 铺路。也就是说，前面的文献综述必须一步一步把读者带到“为什么要测这些变量、为什么是这种设计、为什么现在这个假设值得检验”上，而不是只证明你读过很多文献。',
    pressureEn:
      'The psychology writing resources from Purdue and Pomona stress the same point: the introduction is not an encyclopedia entry but a runway for the study overview. The literature review must lead the reader, step by step, toward why these variables matter, why this design is appropriate, and why this hypothesis is worth testing now.',
    reviewerZh:
      '导师和评审会先看引言是否具备收束力。具体来说，他们会问：文献之间的关系是按主题还是按时间堆叠；真正的 gap 是“没人做过”还是“已有解释彼此冲突”；研究假设有没有清楚命名；study overview 是否提前交代主要变量、方法走向和预期发现。如果这些环节模糊，后面的 methods 再漂亮，开头仍然会显得虚。',
    reviewerEn:
      'Reviewers test whether the introduction narrows. They ask whether the literature is organized by theme rather than chronology, whether the gap is a real theoretical tension rather than a simple “nobody has done this,” whether the hypotheses are clearly named, and whether the study overview already signals the main variables, design direction, and expected pattern. If these pieces are fuzzy, the rest of the paper feels under-motivated.',
    workflowZh:
      '更稳的写法，是把引言拆成三层推进。第一层定义研究问题和现实或理论背景；第二层只保留与你核心变量链直接相关的文献；第三层把争议压缩成几个可检验判断，并在结尾用简短的 study overview 告诉读者你将如何检验它。写的时候，宁可删掉一半“看起来很全面”的背景，也不要让假设像从天上掉下来。',
    workflowEn:
      'A more reliable structure uses three layers. First, define the research problem and its theoretical or practical background. Second, keep only the literature that directly supports the variable chain at the center of your study. Third, compress the dispute into a few testable judgments and close with a brief study overview that tells readers how you will test them. It is better to delete half of the “comprehensive” background than to let the hypotheses fall from the sky.',
    stepsZh: [
      '先把文献按“理论分歧”而不是“作者名单”归组。你要让读者看到的是哪几类解释在竞争，而不是哪个年份又出现了一篇新文章。只有当文献被整理成争议线，假设才会显得是从问题里长出来的。',
      '接着把每一条争议都翻译成变量关系。比如，究竟是情绪调节能力影响风险知觉，还是任务负荷改变了注意资源配置？一旦关系被写成变量路径，你就会知道该保留哪些研究、删掉哪些枝节、以及方法部分需要回应什么。',
      '最后用 study overview 收口。这个位置不要再开新背景，而要简洁交代样本、关键操纵、主要测量和假设方向。读者读到这里，应该已经能预判 methods 会出现什么、results 会回答什么，而不是继续等你解释研究到底在干什么。',
    ],
    stepsEn: [
      'Group the literature by theoretical dispute rather than by author list. Readers need to see which explanations are competing, not just which papers appeared in which year. Once the literature is reorganized around lines of disagreement, the hypotheses begin to look as if they genuinely grew from the problem.',
      'Translate each dispute into variable relations. Is risk perception being shaped by emotion regulation, or is task load reallocating attention? Once the relation is expressed as a variable path, you can see which studies belong, which background can be cut, and what the methods section must be prepared to answer.',
      'Close with the study overview. Do not reopen the background here. Instead, state the sample, key manipulation, main measures, and hypothesis direction briefly. By this point the reader should be able to anticipate what the methods will contain and what the results will answer.',
    ],
    evidenceZh:
      '心理学引言真正有效的证据，不是文献数量，而是文献在逻辑中的位置。每篇被保留下来的研究都应该承担功能，例如界定概念、显示冲突、证明测量路径或支撑假设方向。尤其博士层面的引言，不能只靠“已有研究表明”推进，而要明确不同研究到底在哪一步彼此吻合、在哪一步彼此冲突。',
    evidenceEn:
      'The real evidence in a psychology introduction is not the number of citations but the role each citation plays. Every study that remains should do identifiable work, such as defining a construct, showing a disagreement, justifying a measure, or supporting a hypothesis direction. Doctoral introductions in particular should not advance by repeating “prior research shows”; they should specify where prior work aligns and where it breaks apart.',
    extensionZh:
      '如果你想继续写深，可以在引言末尾补两种高级控制。第一，预先界定你的研究贡献是理论澄清、边界条件检验，还是方法修正；第二，交代为什么你没有选择其他近邻变量。这样做会让引言看起来不是“我也做了一个类似研究”，而是“我知道这个问题在更大的理论版图里位于哪里”。',
    extensionEn:
      'To deepen the introduction further, add two advanced controls near the end. First, define whether the study contributes theoretical clarification, a boundary-condition test, or a methodological correction. Second, state why neighboring variables were not chosen. This makes the paper sound less like “another similar study” and more like a deliberate intervention in a larger theoretical map.',
    sourceNoteZh:
      '这篇写法主要借鉴 Purdue OWL 对 introduction、literature review 和 study overview 的衔接要求，以及 Pomona College 对心理学实验报告 section boundary 的说明。尤其是“文献要直接引向假设”和“overview 兼具过渡功能”这两个要求，非常适合用来重写博士论文开头。',
    sourceNoteEn:
      'This structure is shaped mainly by Purdue OWL’s guidance on the link between introduction, literature review, and study overview, together with Pomona College’s explanation of section boundaries in psychology reports. Their shared emphasis on literature that leads directly to hypotheses and on the overview as a transition point is especially useful for doctoral writing.',
    checklistZh:
      '交稿前再看一遍：你的引言能否用一句话说清核心争议；每组文献是否都服务于变量路径；假设是否来自理论而不是主观愿望；study overview 是否提前告诉读者研究如何落地。如果删掉三分之一的背景后逻辑反而更清楚，通常说明你原来写得太散。',
    checklistEn:
      'Before submission, test whether the introduction can name the core dispute in one sentence, whether each literature cluster serves the variable path, whether the hypotheses arise from theory rather than preference, and whether the study overview already tells readers how the project will become operational. If deleting one third of the background makes the logic clearer, the original draft was probably too diffuse.',
    closingZh:
      '这一轮改完后，你应该得到的是一个真正能把读者带进研究的问题入口，而不是一段努力显得全面的背景综述。心理学引言写得好时，后面的 method 和 results 不是突然出现，而像被前文自然推出来的一样。',
    closingEn:
      'After this revision, you should have an introduction that genuinely escorts readers into the research problem rather than a background section struggling to look comprehensive. In a strong psychology paper, the method and results do not appear abruptly; they emerge as the natural consequence of the opening argument.',
  },
  {
    categorySlug: 'masters-thesis',
    degreeSlug: 'masters',
    disciplineSlug: 'law',
    stageSlug: 'methods-analysis',
    slug: 'masters-law-case-note-significance-reasoning-methods-analysis-guide',
    imageFilename: 'paperbridge-methods-data.webp',
    titleZh: '法学 case note 不等于判决复述：把事实、裁判理由与法律意义拆开分析',
    titleEn:
      'A Law Case Note Is Not a Case Retelling: Separate Facts, Reasoning, and Legal Significance',
    metaTitleZh: '法学 case note 不等于判决复述：把事实、裁判理由与法律意义拆开分析',
    metaTitleEn:
      'A Law Case Note Is Not a Case Retelling: Separate Facts, Reasoning, and Legal Significance',
    metaDescriptionZh:
      '围绕 case note 最常见的“事实写太多、评价太少”问题，整理单案聚焦、判决理由分析、precedent 影响与批判立场的写作路线。',
    metaDescriptionEn:
      'A source-inspired guide to writing law case notes that move beyond factual summary toward reasoning, precedent, and critical evaluation.',
    introZh:
      '法学 case note 最常见的问题，是把它写成“判决书内容摘要”。作者花大量篇幅重述事实经过、程序历史和法官说过的话，却迟迟不表明：这个案子为什么值得单独写、它改变了什么、它的 reasoning 到底站不站得住。',
    introEn:
      'The most common weakness in a law case note is that it turns into a digest of the judgment. Writers spend page after page retelling the facts, procedural history, and what the judge said, yet delay answering the real questions: why this case deserves separate attention, what it changed, and whether its reasoning actually holds.',
    pressureZh:
      'ANU 的 writing in law 资源明确提醒，case note 与 summary 的差别不在长度，而在于它必须聚焦单案并对其价值作出判断。UTS 的法律写作指南则强调正文段落要一段推进一个点、用证据支撑并回应可能反论。所以真正的难点不是“把案子看懂”，而是“把案件意义组织成一个可辩护的立场”。',
    pressureEn:
      'ANU’s writing-in-law guidance makes clear that a case note differs from a summary not by length but by its obligation to focus on a single case and evaluate its value. UTS’s legal writing guide then adds that body paragraphs should advance one point at a time, support it with evidence, and respond to counterarguments. The challenge is therefore not simply understanding the case, but organizing its significance into a defensible position.',
    reviewerZh:
      '导师和评审通常会先看你有没有把三层信息分开：哪些事实真正与争点相关；法院在每个争点上的 holding 与 reasoning 是什么；你对这套 reasoning 的评价依据何在。只要 facts 和 analysis 混在一起，或者把“法院这样判了”误写成“法院这样判得对”，case note 就会失去法律分析的力度。',
    reviewerEn:
      'Reviewers usually look for three distinct layers: which facts truly matter to the issue, what the holding and reasoning are on each issue, and on what basis you evaluate that reasoning. Once facts and analysis are mixed together, or “the court decided this” quietly becomes “the court was right,” the case note loses its analytic force.',
    workflowZh:
      '更稳的推进路线，可以按“问题导向”来搭。开头先界定案件位于哪一块法律争议中，再快速压缩关键事实，只保留会影响争点与裁判路径的内容；主体部分逐条拆解法院如何适用规则、如何处理先例、有没有留下未解决张力；最后才进入你自己的评价，说明该案在 doctrine、解释方法或政策后果上的意义。',
    workflowEn:
      'A stronger route is to organize the note by legal problem rather than by narrative sequence. Open by locating the case within a broader legal controversy, compress the facts so that only issue-relevant material remains, then analyze how the court applied rules, handled precedent, and left tensions unresolved. Only after that should you enter your own evaluation of its doctrinal, interpretive, or policy significance.',
    stepsZh: [
      '先把事实段落压短。你要保留的是与争点、裁判路径和证据冲突有关的事实，而不是把判决书里的时间线全部再写一遍。对 case note 来说，事实的功能是让读者理解法律问题，不是替判决书做另一个摘要。',
      '接着把 holding、reasoning 和可能的 obiter 区分开写。很多法学初稿的问题在于，把法官的每一句评论都当成同等重要的“观点”。只有先拆清哪些内容构成裁判理由，哪些只是附带评论，你后面的评价才不会失焦。',
      '最后进入分析时，要明确这个案件到底改变了什么。它是偏离了既有先例、收紧了适用条件、扩大了裁量空间，还是暴露了现有规则的张力？你的评价必须落在这些变化上，而不是停留在“此案很重要、值得关注”这种空判断。',
    ],
    stepsEn: [
      'Compress the fact section first. Keep only the facts that matter to the issue, the decision path, or evidentiary conflict. In a case note, facts exist to orient the legal problem, not to recreate the full timeline of the judgment.',
      'Then separate holding, reasoning, and possible obiter. Many early law drafts treat every sentence from the judge as equally important. Unless you distinguish what actually grounds the decision from what is merely additional comment, the evaluation will remain unfocused.',
      'When you finally move into analysis, name the precise legal shift. Did the case depart from precedent, narrow an application condition, widen discretion, or expose tension in an existing rule? Your judgment has to attach to that shift rather than to vague statements that the case is “important.”',
    ],
    evidenceZh:
      'case note 的证据，除了案件本身，还包括旧案、法条、学术评论和后续适用。好的写法不会只堆 citation，而会说明这些来源分别在做什么：是证明法院沿用了旧路，还是显示它已经改变了解释方法；是支持你的评价，还是提供一条你必须回应的反面意见。',
    evidenceEn:
      'Evidence in a case note includes not only the judgment itself but also prior cases, legislation, commentary, and later applications. Good legal writing does not simply stack citations; it explains the function of each source, whether to show continuity, demonstrate interpretive change, support your critique, or represent a counter-position that must be answered.',
    extensionZh:
      '如果你想继续写深，可以加入两个方向。第一，分析 dissent 或少数意见与多数意见之间的结构差异，看看争议究竟落在规则、事实评价还是政策考量上。第二，把该案放回后续判例链或制度背景里，说明它究竟是短期噪音还是长期转折。研究生及以上阶段，真正拉开差距的往往不是摘录更多法条，而是把案件放进更大的法理位置图中。',
    extensionEn:
      'To deepen the note further, move in two directions. First, compare majority and dissenting opinions to identify whether the real disagreement sits in rule, factual evaluation, or policy reasoning. Second, place the case back into the later line of authority or institutional background so you can judge whether it is a short-lived disturbance or a genuine turning point.',
    sourceNoteZh:
      '这一篇主要借鉴 ANU 对 case note genre 的说明，以及 UTS Law Guide 对正文段落、topic sentence、证据推进和逻辑顺序的要求。ANU 特别适合帮助你区分 summary 与 case note，UTS 则适合用来重写段落层级和论证节奏。',
    sourceNoteEn:
      'This article is shaped mainly by ANU’s explanation of the case note genre and UTS Law’s guidance on paragraph focus, topic sentences, evidence use, and logical sequencing. ANU is especially helpful for separating case notes from summaries, while UTS helps rebuild the note at paragraph level.',
    checklistZh:
      '交稿前最后检查：你是否只保留了与争点相关的事实；holding、reasoning 和你的评价是否分层清楚；有没有说明案件与既有法的关系；你的批评是否有 authority 支撑；每一段是否都只推进一个判断。如果删掉某一段后主张完全不受影响，那段通常只是复述，不是分析。',
    checklistEn:
      'Before submission, check whether only issue-relevant facts remain, whether holding, reasoning, and evaluation are clearly separated, whether the relation to prior law is explicit, whether your criticism has authority behind it, and whether each paragraph advances a single judgment. If deleting a paragraph changes nothing about your position, that paragraph was probably summary rather than analysis.',
    closingZh:
      '这一轮写完后，你应该得到的不是一篇“我把案子看懂了”的说明文，而是一篇能回答“这个案子为什么重要、它的 reasoning 是否成立、它对后续法律结构意味着什么”的分析文。这才是 case note 真正能拉开水平差距的地方。',
    closingEn:
      'By the end of this revision, the note should no longer read like “I understood the case.” It should answer why the case matters, whether its reasoning stands, and what it means for the structure of law going forward. That is where a real case note separates itself from simple comprehension.',
  },
  {
    categorySlug: 'doctoral-thesis',
    degreeSlug: 'doctoral',
    disciplineSlug: 'law',
    stageSlug: 'proposal',
    slug: 'doctoral-law-note-novelty-scope-proposal-guide',
    imageFilename: 'paperbridge-masters-planning.webp',
    titleZh: '法学 note 选题别只追热点：用“真实缺口—可行范围—可落地方案”定题',
    titleEn:
      'Do Not Pick a Law Note Topic by Heat Alone: Define the Gap, Scope, and Workable Proposal',
    metaTitleZh: '法学 note 选题别只追热点：用“真实缺口—可行范围—可落地方案”定题',
    metaTitleEn:
      'Do Not Pick a Law Note Topic by Heat Alone: Define the Gap, Scope, and Workable Proposal',
    metaDescriptionZh:
      '针对法学 note、seminar paper 常见的“问题很大、主张很空”现象，整理 novelty、preemption check、scope 控制与方案化结论的定题思路。',
    metaDescriptionEn:
      'A source-inspired guide to law note topic selection that focuses on novelty, preemption checks, scope control, and solution-oriented legal writing.',
    introZh:
      '法学 note 或 seminar paper 选题时，很多人第一反应是抓一个非常热的制度议题，然后开始囤资料。问题在于，热点不等于题目。越是宏大的争议，越容易写成“这个制度存在问题，应该改革”的空结论，真正能落到 student note 层面的新问题反而被埋掉了。',
    introEn:
      'When choosing a law note or seminar paper topic, many writers grab the hottest legal issue they can find and start collecting sources. The problem is that topicality is not the same as a topic. The broader the controversy, the easier it becomes to end with vague reform language instead of a new, manageable question that a student note can genuinely carry.',
    pressureZh:
      'Georgetown Law Journal 关于 note writing 的经验很值得参考：真正有竞争力的 note 要有新意，但也要有现实边界，不能假装自己能一口吃下整个领域。NYU Law Library 的研究指南则提醒你，topic selection、preemption check、research path、drafting 和 footnotes 是一整套连续工作，不是先随便定题、后面再补证据。',
    pressureEn:
      'Georgetown Law Journal’s advice on note writing is especially useful here: a strong note needs novelty, but it also needs realistic boundaries. NYU Law Library’s research guide reinforces that topic selection, preemption checking, research strategy, drafting, and footnotes form one continuous workflow. You do not pick a topic first and search for support later.',
    reviewerZh:
      '导师和评审在选题阶段看重的，通常不是你碰上了多热的法律问题，而是三个判断：你发现的是不是一个真实未被充分处理的缺口；这个缺口能不能在你现有时间和身份条件下被论证；你的结论是不是除了指出问题之外，还能提出一条比“应当完善立法”更具体的解决路径。',
    reviewerEn:
      'What supervisors and reviewers value at topic stage is rarely the heat of the issue itself. They are testing whether you found a real under-addressed gap, whether that gap can be argued within the limits of your time and position, and whether your takeaway goes beyond saying that the law should be improved in some general way.',
    workflowZh:
      '更稳的定题路线，是先有“争议句”，再做“排除句”。争议句说明现有法、判例或评论在哪一步出现张力；排除句说明你不打算处理什么，以免题目无限膨胀。只有当这两句都写得出来，你才真正拥有一个可操作的 note 题目，而不是一个宏观关切。',
    workflowEn:
      'A steadier topic-setting route is to write one controversy sentence and one exclusion sentence. The controversy sentence names where the law, cases, or commentary break into tension. The exclusion sentence states what you are not going to cover so the project does not expand without limit. Only when both sentences are clear do you have a workable note topic rather than a general concern.',
    stepsZh: [
      '先做 preemption check，不是为了证明“没人写过”，而是为了确认“别人写过的角度和你准备写的角度不一样”。与其追求彻底空白，不如判断现有讨论哪里停住了、哪里说得太早、哪里默认了一个并未被充分论证的前提。',
      '接着把题目缩到你能真正支撑的层级。好的法学 note 往往不是重写整部制度史，而是抓住一个具体法院路径、一组相互冲突的解释、一个被忽略的适用条件，或者一个在学理和实务之间都还没有被说透的小接口。',
      '最后在开题阶段就预写你的结论方向。不是完整答案，而是一句“如果论证成立，我将主张什么”。这样能逼你判断自己到底是在做 doctrinal clarification、normative proposal 还是 institutional critique，也能防止论文写到后面只剩“存在问题、值得关注”。',
    ],
    stepsEn: [
      'Begin with a preemption check, not to prove that nobody has written on the issue, but to show that your angle differs from what already exists. Total novelty is less important than identifying where prior debate stopped, moved too quickly, or quietly relied on an untested premise.',
      'Then shrink the topic to the level you can actually support. The strongest student law notes rarely rewrite an entire regulatory history. They isolate one court pathway, one cluster of conflicting interpretations, one overlooked condition of application, or one small interface where theory and practice still misalign.',
      'Finally, draft the direction of your conclusion at proposal stage. This is not the full answer, but a sentence stating what you will argue if the reasoning succeeds. Doing so forces you to decide whether the project is doctrinal clarification, normative proposal, or institutional critique, and it prevents the note from ending with nothing more than “there is a problem here.”',
    ],
    evidenceZh:
      '法学 note 的证据配置，不应只靠判例堆叠。你还需要把评论文献、立法材料、比较法观察和制度背景安排到不同层级。尤其博士层面的开题，最有说服力的不是“我已经找到很多材料”，而是“我知道哪些材料是核心 authority，哪些只是辅助说明，哪些反方资料必须正面回应”。',
    evidenceEn:
      'Evidence planning in a law note should not rely on case accumulation alone. Commentary, legislative materials, comparative observations, and institutional background belong on different levels of the argument. At doctoral level, the convincing signal is not that you found many sources, but that you know which ones are central authority, which are contextual support, and which counter-sources must be addressed directly.',
    extensionZh:
      '如果你想把题目继续打磨到更适合发表，可以再加两层判断：第一，这个问题是否具有超出个案的传播性；第二，你的解决方案是否足够具体到能被检验、被批评、也被修改。很多 note 写不出来，不是因为问题不重要，而是因为主张一直停在不承担细节成本的高度。',
    extensionEn:
      'To refine the topic toward publishable shape, add two more tests: does the issue travel beyond the single case, and is your proposed solution specific enough to be challenged, tested, and revised? Many notes fail not because the issue lacks importance, but because the author refuses to descend into the level of detail where proposals become accountable.',
    sourceNoteZh:
      '这篇思路主要参考 Georgetown Law Journal 关于 note 写作中 novelty、solution orientation 与可读结构的建议，以及 NYU Law Library 的 seminar paper / law review note 研究路径指南。前者适合校准“新意”和“规模”，后者适合把选题、检索和落稿连成一条流程。',
    sourceNoteEn:
      'This planning model draws mainly on Georgetown Law Journal’s advice about novelty, solution-oriented arguments, and readable structure, together with NYU Law Library’s workflow for seminar papers and law review notes. Georgetown helps calibrate originality and scale; NYU helps connect topic choice to research and drafting.',
    checklistZh:
      '最后检查你的题目是否过关：一句话能否说清争议点；一句话能否说清你不讨论什么；一句话能否说清若论证成立你会主张什么；现有资料中是否已有人完整做过同一件事；你的题目是否小到能被认真完成，而不是大到只能被仓促概述。',
    checklistEn:
      'Before locking the topic, ask whether one sentence can state the controversy, one sentence can state what is excluded, one sentence can state what you would argue if successful, whether someone has already done the same project in substance, and whether the topic is small enough to be completed seriously rather than broadly summarized in haste.',
    closingZh:
      '这一轮定题完成后，你应该得到的是一个能真正支撑 argument 的问题框架，而不是一串热词。好的法学 note 从来不是“我也来谈这个热点”，而是“我在这个热点里找到了一个别人还没处理好的具体断点，并且我知道怎么把它写完”。',
    closingEn:
      'Once this round of topic design is done, you should have a question frame that can actually carry an argument rather than a pile of buzzwords. A good law note is never just “I will also discuss this hot issue”; it is “I found a specific unresolved break inside that issue, and I know how to write it through.”',
  },
  {
    categorySlug: 'masters-thesis',
    degreeSlug: 'masters',
    disciplineSlug: 'education',
    stageSlug: 'methods-analysis',
    slug: 'masters-education-action-research-cycle-methods-analysis-guide',
    imageFilename: 'paperbridge-methods-data.webp',
    titleZh: '教育学行动研究别写成改革口号：把课堂问题、干预动作与证据循环扣紧',
    titleEn:
      'Do Not Turn Educational Action Research into Reform Slogans: Tie Classroom Problems, Interventions, and Evidence Together',
    metaTitleZh: '教育学行动研究别写成改革口号：把课堂问题、干预动作与证据循环扣紧',
    metaTitleEn:
      'Do Not Turn Educational Action Research into Reform Slogans: Tie Classroom Problems, Interventions, and Evidence Together',
    metaDescriptionZh:
      '围绕教育学行动研究最常见的“问题太大、证据太散、反思太空”现象，整理课堂问题定义、干预设计、数据收集与循环反思的写法。',
    metaDescriptionEn:
      'A source-inspired guide to educational action research writing, focused on classroom problem definition, intervention design, evidence collection, and reflective cycles.',
    introZh:
      '教育学行动研究最容易被写成“教学改革愿景说明”。题目很大，语言很正面，但真正落到课堂里时，却说不清是哪一个具体学习障碍、哪一次教学动作、哪一类学生反应发生了变化。结果是研究像在倡议改进，而不是在分析一次真实可追踪的课堂调整。',
    introEn:
      'Educational action research often drifts into a vision statement for teaching reform. The topic sounds positive and ambitious, but once it enters the classroom it becomes unclear which concrete learning bottleneck changed, which instructional move was tested, and which student responses shifted. The project starts to advocate improvement instead of analyzing a traceable intervention.',
    pressureZh:
      'PEARLL 对 action research 的定义非常关键：它是教师在自身场域中，为解决一个即时、具体、可实践的问题而进行的批判性探索。也就是说，行动研究最重要的不是宏大理论，而是问题、行动、信息收集与后续调整之间的闭环。没有这个闭环，反思段落再多，也只是主观心得。',
    pressureEn:
      'PEARLL’s definition of action research is crucial here: it is a critical inquiry conducted by educators within their own context to address a specific, immediate, practical issue. That means the center of action research is not a grand theory but the loop among problem, action, evidence gathering, and subsequent adjustment. Without that loop, even long reflective sections remain little more than personal impression.',
    reviewerZh:
      '导师和评审通常先看四个环节是否扣得住：你界定的课堂问题是否足够具体；干预动作是否真的能作用于该问题；数据收集是否覆盖了学习表现、课堂互动和学生反馈；最后的反思是否建立在证据上，而不是建立在“我感觉这次课更顺了”。只要其中一环过泛，整篇行动研究就会失焦。',
    reviewerEn:
      'Reviewers usually test whether four links hold: whether the classroom problem is specific enough, whether the intervention actually targets that problem, whether the data collection covers performance, interaction, and learner feedback, and whether the reflection is evidence-based rather than based on “the lesson felt smoother.” If any one link becomes vague, the whole action-research cycle loses focus.',
    workflowZh:
      '更稳的推进方式，是把研究写成一个微型循环：先描述你在课堂中持续观察到的瓶颈，再说明你设计了什么动作去回应它，随后用多种小规模证据判断变化是否出现，最后反过来解释这次干预为何有效、为何部分有效或为何无效。这样论文主体会像一轮教学试验，而不是一篇泛论教学价值的文章。',
    workflowEn:
      'A more reliable route is to write the project as a compact cycle: describe the recurring bottleneck you observed, explain the instructional move you designed to address it, use several small-scale forms of evidence to judge whether change occurred, and then interpret why the intervention worked, partly worked, or did not work. The paper then reads like a teaching inquiry rather than a general essay on educational value.',
    stepsZh: [
      '先把问题压到可观察层。不要写“学生自主学习能力不足”这种全局性判断，而要写成“在小组任务中，学生无法用学科术语解释自己的选择”这种能在课堂里被看见、被记录、也被改动的问题。',
      '第二步设计干预时，只改有限几个动作。比如调整提问顺序、增加同伴反馈模板、替换阅读支架或修改课堂任务要求。行动研究不是同时改革整门课，而是在一个可控范围内测试哪种教学动作真的改变了学习过程。',
      '第三步收集证据时，用两到三条互相补位的通道就够了，例如课堂观察记录、学生作业样本、简短反馈表或访谈摘录。关键不是数据“多”，而是这些材料能否共同回答：改变有没有发生、发生在谁身上、是如何发生的。',
    ],
    stepsEn: [
      'Narrow the problem to something observable. Instead of saying that students lack autonomous learning ability, define the issue as something visible in practice, such as students being unable to explain their choices with disciplinary terms during group tasks.',
      'When designing the intervention, change only a limited number of actions. Reorder prompts, add a peer-feedback template, replace a reading scaffold, or modify one task requirement. Action research does not reform an entire course at once; it tests which instructional move actually changes the learning process within a controlled slice.',
      'For evidence collection, two or three complementary channels are enough, such as observation notes, student work samples, brief feedback forms, or interview extracts. The point is not volume, but whether these materials together answer whether change occurred, for whom, and through what mechanism.',
    ],
    evidenceZh:
      '教育行动研究的说服力，来自“证据之间能否互相解释”。如果课堂记录显示学生参与更多，作业样本却没有进步，你就需要解释增加的是表层发言还是深层理解；如果反馈表很积极，观察记录却显示少数学生一直沉默，也不能只写总体效果良好。研究生层面的行动研究，关键在于敢于面对混合结果。',
    evidenceEn:
      'The persuasiveness of educational action research depends on whether different forms of evidence can explain one another. If observation notes show more participation but student work does not improve, you need to decide whether the change was surface talk rather than deeper understanding. If feedback is positive but several students remained silent throughout, you cannot simply write that the intervention worked well overall.',
    extensionZh:
      '如果你想继续写深，可以把这轮研究放进更长的教学循环中：说明第一轮试验暴露了什么边界，下一轮准备如何调整对象、任务或评价方式，并区分哪些结论只适用于你的班级情境，哪些经验具有更广的可迁移价值。这样反思部分就不会停留在“今后还需进一步研究”。',
    extensionEn:
      'To deepen the project, place this cycle inside a longer teaching sequence: state what the first round exposed, how the next round would adjust the participants, task, or assessment, and which conclusions are context-specific versus more transferable. That keeps the reflection section from ending with the empty phrase that more research is needed.',
    sourceNoteZh:
      '这里主要借鉴 PEARLL 对 action research 的定义、step-by-step guide 和可下载模板。它特别强调教师在自身课堂情境里进行实践性探索，并通过反馈表、模板和循环设计把问题、行动与证据连接起来，这一点非常适合重写教育学方法部分。',
    sourceNoteEn:
      'This approach is inspired mainly by PEARLL’s definition of action research, its step-by-step guide, and the downloadable template. PEARLL is especially useful because it insists on context-based, practice-oriented inquiry and provides tools that connect problem, action, and evidence.',
    checklistZh:
      '最后检查你的行动研究是否过关：问题是否能在课堂里被观察；干预动作是否与问题直接对应；证据是否不只来自一种渠道；反思是否写出了有效、无效与条件限制；整篇论文是否展示了一次真实循环，而不是一组“改进建议”。',
    checklistEn:
      'Before submitting, check whether the problem is classroom-observable, whether the intervention directly targets it, whether the evidence comes from more than one channel, whether the reflection includes effectiveness, non-effectiveness, and boundary conditions, and whether the paper shows a real cycle rather than a list of teaching suggestions.',
    closingZh:
      '这一轮写完后，你应该得到的是一篇能看见课堂纹理的教育学论文：问题在哪里、动作是什么、证据怎么说、下一轮怎么改。只有当这些环节扣紧，行动研究才不会沦为教学理念表态，而会成为真正能支持改课决策的研究文本。',
    closingEn:
      'After this revision, you should have an education paper with classroom texture: where the problem sits, what action was taken, what the evidence says, and how the next cycle changes. Only when those parts lock together does action research become a decision-supporting inquiry rather than a declaration of teaching ideals.',
  },
  {
    categorySlug: 'masters-thesis',
    degreeSlug: 'masters',
    disciplineSlug: 'management',
    stageSlug: 'methods-analysis',
    slug: 'masters-management-case-analysis-recommendation-memo-methods-analysis-guide',
    imageFilename: 'paperbridge-methods-data.webp',
    titleZh: '管理学案例分析别只讲故事：先拆症状、原因、约束，再写建议',
    titleEn:
      'Do Not Let a Management Case Analysis Become Storytelling: Separate Symptoms, Causes, Constraints, and Recommendations',
    metaTitleZh: '管理学案例分析别只讲故事：先拆症状、原因、约束，再写建议',
    metaTitleEn:
      'Do Not Let a Management Case Analysis Become Storytelling: Separate Symptoms, Causes, Constraints, and Recommendations',
    metaDescriptionZh:
      '围绕管理学案例分析最常见的“描述很多、分析不足、建议空泛”问题，整理问题定义、假设边界、因果拆解与 recommendation memo 的写法。',
    metaDescriptionEn:
      'A source-inspired guide to management case analysis that focuses on issue definition, assumptions, causal diagnosis, and feasible recommendations.',
    introZh:
      '管理学案例分析最容易写成企业故事复盘。公司做了什么、市场发生了什么、管理层说了什么，全都写得很顺，但真正决定论文质量的分析环节却很薄：问题究竟是什么、哪些只是表面症状、有哪些信息来自立场鲜明的参与者、建议到底针对哪一层原因。',
    introEn:
      'Management case analysis often slips into a smooth retelling of the company story. The firm did this, the market changed that, managers said something else, and the draft remains readable but analytically thin. The paper still has not identified the actual problem, which signals are only symptoms, which information may be biased, or which level of cause the recommendation is meant to address.',
    pressureZh:
      'NYU Stern 的 case analysis 指南提醒得很直接：案例材料是真实世界情境，不是专门替你准备好的“坏管理例子”；信息可能不完整，也可能带偏见；必要时可以作假设，但必须明确标注。更重要的是，教师读过案例本身，真正想看的不是你复述了多少事实，而是你怎样用事实支持分析和建议。',
    pressureEn:
      'NYU Stern’s case analysis guide puts the point clearly: case materials are real-world situations, not neatly prepared examples of bad management; the information may be incomplete and biased; assumptions may be necessary, but they must be labeled. Most importantly, instructors have already read the case. What matters is not how much of it you retell, but how you use it to support analysis and recommendation.',
    reviewerZh:
      '导师和评审通常先看四件事：你识别的是决策问题还是经营现象；你有没有把症状和原因区分开；假设是否必要且现实；建议是否真正从分析推出，并考虑实施成本、时间和副作用。很多管理学论文建议写得很漂亮，但一追问因果链，就发现建议只是在重复理想状态。',
    reviewerEn:
      'Reviewers usually test whether you identified a decision problem rather than just an operating phenomenon, whether symptoms are separated from causes, whether assumptions are both necessary and realistic, and whether the recommendations truly follow from the analysis while accounting for cost, timing, and side effects. Many management papers offer polished recommendations that collapse the moment their causal logic is questioned.',
    workflowZh:
      '更稳的路线，是先做问题树。把“利润下降”“员工流失”“项目延期”这类现象放在表层，再继续追问其背后是流程问题、激励错配、信息不对称、战略定位错误，还是外部约束变化。等原因链比较清晰后，再决定你的建议应该落在组织结构、流程改造、绩效机制、资源配置还是执行节奏上。',
    workflowEn:
      'A steadier route starts with a problem tree. Put outcomes such as falling profit, turnover, or project delay on the surface layer, then keep asking whether the underlying cause is process failure, incentive misalignment, information asymmetry, strategic misfit, or changing external constraints. Only after the causal chain is clearer should you decide whether the recommendation belongs in structure, process, incentives, resource allocation, or execution timing.',
    stepsZh: [
      '先定义“当前最需要被解决的决策问题”而不是“这个公司遇到了很多难题”。好的案例分析一般会把问题收束成一句管理决策句，例如“企业是否应在现阶段继续推进多品牌扩张”，这样后面的分析才知道该筛掉哪些枝节。',
      '第二步把信息按可信度分层。管理者表态、员工访谈、财务指标、行业数据和媒体报道的证据强度不同，不能平铺直叙。你需要同时注明哪些信息是事实、哪些是推断、哪些可能受角色立场影响，这会直接决定你的建议是否站得住。',
      '第三步写建议时，不要只给方向，要给路径。建议需要交代实施主体、资源需求、时间顺序、可能阻力与预期副作用。真正成熟的 recommendation 不是“企业应加强激励”，而是“针对哪类团队、在何种周期内、用什么配套约束来调整激励”。',
    ],
    stepsEn: [
      'Define the decision problem rather than saying the company has many difficulties. Strong case analyses usually narrow the issue to one managerial decision sentence, such as whether the firm should continue expanding a multi-brand strategy at the current stage. That sentence determines what evidence belongs and what can be cut.',
      'Layer the information by reliability. Executive statements, employee interviews, financial indicators, industry data, and media reports do not carry the same evidentiary weight. Mark which claims are facts, which are inference, and which may be colored by role position. That distinction strongly affects how credible the recommendation will be.',
      'When writing recommendations, provide a path rather than a direction alone. State the implementing actor, required resources, timing sequence, expected resistance, and possible side effects. Mature recommendations do not say the firm should strengthen incentives; they specify for whom, over what period, and with what balancing controls.',
    ],
    evidenceZh:
      '管理学案例分析的证据链，应该同时包含组织内部和外部环境。内部看流程、角色、预算与绩效数据，外部看竞争格局、政策压力和行业节奏。只有这样，你才能判断某个问题是企业内部管理失灵，还是企业对外部变化反应过慢，而不是把所有困难都归成同一种“执行不到位”。',
    evidenceEn:
      'The evidentiary chain in management case analysis should include both internal organization and external environment. Internally, examine process, role structure, budgets, and performance data; externally, examine competition, regulation, and industry timing. Only then can you decide whether the issue is internal managerial failure or delayed adaptation to external change instead of reducing everything to weak execution.',
    extensionZh:
      '如果你想把这篇继续写深，可以把建议部分做成“主方案 + 备选方案 + 不作为后果”三联结构。这样读者不仅知道你主张什么，也能看到你为什么不选另一条路，以及如果企业维持现状会承担什么成本。研究生论文最怕的不是没有结论，而是只有单一路径却完全没有比较意识。',
    extensionEn:
      'To deepen the analysis further, build the recommendation section as a three-part comparison: primary option, alternative option, and cost of inaction. That way readers see not only what you support, but why you reject another path and what maintaining the status quo would likely cost. Graduate-level case writing suffers less from missing conclusions than from one-track conclusions with no comparative awareness.',
    sourceNoteZh:
      '这一篇主要参考 NYU Stern 的 case analysis 指南，尤其是对 biased information、明确假设、分析重于复述、建议要可行可执行这些要求。它很适合拿来校正管理学案例写作里“故事讲得顺、判断却发虚”的问题。',
    sourceNoteEn:
      'This article is driven mainly by NYU Stern’s case analysis guide, especially its emphasis on biased information, labeled assumptions, analysis over description, and feasible recommendations. It is particularly useful for correcting management drafts that tell the story smoothly but make weak judgments.',
    checklistZh:
      '交稿前检查：问题句是否够集中；症状与原因是否分层；假设是否显式标注；每条建议是否能回指到前文分析；有没有写清成本、时序和风险；如果删掉事实复述段后论证仍然成立，说明分析部分才是真正的主体。',
    checklistEn:
      'Before submission, check whether the problem sentence is focused, whether symptoms and causes are layered, whether assumptions are explicit, whether each recommendation traces back to the analysis, and whether cost, sequence, and risk are visible. If deleting large chunks of factual retelling leaves the argument intact, that usually means the analytical core is finally doing its job.',
    closingZh:
      '这一轮写完后，你应该得到一篇真正围绕管理决策展开的案例分析：问题是什么，为什么发生，哪些信息可信，建议如何执行。只有当分析链比故事线更清楚，管理学案例论文才会显得像管理研究，而不是企业新闻的加长版。',
    closingEn:
      'After this revision, you should have a case analysis genuinely organized around managerial decision: what the problem is, why it happened, which information is credible, and how the recommendation would be carried out. Once the analytic chain becomes clearer than the narrative chain, the paper starts to sound like management research rather than a long-form company article.',
  },
  {
    categorySlug: 'undergraduate-thesis',
    degreeSlug: 'undergraduate',
    disciplineSlug: 'nursing',
    stageSlug: 'methods-analysis',
    slug: 'undergraduate-nursing-careplan-soap-intervention-methods-analysis-guide',
    imageFilename: 'paperbridge-methods-data.webp',
    titleZh: '护理学论文别把干预写成流水账：像 SOAP 一样区分线索、评估与护理计划',
    titleEn:
      'Do Not Turn Nursing Intervention Writing into a Diary: Use a SOAP-Like Logic for Evidence, Assessment, and Care Planning',
    metaTitleZh: '护理学论文别把干预写成流水账：像 SOAP 一样区分线索、评估与护理计划',
    metaTitleEn:
      'Do Not Turn Nursing Intervention Writing into a Diary: Use a SOAP-Like Logic for Evidence, Assessment, and Care Planning',
    metaDescriptionZh:
      '围绕护理学论文和个案写作中常见的“病情描述很多、护理判断很弱、计划不具体”问题，整理护理诊断、SOAP 逻辑和个体化 interventions 的写法。',
    metaDescriptionEn:
      'A source-inspired guide to nursing writing that connects observation, nursing assessment, SOAP-style clarity, and patient-specific care planning.',
    introZh:
      '护理学论文常见的问题，不是缺少病情材料，而是材料很多却没有被组织成护理判断。作者把主诉、生命体征、既往病史、情绪反应和处置过程全都堆在一起，最后却只得到一句泛泛的“加强健康宣教”或“密切观察病情”，让干预看起来像流水账而不是专业护理计划。',
    introEn:
      'A common weakness in nursing writing is not the absence of clinical material, but the failure to turn abundant material into a nursing judgment. Writers stack symptoms, vitals, history, emotional responses, and care steps together, then end with vague statements such as strengthening health education or monitoring closely. The intervention reads like a diary rather than a professional care plan.',
    pressureZh:
      'Purdue OWL 关于 professional nurse writing 的资源特别强调，护理诊断不是医学诊断，careplan 也不只是把医生诊断换一种说法。另一个关键提醒来自 SOAP note tips：记录要准确、专业、非评判，并且围绕读者真正需要的信息组织。对护理学论文来说，这意味着你必须把线索、评估和计划分层，而不是一股脑写成病历叙事。',
    pressureEn:
      'Purdue OWL’s writing resources for nurses stress that a nursing diagnosis is not the same as a medical diagnosis and that a care plan is not a rewritten physician statement. Its SOAP note tips add another requirement: documentation must be accurate, professional, nonjudgmental, and organized around what the reader actually needs. In a nursing paper, that means separating cues, assessment, and plan instead of narrating the case as a single clinical story.',
    reviewerZh:
      '导师和评审会先看你有没有真正完成护理判断：病人的关键问题是否被识别并命名；这些问题是否由可见线索支持；拟定的 intervention 是否针对患者具体情况而不是模板化套用；评价部分有没有告诉读者护理动作之后发生了什么变化。只要 assessment 不清，后面的 plan 就只能停留在口号层面。',
    reviewerEn:
      'Reviewers first ask whether you actually produced a nursing judgment: was the key problem identified and named, is it supported by observable cues, are the interventions tailored to the patient rather than borrowed from a template, and does the evaluation section show what changed after care actions were taken? If the assessment is weak, the plan remains generic no matter how polished the language sounds.',
    workflowZh:
      '更稳的写法，是把一段护理叙述改造成“线索—判断—行动—评价”四段链条。线索包括主诉、客观观察与量化指标；判断是护理问题而非医学标签；行动是具体、可执行、带频率和责任主体的 intervention；评价则说明病人反应、依从性变化或风险是否下降。只要沿着这条链写，论文就会更像护理分析而不是病程记录。',
    workflowEn:
      'A steadier route is to rebuild each nursing passage into a four-part chain: cues, judgment, action, and evaluation. Cues include subjective reports, objective observation, and quantified indicators. Judgment identifies a nursing problem rather than simply repeating a medical label. Action specifies a concrete intervention with frequency and responsible actor. Evaluation states whether the patient response, adherence, or risk level changed. Following this chain makes the paper sound like nursing analysis rather than routine charting.',
    stepsZh: [
      '先把资料按主观和客观线索拆开。病人说了什么、护士看到了什么、监测到了什么，这三类信息不能混写。只有把线索分层，你才能判断哪些是患者体验，哪些是客观风险，哪些只是背景信息。',
      '第二步把“诊断”改写成护理问题句。例如，不要停留在“糖尿病患者血糖波动”，而要进一步写成“存在血糖控制不稳定风险，表现为……，与……相关”。这一步决定你的 intervention 是不是具有针对性，也决定读者能否看见护理专业判断。',
      '第三步写计划和评价时，一定让动作可执行、结果可追踪。比如宣教要说明对象、内容和方式，观察要说明频率和指标，评价要说明变化是通过什么证据判断出来的。没有这些具体信息，护理计划再完整也只是形式完整。',
    ],
    stepsEn: [
      'Start by separating subjective and objective cues. What the patient reports, what the nurse observes, and what monitoring records are not interchangeable. Only when these cues are layered can you decide which belong to patient experience, which indicate objective risk, and which are merely contextual background.',
      'Then rewrite the diagnosis into a nursing problem sentence. Do not stop at a medical condition such as unstable blood glucose. Push it into a nursing problem with evidence and relation, for example a risk for unstable control evidenced by specific signs and linked to a particular context. This is where professional nursing judgment becomes visible.',
      'When writing the plan and evaluation, make each action executable and each outcome traceable. Education should specify audience, content, and mode. Observation should specify frequency and indicator. Evaluation should specify by what evidence improvement or non-improvement was judged. Without that detail, the plan remains formally complete but practically empty.',
    ],
    evidenceZh:
      '护理写作中的证据，不只是检验单和量表，也包括患者自述、家属反馈、依从性表现和护理观察。真正重要的是不同证据之间能否互相支持或解释冲突。例如，患者口头表示理解宣教内容，但实际依从性仍然差，这就要求你重新判断问题是知识不足、执行障碍还是情绪压力过大。',
    evidenceEn:
      'Evidence in nursing writing includes more than lab reports or scales. Patient statements, family feedback, adherence patterns, and nursing observation also matter. The real question is whether these forms of evidence support one another or expose conflict. A patient may verbally understand health education yet still show poor adherence, which means the issue may be execution barriers or emotional strain rather than knowledge alone.',
    extensionZh:
      '如果你想把论文继续写深，可以补入循证护理的论证层：为什么选这类 intervention，而不是其他替代方案；这项护理动作的边界条件是什么；病人的年龄、认知状态、家庭支持或共病情况怎样改变了计划可行性。这样你的护理计划就不只是“做什么”，还会解释“为什么这样做、对谁有效、何时需要调整”。',
    extensionEn:
      'To deepen the paper further, add an evidence-based nursing layer: why this intervention was chosen over alternatives, what its boundary conditions are, and how age, cognition, family support, or comorbidity change feasibility. The care plan then explains not only what to do, but why to do it, for whom it works, and when it should be adjusted.',
    sourceNoteZh:
      '这篇主要参考 Purdue OWL 关于 writing as a professional nurse 的 charting 分类、careplan 三部分结构，以及 SOAP note tips 对专业语气、时间控制和非评判表达的要求。这些公开资料非常适合把护理论文中的病例材料重新组织成更专业的护理判断链。',
    sourceNoteEn:
      'This article draws mainly on Purdue OWL’s guidance on writing as a professional nurse, especially its charting categories and care-plan structure, together with the SOAP note tips on professional tone, timing, and nonjudgmental expression. These public guides are highly useful for reorganizing case material into a professional nursing reasoning chain.',
    checklistZh:
      '交稿前最后检查：线索是否分成主观与客观；护理问题是否不是简单复制医学诊断；每条 intervention 是否真正贴合患者处境；评价是否写明了依据；文风是否准确而不带评判。如果把病人姓名遮住，其他护理人员能否仅凭你的文字继续接手护理，这是很好的自测标准。',
    checklistEn:
      'Before submission, check whether cues are separated into subjective and objective forms, whether the nursing problem is more than a copied medical diagnosis, whether each intervention fits the patient context, whether the evaluation names its evidence, and whether the tone remains accurate without becoming judgmental. A good self-test is whether another nurse could continue care from your writing alone.',
    closingZh:
      '这一轮写完后，你应该得到的是一条更清楚的护理逻辑链：病人呈现了什么、护士如何判断、为什么采取这些动作、效果如何被评估。只要这条链条成立，护理学论文就会更像专业照护分析，而不是单纯把病程经过写长。',
    closingEn:
      'After this revision, you should have a much clearer nursing logic chain: what the patient presented, how the nurse judged it, why those actions were chosen, and how the effect was evaluated. Once that chain holds, the paper begins to read like professional care analysis instead of a longer version of the patient course.',
  },
  {
    categorySlug: 'undergraduate-thesis',
    degreeSlug: 'undergraduate',
    disciplineSlug: 'journalism',
    stageSlug: 'proposal',
    slug: 'undergraduate-journalism-interview-source-map-proposal-guide',
    imageFilename: 'paperbridge-masters-planning.webp',
    titleZh: '新闻传播选题别先写观点：先搭“问题—来源—采访—核验”四层框架',
    titleEn:
      'Do Not Start a Journalism Project with Opinion: Build a Question, Source, Interview, and Verification Frame First',
    metaTitleZh: '新闻传播选题别先写观点：先搭“问题—来源—采访—核验”四层框架',
    metaTitleEn:
      'Do Not Start a Journalism Project with Opinion: Build a Question, Source, Interview, and Verification Frame First',
    metaDescriptionZh:
      '围绕新闻传播选题与前期采写中常见的“观点先行、来源单薄、采访低效”问题，整理采访提纲、来源地图和证据核验的写法。',
    metaDescriptionEn:
      'A source-inspired guide to journalism and communication projects that focuses on source mapping, interview design, and evidence verification before drafting.',
    introZh:
      '新闻传播类论文和项目很容易一上来就有立场，却没有来源结构。作者对平台现象、公共议题或媒体策略有很多判断，但一细问就会发现：核心材料来自几篇评论文章，采访对象过于单一，原始文件没有准备好，最后只能让文章靠观点撑着走。',
    introEn:
      'Journalism and communication projects often begin with a position but not with a source structure. Writers have many judgments about platform dynamics, public issues, or media strategy, but once questioned more closely, the project turns out to rest on a few opinion pieces, a narrow interview pool, and little access to original documentation.',
    pressureZh:
      'Purdue Global 关于采访的指导和 Purdue OWL 对来源评估的资源都在强调一个前提：写之前先决定你需要什么信息，以及这些信息最可靠的获取路径。对新闻传播写作来说，选题不是先下判断，而是先形成一张来源地图，区分谁提供事实、谁提供背景、谁提供利益立场、谁可能成为互相核验的支点。',
    pressureEn:
      'Purdue Global’s guidance on conducting interviews and Purdue OWL’s source-evaluation resources both stress the same premise: before writing, decide what information you need and which route can supply it most reliably. In journalism-oriented writing, topic selection is therefore not a matter of judging first. It starts with a source map that distinguishes fact providers, background explainers, interested actors, and verification anchors.',
    reviewerZh:
      '导师和评审在开题阶段通常会看：你的问题是否足够明确到能被采访和文档支撑；来源是否存在层级，而不是全部来自同一类型；采访提纲能否逼出具体事实而非空泛表态；核验路径是否已经预想好。只要这些环节没有提前想清，后面写作几乎一定会滑向“我觉得”。',
    reviewerEn:
      'At proposal stage, reviewers usually ask whether the question is precise enough to be supported by interviews and documents, whether the sources are layered rather than all of one type, whether the interview guide can elicit specifics rather than slogans, and whether a verification route already exists. If those pieces are not built early, the later draft almost always slides toward “I think.”',
    workflowZh:
      '更稳的推进方式，是先把题目写成一个可核验的问题，再围绕问题搭建四层来源：第一层是一手文件或数据，第二层是核心采访对象，第三层是背景专家或研究者，第四层是反方或受影响方。你真正写作时，就不会只依赖单一路径，而能在不同来源之间来回校准。',
    workflowEn:
      'A steadier route is to turn the topic into a verifiable question and then build four source layers around it: primary documents or data, core interviewees, background experts or researchers, and affected or opposing parties. When you eventually draft the piece, you are no longer dependent on a single route and can calibrate claims across different forms of evidence.',
    stepsZh: [
      '第一步先做来源地图，而不是直接写提纲。把机构文件、公开数据、平台规则、采访对象和现场观察按可获取性与可信度列出来。这样你会立刻发现问题是否做得动，也能看出最薄弱的证据环节在哪里。',
      '第二步设计采访时，问题要逼向事实与决策过程，而不是停留在价值表达。与其问“您怎么看这个问题”，不如问“这一决定是什么时候形成的、依据什么材料、有没有反对意见、最后由谁拍板”。可验证细节越多，后续写作越不容易飘。',
      '第三步写开题或前言时，把“观点”往后放，把“可验证路径”往前放。先告诉读者你要追什么问题、准备找哪些人、看哪些材料、如何互相核验，再决定自己的解释立场。这样文章会更像新闻研究或传播分析，而不是评论体。',
    ],
    stepsEn: [
      'Begin with a source map rather than with the draft outline. List organizational documents, public data, platform rules, interview targets, and field observations by accessibility and credibility. This quickly reveals whether the project is feasible and where the weakest evidentiary link sits.',
      'When designing interviews, push toward facts and decision processes rather than value statements. Instead of asking what someone thinks about the issue, ask when the decision was formed, what materials informed it, whether there were objections, and who made the final call. The more verifiable detail you gather, the less the later draft will float.',
      'When writing the proposal or opening, move opinion backward and the verification path forward. Tell readers what question is being pursued, whom you plan to interview, what materials you will inspect, and how the claims will be cross-checked before deciding your interpretive position.',
    ],
    evidenceZh:
      '新闻传播类写作真正有力量时，证据来自不同来源之间的对照。受访者说法和公开文件是否一致，平台规则与用户体验是否冲突，政策文本和执行现实是否出现落差，这些差异往往比单一来源的“金句”更值得写。采访材料越好，越不是为了出一句漂亮的话，而是为了把事实链补完整。',
    evidenceEn:
      'Journalism and communication writing becomes powerful when evidence emerges through comparison across source types. Does an interviewee’s account align with public documents, do platform rules conflict with user experience, does policy text diverge from implementation? These gaps often matter more than any single quotable sentence. Strong interview material is not gathered for style; it is gathered to complete the fact chain.',
    extensionZh:
      '如果你想把项目继续写深，可以在采访和资料整理之后补一层“编码框架”。比如按主体类型、叙事策略、平台机制或风险节点给素材分类，这样后续无论写报道分析还是传播研究，都能从材料里长出更有结构的判断，而不是到写作时才临场找主题。',
    extensionEn:
      'To deepen the project, add a coding frame after interviews and document collection. Categorize material by actor type, narrative strategy, platform mechanism, or risk node. That way the later reporting analysis or communication study grows from the material itself instead of inventing themes at drafting stage.',
    sourceNoteZh:
      '这一篇主要借鉴 Purdue Global 关于 conducting personal interviews 的建议，以及 Purdue OWL 对来源评估和研究前期资料分类的思路。它们共同强调的一点是：采访和资料不是写作后的装饰，而是选题一开始就要搭好的证据骨架。',
    sourceNoteEn:
      'This article is shaped mainly by Purdue Global’s advice on conducting personal interviews and Purdue OWL’s approach to source evaluation and research preparation. Their shared lesson is that interviews and documents are not decorative additions after writing; they are the evidentiary skeleton built at the start.',
    checklistZh:
      '交稿前检查：问题是否可核验；来源是否不止一种类型；采访问题是否能逼出具体事实；有没有预备反方或补充核验对象；你当前的主张是否已经被材料支撑，而不是只被态度支撑。只要来源地图一塌，文字再漂亮也撑不住。',
    checklistEn:
      'Before submission, ask whether the question is verifiable, whether the sources are more than one type, whether interview prompts can elicit concrete facts, whether opposing or supplementary verification sources exist, and whether your current argument is supported by material rather than by attitude alone. If the source map collapses, elegant prose will not save the project.',
    closingZh:
      '这一轮做完后，你应该拥有一套更像新闻或传播项目的前期框架：问题明确，来源分层，采访可执行，核验有路径。只要这个架子先搭好，后面的写作就不会被观点牵着跑，而会被事实一步步推出来。',
    closingEn:
      'After this stage, you should have a preparation frame that actually belongs to journalism or communication work: a clear question, layered sources, executable interviews, and a verification path. Once that structure is built first, the writing no longer chases opinion; it is pulled forward by fact.',
  },
  {
    categorySlug: 'doctoral-thesis',
    degreeSlug: 'doctoral',
    disciplineSlug: 'computer-science',
    stageSlug: 'revision-defense',
    slug: 'doctoral-computer-science-artifact-reproducibility-package-revision-defense-guide',
    imageFilename: 'paperbridge-defense-revision.webp',
    titleZh: '计算机论文别只会讲贡献：把 artifact、README 与复现路径一起交代清楚',
    titleEn:
      'Do Not Defend a Computer Science Paper with Contribution Claims Alone: Make the Artifact, README, and Reproduction Path Explicit',
    metaTitleZh: '计算机论文别只会讲贡献：把 artifact、README 与复现路径一起交代清楚',
    metaTitleEn:
      'Do Not Defend a Computer Science Paper with Contribution Claims Alone: Make the Artifact, README, and Reproduction Path Explicit',
    metaDescriptionZh:
      '围绕计算机论文定稿与答辩阶段常见的“代码有、复现难、结果表无法落地”问题，整理 artifact package、README、脚本化运行与 claim 对齐写法。',
    metaDescriptionEn:
      'A source-inspired guide to computer science revision and defense writing, focused on artifact packaging, README design, reproducibility scripts, and claim-to-result alignment.',
    introZh:
      '计算机论文最常见的定稿问题，不是“没有代码”，而是“有代码但别人用不了”。论文里写了系统架构、实验结果和性能提升，答辩时也能口头解释得很清楚，可一旦让别人真正复现 Figure 4、Table 3 或关键 baseline，对方就会卡在环境、数据版本、配置文件、脚本入口和输出映射上。',
    introEn:
      'One of the most common final-stage problems in computer science papers is not the absence of code, but code that others cannot use. The paper may describe the architecture, experiments, and gains convincingly, and the defense presentation may sound polished, yet the moment someone tries to reproduce Figure 4, Table 3, or a key baseline, they get stuck on environment, data versions, configs, scripts, or output mapping.',
    pressureZh:
      'iFM 2025 的 artifact guidance 很有代表性：artifact 应该让一个不是本小领域专家的计算机研究者也能运行，文档要尽量 self-contained，README 不求冗长但必须足够清楚，并且要明确说明论文里究竟要复现哪一张表、哪一个图、哪一项结果。对博士论文或高阶投稿来说，这已经不是加分项，而是可信度的一部分。',
    pressureEn:
      'The iFM 2025 artifact guidance is representative of what many CS venues now expect: the artifact should be usable by a computer scientist who is not a specialist in your subfield, the documentation should be largely self-contained, the README should be concise but clear, and the paper must state exactly which tables, figures, or results are being reproduced. At doctoral or submission level, this is no longer a bonus. It is part of credibility.',
    reviewerZh:
      '导师、答辩委员和评审真正先看的是三件事：你的 claims 是否能一一对应到实验输出；别人是否能通过 README 和脚本以合理成本复现主要结果；你有没有诚实写出运行边界、硬件需求和不能完全开放的部分。只要这些信息缺位，论文里的“可复现”“开源”很容易变成口号。',
    reviewerEn:
      'Advisors, committee members, and reviewers usually check three things first: whether your claims map cleanly to concrete experiment outputs, whether a reader can reproduce the major results at reasonable cost using the README and scripts, and whether you honestly document runtime limits, hardware needs, and pieces that cannot be fully released. Without these, claims of openness or reproducibility quickly become hollow.',
    workflowZh:
      '更稳的路线，是在定稿时做一张“claim 对齐表”。左边列论文中的主要贡献和结果表，右边列对应的数据集、代码目录、运行命令、随机种子、输出文件名和预期数值范围。这样你不仅能重写 README，也能反向检查论文文字有没有夸大那些其实还无法稳定复现的结果。',
    workflowEn:
      'A steadier route is to build a claim-alignment table at final revision. On the left, list each major contribution and result table from the paper. On the right, record the dataset, code path, command, seed, output file, and expected value range that support it. This table helps rewrite the README and also lets you check whether the prose overstates results that are not yet stably reproducible.',
    stepsEn: [
      'Start by listing every figure, table, and headline result that the paper depends on. If you cannot point to the exact script, config, checkpoint, dataset version, and output file behind a claim, that part of the paper is not yet final even if the paragraph sounds polished.',
      'Then rewrite the README from the perspective of an outsider. The crucial question is not whether your lab mate can run it, but whether someone with general CS training can install the environment, understand the input, execute the pipeline, and recognize successful output without guessing hidden assumptions.',
      'Finally, state the boundaries of reproducibility explicitly. If a full run needs days, specialized hardware, or restricted data, say so clearly and provide a lightweight route for sanity-check execution or partial reproduction. Honest limits usually strengthen trust more than inflated completeness.',
    ],
    stepsZh: [
      '第一步先列出论文依赖的每一张图、每一个表和每一条 headline 结果。如果你无法立即指出它对应的脚本、配置、checkpoint、数据版本和输出文件，那部分内容就还没有真正定稿，即便文字已经写得很像定稿。',
      '第二步从外部读者视角重写 README。关键不是实验室同门能不能跑通，而是一个普通计算机研究者能否顺着文档完成环境安装、理解输入格式、执行命令并判断输出是否成功。README 写不好，artifact 再完整也会像没有交。',
      '第三步明确写出复现边界。如果完整运行需要很长时间、特殊硬件或受限数据，就要诚实说明，同时提供一个轻量 sanity check 或局部复现入口。比起假装“完全可复现”，清楚地写出哪些能复现、哪些暂时不能，往往更能赢得信任。',
    ],
    evidenceZh:
      '计算机论文里的证据，不只是一串指标，更是指标背后的生成路径。随机种子、版本信息、baseline 设置、异常处理、失败样本和环境差异都可能改变结果解释。真正强的定稿，不会只把最好看的数字写进去，而会让读者知道数字是怎样稳定地被生产出来的。',
    evidenceEn:
      'Evidence in a CS paper is not only the metric itself, but the path that produced it. Random seeds, version information, baseline settings, failure handling, outlier samples, and environment differences can all change the meaning of a result. A strong final draft does not merely publish the prettiest number; it shows how that number is stably produced.',
    extensionZh:
      '如果你想继续把论文写深，可以把 artifact 包和正文更紧密地互指：在附录里增加运行说明、实验矩阵和失败案例说明；在正文里标出哪些结论来自 full run、哪些来自 ablation、哪些只是 exploratory finding。这样答辩时你就不是靠口头补充细节，而是靠文稿本身建立复现逻辑。',
    extensionEn:
      'To deepen the paper further, make the artifact package and the manuscript point to one another more explicitly. Add execution notes, experiment matrices, and failure-case explanations to the appendix, and label in the main text which findings come from full runs, which from ablations, and which are still exploratory. Then the defense does not rely on verbal repair; the document itself carries the reproducibility logic.',
    sourceNoteZh:
      '这篇主要参考 iFM 2025 的 artifact evaluation 建议，尤其是 easy-to-use scripts、self-contained documentation、README 控制篇幅以及“明确说明复现论文哪一处结果”这些要求。这类公开 artifact call 对写博士论文的实验部分和附录尤其有借鉴价值。',
    sourceNoteEn:
      'This article is informed mainly by the iFM 2025 artifact-evaluation recommendations, especially the emphasis on easy-to-use scripts, self-contained documentation, concise README design, and explicit links to the exact paper results being reproduced. These public artifact calls are highly instructive for doctoral experimental chapters and appendices.',
    checklistZh:
      '交稿前检查：每条主要 claim 是否能找到脚本入口；README 是否从零开始可执行；运行边界是否被诚实说明；表格和图是否可对应到输出文件；baseline 与数据版本是否写清；失败情形是否至少被简要交代。只要有一条结果只能靠你自己口头解释，它就还没有真正写稳。',
    checklistEn:
      'Before submission, check whether every major claim has a script entry point, whether the README is executable from scratch, whether runtime limits are stated honestly, whether tables and figures map to output files, whether baselines and data versions are explicit, and whether failure cases are at least briefly acknowledged. If a result can only be explained verbally by you, it is not yet fully written.',
    closingZh:
      '这一轮改完后，你应该得到的不只是“代码仓库已上传”，而是一套别人真的能沿着走完的复现路径。这样论文的贡献不再只靠作者本人说明，而能被 artifact、README 和结果文件共同支撑，这也是计算机研究进入更高可信度的一步。',
    closingEn:
      'After this revision, you should have more than a public repository. You should have a reproduction path that others can actually follow. At that point, the paper’s contribution no longer depends only on the author’s explanation; it is jointly supported by the artifact, the README, and the generated outputs.',
  },
  {
    categorySlug: 'masters-thesis',
    degreeSlug: 'masters',
    disciplineSlug: 'design-studies',
    stageSlug: 'methods-analysis',
    slug: 'masters-design-studies-usability-testing-synthesis-methods-analysis-guide',
    imageFilename: 'paperbridge-methods-data.webp',
    titleZh: '设计学研究别只展示成品图：把可用性测试、启发式问题与迭代依据写出来',
    titleEn:
      'Do Not Let Design Research Show Only the Final Screens: Write the Usability Tests, Heuristic Problems, and Iteration Logic',
    metaTitleZh: '设计学研究别只展示成品图：把可用性测试、启发式问题与迭代依据写出来',
    metaTitleEn:
      'Do Not Let Design Research Show Only the Final Screens: Write the Usability Tests, Heuristic Problems, and Iteration Logic',
    metaDescriptionZh:
      '围绕设计学与 HCI 类论文中常见的“作品好看、证据不足、迭代理由不明”问题，整理 needfinding、可用性测试、heuristic evaluation 与设计迭代叙述的写法。',
    metaDescriptionEn:
      'A source-inspired guide to design-studies and HCI writing, focused on needfinding, usability testing, heuristic evaluation, and evidence-based iteration.',
    introZh:
      '设计学论文很容易被成品图带偏。界面看起来精致、视觉语言也统一，但论文里真正薄弱的常常是：这个方案为什么这样改、哪些设计问题是用户测试逼出来的、哪些只是作者个人偏好、哪些改动解决了高优先级可用性问题。没有证据支撑的设计叙述，往往很快就会变成审美自述。',
    introEn:
      'Design papers are easily seduced by polished final visuals. The interface looks refined and the visual language is coherent, yet the weak point in the writing is often elsewhere: why the design changed in this direction, which problems were revealed by user testing, which choices reflect personal taste, and which revisions actually addressed high-priority usability failures. Without evidence, the design narrative turns into aesthetic autobiography.',
    pressureZh:
      'Stanford CS147 系列项目页给出的流程很有启发性：needfinding、POV/HMW、低保真原型、可用性测试、中保真迭代、启发式评估、最终报告，是一条连续的设计研究链。它提醒我们，设计论文真正重要的不是“最后做出了什么”，而是“如何从用户观察一步步走到方案变化，并留下可解释的证据”。',
    pressureEn:
      'The project structure visible across Stanford CS147 pages is instructive: needfinding, POV and HMW, low-fidelity prototyping, usability testing, medium-fidelity iteration, heuristic evaluation, and final report form a continuous research chain. The lesson is that the core of a design paper is not simply what was made in the end, but how observed user evidence led step by step to design changes that remain interpretable.',
    reviewerZh:
      '导师和评审在方法部分通常会追问：测试任务是否真实对应核心使用场景；问题记录是按严重性还是按时间顺序整理；每一次界面改动有没有对应的用户反馈或 heuristic violation；最终方案是否保留了问题解决的证据，而不是只展示视觉升级。设计学论文一旦只剩“前后对比图”，论证会显得很薄。',
    reviewerEn:
      'In the methods section, reviewers often ask whether the test tasks reflect core usage scenarios, whether findings were organized by severity or merely by chronology, whether each design revision corresponds to user feedback or a heuristic violation, and whether the final solution preserves evidence of problem solving rather than merely visual polish. A design paper that offers only before-and-after screens usually feels thin.',
    workflowZh:
      '更稳的写法，是把方法写成“任务—问题—解释—改动—再验证”的闭环。每个核心场景都应说明用户想完成什么、哪里被卡住、你如何判断这是信息结构问题、交互问题还是认知负荷问题，以及你据此修改了什么。这样设计迭代就不是“我改了一版”，而是“我针对一个证据明确的问题做了哪种响应”。',
    workflowEn:
      'A steadier way to write the methods is to build a loop of task, problem, interpretation, revision, and re-validation. For each core scenario, explain what users were trying to achieve, where they became stuck, how you judged whether the issue was information architecture, interaction flow, or cognitive load, and what revision followed. Iteration then stops sounding like “I made another version” and starts sounding like a response to identifiable evidence.',
    stepsZh: [
      '第一步把可用性测试任务写具体。不要只写“测试用户体验”，而要说明参与者要完成什么、在什么情境下完成、成功标准是什么。任务越具体，你后面记录的问题就越能对应设计目标，而不是对应模糊印象。',
      '第二步整理 findings 时，不要只按用户顺序抄笔记。把问题按严重性、频率和影响位置归类，再结合 heuristic evaluation 去判断哪些问题优先级最高。这样你修改设计时就不会被零散反馈牵着跑，而能围绕关键障碍做决定。',
      '第三步写迭代时，一定保留“为什么改”的句子。是为了减少迷失、降低点击负担、提升可见性，还是为了让用户更早理解系统状态？如果论文里只有“改成了这样”，没有“为了解决什么改成这样”，那就还是作品展示，不是研究写作。',
    ],
    stepsEn: [
      'Write the usability tasks concretely. Do not simply say that you tested user experience. State what participants had to accomplish, in what context, and what success meant. The more concrete the task, the more tightly your later findings connect to actual design goals.',
      'When organizing findings, do not transcribe notes in participant order. Classify issues by severity, frequency, and point of impact, then combine that with heuristic evaluation to decide which problems deserve priority. This keeps the design from chasing scattered reactions instead of addressing core obstacles.',
      'When documenting iteration, preserve the “why” sentence for every revision. Was the change intended to reduce disorientation, lower click burden, increase visibility, or reveal system state earlier? If the paper says only that the interface changed, but not what problem the change answered, it remains a portfolio display rather than research writing.',
    ],
    evidenceZh:
      '设计研究中的证据，既包括用户说了什么，也包括他们做了什么、停在哪里、误解了什么。时间戳、任务完成率、错误路径、口头反馈和 heuristic violation 可以互相补位。真正有说服力的设计论文，不会只记录“用户喜欢/不喜欢”，而会具体指出哪种交互机制导致了什么困难。',
    evidenceEn:
      'Evidence in design research includes not only what users say, but what they do, where they stop, and what they misunderstand. Timestamps, completion rates, error paths, verbal comments, and heuristic violations can reinforce one another. Strong design writing does not stop at whether users liked something; it identifies what interaction mechanism produced which difficulty.',
    extensionZh:
      '如果你想继续写深，可以把测试从实验室情境延伸到真实场景，或者增加一轮 field test，比较不同用户群在同一任务上的差异。你也可以把启发式问题与设计原则一一对应，说明哪些问题来自一致性不足、哪些来自反馈不及时、哪些来自信息层级混乱。这样最终报告会更像设计研究，而不是设计汇报。',
    extensionEn:
      'To deepen the work further, extend testing into more realistic contexts or add a field round comparing how different user groups handle the same task. You can also connect heuristic violations directly to design principles, showing which problems arose from inconsistency, weak feedback, or disordered information hierarchy. That makes the final report read more like design research than a design presentation.',
    sourceNoteZh:
      '这里主要借鉴 Stanford CS147 项目公开页面中从 needfinding、low-fi prototyping、usability testing 到 heuristic evaluation 和 final report 的连续流程。它很适合帮助设计学论文把“视觉结果”往后放，把“证据驱动的迭代逻辑”往前放。',
    sourceNoteEn:
      'This article is shaped mainly by the workflow visible across Stanford CS147 project pages, from needfinding and low-fi prototyping through usability testing, heuristic evaluation, and final reporting. That sequence is especially useful for moving visual outcomes backward and evidence-driven iteration logic forward.',
    checklistZh:
      '交稿前检查：任务是否具体；问题是否按严重性而非流水账整理；每次改动是否都能回指到测试证据；最终方案是否回应了最关键的 usability 问题；论文是否说明了哪些问题仍未解决。设计研究并不需要假装完美，但必须清楚说明决策为什么成立。',
    checklistEn:
      'Before submission, check whether tasks are specific, whether findings are organized by severity rather than diary order, whether each revision traces back to test evidence, whether the final design addresses the most important usability issues, and whether unresolved problems are still acknowledged. Design research does not need to pretend perfection, but it does need to explain why decisions were made.',
    closingZh:
      '这一轮写完后，你应该拥有一篇更像设计研究的论文：它不只展示结果，也展示问题如何被看见、被命名、被修正。只要测试与迭代的证据链写出来，设计学论文的说服力就不再只来自审美完成度，而会来自清晰的研究过程。',
    closingEn:
      'After this revision, the paper should look much more like design research: not only showing the outcome, but also showing how problems were seen, named, and revised. Once the evidence chain of testing and iteration is visible, persuasion comes from research clarity rather than from aesthetic finish alone.',
  },
  {
    categorySlug: 'doctoral-thesis',
    degreeSlug: 'doctoral',
    disciplineSlug: 'mechanical-engineering',
    stageSlug: 'revision-defense',
    slug: 'doctoral-mechanical-engineering-report-sections-revision-defense-guide',
    imageFilename: 'paperbridge-defense-revision.webp',
    titleZh:
      '机械工程定稿别把章节揉成一团：让 abstract、results、discussion、recommendations 各司其职',
    titleEn:
      'Do Not Let a Mechanical Engineering Final Draft Collapse Its Sections: Give the Abstract, Results, Discussion, and Recommendations Separate Jobs',
    metaTitleZh:
      '机械工程定稿别把章节揉成一团：让 abstract、results、discussion、recommendations 各司其职',
    metaTitleEn:
      'Do Not Let a Mechanical Engineering Final Draft Collapse Its Sections: Give the Abstract, Results, Discussion, and Recommendations Separate Jobs',
    metaDescriptionZh:
      '围绕机械工程与工程技术类论文中常见的“章节边界不清、摘要重写正文、结果解释混乱”问题，整理工程报告 section 分工和定稿顺序。',
    metaDescriptionEn:
      'A source-inspired guide to mechanical engineering and technical report writing, focused on section boundaries, abstract design, and body-first final revision.',
    introZh:
      '工程技术类论文常见的定稿问题，是把 methods、results、discussion、conclusion 甚至 recommendations 全部挤在一两个大章节里。结果就是图表很多、数据也不弱，但读者想知道试验怎么做、核心发现是什么、为什么会这样、工程上该怎么用，却需要在同一段里来回寻找。',
    introEn:
      'A common late-stage problem in engineering papers is that methods, results, discussion, conclusions, and even recommendations are compressed into one or two oversized sections. The draft may contain many figures and decent data, but when readers want to know how the experiment was conducted, what the core finding is, why it occurred, and what it means for engineering use, they are forced to search within the same paragraph.',
    pressureZh:
      'Purdue OWL 关于 engineering reports 的资源很有帮助：它明确区分了正文、abstract 和机械性附属部分的写作顺序，并提醒作者先把 body 写清楚，再回头写 abstract。它还把 introduction、methods/procedures、results、discussion of results、conclusions 和 recommendations 分成不同功能区。这种分工对机械工程论文尤其重要，因为很多判断都涉及“数据层”“机理层”和“应用层”的来回切换。',
    pressureEn:
      'Purdue OWL’s engineering report resources are useful precisely because they distinguish the writing order of body, abstract, and mechanical elements, and they recommend writing the body before returning to the abstract. They also separate introduction, methods or procedures, results, discussion of results, conclusions, and recommendations into different functional zones. That separation matters greatly in mechanical engineering, where writers constantly move among data, mechanism, and application.',
    reviewerZh:
      '导师和评审在定稿阶段一般会先看：实验条件和流程是否独立可查；结果部分有没有只陈述发现而不过度解释；discussion 是否真正回到了机理、误差来源和边界条件；conclusion 和 recommendations 是否区分“研究得出了什么”和“工程上建议怎么做”。只要这些边界不清，答辩时就很容易被追问“这句话到底是数据还是判断”。',
    reviewerEn:
      'At final stage, reviewers usually check whether experimental conditions and procedures are independently findable, whether the results section states findings without over-explaining, whether the discussion truly returns to mechanism, error sources, and boundary conditions, and whether conclusions and recommendations distinguish between what the study found and what engineers should do with it. When those borders blur, defense questions quickly become “is this sentence data or judgment?”',
    workflowZh:
      '更稳的路线，是按 body-first 的思路重组全文。先把方法、结果和讨论彻底拆开，再用 conclusions 提炼你实际确认了什么，最后才决定 recommendations 或 engineering implications 怎么写。abstract 也放到最后，因为只有当正文的边界稳定了，你才能用几句话准确概括问题、方法、关键数据和工程意义。',
    workflowEn:
      'A steadier route is to reorganize the paper body-first. Separate methods, results, and discussion completely, use the conclusion to state what the study actually established, and only then decide how recommendations or engineering implications should be written. Leave the abstract until the end, because only after the body boundaries stabilize can a few sentences summarize the problem, method, key numbers, and engineering significance accurately.',
    stepsZh: [
      '第一步先把正文里的“测得了什么”和“为什么会这样”拆开。曲线、参数变化、对比结果先放 results；关于材料机理、载荷路径、误差来源、模型适用范围的解释再放 discussion。只要这两层拆开，图表就会立刻更好读。',
      '第二步重写 abstract 时，不要把每一章都缩成一句，而要围绕问题、方法、关键结果和结论四件事来写，并尽可能给出最有代表性的数值。工程摘要最怕的是形容词很多、信息密度却很低，读完仍不知道你到底验证了什么。',
      '第三步把 recommendations 和 conclusions 分清。conclusion 回答“本研究确认了哪些规律、有哪些边界”；recommendation 才回答“在什么工况下应如何设计、制造或使用”。如果这两个部分不分，工程应用建议就会显得像在替数据做越权解释。',
    ],
    stepsEn: [
      'First, separate “what was measured” from “why it happened” in the body. Curves, parameter shifts, and comparative outcomes belong in results, while explanations involving mechanism, load path, error source, or model applicability belong in discussion. Once that distinction is made, the figures become much easier to read.',
      'When rewriting the abstract, do not shrink each chapter into one sentence. Organize it around problem, method, key result, and conclusion, and include the most representative numbers where possible. Engineering abstracts often fail because they use many adjectives but deliver little information density.',
      'Finally, separate recommendations from conclusions. Conclusions answer what the study established and under what limits. Recommendations answer what should be designed, manufactured, or operated under what conditions. If those parts are merged, the applied advice sounds as though it exceeds the evidence.',
    ],
    evidenceZh:
      '机械工程论文里的证据，不只是结果曲线本身，还包括工况、测试误差、设备限制、重复性和仿真与实验之间的偏差。真正成熟的写法，不会把一条漂亮曲线直接当成通用规律，而会告诉读者这条曲线在什么条件下成立、在哪些边界上开始失效。',
    evidenceEn:
      'Evidence in mechanical engineering papers includes not only the performance curve itself, but also operating conditions, measurement error, equipment limits, repeatability, and the gap between simulation and experiment. Mature engineering writing does not treat one elegant curve as a universal law; it tells readers the conditions under which that curve holds and where it begins to fail.',
    extensionZh:
      '如果你想继续写深，可以在 discussion 中补入 uncertainty 或 sensitivity 的表达，把“结果是否稳定”说清，同时在附录中整理关键参数表、试验条件表和符号说明。这样答辩时读者既能快速抓住主结论，也能在需要时追溯实验细节，不会被正文与附录之间来回折返。',
    extensionEn:
      'To deepen the paper further, add uncertainty or sensitivity analysis to the discussion so readers can see how stable the findings are, and consolidate key parameter tables, test-condition tables, and notation in the appendix. That makes it easier in defense for readers to grasp the main conclusion quickly while still being able to trace the experimental details when needed.',
    sourceNoteZh:
      '这篇主要借鉴 Purdue OWL 关于 engineering report sections 与 abstract / executive summary 的公开说明，尤其是先写 body、再写 abstract，以及将 results、discussion、conclusions、recommendations 功能分开的思路。它非常适合机械工程定稿和答辩前的结构体检。',
    sourceNoteEn:
      'This article is guided mainly by Purdue OWL’s public materials on engineering report sections and on abstracts and executive summaries, especially the body-first drafting order and the functional separation among results, discussion, conclusions, and recommendations. That structure is highly useful for mechanical engineering final revision and defense preparation.',
    checklistZh:
      '交稿前检查：方法是否能被独立定位；图表是否在正文中被准确转述；results 是否避免机理解释；discussion 是否回应了异常值、误差和边界；abstract 是否含有关键数值；recommendations 是否没有超出证据支持。只要读者还能问“这段到底属于哪一章”，结构就还没真正稳。',
    checklistEn:
      'Before submission, check whether methods can be found independently, whether figures and tables are accurately translated into prose, whether results avoid mechanism talk, whether discussion addresses anomalies, error, and limits, whether the abstract includes key numbers, and whether recommendations stay within evidentiary support. If readers can still ask which section a paragraph belongs to, the structure is not yet stable.',
    closingZh:
      '这一轮整理完后，你应该得到一篇边界更清楚的工程论文：数据负责告诉读者发生了什么，discussion 负责解释为什么，conclusion 负责收束已知，recommendation 负责提出应用动作。只要这些职责清楚，机械工程论文的专业感会立刻上来。',
    closingEn:
      'After this restructuring, you should have an engineering paper with much clearer boundaries: data tells readers what happened, discussion explains why, conclusion states what is established, and recommendation proposes application. Once those jobs are clear, the paper immediately feels more professional.',
  },
  {
    categorySlug: 'doctoral-thesis',
    degreeSlug: 'doctoral',
    disciplineSlug: 'biology',
    stageSlug: 'literature-review',
    slug: 'doctoral-biology-experimental-thesis-literature-gap-literature-review-guide',
    imageFilename: 'paperbridge-methods-data.webp',
    titleZh: '生物科学综述别停在机制罗列：让背景、未解问题与实验路径真正接上',
    titleEn:
      'Do Not Let a Biology Review Stop at Mechanism Listing: Connect Background, Unanswered Questions, and Experimental Pathways',
    metaTitleZh: '生物科学综述别停在机制罗列：让背景、未解问题与实验路径真正接上',
    metaTitleEn:
      'Do Not Let a Biology Review Stop at Mechanism Listing: Connect Background, Unanswered Questions, and Experimental Pathways',
    metaDescriptionZh:
      '围绕生物科学实验型论文中常见的“背景很长、问题不聚焦、实验动机接不上”现象，整理机制综述、未解问题和实验设计对接的写法。',
    metaDescriptionEn:
      'A source-inspired guide to biology thesis writing that links mechanistic background, unanswered questions, and experimental design in a focused literature review.',
    introZh:
      '生物科学的综述部分很容易越写越像“知识图谱导览”。通路、蛋白、表型、已有实验结果写得很多，但真正落到自己这项研究时，读者却看不清：你究竟抓住了哪一个未解机制、为什么要用这个模型系统、你的实验设计要检验的是哪一条关键联系。',
    introEn:
      'Biology reviews often expand into a guided tour of mechanisms. Pathways, proteins, phenotypes, and prior experiments accumulate, yet when the paper turns toward the author’s own project, readers still cannot see which unresolved mechanism is being targeted, why this model system was chosen, or what key link the experimental design is supposed to test.',
    pressureZh:
      'Pomona College 关于实验 thesis 的公开说明很有启发性：背景部分不仅要概括相关研究，还要定义未被解决的问题，并尽早把研究目标和实验路径接上。也就是说，综述不是把机制知识讲完，而是要把读者带到“为什么这一步还值得做实验”上。',
    pressureEn:
      'Pomona College’s public guidance for experimental theses is especially helpful here: the background should summarize relevant research, define unanswered questions, and connect early to the research aim and experimental path. In other words, the review is not there to finish the textbook account of the mechanism. It should bring readers to the point where a new experiment becomes necessary.',
    reviewerZh:
      '导师和评审通常先看三件事：背景是否围绕同一个生物过程不断收束；所谓 gap 是真实未解机制，还是只是作者没有继续查文献；实验设计是否在综述结尾就已经被预告。如果综述写得过宽，实验部分会像突然冒出来；如果综述写得过窄而没有留下争议，实验又会显得缺乏动力。',
    reviewerEn:
      'Reviewers usually check whether the background keeps narrowing around one biological process, whether the claimed gap is a real unresolved mechanism rather than a search failure, and whether the experimental design is already foreshadowed at the end of the review. If the review is too broad, the experiment appears from nowhere; if it is too narrow and leaves no dispute, the experiment loses its reason for existing.',
    workflowZh:
      '更稳的路线，是按“现象—可能机制—关键冲突—实验入口”来组织综述。先用最少篇幅交代生物学现象，再把文献集中到几个最可能解释该现象的机制上，随后指出这些机制在哪些实验结果上互相冲突，最后才引出你的模型系统、指标和实验设计为何恰好能切进这个冲突点。',
    workflowEn:
      'A steadier route is to organize the review as phenomenon, candidate mechanism, key conflict, and experimental entry point. Use the shortest necessary space to establish the biological phenomenon, concentrate the literature on the mechanisms most capable of explaining it, identify where the existing evidence conflicts, and then introduce why your model system, measures, and experiments are well positioned to enter that conflict.',
    stepsZh: [
      '第一步把综述从“全领域说明”改成“问题链说明”。不要试图一口气补齐所有相关背景，而要围绕你最终要测试的那条机制路径去选文献。生物学综述真正重要的不是广，而是能不能把实验问题压出来。',
      '第二步把关键冲突写清。不同研究到底是样本不同、模型不同、检测指标不同，还是机制解释真的相反？只有把冲突性质说明白，你的实验设计才会显得有目的，而不是“再做一个类似实验看看”。',
      '第三步在综述结尾提前交代实验入口。说明你要观察什么分子事件、比较什么条件、为什么这个模型系统合适。这样 methods 部分读者已经有预期，图谱和数据也更容易被理解成对前文争议的回应。',
    ],
    stepsEn: [
      'Turn the review from a field overview into a problem chain. Do not try to cover every relevant background area. Select literature according to the mechanistic path you eventually want to test. In biology writing, breadth matters less than whether the review presses a real experimental question into view.',
      'Name the conflict precisely. Do the studies differ because of sample type, model choice, assay design, or genuinely incompatible mechanism claims? Once the nature of the conflict is clear, your experiment looks purposeful rather than like one more similar test.',
      'At the end of the review, foreshadow the experimental entry point. State what molecular event you will observe, what conditions you will compare, and why the model system is appropriate. Then the methods section arrives as an answer to the review rather than as a separate technical block.',
    ],
    evidenceZh:
      '生物学综述中的证据，不只是“某研究发现了什么”，还包括该发现是在什么模型、什么处理条件、什么检测窗口下得到的。很多看似矛盾的文献，其实冲突的是实验条件而非机制本身。把这些边界写出来，既能帮助你解释文献差异，也能顺手为自己实验设计的必要性做铺垫。',
    evidenceEn:
      'Evidence in a biology review is not just what a study found, but under what model, treatment condition, and measurement window it found it. Many apparently conflicting papers diverge because their conditions differ rather than because the underlying mechanism is truly opposite. Writing those boundaries clearly helps explain the literature and simultaneously motivates your own design choices.',
    extensionZh:
      '如果你想把论文继续写深，可以在综述里提前设计 figure storyline：哪一张图将回答哪一个争议点、哪些 control 是解释结果所必需的、哪些负结果也会有价值。这样你在实验尚未全部结束时就能反向检查设计是否真的服务于研究问题，而不是靠后期拼图找意义。',
    extensionEn:
      'To deepen the thesis further, sketch the figure storyline during the review stage: which figure will answer which dispute, which controls are essential for interpretation, and which negative outcomes would still be informative. This lets you test whether the design genuinely serves the research question before all experiments are finished.',
    sourceNoteZh:
      '这里主要参考 Pomona College 关于 molecular biology senior exercise 和 biology experimental thesis 的公开说明，尤其是“背景综述要定义未解问题”和“研究报告要像专业科学论文一样让实验与文献互相接上”这两个要求。',
    sourceNoteEn:
      'This structure is guided mainly by Pomona College’s public materials for molecular biology and biology experimental theses, especially their insistence that the background define unanswered questions and that the report connect the literature and experiments in the style of a professional scientific paper.',
    checklistZh:
      '交稿前检查：综述是否围绕同一机制冲突持续收束；所谓 gap 是否真的来自文献争议；实验入口是否在综述结尾已经出现；关键文献差异是否被解释；模型系统选择是否被论证。如果读者读完背景还不知道你为什么要做这个实验，综述就还没有写到位。',
    checklistEn:
      'Before submission, check whether the review keeps narrowing around one mechanistic conflict, whether the claimed gap genuinely arises from literature tension, whether the experimental entry point appears by the end of the review, whether key differences among studies are explained, and whether the model system choice is justified. If readers still do not know why your experiment is needed after the background, the review is not ready.',
    closingZh:
      '这一轮重写后，你应该得到一篇更像实验型生物科学论文的前半部分：背景不再只是铺陈知识，而是一步步把问题压出来，并把实验设计自然牵出来。只要这一点做对，后面的结果图和讨论也会更容易形成完整故事。',
    closingEn:
      'After this rewrite, the first half of the thesis should read much more like an experimental biology paper: the background no longer merely displays knowledge, but presses the question forward until the experimental design emerges naturally. Once that happens, the later figures and discussion are far easier to turn into a coherent story.',
  },
]

export function getSourceInspiredSubjectPosts(): GeneratedLikePost[] {
  return sourceInspiredArticles.map((article) => ({
    categorySlug: article.categorySlug,
    contentEn: buildEnglishContent(article),
    contentZh: buildChineseContent(article),
    degreeSlug: article.degreeSlug,
    disciplineSlug: article.disciplineSlug,
    imageFilename: article.imageFilename,
    metaDescriptionEn: article.metaDescriptionEn,
    metaDescriptionZh: article.metaDescriptionZh,
    metaTitleEn: article.metaTitleEn,
    metaTitleZh: article.metaTitleZh,
    slug: article.slug,
    stageSlug: article.stageSlug,
    titleEn: article.titleEn,
    titleZh: article.titleZh,
  }))
}
