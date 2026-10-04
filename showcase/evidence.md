# Evidence — sera-notes-insight-demo

Updated: 2026-10-05

## Observed（实查）

| 声明 | 证据 |
|---|---|
| 6 条合成笔记 / 4 条洞察 / 8 个 Lens | src/data/demoData.js 全文（demoNotes 6 项、insights 4 项、lenses 8 项） |
| 四条洞察文案（观点演化/反复问题/隐藏连接/观点矛盾） | demoData.js insights[].eyebrow/title/summary 逐字对照 |
| 每条洞察带 evidence[]（note id + date + quote） | demoData.js 四条 insights 均含 evidence 数组，字段一致 |
| 数据为合成、页面诚实标注 | README「Synthetic Demo Vault」+ demoData 内容为虚构笔记（N-014 等） |
| 技术栈 Vite + React、蓝色唯一强调、明暗主题 | package.json + README「设计约束」+ src/styles.css（380 行） |
| 构建产物可部署 | `vite build --base=/sera-notes-insight-demo/` 成功（dist 216.8KB JS / 27.2KB CSS），已提交 docs/ 并上 GitHub Pages |

## Inferred（推断，附复核方式）

| 声明 | 复核方式 |
|---|---|
| 「插件核心逻辑不受影响」 | 架构上无插件代码（仓库仅展示层）；复验=确认仓库无插件源码依赖 |
| 洞察→证据跳转交互可用 | demoData 含跳转所需 id/date 字段；复验=线上 demo 点开洞察卡实测 |

## Unknown

- 真实插件输出的完整 JSON 契约（README 给了建议形状，但插件本体不在此仓库）
