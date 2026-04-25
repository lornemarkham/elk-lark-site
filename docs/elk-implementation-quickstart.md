# ELK Lark — Implementation Quickstart

Operating procedure for this repo. Read `elk-site-rules.md`, `elk-site-sitemap.md`, `elk-component-registry.md`, and `elk-build-checklist.md` first. At the start of every page task, open **`elk-implementation-quickstart.md`** and **`elk-build-checklist.md`**. Any code deviation from those docs ships only with **matching updates** to sitemap, rules, registry, and checklist in the **same PR**.

---

## 1. Repo structure rules

### Pages — `src/pages/`

- Routed marketing pages live here only.
- One default export per route file. Filename **`kebab-case.tsx`**, aligned with the URL segment (e.g. `guest-experiences.tsx` → `/guest-experiences`).
- Nested URLs use a subfolder (e.g. `src/pages/experiences/outlaw.tsx` → `/experiences/outlaw`).
- No alternate trees (`src/views/`, `src/screens/`, duplicate draft filenames). Unrouted page files are removed from the repo.

### Shared components — `src/components/`

- Reusable UI lives here only. **One component per file.** Filename **`PascalCase.tsx`** matching the export (`SiteHero.tsx`, `ExperienceCard.tsx`).

### Layout — `src/App.tsx`, `src/main.tsx`

- Global shell: routing wrapper, `SeasonProvider`, `Header`, `main`, `PageTransition`. No second layout layer on individual pages.

### Site chrome — `src/components/`

- **`Header.tsx`** — global navigation.
- **`Footer.tsx`** — global footer. **This is the only footer filename and import:** `import Footer from "../components/Footer"`.
- **`PageTransition.tsx`** — route transitions; wired from `App.tsx` only.

### Section wrapper — `src/components/SiteSection.tsx`

- All content sections below the hero use **`SiteSection`** exclusively. Outer padding, inner `max-w-*` + `mx-auto`, and allowed background classes live **only** in this component (values per `elk-site-rules.md`). Pages pass **`children`** and approved props only (e.g. `maxWidth: "6xl" | "4xl" | "2xl"`, optional `tone: "white" | "stone-50" | "stone-100"`). No copy-pasted section shells on new or touched pages.

### CTA blocks — `src/components/PrimaryCtaBlock.tsx`

- Any closing strip with **heading + one sentence + primary `Link`** uses **`PrimaryCtaBlock`**. The second route file that needs this pattern adds **`PrimaryCtaBlock.tsx`** and registers it in **`elk-component-registry.md`** in that PR; existing duplicates migrate in the same PR.

### Inquiry UI — `src/pages/guest-experiences.tsx`

- The inquiry form and its submit UX stay here until **`InquiryForm`** is listed in the registry and extracted per registry governance.

### Media — `public/` and `src/assets/`

- **`public/`** — everything referenced by URL (`/images/...`, `/videos/...`, root static files). Marketing photography: **`public/images/`** only.
- **`src/assets/`** — small bundled assets imported in TS/TSX (e.g. header logo).
- No large binaries under `src/` except required bundled imports. Remote image URLs are not used on new production pages; exceptions are documented in the PR.

### Reusable media UI — `src/components/`

- Carousels and galleries (`BasecampCarousel`, etc.) live here. Page files compose them; they do not reimplement carousel markup.

### Docs — `docs/`

- System docs live here only: `elk-site-rules.md`, `elk-site-sitemap.md`, `elk-component-registry.md`, `elk-build-checklist.md`, `elk-implementation-quickstart.md`.
- Behavior changes ship with updates to **rules + registry + checklist** (and sitemap when routes or funnels change) in the **same PR** as code.

---

## 2. Page build workflow

1. Lock **funnel role and primary CTA** in `elk-site-sitemap.md` (or update sitemap in this PR).
2. Lock **layout, hero, spacing, type, color, CTA classes** in `elk-site-rules.md` (or update rules in this PR).
3. Pick **components** from `elk-component-registry.md` only (or register new ones in this PR).
4. Build the page: **`SiteHero` → `SiteSection` blocks → registered cards/media → `PrimaryCtaBlock` → `Footer`** (header/footer from `App.tsx` shell).
5. Complete **`elk-build-checklist.md`** with no required item unchecked.
6. Merge only if no new visual or layout pattern exists outside updated rules + registry.

---

## 3. Required page template

