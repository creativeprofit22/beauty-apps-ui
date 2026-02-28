"use client";

import { useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ShowcaseSectionProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

/**
 * ShowcaseSection — GSAP ScrollTrigger wrapper.
 * On viewport enter, staggers children in with:
 *   { opacity: 0, y: 20, skewX: -1.5 } → { opacity: 1, y: 0, skewX: 0 }
 * Uses once: true, cleans up properly.
 */
export function ShowcaseSection({
  children,
  title,
  className,
}: ShowcaseSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    const targets = el.querySelectorAll<HTMLElement>(".stagger-child");
    if (targets.length === 0) return;

    // Check reduced motion preference
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      // Just make visible immediately
      gsap.set(targets, { opacity: 1, y: 0, skewX: 0, visibility: "visible" });
      return;
    }

    gsap.set(targets, { opacity: 0, y: 20, skewX: -1.5, visibility: "visible" });

    const tween = gsap.to(targets, {
      opacity: 1,
      y: 0,
      skewX: 0,
      stagger: 0.06,
      duration: 0.5,
      ease: "back.out(1.7)",
      paused: true,
    });

    ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => tween.play(),
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className={className}>
      {title && (
        <h2 className="font-display text-2xl font-semibold mb-6 text-text-primary">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}
