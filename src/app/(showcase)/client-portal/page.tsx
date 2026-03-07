"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { ShowcaseSection } from "@/components/layout/showcase-section";
import { Card } from "@/components/primitives/card";
import { Button } from "@/components/primitives/button";
import { Badge } from "@/components/primitives/badge";
import { LoyaltyCard } from "@/components/data-display/loyalty-card";
import { OfferCard } from "@/components/data-display/offer-card";
import { StampCard } from "@/components/engagement/stamp-card";
import { BookingTray } from "@/components/forms/booking-tray";
import { SlotGrid } from "@/components/forms/slot-grid";
import { RadialProgress } from "@/components/data-display/radial-progress";
import { TierProgress } from "@/components/data-display/tier-progress";
import { AppointmentCard } from "@/components/data-display/appointment-card";
import { PlanCard } from "@/components/data-display/plan-card";
import { ProfileSummary } from "@/components/data-display/profile-summary";
import { skinConfig } from "@/skin/config";
import { useLocale } from "@/lib/i18n";
import { clientPortalStrings as s } from "@/lib/strings/client-portal";

/* ── Mock data ───────────────────────────────────────── */

const tiers = ["bronze", "silver", "gold", "black"] as const;

const mockSlots = [
  { id: "s1", time: "9:00", status: "available" as const },
  { id: "s2", time: "9:30", status: "available" as const },
  { id: "s3", time: "10:00", status: "unavailable" as const },
  { id: "s4", time: "10:30", status: "available" as const },
  { id: "s5", time: "11:00", status: "available" as const },
  { id: "s6", time: "11:30", status: "unavailable" as const },
  { id: "s7", time: "12:00", status: "available" as const },
  { id: "s8", time: "12:30", status: "available" as const },
];

/* ── Page ──────────────────────────────────────────── */

