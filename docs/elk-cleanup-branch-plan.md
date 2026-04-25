# ELK Lark — Cleanup execution plan (4 PRs)

Merge branches in order: phase 1 → phase 2 → phase 3 → phase 4 into `main`.

Global constraints: no layout redesign, no long copy rewrites, no real wellness / micro-wedding / group landing content, no new visual tokens outside `docs/elk-site-rules.md`.

---

## Phase 1 — IA / routes / nav alignment

**Outcome**  
`docs/elk-site-sitemap.md` drives `Header.tsx`, `footer.tsx`, and `App.tsx`. Header bar: The ELK Story, **Experiences** dropdown (conversion order: Wellness Retreats, Micro Weddings, Group Getaways, divider, **Plan Your Experience** → `/experience` as the planning hub), Basecamp, The Lark Life, What to Expect, Get in Touch, Start Your Lark CTA. The **Experiences** dropdown stays (desktop hover + focus-within; mobile accordion with identical item order). Footer stays a flat Explore list (eight links). Funnels stay linked from Home and from the `/experience` page body.

**Files**  
`src/components/Header.tsx`, `src/components/footer.tsx`, `src/App.tsx`, `src/pages/the-lark-life.tsx` (new), `src/pages/contact.tsx` (replace stub), `docs/elk-site-sitemap.md`.

**Work**  
Header: sitemap order; **Experiences** menu order is funnel-first, divider, then Plan Your Experience; label **Experiences** unchanged; dropdown behavior preserved.  
Footer: flat list — The ELK Story, Your Experience, Basecamp, The Lark Life, What to Expect, Get in Touch, Start Your Lark, Privacy Policy.  
App: routes `/the-lark-life`, `/contact` with imports from `./pages/the-lark-life`, `./pages/contact`.  
`the-lark-life.tsx`: export `TheLarkLife`; minimal `section` + `Footer`; no `SiteHero` until phase 2.  
`contact.tsx`: export `Contact`; same minimal shell; no `SiteHero` until phase 2.  
Sitemap doc: **Navigation (Finalized)** matches the Experiences dropdown strategy above.

**Do not touch**  
`guest-experiences.tsx` form and data; header CTA pill classes; `ComingSoonPage.tsx` beyond existing route wiring; Phase 2–4 files.

**Acceptance**  
Header matches sitemap (dropdown + links + CTA); footer matches flat eight-link list; `/the-lark-life` and `/contact` resolve; `npm run build` passes.

**Commit**  
`chore(nav): align header, footer, and sitemap with Experiences dropdown + new routes`

---

## Phase 2 — Hero + placeholder compliance

**Outcome**  
Every `App.tsx` route opens with `SiteHero`. `ComingSoonPage` takes props; renders `SiteHero`, stub line, `Footer`, CTA to `/guest-experiences`.

**Files**  
`src/pages/privacy.tsx`, `src/pages/experiences/outlaw.tsx`, `src/pages/experiences/restore.tsx`, `src/pages/experiences/strategy.tsx`, `src/pages/ComingSoonPage.tsx`, `src/App.tsx`, `src/pages/the-lark-life.tsx`, `src/pages/contact.tsx`.

**Work**  
`ComingSoonPage`: props `title`, `subtitle`, `heroImage`, `heroImageAlt` (all strings; empty `subtitle` means no subtitle line); render `SiteHero` with those props plus `ctaText="Start Your Lark"` `ctaLink="/guest-experiences"`; then `section` `px-6 py-20` `max-w-2xl mx-auto` with “Coming soon.”; then `Footer`.  
`App.tsx`: pass distinct prop sets for `/wellness-retreats`, `/micro-weddings`, `/group-getaways`; `heroImage` paths under `public/` already present in the repo; add no new remote image URLs.  
`privacy.tsx`: remove custom `h-72` hero `section`; add `SiteHero` with `public/` image (copy one existing still into `public/images/` in this PR for that hero); exported name `Privacy`; `mailto:info@elklark.com` for contact line.  
`experiences/outlaw.tsx`, `restore.tsx`, `strategy.tsx`: remove top video hero `section`; prepend `SiteHero` with title and `public/` still per page from existing assets; leave body below unchanged.  
`the-lark-life.tsx`, `contact.tsx`: prepend `SiteHero` with title, `subtitle` string, `backgroundImage` from `public/` only, same CTA props; keep minimal `section` and `Footer` below.

