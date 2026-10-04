# Sera Notes Insight

> **一句话**：让你的笔记不只是记住，而是**主动发现**——Turn your notes into a system that notices what you missed.
>
> **在线 Demo**：https://78tyih.github.io/sera-notes-insight-demo/ （点洞察卡可看证据链）
> **展示页**：https://78tyih.github.io/sera-notes-insight-demo/showcase.html

| | |
|---|---|
| 类型 | 公开产品详情页 + synthetic demo pack（Vite + React） |
| 状态 | 公开 demo · 数据全部为 Synthetic Demo Vault |
| 边界 | 独立展示层，不修改任何 Notes Insight 插件核心逻辑 |

## ① 解决什么问题

笔记工具都擅长「存」，没人在「回看」时帮你发现：

- 观点是怎么随时间演化的（「平台先行」→「能力先行」）
- 哪些问题反复出现却一直没被命名（「知识如何在正确的时间重新出现？」）
- 哪些看似无关的项目其实在解决同一件事（交易情报 × 内容工厂 × 知识库 = 注意力路由）
- 哪里藏着未命名的矛盾（相信自动化 ↔ 不信任完全自动化）

## ② 什么场景 → 什么结果

| 场景 | 结果 |
|---|---|
| 给投资人/用户讲产品 | 30 秒看懂主张；每条洞察点开就有证据链（note id + 日期 + 原文摘录），结论不悬空 |
| 内容团队做传播 | `CONTENT_PRODUCTION_PACK.md`：视频脚本、分镜、镜头清单、素材 |
| 接真实数据 | 换掉 `src/data/demoData.js` 为 API adapter 即可，边界与契约见下 |

## ③ 什么结构

```text
src/
  main.jsx                  # 页面组装与交互（342 行）
  styles.css                # light/dark 主题 + 响应式（380 行）
  data/demoData.js          # 合成笔记 + 洞察输出：6 笔记 / 4 洞察 / 8 Lens
CONTENT_PRODUCTION_PACK.md  # 视频脚本、分镜、镜头清单、素材
docs/                       # GitHub Pages 构建产物（demo 本体 + showcase 展示页）
```

## ④ 能复用什么

- **insight 数据形状**：`{ id, type, title, summary, evidence: [{ noteId, date, quote }] }`——任何「结论必须带证据」的产品都能直接套
- **Synthetic Demo Vault 模式**：用合成数据演示产品，同时明示数据边界（合规、诚实、可审计）
- **洞察 → 证据跳转**的交互模式
- **CONTENT_PRODUCTION_PACK**：产品 demo 配套内容生产的模板

## 本地运行

```bash
npm install
npm run dev        # http://localhost:5173
npm run build && npm run preview
```

## GitHub Pages 部署

构建时注意 base 路径：

```bash
npx vite build --base=/sera-notes-insight-demo/
```

产物在 `dist/`，本仓库将构建产物提交至 `docs/` 由 GitHub Pages 托管（main /docs）。

## 替换 Demo 数据

Demo 数据位于 `src/data/demoData.js`，导出 `demoNotes`（笔记列表）、`insights`（4 个洞察卡片与 evidence trace）、`lenses`（8 个分析 Lens）。替换真实数据时保持字段结构，建议保留 `id`、`date`、`quote` 与 `note` 字段以保证证据跳转和可审计性。

## 接入真实插件输出

1. 插件核心逻辑负责采集、检索、排序和生成结构化 insight。
2. 页面只消费一个经过校验的 JSON 输出，不直接读取本地 Vault。
3. 每条 insight 必须提供 `evidence[]`，包含来源 note id、日期和原文摘录。
4. 对真实用户数据增加鉴权、脱敏和明确的 consent boundary。
5. 将 `src/data/demoData.js` 替换为 API adapter（如 `src/data/insightApi.js`），不要把请求逻辑塞进展示组件。

建议的最小 API 形状：

```json
{
  "vault": { "name": "My Vault", "noteCount": 1280 },
  "insights": [
    {
      "id": "evolution-2026-08",
      "type": "evolution",
      "title": "...",
      "summary": "...",
      "evidence": [
        { "noteId": "N-123", "date": "2026-08-01", "quote": "..." }
      ]
    }
  ]
}
```

## 设计约束

- 蓝色为唯一强调色，白/墨黑为基础色。
- 卡片和证据链优先，减少装饰性 UI。
- 不使用真实用户数据，不暗示当前已有真实模型结果。
- 支持 light/dark theme，默认跟随系统。
- 页面使用客户端本地 state 展示 Lens、Insight 与 evidence 交互。
