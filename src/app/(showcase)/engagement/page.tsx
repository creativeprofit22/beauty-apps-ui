"use client";

import { useState, useCallback } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { ShowcaseSection } from "@/components/layout/showcase-section";
import { Card } from "@/components/primitives/card";
import { Button } from "@/components/primitives/button";
import { ScratchCard } from "@/components/engagement/scratch-card";
import { Confetti } from "@/components/engagement/confetti";
import { TierUpgrade } from "@/components/engagement/tier-upgrade";
import { PointsFloat } from "@/components/engagement/points-float";
import { StampCard } from "@/components/engagement/stamp-card";
import { skinConfig } from "@/skin/config";

/* ── Page ──────────────────────────────────────────── */

export default function EngagementPage() {
  const [scratchKey, setScratchKey] = useState(0);
  const [scratchRevealed, setScratchRevealed] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const [upgradeActive, setUpgradeActive] = useState(false);
  const [upgradeTier, setUpgradeTier] = useState<"bronze" | "silver" | "gold" | "black">("gold");
  const [earnTrigger, setEarnTrigger] = useState(0);
  const [earnValue, setEarnValue] = useState(50);
  const [stampTrigger, setStampTrigger] = useState(0);
  const [stampValue] = useState(25);
  const [stampCount, setStampCount] = useState(0);

  const handleScratchComplete = () => {
    setScratchRevealed(true);
    setConfettiActive(true);
  };

  const resetScratch = () => {
    setScratchRevealed(false);
    setScratchKey((k) => k + 1);
  };

  const handleConfettiComplete = useCallback(() => setConfettiActive(false), []);

  const handleStampFill = () => {
    if (stampCount < 10) {
      setStampCount((c) => c + 1);
      setStampTrigger((t) => t + 1);
    }
  };

  return (
    <>
      <PageHeader
        title="Engagement"
        subtitle="Interactive reward mechanics — scratch cards, confetti celebrations, tier upgrades, floating points, and stamp collection."
      />

      {/* ── Scratch Card ── */}
      <ShowcaseSection title="Scratch Card" className="mb-16">
        <Card className="p-6 space-y-6">
          <div className="stagger-child">
            <p className="text-sm text-text-secondary mb-4">
              Scratch the foil overlay to reveal the reward beneath. Auto-completes at 35% coverage.
            </p>
            <div className="flex items-center gap-6">
              <ScratchCard
                key={scratchKey}
                width={280}
                height={160}
                foilGradient={skinConfig.scratchFoilGradient as unknown as string[]}
                onComplete={handleScratchComplete}
              >
                <div className="flex flex-col items-center justify-center gap-1 bg-surface-raised rounded-xl w-full h-full">
                  <span className="font-display text-2xl font-bold text-primary">
                    20% OFF
                  </span>
                  <span className="text-xs text-text-secondary">
                    Your next treatment
                  </span>
                </div>
              </ScratchCard>
              <div className="hidden sm:block space-y-2">
                <p className="text-xs text-text-tertiary">
                  {scratchRevealed ? "Reward revealed!" : "Scratch to reveal..."}
                </p>
                <Button size="sm" variant="ghost" onClick={resetScratch}>
                  Reset Card
                </Button>
              </div>
            </div>
            <div className="sm:hidden mt-3">
              <Button size="sm" variant="ghost" onClick={resetScratch}>
                Reset Card
              </Button>
            </div>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Confetti ── */}
      <ShowcaseSection title="Confetti" className="mb-16">
        <Card className="p-6">
          <div className="stagger-child">
            <p className="text-sm text-text-secondary mb-4">
              CSS confetti via DOM elements with 3 speed variants (slow, medium, fast).
              Self-cleans via animationend events. Respects prefers-reduced-motion.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="cta"
                onClick={() => setConfettiActive(true)}
              >
                Launch Confetti
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setConfettiActive(false)}
              >
                Stop
              </Button>
            </div>
          </div>
        </Card>
        <Confetti
          active={confettiActive}
          colors={skinConfig.confettiColors as unknown as string[]}
          onComplete={handleConfettiComplete}
        />
      </ShowcaseSection>

      {/* ── Tier Upgrade ── */}
      <ShowcaseSection title="Tier Upgrade" className="mb-16">
        <Card className="p-6 space-y-6">
          <div className="stagger-child">
            <p className="text-sm text-text-secondary mb-4">
              Full-screen overlay with radial gradient ink-bleed wash, tier badge springs in,
              then auto-dismisses. Select a tier and trigger the animation.
            </p>
            <div className="flex flex-wrap gap-3 mb-4">
              {(["bronze", "silver", "gold", "black"] as const).map((t) => (
                <Button
                  key={t}
                  size="sm"
                  variant={upgradeTier === t ? "primary" : "secondary"}
                  onClick={() => setUpgradeTier(t)}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </Button>
              ))}
            </div>
            <Button
              variant="cta"
              onClick={() => setUpgradeActive(true)}
            >
              Trigger Upgrade
            </Button>
          </div>
        </Card>
        <TierUpgrade
          active={upgradeActive}
          tier={upgradeTier}
          onDismiss={() => setUpgradeActive(false)}
        />
      </ShowcaseSection>

      {/* ── Points Float ── */}
      <ShowcaseSection title="Points Float" className="mb-16">
        <Card className="p-6">
          <div className="stagger-child">
            <p className="text-sm text-text-secondary mb-4">
              Floating "+N pts" counter animates upward and fades out over 1200ms.
              Click the button to spawn new floats.
            </p>
            <div className="flex items-center gap-6">
              <div className="relative">
                <Button
                  onClick={() => {
                    setEarnTrigger((t) => t + 1);
                    setEarnValue(Math.floor(Math.random() * 75) + 10);
                  }}
                >
                  Earn Points
                </Button>
                <PointsFloat
                  points={earnValue}
                  trigger={earnTrigger}
                  className="absolute -top-2 left-1/2"
                />
              </div>
              <p className="text-xs text-text-tertiary">
                Each click spawns a new floating counter with a random point value.
              </p>
            </div>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Stamp Card Fill ── */}
      <ShowcaseSection title="Stamp Collection" className="mb-16">
        <Card className="p-6 space-y-6">
          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              Fill animation — {stampCount} of 10
            </p>
            <div className="max-w-xs relative">
              <StampCard earned={stampCount} />
              <PointsFloat
                points={stampValue}
                trigger={stampTrigger}
                prefix="+"
                suffix=" pts"
                className="absolute -top-2 right-4"
              />
            </div>
          </div>

          <div className="stagger-child flex flex-wrap gap-3">
            <Button
              size="sm"
              variant="primary"
              onClick={handleStampFill}
              disabled={stampCount >= 10}
            >
              Collect Stamp
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setStampCount(0)}
            >
              Reset
            </Button>
            {stampCount >= 10 && (
              <Button
                size="sm"
                variant="cta"
                onClick={() => {
                  setConfettiActive(true);
                  setStampCount(0);
                }}
              >
                Claim Reward
              </Button>
            )}
          </div>

          <p className="text-xs text-text-tertiary stagger-child">
            Each stamp earned triggers a floating points counter.
            Complete all 10 stamps to claim a reward with confetti celebration.
          </p>
        </Card>
      </ShowcaseSection>
    </>
  );
}
