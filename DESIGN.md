---
name: Blake Point House — Lakeside Journal
description: A warm, image-led editorial rental experience for fall, winter and spring in Magna Bay.
colors:
  forest: "#19352e"
  forest-deep: "#132a24"
  ivory: "#f4efe5"
  ivory-deep: "#e8dfd1"
  terracotta: "#b95f3f"
  terracotta-deep: "#9f4930"
  white: "#fffaf3"
  line: "rgba(25,53,46,.22)"
typography:
  display:
    fontFamily: "'DM Serif Display', Georgia, serif"
    fontWeight: 400
    lineHeight: 0.94
    letterSpacing: "-.035em"
  body:
    fontFamily: "'Manrope', Arial, sans-serif"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "'Manrope', Arial, sans-serif"
    fontSize: "9px"
    fontWeight: 700
    letterSpacing: ".14em"
rounded:
  none: "0px"
---

# Design System: Blake Point House — Lakeside Journal

## Creative North Star

**Lakeside Journal** treats Blake Point House as a warm editorial home story rather than a resort listing or an MLS sheet. The first viewport is photographic: one large scene and two supporting scenes create an immediate sense of warmth, scale and atmosphere. The complete gallery follows early. The floor plan remains important evidence, but appears later—after the visitor has felt the house and understood its fall-through-spring setting.

The design is selective without being evasive. All supplied property photographs remain available, repeated exposures are labeled honestly, and facts stay tied to the source material. The tone is calm, candid and residential.

## Principles

1. **Photography leads.** Real property images occupy the first viewport and the gallery appears before the floor plan.
2. **Warm, not rustic-kitsch.** Ivory paper, forest green and restrained terracotta create warmth without cabin clichés.
3. **Editorial hierarchy.** High-contrast serif display type carries the emotional proposition; Manrope carries every functional label and fact.
4. **One controlled motion signature.** The three-image opening cross-fades slowly and remains directly controllable. Motion pauses for reduced-motion users.
5. **Privacy before spectacle.** Surnames, faces/minors, access information, licence plates and identifying reflections are removed, blurred or omitted before publication.
6. **No invented seasonality.** Fall, winter and spring are described in copy and real area context; photographs are not recolored or composited to fake a season.

## Palette

- **Forest (`#19352e`)**: primary ink, map pins, active controls and dark panels.
- **Forest Deep (`#132a24`)**: gallery and inquiry dark ground.
- **Ivory (`#f4efe5`)**: primary page paper and navigation.
- **Ivory Deep (`#e8dfd1`)**: secondary section ground and subtle grouping.
- **Terracotta (`#b95f3f`)**: emphasis, active state, links and the italic hero phrase.
- **Terracotta Deep (`#9f4930`)**: hover/pressed state and high-contrast form panel.
- **White (`#fffaf3`)**: type over photographs and dark surfaces.

Terracotta is the only saturated accent. Map imagery and photography provide the remaining color.

## Typography

- **Display:** DM Serif Display, normal or italic, `clamp(42px, 6vw, 86px)`, line-height `.9–1`, slight negative tracking.
- **Body:** Manrope, 13–16px, line-height `1.55–1.75`.
- **Labels and controls:** Manrope 700, 8–10px, uppercase, `letter-spacing: .1em–.17em`.

Italic serif is reserved for one emotional phrase at a time—never for paragraphs or UI labels.

## Layout

### First viewport

- 58/42 asymmetric two-column image layout on desktop.
- Main photograph spans the full left field below the 92px header.
- Two stacked supporting photographs occupy the right field.
- No floor plan, pricing table or application form appears in the hero.
- The main image displays a counter and a three-step vertical progress rail.

### Content order

1. Image-led opening
2. Complete property gallery
3. Fall / winter / spring story
4. MLS floor-plan explorer
5. North Shuswap map and practical services
6. Residential fit and restrictions
7. Pricing, brochure and expression of interest

### Responsive

At 760px and below, the header becomes sticky, the main image becomes a 78svh portrait-like field, and the two supporting photographs stack below it. All controls maintain a 44px minimum target. The gallery uses two columns, the plan opens full-screen on tap, and the map place list expands naturally rather than becoming a hidden internal scroller.

## Components

### Dynamic Image Story

- Three real, privacy-cleared property images.
- 7.5-second cross-fade on capable devices.
- Direct progress controls and supporting-image buttons.
- Auto-advance disabled under `prefers-reduced-motion: reduce`.
- Images are selected for warmth and marketing value, not simply recency.

### Gallery

- Large active image with previous/next and full-screen controls.
- Filtered room groups and a complete numbered grid.
- Duplicate exposures disclosed rather than disguised as additional rooms.
- Lazy thumbnails; hero and first gallery frame load eagerly.

### Floor Plan

- Appears after gallery and seasonal story.
- Three level tabs with area summaries and room labels.
- Original PDF download and full-screen plan viewer.
- Every dimension remains labeled approximate.

### Area Guide

- Approximate Blake Point/Magna Bay marker; exact house location withheld.
- Practical services and natural attractions use sourced names and current-condition links.
- Appointment-only health care and seasonal park/trail limitations are stated plainly.

### Inquiry

- Working price range shown before the form.
- Required versus optional fields are explicit.
- The page prepares an email and offers a copy-to-clipboard fallback; it does not pretend to store or submit data.

## Do / Don’t

### Do

- Lead with the best privacy-cleared kitchen, living, outdoor-gathering or beach/lake imagery when available.
- Keep the gallery complete and candid.
- Blur or omit readable family names and access/location identifiers.
- Use large imagery, serif hierarchy and generous editorial margins.
- Keep the floor plan lower in the story.

### Don’t

- Lead with the floor plan.
- Use a generic vacation-rental card grid in the hero.
- Fake snow, fall leaves, sunsets or lake views.
- Publish images containing minors, private names, access instructions or identifying reflections without remediation and approval.
- Introduce rounded app-style cards, gradients unrelated to image legibility, or multiple accent colors.
