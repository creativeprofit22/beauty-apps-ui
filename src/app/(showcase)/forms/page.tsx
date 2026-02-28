"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { ShowcaseSection } from "@/components/layout/showcase-section";
import { Card } from "@/components/primitives/card";
import { Button } from "@/components/primitives/button";
import { Field } from "@/components/forms/field";
import { BookingTray } from "@/components/forms/booking-tray";
import { TimeDrum } from "@/components/forms/time-drum";
import { ServiceGallery } from "@/components/forms/service-gallery";
import { SlotGrid } from "@/components/forms/slot-grid";

/* ── Mock data ───────────────────────────────────────── */

const timeItems = [
  "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM",
  "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM",
  "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM",
];

const services = [
  { id: "hot-stone", name: "Hot Stone Massage", price: "$120", duration: "90 min" },
  { id: "facial", name: "Classic Facial", price: "$85", duration: "60 min" },
  { id: "manicure", name: "Gel Manicure", price: "$45", duration: "45 min" },
  { id: "pedicure", name: "Luxury Pedicure", price: "$65", duration: "60 min" },
  { id: "aromatherapy", name: "Aromatherapy", price: "$110", duration: "75 min" },
  { id: "body-wrap", name: "Detox Body Wrap", price: "$95", duration: "60 min" },
];

const mockSlots = [
  { id: "s1", time: "9:00", status: "available" as const },
  { id: "s2", time: "9:30", status: "available" as const },
  { id: "s3", time: "10:00", status: "unavailable" as const },
  { id: "s4", time: "10:30", status: "available" as const },
  { id: "s5", time: "11:00", status: "available" as const },
  { id: "s6", time: "11:30", status: "unavailable" as const },
  { id: "s7", time: "12:00", status: "unavailable" as const },
  { id: "s8", time: "12:30", status: "available" as const },
  { id: "s9", time: "1:00", status: "available" as const },
  { id: "s10", time: "1:30", status: "available" as const },
  { id: "s11", time: "2:00", status: "unavailable" as const },
  { id: "s12", time: "2:30", status: "available" as const },
  { id: "s13", time: "3:00", status: "available" as const },
  { id: "s14", time: "3:30", status: "available" as const },
  { id: "s15", time: "4:00", status: "unavailable" as const },
  { id: "s16", time: "4:30", status: "available" as const },
];

const bookingSteps = [
  { id: "service", label: "Choose service", summary: "" },
  { id: "date", label: "Pick a date", summary: "" },
  { id: "time", label: "Select time", summary: "" },
  { id: "confirm", label: "Confirm", summary: "" },
];

/* ── Page ──────────────────────────────────────────── */

