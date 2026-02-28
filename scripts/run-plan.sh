#!/bin/bash
set -eo pipefail

PROJECT_DIR="/mnt/e/Projects/spa-ui-moodboard"
PLAN_FILE="$PROJECT_DIR/.claude/current-plan.md"
LOG_DIR="$PROJECT_DIR/.claude/logs"
CHECK_CMD="bun run typecheck"
FEATURE_NAME="Spa UI Moodboard — Design System Showcase"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Defaults
START_CHUNK=1
CLEANUP_EVERY=0
SKIP_FINAL_CHECK=false

# Parse args
while [[ $# -gt 0 ]]; do
  case $1 in
    --start) START_CHUNK="$2"; shift 2 ;;
    --cleanup-every) CLEANUP_EVERY="$2"; shift 2 ;;
    --skip-final-check) SKIP_FINAL_CHECK=true; shift ;;
    *) echo "Unknown option: $1"; exit 1 ;;
  esac
done

mkdir -p "$LOG_DIR"

echo -e "${BLUE}══════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  Plan Executor - $(basename "$PROJECT_DIR")${NC}"
echo -e "${BLUE}══════════════════════════════════════════════════════${NC}"

if [[ ! -f "$PLAN_FILE" ]]; then
  echo -e "${RED}✗ Plan file not found: $PLAN_FILE${NC}"
  echo "  Run /plan-checkpoint first to create a plan."
  exit 1
fi

TOTAL_CHUNKS=$(grep -cE "^#{3,4} Chunk [0-9]+:" "$PLAN_FILE" || echo "0")
echo -e "${GREEN}✓${NC} $TOTAL_CHUNKS chunks detected, starting from chunk $START_CHUNK"
echo -e "${GREEN}✓${NC} Feature: $FEATURE_NAME"
echo -e "${GREEN}✓${NC} Checks: $CHECK_CMD"
[[ "$CLEANUP_EVERY" -gt 0 ]] && echo -e "${GREEN}✓${NC} Cleanup every $CLEANUP_EVERY chunks"
echo ""

# ── Pre-read ALL chunks into arrays BEFORE any Claude invocations ───────────
# Critical: process substitution + while read shares stdin with subprocesses.
# Claude would consume remaining grep lines, killing the loop after chunk 1.
# Fix: drain the grep output fully first, store in arrays, then loop arrays.
declare -a CHUNK_NUMS=()
declare -a CHUNK_NAMES=()

while IFS= read -r line; do
  num=$(echo "$line" | grep -oE "Chunk [0-9]+" | grep -oE "[0-9]+")
  name=$(echo "$line" | sed -E 's/#{3,4} Chunk [0-9]+: //' | sed 's/ (parallel-safe:.*//')
  if [[ -n "$num" ]]; then
    CHUNK_NUMS+=("$num")
    CHUNK_NAMES+=("$name")
  fi
done < <(grep -E "^#{3,4} Chunk [0-9]+:" "$PLAN_FILE")

echo -e "${GREEN}✓${NC} Chunks loaded: ${CHUNK_NUMS[*]}"
echo ""

# ── Context bridge — captures what previous chunk produced ──────────────────
PREV_CHUNK_CONTEXT=""

capture_context() {
  cd "$PROJECT_DIR"
  PREV_CHUNK_CONTEXT=$(git diff --stat HEAD 2>/dev/null || echo "(no git changes)")
}

