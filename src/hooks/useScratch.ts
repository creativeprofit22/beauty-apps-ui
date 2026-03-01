"use client";

import { useRef, useCallback, useEffect, useState } from "react";

interface UseScratchOptions {
  /** Width of the canvas */
  width: number;
  /** Height of the canvas */
  height: number;
  /** Brush radius for scratching */
  brushRadius?: number;
  /** Percentage threshold (0-1) to trigger auto-complete */
  completeThreshold?: number;
  /** Foil gradient stops for the overlay (from skinConfig.scratchFoilGradient) */
  foilGradient: readonly string[];
  /** Called when scratch completion threshold is reached */
  onComplete?: () => void;
}

interface UseScratchReturn {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  isComplete: boolean;
  /** Percentage scratched (0-1) */
  progress: number;
  /** Reset the scratch overlay */
  reset: () => void;
  /** Instantly reveal without scratching (WCAG 2.5.7 dragging alternative) */
  forceReveal: () => void;
}

const scheduleIdle =
  typeof requestIdleCallback === "function"
    ? requestIdleCallback
    : (cb: () => void) => setTimeout(cb, 0);

/**
 * useScratch — Encapsulates canvas scratch-off logic.
 * Uses destination-out compositing on pointermove.
 * Throttles completion check to every 500ms via requestIdleCallback.
 */
export function useScratch({
  width,
  height,
  brushRadius = 20,
  completeThreshold = 0.35,
  foilGradient,
  onComplete,
}: UseScratchOptions): UseScratchReturn {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);
  const lastCheck = useRef(0);
  const [isComplete, setIsComplete] = useState(false);
  const isCompleteRef = useRef(false);
  const [progress, setProgress] = useState(0);
  const completeCalled = useRef(false);

  const drawFoil = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      foilGradient.forEach((color, i) => {
        const stop = foilGradient.length > 1 ? i / (foilGradient.length - 1) : 0;
        gradient.addColorStop(stop, color);
      });
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    },
    [width, height, foilGradient],
  );

  const checkCompletion = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const now = Date.now();
      if (now - lastCheck.current < 500) return;
      lastCheck.current = now;

      scheduleIdle(() => {
        if (completeCalled.current) return;
        const { data } = ctx.getImageData(0, 0, width, height);
        let transparent = 0;
        for (let i = 3; i < data.length; i += 4) {
          if (data[i] === 0) transparent++;
        }
        const pct = transparent / (width * height);
        setProgress(pct);

        if (pct > completeThreshold && !completeCalled.current) {
          completeCalled.current = true;
          isCompleteRef.current = true;
          setIsComplete(true);
          onComplete?.();
        }
      });
    },
    [width, height, completeThreshold, onComplete],
  );

  const scratch = useCallback(
    (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.beginPath();
      ctx.arc(x, y, brushRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = "source-over";
      checkCompletion(ctx);
    },
    [brushRadius, checkCompletion],
  );

  const getPos = useCallback(
    (e: PointerEvent): { x: number; y: number } | null => {
      const canvas = canvasRef.current;
      if (!canvas) return null;
      const rect = canvas.getBoundingClientRect();
      return {
        x: ((e.clientX - rect.left) / rect.width) * width,
        y: ((e.clientY - rect.top) / rect.height) * height,
      };
    },
    [width, height],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    drawFoil(ctx);

    const onPointerDown = (e: PointerEvent) => {
      if (isCompleteRef.current) return;
      isDrawing.current = true;
      canvas.setPointerCapture(e.pointerId);
      const pos = getPos(e);
      if (pos) scratch(ctx, pos.x, pos.y);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDrawing.current || isCompleteRef.current) return;
      const pos = getPos(e);
      if (pos) scratch(ctx, pos.x, pos.y);
    };

    const onPointerUp = () => {
      isDrawing.current = false;
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);

    return () => {
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
    };
  }, [width, height, drawFoil, scratch, getPos]);

  const reset = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.globalCompositeOperation = "source-over";
    drawFoil(ctx);
    setIsComplete(false);
    isCompleteRef.current = false;
    setProgress(0);
    completeCalled.current = false;
    lastCheck.current = 0;
  }, [drawFoil]);

  const forceReveal = useCallback(() => {
    if (completeCalled.current) return;
    completeCalled.current = true;
    isCompleteRef.current = true;
    setIsComplete(true);
    setProgress(1);
    onComplete?.();
  }, [onComplete]);

  return { canvasRef, isComplete, progress, reset, forceReveal };
}