export default function FormsPage() {
  const [drumValue, setDrumValue] = useState("10:00 AM");
  const [selectedService, setSelectedService] = useState<string>();
  const [selectedSlot, setSelectedSlot] = useState<string>();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(0);

  const slots = mockSlots.map((s) => ({
    ...s,
    status: s.id === selectedSlot ? ("selected" as const) : s.status,
  }));

  const stepsWithSummary = bookingSteps.map((step, i) => {
    if (i === 0 && bookingStep > 0 && selectedService) {
      const svc = services.find((s) => s.id === selectedService);
      return { ...step, summary: svc?.name ?? step.label };
    }
    if (i === 1 && bookingStep > 1) {
      return { ...step, summary: "Feb 27" };
    }
    if (i === 2 && bookingStep > 2 && selectedSlot) {
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
        title="Forms"
        subtitle="Field inputs, booking flows, time pickers, service carousels, and slot grids — everything for scheduling and data entry."
      />

      {/* ── Field Variants ── */}
      <ShowcaseSection title="Field" className="mb-16">
        <Card className="p-6">
          <div className="stagger-child grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field
              label="Full name"
              placeholder="Jane Smith"
              description="As it appears on your ID"
            />

            <Field
              label="Email"
              type="email"
              placeholder="jane@example.com"
              error="This email is already registered"
            />

            <Field
              label="Phone"
              type="tel"
              placeholder="(555) 000-0000"
              prefix={
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2.7 1.3l2.1 0 1.3 3.2-1.6 1.1a9 9 0 006 6l1.1-1.6 3.2 1.3v2.1a1.3 1.3 0 01-1.3 1.3A11.4 11.4 0 011.3 2.6 1.3 1.3 0 012.7 1.3z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            />

            <Field
              label="Amount"
              type="number"
              placeholder="0.00"
              prefix={<span className="text-sm font-medium">$</span>}
              suffix={<span className="text-xs">USD</span>}
            />

            <Field
              label="Notes"
              placeholder="Any preferences or allergies..."
              description="Optional — helps your therapist prepare"
            />

            <Field
              label="Referral code"
              placeholder="FRIEND20"
              disabled
              description="Locked — already applied"
            />
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Service Gallery ── */}
      <ShowcaseSection title="Service Gallery" className="mb-16">
        <p className="text-sm text-text-secondary mb-4 stagger-child">
          Horizontal scroll-snap carousel. Swipe or click to select a service.
        </p>
        <Card className="p-0 overflow-hidden">
          <div className="stagger-child">
            <ServiceGallery
              services={services}
              selectedId={selectedService}
              onSelect={setSelectedService}
            />
          </div>
        </Card>
        {selectedService && (
          <p className="text-xs text-text-tertiary mt-3">
            Selected: {services.find((s) => s.id === selectedService)?.name}
          </p>
        )}
      </ShowcaseSection>

      {/* ── Time Drum ── */}
      <ShowcaseSection title="Time Drum" className="mb-16">
        <p className="text-sm text-text-secondary mb-4 stagger-child">
          Scroll-snap wheel picker with a 3-item visible window. Scroll or click to change.
        </p>
        <Card className="p-6">
          <div className="stagger-child flex items-center gap-8">
            <div className="w-32">
              <TimeDrum
                items={timeItems}
                value={drumValue}
                onChange={setDrumValue}
              />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary">
                Selected time
              </p>
              <p className="font-data text-metric-md font-semibold text-text-primary mt-1">
                {drumValue}
              </p>
            </div>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Slot Grid ── */}
      <ShowcaseSection title="Slot Grid" className="mb-16">
        <p className="text-sm text-text-secondary mb-4 stagger-child">
          Auto-fill grid of time slots with available, unavailable, and selected states.
        </p>
        <Card className="p-6">
          <div className="stagger-child">
            <SlotGrid
              slots={slots}
              onSelect={handleSlotSelect}
            />
          </div>
          {selectedSlot && (
            <p className="text-xs text-text-tertiary mt-3">
              Selected: {mockSlots.find((s) => s.id === selectedSlot)?.time}
            </p>
          )}
        </Card>
      </ShowcaseSection>

      {/* ── Booking Tray ── */}
      <ShowcaseSection title="Booking Tray" className="mb-16">
        <Card className="p-6">
          <div className="stagger-child">
            <p className="text-sm text-text-secondary mb-4">
              Multi-step bottom tray with step chips. Previous selections compress into summaries.
            </p>
            <Button onClick={() => { setBookingOpen(true); setBookingStep(0); }}>
              Open Booking Flow
            </Button>
          </div>
        </Card>
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
              {services.map((svc) => (
                <button
                  key={svc.id}
                  type="button"
                  onClick={() => {
                    setSelectedService(svc.id);
                    setBookingStep(1);
                  }}
                  className={`rounded-lg p-3 text-left transition-colors ${
                    selectedService === svc.id
                      ? "bg-primary-muted ring-2 ring-primary"
                      : "bg-surface-interactive hover:bg-surface-interactive-hover"
                  }`}
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
            <p className="text-sm font-medium text-text-primary">Pick a date</p>
            <p className="text-sm text-text-secondary">
              Calendar component would go here. For demo purposes:
            </p>
            <Button
              size="sm"
              onClick={() => setBookingStep(2)}
            >
              Select Feb 27
            </Button>
          </div>
        )}

        {bookingStep === 2 && (
          <div className="space-y-4">
            <p className="text-sm font-medium text-text-primary">Select a time</p>
            <SlotGrid
              slots={slots}
              onSelect={(id) => {
                handleSlotSelect(id);
                setBookingStep(3);
              }}
            />
          </div>
        )}

        {bookingStep === 3 && (
          <div className="space-y-4">
            <p className="text-sm font-medium text-text-primary">Confirm booking</p>
            <div className="rounded-lg bg-surface-sunken p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Service</span>
                <span className="font-medium text-text-primary">
                  {services.find((s) => s.id === selectedService)?.name}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Date</span>
                <span className="font-medium text-text-primary">Feb 27, 2026</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Time</span>
                <span className="font-medium text-text-primary">
                  {mockSlots.find((s) => s.id === selectedSlot)?.time ?? "—"}
                </span>
              </div>
              <div className="flex justify-between text-sm border-t border-border pt-2 mt-2">
                <span className="text-text-secondary">Total</span>
                <span className="font-semibold text-text-primary">
                  {services.find((s) => s.id === selectedService)?.price}
                </span>
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
