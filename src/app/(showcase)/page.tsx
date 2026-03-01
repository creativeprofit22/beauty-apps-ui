"use client";

import { PageHeader } from "@/components/layout/page-header";
import { ShowcaseSection } from "@/components/layout/showcase-section";
import { Card } from "@/components/primitives/card";
import { cn } from "@/lib/utils";

/* ── Token data ────────────────────────────────────────── */

const surfaceTokens = [
  { name: "surface-base", var: "--surface-base" },
  { name: "surface-raised", var: "--surface-raised" },
  { name: "surface-overlay", var: "--surface-overlay" },
  { name: "surface-sunken", var: "--surface-sunken" },
  { name: "surface-interactive", var: "--surface-interactive" },
  { name: "surface-interactive-hover", var: "--surface-interactive-hover" },
] as const;

const textTokens = [
  { name: "text-primary", var: "--text-primary" },
  { name: "text-secondary", var: "--text-secondary" },
  { name: "text-tertiary", var: "--text-tertiary" },
  { name: "text-inverse", var: "--text-inverse", dark: true },
  { name: "text-on-accent", var: "--text-on-accent", dark: true },
] as const;

const accentTokens = [
  { name: "primary", var: "--primary" },
  { name: "primary-hover", var: "--primary-hover" },
  { name: "primary-muted", var: "--primary-muted" },
  { name: "secondary", var: "--secondary" },
  { name: "secondary-hover", var: "--secondary-hover" },
  { name: "secondary-muted", var: "--secondary-muted" },
  { name: "accent", var: "--accent" },
  { name: "accent-hover", var: "--accent-hover" },
  { name: "accent-muted", var: "--accent-muted" },
] as const;

const semanticTokens = [
  { name: "success", var: "--success" },
  { name: "success-muted", var: "--success-muted" },
  { name: "warning", var: "--warning" },
  { name: "warning-muted", var: "--warning-muted" },
  { name: "error", var: "--error" },
  { name: "error-muted", var: "--error-muted" },
  { name: "info", var: "--info" },
  { name: "info-muted", var: "--info-muted" },
] as const;

const tierTokens = [
  { name: "tier-bronze", var: "--tier-bronze" },
  { name: "tier-bronze-muted", var: "--tier-bronze-muted" },
  { name: "tier-silver", var: "--tier-silver" },
  { name: "tier-silver-muted", var: "--tier-silver-muted" },
  { name: "tier-gold", var: "--tier-gold" },
  { name: "tier-gold-muted", var: "--tier-gold-muted" },
  { name: "tier-black", var: "--tier-black" },
  { name: "tier-black-muted", var: "--tier-black-muted" },
] as const;

const spacingScale = [
  { name: "0", value: "0px", px: 0 },
  { name: "0.5", value: "2px", px: 2 },
  { name: "1", value: "4px", px: 4 },
  { name: "1.5", value: "6px", px: 6 },
  { name: "2", value: "8px", px: 8 },
  { name: "3", value: "12px", px: 12 },
  { name: "4", value: "16px", px: 16 },
  { name: "5", value: "20px", px: 20 },
  { name: "6", value: "24px", px: 24 },
  { name: "8", value: "32px", px: 32 },
  { name: "10", value: "40px", px: 40 },
  { name: "12", value: "48px", px: 48 },
  { name: "16", value: "64px", px: 64 },
  { name: "20", value: "80px", px: 80 },
  { name: "24", value: "96px", px: 96 },
] as const;

const radiusTokens = [
  { name: "xs", var: "--radii-xs", value: "4px" },
  { name: "sm", var: "--radii-sm", value: "6px" },
  { name: "md", var: "--radii-md", value: "10px" },
  { name: "lg", var: "--radii-lg", value: "14px" },
  { name: "xl", var: "--radii-xl", value: "20px" },
  { name: "2xl", var: "--radii-2xl", value: "28px" },
  { name: "full", var: "--radii-full", value: "9999px" },
] as const;

const shadowTokens = [
  { name: "xs", cssVar: "--elevation-xs" },
  { name: "sm", cssVar: "--elevation-sm" },
  { name: "md", cssVar: "--elevation-md" },
  { name: "lg", cssVar: "--elevation-lg" },
  { name: "xl", cssVar: "--elevation-xl" },
  { name: "card", cssVar: "--elevation-card" },
  { name: "inset", cssVar: "--elevation-inset" },
] as const;

