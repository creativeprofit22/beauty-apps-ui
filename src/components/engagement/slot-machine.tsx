"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SlotMachineProps {
  /** Symbols for each reel position */
  symbols?: readonly string[];
  /** Called with the result when all reels stop */
  onResult?: (result: string[], isJackpot: boolean) => void;
  /** Called on jackpot (3 matching) */
  onJackpot?: () => void;
  className?: string;
}

const DEFAULT_SYMBOLS = ["💎", "🌟", "🎁", "✨", "🏆"];

const REEL_COUNT = 3;
const VISIBLE_ROWS = 1;
const SYMBOL_HEIGHT = 56; // px per symbol row
const SPIN_CYCLES = 3; // full cycles before landing

/**
 * SlotMachine — 3 vertical reels with reward symbols.
 * Press "Spin" → reels scroll via translateY with staggered stops.
 * Jackpot (3 matching) triggers onJackpot callback.
 * Keyboard-accessible spin button. role="img" with aria-label.
 */
export function SlotMachine({
  symbols = DEFAULT_SYMBOLS,
  onResult,
  onJackpot,
  className,
}: SlotMachineProps) {
  const [spinning, setSpinning] = useState(false);
  const [results, setResults] = useState<number[]>([0, 0, 0]);
  const [reelsStopped, setReelsStopped] = useState([true, true, true]);
  const [lastResult, setLastResult] = useState<string[] | null>(null);
  const [isJackpot, setIsJackpot] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  useEffect(() => {
    return clearTimers;
  }, [clearTimers]);

  const spin = useCallback(() => {
    if (spinning) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // Pick random results for each reel
    const newResults = Array.from({ length: REEL_COUNT }, () =>
      Math.floor(Math.random() * symbols.length),
    );

    if (prefersReduced) {
      setResults(newResults);
      setReelsStopped([true, true, true]);
      const resultSymbols = newResults.map((i) => symbols[i]!);
      const jackpot = resultSymbols.every((s) => s === resultSymbols[0]);
      setLastResult(resultSymbols);
      setIsJackpot(jackpot);
      onResult?.(resultSymbols, jackpot);
      if (jackpot) onJackpot?.();
      return;
    }

    setSpinning(true);
    setReelsStopped([false, false, false]);
    setLastResult(null);
    setIsJackpot(false);

    // Each reel stops sequentially with stagger
    const staggerMs = [800, 1200, 1600];

    staggerMs.forEach((delay, reelIndex) => {
      const timer = setTimeout(() => {
        setResults((prev) => {
          const next = [...prev];
          next[reelIndex] = newResults[reelIndex]!;
          return next;
        });
        setReelsStopped((prev) => {
          const next = [...prev];
          next[reelIndex] = true;
          return next;
        });

        // After last reel stops
        if (reelIndex === REEL_COUNT - 1) {
          setTimeout(() => {
            setSpinning(false);
            const resultSymbols = newResults.map((i) => symbols[i]!);
            const jackpot = resultSymbols.every((s) => s === resultSymbols[0]);
            setLastResult(resultSymbols);
            setIsJackpot(jackpot);
            onResult?.(resultSymbols, jackpot);
            if (jackpot) onJackpot?.();
          }, 200);
        }
      }, delay);

      timersRef.current.push(timer);
    });
  }, [spinning, symbols, onResult, onJackpot]);

  // Build the reel strip: repeat symbols enough times for the spin animation
  const stripSymbols = [
    ...Array.from({ length: SPIN_CYCLES }, () => [...symbols]).flat(),
    ...symbols, // extra set for landing
  ];

  const resultLabel = lastResult
    ? `Result: ${lastResult.join(" ")}${isJackpot ? " — Jackpot!" : ""}`
    : "Press Spin to play";

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {/* Slot machine frame */}
      <div
        role="img"
        aria-label={resultLabel}
        className={cn(
          "flex gap-2 p-4 rounded-xl shadow-md",
          "bg-surface-warm-2 border border-border-muted",
        )}
      >
        {Array.from({ length: REEL_COUNT }, (_, reelIndex) => {
          const targetIndex = results[reelIndex]!;
          const landingOffset =
            -(SPIN_CYCLES * symbols.length + targetIndex) * SYMBOL_HEIGHT;

          return (
            <div
              key={reelIndex}
              className="overflow-hidden rounded-lg bg-surface-raised border border-border-muted"
              style={{
                width: 64,
                height: SYMBOL_HEIGHT * VISIBLE_ROWS,
              }}
            >
              <div
                style={{
                  transform: reelsStopped[reelIndex]
                    ? `translateY(${-targetIndex * SYMBOL_HEIGHT}px)`
                    : `translateY(${landingOffset}px)`,
                  transition: reelsStopped[reelIndex]
                    ? "none"
                    : `transform ${1000 + reelIndex * 400}ms cubic-bezier(0.15, 0, 0.3, 1)`,
                }}
              >
                {stripSymbols.map((symbol, symbolIndex) => (
                  <div
                    key={symbolIndex}
                    className="flex items-center justify-center text-2xl"
                    style={{ height: SYMBOL_HEIGHT }}
                  >
                    {symbol}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Result display */}
      {lastResult && (
        <p
          className={cn(
            "text-sm font-display font-bold",
            isJackpot ? "text-accent" : "text-text-secondary",
          )}
        >
          {isJackpot ? "JACKPOT!" : lastResult.join(" ")}
        </p>
      )}

      {/* Spin button */}
      <button
        type="button"
        onClick={spin}
        disabled={spinning}
        className={cn(
          "px-6 py-2.5 rounded-full font-display font-bold text-sm",
          "bg-accent text-on-accent shadow-md",
          "hover:brightness-105 active:scale-[0.97]",
          "transition-all duration-fast",
          "disabled:opacity-50 disabled:cursor-not-allowed",
        )}
      >
        {spinning ? "Spinning..." : "Spin"}
      </button>
    </div>
  );
}
