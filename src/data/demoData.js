export const demoNotes = [
  { id: 'N-014', date: '2023-04-18', title: '平台先行的冲动', type: 'idea', excerpt: '我总想先搭好完整的平台，再开始验证真正的需求。' },
  { id: 'N-026', date: '2023-09-02', title: '先做一条可复用链路', type: 'experiment', excerpt: '把一次性交付拆成采集、解析、判断和通知，反而更快。' },
  { id: 'N-041', date: '2024-01-11', title: '自动化的边界', type: 'reflection', excerpt: '自动化不是把人拿掉，而是把人的判断放到更有价值的位置。' },
  { id: 'N-057', date: '2024-06-24', title: '注意力路由', type: 'idea', excerpt: '真正稀缺的不是信息，而是在正确时间遇到正确的信息。' },
  { id: 'N-073', date: '2024-11-19', title: '三个项目的交集', type: 'synthesis', excerpt: '交易情报、内容工厂和知识库，本质上都在做注意力路由。' },
  { id: 'N-089', date: '2025-03-08', title: '人工确认边界', type: 'decision', excerpt: '让机器持续发现，让人负责确认和承诺，可能是更稳的协作方式。' },
];

export const insights = [
  {
    id: 'evolution',
    eyebrow: '观点演化',
    title: '你的观点变了，但不是突然变的。',
    summary: '从“平台先行”到“能力先行”，这条变化在 18 个月里反复出现。',
    detail: '早期笔记把完整平台当作起点。后续笔记逐渐把重心移到可复用能力、验证链路和可停止的实验。变化不是一次决定，而是多次小修正累积出来的。',
    signal: '3 次转向',
    accent: 'blue',
    dates: ['2023.04', '2023.09', '2024.06', '2025.03'],
    evidence: [
      { note: 'N-014', date: '2023-04-18', quote: '我总想先搭好完整的平台，再开始验证真正的需求。' },
      { note: 'N-026', date: '2023-09-02', quote: '把一次性交付拆成可复用链路，反而更快。' },
      { note: 'N-089', date: '2025-03-08', quote: '让机器持续发现，让人负责确认和承诺。' },
    ],
  },
  {
    id: 'recurring',
    eyebrow: '反复问题',
    title: '你一直在问同一个问题。',
    summary: '“知识如何在正确的时间重新出现？”已经跨越 4 个项目、11 条笔记。',
    detail: '问题最初出现在个人知识管理里，后来扩展到情报、内容生产和 Agent 协作。它不是功能需求，更像一条持续牵引项目选择的底层问题。',
    signal: '11 条关联笔记',
    accent: 'ink',
    dates: ['2023.11', '2024.06', '2024.11', '2025.03'],
    evidence: [
      { note: 'N-057', date: '2024-06-24', quote: '真正稀缺的不是信息，而是在正确时间遇到正确的信息。' },
      { note: 'N-073', date: '2024-11-19', quote: '三个项目本质上都在做注意力路由。' },
      { note: 'N-089', date: '2025-03-08', quote: '人和机器需要共同承担发现与确认。' },
    ],
  },
  {
    id: 'connection',
    eyebrow: '隐藏连接',
    title: '三个看似不同的项目，正在解决同一件事。',
    summary: '交易情报、内容工厂、个人知识库，都在把信号路由到正确的下一步。',
    detail: '连接不是关键词相似，而是它们共享同一动作结构：发现变化，压缩噪声，保留证据，再把判断送到能产生行动的位置。',
    signal: '3 个项目交集',
    accent: 'blue',
    dates: ['Trading', 'Media', 'Knowledge'],
    evidence: [
      { note: 'N-073', date: '2024-11-19', quote: '交易、媒体、知识库都在解决注意力路由。' },
      { note: 'N-026', date: '2023-09-02', quote: '采集、解析、判断和通知可以成为同一条能力链。' },
      { note: 'N-057', date: '2024-06-24', quote: '价值不在信息总量，而在下一步是否更清楚。' },
    ],
  },
  {
    id: 'contradiction',
    eyebrow: '观点矛盾',
    title: '你同时相信自动化，也不信任完全自动化。',
    summary: '两组相反的笔记并不是冲突，而是一个尚未命名的产品原则。',
    detail: '“完全自动化”强调规模和速度；“人工确认”强调边界、责任和可解释性。系统把两边的证据放在一起，提示你命名真正的中间方案。',
    signal: '1 个未命名原则',
    accent: 'ink',
    dates: ['2024.01', '2025.03'],
    evidence: [
      { note: 'N-041', date: '2024-01-11', quote: '自动化不是把人拿掉，而是重新安排人的判断。' },
      { note: 'N-089', date: '2025-03-08', quote: '让机器持续发现，让人负责确认和承诺。' },
      { note: 'N-026', date: '2023-09-02', quote: '可复用链路应该允许随时停止和回滚。' },
    ],
  },
];

export const lenses = [
  { id: 'evolution', label: '观点演化', title: '观点如何改变', copy: '把同一主题放回时间轴，看它从直觉变成原则。', example: '“平台先行” → “能力先行”' },
  { id: 'recurring', label: '反复问题', title: '反复出现的问题', copy: '寻找跨项目、跨月份仍然没有消失的问题。', example: '“如何在正确的时间重新出现？”' },
  { id: 'connection', label: '隐藏连接', title: '隐藏的连接', copy: '连接不同项目背后的共同动作、资源或判断结构。', example: '交易 × 内容 × 知识' },
  { id: 'contradiction', label: '观点矛盾', title: '矛盾与张力', copy: '并置相反的观点，让未命名的原则浮出水面。', example: '自动化 ↔ 人工确认' },
  { id: 'decision', label: '决策形成', title: '决策是如何形成的', copy: '追踪一个决定前后的证据、放弃项和边界。', example: '先验证，再扩张' },
  { id: 'question', label: '问题质量', title: '问题的质量', copy: '识别那些反复推动你思考的高杠杆问题。', example: '下一步真正需要知道什么？' },
  { id: 'blindspot', label: '认知盲点', title: '你没有看到的部分', copy: '从沉默、遗漏和不一致里提示可能的盲点。', example: '记录很多，回看很少' },
  { id: 'pattern', label: '行为模式', title: '稳定的行为模式', copy: '把散落的行动变成可复用的工作方法。', example: '采集 → 评估 → 人工确认' },
];