# ── Prompt generation — mirrors /build-checkpoint quality ───────────────────
generate_prompt() {
  local num=$1
  local name=$2
  local context=$3

  local context_section=""
  if [[ -n "$context" && "$context" != "(no git changes)" ]]; then
    context_section="
**Previous chunk produced these changes** (for context, do NOT modify these files unless they're in YOUR scope):
\`\`\`
$context
\`\`\`"
  fi

  cat << PROMPT
Continue work on $(basename "$PROJECT_DIR") at $PROJECT_DIR

**Phase**: build (implementation)
**Feature**: $FEATURE_NAME
**Chunk**: $num of $TOTAL_CHUNKS — $name
$context_section

Read .claude/current-plan.md — find the Chunk $num section.

Instructions:
1. Read .claude/current-plan.md and locate Chunk $num
2. Read ALL existing files referenced in that chunk BEFORE writing anything (match patterns exactly)
3. Implement exactly what Chunk $num describes — no more, no less
4. Only modify files listed in that chunk's scope
5. After implementing, run: $CHECK_CMD
6. If checks fail, fix ALL errors before finishing
7. Update CLAUDE.md phase line: Chunk $((num - 1))/$TOTAL_CHUNKS → Chunk $num/$TOTAL_CHUNKS

Report what was implemented when done. Do NOT ask questions.
PROMPT
}

# ── Fix pass — runs if quality gate fails after a chunk ─────────────────────
generate_fix_prompt() {
  local errors=$1

  cat << PROMPT
Continue work on $(basename "$PROJECT_DIR") at $PROJECT_DIR

**Phase**: fix (quality gate failed after chunk implementation)
**Feature**: $FEATURE_NAME

The quality checks failed after implementing the last chunk. Fix ALL errors below.

**Errors to fix:**
\`\`\`
$errors
\`\`\`

Instructions:
1. Read each file mentioned in the errors
2. Fix the errors — minimal changes, don't refactor or improve surrounding code
3. Re-run: $CHECK_CMD
4. If still failing, fix again. Loop until clean.

Do NOT ask questions. Report what was fixed when done.
PROMPT
}

# ── Run a chunk ─────────────────────────────────────────────────────────────
run_chunk() {
  local num=$1
  local name=$2
  local log="$LOG_DIR/chunk-${num}.log"

  echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo -e "${YELLOW}▶ Chunk $num/$TOTAL_CHUNKS: $name${NC}"
  echo -e "  Log: $log"
  echo ""

  cd "$PROJECT_DIR"

  if claude --dangerously-skip-permissions --max-turns 50 \
            -p "$(generate_prompt "$num" "$name" "$PREV_CHUNK_CONTEXT")" \
            < /dev/null 2>&1 | tee "$log"; then
    echo -e "${GREEN}✓ Chunk $num implementation done${NC}"
  else
    echo -e "${RED}✗ Chunk $num failed — check $log${NC}"
    exit 1
  fi
  echo ""
}

# ── Quality gate — typecheck + lint between chunks ──────────────────────────
run_quality_gate() {
  local num=$1
  local gate_log="$LOG_DIR/gate-${num}.log"

  echo -e "${CYAN}  Running quality gate after chunk $num...${NC}"
  cd "$PROJECT_DIR"

  if eval "$CHECK_CMD" > "$gate_log" 2>&1; then
    echo -e "${GREEN}  ✓ Quality gate passed${NC}"
    return 0
  else
    echo -e "${YELLOW}  ⚠ Quality gate failed — spawning fix pass...${NC}"
    local errors
    errors=$(cat "$gate_log")
    local fix_log="$LOG_DIR/fix-${num}.log"

    if claude --dangerously-skip-permissions --max-turns 20 \
              -p "$(generate_fix_prompt "$errors")" \
              < /dev/null 2>&1 | tee "$fix_log"; then
      # Re-check after fix
      if eval "$CHECK_CMD" > "$gate_log" 2>&1; then
        echo -e "${GREEN}  ✓ Fix pass succeeded — quality gate now passes${NC}"
        return 0
      else
        echo -e "${RED}  ✗ Fix pass ran but checks still failing — continuing anyway${NC}"
        echo -e "${RED}    Check $gate_log for remaining errors${NC}"
        return 1
      fi
    else
      echo -e "${RED}  ✗ Fix pass failed — continuing anyway${NC}"
      return 1
    fi
  fi
}

# ── Cleanup pass ────────────────────────────────────────────────────────────
run_cleanup() {
  echo -e "${CYAN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
  echo -e "${CYAN}▶ Running CLAUDE.md cleanup...${NC}"

  cd "$PROJECT_DIR"

  claude --dangerously-skip-permissions --max-turns 10 \
         -p "Run /setup-claude-md to clean up CLAUDE.md. Keep it minimal and accurate." \
         < /dev/null 2>&1 | tee "$LOG_DIR/cleanup.log"

  echo -e "${CYAN}✓ Cleanup done${NC}"
  echo ""
}

# ── Main loop — iterates over pre-loaded arrays, no stdin conflict ──────────
CHUNKS_SINCE_CLEANUP=0

for i in "${!CHUNK_NUMS[@]}"; do
  num="${CHUNK_NUMS[$i]}"
  name="${CHUNK_NAMES[$i]}"

  if [[ "$num" -lt "$START_CHUNK" ]]; then
    echo -e "${YELLOW}  Skipping chunk $num (--start=$START_CHUNK)${NC}"
    continue
  fi

  # Implement the chunk
  run_chunk "$num" "$name"

  # Quality gate — typecheck + lint, fix if needed
  run_quality_gate "$num"

  # Capture context for next chunk
  capture_context

  # Periodic cleanup
  CHUNKS_SINCE_CLEANUP=$((CHUNKS_SINCE_CLEANUP + 1))
  if [[ "$CLEANUP_EVERY" -gt 0 && "$CHUNKS_SINCE_CLEANUP" -ge "$CLEANUP_EVERY" ]]; then
    run_cleanup
    CHUNKS_SINCE_CLEANUP=0
  fi
done

echo ""
echo -e "${GREEN}══════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  All chunks complete!${NC}"
echo -e "${GREEN}══════════════════════════════════════════════════════${NC}"
echo ""

if [[ "$SKIP_FINAL_CHECK" != "true" ]]; then
  echo -e "${BLUE}Running final quality checks...${NC}"
  cd "$PROJECT_DIR"
  if eval "$CHECK_CMD"; then
    echo -e "${GREEN}✓ All checks passed${NC}"
  else
    echo -e "${RED}✗ Checks failed — fix errors before committing${NC}"
    exit 1
  fi
fi

echo ""
echo -e "${GREEN}Done! Next steps:${NC}"
echo -e "  1. Review changes: git diff"
echo -e "  2. Commit: /commit"
echo -e "  3. Validate if needed: /quick-check, /validate-checkpoint, /wiring-checkpoint"