Block order for every marketing page. Exceptions require an explicit sitemap entry and the same PR updates sitemap + rules if needed.

| # | Block | Role |
|---|--------|------|
| 1 | Hero | `SiteHero`: title; optional one-sentence subtitle; optional single CTA. |
| 2 | Positioning intro | Who it is for + what the page answers. Width: `max-w-2xl` or `max-w-4xl` per rules. |
| 3 | Offer / experience | Cards or grids for decisions (paths, packages, add-ons). |
| 4 | Trust / proof | Property, hosts, logistics. No fabricated testimonials. |
| 5 | FAQ / details | Objections and practicals; short, scannable. |
| 6 | CTA | One primary close — default **`Start Your Lark`** → `/guest-experiences` unless sitemap assigns another registered primary for that page. |

**Fixed:** `SiteHero` contract; section spacing and `max-w-*` vocabulary; one primary conversion intent per page; `SiteSection` + `PrimaryCtaBlock` usage where applicable.

**Variable:** Count of `SiteSection` instances inside blocks 2–5; grid column count (`md:grid-cols-2` vs `md:grid-cols-3`) per content; hero image URL and copy within hero limits in `elk-site-rules.md`.

---

## 4. Component usage map

| Section | Implementation |
|---------|------------------|
| Hero | `SiteHero` — `src/components/SiteHero.tsx` |
| Global header | `Header` — `src/components/Header.tsx` |
| Global footer | `Footer` — `src/components/Footer.tsx` |
| Route transition | `PageTransition` — `src/components/PageTransition.tsx` (via `App.tsx` only) |
| Content sections | `SiteSection` — `src/components/SiteSection.tsx` |
| Intro / copy blocks | Registry content block: H2 + body inside `SiteSection` at approved `max-w-*` |
| Pathway / package / add-on cards | `ExperienceCard`, `PackageCard`, `SignaturePackageCard`, `AddOnCard` |
| Property carousel | `BasecampCarousel` |
| Primary CTA close | `PrimaryCtaBlock` — `src/components/PrimaryCtaBlock.tsx` |
| Inquiry form | `guest-experiences.tsx` until `InquiryForm` exists in the registry |
| Season UI | `SeasonToggle` in `Header` only |

---

## 5. Anti-patterns

- Duplicating section wrapper markup instead of **`SiteSection`**.
- Duplicating primary CTA strips instead of **`PrimaryCtaBlock`** after that component exists.
- Custom heroes, video heroes, or logos inside hero on routed pages (**`SiteHero` only**).
- New spacing, radii, shadows, or colors outside **`elk-site-rules.md`**.
- New card shells outside **`ExperienceCard` / `PackageCard` / `SignaturePackageCard` / `AddOnCard`** contracts.
- New pages or nav labels not defined in **`elk-site-sitemap.md`** without updating sitemap + `Header` + `Footer` in one PR.
- Copy written before page purpose and primary CTA are fixed in sitemap or PR scope.
- Leaving unrouted files, unused imports, or duplicate legacy routes after a change.

---

## 6. PR / review standard

Merge is blocked until all are true:

- Funnel role and primary CTA match **`elk-site-sitemap.md`** or the PR updates the sitemap.
- No duplicate registry patterns; new shared components are in **`elk-component-registry.md`**.
- Visuals match **`elk-site-rules.md`** (hero, sections, cards, CTAs).
- Mobile: readable hero, no horizontal scroll from ad hoc widths, usable nav and CTAs.
- One obvious primary action per viewport for CTA sections.
- No redundant or dead code for the touched surface.
- **`elk-build-checklist.md`** completed; evidence linked or pasted in the PR.

---

## 7. Immediate recommended cleanup pass

Run before large new page work. Fix in order: **nav → hero → primary CTA → dead code → spacing**.

| Audit | Action |
|-------|--------|
| Spacing / widths | Each routed page vs **`elk-site-rules.md`** (`py-*`, `px-*`, `max-w-*`). |
| Duplicated markup | Inline section shells and CTA strips → **`SiteSection`** / **`PrimaryCtaBlock`**. |
| Page structure | Missing **`SiteHero`**, wrong template order, long copy in hero. |
| Nav | **`Header.tsx`** + **`Footer.tsx`** + **`elk-site-sitemap.md`** aligned. |
| CTAs | Labels, targets (`/guest-experiences`, hashes), amber primary class only. |
| Dead weight | Unrouted files, unused components, superseded hero/video utilities not referenced by any route. |
