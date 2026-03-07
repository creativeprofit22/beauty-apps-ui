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
import { useLocale } from "@/lib/i18n";
import { formsStrings as s } from "@/lib/strings/forms";

/* ── Mock data ───────────────────────────────────────── */

const timeItems = [
  "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM",
  "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM",
  "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM", "3:00 PM",
  "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM",
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

/* ── Page ──────────────────────────────────────────── */

export default function FormsPage() {
  const { t } = useLocale();
  const [drumValue, setDrumValue] = useState("10:00 AM");
  const [selectedService, setSelectedService] = useState<string>();
  const [selectedSlot, setSelectedSlot] = useState<string>();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(0);

  const services = [
    { id: "hot-stone", name: t(s.svcHotStoneMassage), price: "$120", duration: t(s.dur90Min), image: "/services/hot-stone.png" },
    { id: "facial", name: t(s.svcClassicFacial), price: "$85", duration: t(s.dur60Min), image: "/services/facial.png" },
    { id: "manicure", name: t(s.svcGelManicure), price: "$45", duration: t(s.dur45Min), image: "/services/manicure.png" },
    { id: "pedicure", name: t(s.svcLuxuryPedicure), price: "$65", duration: t(s.dur60Min), image: "/services/pedicure.png" },
    { id: "aromatherapy", name: t(s.svcAromatherapy), price: "$110", duration: t(s.dur75Min), image: "/services/aromatherapy.png" },
    { id: "body-wrap", name: t(s.svcDetoxBodyWrap), price: "$95", duration: t(s.dur60Min), image: "/services/body-wrap.png" },
  ];

  const bookingSteps = [
    { id: "service", label: t(s.stepChooseService), summary: "" },
    { id: "date", label: t(s.stepPickDate), summary: "" },
    { id: "time", label: t(s.stepSelectTime), summary: "" },
    { id: "confirm", label: t(s.stepConfirm), summary: "" },
  ];

  const slots = mockSlots.map((sl) => ({
    ...sl,
    status: sl.id === selectedSlot ? ("selected" as const) : sl.status,
  }));

  const stepsWithSummary = bookingSteps.map((step, i) => {
    if (i === 0 && bookingStep > 0 && selectedService) {
      const svc = services.find((sv) => sv.id === selectedService);
      return { ...step, summary: svc?.name ?? step.label };
    }
    if (i === 1 && bookingStep > 1) {
      return { ...step, summary: "Feb 27" };
    }
    if (i === 2 && bookingStep > 2 && selectedSlot) {
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

  return (
    <>
      <PageHeader
        title={t(s.title)}
        subtitle={t(s.subtitle)}
      />

      {/* ── Field Variants ── */}
      <ShowcaseSection title={t(s.sectionField)} className="mb-16">
        <Card className="p-6">
          <div className="stagger-child grid grid-cols-1 md:grid-cols-2 gap-6">
            <Field
              label={t(s.fieldFullName)}
              placeholder={t(s.placeholderName)}
              description={t(s.descFullName)}
            />

            <Field
              label={t(s.fieldEmail)}
              type="email"
              placeholder={t(s.placeholderEmail)}
              error={t(s.errorEmailRegistered)}
            />

            <Field
              label={t(s.fieldPhone)}
              type="tel"
              placeholder={t(s.placeholderPhone)}
              prefix={
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2.7 1.3l2.1 0 1.3 3.2-1.6 1.1a9 9 0 006 6l1.1-1.6 3.2 1.3v2.1a1.3 1.3 0 01-1.3 1.3A11.4 11.4 0 011.3 2.6 1.3 1.3 0 012.7 1.3z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            />

            <Field
              label={t(s.fieldAmount)}
              type="number"
              placeholder={t(s.placeholderAmount)}
              prefix={<span className="text-sm font-medium">$</span>}
              suffix={<span className="text-xs">USD</span>}
            />

            <Field
              label={t(s.fieldNotes)}
              placeholder={t(s.placeholderNotes)}
              description={t(s.descNotes)}
            />

            <Field
              label={t(s.fieldReferralCode)}
              placeholder={t(s.placeholderReferral)}
              disabled
              description={t(s.descReferralLocked)}
            />
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Service Gallery ── */}
      <ShowcaseSection title={t(s.sectionServiceGallery)} className="mb-16">
        <p className="text-sm text-text-secondary mb-4 stagger-child">
          {t(s.serviceGalleryDesc)}
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
            {t(s.selected)} {services.find((sv) => sv.id === selectedService)?.name}
          </p>
        )}
      </ShowcaseSection>

      {/* ── Time Drum ── */}
      <ShowcaseSection title={t(s.sectionTimeDrum)} className="mb-16">
        <p className="text-sm text-text-secondary mb-4 stagger-child">
          {t(s.timeDrumDesc)}
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
                {t(s.selectedTime)}
              </p>
              <p className="font-data text-metric-md font-semibold text-text-primary mt-1">
                {drumValue}
              </p>
            </div>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Slot Grid ── */}
      <ShowcaseSection title={t(s.sectionSlotGrid)} className="mb-16">
        <p className="text-sm text-text-secondary mb-4 stagger-child">
          {t(s.slotGridDesc)}
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
              {t(s.selected)} {mockSlots.find((sl) => sl.id === selectedSlot)?.time}
            </p>
          )}
        </Card>
      </ShowcaseSection>

      {/* ── Booking Tray ── */}
      <ShowcaseSection title={t(s.sectionBookingTray)} className="mb-16">
        <Card className="p-6">
          <div className="stagger-child">
            <p className="text-sm text-text-secondary mb-4">
              {t(s.bookingTrayDesc)}
            </p>
            <Button onClick={() => { setBookingOpen(true); setBookingStep(0); }}>
              {t(s.openBookingFlow)}
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
            <p className="text-sm font-medium text-text-primary">{t(s.chooseAService)}</p>
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
            <p className="text-sm font-medium text-text-primary">{t(s.pickADate)}</p>
            <p className="text-sm text-text-secondary">
              {t(s.calendarPlaceholder)}
            </p>
            <Button
              size="sm"
              onClick={() => setBookingStep(2)}
            >
              {t(s.selectFeb27)}
            </Button>
          </div>
        )}

        {bookingStep === 2 && (
          <div className="space-y-4">
            <p className="text-sm font-medium text-text-primary">{t(s.selectATime)}</p>
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
            <p className="text-sm font-medium text-text-primary">{t(s.confirmBooking)}</p>
            <div className="rounded-lg bg-surface-sunken p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">{t(s.labelService)}</span>
                <span className="font-medium text-text-primary">
                  {services.find((sv) => sv.id === selectedService)?.name}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">{t(s.labelDate)}</span>
                <span className="font-medium text-text-primary">{t(s.dateFeb27)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">{t(s.labelTime)}</span>
                <span className="font-medium text-text-primary">
                  {mockSlots.find((sl) => sl.id === selectedSlot)?.time ?? "—"}
                </span>
              </div>
              <div className="flex justify-between text-sm border-t border-border pt-2 mt-2">
                <span className="text-text-secondary">{t(s.labelTotal)}</span>
                <span className="font-semibold text-text-primary">
                  {services.find((sv) => sv.id === selectedService)?.price}
                </span>
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
