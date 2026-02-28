"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

  useEffect(() => {
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

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: () => tween.play(),
    });

    return () => {
      st.kill();
      tween.kill();
    };
  }, []);

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
