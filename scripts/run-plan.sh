#!/bin/bash
set -eo pipefail

PROJECT_DIR="/mnt/e/Projects/spa-ui-moodboard"
LOG_DIR="$PROJECT_DIR/.claude/logs"
CHECK_CMD="bun run typecheck"
FEATURE_NAME="i18n EN/ES Language Toggle"
TOTAL_CHUNKS=8

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Defaults
START_CHUNK=1
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
echo -e "${BLUE}══════════════════════════════════════════════════════${NC}"
echo ""

# Context bridge — captures what previous chunk produced
PREV_CONTEXT=""

capture_context() {
  cd "$PROJECT_DIR"
  PREV_CONTEXT=$(git diff --stat HEAD 2>/dev/null || echo "")
}

# Quality gate — typecheck between chunks
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
Fix quality check errors in beauty-apps-ui at $PROJECT_DIR

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
# CHUNK PROMPTS — baked in from plan file
# ══════════════════════════════════════════════════════

run_chunk_1() {
  local log="$LOG_DIR/chunk-1.log"
  echo -e "${YELLOW}▶ Chunk 1/$TOTAL_CHUNKS: i18n Infrastructure — Hook, Context, Shared Glossary${NC}"

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
    -p "$(cat <<'CHUNK_1_PROMPT'
beauty-apps-ui at /mnt/e/Projects/spa-ui-moodboard
Stack: Next.js 16, React 19, Tailwind CSS 4.2, GSAP 3.14, Bun runtime, TypeScript 5.9
Check: `bun run typecheck`

## Chunk 1/8: i18n Infrastructure — Hook, Context, Shared Glossary

Read these files first (do NOT explore beyond this list):
- `src/hooks/useTheme.ts` — existing hook pattern using useSyncExternalStore, localStorage persistence
- `src/lib/utils.ts` — utility file pattern, cn() helper
- `src/app/(showcase)/layout.tsx` — where the provider will wrap children, sidebar structure

Create:
- `src/lib/i18n.ts` — Locale type (`en` | `es`), LocaleContext, LocaleProvider, `useLocale` hook, `t()` helper function, shared glossary (services, tiers, months, statuses, common labels)
- `src/lib/strings/layout.ts` — string map for layout.tsx (nav labels, sidebar, season, theme toggle)

Modify:
- `src/app/(showcase)/layout.tsx` — wrap with LocaleProvider, add language toggle in sidebar, consume layout strings

What to Build:
LocaleContext with provider that stores locale in localStorage (key: `locale`, default: `en`). `useLocale()` hook returns `{ locale, setLocale, t }`. `t(map)` picks `map[locale]`. Shared glossary object with common terms used across pages (service names, tier names, months, statuses, button labels like Cancel/Confirm). Language toggle: two-button pill (EN | ES) in sidebar below season selector. Wire provider in layout, localize all sidebar strings.

Rules:
- Read ONLY the files listed above. Do NOT explore the codebase.
- Implement ONLY what's described. No extras, no refactoring nearby code.
- After implementing: bun run typecheck
- Fix ALL errors before finishing.
- Do NOT ask questions.

Gate: `bun run typecheck` passes. Language toggle renders in sidebar. Clicking ES switches nav labels to Spanish.
CHUNK_1_PROMPT
)$context_section" < /dev/null 2>&1 | tee "$log"
}

run_chunk_2() {
  local log="$LOG_DIR/chunk-2.log"
  echo -e "${YELLOW}▶ Chunk 2/$TOTAL_CHUNKS: Localize Components Page${NC}"

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
    -p "$(cat <<'CHUNK_2_PROMPT'
beauty-apps-ui at /mnt/e/Projects/spa-ui-moodboard
Stack: Next.js 16, React 19, Tailwind CSS 4.2, GSAP 3.14, Bun runtime, TypeScript 5.9
Check: `bun run typecheck`

## Chunk 2/8: Localize Components Page

Read these files first (do NOT explore beyond this list):
- `src/lib/i18n.ts` — useLocale hook, t() helper, shared glossary, string map pattern
- `src/lib/strings/layout.ts` — reference string map structure
- `src/app/(showcase)/components/page.tsx` — all hardcoded strings (~68)

Create:
- `src/lib/strings/components.ts` — string map for components page

Modify:
- `src/app/(showcase)/components/page.tsx` — import useLocale + string map, replace all hardcoded strings with t() calls

What to Build:
Extract ~68 strings from components page into a string map. Section headings, button labels, variant names, demo text, descriptions. Use shared glossary for tier names and common labels. Replace every hardcoded English string with `t(strings.keyName)`.

Rules:
- Read ONLY the files listed above. Do NOT explore the codebase.
- Implement ONLY what's described. No extras, no refactoring nearby code.
- After implementing: bun run typecheck
- Fix ALL errors before finishing.
- Do NOT ask questions.

Gate: `bun run typecheck` passes. Toggling to ES shows Spanish on the components page.
CHUNK_2_PROMPT
)$context_section" < /dev/null 2>&1 | tee "$log"
}

