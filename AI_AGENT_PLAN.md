# AI_AGENT_PLAN.md — Times Estate Ltd

**Status: PROPOSAL (24 November 2026).** Nothing in this plan has been
built, connected or paid for. It needs the owner's decisions in §9
before any work starts. Written for a non-technical reader; the
technical detail is in the appendix at the end (CLAUDE.md Rule 8).

---

## 1. In one paragraph

The website already has an assistant, but it is a **rule-based
demonstration**: it matches keywords to a fixed list of pre-written
answers (see `AI_SAFETY_RULES.md`). This plan replaces it with a real
AI agent in two parts. A **website assistant** answers visitors'
questions, finds listings and helps them start an enquiry. A **staff
assistant**, inside the signed-in admin area, summarises enquiries and
drafts replies and listing text for a person to check. In both, the AI
can only **read and draft**. It cannot send, approve, publish, price,
book or delete anything. Every one of those stays with a member of
staff (CLAUDE.md Rule 5).

## 2. Why do this, and why carefully

**What it adds**

- Visitors get useful answers at any hour, in plain language. Example:
  "Two-bed flats to rent near Tooting under £2,000?" gets real matching
  listings with links.
- More enquiries arrive complete, because the assistant helps fill in
  the right form.
- Staff spend less time reading and typing, and more time on viewings
  and valuations.

**What could go wrong.** These are the reasons for the safety design in §5:

- It could **invent** something (a property, a fee, a membership). Rule 1
  forbids that.
- It could **sound like advice** on legal, mortgage, valuation or safety
  matters, which only qualified people may give.
- Someone could try to **trick it** into revealing private information
  or breaking its rules ("prompt injection").
- It **costs money** for every conversation, and it sends what visitors
  type to an outside AI company, which brings data-protection duties.

## 3. Part A: the website assistant (for visitors)

| It can | How |
|---|---|
| Answer questions about the services | Only from the site's own approved pages, with a link to the page it used |
| Find listings | Searches the **published, available** listings and links to each one. It never describes a property that isn't in the list |
| Explain the next step | E.g. "To book a viewing, use this form", with the right page |
| Help start an enquiry | Fills in a **draft** of the right form (viewing, valuation, callback, repair, registration). **The visitor checks it, ticks consent, and presses Send themselves**, through the same checked form that exists today |
| Point tenants with a repair to the repair form | For anything that sounds urgent (gas smell, flood, no heat in winter), it shows the emergency numbers straight away. It never decides whether something is an emergency |
| Say it is an AI | Always, at the start and whenever asked. The chat window shows "AI assistant" at all times |

