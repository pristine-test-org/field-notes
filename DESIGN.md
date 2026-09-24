---
name: Field Notes
description: A field notebook on screen. Warm paper, green-black ink, one moss accent and an ochre highlight for dates and weather. Soft cards on paper, a seven-step type scale, serif headings over a system sans.

# Every value below mirrors assets/css/tokens.css verbatim. That file is the
# source of truth; this frontmatter is the portable export. If a token changes
# there, change it here in the same commit.
colors:
  # Paper and ink
  paper: "#f6f3ea"            # page ground
  paper-raised: "#fffdf7"     # cards, header, form fields
  paper-sunk: "#ece7da"       # footer, hover wells
  ink: "#1c2620"              # headings and body
  ink-muted: "#3f4a42"        # secondary copy
  ink-faint: "#5d665e"        # meta, captions, labels
  rule: "#d8d1bf"             # hairlines and card borders
  rule-strong: "#b3aa94"      # input borders, emphasised rules

  # Moss: the one accent
  accent: "#2f5a3c"           # buttons, links, active nav, map pins
  accent-deep: "#1f3f29"      # hover, small accent text
  accent-tint: "#e2ebdf"      # tag and role backgrounds, map ground
  on-accent: "#fffdf7"        # text on accent fills

  # Ochre: dates, weather and highlights
  ochre: "#8a5210"            # eyebrows, entry dates, map legend numbers
  ochre-tint: "#f5e7cc"       # saved-entries panel, notices

  # Feedback
  danger: "#9b3526"
  danger-tint: "#f7e1dc"

typography:
  families:
    serif: "'Iowan Old Style', 'Palatino Linotype', Palatino, Charter, Georgia, serif"
    sans: "ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif"
    mono: "ui-monospace, 'SF Mono', Menlo, Consolas, monospace"
  scale:
    # Seven steps at a 16px root. Every font-size in a component is one of these.
    xs: "0.75rem"      # labels, tags, meta
    sm: "0.875rem"     # buttons, captions, card summaries, form labels
    base: "1rem"       # default body copy
    md: "1.125rem"     # lead paragraphs, entry body
    lg: "1.375rem"     # h3, card titles, brand
    xl: "1.875rem"     # h2, section and desk titles
    2xl: "2.75rem"     # h1, one per page
  display:
    fontFamily: "{typography.families.serif}"
    fontSize: "2.75rem"
    fontWeight: 600
    letterSpacing: "-0.015em"
    lineHeight: 1.15
  title:
    fontFamily: "{typography.families.serif}"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.15
  body:
    fontFamily: "{typography.families.sans}"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "{typography.families.sans}"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.12em"
    textTransform: uppercase

rounded:
  sm: "4px"
  md: "8px"
  lg: "14px"
  pill: "999px"

spacing:
  "1": "0.25rem"
  "2": "0.5rem"
  "3": "0.75rem"
  "4": "1rem"
  "5": "1.5rem"
  "6": "2rem"
  "7": "3rem"
  "8": "4rem"

components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    typography: "{typography.scale.sm}"
    rounded: "{rounded.pill}"
    padding: "0.75rem 1.5rem"
  button-primary-hover:
    backgroundColor: "{colors.accent-deep}"
    textColor: "{colors.on-accent}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.accent}"
    borderColor: "{colors.accent}"
    rounded: "{rounded.pill}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    borderColor: "{colors.rule-strong}"
    rounded: "{rounded.pill}"
  entry-card:
    backgroundColor: "{colors.paper-raised}"
    borderColor: "{colors.rule}"
    rounded: "{rounded.md}"
    padding: "1rem"
  tag-pill:
    backgroundColor: "{colors.accent-tint}"
    textColor: "{colors.accent-deep}"
    typography: "{typography.scale.xs}"
    rounded: "{rounded.sm}"
  input-text:
    backgroundColor: "{colors.paper-raised}"
    textColor: "{colors.ink}"
    borderColor: "{colors.rule-strong}"
    rounded: "{rounded.sm}"
    padding: "0.75rem"
  nav-link-active:
    textColor: "{colors.ink}"
    borderColor: "{colors.accent}"
