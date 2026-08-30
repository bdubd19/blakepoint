---
name: Blake Point House
description: A transparent quiet-season field guide for a furnished lakeside home — deep lake blue, misted mineral paper, ember accents, and hard-edged editorial geometry.
colors:
  lake: "#083848"
  lake-deep: "#062a38"
  ink: "#092939"
  paper: "#eef5f0"
  paper-2: "#e1eeeb"
  white: "#f7fbf8"
  orange: "#e85838"
  orange-deep: "#c83d22"
  orange-ink: "#b6351d"
  line: "rgba(8,56,72,.18)"
typography:
  display:
    fontFamily: "'Archivo Black', Impact, sans-serif"
    fontSize: "clamp(45px, 6vw, 88px)"
    fontWeight: 400
    lineHeight: 0.94
    letterSpacing: "-.04em"
  body:
    fontFamily: "'Manrope', Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "'Manrope', Arial, sans-serif"
    fontSize: "10px"
    fontWeight: 700
    letterSpacing: ".12em"
rounded:
  none: "0px"
spacing:
  section-shell: "min(1360px, calc(100% - 72px))"
  sm: "10px"
  md: "20px"
  lg: "38px"
  xl: "150px"
components:
  button-primary:
    backgroundColor: "{colors.white}"
    textColor: "{colors.orange-deep}"
    rounded: "{rounded.none}"
    padding: "17px 20px"
  button-primary-hover:
    backgroundColor: "{colors.paper-2}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    rounded: "{rounded.none}"
    padding: "15px 18px"
  nav-link-active:
    textColor: "{colors.orange}"
---

# Design System: Blake Point House

## Overview

**Creative North Star: "The Winter Observatory"**

Blake Point House presents itself as a field guide, not a listing: a documentary-photography survey of a real furnished house, framed by an MLS floor plan and read against the fall-through-spring calendar of the North Shuswap. The palette is drawn from the lake itself — a deep, almost-black lake blue as the dominant dark, a misted mineral-green paper as the dominant light — with a single ember-orange accent reserved for calls to action, numbering, and seasonal signal. Layout is hard-edged and editorial: square blocks, ruled dividers, numbered sections (01—31), and a strict two-font system (a blunt display slab over a clean humanist body) rather than soft, resort-brochure styling. The signature technical gesture is a restrained Three.js topographic field — thin contour lines and drifting ember particles behind the seasons section — that shifts hue from ember through frost to spring green as the visitor scrolls, gated off on small screens, reduced-motion, and save-data connections so the experience degrades to static ruled lines rather than breaking.

This is a Persuade-mode surface built to qualify, not hype: it must feel more visual, dynamic, and premium than a generic vacation-rental page while staying candid, calm, and residential. It explicitly rejects resort marketing, rounded/soft touches, and drop-shadow "app" chrome in favor of flat tonal layering and hard-edged blocks.

**Key Characteristics:**
- Two-tone dominant palette (deep lake blue / misted mineral paper) with a single ember-orange accent used sparingly for action and orientation.
- Flat, tonal, hard-edged blocks — no rounded corners, no drop shadows for elevation.
- Archivo Black display type set tight and negative-tracked; Manrope for everything readable.
- Documentary photography and Matterport-derived floor-plan geometry as the visual evidence base.
- A restrained, seasonally color-shifting Three.js topographic field as the one signature motion moment, hard-gated by viewport size, reduced motion, and save-data.

## Colors

The palette is a two-tone lake/paper system with one ember accent; there is no secondary or tertiary hue family.

### Primary
- **Ember Orange** (`#e85838`): the sole accent — CTAs, active nav link, section numerals, active filter/tab state, map markers, gallery-tile numerals.
- **Ember Deep** (`#c83d22`): pressed/hover state for orange surfaces (`.strip-cta`, form submit hover), and the deeper orange background of the inquiry-form panel.
- **Ember Ink** (`#b6351d`): darker text-weight variant of the accent, used for small labels/eyebrows over light paper (`.section-number`, `.strip-story span`).

