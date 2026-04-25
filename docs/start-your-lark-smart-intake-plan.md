# Start Your Lark Smart Intake Plan

## Purpose

Define one context-aware intake experience that adapts to user intent while keeping the flow simple, premium, and conversion-focused.

This page becomes the primary inquiry entry point for ELK Lark.

---

## 1) Route and Query Model

- Primary route: `/start-your-lark`
- Supported query param values:
  - `?type=wellness`
  - `?type=wedding`
  - `?type=group`
  - `?type=custom`

Behavior:
- If `type` is valid, initialize page state from query.
- If `type` is missing or invalid, load in "no type selected" state.

---

## 2) Entry Behavior and CTA Routing

Global entry:
- Header/nav/footer CTA -> `/start-your-lark`

Funnel page entries:
- Wellness CTA -> `/start-your-lark?type=wellness`
- Micro Weddings CTA -> `/start-your-lark?type=wedding`
- Group Getaways CTA -> `/start-your-lark?type=group`

Optional future mapping:
- "Need something custom?" CTA -> `/start-your-lark?type=custom`

---

## 3) No-Type Behavior (Guided Selector)

When no type is selected, show a simple selector near the top:
- Wellness Retreat
- Micro Wedding
- Group Getaway
- Custom / Not Sure

On selection:
- Update local selected type state.
- Optionally sync URL query param with history-safe navigation.
- Immediately update dynamic content and form fields below.

UX note:
- Keep selector compact and visual (button cards or segmented options), not a long questionnaire.

---

## 4) Dynamic Page Content by Type

These sections should adapt to selected type:
- Headline
- Intro copy
- Suggested add-ons
- Conditional form fields

Shared structure remains constant to avoid layout shifts:
- Hero/intake intro
- Type selector (if needed)
- Guided form
- Suggested add-ons
- Final submit CTA

---

## 5) Shared Form Fields (All Types)

Always collect:
- Name
- Email
- Phone
- Preferred dates
- Number of guests
- Notes / vision

Implementation note:
- Keep labels and validation rules consistent across all types.

---

## 6) Conditional Form Fields by Type

### Wellness (`type=wellness`)
- Retreat goal (reset, team wellness, mindfulness, other)
- Session interests (yoga, guided sessions, outdoor activities)
- Dietary focus / restrictions
- Facilitation needed? (yes/no)

### Wedding (`type=wedding`)
- Wedding date flexibility
- Ceremony style (outdoor, poolside, custom)
- Reception preference (meal style / evening vibe)
- Support needed (planning, floral, music, photo)

### Group (`type=group`)
- Group purpose (friends, family, golf, wine, mixed)
- Activity interests (golf, wine, beach, hiking, biking, pool)
- Food style preference (BBQ, casual, healthy, mixed)
- Planning support level (light suggestions vs full coordination)

### Custom (`type=custom`)
- Event type / occasion
- Desired vibe
- Must-have elements
- Planning support needed

Rule:
- Keep conditional fields short and decision-useful; avoid over-collecting.

---

## 7) Suggested Add-Ons (Filtered by Type)

Add-ons should be curated suggestions, not a catalog wall.

### Wellness suggestions
- Yoga session support
- Healthy meal planning
- Guided workshop setup
- Paddleboard / light outdoor activity planning

### Wedding suggestions
- Floral options and setup
- Music setup support
- Photo package coordination
- Custom dinner and dessert options

### Group suggestions
- BBQ and group dining options
- Wine/brewery/cidery tasting planning
- Golf day planning
- Beach/pool activity setup

### Custom suggestions
- Flexible planning support
- Activity shortlist curation
- Food and hosting coordination
- Local partner recommendations

Rule:
- Show only relevant suggestions for selected type.
- Keep quantity tight (recommended 3-6 visible options).

---

## 8) Design and UX Rules

Follow: `docs/elk-lark-design-rules.md`

Implementation constraints:
- Keep one page only (no separate form pages by type).
- Avoid clutter and excessive spacing.
- Reuse existing components/patterns where possible.
- Keep tone premium, warm, simple, and guided.
- Keep CTA focus on inquiry, not direct booking.
- Do not show every add-on to every user.

---

## 9) Analytics-Ready Tracking Notes

Event plan (GA4-ready naming can be finalized later):
- Track selected type
  - Example: `intake_type_selected` with `type`
- Track form starts
  - Example: `intake_form_started` with `type`
- Track form submits
  - Example: `intake_form_submitted` with `type`
- Track CTA source (later GA4 enhancement)
  - Capture source context such as header, footer, wellness, wedding, group

Data note:
- Preserve selected type in event payload and form submission metadata.

---

## 10) Implementation Sequence (Recommended)

1. Add `/start-your-lark` route and base page shell.
2. Add query param parsing and type state model.
3. Implement no-type selector and URL sync behavior.
4. Build shared form fields and validation.
5. Add conditional fields by type.
6. Add filtered suggested add-ons by type.
7. Wire CTA entry points from header/footer/funnel pages.
8. Add analytics event hooks (no-op wrappers acceptable initially).
9. QA all entry routes and type transitions.