export default function ClientPortalPage() {
  const { t } = useLocale();
  const [activeTier, setActiveTier] = useState<(typeof tiers)[number]>("gold");
  const [stampCount, setStampCount] = useState(6);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<string>();

  const bookingSteps = [
    { id: "service", label: t(s.stepChooseService), summary: "" },
    { id: "time", label: t(s.stepSelectTime), summary: "" },
    { id: "confirm", label: t(s.stepConfirm), summary: "" },
  ];

  const slots = mockSlots.map((sl) => ({
    ...sl,
    status: sl.id === selectedSlot ? ("selected" as const) : sl.status,
  }));

  const stepsWithSummary = bookingSteps.map((step, i) => {
    if (i === 0 && bookingStep > 0) {
      return { ...step, summary: t(s.svcHotStoneMassage) };
    }
    if (i === 1 && bookingStep > 1 && selectedSlot) {
      const slot = mockSlots.find((sl) => sl.id === selectedSlot);
      return { ...step, summary: slot?.time ?? step.label };
    }
    return step;
  });

  const handleSlotSelect = (id: string) => {
    const slot = mockSlots.find((sl) => sl.id === id);
    if (slot && slot.status === "available") {
      setSelectedSlot(id);
    }
  };

  const bookingServices = [
    { id: "hot-stone", name: t(s.svcHotStoneMassage), price: "$120", duration: t(s.dur90Min) },
    { id: "facial", name: t(s.svcClassicFacial), price: "$85", duration: t(s.dur60Min) },
    { id: "manicure", name: t(s.svcGelManicure), price: "$45", duration: t(s.dur45Min) },
    { id: "pedicure", name: t(s.svcLuxuryPedicure), price: "$65", duration: t(s.dur60Min) },
  ];

  return (
    <>
      <PageHeader
        title={t(s.title)}
        subtitle={t(s.subtitle)}
      />

      {/* ── Loyalty Card ── */}
      <ShowcaseSection title={t(s.sectionLoyaltyCard)} className="mb-16">
        <div className="stagger-child flex flex-wrap gap-3 mb-6">
          {tiers.map((tier) => (
            <Button
              key={tier}
              size="sm"
              variant={activeTier === tier ? "primary" : "secondary"}
              onClick={() => setActiveTier(tier)}
            >
              {tier.charAt(0).toUpperCase() + tier.slice(1)}
            </Button>
          ))}
        </div>
        <div className="stagger-child grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="max-w-sm">
            <LoyaltyCard
              tier={activeTier}
              memberName="Emma Wellington"
              memberId="SPA-2026-00417"
              watermarkSvg={skinConfig.cardWatermarkSvg}
            />
          </div>
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary">
              {t(s.cardDetails)}
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">{t(s.tier)}</span>
                <Badge tier={activeTier}>
                  <span className={(activeTier === "gold" || activeTier === "black") ? "text-chrome" : ""}>
                    {activeTier.charAt(0).toUpperCase() + activeTier.slice(1)}
                  </span>
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">{t(s.pointsBalance)}</span>
                <span className="font-data font-semibold text-text-primary tabular-nums">
                  4,280
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">{t(s.nextTier)}</span>
                <span className="text-text-primary">
                  {activeTier === "black" ? t(s.maxTier) : t(s.ptsAway)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <RadialProgress
                value={activeTier === "black" ? 100 : 85}
                size={72}
                strokeWidth={6}
                label={activeTier === "black" ? t(s.radialMax) : t(s.radial3More)}
              />
              <p className="text-xs text-text-secondary max-w-[12rem]">
                {activeTier === "black" ? t(s.maxTierMsg) : t(s.nextTierMsg)}
              </p>
            </div>
            {/* Nail polish swatch motif — renders only when skin provides swatchColors */}
            {"swatchColors" in skinConfig && (
              <div className="nail-swatch pt-2" aria-hidden="true">
                {(skinConfig as { swatchColors: readonly string[] }).swatchColors.map((color, i) => (
                  <span
                    key={i}
                    className="nail-swatch-dot"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            )}
            <p className="text-xs text-text-tertiary mt-2">
              {t(s.loyaltyCardDesc)}
            </p>
          </div>
        </div>
      </ShowcaseSection>

      {/* ── Stamp Card ── */}
      <ShowcaseSection title={t(s.sectionStampCard)} className="mb-16">
        <Card className="p-6 space-y-6">
          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              {t(s.stampProgress)} {stampCount} {t(s.stampOf)} 10
            </p>
            <div className="max-w-xs">
              <StampCard earned={stampCount} />
            </div>
          </div>

          <div className="stagger-child flex flex-wrap gap-3">
            <Button
              size="sm"
              variant="primary"
              onClick={() => setStampCount((c) => Math.min(10, c + 1))}
              disabled={stampCount >= 10}
            >
              {t(s.addStamp)}
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setStampCount((c) => Math.max(0, c - 1))}
              disabled={stampCount <= 0}
            >
              {t(s.removeStamp)}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setStampCount(0)}
            >
              {t(s.reset)}
            </Button>
          </div>

          <p className="text-xs text-text-tertiary stagger-child">
            {t(s.stampCardDesc)}
          </p>
        </Card>
      </ShowcaseSection>

      {/* ── Offer Cards ── */}
      <ShowcaseSection title={t(s.sectionRewardOffers)} className="mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="stagger-child">
            <OfferCard
              offerValue="20% OFF"
              title={t(s.offerBirthdayTitle)}
              description={t(s.offerBirthdayDesc)}
              expiryPercent={72}
              expiryLabel={t(s.offerBirthdayExpiry)}
            />
          </div>
          <div className="stagger-child">
            <OfferCard
              offerValue="$15"
              title={t(s.offerReferralTitle)}
              description={t(s.offerReferralDesc)}
              expiryPercent={15}
              expiryLabel={t(s.offerReferralExpiry)}
            />
          </div>
          <div className="stagger-child">
            <OfferCard
              offerValue="FREE"
              title={t(s.offerLoyaltyTitle)}
              description={t(s.offerLoyaltyDesc)}
              expiryPercent={3}
              expiryLabel={t(s.offerLoyaltyExpiry)}
            />
          </div>
        </div>
        <p className="text-xs text-text-tertiary mt-4">
          {t(s.offerCardsDesc)}
        </p>
      </ShowcaseSection>

      {/* ── Booking Preview ── */}
      <ShowcaseSection title={t(s.sectionQuickBooking)} className="mb-16">
        <Card className="p-6">
          <div className="stagger-child">
            <p className="text-sm text-text-secondary mb-4">
              {t(s.bookingDesc)}
            </p>
            <Button onClick={() => { setBookingOpen(true); setBookingStep(0); setSelectedSlot(undefined); }}>
              {t(s.bookAnAppointment)}
            </Button>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Chat Interface (moved to /chat) ── */}
      <ShowcaseSection title={t(s.sectionChatInterface)} className="mb-16">
        <Card className="p-6">
          <div className="stagger-child">
            <p className="text-sm text-text-secondary mb-3">
              {t(s.chatDesc)}
            </p>
            <a
              href="/chat"
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: "var(--primary)" }}
            >
              {t(s.viewChatShowcase)}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Tier Progress ── */}
      <ShowcaseSection title={t(s.sectionTierProgress)} className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="stagger-child space-y-4">
            <TierProgress
              currentTier="bronze"
              nextTier="silver"
              currentPoints={450}
              targetPoints={1000}
            />
            <TierProgress
              currentTier="silver"
              nextTier="gold"
              currentPoints={780}
              targetPoints={1000}
            />
            <TierProgress
              currentTier="gold"
              nextTier="black"
              currentPoints={2400}
              targetPoints={5000}
            />
            <TierProgress
              currentTier="black"
              nextTier="black"
              currentPoints={5000}
              targetPoints={5000}
            />
          </div>
          <div className="stagger-child">
            <p className="text-xs text-text-tertiary">
              {t(s.tierProgressDesc)}
            </p>
          </div>
        </div>
      </ShowcaseSection>

      {/* ── Appointment Cards ── */}
      <ShowcaseSection title={t(s.sectionAppointmentCards)} className="mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="stagger-child">
            <AppointmentCard
              serviceName={t(s.apptHotStoneMassage)}
              staffName={t(s.apptWithSarah)}
              dateTime="Mar 12, 2026 · 2:30 PM"
              status="upcoming"
              onReschedule={() => {}}
              onCancel={() => {}}
            />
          </div>
          <div className="stagger-child">
            <AppointmentCard
              serviceName={t(s.apptClassicFacial)}
              staffName={t(s.apptWithJames)}
              dateTime="Feb 28, 2026 · 11:00 AM"
              status="completed"
            />
          </div>
          <div className="stagger-child">
            <AppointmentCard
              serviceName={t(s.apptGelManicure)}
              staffName={t(s.apptWithPriya)}
              dateTime="Feb 20, 2026 · 4:00 PM"
              status="cancelled"
            />
          </div>
        </div>
        <p className="text-xs text-text-tertiary mt-4">
          {t(s.apptCardsDesc)}
        </p>
      </ShowcaseSection>

      {/* ── Membership Plans ── */}
      <ShowcaseSection title={t(s.sectionMembershipPlans)} className="mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="stagger-child">
            <PlanCard
              name={t(s.planEssential)}
              price="$29"
              interval={t(s.planInterval)}
              features={[
                { label: t(s.feat1Treatment), included: true },
                { label: t(s.feat10Discount), included: true },
                { label: t(s.featOnlineBooking), included: true },
                { label: t(s.featPriorityScheduling), included: false },
                { label: t(s.featGuestPasses), included: false },
              ]}
            />
          </div>
          <div className="stagger-child">
            <PlanCard
              name={t(s.planPremium)}
              price="$59"
              interval={t(s.planInterval)}
              popular
              features={[
                { label: t(s.feat3Treatments), included: true },
                { label: t(s.feat20Discount), included: true },
                { label: t(s.featOnlineBooking), included: true },
                { label: t(s.featPriorityScheduling), included: true },
                { label: t(s.featGuestPasses), included: false },
              ]}
            />
          </div>
          <div className="stagger-child">
            <PlanCard
              name={t(s.planBlack)}
              price="$99"
              interval={t(s.planInterval)}
              features={[
                { label: t(s.featUnlimited), included: true },
                { label: t(s.feat30Discount), included: true },
                { label: t(s.featOnlineBooking), included: true },
                { label: t(s.featPriorityScheduling), included: true },
                { label: t(s.feat2GuestPasses), included: true },
              ]}
            />
          </div>
        </div>
        <p className="text-xs text-text-tertiary mt-4">
          {t(s.planCardsDesc)}
        </p>
      </ShowcaseSection>

      {/* ── Profile Summary ── */}
      <ShowcaseSection title={t(s.sectionProfileSummary)} className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="stagger-child">
            <ProfileSummary
              name="Emma Wellington"
              initials="EW"
              tier={activeTier}
              stats={[
                { label: t(s.statVisits), value: "47" },
                { label: t(s.statTotalSpend), value: "$3,240" },
                { label: t(s.statMemberSince), value: "Jan 2024" },
              ]}
              onEdit={() => {}}
            />
          </div>
          <div className="stagger-child">
            <p className="text-xs text-text-tertiary">
              {t(s.profileDesc)}
            </p>
          </div>
        </div>
      </ShowcaseSection>

      {/* Booking tray modal */}
      <BookingTray
        open={bookingOpen}
        onClose={() => setBookingOpen(false)}
        steps={stepsWithSummary}
        activeStep={bookingStep}
        onStepClick={(i) => setBookingStep(i)}
      >
        {bookingStep === 0 && (
          <div className="space-y-4">
            <p className="text-sm font-medium text-text-primary">{t(s.chooseAService)}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {bookingServices.map((svc) => (
                <button
                  key={svc.id}
                  type="button"
                  onClick={() => setBookingStep(1)}
                  className="rounded-lg p-3 text-left bg-surface-interactive hover:bg-surface-interactive-hover transition-colors"
                  style={{ transitionDuration: "var(--duration-fast)" }}
                >
                  <p className="text-sm font-medium text-text-primary">{svc.name}</p>
                  <p className="text-xs text-text-tertiary mt-0.5">
                    {svc.price} · {svc.duration}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {bookingStep === 1 && (
          <div className="space-y-4">
            <p className="text-sm font-medium text-text-primary">{t(s.selectATime)}</p>
            <SlotGrid
              slots={slots}
              onSelect={(id) => {
                handleSlotSelect(id);
                setBookingStep(2);
              }}
            />
          </div>
        )}

        {bookingStep === 2 && (
          <div className="space-y-4">
            <p className="text-sm font-medium text-text-primary">{t(s.confirmBooking)}</p>
            <div className="rounded-lg bg-surface-sunken p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">{t(s.service)}</span>
                <span className="font-medium text-text-primary">{t(s.svcHotStoneMassage)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">{t(s.time)}</span>
                <span className="font-medium text-text-primary">
                  {mockSlots.find((sl) => sl.id === selectedSlot)?.time ?? "\u2014"}
                </span>
              </div>
              <div className="flex justify-between text-sm border-t border-border pt-2 mt-2">
                <span className="text-text-secondary">{t(s.total)}</span>
                <span className="font-semibold text-text-primary">$120</span>
              </div>
            </div>
            <Button
              variant="cta"
              className="w-full"
              onClick={() => setBookingOpen(false)}
            >
              {t(s.confirmBookingBtn)}
            </Button>
          </div>
        )}
      </BookingTray>
    </>
  );
}
