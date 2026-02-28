# Color Palette Specification

All colors use **oklch** for perceptual uniformity — equal lightness steps look equally different to the human eye, unlike HSL.

## Spa Skin — Light Mode

### Surfaces

| Token               | Value                    | Role                        |
|---------------------|--------------------------|-----------------------------|
| `--surface-base`    | `oklch(0.985 0.005 85)`  | Page background             |
| `--surface-raised`  | `oklch(0.995 0.003 85)`  | Cards, elevated panels      |
| `--surface-overlay` | `oklch(1.0 0 0)`         | Modals, popovers            |
| `--surface-sunken`  | `oklch(0.965 0.008 85)`  | Input wells, recessed areas |
| `--surface-interactive`       | `oklch(0.975 0.006 85)` | Clickable surface resting   |
| `--surface-interactive-hover` | `oklch(0.955 0.01 85)`  | Clickable surface hover     |

All surfaces carry hue 85 (warm yellow) at very low chroma — just enough to feel warm without reading as tinted.

### Brand Colors

| Token               | Value                    | Description      |
|----------------------|--------------------------|------------------|
| `--primary`          | `oklch(0.76 0.12 85)`   | Warm gold        |
| `--primary-hover`    | `oklch(0.70 0.14 85)`   | Darkened on hover|
| `--primary-muted`    | `oklch(0.92 0.04 85)`   | Backgrounds, tags|
| `--secondary`        | `oklch(0.68 0.12 12)`   | Rose             |
| `--secondary-hover`  | `oklch(0.62 0.14 12)`   | Darkened on hover|
| `--secondary-muted`  | `oklch(0.92 0.04 12)`   | Backgrounds, tags|
| `--accent`           | `oklch(0.65 0.08 155)`  | Sage green       |
| `--accent-hover`     | `oklch(0.59 0.10 155)`  | Darkened on hover|
| `--accent-muted`     | `oklch(0.92 0.03 155)`  | Backgrounds, tags|

### Semantic Colors

| Token             | Value                    | Usage              |
|-------------------|--------------------------|--------------------|
| `--success`       | `oklch(0.62 0.14 145)`  | Confirmations      |
| `--success-muted` | `oklch(0.92 0.04 145)`  | Success backgrounds |
| `--warning`       | `oklch(0.78 0.14 75)`   | Caution states     |
| `--warning-muted` | `oklch(0.94 0.04 75)`   | Warning backgrounds |
| `--error`         | `oklch(0.58 0.18 25)`   | Destructive/errors |
| `--error-muted`   | `oklch(0.92 0.05 25)`   | Error backgrounds  |
| `--info`          | `oklch(0.62 0.12 245)`  | Informational      |
| `--info-muted`    | `oklch(0.92 0.04 245)`  | Info backgrounds   |

### Tier Colors

| Token                | Value                    | Description       |
|----------------------|--------------------------|-------------------|
| `--tier-bronze`      | `oklch(0.60 0.10 55)`   | Bronze tier       |
| `--tier-silver`      | `oklch(0.72 0.02 265)`  | Silver tier       |
| `--tier-gold`        | `oklch(0.76 0.12 85)`   | Gold tier         |
| `--tier-black`       | `oklch(0.25 0.01 60)`   | Black/VIP tier    |
| `--tier-*-muted`     | Lightness ~0.90, chroma ~0.04 | Badge backgrounds |

### Text

| Token              | Value                    | Usage                      |
|--------------------|--------------------------|----------------------------|
| `--text-primary`   | `oklch(0.22 0.02 60)`   | Body text, headings        |
| `--text-secondary` | `oklch(0.42 0.02 60)`   | Descriptions, labels       |
| `--text-tertiary`  | `oklch(0.58 0.015 60)`  | Captions, timestamps       |
| `--text-inverse`   | `oklch(0.98 0.005 85)`  | Text on dark backgrounds   |
| `--text-on-accent` | `oklch(0.99 0 0)`       | Text on accent/primary bg  |

### Borders

| Token             | Value                    | Usage               |
|-------------------|--------------------------|----------------------|
| `--border`        | `oklch(0.88 0.01 85)`   | Default borders     |
| `--border-muted`  | `oklch(0.92 0.005 85)`  | Subtle dividers     |
| `--border-accent` | `oklch(0.76 0.12 85)`   | Active/focus borders|

---

## Spa Skin — Dark Mode

### Surfaces

| Token               | Value                    | Notes                       |
|---------------------|--------------------------|-----------------------------|
| `--surface-base`    | `oklch(0.18 0.01 60)`   | Hue shifts to 60 (warmer)   |
| `--surface-raised`  | `oklch(0.22 0.012 60)`  | Slightly lighter than base  |
| `--surface-overlay` | `oklch(0.26 0.014 60)`  | Modals pop from background  |
| `--surface-sunken`  | `oklch(0.14 0.008 60)`  | Deepest level               |
| `--surface-interactive`       | `oklch(0.24 0.012 60)` | Resting                    |
| `--surface-interactive-hover` | `oklch(0.28 0.015 60)` | Hover                      |

### Brand Colors (boosted for dark)

| Token              | Light                    | Dark                        | Strategy              |
|--------------------|--------------------------|-----------------------------|-----------------------|
| `--primary`        | `oklch(0.76 0.12 85)`   | `oklch(0.82 0.10 85)`      | +0.06 lightness       |
| `--secondary`      | `oklch(0.68 0.12 12)`   | `oklch(0.74 0.10 12)`      | +0.06 lightness       |
| `--accent`         | `oklch(0.65 0.08 155)`  | `oklch(0.72 0.07 155)`     | +0.07 lightness       |

Muted variants invert — light mode uses high-lightness (~0.92), dark mode uses low-lightness (~0.28-0.30).

### Text (dark)

| Token              | Value                    |
|--------------------|--------------------------|
| `--text-primary`   | `oklch(0.93 0.008 85)`  |
| `--text-secondary` | `oklch(0.72 0.01 85)`   |
| `--text-tertiary`  | `oklch(0.55 0.01 85)`   |
| `--text-inverse`   | `oklch(0.22 0.02 60)`   |
| `--text-on-accent` | `oklch(0.15 0.01 60)`   |

---

## Glow Token Formulas

Glows use the corresponding color at 25% opacity (light) or 35% opacity (dark) with a larger blur radius in dark mode.

| Mode  | Pattern                                      |
|-------|----------------------------------------------|
| Light | `0 0 12px <color> / 0.25`                    |
| Dark  | `0 0 16px <color> / 0.35`                    |

Glows are applied via `box-shadow` on stat cards, progress bar tips, and dark-mode CTA buttons.

---

## Surface Hierarchy

```
Sunken (deepest)  →  Base (page)  →  Raised (cards)  →  Overlay (modals)
     ↓                   ↓               ↓                    ↓
 Input wells        Page bg         Card panels         Popover/modal
```

Each step is ~0.02 lightness apart in light mode, ~0.04 apart in dark mode (because dark surfaces need more contrast to be distinguishable).

---

## Skin Override Architecture

Skins override tokens via `[data-skin="<name>"]` attribute selectors:

```css
:root[data-skin="spa"]  { --primary: oklch(0.76 0.12 85); }
.dark[data-skin="spa"]  { --primary: oklch(0.82 0.10 85); }
:root[data-skin="barber"] { --primary: oklch(0.45 0.08 55); }
```

The `.dark[data-skin]` selector wins specificity over `.dark` alone, ensuring skin overrides always apply in both modes.
