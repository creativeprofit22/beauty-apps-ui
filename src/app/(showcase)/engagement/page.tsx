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
import { EnvelopeReveal } from "@/components/engagement/envelope-reveal";
import { GiftBox } from "@/components/engagement/gift-box";
import { WaxSeal } from "@/components/engagement/wax-seal";
import { PeelBack } from "@/components/engagement/peel-back";
import { SlotMachine } from "@/components/engagement/slot-machine";
import { BubblePop } from "@/components/engagement/bubble-pop";
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
  const [envelopeKey, setEnvelopeKey] = useState(0);
  const [giftKey, setGiftKey] = useState(0);
  const [sealKey, setSealKey] = useState(0);
  const [peelKey, setPeelKey] = useState(0);
  const [bubblesActive, setBubblesActive] = useState(false);
  const [bubbleScore, setBubbleScore] = useState(0);

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
            <div className="flex flex-wrap items-center gap-6">
              <ScratchCard
                key={scratchKey}
                width={280}
                height={160}
                foilGradient={skinConfig.scratchFoilGradient}
                onComplete={handleScratchComplete}
              >
                <div className="flex flex-col items-center justify-center gap-1 bg-surface-raised rounded-xl w-full h-full">
                  <span className="font-display text-2xl font-bold text-secondary">
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
          colors={skinConfig.confettiColors}
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
              Floating &ldquo;+N pts&rdquo; counter animates upward and fades out over 1200ms.
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

      {/* ── Envelope Reveal ── */}
      <ShowcaseSection title="Envelope Reveal" className="mb-16">
        <Card className="p-6">
          <div className="stagger-child">
            <p className="text-sm text-text-secondary mb-4">
              Sealed envelope with 3D flap animation. Tap to open — flap lifts via CSS 3D rotateX,
              then inner card slides up with spring easing. Keyboard accessible (Enter/Space).
            </p>
            <div className="flex flex-wrap items-start gap-6">
              <EnvelopeReveal
                key={envelopeKey}
                envelopeColor={skinConfig.envelopeColors.body}
                flapColor={skinConfig.envelopeColors.flap}
                onComplete={() => setConfettiActive(true)}
              >
                <div className="text-center">
                  <span className="font-display text-lg font-bold text-secondary">
                    Free Treatment
                  </span>
                  <p className="text-2xs text-text-tertiary mt-1">
                    Your exclusive reward
                  </p>
                </div>
              </EnvelopeReveal>
              <div className="hidden sm:block space-y-2">
                <p className="text-xs text-text-tertiary">
                  Tap the envelope to reveal the reward inside.
                </p>
                <Button size="sm" variant="ghost" onClick={() => setEnvelopeKey((k) => k + 1)}>
                  Reset Envelope
                </Button>
              </div>
            </div>
            <div className="sm:hidden mt-3">
              <Button size="sm" variant="ghost" onClick={() => setEnvelopeKey((k) => k + 1)}>
                Reset Envelope
              </Button>
            </div>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Gift Box ── */}
      <ShowcaseSection title="Gift Box" className="mb-16">
        <Card className="p-6">
          <div className="stagger-child">
            <p className="text-sm text-text-secondary mb-4">
              Gift box with ribbon cross. Tap to unwrap — ribbon unties via SVG stroke-dashoffset,
              then lid lifts with spring easing. Reward content floats up from inside.
            </p>
            <div className="flex flex-wrap items-start gap-6">
              <GiftBox
                key={giftKey}
                boxColor={skinConfig.giftBoxColors.box}
                ribbonColor={skinConfig.giftBoxColors.ribbon}
                onComplete={() => setConfettiActive(true)}
              >
                <div className="text-center">
                  <span className="font-display text-xl font-bold text-accent">
                    50% OFF
                  </span>
                  <p className="text-2xs text-text-tertiary mt-1">
                    Next visit
                  </p>
                </div>
              </GiftBox>
              <div className="hidden sm:block space-y-2">
                <p className="text-xs text-text-tertiary">
                  Tap the gift box to unwrap your reward.
                </p>
                <Button size="sm" variant="ghost" onClick={() => setGiftKey((k) => k + 1)}>
                  Reset Gift
                </Button>
              </div>
            </div>
            <div className="sm:hidden mt-3">
              <Button size="sm" variant="ghost" onClick={() => setGiftKey((k) => k + 1)}>
                Reset Gift
              </Button>
            </div>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Wax Seal ── */}
      <ShowcaseSection title="Wax Seal" className="mb-16">
        <Card className="p-6">
          <div className="stagger-child">
            <p className="text-sm text-text-secondary mb-4">
              Luxury wax seal with fracture animation. Tap to break — fracture lines animate
              in via SVG stroke-dashoffset (staggered), seal splits into halves. Premium feel.
            </p>
            <div className="flex flex-wrap items-start gap-6">
              <WaxSeal
                key={sealKey}
                sealColor={skinConfig.waxSealColor}
                onComplete={() => setConfettiActive(true)}
              >
                <div className="flex items-center justify-center w-full h-full bg-surface-raised">
                  <span className="font-display text-sm font-bold text-primary">
                    VIP
                  </span>
                </div>
              </WaxSeal>
              <div className="hidden sm:block space-y-2">
                <p className="text-xs text-text-tertiary">
                  Tap the wax seal to break it open.
                </p>
                <Button size="sm" variant="ghost" onClick={() => setSealKey((k) => k + 1)}>
                  Reset Seal
                </Button>
              </div>
            </div>
            <div className="sm:hidden mt-3">
              <Button size="sm" variant="ghost" onClick={() => setSealKey((k) => k + 1)}>
                Reset Seal
              </Button>
            </div>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Peel-Back Corner ── */}
      <ShowcaseSection title="Peel-Back Corner" className="mb-16">
        <Card className="p-6">
          <div className="stagger-child">
            <p className="text-sm text-text-secondary mb-4">
              Card with a peelable bottom-right corner. Drag or tap to peel — auto-completes
              at 40% peel. Pure CSS transforms, no canvas. Keyboard accessible (Enter/Space).
            </p>
            <div className="flex flex-wrap items-start gap-6">
              <PeelBack
                key={peelKey}
                onComplete={() => setConfettiActive(true)}
                frontContent={
                  <span className="font-display text-base text-text-secondary">
                    Mystery Reward
                  </span>
                }
              >
                <div className="text-center">
                  <span className="font-display text-xl font-bold text-accent">
                    30% OFF
                  </span>
                  <p className="text-xs text-text-tertiary mt-1">
                    Your next booking
                  </p>
                </div>
              </PeelBack>
              <div className="hidden sm:block space-y-2">
                <p className="text-xs text-text-tertiary">
                  Peel the corner to reveal the reward underneath.
                </p>
                <Button size="sm" variant="ghost" onClick={() => setPeelKey((k) => k + 1)}>
                  Reset Peel
                </Button>
              </div>
            </div>
            <div className="sm:hidden mt-3">
              <Button size="sm" variant="ghost" onClick={() => setPeelKey((k) => k + 1)}>
                Reset Peel
              </Button>
            </div>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Slot Machine ── */}
      <ShowcaseSection title="Slot Machine" className="mb-16">
        <Card className="p-6">
          <div className="stagger-child">
            <p className="text-sm text-text-secondary mb-4">
              3-reel slot machine with staggered stops. Match all 3 symbols for a jackpot
              with confetti celebration. Symbols are skin-configurable.
            </p>
            <SlotMachine
              symbols={skinConfig.slotSymbols}
              onJackpot={() => setConfettiActive(true)}
            />
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Bubble Pop ── */}
      <ShowcaseSection title="Bubble Pop" className="mb-16">
        <Card className="p-6 space-y-4">
          <div className="stagger-child">
            <p className="text-sm text-text-secondary mb-4">
              Floating bubbles rise from the bottom. Tap to pop them and earn points.
              Skin-configurable bubble colors. Respects prefers-reduced-motion.
            </p>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Button
                variant="cta"
                onClick={() => {
                  setBubblesActive(true);
                  setBubbleScore(0);
                }}
              >
                Launch Bubbles
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setBubblesActive(false)}
              >
                Stop
              </Button>
              {bubbleScore > 0 && (
                <span className="text-sm font-display font-bold text-primary">
                  Score: {bubbleScore} pts
                </span>
              )}
            </div>
          </div>
          <BubblePop
            active={bubblesActive}
            colors={skinConfig.bubbleColors}
            onPop={(pts) => setBubbleScore((s) => s + pts)}
          />
        </Card>
      </ShowcaseSection>
    </>
  );
}
