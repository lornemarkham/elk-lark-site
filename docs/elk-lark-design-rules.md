# ELK Lark Website Design Rules

## Purpose

This document is the source of truth for all future ELK Lark page work.  
Use it to keep design, spacing, layout, and messaging consistent across the site.

Brand direction: clean, premium, warm, grounded, and professional.  
ELK Lark should feel boutique, local, elevated, and personal - not generic tourism.

---

## 1. Page Structure Rules

- Follow existing page patterns before inventing new layouts.
- Use a clear section flow: Hero -> Intro -> Core details -> Differentiators -> Final CTA.
- Keep sections scannable and focused; avoid filler content.
- Reuse existing shared components whenever possible.
- Do not change global design patterns casually.

---

## 2. Hero Rules

- Use the shared `SiteHero` pattern for top-of-page consistency.
- Keep hero height consistent and not overly tall.
- Hero copy must be clear and direct: one promise + optional supporting line.
- Overlay should preserve readability without making imagery too dark.
- Use implementation comments to mark real image replacements.

---

## 3. Section Spacing Rules

- Keep vertical rhythm tight and consistent.
- Preferred section padding:
  - Standard: `py-12`
  - Large: `py-14`
- Avoid excessive whitespace and oversized spacing stacks.
- Keep section-to-section transitions visually connected.
- Prefer consistent `gap-*` scales in grids (typically `gap-6`).

---

## 4. Image Rules

- Use placeholder image paths only until real ELK Lark photos are available.
- Do **not** use generated/fake remote image URLs.
- Do **not** use AI-generated imagery.
- Do **not** use generic stock lifestyle imagery that misrepresents the property.
- All imagery should reflect real place, real atmosphere, and real experiences.

---

## 5. Typography Rules

- Reuse existing typography classes and hierarchy patterns.
- Prioritize clarity over decorative styling.
- Keep headings short; keep body copy direct and practical.
- Avoid vague, abstract, or overhyped language.
- Maintain consistent heading and paragraph rhythm across pages.

---

## 6. Button and CTA Rules

- Primary CTA language should guide users toward inquiry/contact.
- CTA targets should route to planning/inquiry paths, not hard booking flows.
- Keep CTA styling consistent with global button patterns.
- Avoid competing CTAs in the same section.
- Final sections should end with one clear next step.

---

## 7. Card and Grid Rules

- Reuse existing card styles and shared card components where available.
- Keep card heights and spacing visually consistent.
- Use subtle hover behavior only (no flashy animation).
- Prefer standard responsive grids (`md:grid-cols-*`) and existing container widths.
- Avoid creating one-off card systems for single pages.

---

## 8. Navigation Rules

- Use **Experiences** as the main navigation item for funnel discovery.
- Priority funnels:
  - Wellness Retreats
  - Micro Weddings/Events
  - Group/Family Getaways
- Keep navigation streamlined and decision-oriented.
- Do not introduce duplicate pathways or conflicting labels.
- Update nav structure only with intentional, system-level decisions.

---

## 9. Experience Page Rules

- `/experience` is a routing page, not a long-form sales page.
- Keep copy minimal and action-oriented.
- Present the three primary funnels clearly and consistently.
- Avoid abstract/internal package framing.
- CTA should move users into inquiry/planning, not direct booking language.
- Future experience-related pages should match existing funnel-page patterns first.

---

## 10. Do Not Do List

- Do not add random layouts, spacing systems, or visual patterns.
- Do not use fake AI art or inconsistent remote stock imagery.
- Do not over-design or add decorative sections without purpose.
- Do not introduce off-brand tone or generic tourism language.
- Do not advertise overnight-rental language too directly.
- Do not bypass shared components when equivalent patterns already exist.