---

# Field Notes design system

## Principles

**A notebook, not a dashboard.** Warm paper, green-black ink and plenty of
margin. Entries read like pages from a field notebook: a date, a place, the
weather, then the notes.

**One accent, one highlight.** Moss (`accent`) is for action: buttons, links,
the active nav item, map pins. Ochre (`ochre`) is for time and conditions:
eyebrows, entry dates, legend numbers. Nothing else gets colour.

**Soft cards on paper.** Entries and panels sit on `paper-raised` with a 1px
`rule` border, `rounded.md` and a faint `shadow-card`. No gradients, no heavy
shadows, no nested cards.

**Legible first.** Body copy is `base` (16px) at line-height 1.6 and a 64ch
measure. Entry bodies step up to `md`. Nothing is smaller than `xs` (12px),
and `xs` is for labels, tags and meta, never sentences.

## Type

Serif headings (`serif` stack, weight 600) over a system sans for everything
else. Coordinates and admin dates use `mono`.

- **Display · h1** — `2xl`, serif, line-height 1.15, -0.015em. One per page.
- **Title · h2** — `xl`, serif.
- **h3 and card titles** — `lg`, serif.
- **Lead** — `md`, sans, `ink-muted`.
- **Body** — `base`, sans, line-height 1.6.
- **Small** — `sm`, sans. Buttons, card summaries, form labels.
- **Label** — `xs`, sans, weight 600, uppercase, letter-spacing 0.12em.

Seven steps is the whole scale. Do not add an eighth; pick the nearest step
and change weight or colour instead.

## Colour

Ink has three tiers: `ink` for headings and body, `ink-muted` for secondary
copy, `ink-faint` for meta. All three clear 4.5:1 on `paper` and on
`paper-raised`. `rule` and `rule-strong` are for borders only and never carry
text.

Text on an `accent` fill is always `on-accent`. Small accent-coloured text on
a tint uses `accent-deep`.

## Spacing and radius

An eight-step spacing scale from `--space-1` (0.25rem) to `--space-8`
(4rem). Page sections are separated by `--space-7` or `--space-8`; card
grids use `--space-5` gutters; inside a component use `--space-4` or less.
Radii: `sm` for tags, inputs and notices; `md` for cards and panels; `lg` for
the login card and the map; `pill` for buttons and desk tabs.

## Components

All components live in `components/` and are auto-imported. Each has its own
`<style scoped>` block that reads tokens only.

- **AppButton** — `AppButton.vue`, three variants (primary, secondary,
  ghost) and two sizes (md, sm). Renders a `NuxtLink` when given `to`. Used
  in the header, on the landing page, entry detail, login, about and the
  editor desk.
- **EntryCard** — `EntryCard.vue`. Meta line (date · place), serif title,
  summary at `sm`, tag pills. The whole card is the link target.
- **TagPill** — `TagPill.vue`. `#tag` on `accent-tint`.
- **SavedEntriesPanel** — `SavedEntriesPanel.vue`. Readers only, on
  `/entries`. `ochre-tint` panel listing saved entries.
- **MapPanel** — `MapPanel.vue`. A gridded placeholder with numbered pins
  projected from coordinates, and a legend. No map tiles or external API.
- **PageHeader**, **FormField**, **SiteHeader**, **SiteFooter** — page
  furniture.

## Do and do not

**Do** read every colour, size, space and radius from `tokens.css`. **Do**
keep one accented action per group. **Do** keep focus rings visible (the
global `:focus-visible` ring is 2px `accent` with a 3px paper gap).

**Do not** hard-code a hex value, font size or radius in a component. **Do
not** add a font size outside the seven steps. **Do not** put text on
`rule` colours. **Do not** use colour alone to carry meaning.