run_chunk_3() {
  local log="$LOG_DIR/chunk-3.log"
  echo -e "${YELLOW}▶ Chunk 3/$TOTAL_CHUNKS: Localize Admin Page${NC}"

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
    -p "$(cat <<'CHUNK_3_PROMPT'
beauty-apps-ui at /mnt/e/Projects/spa-ui-moodboard
Stack: Next.js 16, React 19, Tailwind CSS 4.2, GSAP 3.14, Bun runtime, TypeScript 5.9
Check: `bun run typecheck`

## Chunk 3/8: Localize Admin Page

Read these files first (do NOT explore beyond this list):
- `src/lib/i18n.ts` — useLocale hook, t() helper, shared glossary
- `src/lib/strings/components.ts` — reference string map structure from chunk 2
- `src/app/(showcase)/admin/page.tsx` — all hardcoded strings (~117)

Create:
- `src/lib/strings/admin.ts` — string map for admin page

Modify:
- `src/app/(showcase)/admin/page.tsx` — import useLocale + string map, replace all hardcoded strings

What to Build:
Extract ~117 strings from admin page. Dashboard stat labels, sidebar nav labels, search/filter labels, table headers, toast messages, dialog titles/descriptions, calendar labels, chart labels, empty state text, status indicators, integration cards, settings panel, activity feed, audit log entries. Heaviest page — use shared glossary for services, tiers, statuses, months.

Rules:
- Read ONLY the files listed above. Do NOT explore the codebase.
- Implement ONLY what's described. No extras, no refactoring nearby code.
- After implementing: bun run typecheck
- Fix ALL errors before finishing.
- Do NOT ask questions.

Gate: `bun run typecheck` passes. Admin page fully renders in Spanish when toggled.
CHUNK_3_PROMPT
)$context_section" < /dev/null 2>&1 | tee "$log"
}

run_chunk_4() {
  local log="$LOG_DIR/chunk-4.log"
  echo -e "${YELLOW}▶ Chunk 4/$TOTAL_CHUNKS: Localize Client Portal Page${NC}"

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
    -p "$(cat <<'CHUNK_4_PROMPT'
beauty-apps-ui at /mnt/e/Projects/spa-ui-moodboard
Stack: Next.js 16, React 19, Tailwind CSS 4.2, GSAP 3.14, Bun runtime, TypeScript 5.9
Check: `bun run typecheck`

## Chunk 4/8: Localize Client Portal Page

Read these files first (do NOT explore beyond this list):
- `src/lib/i18n.ts` — useLocale hook, t() helper, shared glossary
- `src/lib/strings/admin.ts` — reference string map structure
- `src/app/(showcase)/client-portal/page.tsx` — all hardcoded strings (~95)

Create:
- `src/lib/strings/client-portal.ts` — string map for client portal page

Modify:
- `src/app/(showcase)/client-portal/page.tsx` — import useLocale + string map, replace all hardcoded strings

What to Build:
Extract ~95 strings from client portal page. Loyalty card labels, stamp card text, reward offers, booking flow labels, tier progress labels, appointment card details, plan card features/pricing, profile summary labels. Use shared glossary for services, tiers, statuses.

Rules:
- Read ONLY the files listed above. Do NOT explore the codebase.
- Implement ONLY what's described. No extras, no refactoring nearby code.
- After implementing: bun run typecheck
- Fix ALL errors before finishing.
- Do NOT ask questions.

Gate: `bun run typecheck` passes. Client portal page fully renders in Spanish when toggled.
CHUNK_4_PROMPT
)$context_section" < /dev/null 2>&1 | tee "$log"
}

