# ELK Pre-Ship Build Checklist

## Usage
- This checklist is mandatory before merge to production.
- A page fails if any required item is unchecked.

## 1) Structure
- [ ] Page follows approved sequence: `SiteHero -> content sections -> CTA -> Footer`
- [ ] Hero uses `SiteHero` only (no custom hero implementation)
- [ ] Page includes one clear primary CTA path (`Start Your Lark` or documented equivalent)
- [ ] Content sections use approved wrappers (`px-6`, `py-20`, approved max-widths)
- [ ] Navigation and footer links align with `docs/elk-site-sitemap.md`

## 2) Design
- [ ] Only approved spacing scale is used (`py-20`, `py-16` where allowed)
- [ ] Only approved components are used (see `docs/elk-component-registry.md`)
- [ ] No one-off styling patterns, custom gradients, or ad hoc color values
- [ ] Primary CTA uses approved amber button style
- [ ] Card and image blocks follow approved border/radius/shadow patterns
- [ ] Hero overlay and height match system (`bg-black/40`, `h-[60vh]`)

## 3) Content
- [ ] Tone is grounded, confident, calm, and non-corporate
- [ ] No fluff or hype language
- [ ] No banned phrases from `docs/elk-site-rules.md`
- [ ] Hero subtitle is one sentence max
- [ ] Section copy is concise and decision-oriented
- [ ] CTA text is clear and action-based (no ambiguous button labels)

## 4) UX
- [ ] Mobile layout is clean (no clipping, overlap, or broken hierarchy)
- [ ] Text remains readable over images at all breakpoints
- [ ] Funnel flow is obvious within first two scroll depths
- [ ] User can identify next action without guessing
- [ ] Forms and CTA links are reachable and functional

## 5) Dev Quality
- [ ] No duplicate components created for existing patterns
- [ ] No dead code imports, unused files, or unreachable routes introduced
- [ ] File naming and route naming are consistent with existing conventions
- [ ] Build passes (`npm run build`)
- [ ] Lint warnings/errors for changed files are resolved
- [ ] New components/pages are documented in relevant docs files

## 6) Funnel Validation (Required)
- [ ] Page clearly maps to one of the primary funnels or a support role
- [ ] Page supports one primary conversion action
- [ ] Internal links reinforce funnel continuity, not fragmentation
- [ ] If page overlaps another page purpose, duplication is removed or merged

## 7) Final Release Gate
- [ ] Checklist completed by implementer
- [ ] Checklist reviewed by second reviewer or project owner
- [ ] Exceptions (if any) are documented with rationale and follow-up issue
- [ ] No release if unresolved checklist failures remain