**Do not touch**  
Body copy and inner sections below the new hero on outlaw / restore / strategy; home, about, packages, faq, guest-experiences, basecamp beyond the two new pages’ hero prepend.

**Acceptance**  
First layout node per route is `SiteHero`; `ComingSoonPage` matches prop contract; no page-entry hero `section` with `h-72` / `h-[40vh]`; `npm run build` passes.

**Commit**  
`fix(pages): SiteHero on all routes; props-based ComingSoonPage with Footer and CTA`

---

## Phase 3 — SiteSection, PrimaryCtaBlock, CTA + widths

**Outcome**  
`SiteSection.tsx` and `PrimaryCtaBlock.tsx` exist, documented in `docs/elk-component-registry.md`, applied on listed pages; FAQ primary CTA matches amber pill; listed files contain no `max-w-3xl` / `max-w-5xl`.

**Files**  
`src/components/SiteSection.tsx` (new), `src/components/PrimaryCtaBlock.tsx` (new), `docs/elk-component-registry.md`, `src/pages/faq.tsx`, `src/pages/the-lark-life.tsx`, `src/pages/contact.tsx`, `src/pages/privacy.tsx`, `src/pages/packages.tsx`.

**Work**  
`SiteSection`: props `maxWidth` (`6xl` | `4xl` | `2xl`), `tone` (`white` | `stone-50` | `stone-100`), `children`; outer `section` `px-6 py-20` + tone bg; inner `div` `mx-auto` + mapped `max-w-*` only.  
`PrimaryCtaBlock`: props `title`, `body`, `ctaLabel`, `ctaTo`; render inside `SiteSection` `max-w-2xl`: H2, one `p`, `Link` with `rounded-full bg-amber-600 px-8 py-3 font-semibold text-white hover:bg-amber-700`.  
Registry: add entries for both components with purpose, constraints, props.  
`faq.tsx`: closing strip uses `SiteSection` + `PrimaryCtaBlock`; remove non-amber / non-pill CTA classes.  
`the-lark-life.tsx`, `contact.tsx`, `privacy.tsx`: wrap non-hero content in `SiteSection` with valid `maxWidth` + `tone`.  
`packages.tsx`: wrap intro in `SiteSection`; replace `max-w-3xl` with `max-w-2xl` on that intro.

**Do not touch**  
`guest-experiences.tsx`; card component internals (`PackageCard`, `SignaturePackageCard`, etc.).

**Acceptance**  
Both components exist and appear in the registry; FAQ CTA is amber pill; the eight files named under **Files** contain neither `max-w-3xl` nor `max-w-5xl`; `npm run build` passes.

**Commit**  
`chore(ui): add SiteSection and PrimaryCtaBlock; fix FAQ CTA and width tokens`

---

## Phase 4 — Dead code + Footer module name

**Outcome**  
Unused hero/video modules removed. Listed unrouted pages removed. `footer.tsx` renamed to `Footer.tsx`; all imports use `components/Footer`. `docs/elk-implementation-quickstart.md` states `src/components/Footer.tsx`.

**Files**  
Delete: `src/components/HeroBackground.tsx`, `src/components/WinterHeroCarousel.tsx`, `src/components/VideoBG.tsx`, `src/pages/temp1.tsx`, `src/pages/property.tsx`, `src/pages/property_TEMP2.tsx`, `src/pages/Property copy.tsx`, `src/pages/Accommodation.tsx`, `src/pages/OutlawLark.jsx`, `src/pages/start.tsx`.  
Rename: `src/components/footer.tsx` → `Footer.tsx`.  
Update: every `src/**/*.tsx` footer import; `docs/elk-implementation-quickstart.md`; `src/App.tsx` (drop imports for deleted modules only).

**Work**  
Grep for `HeroBackground`, `WinterHeroCarousel`, `VideoBG`, deleted page basenames, lowercase `components/footer`; delete listed files; rename footer file; rewrite imports to `../components/Footer` from `src/pages` and `../../components/Footer` from `src/pages/experiences/*`; sync quickstart footer path sentence.

**Do not touch**  
`App.tsx` route definitions beyond import cleanup; `guest-experiences.tsx` logic; experience page bodies beyond `Footer` import path.

**Acceptance**  
Build passes on case-sensitive FS; deleted filenames absent from tree; no `components/footer` import path; quickstart names `Footer.tsx`.

**Commit**  
`chore(repo): delete dead pages and hero utilities; rename footer to Footer.tsx`