run_chunk_5() {
  local log="$LOG_DIR/chunk-5.log"
  echo -e "${YELLOW}▶ Chunk 5/$TOTAL_CHUNKS: Localize Forms Page${NC}"

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
    -p "$(cat <<'CHUNK_5_PROMPT'
beauty-apps-ui at /mnt/e/Projects/spa-ui-moodboard
Stack: Next.js 16, React 19, Tailwind CSS 4.2, GSAP 3.14, Bun runtime, TypeScript 5.9
Check: `bun run typecheck`

## Chunk 5/8: Localize Forms Page

Read these files first (do NOT explore beyond this list):
- `src/lib/i18n.ts` — useLocale hook, t() helper, shared glossary
- `src/lib/strings/client-portal.ts` — reference string map structure
- `src/app/(showcase)/forms/page.tsx` — all hardcoded strings (~78)

Create:
- `src/lib/strings/forms.ts` — string map for forms page

Modify:
- `src/app/(showcase)/forms/page.tsx` — import useLocale + string map, replace all hardcoded strings

What to Build:
Extract ~78 strings from forms page. Field labels, placeholders, helper text, error messages, service gallery names/prices/durations, time slots, booking tray labels. Use shared glossary for services.

Rules:
- Read ONLY the files listed above. Do NOT explore the codebase.
- Implement ONLY what's described. No extras, no refactoring nearby code.
- After implementing: bun run typecheck
- Fix ALL errors before finishing.
- Do NOT ask questions.

Gate: `bun run typecheck` passes. Forms page fully renders in Spanish when toggled.
CHUNK_5_PROMPT
)$context_section" < /dev/null 2>&1 | tee "$log"
}

run_chunk_6() {
  local log="$LOG_DIR/chunk-6.log"
  echo -e "${YELLOW}▶ Chunk 6/$TOTAL_CHUNKS: Localize Engagement + Mobile Pages${NC}"

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
    -p "$(cat <<'CHUNK_6_PROMPT'
beauty-apps-ui at /mnt/e/Projects/spa-ui-moodboard
Stack: Next.js 16, React 19, Tailwind CSS 4.2, GSAP 3.14, Bun runtime, TypeScript 5.9
Check: `bun run typecheck`

## Chunk 6/8: Localize Engagement + Mobile Pages

Read these files first (do NOT explore beyond this list):
- `src/lib/i18n.ts` — useLocale hook, t() helper, shared glossary
- `src/lib/strings/forms.ts` — reference string map structure
- `src/app/(showcase)/engagement/page.tsx` — all hardcoded strings (~67)
- `src/app/(showcase)/mobile/page.tsx` — all hardcoded strings (~54)

Create:
- `src/lib/strings/engagement.ts` — string map for engagement page
- `src/lib/strings/mobile.ts` — string map for mobile page

Modify:
- `src/app/(showcase)/engagement/page.tsx` — import useLocale + string map, replace all hardcoded strings
- `src/app/(showcase)/mobile/page.tsx` — import useLocale + string map, replace all hardcoded strings

What to Build:
Extract ~121 strings across both pages. Engagement: scratch card, confetti, tier upgrade, points float, stamp, envelope, gift box, wax seal, peel-back, slot machine, bubble pop — section titles, button labels, reward text. Mobile: bottom nav labels, touch interaction descriptions, viewport comparison labels. Use shared glossary for tiers.

Rules:
- Read ONLY the files listed above. Do NOT explore the codebase.
- Implement ONLY what's described. No extras, no refactoring nearby code.
- After implementing: bun run typecheck
- Fix ALL errors before finishing.
- Do NOT ask questions.

Gate: `bun run typecheck` passes. Both pages fully render in Spanish when toggled.
CHUNK_6_PROMPT
)$context_section" < /dev/null 2>&1 | tee "$log"
}

