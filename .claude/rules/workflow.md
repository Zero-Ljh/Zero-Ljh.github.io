# 工作流规则（AI 自动加载）

## 会话启动协议

每次会话开始时，先读取 `CLAUDE.md`（项目架构、文件结构、代码约定），
再按需读取 `docs/superpowers/specs/` 下的相关说明书。

**必须读取**：
- `CLAUDE.md` — 项目架构、文件结构、代码约定、分支策略、Commit 规范

**按需读取**：
- `docs/superpowers/specs/2026-04-28-vibe-coding-guide.md` — Vibe Coding 原则、Agent 分工
- `docs/superpowers/specs/2026-04-28-workflow-research.md` — 分支策略、CI/CD、Commit 规范
- `docs/superpowers/specs/2026-04-28-brittany-scope-plan.md` — Brittany Chiang v4 对照、功能全景
- `docs/superpowers/specs/2026-04-28-personal-homepage-design.md` — 设计相关
- `docs/superpowers/specs/2026-04-28-personal-homepage-tech.md` — 架构/数据变更

## Hook 系统

项目配置了以下自动 Hook（定义在 `.claude/settings.json`）：

| 生命周期 | 触发时机 | Hook 脚本 | 作用 |
|----------|----------|-----------|------|
| PreToolUse | Bash 执行前 | `bash-firewall.js` | 拦截危险命令（rm -rf、pipe-to-shell、凭据泄露等） |
| PreToolUse | 文件读写编辑前 | `file-guard.js` | 阻止访问敏感文件（.env、.ssh、凭据等） |
| PostToolUse | Edit/Write 后 | `lint-on-edit.js` | 检查 JS 语法、CSS 大括号平衡 |
| PostToolUse | 任意工具后 | `audit-log.js` | 记录工具调用到 `.claude/audit.log` |
| Stop | 响应结束时 | `stop-verify.js` | 全量检查：JS 语法 + CSS 样式 + HTML 完整性 |

> 新增功能时，考虑是否需要添加或更新 Hook。

## 开发节奏（Vibe Coding）

```
理解需求 → 规划方案 → 实现代码 → 审查代码 → 验证运行 → 提交推送
```

- 单次只做一个功能（小批量）
- 每次代码修改后必须使用 code-reviewer agent 审查
- 出现 bug 时先诊断原因再修复

## Agent 分工

| 场景 | 操作 |
|------|------|
| 复杂功能规划 | `EnterPlanMode` + Plan agent |
| 代码审查 | `Agent` → `superpowers:code-reviewer` 或手动加载 `.claude/agents/code-reviewer.md` |
| Bug 诊断 | 先分析原因，再修复（不同轮次） |
| 双语检查 | 新增文本必配中英双语 |

## 可用 Skills（尚未配置到工作流但有用）

- `simplify` — 审查代码进行简化/优化
- `fewer-permission-prompts` — 合并零散权限，减少频繁弹窗
- `security-review` — 安全审查
- `superpowers:verification-before-completion` — 完成前验证
- `superpowers:requesting-code-review` — 请求代码审查

## 权限配置

- `.claude/settings.json` — 共享配置（提交到 git）：通用权限 + 所有 Hook
- `.claude/settings.local.json` — 本地覆盖（不提交到 git）：个人工作流权限
