# Winterization Plan — ELK Lark

## Goals
- Seasonal **Winter vs Summer** UX with a toggle, auto-default Sep–Mar = Winter.
- Theming, content, and assets swap by season without changing routes.
- Zero regression to Summer site.

## Success Criteria
- Fresh load in private window defaults correctly by calendar month.
- Toggle switches instantly and persists for the session.
- Home + Experiences (Outlaw/Restore/Strategy) reflect winter variants.
- Lighthouse ≥ 90 for Perf/SEO/Best Practices/Accessibility on Home.

## Build Steps (tick as you go)
- [ ] **S0: Baseline** — capture current Lighthouse scores (mobile/desktop).
- [ ] **S1: Season Core**
  - [ ] `src/lib/season.ts` (`getDefaultSeason`)
  - [ ] `src/state/SeasonContext.tsx` (`SeasonProvider`)
  - [ ] `src/components/SeasonToggle.tsx` (header switch)
- [ ] **S2: Theme Tokens**
  - [ ] Add CSS vars + `.season-winter` / `.season-summer` on root container.
  - [ ] Convert main colors to vars: `bg-[var(--bg)]`, `text-[var(--fg)]`, `border-[var(--accent)]`.
- [ ] **S3: Home (Winter)**
  - [ ] Swap hero to winter image + overlay
  - [ ] Adjust headline & CTA copy for winter
- [ ] **S4: Experiences**
  - [ ] Outlaw: add winter blurb + 3 winter images
  - [ ] Restore: add winter blurb + 3 winter images
  - [ ] Strategy: add winter blurb + 2 indoor images
- [ ] **S5: SEO**
  - [ ] Seasonal OG image for Home; tuned meta description when winter default
- [ ] **S6: Analytics**
  - [ ] GA4 event `season_select` with `season` param
- [ ] **S7: QA**
  - [ ] Keyboard/ARIA for toggle (`role="switch"`, `aria-checked`)
  - [ ] Contrast AA both themes
  - [ ] Lighthouse ≥ 90
- [ ] **S8: Deploy** — Vercel preview + prod

## Snippets to apply after copying files
### 1) Wrap your app with the provider
In `src/main.tsx` **or** `src/App.tsx`:
```tsx
import { SeasonProvider } from "./state/SeasonContext";

// around your root component:
<SeasonProvider>
  <App />
</SeasonProvider>
```

### 2) Add the toggle to your header/nav
```tsx
import SeasonToggle from "./components/SeasonToggle";

// place in your header
<SeasonToggle />
```

### 3) Add CSS variables (global stylesheet)
Add to your global CSS (e.g. `src/index.css` or `src/styles.css`):
```css
:root {
  --bg: #0b1b2b;
  --fg: #e6f0ff;
  --accent: #79c0ff;
}
.season-summer {
  --bg: #fffdf7;
  --fg: #0f172a;
  --accent: #10b981;
}
.season-winter {
  --bg: #0b1b2b;
  --fg: #e6f0ff;
  --accent: #79c0ff;
}
/* Example mappings */
body { background: var(--bg); color: var(--fg); }
```

Then use Tailwind arbitrary values where needed:
```html
<div class="bg-[var(--bg)] text-[var(--fg)]">
  <button class="border px-3 py-1 text-[var(--fg)] hover:text-[var(--accent)]">...</button>
</div>
```

