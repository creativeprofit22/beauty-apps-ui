"use client";

import { PageHeader } from "@/components/layout/page-header";
import { ShowcaseSection } from "@/components/layout/showcase-section";
import { Card } from "@/components/primitives/card";
import { LineChart } from "@/components/data-display/line-chart";
import { BarChart } from "@/components/data-display/bar-chart";
import { DonutChart } from "@/components/data-display/donut-chart";

export default function ChartsPage() {
  return (
    <>
      <PageHeader
        title="Charts"
        subtitle="Line, bar, and donut chart components with multiple datasets — revenue trends, service popularity, and tier distribution."
      />

      {/* ── Revenue Trend (Line Chart) ── */}
      <ShowcaseSection title="Revenue Trend (Line Chart)" className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              Monthly Revenue — 2026
            </p>
            <div className="stagger-child">
              <LineChart
                data={[
                  { label: "Jan", value: 4200 },
                  { label: "Feb", value: 3800 },
                  { label: "Mar", value: 5100 },
                  { label: "Apr", value: 4700 },
                  { label: "May", value: 5800 },
                  { label: "Jun", value: 6200 },
                  { label: "Jul", value: 5900 },
                ]}
                color="var(--primary)"
              />
            </div>
          </Card>
          <Card className="p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              New Client Sign-ups
            </p>
            <div className="stagger-child">
              <LineChart
                data={[
                  { label: "Jan", value: 12 },
                  { label: "Feb", value: 18 },
                  { label: "Mar", value: 15 },
                  { label: "Apr", value: 22 },
                  { label: "May", value: 28 },
                  { label: "Jun", value: 25 },
                  { label: "Jul", value: 31 },
                ]}
                color="var(--accent)"
              />
            </div>
          </Card>
        </div>
        <p className="text-xs text-text-tertiary mt-4">
          SVG-based line chart with animated path drawing, dot hover tooltips, and responsive width.
          Accepts any CSS color variable for theming.
        </p>
      </ShowcaseSection>

      {/* ── Services by Volume (Bar Chart) ── */}
      <ShowcaseSection title="Services by Volume (Bar Chart)" className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              Treatment Popularity
            </p>
            <div className="stagger-child">
              <BarChart
                data={[
                  { label: "Massage", value: 142 },
                  { label: "Facial", value: 98 },
                  { label: "Mani", value: 76 },
                  { label: "Pedi", value: 64 },
                  { label: "Aroma", value: 53 },
                  { label: "Lash", value: 41 },
                ]}
              />
            </div>
          </Card>
          <Card className="p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              Revenue by Service
            </p>
            <div className="stagger-child">
              <BarChart
                data={[
                  { label: "Massage", value: 17040 },
                  { label: "Facial", value: 8330 },
                  { label: "Mani", value: 3420 },
                  { label: "Pedi", value: 4160 },
                  { label: "Aroma", value: 5830 },
                  { label: "Lash", value: 2870 },
                ]}
              />
            </div>
          </Card>
        </div>
        <p className="text-xs text-text-tertiary mt-4">
          SVG bar chart with animated height transitions, hover highlight, and value labels.
        </p>
      </ShowcaseSection>

      {/* ── Tier Distribution (Donut Chart) ── */}
      <ShowcaseSection title="Loyalty Tier Distribution (Donut Chart)" className="mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 flex justify-center">
            <div className="stagger-child text-center">
              <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
                Membership Tiers
              </p>
              <DonutChart
                data={[
                  { label: "Bronze", value: 420, color: "var(--tier-bronze)" },
                  { label: "Silver", value: 280, color: "var(--tier-silver)" },
                  { label: "Gold", value: 150, color: "var(--tier-gold)" },
                  { label: "Black", value: 45, color: "var(--tier-black)" },
                ]}
                centerLabel="895"
                centerSub="members"
              />
            </div>
          </Card>
          <Card className="p-6 flex justify-center">
            <div className="stagger-child text-center">
              <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
                Service Category Split
              </p>
              <DonutChart
                data={[
                  { label: "Body", value: 195 },
                  { label: "Face", value: 139 },
                  { label: "Nails", value: 140 },
                  { label: "Lash & Brow", value: 41 },
                ]}
                centerLabel="515"
                centerSub="bookings"
              />
            </div>
          </Card>
          <Card className="p-6 flex justify-center">
            <div className="stagger-child text-center">
              <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
                Revenue Sources
              </p>
              <DonutChart
                data={[
                  { label: "Treatments", value: 68 },
                  { label: "Products", value: 18 },
                  { label: "Memberships", value: 14 },
                ]}
                centerLabel="$41k"
                centerSub="total"
              />
            </div>
          </Card>
        </div>
        <p className="text-xs text-text-tertiary mt-4">
          SVG donut chart with animated segment drawing, hover expansion, center label, and legend.
          Supports custom segment colors or falls back to theme palette.
        </p>
      </ShowcaseSection>
    </>
  );
}
