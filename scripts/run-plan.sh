#!/bin/bash
set -eo pipefail

PROJECT_DIR="/mnt/e/Projects/spa-ui-moodboard"
LOG_DIR="$PROJECT_DIR/.claude/logs"
CHECK_CMD="bun run typecheck"
FEATURE_NAME="UI Refinement — Alive, Not SaaS"
TOTAL_CHUNKS=6

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Defaults
START_CHUNK=2
SKIP_FINAL_CHECK=false

# Parse args
while [[ $# -gt 0 ]]; do
  case $1 in
    --start) START_CHUNK="$2"; shift 2 ;;
    --skip-final-check) SKIP_FINAL_CHECK=true; shift ;;
    *) echo "Unknown option: $1"; exit 1 ;;
  esac
done

mkdir -p "$LOG_DIR"

echo -e "${BLUE}══════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  Plan Executor - $FEATURE_NAME${NC}"
echo -e "${BLUE}  $TOTAL_CHUNKS chunks, starting from $START_CHUNK${NC}"
echo -e "${BLUE}  (Chunk 1 Typography Overhaul already complete)${NC}"
echo -e "${BLUE}══════════════════════════════════════════════════════${NC}"
echo ""

# Context bridge — captures what previous chunk produced
PREV_CONTEXT=""

capture_context() {
  cd "$PROJECT_DIR"
  PREV_CONTEXT=$(git diff --stat HEAD 2>/dev/null || echo "")
}