const glowTokens = [
  { name: "primary", cssVar: "--glow-primary" },
  { name: "secondary", cssVar: "--glow-secondary" },
  { name: "accent", cssVar: "--glow-accent" },
  { name: "success", cssVar: "--glow-success" },
  { name: "warning", cssVar: "--glow-warning" },
  { name: "error", cssVar: "--glow-error" },
] as const;

/* ── Reusable swatch ──────────────────────────────────── */

function ColorSwatch({
  name,
  cssVar,
}: {
  name: string;
  cssVar: string;
  darkBg?: boolean;
}) {
  return (
    <div className="stagger-child flex items-center gap-3">
      <div
        className="w-12 h-12 rounded-lg border border-border shadow-xs shrink-0 ring-1 ring-inset ring-black/10"
        style={{ backgroundColor: `var(${cssVar})` }}
      />
      <div className="min-w-0">
        <p className="text-sm font-medium text-text-primary truncate">{name}</p>
        <p className="font-data text-xs text-text-tertiary truncate">{cssVar}</p>
      </div>
    </div>
  );
}

/* ── Side-by-side light/dark wrapper ──────────────────── */

function LightDarkPair({ children }: { children: (mode: "light" | "dark") => React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6 overflow-hidden">
        <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
          Light
        </p>
        <div className="bg-surface-base rounded-lg p-4 space-y-4">
          {children("light")}
        </div>
      </Card>
      <Card className="p-6 overflow-hidden dark">
        <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
          Dark
        </p>
        <div className="bg-surface-sunken rounded-lg p-4 space-y-4">
          {children("dark")}
        </div>
      </Card>
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────── */

export default function TokensPage() {
  return (
    <>
      <PageHeader
        title="Design Tokens"
        subtitle="Color swatches, spacing, radii, shadows, and glows — the foundational values that drive every component."
      />

      {/* ── Surface Colors ── */}
      <ShowcaseSection title="Surfaces" className="mb-16">
        <LightDarkPair>
          {() => (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {surfaceTokens.map((t) => (
                <ColorSwatch key={t.name} name={t.name} cssVar={t.var} />
              ))}
            </div>
          )}
        </LightDarkPair>
      </ShowcaseSection>

      {/* ── Text Colors ── */}
      <ShowcaseSection title="Text" className="mb-16">
        <LightDarkPair>
          {() => (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {textTokens.map((t) => (
                <ColorSwatch key={t.name} name={t.name} cssVar={t.var} darkBg={"dark" in t} />
              ))}
            </div>
          )}
        </LightDarkPair>
      </ShowcaseSection>

      {/* ── Brand / Accent Colors ── */}
      <ShowcaseSection title="Brand & Accent" className="mb-16">
        <LightDarkPair>
          {() => (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {accentTokens.map((t) => (
                <ColorSwatch key={t.name} name={t.name} cssVar={t.var} />
              ))}
            </div>
          )}
        </LightDarkPair>
      </ShowcaseSection>

      {/* ── Semantic Colors ── */}
      <ShowcaseSection title="Semantic" className="mb-16">
        <LightDarkPair>
          {() => (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {semanticTokens.map((t) => (
                <ColorSwatch key={t.name} name={t.name} cssVar={t.var} />
              ))}
            </div>
          )}
        </LightDarkPair>
      </ShowcaseSection>

      {/* ── Tier Colors ── */}
      <ShowcaseSection title="Tiers" className="mb-16">
        <LightDarkPair>
          {() => (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {tierTokens.map((t) => (
                <ColorSwatch key={t.name} name={t.name} cssVar={t.var} />
              ))}
            </div>
          )}
        </LightDarkPair>
      </ShowcaseSection>

      {/* ── Spacing Scale ── */}
      <ShowcaseSection title="Spacing Scale" className="mb-16">
        <Card className="p-6 overflow-x-auto">
          <div className="space-y-3">
            {spacingScale.map((s) => (
              <div key={s.name} className="stagger-child flex items-center gap-4">
                <span className="font-data text-xs text-text-tertiary w-8 text-right shrink-0">
                  {s.name}
                </span>
                <div
                  className="h-3 rounded-sm bg-secondary"
                  style={{ width: `${Math.max(s.px, 2)}px` }}
                />
                <span className="font-data text-xs text-text-secondary">{s.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Radius Samples ── */}
      <ShowcaseSection title="Border Radii" className="mb-16">
        <Card className="p-6">
          <div className="flex flex-wrap gap-6">
            {radiusTokens.map((r) => (
              <div key={r.name} className="stagger-child flex flex-col items-center gap-2">
                <div
                  className="w-16 h-16 bg-secondary"
                  style={{ borderRadius: `var(${r.var})` }}
                />
                <span className="text-xs font-medium text-text-primary">{r.name}</span>
                <span className="font-data text-xs text-text-tertiary">{r.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Shadow Samples ── */}
      <ShowcaseSection title="Elevation / Shadows" className="mb-16">
        <LightDarkPair>
          {() => (
            <div className="flex flex-wrap gap-6">
              {shadowTokens.map((s) => (
                <div key={s.name} className="stagger-child flex flex-col items-center gap-2">
                  <div
                    className="w-20 h-20 rounded-lg bg-surface-overlay border border-border"
                    style={{ boxShadow: `var(${s.cssVar})` }}
                  />
                  <span className="text-xs font-medium text-text-primary">{s.name}</span>
                </div>
              ))}
            </div>
          )}
        </LightDarkPair>
      </ShowcaseSection>

      {/* ── Glow Samples ── */}
      <ShowcaseSection title="Glows" className="mb-16">
        <LightDarkPair>
          {() => (
            <div className="flex flex-wrap gap-6">
              {glowTokens.map((g) => (
                <div key={g.name} className="stagger-child flex flex-col items-center gap-2">
                  <div
                    className="w-16 h-16 rounded-full bg-surface-overlay border border-border ring-1 ring-inset ring-black/10"
                    style={{ boxShadow: `var(${g.cssVar})` }}
                  />
                  <span className="text-xs font-medium text-text-primary">{g.name}</span>
                </div>
              ))}
            </div>
          )}
        </LightDarkPair>
      </ShowcaseSection>

      {/* ── Seasonal Accent Preview ── */}
      <ShowcaseSection title="Seasonal Theming" className="mb-16">
        <p className="text-sm text-text-secondary mb-6">
          Lightweight accent layers activated via <code className="font-data text-xs bg-surface-sunken px-1.5 py-0.5 rounded">data-season</code> on the root element.
          Use the season dropdown in the sidebar to preview live. Below shows reference colors per season.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {([
            {
              label: "Default",
              colors: [
                { token: "--accent", value: "oklch(0.62 0.06 148)" },
                { token: "--accent-hover", value: "oklch(0.56 0.08 148)" },
                { token: "--accent-muted", value: "oklch(0.92 0.02 148)" },
                { token: "--border-accent", value: "oklch(0.82 0.06 72)" },
              ],
            },
            {
              label: "Valentine",
              colors: [
                { token: "--accent", value: "oklch(0.65 0.14 358)" },
                { token: "--accent-hover", value: "oklch(0.58 0.16 358)" },
                { token: "--accent-muted", value: "oklch(0.92 0.04 358)" },
                { token: "--border-accent", value: "oklch(0.65 0.14 358)" },
              ],
            },
            {
              label: "Spring",
              colors: [
                { token: "--accent", value: "oklch(0.68 0.10 145)" },
                { token: "--accent-hover", value: "oklch(0.62 0.12 145)" },
                { token: "--accent-muted", value: "oklch(0.93 0.03 145)" },
                { token: "--border-accent", value: "oklch(0.68 0.10 145)" },
              ],
            },
            {
              label: "Holiday",
              colors: [
                { token: "--accent", value: "oklch(0.55 0.12 145)" },
                { token: "--accent-hover", value: "oklch(0.50 0.14 145)" },
                { token: "--accent-muted", value: "oklch(0.92 0.03 145)" },
                { token: "--border-accent", value: "oklch(0.72 0.10 85)" },
              ],
            },
          ]).map((s) => (
            <Card key={s.label} className="p-4 overflow-hidden">
              <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-3">
                {s.label}
              </p>
              <div className="space-y-2">
                {s.colors.map((c) => (
                  <div key={c.token} className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-md border border-border shrink-0 ring-1 ring-inset ring-black/10"
                      style={{ backgroundColor: c.value }}
                    />
                    <span className="font-data text-xs text-text-tertiary truncate">
                      {c.token}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
        <p className="text-xs text-text-tertiary mt-4">
          Seasonal layers override only accent and border-accent tokens — a lightweight accent shift, not a full skin swap.
        </p>
      </ShowcaseSection>
    </>
  );
}
