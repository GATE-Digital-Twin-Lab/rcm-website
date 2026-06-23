# GATE RCM — Design Specification

Design system for the **Reliable Computational Modelling (RCM)** research-group website.
Built to visually match the parent **GATE Institute** brand (gate-ai.eu).

**Build constraint:** plain HTML + CSS only. No framework, no build step. Every token below is a real value pulled from the live GATE brand unless explicitly marked **[ASSUMPTION]**. Implement verbatim.

**Source of truth:** the live GATE sites were inspected directly.
- `https://www.gate-ai.eu/` — custom WordPress theme `gate`, stylesheet `…/themes/gate/build/css/style.css`. Uses Montserrat + Bootstrap base; brand accent colors `#0d988c`, `#0e112a`, `#ed481b`, `#fd9600`.
- `https://new.gate-ai.eu/` (the current redesign) — Elementor "kit-10" global design tokens were extracted directly from the rendered CSS. **This is the primary reference** and is what the tokens below are based on.

---

## Aesthetic direction

Clean, technical, data-forward academic research. A deep-navy/teal foundation signals scientific rigor and trust, while a warm orange-to-amber accent adds energy and keeps the institute from feeling cold or corporate. The signature move is the **monospaced display type (Cascadia Code) for headings** paired with a neutral humanist sans (Roboto) for body — it reads as "computational / engineering" without being a terminal cliché. Generous whitespace, large rounded surfaces (8–32px radii), and very soft shadows keep it modern, airy, and confidently scientific.

---

## Color tokens

CSS custom properties. Declare on `:root`. Hex values are taken from the GATE Elementor global palette (`--e-global-color-*`) and the legacy theme.

```css
:root {
  /* ---- Brand core (confirmed from GATE globals) ---- */
  --color-primary:        #0F112A; /* deep navy — headings, primary text, dark sections */
  --color-primary-soft:   #2B3062; /* lighter navy — secondary dark surfaces, borders on dark */
  --color-secondary:      #ED481C; /* orange-red — primary CTA / strongest accent */
  --color-accent:         #0E988C; /* teal — links, secondary accent, icons */
  --color-accent-bright:  #1CCFC0; /* bright teal — hover state for accent/buttons */
  --color-gold:           #FD9600; /* amber/gold — tertiary accent, highlights, stats */
  --color-indigo:         #3538CD; /* indigo/blue — occasional accent, charts, tags */

  /* ---- Backgrounds & surfaces ---- */
  --color-bg:             #FFFFFF; /* page background */
  --color-bg-alt:         #FAFAFA; /* alternating section background */
  --color-surface:        #F8F8F8; /* cards / panels on white */
  --color-surface-2:      #F5F4F9; /* subtle lavender-grey panel */
  --color-surface-tint:   #EEF4FF; /* cool tint panel (blue) */
  --color-surface-teal:   #E7F6F5; /* teal tint panel (accent callouts) */

  /* ---- Text ---- */
  --color-text:           #0F112A; /* default body/heading text (= primary navy) */
  --color-text-body:      #464157; /* long-form body copy (slightly softer than navy) */
  --color-muted:          #595773; /* muted/secondary text, captions */
  --color-muted-2:        #7F7EA3; /* very muted — meta, placeholders */
  --color-text-invert:    #FFFFFF; /* text on dark / colored backgrounds */

  /* ---- Lines & borders ---- */
  --color-border:         #EAE8F3; /* default hairline border */
  --color-border-strong:  #D7D3E3; /* stronger divider */

  /* ---- Functional tints (from supporting palette) ---- */
  --color-info-bg:        #C7D7FE;
  --color-accent-bg:      #E7F6F5;

  /* ---- Focus ring ---- */
  --color-focus:          #3538CD; /* visible focus outline */
}
```

**Usage rules**
- Default text on white = `--color-text` (navy). Use `--color-text-body` for paragraph blocks longer than ~2 lines for slightly reduced contrast/eye strain.
- **Primary CTA** = `--color-secondary` (orange-red). **Accent/links/secondary CTA** = `--color-accent` (teal). Do not mix: orange = "do this now," teal = "navigate/learn more."
- Dark sections (footer, hero overlays) use `--color-primary` background with `--color-text-invert` text and `--color-accent-bright` for links.
- `--color-gold` is sparing: stat numbers, small highlights, the occasional underline. Never large fills.

