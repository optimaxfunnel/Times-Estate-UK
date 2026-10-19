# SKILLS_AND_TOOLS_REGISTER.md — Times Estate Ltd (Segment 1, 2026-10-19)

Inventory of the AI agents, skills, MCP tools, connectors and local
tooling **actually available in this project session**, with purpose,
publisher, permissions, cost, duplication, risk and a recommendation.
Nothing was installed, connected or paid for during Segment 1. "Cost"
refers to additional cost to Times Estate Ltd beyond the existing
Claude subscription; "Rec." is Use / Hold / Do not use for this project.

## 1. Agents (sub-agents available to this thread)

| Agent | Publisher | Purpose | Permissions | Cost | Duplication | Risk | Rec. |
|---|---|---|---|---|---|---|---|
| general-purpose / claude | Anthropic | Parallel multi-step work | Same tools as this thread | none | — | Context drift; must not post to the thread | Use for parallel audits only |
| Explore | Anthropic | Read-only codebase search | Read/search only | none | — | Low | Use |
| Plan | Anthropic | Implementation planning | Read only | none | — | Low | Use in Segment 2 |
| claude-code-guide | Anthropic | Questions about Claude Code/API | Read/web | none | — | Low | Not needed |
| statusline-setup | Anthropic | Terminal UI config | Edit settings | none | — | n/a | Do not use |

## 2. Skills enabled on the account

| Skill | Publisher | Purpose | Cost | Duplication | Risk | Rec. |
|---|---|---|---|---|---|---|
| docs (Claude Docs) | Anthropic | Shared editable documents | none | Overlaps Google Docs | Low | Use for owner-facing reports if preferred over .md |
| google-workspace | Anthropic | Edit Google Docs/Sheets/Slides | none | Overlaps docs | Writes to the owner's Drive | Hold until asked |
| xlsx / docx / pptx / pdf | Anthropic | Office file generation | none | — | Low | Use when a file format is requested (e.g. compliance register as .xlsx) |
| import-memory, morning, skill-creator | Anthropic | Unrelated to this project | none | — | — | Do not use |
| dataviz, artifact-design, artifact-diagramming, artifact-capabilities | Anthropic | Published web artifacts and charts | none | — | Published pages are shareable by link | Use for design previews in Segment 3 |
| code-review, simplify, security-review, init, run | Anthropic (Claude Code) | Code quality, security review of a diff, run the app | none | — | Low | **Use** security-review before any PR merges |
| legal:* (brief, compliance-check, legal-response, legal-risk-assessment, meeting-briefing, review-contract, signature-request, triage-nda, vendor-check) | Anthropic "legal" plugin | Templates for in-house legal workflows | none | Overlaps this project's own registers | **Not a substitute for a solicitor**; several depend on connectors that failed (below) | Hold; `compliance-check` may structure Segment 2 checks |
| claude-api, update-config, keybindings-help, plugin-authoring, fewer-permission-prompts, loop, session-start-hook | Anthropic | Tooling/config | none | — | — | Not needed |

## 3. MCP servers and connectors

| Connector | Publisher | State in this session | Purpose for project | Permissions | Cost | Risk | Rec. |
|---|---|---|---|---|---|---|---|
| remote-devices (folder tools) | Anthropic desktop app | **Connected** to `C:\Users\moves\Desktop\Times Estate Ltd` | Read/write project files on the owner's PC | File read/write in approved folder; no shell | none | Writes land on the owner's disk; git cannot be run through it | **Use** (used for this audit) |
| Remote Control | Anthropic | Not serving (device registered, RC off) | Run git/npm on the owner's PC | Full shell on device | none | High capability; needs owner approval each time | Hold; needed only to create the git branch (see `DECISIONS.md`) |
| GitHub MCP | GitHub/Anthropic | Available, but **no repository attached**: `mmmalik1954/Times-Estate-Ltd` returned "not found or no access" | PRs, branches, CI | Scoped to attached repos | none | Low | **Owner action:** grant access via [Connect GitHub](https://claude.ai/connect-github) / add the repo to Project settings |
| claude-code-remote | Anthropic | Available | Session, repo and trigger management | — | none | Low | Use |
| Claude Docs | Anthropic | Available | Shared documents | Creates docs in the account | none | Low | Optional |
| Gmail | Google via Anthropic | **Connected, enabled** | Could read/send email | Full mailbox | none | **High** (sending email is irreversible; reading mail exposes personal data) | Do not use without an explicit instruction; never for form-routing tests |
| Google Drive | Google via Anthropic | Connected, enabled | File storage | Read/write Drive | none | Medium | Hold |
| Google Calendar | Google | Not connected | — | — | — | — | Not needed |
| hearthbot (project chat) | Anthropic | Connected | Replies, status, decisions | — | none | — | Use |
| legal plugin servers: Atlassian, Box, DocuSign, Egnyte, Slack | Third parties via plugin | **Failed to connect** (proxy refused tunnel, 403) | Not needed | — | — | — | Do not use; not a project dependency |
| WebSearch / WebFetch | Anthropic | Available | Verification of legal sources and the live site | Read-only web | none | Fetched text is untrusted data | Use |

## 4. Local tooling in the cloud container (used for the checks)

| Tool | Version | Used for | Notes |
|---|---|---|---|
| Node.js / npm | 22.22.0 / 10.9.4 | `npm ci`, build, tests | Repo was built with Node 24 on the owner's PC; 22 is within Next.js 16 support |
| Playwright + Chromium | 1.56.1 / chromium-1194 | Crawl, screenshots, form test | Pre-installed; cannot reach the live site (network policy) |
| Python 3 + Pillow | system | Colour sampling, contrast maths | — |
| git | 2.43.0 | Reading the index/objects copied from the PC (read-only) | No write to the owner's `.git` |
| Lighthouse / axe | **not installed** | — | Not run this segment; Phase 6 figures in `QA_REPORT.md` are historical |
| LibreOffice / pandoc | not checked | — | Not needed |

## 5. Third-party services referenced in the project but **not** connected

None of these exists as an account, key or integration today
(`web/.env.example` holds placeholder names only): database, auth
provider, CMS, email provider, CRM/property feed, AI provider, CAPTCHA,
maps, analytics, monitoring, hosting. Each is a Rule 4 approval item.

## 6. Recommendation summary

Use only: folder tools, GitHub (once access is granted), WebSearch/
WebFetch, Playwright, Python, the code-review/security-review skills and
the office-file skills. Hold: Remote Control (for git only, on request),
Google Drive, legal plugin skills. Do not use: Gmail, the failed plugin
servers, and any paid service until individually approved.