### Neutral
- **Deep Lake** (`#083848`): dominant dark surface — hero rail iron, plan panel, active plan-tab, map marker border context, `theme-color` meta.
- **Lake Deep** (`#062a38`): darkest surface, used for the gallery section background and the inquiry-copy panel; also the color-scheme reference in the season field's line material.
- **Ink** (`#092939`): base text color on light paper.
- **Misted Paper** (`#eef5f0`): primary light background — body, hero, section shells.
- **Paper Secondary** (`#e1eeeb`): secondary light surface — `strip-facts` tile background, plan-notes panel.
- **Editorial White** (`#f7fbf8`): near-white used for text-on-dark and the lightest surfaces.
- **Hairline** (`rgba(8,56,72,.18)`): the single divider/border color used throughout for ruled lines between blocks.

### Named Rules
**The One-Accent Rule.** Ember orange is the only saturated hue in the system; every other surface is lake-blue or mineral-paper. If a new element needs emphasis, it earns orange — nothing else.

## Typography

**Display Font:** Archivo Black (with Impact, sans-serif fallback)
**Body Font:** Manrope (with Arial, sans-serif fallback)

**Character:** A blunt, all-caps-leaning slab display paired with a clean, generous humanist body — confident editorial headlines over calm, readable prose. Display type is always set at line-height ~0.9–1 with tight/negative letter-spacing; body copy is set loose (line-height 1.5–1.75) for legibility against dense information blocks.

### Hierarchy
- **Display / Hero** (400, `clamp(48px,5.1vw,78px)`, line-height .9, letter-spacing -.04em): the hero H1 and largest section statements.
- **Headline** (400, `clamp(45px,6vw,88px)`, line-height .94, letter-spacing -.04em): section H2s (`## Three distinct chapters`, `## All 31 photographs`, etc.).
- **Title** (400, `clamp(19px–42px)` depending on block, line-height ~1): card/tile headers — season names, strip-story headline, plan-tab labels, place names.
- **Body** (400, 12–15px, line-height 1.55–1.75): descriptive paragraphs, season copy, fit-grid list items.
- **Label** (700, 8–10px, letter-spacing .1–.18em, uppercase): eyebrows, nav links, buttons, table headers (`dt`), section numerals context text.

### Named Rules
**The Uppercase Label Rule.** Every functional label — nav, eyebrows, buttons, filters, form field labels — is 700-weight, 8–10px, uppercase, with .1em+ letter-spacing. Never mix in sentence-case labels next to this system.

## Layout

The page is a stack of full-bleed sections, each opening a `.section-shell` container capped at `min(1360px, calc(100% - 72px))` and centered. Most content sections use an 80px numbered-margin column (`.section-number`) beside a wide content column, echoing a field-notebook margin. The hero is the one true grid exception: a 96px icon rail + fluid content column at the html/body level, height-capped at `min(100vh, 66.6667vw)` with a 720px floor, so it always resolves to a fixed aspect rather than stretching on ultra-wide monitors.

Two responsive breakpoints govern the whole system:
- **1100px**: the hero rail narrows to 74px, section margin columns compress from 80px to 55px, the gallery grid drops from 6 to 4 columns, and the plan explorer's tab column narrows.
- **760px**: the layout collapses to a single stacked column throughout — the hero rail is hidden entirely, the sticky mobile header and hamburger menu take over navigation, all internal grids (season, fit, plan-explorer, gallery-head) go to `display:block`, the gallery grid drops to 2 columns, and every interactive control enforces a 44px minimum touch target.

Section rhythm is generous and consistent: 135–150px vertical section padding on desktop, collapsing to ~76px on mobile. Internal grids are separated by 1px hairline rules (`--line`) rather than gutters with visible cards, keeping the layout feeling like a ruled ledger.

## Elevation & Depth

The system is flat by design — no box-shadows are used for elevation anywhere in the interface. Depth is conveyed entirely through tonal layering: alternating lake-blue and mineral-paper full-bleed sections, semi-transparent overlays over photography (`linear-gradient` scrims on the hero picture and gallery-stage caption), and hairline rules that separate content blocks without lifting them. The two exceptions are functional, not decorative: the Leaflet map popup and the custom map pin use soft shadows (`0 10px 30px rgba(6,42,56,.25)`, `0 4px 14px rgba(6,42,56,.28)`) purely to read over variable map imagery.

### Named Rules
**The Flat-By-Default Rule.** Surfaces sit at the same visual depth at rest; separation comes from color contrast and hairline rules, never a shadow. Shadows are reserved for the one case where content sits over unpredictable imagery (the map).

## Shapes