---

## Typography

### Fonts & how to load them (no build step)

**Headings — Cascadia Code** (monospaced display, the GATE signature). Open-source (SIL OFL, Microsoft). It is **not** on Google Fonts, so self-host it. Download `CascadiaCode.woff2` (variable) or the static weights from the [official releases](https://github.com/microsoft/cascadia-code/releases), place in `/fonts/`, and declare `@font-face`. A jsDelivr CDN fallback link is given as a no-download option.

**Body — Roboto** (Google Fonts).

Put this in `<head>` **before** your stylesheet:

```html
<!-- Roboto via Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
```

Then in your CSS (self-host Cascadia Code — preferred):

```css
/* Place CascadiaCode-*.woff2 in /fonts/. Variable font recommended. */
@font-face {
  font-family: "Cascadia Code";
  src: url("/fonts/CascadiaCode.woff2") format("woff2-variations"),
       url("/fonts/CascadiaCode.woff2") format("woff2");
  font-weight: 200 700;
  font-style: normal;
  font-display: swap;
}
/* If you cannot self-host, this CDN serves Cascadia Code (verify availability):
   @import url("https://cdn.jsdelivr.net/npm/@fontsource/cascadia-code/index.css");
   Fallback chain below still applies. */
```

### Font stacks (use these exact variables)

```css
:root {
  /* Headings / display — mono, technical */
  --font-display: "Cascadia Code", ui-monospace, "Cascadia Mono",
                  "SFMono-Regular", "Roboto Mono", Menlo, Consolas, monospace;
  /* Body / UI */
  --font-body: "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI",
               "Helvetica Neue", Arial, sans-serif;
  /* Inline code / data / mono snippets (reuse display family) */
  --font-mono: "Cascadia Code", ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
}
```

> Fallback note: if Cascadia Code fails to load, headings degrade to the system monospace stack — the layout still holds because all heading sizes/line-heights are set explicitly below. **[ASSUMPTION]** the jsDelivr/@fontsource path exists; if unavailable, self-hosting (the primary instruction) is authoritative.

### Modular type scale

Sizes are taken directly from the GATE Elementor kit (desktop → tablet → mobile). `rem` assumes `:root { font-size: 16px; }`.

| Token | Element | Font | Weight | Desktop | Tablet (≤1024) | Mobile (≤620) | Line-height | Letter-spacing |
|---|---|---|---|---|---|---|---|---|
| `--fs-h1` | `h1` / hero | display | 600 | 56px (3.5rem) | 48px | 36px | 1.2 | -0.01em |
| `--fs-h2` | `h2` | display | 700 | 40px (2.5rem) | 36px | 30px | 1.2 | -0.01em |
| `--fs-h3` | `h3` | display | 500 | 30px (1.875rem) | 28px | 24px | 1.25 | 0 |
| `--fs-h4` | `h4` | display | 700 | 24px (1.5rem) | 20px | 18px | 1.4 | 0 |
| `--fs-eyebrow` | eyebrow/overline | mono | 600 | 14px (0.875rem) | 14px | 13px | 1.4 | **0.08em**, UPPERCASE |
| `--fs-lead` | intro paragraph | body | 400 | 20px (1.25rem) | 18px | 18px | 1.6 | 0 |
| `--fs-body` | `p`, default | body | 400 | 16px (1rem) | 16px | 16px | 1.6 | 0 |
| `--fs-small` | small / meta / caption | body | 400 | 14px (0.875rem) | 14px | 13px | 1.5 | 0 |
| `--fs-button` | buttons / nav | body | 500–600 | 16px | 16px | 16px | 1 | 0.01em |

```css
:root {
  --fs-h1: 3.5rem;   --lh-h1: 1.2;
  --fs-h2: 2.5rem;   --lh-h2: 1.2;
  --fs-h3: 1.875rem; --lh-h3: 1.25;
  --fs-h4: 1.5rem;   --lh-h4: 1.4;
  --fs-eyebrow: 0.875rem;
  --fs-lead: 1.25rem;
  --fs-body: 1rem;   --lh-body: 1.6;
  --fs-small: 0.875rem;
}
h1,h2,h3,h4 { font-family: var(--font-display); color: var(--color-primary); margin: 0 0 .5em; }
h1 { font-size: var(--fs-h1); line-height: var(--lh-h1); font-weight: 600; letter-spacing: -0.01em; }
h2 { font-size: var(--fs-h2); line-height: var(--lh-h2); font-weight: 700; letter-spacing: -0.01em; }
h3 { font-size: var(--fs-h3); line-height: var(--lh-h3); font-weight: 500; }
h4 { font-size: var(--fs-h4); line-height: var(--lh-h4); font-weight: 700; }
body { font-family: var(--font-body); font-size: var(--fs-body); line-height: var(--lh-body);
       color: var(--color-text-body); background: var(--color-bg); }
p { margin: 0 0 1rem; max-width: 68ch; }
.lead { font-size: var(--fs-lead); line-height: 1.6; color: var(--color-text); }
small, .small { font-size: var(--fs-small); }

/* Responsive heading steps (match GATE breakpoints) */
@media (max-width: 1024px){
  :root{ --fs-h1:3rem; --fs-h2:2.25rem; --fs-h3:1.75rem; --fs-h4:1.25rem; --fs-lead:1.125rem; }
}
@media (max-width: 620px){
  :root{ --fs-h1:2.25rem; --fs-h2:1.875rem; --fs-h3:1.5rem; --fs-h4:1.125rem; }
}
```

---

## Layout

```css
:root {
  /* Content width */
  --container-max: 1200px;   /* recommended for a focused research site
                                (GATE shell is 1440px; 1200 reads better for text). [ASSUMPTION] */
  --container-wide: 1440px;  /* full GATE shell width for hero/edge-to-edge bands */
  --gutter: 1.5rem;          /* horizontal page padding (mobile), 24px */
  --gutter-lg: 2rem;         /* horizontal page padding (≥768px), 32px */

  /* Spacing scale (8px base) */
  --space-1: 0.25rem;  /*  4px */
  --space-2: 0.5rem;   /*  8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-5: 1.5rem;   /* 24px */
  --space-6: 2rem;     /* 32px */
  --space-7: 3rem;     /* 48px */
  --space-8: 4rem;     /* 64px */
  --space-9: 6rem;     /* 96px */
  --space-10: 8rem;    /* 128px */

  /* Section vertical padding */
  --section-y: var(--space-9);        /* 96px desktop */
  --section-y-sm: var(--space-7);     /* 48px mobile  */

  /* Border-radius scale (from GATE: 8/16/24/32 dominant) */
  --radius-sm: 8px;    /* buttons, inputs, small chips */
  --radius-md: 16px;   /* cards, images (GATE images = 16px) */
  --radius-lg: 24px;   /* large panels, feature cards */
  --radius-xl: 32px;   /* hero blocks, pill containers */
  --radius-pill: 999px;/* tags, pill buttons */
  --radius-round: 50%; /* avatars, icon circles */

  /* Shadow scale (soft, low-alpha navy — GATE style) */
  --shadow-xs: 0 1px 2px rgba(10,13,18,0.05);
  --shadow-sm: 0 1px 2px rgba(10,13,18,0.05), 0 0 0 1px rgba(10,13,18,0.04);
  --shadow-md: 0 4px 16px -4px rgba(10,13,18,0.08);
  --shadow-lg: 0 12px 32px -8px rgba(10,13,18,0.12);
  --shadow-inset-line: inset 0 0 0 1px rgba(10,13,18,0.10); /* hairline ring on chips/buttons */
}

.container { width: 100%; max-width: var(--container-max); margin-inline: auto;
             padding-inline: var(--gutter); }
@media (min-width: 768px){ .container { padding-inline: var(--gutter-lg); } }
.container--wide { max-width: var(--container-wide); }

.section { padding-block: var(--section-y-sm); }
@media (min-width: 768px){ .section { padding-block: var(--section-y); } }
.section--alt { background: var(--color-bg-alt); }
.section--dark { background: var(--color-primary); color: var(--color-text-invert); }
.section--dark h1,.section--dark h2,.section--dark h3,.section--dark h4 { color: var(--color-text-invert); }
```

### Breakpoints

```css
/* mobile-first; these are the GATE-aligned breakpoints */
/* base: 0–619px   (phones)  */
/* @media (min-width: 620px)  small landscape / large phone */
/* @media (min-width: 768px)  tablet  */
/* @media (min-width: 1024px) desktop (GATE switches type here) */
/* @media (min-width: 1280px) large desktop */
```

Grid helper:
```css
.grid { display: grid; gap: var(--space-5); }
@media (min-width: 768px){ .grid--2 { grid-template-columns: repeat(2,1fr); }
                           .grid--3 { grid-template-columns: repeat(3,1fr); } }
@media (min-width: 1024px){ .grid--4 { grid-template-columns: repeat(4,1fr); } }
```

---

## Components

### Top nav / header — **sticky**

GATE keeps a clean horizontal bar; make it sticky with a subtle shadow on scroll. Logo left, links center/right, one orange CTA ("Let's collaborate" on GATE — RCM can use **"Contact"** or **"Join us"**). Add EN/BG slot if multilingual.

```css
.site-header {
  position: sticky; top: 0; z-index: 100;
  background: rgba(255,255,255,0.85); backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--color-border);
}
.site-header__inner { display: flex; align-items: center; justify-content: space-between;
  gap: var(--space-6); min-height: 72px; }
.site-header.is-scrolled { box-shadow: var(--shadow-sm); }   /* toggle .is-scrolled via tiny JS on scroll */
.nav { display: flex; gap: var(--space-5); align-items: center; }
.nav a { font-family: var(--font-body); font-weight: 500; font-size: 1rem;
  color: var(--color-text); text-decoration: none; padding: .5rem 0; position: relative; }
.nav a:hover, .nav a[aria-current="page"] { color: var(--color-accent); }
.nav a::after { content:""; position:absolute; left:0; bottom:-2px; height:2px; width:0;
  background: var(--color-accent); transition: width .2s ease; }
.nav a:hover::after, .nav a[aria-current="page"]::after { width:100%; }
/* Mobile: hamburger toggles a full-width panel below the bar (plain checkbox/JS). */
```
Logo height ~32–40px. Reference brand logo asset: `https://new.gate-ai.eu/wp-content/uploads/2025/10/GATE-logo-low-res.png` (use the supplied RCM logo lockup; keep GATE wordmark association).

### Hero

Left-aligned headline + lead + dual CTA. Optional right-side image with `--radius-xl`. May sit on `--color-bg` or a dark `--color-primary` band. GATE decorates heroes with faint dot-grid PNGs (orange/green/teal) — optional, low opacity.

```css
.hero { padding-block: var(--space-8) var(--space-9); }
.hero__eyebrow { /* see eyebrow component */ }
.hero h1 { max-width: 16ch; }
.hero__lead { font-size: var(--fs-lead); color: var(--color-muted); max-width: 56ch;
  margin-block: var(--space-4) var(--space-6); }
.hero__actions { display: flex; gap: var(--space-4); flex-wrap: wrap; }
.hero__media img { border-radius: var(--radius-xl); box-shadow: var(--shadow-lg); }
```

### Buttons

GATE confirmed states: hover background `#1CCFC0` (`--color-accent-bright`), white text, `1px` solid `--color-accent` border. Primary CTA uses the orange-red brand color.

```css
.btn { display: inline-flex; align-items: center; gap: .5rem;
  font-family: var(--font-body); font-weight: 600; font-size: 1rem; line-height: 1;
  padding: .875rem 1.5rem;            /* 14px / 24px */
  border-radius: var(--radius-sm);     /* 8px */
  border: 1px solid transparent; cursor: pointer; text-decoration: none;
  transition: background-color .2s ease, color .2s ease, border-color .2s ease, transform .15s ease, box-shadow .2s ease; }
.btn:focus-visible { outline: 2px solid var(--color-focus); outline-offset: 2px; }
.btn:active { transform: translateY(1px); }

/* Primary = orange-red brand CTA */
.btn--primary { background: var(--color-secondary); color: #fff;
  border-color: var(--color-secondary); box-shadow: var(--shadow-xs); }
.btn--primary:hover { background: #C73C16; border-color: #C73C16; }  /* darkened secondary */

/* Secondary = teal (GATE button) */
.btn--secondary { background: var(--color-accent); color: #fff; border-color: var(--color-accent); }
.btn--secondary:hover { background: var(--color-accent-bright); border-color: var(--color-accent); }

/* Ghost / outline */
.btn--ghost { background: transparent; color: var(--color-accent); border-color: var(--color-accent); }
.btn--ghost:hover { background: var(--color-surface-teal); }

/* Sizes */
.btn--sm { padding: .625rem 1.125rem; font-size: .9375rem; }
.btn--lg { padding: 1rem 2rem; font-size: 1.0625rem; }
```

### Cards (research topics / team / applications)

White surface, `--radius-lg`, hairline border, soft shadow that lifts on hover. Icon/eyebrow + title (display font) + text + link.

```css
.card { background: var(--color-bg); border: 1px solid var(--color-border);
  border-radius: var(--radius-lg); padding: var(--space-6);
  box-shadow: var(--shadow-sm);
  transition: box-shadow .25s ease, transform .25s ease, border-color .25s ease;
  display: flex; flex-direction: column; gap: var(--space-3); height: 100%; }
.card:hover { box-shadow: var(--shadow-md); transform: translateY(-4px);
  border-color: var(--color-border-strong); }
.card__title { font-family: var(--font-display); font-size: var(--fs-h4); font-weight: 700;
  color: var(--color-primary); }
.card__icon { width: 48px; height: 48px; display: grid; place-items: center;
  border-radius: var(--radius-md); background: var(--color-surface-teal); color: var(--color-accent); }
.card__text { color: var(--color-muted); font-size: 1rem; }
.card__link { margin-top: auto; }  /* uses .link style below */

/* Team card variant: square avatar with --radius-md or circular --radius-round */
.card--team img { border-radius: var(--radius-md); aspect-ratio: 1/1; object-fit: cover; width: 100%; }
.card--team .role { font-family: var(--font-mono); font-size: var(--fs-small);
  color: var(--color-accent); letter-spacing: .02em; }

/* Application/use-case card: image top (16px radius), content below */
.card--app { padding: 0; overflow: hidden; }
.card--app img { width: 100%; aspect-ratio: 16/9; object-fit: cover; }
.card--app .card__body { padding: var(--space-5); }
```

### Section headers & eyebrows

The eyebrow is the brand's most distinctive small element: **monospaced, uppercase, letter-spaced, teal or orange.**

```css
.eyebrow { display: inline-block; font-family: var(--font-mono); font-weight: 600;
  font-size: var(--fs-eyebrow); text-transform: uppercase; letter-spacing: .08em;
  color: var(--color-accent); margin-bottom: var(--space-3); }
.eyebrow--orange { color: var(--color-secondary); }
.section-header { max-width: 56ch; margin-bottom: var(--space-7); }
.section-header--center { margin-inline: auto; text-align: center; }
.section-header p { color: var(--color-muted); font-size: var(--fs-lead); }
/* Optional leading tick before eyebrow text for a "data" feel: */
.eyebrow::before { content: "// "; color: var(--color-accent-bright); }
```

### Links

```css
.link, .prose a { color: var(--color-accent); text-decoration: none;
  font-weight: 500; border-bottom: 1px solid transparent; transition: border-color .2s, color .2s; }
.link:hover, .prose a:hover { color: var(--color-accent-bright); border-bottom-color: currentColor; }
/* "Read more →" style CTA link */
.link--arrow { display: inline-flex; align-items: center; gap: .375rem; font-weight: 600; }
.link--arrow::after { content: "→"; transition: transform .2s ease; }
.link--arrow:hover::after { transform: translateX(3px); }
.section--dark .link { color: var(--color-accent-bright); }
```

### Footer

Dark navy band (`--color-primary`), multi-column link groups, logo + short blurb, EU co-funding logos row, fine print. GATE footer logos to mirror: `Co-fundedbytheEU.png`, `logo_pniidit_BG.png` (include if RCM is EU/nationally funded).

```css
.site-footer { background: var(--color-primary); color: var(--color-text-invert);
  padding-block: var(--space-8) var(--space-6); }
.site-footer a { color: #C9CBE0; text-decoration: none; }
.site-footer a:hover { color: var(--color-accent-bright); }
.site-footer__grid { display: grid; gap: var(--space-6);
  grid-template-columns: 1fr; }
@media (min-width: 768px){ .site-footer__grid { grid-template-columns: 1.5fr repeat(3,1fr); } }
.site-footer__col h4 { font-family: var(--font-mono); font-size: var(--fs-small);
  text-transform: uppercase; letter-spacing: .08em; color: var(--color-muted-2);
  margin-bottom: var(--space-3); }
.site-footer__bottom { border-top: 1px solid rgba(255,255,255,0.12);
  margin-top: var(--space-7); padding-top: var(--space-5);
  display: flex; flex-wrap: wrap; gap: var(--space-4);
  justify-content: space-between; font-size: var(--fs-small); color: var(--color-muted-2); }
.site-footer__funding img { height: 40px; filter: none; }
```

### Forms / inputs (contact, newsletter)

```css
.input, .textarea, .select { width: 100%; font-family: var(--font-body); font-size: 1rem;
  color: var(--color-text); background: var(--color-bg);
  border: 1px solid var(--color-border-strong); border-radius: var(--radius-sm);
  padding: .75rem 1rem; transition: border-color .2s, box-shadow .2s; }
.input:focus, .textarea:focus, .select:focus { outline: none; border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(14,152,140,0.18); }
.label { display: block; font-size: var(--fs-small); font-weight: 500;
  color: var(--color-text); margin-bottom: var(--space-2); }
```

### Tags / chips (research areas)

```css
.tag { display: inline-flex; align-items: center; font-family: var(--font-mono);
  font-size: .8125rem; letter-spacing: .02em; color: var(--color-accent);
  background: var(--color-surface-teal); border-radius: var(--radius-pill);
  padding: .25rem .75rem; }
.tag--gold { color: #8a5a00; background: #FFF4E0; }
.tag--indigo { color: var(--color-indigo); background: var(--color-surface-tint); }
```

### Stat / metric block (data-forward)

```css
.stat__num { font-family: var(--font-display); font-weight: 700; font-size: var(--fs-h1);
  color: var(--color-secondary); line-height: 1; }
.stat__label { font-family: var(--font-mono); font-size: var(--fs-small);
  text-transform: uppercase; letter-spacing: .06em; color: var(--color-muted); }
```

---

## Motion

Keep it subtle and fast. Respect reduced-motion.

```css
:root {
  --t-fast: .15s; --t-base: .2s; --t-slow: .35s;
  --ease: cubic-bezier(.4,0,.2,1);
}
```
- **Buttons:** 0.2s background/border color; `translateY(1px)` on `:active`.
- **Cards:** `translateY(-4px)` + shadow step on hover, 0.25s.
- **Links:** color + animated underline (width or border-bottom), 0.2s; arrow links nudge `translateX(3px)`.
- **Nav underline:** width 0→100%, 0.2s.
- **Header:** background blur always on; `.is-scrolled` adds shadow after ~10px scroll (tiny JS toggling a class — allowed, it's not a build step).
- **Reveal on scroll (optional):** fade + 12px rise via `IntersectionObserver`; keep ≤0.5s, opacity+transform only.
- **No** parallax, no large/bouncy easings, no continuous animation.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
  .card:hover, .link--arrow:hover::after, .hero__media img { transform: none !important; }
}
```

---

## Accessibility notes (build to these)

- Always render a visible `:focus-visible` ring (`--color-focus`, 2px, 2px offset).
- Body text on white uses `--color-text-body` (#464157) — passes AA. Muted `--color-muted` (#595773) is for short/secondary text only; do not use lighter `--color-muted-2` for body copy on white.
- Orange `--color-secondary` (#ED481C) on white is fine for ≥18px/bold and for button fills (white text on it passes AA at button sizes). Avoid #FD9600 gold text on white for body — use it only for large display numerals or on dark.
- All interactive elements ≥40px hit target on touch.

---

## Assumptions (guessed vs. confirmed)

**Confirmed (pulled directly from live GATE CSS / Elementor globals):**
- Brand colors: `#0F112A` (primary), `#ED481C` (secondary), `#0E988C` (accent), `#FD9600` (gold), plus `#1CCFC0`, `#3538CD`, `#2B3062`, the navy-grey text ramp (`#464157`/`#595773`/`#7F7EA3`), and surface tints (`#FAFAFA`/`#F8F8F8`/`#F5F4F9`/`#EAE8F3`/`#EEF4FF`/`#E7F6F5`). Legacy theme corroborates `#0d988c`/`#0e112a`/`#ed481b`/`#fd9600`.
- Heading font = **Cascadia Code** (self-hosted woff2 on GATE; H1 weight 600, H2 700, H3 500, H4 700). Body font = **Roboto** (all weights loaded). Red Hat Text loaded as a secondary fallback on GATE.
- Type sizes/line-heights (H1 56/48/36, H2 40/36/30, H3 30/28/24, H4 24/20/18, body 16, lh 1.2 headings / 1.4–1.6 body) — from the kit's responsive type variables.
- Container shell 1440px; default container side padding 1em.
- Border-radius vocabulary 8 / 16 / 24 / 32px (images = 16px); soft low-alpha navy shadows (e.g. `rgba(10,13,18,0.05)`, `0 4px 16px -4px #0A0D1214`).
- Button hover = `#1CCFC0` bg, white text, 1px `#0E988C` border; links colored `#0E988C`.
- Breakpoint where GATE re-steps typography = **1024px** (tablet); a secondary mobile step exists.
- Nav items present on GATE: About, Research, Business, Infrastructure, News and Media, Education, Contact; primary CTA "Let's collaborate"; EN/BG language switch.
- Logo asset reference: `…/uploads/2025/10/GATE-logo-low-res.png`; EU/national funding logos used in footer.

**Assumed / chosen by me (clearly flagged):**
- **[ASSUMPTION]** `--container-max: 1200px` for primary readable content. GATE's actual shell is 1440px (`--container-wide` provided for full-bleed bands); 1200 chosen because RCM is a smaller, text-heavy research-group site and 1200 yields better line lengths. Swap to 1440 if you want to mirror GATE exactly.
- **[ASSUMPTION]** The exact `:active`/darkened primary hover (`#C73C16`) is a computed darken of `#ED481C`; GATE's confirmed button hover applies to the teal/secondary button. Both are provided.
- **[ASSUMPTION]** Spacing scale (8px base, 4→128px) is a standard scale consistent with GATE's `1em`/`1.5em` widget spacing; exact GATE section paddings weren't all enumerated.
- **[ASSUMPTION]** Shadow values are reconstructed to match GATE's style/alpha (the inset hairline + soft drop shadows observed) but consolidated into a 4-step scale.
- **[ASSUMPTION]** Eyebrow treatment (mono, uppercase, `.08em`, optional `//` prefix) is my interpretation of the brand's mono-forward, data aesthetic — GATE uses Cascadia Code for headings/labels, but the precise eyebrow styling here is a design choice.
- **[ASSUMPTION]** Cascadia Code self-hosting is required (GATE self-hosts it); the jsDelivr/@fontsource CDN line is an unverified convenience fallback — self-host for production reliability.
- **[ASSUMPTION]** Header is specified **sticky with scroll shadow**; GATE's exact sticky behavior wasn't conclusively confirmed in the static HTML, but sticky is the modern, expected pattern and consistent with the kit. Tiny JS to toggle `.is-scrolled` is permitted (no build step).
- **[ASSUMPTION]** Tag/chip and stat-block color pairings (gold-on-cream, indigo-on-blue-tint) are derived from the confirmed palette but were composed by me.
- Tertiary text color `--color-text-body` (#464157) chosen for body over pure navy for comfort; both are brand-palette values.
