"use client";

import { PageHeader } from "@/components/layout/page-header";
import { ShowcaseSection } from "@/components/layout/showcase-section";
import { Card } from "@/components/primitives/card";
import { useLocale } from "@/lib/i18n";
import { backgroundsStrings as s } from "@/lib/strings/backgrounds";

/* ── Page ── */

export default function BackgroundsPage() {
  const { t } = useLocale();

  const surfaces = [
    { nameKey: s.surfaceBase, var: "--surface-base", descKey: s.descPageBackground },
    { nameKey: s.surfaceSunken, var: "--surface-sunken", descKey: s.descInsetWells },
    { nameKey: s.surfaceRaised, var: "--surface-raised", descKey: s.descCardsElevated },
    { nameKey: s.surfaceOverlay, var: "--surface-overlay", descKey: s.descModalsPopovers },
    { nameKey: s.surfaceInteractive, var: "--surface-interactive", descKey: s.descButtonsControls },
    { nameKey: s.surfaceInteractiveHover, var: "--surface-interactive-hover", descKey: s.descHoverState },
  ];

  return (
    <>
      <PageHeader
        title={t(s.title)}
        subtitle={t(s.subtitle)}
      />

      {/* ── Drifting Warm Gradient ── */}
      <ShowcaseSection title={t(s.sectionDriftingGradient)} className="mb-16">
        <Card className="p-0 overflow-hidden">
          <div className="stagger-child relative h-64 md:h-80">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, var(--primary-muted) 0%, var(--secondary-muted) 50%, var(--accent-muted) 100%)",
                backgroundSize: "200% 200%",
                animation: "drift 8s ease-in-out infinite alternate",
                opacity: "var(--gradient-intensity)",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="font-display text-2xl font-bold text-text-primary">
                {t(s.ambientGradient)}
              </p>
            </div>
          </div>
        </Card>
        <style>{`
          @keyframes drift {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
        `}</style>
      </ShowcaseSection>

      {/* ── Noise Texture Overlay ── */}
      <ShowcaseSection title={t(s.sectionNoiseTexture)} className="mb-16">
        <Card className="p-0 overflow-hidden">
          <div className="stagger-child relative h-64 md:h-80">
            <div
              className="absolute inset-0 bg-primary"
              style={{ opacity: 0.9 }}
            />
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`,
                backgroundRepeat: "repeat",
                backgroundSize: "256px 256px",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="font-display text-2xl font-bold text-text-primary">
                {t(s.noiseTexture)}
              </p>
            </div>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Surface Hierarchy ── */}
      <ShowcaseSection title={t(s.sectionSurfaceHierarchy)} className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Light mode */}
          <Card className="p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              {t(s.lightMode)}
            </p>
            <div className="stagger-child space-y-3">
              {surfaces.map((surface) => (
                <div
                  key={surface.var}
                  className="flex items-center gap-4 rounded-lg p-3 border border-border-muted"
                  style={{ backgroundColor: `var(${surface.var})` }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary">{t(surface.nameKey)}</p>
                    <p className="text-xs text-text-tertiary">{t(surface.descKey)}</p>
                  </div>
                  <span className="font-data text-xs text-text-tertiary truncate">
                    {surface.var}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Dark mode */}
          <Card className="p-6 dark">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              {t(s.darkMode)}
            </p>
            <div className="stagger-child space-y-3">
              {surfaces.map((surface) => (
                <div
                  key={surface.var}
                  className="flex items-center gap-4 rounded-lg p-3 border border-border-muted"
                  style={{ backgroundColor: `var(${surface.var})` }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary">{t(surface.nameKey)}</p>
                    <p className="text-xs text-text-tertiary">{t(surface.descKey)}</p>
                  </div>
                  <span className="font-data text-xs text-text-tertiary truncate">
                    {surface.var}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </ShowcaseSection>

      {/* ── Light vs Dark Side-by-Side ── */}
      <ShowcaseSection title={t(s.sectionLightVsDark)} className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Light card stack */}
          <Card className="p-6 overflow-hidden">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              {t(s.light)}
            </p>
            <div
              className="stagger-child rounded-xl p-6 space-y-4"
              style={{ backgroundColor: "var(--surface-base)" }}
            >
              <div
                className="rounded-lg p-4 shadow-card"
                style={{ backgroundColor: "var(--surface-raised)" }}
              >
                <p className="font-display text-lg font-semibold text-text-primary">
                  {t(s.raisedCard)}
                </p>
                <p className="text-sm text-text-secondary mt-1">
                  {t(s.raisedCardDesc)}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <div
                  className="rounded-md px-4 py-2 text-sm font-medium"
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "var(--text-primary)",
                  }}
                >
                  {t(s.primary)}
                </div>
                <div
                  className="rounded-md px-4 py-2 text-sm font-medium"
                  style={{
                    backgroundColor: "var(--secondary)",
                    color: "var(--text-primary)",
                  }}
                >
                  {t(s.secondary)}
                </div>
                <div
                  className="rounded-md px-4 py-2 text-sm font-medium"
                  style={{
                    backgroundColor: "var(--accent)",
                    color: "var(--text-primary)",
                  }}
                >
                  {t(s.accent)}
                </div>
              </div>
              <div
                className="rounded-lg p-3"
                style={{
                  backgroundColor: "var(--surface-sunken)",
                  boxShadow: "var(--elevation-inset)",
                }}
              >
                <p className="text-sm text-text-secondary">
                  {t(s.sunkenSurfaceDesc)}
                </p>
              </div>
            </div>
          </Card>

          {/* Dark card stack */}
          <Card className="p-6 overflow-hidden dark">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              {t(s.dark)}
            </p>
            <div
              className="stagger-child rounded-xl p-6 space-y-4"
              style={{ backgroundColor: "var(--surface-base)" }}
            >
              <div
                className="rounded-lg p-4 shadow-card"
                style={{ backgroundColor: "var(--surface-raised)" }}
              >
                <p className="font-display text-lg font-semibold text-text-primary">
                  {t(s.raisedCard)}
                </p>
                <p className="text-sm text-text-secondary mt-1">
                  {t(s.raisedCardDesc)}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <div
                  className="rounded-md px-4 py-2 text-sm font-medium"
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "var(--text-on-accent)",
                  }}
                >
                  {t(s.primary)}
                </div>
                <div
                  className="rounded-md px-4 py-2 text-sm font-medium"
                  style={{
                    backgroundColor: "var(--secondary)",
                    color: "var(--text-on-accent)",
                  }}
                >
                  {t(s.secondary)}
                </div>
                <div
                  className="rounded-md px-4 py-2 text-sm font-medium"
                  style={{
                    backgroundColor: "var(--accent)",
                    color: "var(--text-on-accent)",
                  }}
                >
                  {t(s.accent)}
                </div>
              </div>
              <div
                className="rounded-lg p-3"
                style={{
                  backgroundColor: "var(--surface-sunken)",
                  boxShadow: "var(--elevation-inset)",
                }}
              >
                <p className="text-sm text-text-secondary">
                  {t(s.sunkenSurfaceDesc)}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </ShowcaseSection>
    </>
  );
}
