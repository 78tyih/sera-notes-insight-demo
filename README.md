# Sera Notes Insight

公开产品详情页与 synthetic demo pack。页面定位：

> Turn your notes into a system that notices what you missed.

中文主文案：**让你的笔记不只是记住，而是主动发现。**

这是一个独立的 Vite + React 前端项目，不修改任何 Notes Insight 插件核心逻辑。页面中的全部笔记与洞察均明确标记为 `Synthetic Demo Vault`，不是真实用户数据。

## 本地运行

```bash
npm install
npm run dev
```

默认地址：`http://localhost:5173`

生产构建：

```bash
npm run build
npm run preview
```

## Vercel 部署

在 Vercel 中导入本目录即可：

- Framework Preset：Vite
- Build Command：`npm run build`
- Output Directory：`dist`
- Install Command：`npm install`

也可以使用 Vercel CLI：

```bash
npx vercel
```

## 替换 Demo 数据

Demo 数据位于：

`src/data/demoData.js`

主要导出：

- `demoNotes`：笔记列表
- `insights`：4 个洞察卡片与 evidence trace
- `lenses`：8 个分析 Lens

替换真实数据时，保持这些字段结构即可。建议保留 `id`、`date`、`quote` 与 `note` 字段，以保证证据跳转和可审计性。

## 接入真实插件输出

当前页面是静态展示层。接入真实插件时，推荐保持边界：

1. 插件核心逻辑负责采集、检索、排序和生成结构化 insight。
2. 页面只消费一个经过校验的 JSON 输出，不直接读取本地 Vault。
3. 每条 insight 必须提供 `evidence[]`，并包含来源 note id、日期和原文摘录。
4. 对真实用户数据增加鉴权、脱敏和明确的 consent boundary。
5. 将 `src/data/demoData.js` 替换为 API adapter，例如 `src/data/insightApi.js`，而不是把请求逻辑塞进展示组件。

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

## 目录说明

```text
src/
  data/demoData.js          # synthetic notes + insight output
  main.jsx                  # page composition and interactions
  styles.css                # light/dark themes and responsive design
CONTENT_PRODUCTION_PACK.md  # video scripts, storyboard, shot list, assets
```

## 设计约束

- 蓝色为唯一强调色，白/墨黑为基础色。
- 卡片和证据链优先，减少装饰性 UI。
- 不使用真实用户数据，不暗示当前已有真实模型结果。
- 支持 light/dark theme，默认跟随系统。
- 页面使用客户端本地 state 展示 Lens、Insight 与 evidence 交互。
