"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { ShowcaseSection } from "@/components/layout/showcase-section";
import { Card } from "@/components/primitives/card";
import { Button } from "@/components/primitives/button";
import type { NavItemData } from "@/components/navigation/nav-item";
import { useLocale } from "@/lib/i18n";
import { mobileStrings as s } from "@/lib/strings/mobile";

/* ── Page ──────────────────────────────────────────── */

export default function MobilePage() {
  const { t } = useLocale();
  const [activeNavId, setActiveNavId] = useState("home");
  const [pressStates, setPressStates] = useState<Record<string, boolean>>({});

  const handlePressStart = (id: string) => {
    setPressStates((prev) => ({ ...prev, [id]: true }));
  };

  const handlePressEnd = (id: string) => {
    setPressStates((prev) => ({ ...prev, [id]: false }));
  };

  /* ── Mock nav items for demo ────────────────────────── */

  const mobileNavItems: NavItemData[] = [
    {
      id: "home",
      label: t(s.navHome),
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M3 10L10 3l7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5 8.5V16a1 1 0 001 1h3v-4h2v4h3a1 1 0 001-1V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: "book",
      label: t(s.navBook),
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
          <path d="M3 8h14M7 4V2M13 4V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: "rewards",
      label: t(s.navRewards),
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 2l2.5 5 5.5.8-4 3.9.9 5.3L10 14.5 5.1 17l.9-5.3-4-3.9 5.5-.8L10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: "offers",
      label: t(s.navOffers),
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M3 10L10 3l7 7v7a1 1 0 01-1 1H4a1 1 0 01-1-1v-7z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="10" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      ),
    },
    {
      id: "profile",
      label: t(s.navProfile),
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
          <path d="M4 17c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  const scaleLabels = [t(s.tapMe), t(s.holdMe), t(s.pressMe)];

  return (
    <>
      <PageHeader
        title={t(s.title)}
        subtitle={t(s.subtitle)}
      />

      {/* ── Bottom Nav Demo ── */}
      <ShowcaseSection title={t(s.sectionBottomNav)} className="mb-16">
        <p className="text-sm text-text-secondary mb-4 stagger-child">
          {t(s.bottomNavDesc)}
        </p>
        <Card className="p-0 overflow-hidden">
          <div className="stagger-child">
            {/* Phone frame mockup */}
            <div
              className="relative mx-auto max-w-full bg-surface-base rounded-[2rem] border-[3px] border-border overflow-hidden"
              style={{ width: 320, height: 580 }}
            >
              {/* Status bar */}
              <div className="flex items-center justify-between px-6 py-2 bg-surface-raised">
                <span className="text-[0.625rem] font-medium text-text-tertiary">9:41</span>
                <div className="flex items-center gap-1">
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                    <rect x="0" y="5" width="2" height="5" rx="0.5" fill="currentColor" className="text-text-tertiary" />
                    <rect x="3" y="3" width="2" height="7" rx="0.5" fill="currentColor" className="text-text-tertiary" />
                    <rect x="6" y="1" width="2" height="9" rx="0.5" fill="currentColor" className="text-text-tertiary" />
                    <rect x="9" y="0" width="2" height="10" rx="0.5" fill="currentColor" className="text-text-tertiary" />
                  </svg>
                  <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
                    <rect x="0.5" y="0.5" width="13" height="9" rx="1.5" stroke="currentColor" className="text-text-tertiary" strokeWidth="1" />
                    <rect x="14" y="3" width="2" height="4" rx="0.5" fill="currentColor" className="text-text-tertiary" />
                    <rect x="2" y="2" width="8" height="6" rx="1" fill="currentColor" className="text-accent" />
                  </svg>
                </div>
              </div>

              {/* Content area */}
              <div className="px-4 pt-4 pb-20 space-y-3">
                <p className="font-display text-lg font-bold text-text-primary">
                  {t(s.welcomeBack)}
                </p>
                <p className="text-sm text-text-secondary">
                  {t(s.upcomingAppointments)}
                </p>

                {/* Mini appointment cards */}
                <div className="space-y-2 mt-4">
                  <div className="rounded-lg bg-surface-overlay p-3 shadow-sm border border-border">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-text-primary">{t(s.hotStoneMassage)}</p>
                        <p className="text-xs text-text-tertiary mt-0.5">{t(s.todayTime)}</p>
                      </div>
                      <span className="text-[0.625rem] font-medium text-success bg-success-muted px-2 py-0.5 rounded-full">
                        {t(s.confirmed)}
                      </span>
                    </div>
                  </div>
                  <div className="rounded-lg bg-surface-overlay p-3 shadow-sm border border-border">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium text-text-primary">{t(s.classicFacial)}</p>
                        <p className="text-xs text-text-tertiary mt-0.5">{t(s.tomorrowTime)}</p>
                      </div>
                      <span className="text-[0.625rem] font-medium text-warning bg-warning-muted px-2 py-0.5 rounded-full">
                        {t(s.pending)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-2">
                    {t(s.activeLabel)} {mobileNavItems.find((n) => n.id === activeNavId)?.label}
                  </p>
                </div>
              </div>

              {/* Bottom nav inside phone frame — relative positioned for demo */}
              <div
                className="absolute inset-x-0 bottom-0 bg-surface-raised border-t border-border"
                style={{ height: 56 }}
              >
                <div
                  className="relative grid h-full"
                  style={{
                    gridTemplateColumns: `repeat(${mobileNavItems.length}, 1fr)`,
                    "--tab-count": mobileNavItems.length,
                    "--active-index": mobileNavItems.findIndex((n) => n.id === activeNavId),
                  } as React.CSSProperties}
                >
                  {/* Sliding pill */}
                  <span
                    className="absolute top-1.5 h-[3px] rounded-full bg-accent"
                    style={{
                      width: `calc(100% / ${mobileNavItems.length} - 16px)`,
                      left: "8px",
                      transform: `translateX(calc((100% + 16px) * var(--active-index)))`,
                      transition: "transform var(--duration-slow) cubic-bezier(0.4, 1.2, 0.4, 1)",
                    }}
                    aria-hidden="true"
                  />
                  {mobileNavItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveNavId(item.id)}
                      className={`flex flex-col items-center justify-center gap-0.5 text-[0.5rem] font-medium transition-colors ${
                        activeNavId === item.id ? "text-primary" : "text-text-tertiary"
                      }`}
                      style={{ transitionDuration: "var(--duration-normal)" }}
                    >
                      <span className="w-5 h-5">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
        <p className="text-xs text-text-tertiary mt-4 text-center">
          {t(s.phoneFrameHint)}
        </p>
      </ShowcaseSection>

      {/* ── Touch Interaction Demos ── */}
      <ShowcaseSection title={t(s.sectionTouchInteractions)} className="mb-16">
        <Card className="p-6 space-y-8">
          {/* Press/Release demo */}
          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              {t(s.pressRelease)}
            </p>
            <p className="text-sm text-text-secondary mb-4">
              {t(s.pressReleaseDesc)}
            </p>
            <div className="flex flex-wrap gap-3">
              {(["primary", "secondary", "cta"] as const).map((variant) => (
                <div key={variant} className="text-center space-y-2">
                  <Button
                    variant={variant}
                    onPointerDown={() => handlePressStart(variant)}
                    onPointerUp={() => handlePressEnd(variant)}
                    onPointerLeave={() => handlePressEnd(variant)}
                  >
                    {variant === "cta" ? t(s.bookNow) : variant === "primary" ? t(s.primary) : t(s.secondary)}
                  </Button>
                  <p className="text-[0.625rem] text-text-tertiary">
                    {pressStates[variant] ? t(s.pressed) : t(s.released)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Ghost trace fill */}
          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              {t(s.ghostTraceFill)}
            </p>
            <p className="text-sm text-text-secondary mb-4">
              {t(s.ghostTraceFillDesc)}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="ghost">{t(s.hoverMe)}</Button>
              <Button variant="ghost">{t(s.viewDetails)}</Button>
              <Button variant="ghost">{t(s.learnMore)}</Button>
            </div>
          </div>

          {/* Scale feedback */}
          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              {t(s.scaleFeedback)}
            </p>
            <p className="text-sm text-text-secondary mb-4">
              {t(s.scaleFeedbackDesc)}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {scaleLabels.map((label) => (
                <button
                  key={label}
                  className="rounded-xl bg-surface-raised shadow-card p-6 text-center transition-transform active:scale-[0.96] hover:scale-[1.02]"
                  style={{ transitionDuration: "var(--duration-fast)" }}
                >
                  <p className="text-sm font-medium text-text-primary">{label}</p>
                  <p className="text-xs text-text-tertiary mt-1">active:scale(0.96)</p>
                </button>
              ))}
            </div>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Responsive Viewport ── */}
      <ShowcaseSection title={t(s.sectionResponsiveViewport)} className="mb-16">
        <p className="text-sm text-text-secondary mb-4 stagger-child">
          {t(s.responsiveViewportDesc)}
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Mobile viewport */}
          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-3">
              {t(s.mobile375)}
            </p>
            <div
              className="relative mx-auto bg-surface-base rounded-2xl border-2 border-border overflow-hidden"
              style={{ width: 240, height: 420 }}
            >
              <div className="p-3 space-y-2">
                <div className="h-4 w-20 rounded bg-surface-sunken" />
                <div className="h-2 w-32 rounded bg-surface-sunken" />
                <div className="mt-3 space-y-2">
                  <div className="h-16 rounded-lg bg-surface-warm-3 shadow-sm" />
                  <div className="h-16 rounded-lg bg-surface-warm-3 shadow-sm" />
                  <div className="h-16 rounded-lg bg-surface-warm-3 shadow-sm" />
                </div>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-10 bg-surface-raised border-t border-border flex items-center justify-around px-2">
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className="flex flex-col items-center gap-0.5">
                    <div className="w-3 h-3 rounded-sm bg-border" />
                    <div className="w-5 h-1 rounded bg-border" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop viewport */}
          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-3">
              {t(s.desktop1280)}
            </p>
            <div
              className="relative mx-auto bg-surface-base rounded-xl border-2 border-border overflow-hidden"
              style={{ width: "100%", maxWidth: 400, height: 260 }}
            >
              <div className="flex h-full">
                {/* Sidebar wireframe */}
                <div className="w-16 h-full bg-surface-sunken border-r border-border p-2 space-y-3 shrink-0">
                  <div className="h-3 w-8 rounded bg-primary-hover mx-auto" />
                  {Array.from({ length: 5 }, (_, i) => (
                    <div
                      key={i}
                      className={`h-2.5 w-8 rounded mx-auto ${
                        i === 0 ? "bg-primary-hover" : "bg-border"
                      }`}
                    />
                  ))}
                </div>
                {/* Content wireframe */}
                <div className="flex-1 p-3 space-y-2">
                  <div className="h-3 w-24 rounded bg-surface-sunken" />
                  <div className="h-1.5 w-40 rounded bg-surface-sunken" />
                  <div className="mt-2 grid grid-cols-3 gap-2">
                    {Array.from({ length: 6 }, (_, i) => (
                      <div key={i} className="h-12 rounded bg-surface-warm-3 shadow-sm" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ShowcaseSection>
    </>
  );
}
