"use client";

import { PageHeader } from "@/components/layout/page-header";
import { ShowcaseSection } from "@/components/layout/showcase-section";
import { Card } from "@/components/primitives/card";
import { LineChart } from "@/components/data-display/line-chart";
import { BarChart } from "@/components/data-display/bar-chart";
import { DonutChart } from "@/components/data-display/donut-chart";
import { useLocale } from "@/lib/i18n";
import { chartsStrings as s } from "@/lib/strings/charts";

export default function ChartsPage() {
  const { t } = useLocale();

  return (
    <>
      <PageHeader
        title={t(s.title)}
        subtitle={t(s.subtitle)}
      />

      {/* ── Revenue Trend (Line Chart) ── */}
      <ShowcaseSection title={t(s.sectionRevenueTrend)} className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              {t(s.monthlyRevenue)}
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
              {t(s.newClientSignups)}
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
          {t(s.lineChartDesc)}
        </p>
      </ShowcaseSection>

      {/* ── Services by Volume (Bar Chart) ── */}
      <ShowcaseSection title={t(s.sectionServicesByVolume)} className="mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              {t(s.treatmentPopularity)}
            </p>
            <div className="stagger-child">
              <BarChart
                data={[
                  { label: t(s.labelMassage), value: 142 },
                  { label: t(s.labelFacial), value: 98 },
                  { label: t(s.labelMani), value: 76 },
                  { label: t(s.labelPedi), value: 64 },
                  { label: t(s.labelAroma), value: 53 },
                  { label: t(s.labelLash), value: 41 },
                ]}
              />
            </div>
          </Card>
          <Card className="p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              {t(s.revenueByService)}
            </p>
            <div className="stagger-child">
              <BarChart
                data={[
                  { label: t(s.labelMassage), value: 17040 },
                  { label: t(s.labelFacial), value: 8330 },
                  { label: t(s.labelMani), value: 3420 },
                  { label: t(s.labelPedi), value: 4160 },
                  { label: t(s.labelAroma), value: 5830 },
                  { label: t(s.labelLash), value: 2870 },
                ]}
              />
            </div>
          </Card>
        </div>
        <p className="text-xs text-text-tertiary mt-4">
          {t(s.barChartDesc)}
        </p>
      </ShowcaseSection>

      {/* ── Tier Distribution (Donut Chart) ── */}
      <ShowcaseSection title={t(s.sectionTierDistribution)} className="mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="p-6 flex justify-center">
            <div className="stagger-child text-center">
              <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
                {t(s.membershipTiers)}
              </p>
              <DonutChart
                data={[
                  { label: t(s.labelBronze), value: 420, color: "var(--tier-bronze)" },
                  { label: t(s.labelSilver), value: 280, color: "var(--tier-silver)" },
                  { label: t(s.labelGold), value: 150, color: "var(--tier-gold)" },
                  { label: t(s.labelBlack), value: 45, color: "var(--tier-black)" },
                ]}
                centerLabel="895"
                centerSub={t(s.members)}
              />
            </div>
          </Card>
          <Card className="p-6 flex justify-center">
            <div className="stagger-child text-center">
              <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
                {t(s.serviceCategorySplit)}
              </p>
              <DonutChart
                data={[
                  { label: t(s.labelBody), value: 195 },
                  { label: t(s.labelFace), value: 139 },
                  { label: t(s.labelNails), value: 140 },
                  { label: t(s.labelLashBrow), value: 41 },
                ]}
                centerLabel="515"
                centerSub={t(s.bookings)}
              />
            </div>
          </Card>
          <Card className="p-6 flex justify-center">
            <div className="stagger-child text-center">
              <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
                {t(s.revenueSources)}
              </p>
              <DonutChart
                data={[
                  { label: t(s.labelTreatments), value: 68 },
                  { label: t(s.labelProducts), value: 18 },
                  { label: t(s.labelMemberships), value: 14 },
                ]}
                centerLabel="$41k"
                centerSub={t(s.total)}
              />
            </div>
          </Card>
        </div>
        <p className="text-xs text-text-tertiary mt-4">
          {t(s.donutChartDesc)}
        </p>
      </ShowcaseSection>
    </>
  );
}
