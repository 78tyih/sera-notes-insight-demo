import { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { demoNotes, insights, lenses } from './data/demoData';
import './styles.css';

function ArrowIcon() {
  return <span className="arrow-icon" aria-hidden="true">↗</span>;
}

function ThemeIcon({ theme }) {
  return <span className="theme-icon" aria-hidden="true">{theme === 'dark' ? '☼' : '◐'}</span>;
}

function InsightMini({ insight, active, onClick }) {
  return (
    <button className={`insight-mini ${active ? 'is-active' : ''}`} onClick={onClick} type="button">
      <span className="mini-topline">
        <span>{insight.eyebrow}</span>
        <span>{insight.signal}</span>
      </span>
      <strong>{insight.title}</strong>
      <span className="mini-link">查看证据 <ArrowIcon /></span>
    </button>
  );
}

function NoteRow({ note, selected }) {
  return (
    <div className={`note-row ${selected ? 'is-selected' : ''}`}>
      <span className="note-date">{note.date.slice(0, 7)}</span>
      <div>
        <strong>{note.title}</strong>
        <p>{note.excerpt}</p>
      </div>
      <span className="note-id">{note.id}</span>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    const stored = window.localStorage.getItem('sera-notes-theme');
    return stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  });
  const [selectedInsightId, setSelectedInsightId] = useState('evolution');
  const [selectedLensId, setSelectedLensId] = useState('evolution');
  const [showAllEvidence, setShowAllEvidence] = useState(false);

  const selectedInsight = useMemo(
    () => insights.find((insight) => insight.id === selectedInsightId) || insights[0],
    [selectedInsightId],
  );
  const selectedLens = useMemo(
    () => lenses.find((lens) => lens.id === selectedLensId) || lenses[0],
    [selectedLensId],
  );

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    window.localStorage.setItem('sera-notes-theme', nextTheme);
  }

  function selectInsight(id) {
    setSelectedInsightId(id);
    setSelectedLensId(id);
    setShowAllEvidence(false);
    document.getElementById('evidence')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className={`site-shell theme-${theme}`}>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="返回 Sera Notes Insight 首页">
          <span className="brand-mark">S</span>
          <span>Sera Notes Insight</span>
        </a>
        <nav className="main-nav" aria-label="主导航">
          <a href="#insights">洞察</a>
          <a href="#method">工作原理</a>
          <a href="#architecture">产品架构</a>
        </nav>
        <div className="header-actions">
          <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`切换到${theme === 'dark' ? '浅色' : '深色'}模式`}>
            <ThemeIcon theme={theme} />
          </button>
          <a className="header-cta" href="#demo">查看演示 <ArrowIcon /></a>
        </div>
      </header>

      <main>
        <section className="hero section-pad" id="top">
          <div className="hero-copy reveal-up">
            <p className="kicker">让知识重新回到你的视野</p>
            <h1>让你的笔记不只是记住，而是主动发现。</h1>
            <p className="hero-subhead">把你的笔记变成一个能够主动发现遗漏的系统。</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#demo">查看产品演示 <ArrowIcon /></a>
              <a className="text-link" href="#method">了解工作原理 <ArrowIcon /></a>
            </div>
            <div className="hero-proof">
              <span>每条洞察都有证据</span>
              <span className="proof-dot" aria-hidden="true" />
              <span>由你来确认</span>
              <span className="proof-dot" aria-hidden="true" />
              <span>不绑定模型</span>
            </div>
          </div>

          <div className="hero-surface" id="demo" aria-label="合成演示库界面预览">
            <div className="surface-topbar">
              <span className="window-dots"><i /><i /><i /></span>
              <span className="surface-label">合成演示库</span>
              <span className="surface-status">6 条笔记 · 4 个信号</span>
            </div>
            <div className="surface-body">
              <div className="surface-notes">
                <div className="surface-column-title"><span>最近笔记</span><span className="column-count">06</span></div>
                {demoNotes.slice(0, 4).map((note, index) => <NoteRow key={note.id} note={note} selected={index === 1} />)}
                <div className="surface-more">这条线索还有 2 条笔记</div>
              </div>
              <div className="surface-insight">
                <div className="insight-label"><span className="signal-mark" /> 发现了一个新模式</div>
                <h2>你的工作原则，正在变得越来越清晰。</h2>
                <p>过去 18 个月里，你的笔记从“先搭平台”逐渐转向“先做可复用能力”。</p>
                <div className="timeline-strip" aria-hidden="true">
                  <span><b>2023</b><i /></span><span><b>2024</b><i /></span><span className="timeline-active"><b>2025</b><i /></span>
                </div>
                <div className="surface-evidence">
                  <span className="evidence-line" />
                  <div><small>证据链</small><strong>3 条笔记 · 2 次转向 · 1 个新原则</strong></div>
                  <ArrowIcon />
                </div>
                <button className="surface-button" type="button" onClick={() => selectInsight('evolution')}>打开洞察 <ArrowIcon /></button>
              </div>
            </div>
          </div>
        </section>

        <section className="signal-bar">
          <div className="signal-bar-inner">
            <span className="signal-label">核心前提</span>
            <p>你的知识库里有很多尚未完成的想法。真正缺少的不是更多记录，而是在正确的时间重新遇见它们。</p>
            <a href="#problem" aria-label="跳转到问题部分"><ArrowIcon /></a>
          </div>
        </section>

        <section className="section-pad problem-section" id="problem">
          <div className="section-heading compact-heading">
            <p className="kicker">真正的问题</p>
            <h2>你的笔记记得住，却不会自己重新连接。</h2>
            <p>大多数知识工具都在帮你把想法放到某个地方。真正有价值的时刻发生在之后：一个旧想法重新出现，改变你现在要做的决定。</p>
          </div>
          <div className="problem-grid">
            <div className="problem-column">
              <span className="problem-index">01</span>
              <h3>记录很容易。</h3>
              <p>想法进入文档、数据库和文件夹，知识库安静地变大。</p>
            </div>
            <div className="problem-column problem-column-emphasis">
              <span className="problem-index">02</span>
              <h3>重新出现很难。</h3>
              <p>旧笔记常常错过本来可以改变决定的那个时刻。</p>
            </div>
            <div className="problem-column">
              <span className="problem-index">03</span>
              <h3>洞察需要证据。</h3>
              <p>一个模式只有在你能看到它从哪里来，并决定如何处理时，才真正有用。</p>
            </div>
          </div>
        </section>

        <section className="section-pad before-after-section">
          <div className="section-heading split-heading">
            <div>
              <p className="kicker">从归档到主动觉察</p>
              <h2>差别不是更多笔记，而是多了一个读者。</h2>
            </div>
            <p>它安静地观察有意义的变化、反复出现的张力，以及你不会主动搜索的连接。</p>
          </div>
          <div className="before-after-grid">
            <article className="compare-panel compare-before">
              <div className="compare-label"><span>之前</span><span>被动归档</span></div>
              <div className="archive-stack">
                {demoNotes.slice(0, 3).map((note) => <div className="archive-row" key={note.id}><span>{note.date.slice(0, 7)}</span><strong>{note.title}</strong><span>...</span></div>)}
                <div className="archive-fade" />
              </div>
              <p>你负责记录，想起关键词时再搜索。其余内容继续保持安静。</p>
            </article>
            <article className="compare-panel compare-after">
              <div className="compare-label"><span>之后</span><span>主动上下文</span></div>
              <div className="active-context">
                <span className="context-tag">发现一个信号</span>
                <h3>你正在重复一个还没有命名的原则。</h3>
                <div className="context-refs"><span>N-014</span><span>N-026</span><span>N-089</span><ArrowIcon /></div>
              </div>
              <p>结论仍然由你拥有。系统只负责让连接显形，并附上它的来源。</p>
            </article>
          </div>
        </section>

        <section className="section-pad insights-section" id="insights">
          <div className="section-heading">
            <p className="kicker">演示知识库</p>
            <h2>四种笔记主动带来惊喜的方式。</h2>
            <p>下面每张卡片都使用明确标记的合成笔记。重点不是伪造结果，而是展示一个有用结果应该长什么样。</p>
          </div>
          <div className="insight-grid">
            {insights.map((insight) => <InsightMini key={insight.id} insight={insight} active={selectedInsight.id === insight.id} onClick={() => selectInsight(insight.id)} />)}
          </div>
          <div className="insight-detail-panel">
            <div className="detail-copy">
              <div className="detail-meta"><span className="signal-mark" /> {selectedInsight.eyebrow}</div>
              <h3>{selectedInsight.title}</h3>
              <p>{selectedInsight.detail}</p>
              <button className="button button-outline" type="button" onClick={() => document.getElementById('evidence')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>检查证据 <ArrowIcon /></button>
            </div>
            <div className="detail-visual">
              <div className="detail-visual-top"><span>信号形状</span><span>{selectedInsight.signal}</span></div>
              <div className="signal-graph" aria-hidden="true">
                {selectedInsight.dates.map((date, index) => <div className={`graph-point ${index === selectedInsight.dates.length - 1 ? 'graph-point-active' : ''}`} key={date} style={{ '--point-height': `${35 + index * 16}%` }}><i /><span>{date}</span></div>)}
                <div className="graph-line" />
              </div>
            </div>
          </div>
        </section>

        <section className="section-pad evidence-section" id="evidence">
          <div className="section-heading split-heading evidence-heading">
            <div>
              <p className="kicker">证据链</p>
              <h2>每条洞察，都能回到支撑它的原始笔记。</h2>
            </div>
            <p>检查来源、时间间隔和支撑这个模式的原文。然后由你确认、修改、忽略，或把它变成一个决定。</p>
          </div>
          <div className="trace-shell">
            <div className="trace-header"><span>{selectedInsight.eyebrow}</span><strong>{selectedInsight.signal}</strong><span className="trace-state">合成证据</span></div>
            <div className="trace-title-row"><h3>{selectedInsight.title}</h3><span>{selectedInsight.evidence.length} 条来源笔记</span></div>
            <div className="trace-list">
              {selectedInsight.evidence.map((item, index) => (
                <div className="trace-item" key={item.note}>
                  <div className="trace-node"><span>{String(index + 1).padStart(2, '0')}</span><i /></div>
                  <div className="trace-note"><div className="trace-note-meta"><span>{item.note}</span><span>{item.date}</span></div><blockquote>“{item.quote}”</blockquote><a href="#demo">打开来源笔记 <ArrowIcon /></a></div>
                </div>
              ))}
            </div>
            <div className="trace-footer">
              <span>人工确认：由你决定它是否成为知识。</span>
              <button className="button button-small" type="button" onClick={() => setShowAllEvidence((current) => !current)}>{showAllEvidence ? '收起证据链' : '展开证据说明'} <ArrowIcon /></button>
            </div>
            {showAllEvidence && <div className="trace-expanded">证据说明会解释这些来源为什么被归到一起、哪些内容被排除，以及哪些不确定性仍然没有解决。接入真实系统后，这里可以展示检索分数、模型信息和审计事件编号，但不会暴露私密凭证。</div>}
          </div>
        </section>

        <section className="section-pad method-section" id="method">
          <div className="section-heading">
            <p className="kicker">工作原理</p>
            <h2>在你的笔记和下一个决定之间，建立一条可检查的循环。</h2>
          </div>
          <div className="method-flow">
            {[
              ['01', '采集', '从你已经在使用的地方读取笔记。'],
              ['02', '整理', '把散落的格式变成可以比较的信号。'],
              ['03', '检索', '找回近处和远处的相关上下文。'],
              ['04', '综合', '用明确的视角形成一条候选洞察。'],
              ['05', '人工确认', '由你确认、修改、忽略或采取行动。'],
            ].map(([number, title, copy]) => <div className="method-step" key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></div>)}
          </div>
        </section>

        <section className="section-pad lenses-section">
          <div className="section-heading split-heading">
            <div><p className="kicker">八种观察视角</p><h2>同一组笔记，可以回答不同的问题。</h2></div>
            <p>同一组笔记，既可以呈现一个改变的信念，也可以暴露未解决的问题、认知盲点或可复用的方法。选择视角，让系统始终有明确目的。</p>
          </div>
          <div className="lens-layout">
            <div className="lens-tabs" role="tablist" aria-label="洞察视角">
              {lenses.map((lens) => <button key={lens.id} className={selectedLens.id === lens.id ? 'is-active' : ''} type="button" onClick={() => setSelectedLensId(lens.id)} role="tab" aria-selected={selectedLens.id === lens.id}>{lens.label}</button>)}
            </div>
            <div className="lens-preview" role="tabpanel">
              <div className="lens-preview-label">当前视角</div>
              <h3>{selectedLens.title}</h3>
              <p>{selectedLens.copy}</p>
              <div className="lens-example"><span>示例输出</span><strong>{selectedLens.example}</strong><ArrowIcon /></div>
            </div>
          </div>
        </section>

        <section className="section-pad integrations-section">
          <div className="section-heading compact-heading">
            <p className="kicker">在你已经写作的地方工作</p>
            <h2>Obsidian 和 Notion 只是载体。你的思考仍然属于你。</h2>
            <p>从已经承载你上下文的工具开始。Sera Notes Insight 增加一层理解能力，不要求你重建原有工作流。</p>
          </div>
          <div className="integration-grid">
            <article className="integration-block"><div className="integration-logo obsidian-logo">O</div><div><h3>Obsidian</h3><p>本地优先的笔记、双向链接的上下文，以及能够回到你所拥有文件的证据。</p><span>适合本地知识库 <ArrowIcon /></span></div></article>
            <article className="integration-block"><div className="integration-logo notion-logo">N</div><div><h3>Notion</h3><p>结构化页面和数据库，成为可阅读、可复查、可分享的洞察来源。</p><span>适合工作区协作 <ArrowIcon /></span></div></article>
          </div>
        </section>

        <section className="section-pad architecture-section" id="architecture">
          <div className="section-heading split-heading">
            <div><p className="kicker">可复用的产品架构</p><h2>这不只是一个产品，而是一种可以跨领域复用的模式。</h2></div>
            <p>笔记只是第一种信息集合。同一套架构也可以服务于研究、内容、交易情报，或团队操作系统。</p>
          </div>
          <div className="architecture-map">
            {['信息集合', '检索', '视角', '洞察', '证据', '行动'].map((node, index) => <div className={`architecture-node ${index === 3 ? 'architecture-node-focus' : ''}`} key={node}><span>0{index + 1}</span><strong>{node}</strong>{index < 5 && <i aria-hidden="true">→</i>}</div>)}
          </div>
          <div className="architecture-caption"><span>同一套逻辑，不同的信息材料。</span><strong>记录 → 上下文 → 判断</strong></div>
        </section>

        <section className="section-pad trust-section">
          <div className="trust-grid">
            <div><p className="kicker">默认保护隐私</p><h2>你的笔记不应该变成一个黑盒。</h2></div>
            <div className="trust-points"><div><strong>隐私边界</strong><p>把源数据留在你选择的环境里，只向模型发送完成任务所需的最小上下文。</p></div><div><strong>不绑定模型</strong><p>根据任务、成本、速度或策略选择模型，证据契约保持不变。</p></div><div><strong>由你拥有判断</strong><p>洞察在你确认之前只是候选，是否进入系统由你决定。</p></div></div>
          </div>
        </section>

        <section className="section-pad roadmap-section">
          <div className="section-heading split-heading">
            <div><p className="kicker">产品路线</p><h2>一次建立一条有用的连接，慢慢赢得信任。</h2></div>
            <p>第一阶段不是追求无限自动化，而是做出一小组真正有用、说得清楚、值得再次回来查看的洞察。</p>
          </div>
          <div className="roadmap-list">
            <div className="roadmap-row is-current"><span>现在</span><strong>演示库 + 关联证据的洞察卡片</strong><em>验证价值应该如何呈现</em></div>
            <div className="roadmap-row"><span>下一步</span><strong>Obsidian / Notion 真实连接器</strong><em>接入你自己的信息集合</em></div>
            <div className="roadmap-row"><span>之后</span><strong>复查队列 + 反馈记忆</strong><em>让系统逐渐理解你的判断方式</em></div>
            <div className="roadmap-row"><span>更远</span><strong>可复用的洞察流水线</strong><em>从笔记扩展到所有高信号工作流</em></div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-inner"><p className="kicker">下一条笔记不是重点</p><h2>如果最有用的想法，已经在你的知识库里呢？</h2><p>打开公开演示，检查证据，然后判断这是不是你的工作流里缺少的那一层。</p><a className="button button-light" href="#demo">打开合成演示 <ArrowIcon /></a></div>
        </section>
      </main>

      <footer className="site-footer"><div><a className="brand" href="#top"><span className="brand-mark">S</span><span>Sera Notes Insight</span></a><p>让你的笔记不只是记住，而是主动发现。</p></div><div className="footer-right"><span>合成演示库 · 2026</span><a href="mailto:hello@sera.notes">联系 <ArrowIcon /></a></div></footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