Every corner in the system is square — there is no `border-radius` anywhere on structural elements, buttons, cards, images, or form fields (`.bp-map-marker` explicitly forces `border-radius:0` even on the third-party Leaflet marker). Borders are 1px hairlines in `--line` or, on dark surfaces, low-opacity white (`rgba(255,255,255,.2–.6)`), used to rule off grids and underline form inputs rather than box them. The one recurring accent shape is a small square/rectangle icon badge (the "BP" logo mark, footer mark) rendered as a bordered square with centered display type — never a circle.

## Components

Buttons, tabs, and form fields all share the hard-edged, label-driven character described above: square, high-contrast, uppercase-labeled, with color (not shape) carrying state.

### Buttons
- **Shape:** square corners throughout (0px radius), no exceptions.
- **Primary (light-on-dark, e.g. inquiry submit):** white fill, `var(--orange-deep)` text, 1px white border, `padding:17px 20px`, 10px/700-weight/.12em label type, flex layout with label left and affordance right.
- **Primary (dark-on-light, e.g. hero CTA):** transparent fill, 1px `rgba(255,255,255,.55)` border, white text, orange-colored trailing glyph (`.hero-button span`).
- **Ghost (copy-inquiry):** transparent background, white text, no border — used as the secondary action beside the filled submit button.
- **Hover/Focus:** primary buttons retain their high-contrast tonal fill; global `:focus-visible` uses a 3px solid orange outline with 4px offset everywhere, not just on buttons.

### Cards / Containers
- **Corner Style:** square (0px) throughout.
- **Background:** alternates lake-blue and paper depending on section; `strip-facts` tiles use `--paper-2`.
- **Shadow Strategy:** none — see Elevation & Depth.
- **Border:** 1px hairline dividers between grid cells, not around the container.
- **Internal Padding:** loosely scaled by block importance, roughly 18–32px on desktop, tightening to 14–22px on mobile.

### Inputs / Fields
- **Style:** no border box; a single `border-bottom:1px solid rgba(255,255,255,.6)` underline on a transparent background, white text, 14px type (bumped to 16px on mobile to prevent iOS zoom).
- **Focus:** underline brightens to solid white; no glow or ring beyond the underline shift.
- **Labels:** always the uppercase 9px/700-weight label style, stacked above the field.

### Navigation
- **Style:** flat text links, 10px/700-weight/uppercase/.12em letter-spacing, no underline at rest.
- **Active/last item:** the final primary-nav link (`Interest`) is permanently colored orange to always foreground the conversion path.
- **Mobile:** collapses to a bordered square "Menu" button (min 58×44px) that reveals a full-bleed lake-blue dropdown grid of 44px-minimum touch targets.

### Seasonal Topographic Field (signature component)
A canvas-based Three.js contour field behind the "Quiet Season" section: 28 undulating horizontal line rows plus ~180 drifting ember particles, colored by a fall→winter→spring lerp (ember → frost → spring green) driven by scroll progress through the section, with subtle camera parallax on pointer move. It is lazy-loaded only when the section enters the viewport, and is fully gated off (falling back to a static ruled-line background, `.season-static-lines`) when `prefers-reduced-motion: reduce` matches, viewport width is ≤900px, `navigator.connection.saveData` is true, or WebGL initialization throws.

## Do's and Don'ts

### Do:
- **Do** keep every corner square (0px radius) — buttons, cards, images, form fields, even third-party map markers.
- **Do** reserve ember orange (`#e85838`) for action, orientation, and seasonal signal only; every other surface stays lake-blue or mineral-paper.
- **Do** set uppercase functional labels (nav, buttons, eyebrows, form labels) at 700-weight, 8–10px, with ≥.1em letter-spacing.
- **Do** gate any new motion-heavy feature behind the same triad this system already uses: `prefers-reduced-motion`, a ≤900px viewport check, and `navigator.connection.saveData`.
- **Do** convey depth with tonal layering and hairline rules, not shadows, except where content sits over unpredictable photography (e.g. the map).

### Don't:
- **Don't** add box-shadow elevation to cards, buttons, or panels — this system is flat by rule.
- **Don't** introduce a second saturated accent color; the palette is deliberately two-tone-plus-one-accent.
- **Don't** round any corners, including on embedded third-party widgets (Leaflet markers/popups already get overridden to square).
- **Don't** let the Three.js seasonal field run unconditionally — it must stay lazy-loaded and gated, never a blocking or always-on animation.
