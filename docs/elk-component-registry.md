# ELK Component Registry

## Purpose
- This registry defines approved reusable components for the ELK Lark marketing system.
- This is a contract, not a suggestion.
- If a component is not listed here, it is not approved for production use.

## Component Standards
- Every component must have:
  - clear single responsibility
  - predictable props
  - no embedded page-specific business logic
  - styling that matches `docs/elk-site-rules.md`
- Every reusable component must be imported from `src/components`.

## Approved Components

### 1) SiteHero
- Purpose:
  - standard page entry hero with background image, overlay, centered title/subtitle, optional CTA
- Use when:
  - any routed page needs a hero
- Do not use when:
  - content is purely utility/legal and intentionally has no hero (rare exception)
- Contract:
  - required props: `title`, `backgroundImage`
  - optional props: `subtitle`, `ctaText`, `ctaLink`
  - fixed visual: `h-[60vh]`, `bg-black/40`, centered text, max one CTA

### 2) Section Wrapper (pattern component)
- Purpose:
  - enforce consistent section spacing and container width
- Use when:
  - building all content sections beneath hero
- Do not use when:
  - creating one-off wrappers with custom padding per page
- Contract:
  - section outer classes: `px-6 py-20`
  - inner container: one of `max-w-6xl`, `max-w-4xl`, `max-w-2xl` with `mx-auto`

### 3) Content Block
- Purpose:
  - reusable block for heading + supporting text + optional action
- Use when:
  - narrative or explanatory copy sections are needed
- Do not use when:
  - copy exceeds long-form threshold and should be split into multiple blocks
- Contract:
  - heading style follows H2/H3 hierarchy
  - paragraph count limited to focused copy; no wall-of-text blocks

### 4) Card Grid
- Purpose:
  - display comparable pathways, packages, or options in consistent cards
- Use when:
  - presenting 2-6 parallel choices
- Do not use when:
  - content is a timeline, quote, or narrative sequence
- Contract:
  - grid: `grid gap-8 md:grid-cols-3` (or context-appropriate count)
  - card style: `rounded-xl border border-stone-200 bg-white shadow-sm hover:shadow-md`
  - card padding: `p-6 sm:p-8`

### 5) CTA Block
- Purpose:
  - clear conversion close with one action
- Use when:
  - ending major pages or sections
- Do not use when:
  - page already has competing CTAs in the same viewport
- Contract:
  - one heading, one support sentence, one primary CTA
  - primary button style only (`bg-amber-600 hover:bg-amber-700`)

### 6) Image Section
- Purpose:
  - visual storytelling section with controlled aspect ratio and legibility
- Use when:
  - showcasing basecamp/property/lifestyle proof
- Do not use when:
  - image is decorative and does not support a decision
- Contract:
  - use consistent dimensions within each grid row
  - use overlays only for text legibility, not decorative effects
  - avoid mixed aspect-ratio chaos inside a single gallery cluster

### 7) Testimonial Block (Future-ready)
- Purpose:
  - structured social proof for trust and conversion support
- Use when:
  - testimonials are verified and approved
- Do not use when:
  - quotes are fabricated, anonymous without context, or unverified
- Contract:
  - include attribution format (first name + context)
  - max 2-3 testimonials per section
  - no carousel until content volume justifies it

## Existing Concrete Components (Current Codebase)
- `SiteHero`
- `ExperienceCard`
- `PackageCard`
- `SignaturePackageCard`
- `AddOnCard`
- `BasecampCarousel`
- `Header`
- `Footer`
- `PageTransition`

## Registry Governance
- Before creating a new component:
  - confirm no existing component can be extended safely
  - document why extension is insufficient
- After creating a new approved component:
  - add it to this registry in the same PR
  - document use and misuse conditions
- Any component not registered here must be treated as experimental and excluded from production pages.
