# ELK Lark Site Rules

## Purpose

This document is the single source of truth for how the ELK Lark site is built.

All pages must follow these rules to ensure consistency, clarity, and conversion.

---

## 1. Core Principles

- Clarity over cleverness
- Real experiences over abstract branding
- Conversion over decoration
- Simple, scannable structure
- Consistent patterns across all pages

Do not introduce new styles, layouts, or patterns unless they are added here first.

---

## 2. Navigation Rules

Primary navigation:

- The ELK Story → /about
- Experiences (dropdown)
  - Wellness Retreats → /wellness-retreats
  - Micro Weddings → /micro-weddings
  - Group Getaways → /group-getaways
  - Plan Your Experience → /experience
- Basecamp → /basecamp
- The Lark Life → /the-lark-life
- What to Expect → /faq
- Get in Touch → /contact
- Start Your Lark (CTA) → /guest-experiences

Rules:

- Dropdown is for decision-making, not explanation
- Funnel pages come first
- Custom/planning comes last
- No duplicate pathways across nav

---

## 3. Page Types

### Routing Page

Example: `/experience`

Purpose:
- Help user choose a path

Rules:
- Minimal copy
- 3–4 options max
- No deep explanation
- Must lead to funnel pages

---

### Funnel Pages

Examples:
- `/wellness-retreats`
- `/micro-weddings`
- `/group-getaways`

Purpose:
- Convert interest into action

Standard structure:

1. Hero (clear promise + CTA)
2. Intro (short, grounded)
3. What you get / looks like
4. Sample flow
5. Who it's for
6. What makes it different
7. Final CTA

Rules:
- No abstract package names (Outlaw, Restore, etc.)
- Real-world language only
- Keep sections tight and scannable

---

## 4. Spacing System

Global spacing rules:

- Standard section padding: `py-12`
- Large section padding: `py-14`
- Avoid `py-16` and `py-20`

Grid spacing:

- Standard gap: `gap-6`
- Avoid excessive vertical whitespace

Rules:

- Pages should feel tight and connected
- Avoid large empty gaps
- Maintain consistent rhythm across pages

---

## 5. Image Rules

- Use placeholder images only until real ELK Lark photos are available
- Do NOT use stock lifestyle images
- Do NOT use AI-generated images

All images must represent:
- real property
- real experiences
- real atmosphere

Add comments like:

{/* Replace with real ELK Lark photo */}

---

## 6. Content Rules

- Keep copy short and direct
- Avoid buzzwords (luxury, curated, elevated unless clearly true)
- Avoid overpromising
- Use simple, human language

Good:
- "Bring your people together"
- "Relax, recharge, reset"

Bad:
- "Immersive transformative experience"
- "Luxury elevated offering"

---

## 7. CTA Rules

Primary CTA:

- "Start Your Lark" → /guest-experiences

Rules:

- Every funnel page must end with a CTA
- Keep CTA consistent across pages
- Avoid multiple competing CTAs

---

## 8. What NOT to Do

- Do not reintroduce Outlaw / Restore / Strategy as primary concepts
- Do not add new navigation items casually
- Do not create new page layouts outside this system
- Do not over-design
- Do not add filler sections

---

## 9. Ongoing Rule

If something feels inconsistent:

- Fix the system, not just the page
- Update this document
- Then apply changes everywhere
