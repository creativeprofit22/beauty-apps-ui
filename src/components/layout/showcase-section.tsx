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
 *   { opacity: 0, y: 12, blur(1px) } → { opacity: 1, y: 0, blur(0) }
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
      gsap.set(targets, { opacity: 1, y: 0, visibility: "visible" });
      return;
    }

    // Shell uses <main overflow-y-auto> as scroll container, not window
    const scroller = el.closest("main") || undefined;

    gsap.fromTo(
      targets,
      { opacity: 0, y: 12, filter: "blur(1px)", visibility: "visible" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        stagger: 0.06,
        duration: 0.5,
        ease: "power2.out",
        clearProps: "filter",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
          scroller,
        },
      },
    );
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