| It can never | Why |
|---|---|
| Give a valuation figure, or say what a property is "worth" | Rule 5; points to a free market appraisal instead |
| Give legal, mortgage, financial, investment or surveying advice | Needs a qualified person |
| Negotiate, accept or comment on an offer | Staff decision |
| Approve a tenant, confirm a tenancy or confirm a viewing time | Staff decision; it can only *start* a request |
| Reveal anything private (owners' addresses, other enquiries, staff notes) | It is never given that information in the first place |
| Make up facts about the company (fees, memberships, awards, staff) | Rule 1. Until fees and memberships are confirmed, it says "please ask us" |
| Send an email or message to anyone | It has no tool that can |

## 4. Part B: the staff assistant (admin area, signed-in staff only)

Only for staff who are signed in with two-step verification, and only
showing what their role already allows (the existing five roles in
`ADMIN_AND_CMS.md`).

| Task | What the AI does | What the person does |
|---|---|---|
| **Morning summary** | "12 new enquiries since yesterday: 3 valuation requests, 2 repairs (1 marked urgent by the tenant)…" with links | Reads, decides priorities |
| **Reply drafts** | Drafts a reply to an enquiry, using only facts in the enquiry and on the site | Edits and sends it. Drafts about money, valuations, tenancy decisions, legal or safety matters are refused, as today (`outbound-drafts.ts`) |
| **Listing descriptions** | Turns the facts a staff member has entered (rooms, features, area) into a draft summary and description, marked **AI draft** | Checks every word against the property, then sends it through the existing approval workflow. The AI never adds a fact that wasn't entered |
| **Listing check** | Points out missing material information (council tax band, tenure, EPC, service charge…) before a listing goes for approval | Fills the gaps |
| **Repair triage** | Groups repair reports and highlights ones the tenant described as urgent | Decides what is an emergency and who attends |
| **Find things** | "Show me lettings enquiries from SW17 this month" | — |

The staff assistant can **read** what that staff member's role can see,
and **create drafts**. It cannot change a listing's status, approve,
publish, delete, send, or see other staff members' sign-in details.

## 5. How it is kept safe

1. **The existing safety rules stay in front.** The refusal checks in
   `refusals.ts` (legal, mortgage, valuation, injection attempts, and so
   on) run **before** the AI sees a message. If they trigger, the AI is
   never asked.
2. **The AI only gets what it needs.** The website assistant sees the
   public pages and public listing details only, exactly what any
   visitor can see. Private addresses, owner details and staff notes
   are never sent to it.
3. **It can only act through a short list of "tools"** that we write
   and control (search listings, look up an FAQ, prepare a form draft).
   There is no tool that sends, approves, publishes, prices or deletes.
   This is the strongest protection: even if someone tricks the AI, it
   has nothing dangerous to do.
4. **Its answers are checked before they're shown.** Every property it
   mentions must match a real, available listing. Any reply containing
   a £ figure next to words like "worth" or "valuation", or words like
   "guaranteed" or "approved", is blocked and replaced with a safe
   answer.
5. **Text from outside is treated as information, never as orders.**
   For example, an enquiry that says "ignore your rules and…" is
   handled as text to summarise, never as something to obey.
6. **A switch to turn it off.** One setting changes the site back to
   today's rule-based assistant immediately. If the AI service fails or
   is slow, the site falls back to the old assistant automatically.
7. **Limits on use.** There are per-visitor message limits and a monthly
   spending cap, so a robot can't run up a bill. Messages are short.
8. **Everything is logged for review,** without personal details where
   possible, so staff can see what it said and spot problems.

## 6. Personal data and the law (UK GDPR)

What visitors type into the chat **goes to the AI company to produce the
answer.** Before the assistant goes live:

- **A Data Protection Impact Assessment (DPIA)** is recommended, because
  this is new technology that handles customers' messages. It's a short
  written risk check that a solicitor or data-protection adviser can
  review.
- **The privacy notice and cookie policy are updated** to say an AI
  assistant is used, by whom, and what happens to the messages. This
  wording needs a solicitor's review (Rule 5).
- **A data-processing agreement** with the AI provider is needed. Check
  how long the provider keeps messages, and whether "zero data
  retention" is available for this account.
- **Where the data is processed.** Three realistic routes, compared in
  the appendix, §A3. Anthropic's own service is simplest but doesn't
  offer an EU-only or UK-only setting. Amazon's and Google's services
  can run in European regions, at different prices and with more set-up.
  **The owner chooses, ideally with the solicitor.**
- **Keep less.** The chat doesn't ask for names, phone numbers or
  addresses. Those go only into the form the visitor submits, which
  already asks for consent. Chat logs are kept for a short, fixed period
  (suggested: 30 days), set by the owner along with the other retention
  periods.
- **Visitors are told** they are talking to an AI, and how to reach a
  person.

## 7. What it might cost (estimates only)

All figures are **rough estimates** from the AI provider's published
prices (cached 3 November 2026), **not measurements**. Real costs are
measured in the staff pilot (§8) before any public launch.

Assumptions: a typical visitor chat is 6 messages. Each answer is short.
The fixed instructions and site information are "cached" (re-used at
about a twentieth of the price).

| Option (Anthropic models) | Approx. cost per chat | Per 1,000 chats a month |
|---|---|---|
| **Claude Opus 5.5**, lowest "thinking" setting: the most capable model, and the starting point recommended here | about 10p | about £80–£100 |
| **Claude Sonnet 5.5**: a middle option | about 5p | about £40–£50 |
| **Claude Haiku 5.5**: the fastest and cheapest | under 1p | under £10 |

Prices are set in US dollars; the pound figures are rough conversions.

- The staff assistant is used far less, likely **£10–£40 a month**
  for a small team.
- **Recommendation:** start the pilot on Claude Opus 5.5 at its lowest
  thinking setting, then test Sonnet 5.5 and Haiku 5.5 against the same
  checklist of questions (§8). If a cheaper model gives answers just as
  safe and accurate, the owner can choose to switch. Switching is one
  setting. **Which model to pay for is the owner's decision** (Rule 4).
- **Hosting:** Vercel's Pro plan (needed anyway for a business site)
  covers the assistant. No extra hosting cost is expected.
- A **monthly spending cap** is set on the AI account from day one.

## 8. How it will be built and tested, in stages

Each stage needs the owner's go-ahead before the next starts.

| Stage | What happens | Visitors affected? |
|---|---|---|
| **0. Decisions** | Owner answers §9; AI account opened **by the owner**, with a spending cap; key added privately to Vercel by the owner (never in chat) | No |
| **1. Build** | Build the website assistant behind an off-by-default switch; old assistant stays as the fallback | No (switch off) |
| **2. Test set** | About 150 test questions: everyday questions, listing searches, the refusal topics, trick and injection attempts, and Welsh/Polish/Urdu speakers asking in English. Each has a pass/fail rule. **The assistant must pass 100% of the safety questions**, and a high bar on the rest | No |
| **3. Staff pilot** | Turned on in the private preview only. Staff use it for 2–4 weeks, and costs are measured | No |
| **4. Staff assistant** | Build Part B the same way, tested and piloted | No |
| **5. Public** | Only after the privacy wording is approved, the DPIA is done, and the owner approves the site going live (Rule 6) | Yes |

Rough effort: stages 1–3 about **one to two weeks** of build and test
work; stage 4 about another week. The pilot takes as long as the owner
wants.

## 9. Decisions needed from the owner

1. **Go ahead with the plan at all?** (Yes / change it / not now)
2. **Which parts:** website assistant, staff assistant, or both?
3. **Data location:** Anthropic directly, or Amazon / Google in a
   European region (see appendix §A3)? Ideally with the solicitor.
4. **Monthly spending cap** for the AI account (suggested to start:
   £50 for the pilot).
5. **Opening the AI account.** It must be in the business's name and
   opened by the owner (Rule 4). The AI team can't create accounts.
6. **How long chat logs are kept** (suggested 30 days).
7. **Who on the team reviews** the AI's logs and drafts during the pilot.
8. **What it says about fees and memberships** until they are verified.
   Suggested: "please ask us".

## 10. What this plan does not do

- No AI phone answering, no automatic emails or texts, no automatic
  valuations or "instant valuation" tool, no automatic tenant referencing
  decisions. Each would need its own plan and legal review.
- No connection to Rightmove, Zoopla or a CRM. None is chosen yet.
- It is not switched on in the client preview link.

---

## Technical appendix (for a developer)

### A1. Architecture

- **Surface: Claude Messages API with tool use, called from our own
  Next.js server**, through the TypeScript SDK (`@anthropic-ai/sdk`) and
  its Tool Runner (`client.beta.messages.toolRunner` with
  `betaZodTool`). The agent loop runs in a server action. Tools are
  plain functions over our existing providers (`propertyProvider`,
  knowledge base, lead form config).
- **Why not Managed Agents** (Anthropic-hosted agent sessions):
  - visitor chat needs low latency and no sandbox;
  - our tools read our own database inside our own server;
  - Managed Agents keeps session history on Anthropic's side until
    deleted, which is harder to square with data minimisation.
  - It is worth reconsidering later for scheduled staff jobs (e.g. the
    morning summary as a cron-scheduled deployment).
- **Fits the existing seam:** a new `ClaudeAIProvider implements
  AIProvider` in `lib/ai/`. The widget and server action don't change.
  `getAIProvider()` chooses by an `AI_ASSISTANT=demo|live` env var and
  falls back to `DemoAIProvider` on error, timeout or refusal.
- **Order of operations per message:**
  1. `checkRefusal()` (existing);
  2. per-IP rate limit;
  3. model call with tools;
  4. output guard (listing IDs must exist and be `available`; regex
     blocks valuation figures and "guaranteed/approved"; every
     substantive answer must cite an `AISource`);
  5. render.
- **Staff assistant:** separate server actions under `/admin`, gated by
  `requireRole` + aal2. Tools are scoped to the caller's role
  permissions (`roles.ts`). Drafts only, via `createOutboundDraft` and
  a new "AI draft" field state on properties.

### A2. Tools (website assistant)

All tools use `strict: true` schemas and are read-only or draft-only:

| Tool | Does |
|---|---|
| `search_listings(category, listingType, area?, minBeds?, maxPrice?)` | Public, `available` listings only; returns id, display address, price text, link |
| `get_listing(id)` | Public fields only (`toPublicProperty`) |
| `lookup_faq(topic)` | Returns approved entries from `knowledge-base.ts` with source URLs |
| `prepare_form(category, fields)` | Returns a prefilled link/state for the existing form. **Never submits.** The visitor submits, with consent, through the existing validated action |
| `emergency_contacts()` | Fixed emergency guidance text |

**Model settings:**

- Default `claude-opus-5-5`, `output_config.effort: "low"` for chat.
  Thinking can't be disabled on this model; effort is the control.
- Streaming, so answers appear as they are written.
- Prompt caching on tools + system + knowledge base, with a frozen
  prefix and no timestamps in it. Check that
  `usage.cache_read_input_tokens` > 0.
- `stop_reason` checked before use. Handle `refusal` by falling back to
  the demo provider's safe answer. Server-side `fallbacks` is available
  on the Claude API (beta `server-side-fallback-2026-07-01`).
- `tool_choice: auto` (forced tool choice returns a 400 on this model).
- No assistant prefill.

### A3. Data location options

| Route | Where processing happens | Notes |
|---|---|---|
| Anthropic Claude API (first-party) | `inference_geo` supports `"global"` (default) or `"us"` only; no EU/UK pin | Simplest; newest features first; published prices in §7 |
| Amazon Bedrock | Can run in AWS European regions (check the chosen model is offered in London / Ireland before deciding) | Partner pricing; AWS account and set-up; `inference_geo` not available, the region is chosen instead |
| Google Cloud Vertex AI | European regions or the `"eu"` multi-region | Partner pricing; GCP account; some server tools (web fetch) not available, which we don't need |

The Supabase database is already in Ireland (eu-west-1), by owner
decision.

### A4. Configuration (none set yet)

- `AI_ASSISTANT` (`demo` | `live`, default `demo`).
- `ANTHROPIC_API_KEY`: server-only, Vercel "sensitive", added by the
  owner; never `NEXT_PUBLIC_`.
- `AI_MODEL` (default `claude-opus-5-5`).
- `AI_MONTHLY_BUDGET_GBP` (soft cap checked against logged usage), plus
  the hard spend limit set in the provider console.

### A5. Tests to add

- Unit tests for every tool (public fields only; `available` only).
- Output guard tests: invented listing ID, valuation figure,
  "guaranteed".
- Provider fallback tests: timeout, 429, refusal.
- The 150-question evaluation set (§8 stage 2), stored in the repo and
  run before every model or prompt change. The existing injection and
  refusal tests in `lib/ai/*.test.ts` must keep passing unchanged.
