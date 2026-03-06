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

const bookingSteps = [
  { id: "service", label: "Choose service", summary: "" },
  { id: "time", label: "Select time", summary: "" },
  { id: "confirm", label: "Confirm", summary: "" },
];

/* ── Page ──────────────────────────────────────────── */

export default function ClientPortalPage() {
  const [activeTier, setActiveTier] = useState<(typeof tiers)[number]>("gold");
  const [stampCount, setStampCount] = useState(6);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(0);
  const [selectedSlot, setSelectedSlot] = useState<string>();

  const slots = mockSlots.map((s) => ({
    ...s,
    status: s.id === selectedSlot ? ("selected" as const) : s.status,
  }));

  const stepsWithSummary = bookingSteps.map((step, i) => {
    if (i === 0 && bookingStep > 0) {
      return { ...step, summary: "Hot Stone Massage" };
    }
    if (i === 1 && bookingStep > 1 && selectedSlot) {
      const slot = mockSlots.find((s) => s.id === selectedSlot);
      return { ...step, summary: slot?.time ?? step.label };
    }
    return step;
  });

  const handleSlotSelect = (id: string) => {
    const slot = mockSlots.find((s) => s.id === id);
    if (slot && slot.status === "available") {
      setSelectedSlot(id);
    }
  };

  return (
    <>
      <PageHeader
        title="Client Portal"
        subtitle="Loyalty cards, tier progress, reward offers, and booking flow — the member-facing experience."
      />

      {/* ── Loyalty Card ── */}
      <ShowcaseSection title="Loyalty Card" className="mb-16">
        <div className="stagger-child flex flex-wrap gap-3 mb-6">
          {tiers.map((t) => (
            <Button
              key={t}
              size="sm"
              variant={activeTier === t ? "primary" : "secondary"}
              onClick={() => setActiveTier(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
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
              Card details
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Tier</span>
                <Badge tier={activeTier}>
                  <span className={(activeTier === "gold" || activeTier === "black") ? "text-chrome" : ""}>
                    {activeTier.charAt(0).toUpperCase() + activeTier.slice(1)}
                  </span>
                </Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Points balance</span>
                <span className="font-data font-semibold text-text-primary tabular-nums">
                  4,280
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Next tier</span>
                <span className="text-text-primary">
                  {activeTier === "black" ? "Max tier" : "760 pts away"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 pt-2">
              <RadialProgress
                value={activeTier === "black" ? 100 : 85}
                size={72}
                strokeWidth={6}
                label={activeTier === "black" ? "Max" : "3 more"}
              />
              <p className="text-xs text-text-secondary max-w-[12rem]">
                {activeTier === "black"
                  ? "You've reached the highest tier. Enjoy all benefits!"
                  : "3 more visits to reach the next tier level."}
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
              Embossed membership card with foil sheen, watermark pattern, and tier-specific gradients.
              Hover to see the subtle tilt interaction.
            </p>
          </div>
        </div>
      </ShowcaseSection>

      {/* ── Stamp Card ── */}
      <ShowcaseSection title="Stamp Card" className="mb-16">
        <Card className="p-6 space-y-6">
          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              Progress: {stampCount} of 10
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
              Add Stamp
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setStampCount((c) => Math.max(0, c - 1))}
              disabled={stampCount <= 0}
            >
              Remove Stamp
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setStampCount(0)}
            >
              Reset
            </Button>
          </div>

          <p className="text-xs text-text-tertiary stagger-child">
            5×2 grid of circular stamps. Earned stamps show accent fill with check icon.
            The next stamp pulses with a dashed border animation.
          </p>
        </Card>
      </ShowcaseSection>

      {/* ── Offer Cards ── */}
      <ShowcaseSection title="Reward Offers" className="mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="stagger-child">
            <OfferCard
              offerValue="20% OFF"
              title="Birthday Special"
              description="Valid on any full-price treatment during your birthday month."
              expiryPercent={72}
              expiryLabel="18 days remaining"
            />
          </div>
          <div className="stagger-child">
            <OfferCard
              offerValue="$15"
              title="Referral Reward"
              description="Credit applied when a friend completes their first visit."
              expiryPercent={15}
              expiryLabel="3 days remaining"
            />
          </div>
          <div className="stagger-child">
            <OfferCard
              offerValue="FREE"
              title="Loyalty Facial"
              description="Complimentary classic facial — earned with 10 stamps."
              expiryPercent={3}
              expiryLabel="Expires today"
            />
          </div>
        </div>
        <p className="text-xs text-text-tertiary mt-4">
          Tear-off coupon style with perforation cutouts. Expiry bar shifts from accent to amber at 20%
          and pulses red below 5%.
        </p>
      </ShowcaseSection>

      {/* ── Booking Preview ── */}
      <ShowcaseSection title="Quick Booking" className="mb-16">
        <Card className="p-6">
          <div className="stagger-child">
            <p className="text-sm text-text-secondary mb-4">
              Multi-step booking tray with compressed step chips. Previous selections summarize into the chip labels.
            </p>
            <Button onClick={() => { setBookingOpen(true); setBookingStep(0); setSelectedSlot(undefined); }}>
              Book an Appointment
            </Button>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Chat Interface (moved to /chat) ── */}
      <ShowcaseSection title="Chat Interface" className="mb-16">
        <Card className="p-6">
          <div className="stagger-child">
            <p className="text-sm text-text-secondary mb-3">
              Full-height chat interface demo has moved to a dedicated page.
            </p>
            <a
              href="/chat"
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: "var(--primary)" }}
            >
              View Chat showcase
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Tier Progress ── */}
      <ShowcaseSection title="Tier Progress" className="mb-16">
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
              Horizontal progress bar between two tier badges. Fill uses a gradient from the current
              tier color to the next tier color. Points label centered below. Max tier shows full
              bar with single color.
            </p>
          </div>
        </div>
      </ShowcaseSection>

      {/* ── Appointment Cards ── */}
      <ShowcaseSection title="Appointment Cards" className="mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="stagger-child">
            <AppointmentCard
              serviceName="Hot Stone Massage"
              staffName="with Sarah Mitchell"
              dateTime="Mar 12, 2026 · 2:30 PM"
              status="upcoming"
              onReschedule={() => {}}
              onCancel={() => {}}
            />
          </div>
          <div className="stagger-child">
            <AppointmentCard
              serviceName="Classic Facial"
              staffName="with James Chen"
              dateTime="Feb 28, 2026 · 11:00 AM"
              status="completed"
            />
          </div>
          <div className="stagger-child">
            <AppointmentCard
              serviceName="Gel Manicure"
              staffName="with Priya Sharma"
              dateTime="Feb 20, 2026 · 4:00 PM"
              status="cancelled"
            />
          </div>
        </div>
        <p className="text-xs text-text-tertiary mt-4">
          Appointment cards with service name, staff, date/time, and status badge. Upcoming cards
          show action buttons. Completed shows a checkmark. Cancelled is muted with strikethrough.
        </p>
      </ShowcaseSection>

      {/* ── Membership Plans ── */}
      <ShowcaseSection title="Membership Plans" className="mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="stagger-child">
            <PlanCard
              name="Essential"
              price="$29"
              interval="mo"
              features={[
                { label: "1 treatment per month", included: true },
                { label: "10% product discount", included: true },
                { label: "Online booking", included: true },
                { label: "Priority scheduling", included: false },
                { label: "Guest passes", included: false },
              ]}
            />
          </div>
          <div className="stagger-child">
            <PlanCard
              name="Premium"
              price="$59"
              interval="mo"
              popular
              features={[
                { label: "3 treatments per month", included: true },
                { label: "20% product discount", included: true },
                { label: "Online booking", included: true },
                { label: "Priority scheduling", included: true },
                { label: "Guest passes", included: false },
              ]}
            />
          </div>
          <div className="stagger-child">
            <PlanCard
              name="Black"
              price="$99"
              interval="mo"
              features={[
                { label: "Unlimited treatments", included: true },
                { label: "30% product discount", included: true },
                { label: "Online booking", included: true },
                { label: "Priority scheduling", included: true },
                { label: "2 guest passes per month", included: true },
              ]}
            />
          </div>
        </div>
        <p className="text-xs text-text-tertiary mt-4">
          Three-column plan comparison. Popular variant highlights with accent ring and &ldquo;Most Popular&rdquo; badge.
          Feature checklist with green checkmarks for included items.
        </p>
      </ShowcaseSection>

      {/* ── Profile Summary ── */}
      <ShowcaseSection title="Profile Summary" className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="stagger-child">
            <ProfileSummary
              name="Emma Wellington"
              initials="EW"
              tier={activeTier}
              stats={[
                { label: "Visits", value: "47" },
                { label: "Total Spend", value: "$3,240" },
                { label: "Member Since", value: "Jan 2024" },
              ]}
              onEdit={() => {}}
            />
          </div>
          <div className="stagger-child">
            <p className="text-xs text-text-tertiary">
              Compact profile card with avatar, name, tier badge, key stats row, and edit icon button.
              Avatar displays tier-colored ring. Stats use tabular-nums for alignment.
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
            <p className="text-sm font-medium text-text-primary">Choose a service</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: "hot-stone", name: "Hot Stone Massage", price: "$120", duration: "90 min" },
                { id: "facial", name: "Classic Facial", price: "$85", duration: "60 min" },
                { id: "manicure", name: "Gel Manicure", price: "$45", duration: "45 min" },
                { id: "pedicure", name: "Luxury Pedicure", price: "$65", duration: "60 min" },
              ].map((svc) => (
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
            <p className="text-sm font-medium text-text-primary">Select a time</p>
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
            <p className="text-sm font-medium text-text-primary">Confirm booking</p>
            <div className="rounded-lg bg-surface-sunken p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Service</span>
                <span className="font-medium text-text-primary">Hot Stone Massage</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Time</span>
                <span className="font-medium text-text-primary">
                  {mockSlots.find((s) => s.id === selectedSlot)?.time ?? "—"}
                </span>
              </div>
              <div className="flex justify-between text-sm border-t border-border pt-2 mt-2">
                <span className="text-text-secondary">Total</span>
                <span className="font-semibold text-text-primary">$120</span>
              </div>
            </div>
            <Button
              variant="cta"
              className="w-full"
              onClick={() => setBookingOpen(false)}
            >
              Confirm Booking
            </Button>
          </div>
        )}
      </BookingTray>
    </>
  );
}
