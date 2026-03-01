"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { ShowcaseSection } from "@/components/layout/showcase-section";
import { Card } from "@/components/primitives/card";
import { Button } from "@/components/primitives/button";
import { Badge } from "@/components/primitives/badge";
import { Input } from "@/components/primitives/input";
import { Select } from "@/components/primitives/select";
import { Skeleton } from "@/components/feedback/skeleton";

/* ── Select demo options ────────────────────────────── */

const serviceOptions = [
  { value: "facial", label: "Classic Facial" },
  { value: "massage", label: "Swedish Massage" },
  { value: "manicure", label: "Gel Manicure" },
  { value: "pedicure", label: "Luxury Pedicure" },
  { value: "body-wrap", label: "Detox Body Wrap" },
];

/* ── Page ──────────────────────────────────────────── */

export default function ComponentsPage() {
  const [selectValue, setSelectValue] = useState<string>();
  const [inputValue, setInputValue] = useState("");
  const [clickCount, setClickCount] = useState(0);

  return (
    <>
      <PageHeader
        title="Components"
        subtitle="Interactive demos of every primitive — cards, buttons, badges, inputs, and selects in all their variant glory."
      />

      {/* ── Cards ── */}
      <ShowcaseSection title="Card" className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-3">
              Default
            </p>
            <Card className="p-6">
              <h3 className="font-display text-lg font-semibold text-text-primary">
                Lifted Paper
              </h3>
              <p className="text-sm text-text-secondary mt-1">
                Three-layer shadow stack — contact, cast, and ambient. No border, no
                backdrop-filter. Pure shadow depth.
              </p>
            </Card>
          </div>

          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-3">
              Hover variant
            </p>
            <Card hover className="p-6">
              <h3 className="font-display text-lg font-semibold text-text-primary">
                Hover me
              </h3>
              <p className="text-sm text-text-secondary mt-1">
                Scales to 1.02× with elevated shadow on hover. Smooth transition on
                both transform and box-shadow.
              </p>
            </Card>
          </div>
        </div>
      </ShowcaseSection>

      {/* ── Buttons ── */}
      <ShowcaseSection title="Button" className="mb-16">
        <Card className="p-6 space-y-8">
          {/* Variants */}
          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              Variants
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" onClick={() => setClickCount((c) => c + 1)}>
                Primary{clickCount > 0 ? ` (${clickCount})` : ""}
              </Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="cta">Call to Action</Button>
            </div>
          </div>

          {/* Sizes */}
          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              Sizes
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>

          {/* Radius */}
          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              Radius
            </p>
            <div className="flex flex-wrap gap-3">
              <Button radius="standard">Standard</Button>
              <Button radius="pill">Pill</Button>
              <Button variant="cta" radius="pill">CTA Pill</Button>
            </div>
          </div>

          {/* States */}
          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              States
            </p>
            <div className="flex flex-wrap gap-3">
              <Button disabled>Disabled</Button>
              <Button variant="secondary" disabled>
                Disabled
              </Button>
              <Button variant="ghost" disabled>
                Disabled
              </Button>
            </div>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Badges ── */}
      <ShowcaseSection title="Badge" className="mb-16">
        <Card className="p-6 space-y-6">
          {/* Semantic variants */}
          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              Semantic variants
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="success">Confirmed</Badge>
              <Badge variant="warning">Pending</Badge>
              <Badge variant="error">Cancelled</Badge>
              <Badge variant="info">Rescheduled</Badge>
            </div>
          </div>

          {/* Tier variants */}
          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              Tier variants
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge tier="bronze">Bronze</Badge>
              <Badge tier="silver">Silver</Badge>
              <Badge tier="gold">Gold</Badge>
              <Badge tier="black">Black</Badge>
            </div>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Input ── */}
      <ShowcaseSection title="Input" className="mb-16">
        <Card className="p-6 space-y-6">
          <div className="stagger-child grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">
                Default input
              </label>
              <Input
                placeholder="Enter your name..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              {inputValue && (
                <p className="text-xs text-text-tertiary">
                  Value: {inputValue}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">
                Error state
              </label>
              <Input
                placeholder="Invalid email..."
                defaultValue="not-an-email"
                error
              />
              <p className="text-xs text-error">
                Please enter a valid email address
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">
                Disabled
              </label>
              <Input placeholder="Cannot edit..." disabled />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">
                With value
              </label>
              <Input defaultValue="jane@example.com" readOnly />
            </div>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Select ── */}
      <ShowcaseSection title="Select" className="mb-16">
        <Card className="p-6 space-y-6">
          <div className="stagger-child grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">
                Service type
              </label>
              <Select
                options={serviceOptions}
                value={selectValue}
                onChange={setSelectValue}
                placeholder="Choose a service..."
              />
              {selectValue && (
                <p className="text-xs text-text-tertiary">
                  Selected: {serviceOptions.find((o) => o.value === selectValue)?.label}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">
                Disabled
              </label>
              <Select
                options={serviceOptions}
                placeholder="Not available"
                disabled
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">
                Error state
              </label>
              <Select
                options={serviceOptions}
                placeholder="Required field"
                error
              />
              <p className="text-xs text-error">
                Please select a service
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">
                Pre-selected
              </label>
              <Select
                options={serviceOptions}
                value="massage"
              />
            </div>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Skeleton ── */}
      <ShowcaseSection title="Skeleton" className="mb-16">
        <Card className="p-6 space-y-8">
          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              Text lines
            </p>
            <div className="space-y-2 max-w-sm">
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" />
              <Skeleton variant="text" width="80%" />
            </div>
          </div>

          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              Circle (avatar)
            </p>
            <div className="flex items-center gap-4">
              <Skeleton variant="circle" width={48} height={48} />
              <Skeleton variant="circle" width={36} height={36} />
              <Skeleton variant="circle" width={24} height={24} />
            </div>
          </div>

          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              Card
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
              <Skeleton variant="card" height={120} />
              <Skeleton variant="card" height={120} />
            </div>
          </div>

          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              Composed (profile card)
            </p>
            <div className="flex items-start gap-4 max-w-sm">
              <Skeleton variant="circle" width={48} height={48} />
              <div className="flex-1 space-y-2">
                <Skeleton variant="text" width="40%" height="1.1em" />
                <Skeleton variant="text" width="70%" />
                <Skeleton variant="text" width="55%" />
              </div>
            </div>
          </div>
        </Card>
        <p className="text-xs text-text-tertiary mt-4">
          Warm breathing skeleton with shimmer gradient overlay. Variants: text (line), circle (avatar), card (block).
          Uses <code className="font-data">spa-skeleton</code> + <code className="font-data">shimmer</code> keyframes.
        </p>
      </ShowcaseSection>
    </>
  );
}