run_chunk_7() {
  local log="$LOG_DIR/chunk-7.log"
  echo -e "${YELLOW}▶ Chunk 7/$TOTAL_CHUNKS: Localize Typography + Backgrounds + Charts + Chat Pages${NC}"

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
    -p "$(cat <<'CHUNK_7_PROMPT'
beauty-apps-ui at /mnt/e/Projects/spa-ui-moodboard
Stack: Next.js 16, React 19, Tailwind CSS 4.2, GSAP 3.14, Bun runtime, TypeScript 5.9
Check: `bun run typecheck`

## Chunk 7/8: Localize Typography + Backgrounds + Charts + Chat Pages

Read these files first (do NOT explore beyond this list):
- `src/lib/i18n.ts` — useLocale hook, t() helper, shared glossary
- `src/lib/strings/engagement.ts` — reference string map structure
- `src/app/(showcase)/typography/page.tsx` — all hardcoded strings (~42)
- `src/app/(showcase)/backgrounds/page.tsx` — all hardcoded strings (~48)
- `src/app/(showcase)/charts/page.tsx` — all hardcoded strings (~52)
- `src/app/(showcase)/chat/page.tsx` — all hardcoded strings (~15)

Create:
- `src/lib/strings/typography.ts` — string map for typography page
- `src/lib/strings/backgrounds.ts` — string map for backgrounds page
- `src/lib/strings/charts.ts` — string map for charts page
- `src/lib/strings/chat.ts` — string map for chat page

Modify:
- `src/app/(showcase)/typography/page.tsx` — import useLocale + string map, replace all hardcoded strings
- `src/app/(showcase)/backgrounds/page.tsx` — import useLocale + string map, replace all hardcoded strings
- `src/app/(showcase)/charts/page.tsx` — import useLocale + string map, replace all hardcoded strings
- `src/app/(showcase)/chat/page.tsx` — import useLocale + string map, replace all hardcoded strings

What to Build:
Extract ~157 strings across four pages. Typography: font family names stay English, translate labels/descriptions. Backgrounds: surface level names, descriptions. Charts: chart titles, axis labels (months can stay abbreviated). Chat: page title, description, bot response messages in useChat hook. Create string maps for each, use shared glossary for months and tiers.

Rules:
- Read ONLY the files listed above. Do NOT explore the codebase.
- Implement ONLY what's described. No extras, no refactoring nearby code.
- After implementing: bun run typecheck
- Fix ALL errors before finishing.
- Do NOT ask questions.

Gate: `bun run typecheck` passes. All four pages render in Spanish when toggled.
CHUNK_7_PROMPT
)$context_section" < /dev/null 2>&1 | tee "$log"
}

run_chunk_8() {
  local log="$LOG_DIR/chunk-8.log"
  echo -e "${YELLOW}▶ Chunk 8/$TOTAL_CHUNKS: Localize useChat Hook + Tokens Page${NC}"

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
    -p "$(cat <<'CHUNK_8_PROMPT'
beauty-apps-ui at /mnt/e/Projects/spa-ui-moodboard
Stack: Next.js 16, React 19, Tailwind CSS 4.2, GSAP 3.14, Bun runtime, TypeScript 5.9
Check: `bun run typecheck`

## Chunk 8/8: Localize useChat Hook + Tokens Page

Read these files first (do NOT explore beyond this list):
- `src/lib/i18n.ts` — useLocale hook, t() helper, shared glossary
- `src/hooks/useChat.ts` — chat hook with hardcoded bot responses
- `src/app/(showcase)/page.tsx` — tokens/home page (if it exists as a standalone page)

Create:
- `src/lib/strings/tokens.ts` — string map for tokens/home page (if applicable)

Modify:
- `src/hooks/useChat.ts` — accept locale parameter, use localized bot responses
- `src/app/(showcase)/page.tsx` — import useLocale + string map if needed (tokens page may be the root `/` route)

What to Build:
Localize the useChat hook — bot responses need Spanish variants. The hook should accept a `locale` parameter or read from context. Localize the tokens/home page if it has hardcoded strings. Final sweep — verify all pages work in both languages.

Rules:
- Read ONLY the files listed above. Do NOT explore the codebase.
- Implement ONLY what's described. No extras, no refactoring nearby code.
- After implementing: bun run typecheck
- Fix ALL errors before finishing.
- Do NOT ask questions.

Gate: `bun run typecheck` passes. Chat bot responds in Spanish when locale is ES. Every showcase page displays Spanish when toggled. Toggling back to EN restores all English.
CHUNK_8_PROMPT
)$context_section" < /dev/null 2>&1 | tee "$log"
}

# ══════════════════════════════════════════════════════
# MAIN LOOP
# ══════════════════════════════════════════════════════

CHUNK_FUNCTIONS=(
  run_chunk_1
  run_chunk_2
  run_chunk_3
  run_chunk_4
  run_chunk_5
  run_chunk_6
  run_chunk_7
  run_chunk_8
)

CHUNK_NAMES=(
  "i18n Infrastructure — Hook, Context, Shared Glossary"
  "Localize Components Page"
  "Localize Admin Page"
  "Localize Client Portal Page"
  "Localize Forms Page"
  "Localize Engagement + Mobile Pages"
  "Localize Typography + Backgrounds + Charts + Chat Pages"
  "Localize useChat Hook + Tokens Page"
)

for i in "${!CHUNK_FUNCTIONS[@]}"; do
  num=$((i + 1))

  if [[ "$num" -lt "$START_CHUNK" ]]; then
    echo -e "${YELLOW}  Skipping chunk $num${NC}"
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
