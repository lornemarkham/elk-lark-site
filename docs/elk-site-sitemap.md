# ELK Lark Site Sitemap

## Navigation (Finalized)

**Desktop (left to right, then CTA)**

1. The ELK Story → `/about`
2. **Experiences** (dropdown)
   - Wellness Retreats → `/wellness-retreats`
   - Micro Weddings → `/micro-weddings`
   - Group Getaways → `/group-getaways`
   - *(visual divider)*
   - Plan Your Experience → `/experience` *(planning hub / safety-net; not the first dropdown item)*
3. Basecamp → `/basecamp`
4. The Lark Life → `/the-lark-life`
5. What to Expect → `/faq`
6. Get in Touch → `/contact`
7. **Start Your Lark** (CTA button) → `/guest-experiences`

**Mobile**

- Same order and labels: The ELK Story; **Experiences** (expandable panel: same entries as desktop — three funnel links, divider, Plan Your Experience); Basecamp; The Lark Life; What to Expect; Get in Touch; **Start Your Lark**; then season toggle.

**Footer (Explore)**

- Flat list only: The ELK Story, Your Experience, Basecamp, The Lark Life, What to Expect, Get in Touch, Start Your Lark, Privacy Policy (paths match header targets).

## Primary Funnel Architecture

### Funnel 1: Health & Wellness Retreats
- Target audience:
  - couples, friends, and small groups seeking recovery, calm, and intentional time
- Intent:
  - evaluate if ELK Lark can host a restorative stay without rigid resort structure
- Emotional driver:
  - reset, breathing room, and meaningful downtime
- Primary CTA:
  - `Start Your Lark`

### Funnel 2: Micro Weddings / Events
- Target audience:
  - couples planning intimate weddings and hosts planning small milestone events
- Intent:
  - confirm fit for private, character-rich events with practical support
- Emotional driver:
  - intimacy, confidence, and less production stress
- Primary CTA:
  - `Start Your Lark`

### Funnel 3: Group / Family Getaways
- Target audience:
  - multi-generational families, close friend groups, and small team retreats
- Intent:
  - assess property fit, shared activities, and planning flexibility
- Emotional driver:
  - connection, play, and a place that feels fully theirs
- Primary CTA:
  - `Start Your Lark`

## Page Inventory and Roles

### Core Brand and Navigation Pages
- `/` Home
  - role: decision page that routes into the three primary funnels
  - key blocks: standardized hero, funnel chooser cards, property trust signal, CTA
- `/about` The ELK Story
  - role: brand credibility, host identity, and trust narrative
  - key blocks: hero, origin story, team/family credibility, CTA
- `/experience` Your Experience
  - role: high-level experience model and funnel selection context
  - key blocks: hero, experience framework, pathway cards, CTA
- `/basecamp` Basecamp
  - role: practical proof of place, amenities, and on-site atmosphere
  - key blocks: hero, gallery/content sections, logistics clarity, CTA
- `/the-lark-life` The Lark Life
  - role: emotional lifestyle proof (day-in-the-life content)
  - key blocks: hero, curated moments, social proof style content, CTA
- `/faq` What to Expect
  - role: remove objections and reduce uncertainty
  - key blocks: hero, grouped FAQs, fallback contact CTA
- `/contact` Get in Touch
  - role: direct contact path for users not ready for full request form
  - key blocks: hero, concise contact options, expectation setting
- `/guest-experiences` Start Your Lark
  - role: primary conversion endpoint for all funnels
  - key blocks: hero, offer selectors, inquiry form, confirmation states

### Funnel Landing Pages
- `/wellness-retreats`
  - role: funnel-specific intent page for restorative stays
  - connects from: Home, Your Experience, nav dropdown/pathways
  - exits to: Start Your Lark
- `/micro-weddings`
  - role: funnel-specific intent page for intimate weddings/events
  - connects from: Home, Your Experience, nav dropdown/pathways
  - exits to: Start Your Lark
- `/group-getaways`
  - role: funnel-specific intent page for group/family stays
  - connects from: Home, Your Experience, nav dropdown/pathways
  - exits to: Start Your Lark

### Legacy / Support Pages (Transitional)
- `/packages`
  - role: legacy package framing; phase into funnel-specific pages over time
  - action: maintain while funnel pages mature, then merge or deprecate
- `/privacy`
  - role: legal requirement
- `/start` (redirect)
  - role: preserve old links; redirect to `/guest-experiences`

## Funnel Connection Map
- Home -> choose funnel page (`/wellness-retreats`, `/micro-weddings`, `/group-getaways`) -> `Start Your Lark`
- Header **Experiences** dropdown -> funnel pages first, then **Plan Your Experience** (`/experience`) -> `Start Your Lark`
- About / Basecamp / The Lark Life / FAQ / Contact -> reinforce trust -> `Start Your Lark`
- Your Experience page -> pathways + funnel links -> `Start Your Lark`
- Any page without a clear next-step CTA fails the sitemap contract.

## Routing Governance
- Every new marketing page must declare:
  - funnel assignment (or support-page role)
  - primary CTA destination
  - relationship to existing pages
- Do not add top-level nav items without updating this sitemap and pruning overlap.
- Changes to the **Experiences** dropdown contents require updating this document and `Header.tsx` in the same change set.
