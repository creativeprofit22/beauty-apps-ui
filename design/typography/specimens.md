# Typography Specification

## Font Families

### Space Grotesk — Display
- **Role:** Headings, brand elements, section titles
- **Why:** Geometric sans with personality. The alternate stylistic sets (`ss01`, `ss02`) give it distinctive character without sacrificing legibility. Feels modern-premium without being generic.
- **Weights used:** 400 (normal), 500 (medium), 700 (bold)
- **Variable font:** `Space Grotesk Variable` for smooth weight interpolation
- **CSS:** `var(--font-family-display)` / `.font-display`
- **Feature settings:** `"ss01" on, "ss02" on`

### Inter — Body
- **Role:** UI copy, form labels, descriptions, navigation
- **Why:** Designed specifically for screens. Excellent x-height, clear at small sizes, wide language support. The contextual alternates improve readability of common letter pairs.
- **Weights used:** 400 (regular), 500 (medium), 600 (semibold)
- **Variable font:** `Inter Variable` for arbitrary weight values
- **CSS:** `var(--font-family-body)` / `.font-body`
- **Feature settings:** `"cv01" on, "cv02" on, "ss01" on`

### Fira Code — Data
- **Role:** Metrics, numbers, IDs, prices, stat values, loyalty points
- **Why:** Monospace with ligatures. `tabular-nums` ensures columns of numbers align perfectly. The slashed zero (`"zero" on`) prevents confusion with the letter O in IDs.
- **Weights used:** 400 (regular), 500 (medium)
- **CSS:** `var(--font-family-data)` / `.font-data`
- **Feature settings:** `"zero" on, "ss01" on`
- **Numeric variant:** `font-variant-numeric: tabular-nums`

---

## Type Scale — Minor Third (1.200)

Each step is 1.2x the previous. This ratio produces a gentle, harmonious progression suited to UI rather than editorial.

| Token             | Size      | Use case                             |
|-------------------|-----------|--------------------------------------|
| `--font-size-2xs` | 0.694rem  | Fine print, legal text               |
| `--font-size-xs`  | 0.833rem  | Captions, timestamps                 |
| `--font-size-sm`  | 0.889rem  | Secondary labels, helper text        |
| `--font-size-base`| 1rem      | Body text (16px)                     |
| `--font-size-md`  | 1.125rem  | Emphasized body, card titles         |
| `--font-size-lg`  | 1.2rem    | Sub-headings                         |
| `--font-size-xl`  | 1.44rem   | Section headings                     |
| `--font-size-2xl` | 1.728rem  | Page headings                        |
| `--font-size-3xl` | 2.074rem  | Hero subheadings                     |
| `--font-size-4xl` | 2.488rem  | Hero headings                        |
| `--font-size-5xl` | 2.986rem  | Display / splash                     |

---

## Metric Display Scale

Separate from the text scale — these are for large numerical displays (stat cards, dashboards, point counters).

| Token                  | Size    | Use case                     |
|------------------------|---------|------------------------------|
| `--font-size-metric-sm`| 1.5rem  | Inline stat values           |
| `--font-size-metric-md`| 2rem    | Card stat values             |
| `--font-size-metric-lg`| 2.5rem  | Featured metrics             |
| `--font-size-metric-xl`| 3.5rem  | Hero metrics, point counters |

Always pair metric sizes with `.font-data` (Fira Code) and `tabular-nums`.

---

## Line Heights

| Token                   | Value  | Usage                         |
|-------------------------|--------|-------------------------------|
| `--line-height-tight`   | 1.1    | Display headings              |
| `--line-height-snug`    | 1.25   | Card titles, compact text     |
| `--line-height-normal`  | 1.5    | Body text (default)           |
| `--line-height-relaxed` | 1.625  | Long-form reading             |

---

## Letter Spacing

| Token                     | Value     | Usage                        |
|---------------------------|-----------|------------------------------|
| `--letter-spacing-tight`  | -0.025em  | Large display text           |
| `--letter-spacing-normal` | 0em       | Body text (default)          |
| `--letter-spacing-wide`   | 0.025em   | Button labels                |
| `--letter-spacing-wider`  | 0.05em    | Uppercase labels, badges     |
| `--letter-spacing-widest` | 0.1em     | All-caps section headers     |

---

## When to Use Each Font

| Context                  | Font           | Size token          | Weight |
|--------------------------|----------------|---------------------|--------|
| Page title               | Space Grotesk  | `--font-size-2xl`+  | 700    |
| Section heading          | Space Grotesk  | `--font-size-xl`    | 600    |
| Card title               | Space Grotesk  | `--font-size-md`    | 500    |
| Body text                | Inter          | `--font-size-base`  | 400    |
| Button label             | Inter          | `--font-size-sm`    | 500    |
| Form label               | Inter          | `--font-size-sm`    | 500    |
| Helper text              | Inter          | `--font-size-xs`    | 400    |
| Stat card value          | Fira Code      | `--font-size-metric-md` | 500 |
| Price                    | Fira Code      | `--font-size-lg`    | 400    |
| Loyalty points           | Fira Code      | `--font-size-metric-lg` | 500 |
| ID / reference           | Fira Code      | `--font-size-xs`    | 400    |
| Timestamp                | Inter          | `--font-size-xs`    | 400    |

---

## Gradient Text Treatment

Applied via `.text-gradient` + a gradient variant class:

- `.text-gradient-primary` — `linear-gradient(135deg, --primary, --secondary)` (gold to rose)
- `.text-gradient-warm` — `linear-gradient(135deg, --primary, --accent)` (gold to sage)

Uses `background-clip: text` with `-webkit-text-fill-color: transparent`. Best on headings at `--font-size-2xl` and above.

---

## Tabular Nums

The `.tabular-nums` utility class applies `font-variant-numeric: tabular-nums` to any font. Use it on:
- Price columns in tables
- Timer displays
- Any vertically-aligned number lists

The `.font-data` class includes `tabular-nums` automatically.
