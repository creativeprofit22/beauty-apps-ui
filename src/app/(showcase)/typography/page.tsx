"use client";

import { PageHeader } from "@/components/layout/page-header";
import { ShowcaseSection } from "@/components/layout/showcase-section";
import { Card } from "@/components/primitives/card";

/* ── Type scale data ── */

const typeScale = [
  { name: "5xl", size: "2.986rem", px: "~48px" },
  { name: "4xl", size: "2.488rem", px: "~40px" },
  { name: "3xl", size: "2.074rem", px: "~33px" },
  { name: "2xl", size: "1.728rem", px: "~28px" },
  { name: "xl", size: "1.44rem", px: "~23px" },
  { name: "lg", size: "1.2rem", px: "~19px" },
  { name: "md", size: "1.125rem", px: "18px" },
  { name: "base", size: "1rem", px: "16px" },
  { name: "sm", size: "0.889rem", px: "~14px" },
  { name: "xs", size: "0.833rem", px: "~13px" },
  { name: "2xs", size: "0.694rem", px: "~11px" },
] as const;

const metricScale = [
  { name: "metric-sm", size: "1.5rem", px: "24px" },
  { name: "metric-md", size: "2rem", px: "32px" },
  { name: "metric-lg", size: "2.5rem", px: "40px" },
  { name: "metric-xl", size: "3.5rem", px: "56px" },
] as const;

/* ── Page ── */

export default function TypographyPage() {
  return (
    <>
      <PageHeader
        title="Typography"
        subtitle="Font specimens, type scale ladder, metric displays, gradient text, and tabular numerals."
      />

      {/* ── Font Specimens ── */}
      <ShowcaseSection title="Font Families" className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Space Grotesk */}
          <Card className="p-6">
            <div className="stagger-child space-y-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-1">
                  Display
                </p>
                <p className="font-data text-xs text-text-tertiary">
                  Space Grotesk
                </p>
              </div>
              <p
                className="font-display text-3xl font-bold leading-tight"
                style={{ fontFeatureSettings: '"ss01" on, "ss02" on' }}
              >
                Aa Bb Cc
              </p>
              <p className="font-display text-lg">
                The quick brown fox jumps over the lazy dog
              </p>
              <p className="font-display text-base text-text-secondary">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ
                <br />
                abcdefghijklmnopqrstuvwxyz
                <br />
                0123456789 !@#$%
              </p>
              <p className="text-xs text-text-tertiary">
                Used for headings, titles, display text
              </p>
            </div>
          </Card>

          {/* Inter */}
          <Card className="p-6">
            <div className="stagger-child space-y-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-1">
                  Body
                </p>
                <p className="font-data text-xs text-text-tertiary">Inter</p>
              </div>
              <p
                className="font-body text-3xl font-bold leading-tight"
                style={{ fontFeatureSettings: '"cv01" on, "cv02" on, "ss01" on' }}
              >
                Aa Bb Cc
              </p>
              <p className="font-body text-lg">
                The quick brown fox jumps over the lazy dog
              </p>
              <p className="font-body text-base text-text-secondary">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ
                <br />
                abcdefghijklmnopqrstuvwxyz
                <br />
                0123456789 !@#$%
              </p>
              <p className="text-xs text-text-tertiary">
                Used for body text, labels, descriptions
              </p>
            </div>
          </Card>

          {/* Fira Code */}
          <Card className="p-6">
            <div className="stagger-child space-y-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-1">
                  Data
                </p>
                <p className="font-data text-xs text-text-tertiary">
                  Fira Code
                </p>
              </div>
              <p
                className="font-data text-3xl font-bold leading-tight"
                style={{
                  fontVariantNumeric: "tabular-nums",
                  fontFeatureSettings: '"zero" on, "ss01" on',
                }}
              >
                Aa Bb Cc
              </p>
              <p className="font-data text-lg">
                The quick brown fox jumps over the lazy dog
              </p>
              <p className="font-data text-base text-text-secondary">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ
                <br />
                abcdefghijklmnopqrstuvwxyz
                <br />
                0123456789 !@#$%
              </p>
              <p className="text-xs text-text-tertiary">
                Used for metrics, data tables, codes
              </p>
            </div>
          </Card>
        </div>
      </ShowcaseSection>

      {/* ── Type Scale Ladder ── */}
      <ShowcaseSection title="Type Scale (Minor Third — 1.200)" className="mb-16">
        <Card className="p-6 overflow-x-auto">
          <div className="space-y-4">
            {typeScale.map((step) => (
              <div
                key={step.name}
                className="stagger-child flex items-baseline gap-4"
              >
                <span className="font-data text-xs text-text-tertiary w-10 text-right shrink-0">
                  {step.name}
                </span>
                <span
                  className="font-display font-semibold text-text-primary min-w-0"
                  style={{ fontSize: step.size }}
                >
                  Design Tokens
                </span>
                <span className="font-data text-xs text-text-tertiary whitespace-nowrap shrink-0">
                  {step.size} ({step.px})
                </span>
              </div>
            ))}
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Metric Display Scale ── */}
      <ShowcaseSection title="Metric Display Scale" className="mb-16">
        <Card className="p-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {metricScale.map((step) => (
              <div key={step.name} className="stagger-child text-center">
                <p
                  className="font-data font-bold text-text-primary"
                  style={{
                    fontSize: step.size,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  1,234
                </p>
                <p className="text-xs text-text-tertiary mt-1">{step.name}</p>
                <p className="font-data text-xs text-text-tertiary">
                  {step.size} ({step.px})
                </p>
              </div>
            ))}
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Gradient Text ── */}
      <ShowcaseSection title="Gradient Text" className="mb-16">
        <Card className="p-6">
          <div className="space-y-6">
            <div className="stagger-child">
              <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-2">
                Primary Gradient
              </p>
              <p className="font-display text-4xl font-bold text-gradient text-gradient-primary">
                Beautiful Typography
              </p>
            </div>
            <div className="stagger-child">
              <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-2">
                Warm Gradient
              </p>
              <p className="font-display text-4xl font-bold text-gradient text-gradient-warm">
                Warm Luxury Feel
              </p>
            </div>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Tabular Nums Demo ── */}
      <ShowcaseSection title="Tabular Numerals" className="mb-16">
        <Card className="p-6">
          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              Proportional vs Tabular — numbers align vertically with tabular-nums
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm font-medium text-text-secondary mb-2">
                  Proportional (default)
                </p>
                <div className="font-body text-2xl text-text-primary space-y-1">
                  <p>1,111,111</p>
                  <p>2,222,222</p>
                  <p>3,030,303</p>
                  <p>4,848,484</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-text-secondary mb-2">
                  Tabular (font-data)
                </p>
                <div
                  className="font-data text-2xl text-text-primary space-y-1"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  <p>1,111,111</p>
                  <p>2,222,222</p>
                  <p>3,030,303</p>
                  <p>4,848,484</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </ShowcaseSection>
    </>
  );
}