# Quality gate
run_quality_gate() {
  local num=$1
  local gate_log="$LOG_DIR/gate-${num}.log"

  echo -e "${CYAN}  Running quality gate...${NC}"
  cd "$PROJECT_DIR"

  if eval "$CHECK_CMD" > "$gate_log" 2>&1; then
    echo -e "${GREEN}  ✓ Quality gate passed${NC}"
    return 0
  else
    echo -e "${YELLOW}  ⚠ Quality gate failed — spawning fix pass...${NC}"
    local errors
    errors=$(cat "$gate_log")
    local fix_log="$LOG_DIR/fix-${num}.log"

    claude --dangerously-skip-permissions --max-turns 20 \
      -p "$(cat <<FIXPROMPT
Fix quality check errors in spa-ui-moodboard at $PROJECT_DIR

Errors:
\`\`\`
$errors
\`\`\`

Rules:
- Read each file mentioned in the errors
- Fix errors with minimal changes — do NOT refactor or improve surrounding code
- Re-run: $CHECK_CMD
- Loop until clean
- Do NOT ask questions
FIXPROMPT
)" < /dev/null 2>&1 | tee "$fix_log"

    if eval "$CHECK_CMD" > "$gate_log" 2>&1; then
      echo -e "${GREEN}  ✓ Fix pass succeeded${NC}"
      return 0
    else
      echo -e "${RED}  ✗ Still failing — continuing anyway${NC}"
      return 1
    fi
  fi
}

# ══════════════════════════════════════════════════════
# CHUNK 2: Color Refinements
# ══════════════════════════════════════════════════════

run_chunk_2() {
  local log="$LOG_DIR/chunk-2.log"
  echo -e "${YELLOW}▶ Chunk 2/$TOTAL_CHUNKS: Color Refinements — Chroma Pullback + Warm Shadows + Dark Mode${NC}"

  local context_section=""
  if [[ -n "$PREV_CONTEXT" ]]; then
    context_section="

### Previous Chunk Changes
\`\`\`
$PREV_CONTEXT
\`\`\`
Do NOT modify these files unless they're in YOUR file lists."
  fi

  cd "$PROJECT_DIR"
  claude --dangerously-skip-permissions --max-turns 50 \
    -p "$(cat <<'CHUNK_PROMPT'
spa-ui-moodboard at /mnt/e/Projects/spa-ui-moodboard
Stack: Next.js 16, React 19, Tailwind CSS 4.2, GSAP 3.14, Bun runtime, TypeScript 5.9
Check: bun run typecheck

## Chunk 2/6: Color Refinements — Chroma Pullback + Warm Shadows + Dark Mode

**Read these files first** (do NOT explore beyond this list):
- `src/styles/tokens.css` — current :root and .dark color tokens
- `skins/spa/skin.css` — spa skin light + dark overrides
- `skins/nail-salon/skin.css` — nail salon light + dark overrides
- `design/refinement-spec.md` — Section 2 (Color Refinements) for target values

**Modify:**
- `src/styles/tokens.css` — verify/update :root and .dark palette values against spec targets
- `skins/spa/skin.css` — verify/update spa-specific palette, warm shadows, dark mode candlelit surfaces
- `skins/nail-salon/skin.css` — verify/update lacquer red primary, ballet pink secondary, chrome tokens, rose-tinted shadows

**What to Build:**
Compare current token values against refinement spec Section 2 targets. Fix any drift:
- Spa primary: champagne nude oklch(0.82/0.06/72), secondary dusty rose (0.70/0.08/18), accent warm sage (0.62/0.06/148)
- Warm mauve (--mauve) and terracotta (--terra) accent tokens
- Nude surface tints (--surface-warm-1/2/3)
- Foil tokens (--foil-light/mid/dark)
- Text warm ink (0.15/0.02/60), not pure black
- ALL shadows warm-tinted to match skin hue (champagne for spa, rose-red for nail salon)
- Dark mode: candlelit surfaces (hue 55 for spa, hue 20 for nail), warm cream text, glow-based card elevation
- Nail salon: primary oklch(0.50/0.19/20), secondary ballet pink, rose-tinted shadows
- If values already match spec, report "already aligned" and move on

**Rules:**
- Read ONLY the files listed above. Do NOT explore the codebase.
- Implement ONLY what's described. No extras, no refactoring.
- After implementing: bun run typecheck
- Fix ALL errors before finishing.
- Do NOT ask questions.

**Gate:** `bun run typecheck` passes. Color tokens match spec values.
CHUNK_PROMPT
)$context_section" < /dev/null 2>&1 | tee "$log"
}

# ══════════════════════════════════════════════════════
# CHUNK 3: Visual Texture & Depth
# ══════════════════════════════════════════════════════

run_chunk_3() {
  local log="$LOG_DIR/chunk-3.log"
  echo -e "${YELLOW}▶ Chunk 3/$TOTAL_CHUNKS: Visual Texture & Depth — Page Backgrounds, Card Highlights, Noise, Opal${NC}"

  local context_section=""
  if [[ -n "$PREV_CONTEXT" ]]; then
    context_section="

### Previous Chunk Changes
\`\`\`
$PREV_CONTEXT
\`\`\`
Do NOT modify these files unless they're in YOUR file lists."
  fi

  cd "$PROJECT_DIR"
  claude --dangerously-skip-permissions --max-turns 50 \
    -p "$(cat <<'CHUNK_PROMPT'
spa-ui-moodboard at /mnt/e/Projects/spa-ui-moodboard
Stack: Next.js 16, React 19, Tailwind CSS 4.2, GSAP 3.14, Bun runtime, TypeScript 5.9
Check: bun run typecheck

## Chunk 3/6: Visual Texture & Depth — Page Backgrounds, Card Highlights, Noise, Opal Glow

**Read these files first** (do NOT explore beyond this list):
- `src/styles/base.css` — surface-textured, surface-opal classes
- `src/styles/tokens.css` — --page-bg, --elevation-card-highlight, --noise-opacity
- `skins/spa/skin.css` — spa --page-bg gradient
- `skins/nail-salon/skin.css` — nail salon --page-bg gradient
- `skins/barber/skin.css` — barber --page-bg
- `skins/tattoo/skin.css` — tattoo --page-bg
- `design/refinement-spec.md` — Section 3 (Visual Texture & Depth)

**Modify:**
- `src/styles/tokens.css` — verify --elevation-card-highlight has inset top-edge, verify --page-bg radial gradients
- `src/styles/base.css` — verify surface-textured (SVG noise ::after), surface-opal (inner glow ::before), body uses --page-bg
- `skins/spa/skin.css` — verify warm light pooling gradient + dark warm glow
- `skins/nail-salon/skin.css` — verify chromatic shimmer gradient
- `skins/barber/skin.css` — verify subtle cool gradient, --noise-opacity: 0
- `skins/tattoo/skin.css` — verify flat --page-bg, --noise-opacity: 0

**What to Build:**
Compare implementations against spec Section 3:
- Page background: radial light pooling for spa (warm from top + rose wash), chromatic shimmer for nail salon, subtle cool for barber, flat for tattoo
- Card top-edge highlight: `inset 0 1px 0 oklch(1 0 0 / 0.65)` in --elevation-card-highlight
- SVG noise texture: surface-textured with ::after, base64 feTurbulence SVG, opacity via --noise-opacity. Spa 0.035, nail 0.03, barber/tattoo 0
- Opal glow: surface-opal with ::before radial gradient + inset box-shadow
- If already matching spec, report "already aligned"

**Rules:**
- Read ONLY the files listed above. Do NOT explore the codebase.
- Implement ONLY what's described. No extras, no refactoring.
- After implementing: bun run typecheck
- Fix ALL errors before finishing.
- Do NOT ask questions.

**Gate:** `bun run typecheck` passes. Visual texture classes present and functional.
CHUNK_PROMPT
)$context_section" < /dev/null 2>&1 | tee "$log"
}

# ══════════════════════════════════════════════════════
# CHUNK 4: Animations & Easing
# ══════════════════════════════════════════════════════

run_chunk_4() {
  local log="$LOG_DIR/chunk-4.log"
  echo -e "${YELLOW}▶ Chunk 4/$TOTAL_CHUNKS: Animations & Easing — Keyframes, Skeleton Pulse, Input Focus, Nav Feedback${NC}"

  local context_section=""
  if [[ -n "$PREV_CONTEXT" ]]; then
    context_section="

### Previous Chunk Changes
\`\`\`
$PREV_CONTEXT
\`\`\`
Do NOT modify these files unless they're in YOUR file lists."
  fi

  cd "$PROJECT_DIR"
  claude --dangerously-skip-permissions --max-turns 50 \
    -p "$(cat <<'CHUNK_PROMPT'
spa-ui-moodboard at /mnt/e/Projects/spa-ui-moodboard
Stack: Next.js 16, React 19, Tailwind CSS 4.2, GSAP 3.14, Bun runtime, TypeScript 5.9
Check: bun run typecheck

## Chunk 4/6: Animations & Easing — Keyframes, Skeleton Pulse, Input Focus, Nav Feedback

**Read these files first** (do NOT explore beyond this list):
- `src/styles/effects.css` — existing keyframes and easing curves
- `src/styles/base.css` — focus-visible, input reset, tap-highlight
- `src/components/feedback/skeleton.tsx` — current skeleton implementation
- `src/components/layout/showcase-section.tsx` — scroll-triggered entrance animation
- `src/components/navigation/bottom-nav.tsx` — bottom nav tap feedback
- `src/components/primitives/input.tsx` — input focus styles
- `design/refinement-spec.md` — Section 4 (Animations & Easing)

**Modify:**
- `src/styles/effects.css` — verify keyframes: gentle-arrive (y:12 + blur:1px), soft-breathe (opacity+scale 3.5s), spa-skeleton (breathing 1.8s), petal-fall, ripple-warm (380ms). Verify easing: --ease-bloom (0.22,1,0.36,1), --ease-drift (0.5,0,0.5,1)
- `src/styles/base.css` — verify input focus: outline:none + border-color:var(--primary) + warm primary halo box-shadow. Verify tap-highlight warm color
- `src/components/feedback/skeleton.tsx` — verify spa/nail skins use spa-skeleton breathing pulse (NOT shimmer)
- `src/components/layout/showcase-section.tsx` — verify entrance: y:12, filter:blur(1px), no skewX, power2.out ease, clearProps:filter
- `src/components/navigation/bottom-nav.tsx` — verify: spring scale(1.15) on tap, always-visible labels, primary/grey active/inactive

**What to Build:**
Compare against spec Section 4. Fix drift:
- Easing curves: bloom and drift present in :root
- Keyframes: all 5 new keyframes present with correct values
- Input focus: warm primary halo, NO blue browser ring
- Skeleton: breathing pulse for warm skins, shimmer for cold skins
- ShowcaseSection: gentle entrance without skew
- Bottom nav: spring tap + always-visible labels
- Performance: will-change only during animation, reduced-motion respected
- If already matching, report "already aligned"

**Rules:**
- Read ONLY the files listed above. Do NOT explore the codebase.
- Implement ONLY what's described. No extras, no refactoring.
- After implementing: bun run typecheck
- Fix ALL errors before finishing.
- Do NOT ask questions.

**Gate:** `bun run typecheck` passes. Animations match spec targets.
CHUNK_PROMPT
)$context_section" < /dev/null 2>&1 | tee "$log"
}

# ══════════════════════════════════════════════════════
# CHUNK 5: Decorative Elements
# ══════════════════════════════════════════════════════

run_chunk_5() {
  local log="$LOG_DIR/chunk-5.log"
  echo -e "${YELLOW}▶ Chunk 5/$TOTAL_CHUNKS: Decorative Elements — Botanical Accents + Petal Fall${NC}"

  local context_section=""
  if [[ -n "$PREV_CONTEXT" ]]; then
    context_section="

### Previous Chunk Changes
\`\`\`
$PREV_CONTEXT
\`\`\`
Do NOT modify these files unless they're in YOUR file lists."
  fi

  cd "$PROJECT_DIR"
  claude --dangerously-skip-permissions --max-turns 50 \
    -p "$(cat <<'CHUNK_PROMPT'
spa-ui-moodboard at /mnt/e/Projects/spa-ui-moodboard
Stack: Next.js 16, React 19, Tailwind CSS 4.2, GSAP 3.14, Bun runtime, TypeScript 5.9
Check: bun run typecheck

## Chunk 5/6: Decorative Elements — Botanical Accents + Petal Fall

**Read these files first** (do NOT explore beyond this list):
- `src/components/decorative/floral-accent.tsx` — existing floral accent SVG
- `src/components/decorative/petal-fall.tsx` — existing petal fall component
- `skins/spa/config.ts` — enableBotanicalAccents, petalColors, celebrationStyle
- `skins/nail-salon/config.ts` — enableBotanicalAccents, petalColors
- `skins/barber/config.ts` — enableBotanicalAccents (should be false)
- `skins/tattoo/config.ts` — enableBotanicalAccents (should be false)
- `design/refinement-spec.md` — Section 5 (Decorative Elements)

**Modify:**
- `src/components/decorative/floral-accent.tsx` — verify: single-path SVG, stroke-only (no fill), currentColor, stroke-width 0.75px, strokeLinecap round, opacity 0.15-0.25
- `src/components/decorative/petal-fall.tsx` — verify: 4-6 petals MAX (not 50), petal 6x10px, border-radius 50% 0 50% 0, staggered delays, skin palette colors
- `skins/spa/config.ts` — verify enableBotanicalAccents: true, celebrationStyle: "petals"
- `skins/barber/config.ts` — verify enableBotanicalAccents: false, celebrationStyle: "confetti"
- `skins/tattoo/config.ts` — verify enableBotanicalAccents: false, celebrationStyle: "confetti"

**What to Build:**
Compare decorative implementations against spec Section 5:
- FloralAccent: minimal stroke SVG, gated by enableBotanicalAccents config
- PetalFall: CSS-only, 4-6 petals, petal-fall keyframe, skin palette colors
- Spa/nail: botanicals enabled, celebration = petals
- Barber/tattoo: botanicals disabled, celebration = confetti
- Philosophy: ONE accent per viewport. Seasoning, not the dish.
- If already matching, report "already aligned"

**Rules:**
- Read ONLY the files listed above. Do NOT explore the codebase.
- Implement ONLY what's described. No extras, no refactoring.
- After implementing: bun run typecheck
- Fix ALL errors before finishing.
- Do NOT ask questions.

**Gate:** `bun run typecheck` passes. Decorative components match spec constraints.
CHUNK_PROMPT
)$context_section" < /dev/null 2>&1 | tee "$log"
}

# ══════════════════════════════════════════════════════
# CHUNK 6: Component Refinements
# ══════════════════════════════════════════════════════

run_chunk_6() {
  local log="$LOG_DIR/chunk-6.log"
  echo -e "${YELLOW}▶ Chunk 6/$TOTAL_CHUNKS: Component Refinements — Buttons, Cards, Inputs, Sidebar, Nav, Booking, Stats${NC}"

  local context_section=""
  if [[ -n "$PREV_CONTEXT" ]]; then
    context_section="

### Previous Chunk Changes
\`\`\`
$PREV_CONTEXT
\`\`\`
Do NOT modify these files unless they're in YOUR file lists."
  fi

  cd "$PROJECT_DIR"
  claude --dangerously-skip-permissions --max-turns 50 \
    -p "$(cat <<'CHUNK_PROMPT'
spa-ui-moodboard at /mnt/e/Projects/spa-ui-moodboard
Stack: Next.js 16, React 19, Tailwind CSS 4.2, GSAP 3.14, Bun runtime, TypeScript 5.9
Check: bun run typecheck

## Chunk 6/6: Component Refinements — Buttons, Cards, Inputs, Sidebar, Bottom Nav, Booking Tray, Stats

**Read these files first** (do NOT explore beyond this list):
- `src/components/primitives/button.tsx` — button press shadow, text treatment
- `src/components/primitives/card.tsx` — card styling, top-edge highlight
- `src/components/primitives/input.tsx` — input focus glow, background
- `src/components/navigation/sidebar.tsx` — sidebar gradient, active item
- `src/components/navigation/nav-item.tsx` — nav item active state
- `src/components/navigation/bottom-nav.tsx` — bottom nav labels, tap feedback
- `src/components/forms/booking-tray.tsx` — progress indicator, step transitions
- `src/components/data-display/stat-card.tsx` — data display warm ink
- `src/components/data-display/loyalty-card.tsx` — editorial treatment
- `src/components/engagement/stamp-card.tsx` — stamp pulse timing
- `src/components/engagement/scratch-card.tsx` — specular flash on reveal
- `design/refinement-spec.md` — Sections 6 (Component Refinements) + 7 (Mobile)

**Modify:**
- `src/components/primitives/button.tsx` — verify: shadow compresses on press (translateY 1px not 2px), text-btn class for uppercase + 0.06em tracking + 0.8125rem
- `src/components/primitives/card.tsx` — verify: top-edge highlight inset in shadow stack
- `src/components/primitives/input.tsx` — verify: warm focus glow (primary halo, not blue), background var(--surface-warm-2)
- `src/components/navigation/sidebar.tsx` — verify: faint warm gradient bg, active 3px left accent bar with 25% inset, section labels wide-tracked caps
- `src/components/navigation/bottom-nav.tsx` — verify: always-visible labels, active primary + weight 600, inactive warm grey oklch(0.55 0.02 72), spring scale tap
- `src/components/forms/booking-tray.tsx` — verify: thin line progress (not dots), primary color 400ms ease-out, step slides from right 320ms
- `src/components/data-display/stat-card.tsx` — verify: warm ink text, skin palette chart colors
- `src/components/data-display/loyalty-card.tsx` — verify: tier name display serif, botanical watermark 15% opacity
- `src/components/engagement/stamp-card.tsx` — verify: stamp pulse 280ms (not 200ms)
- `src/components/engagement/scratch-card.tsx` — verify: warm specular flash (ripple-warm, champagne gold, 400ms)

**What to Build:**
Compare component implementations against spec Sections 6+7. Fix drift:
- Buttons: shadow compress, text-btn treatment
- Cards: inset top-edge highlight
- Inputs: warm focus halo, warm surface bg
- Sidebar: warm gradient, 3px left accent bar, caps labels
- Bottom nav: always-visible labels, spring tap, primary/grey
- Booking tray: line progress, slide-from-right transitions
- Stats: warm ink, skin palette, rounded bar caps
- Loyalty: display serif tier, botanical watermark
- Mobile: scroll-behavior auto, overscroll-behavior contain
- If already matching, report "already aligned"

**Rules:**
- Read ONLY the files listed above. Do NOT explore the codebase.
- Implement ONLY what's described. No extras, no refactoring.
- After implementing: bun run typecheck
- Fix ALL errors before finishing.
- Do NOT ask questions.

**Gate:** `bun run typecheck` passes. Components match spec targets.
CHUNK_PROMPT
)$context_section" < /dev/null 2>&1 | tee "$log"
}

# ══════════════════════════════════════════════════════
# MAIN LOOP
# ══════════════════════════════════════════════════════

CHUNK_FUNCTIONS=(
  "" run_chunk_2 run_chunk_3 run_chunk_4 run_chunk_5 run_chunk_6
)
CHUNK_NAMES=(
  "Typography Overhaul (DONE)"
  "Color Refinements"
  "Visual Texture & Depth"
  "Animations & Easing"
  "Decorative Elements"
  "Component Refinements"
)

for i in "${!CHUNK_FUNCTIONS[@]}"; do
  num=$((i + 1))

  if [[ "$num" -lt "$START_CHUNK" ]]; then
    echo -e "${YELLOW}  Skipping chunk $num: ${CHUNK_NAMES[$i]}${NC}"
    continue
  fi

  if [[ -z "${CHUNK_FUNCTIONS[$i]}" ]]; then
    echo -e "${GREEN}  ✓ Chunk $num already complete: ${CHUNK_NAMES[$i]}${NC}"
    continue
  fi

  # Run the chunk
  ${CHUNK_FUNCTIONS[$i]}

  # Quality gate
  run_quality_gate "$num"

  # Capture context for next chunk
  capture_context

  echo ""
done

echo -e "${GREEN}══════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  All chunks complete!${NC}"
echo -e "${GREEN}══════════════════════════════════════════════════════${NC}"

if [[ "$SKIP_FINAL_CHECK" != "true" ]]; then
  echo -e "${BLUE}Running final quality checks...${NC}"
  cd "$PROJECT_DIR"
  if eval "$CHECK_CMD"; then
    echo -e "${GREEN}✓ All checks passed${NC}"
  else
    echo -e "${RED}✗ Final checks failed — fix before committing${NC}"
    exit 1
  fi
fi

echo ""
echo -e "${GREEN}Done! Review changes: git diff${NC}"
