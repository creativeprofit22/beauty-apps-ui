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
import { useSkin } from "@/hooks/useSkin";
import { useLocale } from "@/lib/i18n";
import { engagementStrings as s } from "@/lib/strings/engagement";

/* ── Page ──────────────────────────────────────────── */

export default function EngagementPage() {
  const { t } = useLocale();
  const { skinConfig } = useSkin();
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
        title={t(s.title)}
        subtitle={t(s.subtitle)}
      />

      {/* ── Scratch Card ── */}
      <ShowcaseSection title={t(s.sectionScratchCard)} className="mb-16">
        <Card className="p-6 space-y-6">
          <div className="stagger-child">
            <p className="text-sm text-text-secondary mb-4">
              {t(s.scratchDesc)}
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
                    {t(s.scratchDiscount)}
                  </span>
                  <span className="text-xs text-text-secondary">
                    {t(s.scratchNextTreatment)}
                  </span>
                </div>
              </ScratchCard>
              <div className="hidden sm:block space-y-2">
                <p className="text-xs text-text-tertiary">
                  {scratchRevealed ? t(s.scratchRevealed) : t(s.scratchToReveal)}
                </p>
                <Button size="sm" variant="ghost" onClick={resetScratch}>
                  {t(s.resetCard)}
                </Button>
              </div>
            </div>
            <div className="sm:hidden mt-3">
              <Button size="sm" variant="ghost" onClick={resetScratch}>
                {t(s.resetCard)}
              </Button>
            </div>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Confetti ── */}
      <ShowcaseSection title={t(s.sectionConfetti)} className="mb-16">
        <Card className="p-6">
          <div className="stagger-child">
            <p className="text-sm text-text-secondary mb-4">
              {t(s.confettiDesc)}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="cta"
                onClick={() => setConfettiActive(true)}
              >
                {t(s.launchConfetti)}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setConfettiActive(false)}
              >
                {t(s.stop)}
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
      <ShowcaseSection title={t(s.sectionTierUpgrade)} className="mb-16">
        <Card className="p-6 space-y-6">
          <div className="stagger-child">
            <p className="text-sm text-text-secondary mb-4">
              {t(s.tierUpgradeDesc)}
            </p>
            <div className="flex flex-wrap gap-3 mb-4">
              {(["bronze", "silver", "gold", "black"] as const).map((tier) => (
                <Button
                  key={tier}
                  size="sm"
                  variant={upgradeTier === tier ? "primary" : "secondary"}
                  onClick={() => setUpgradeTier(tier)}
                >
                  {tier.charAt(0).toUpperCase() + tier.slice(1)}
                </Button>
              ))}
            </div>
            <Button
              variant="cta"
              onClick={() => setUpgradeActive(true)}
            >
              {t(s.triggerUpgrade)}
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
      <ShowcaseSection title={t(s.sectionPointsFloat)} className="mb-16">
        <Card className="p-6">
          <div className="stagger-child">
            <p className="text-sm text-text-secondary mb-4">
              {t(s.pointsFloatDesc)}
            </p>
            <div className="flex items-center gap-6">
              <div className="relative">
                <Button
                  onClick={() => {
                    setEarnTrigger((t) => t + 1);
                    setEarnValue(Math.floor(Math.random() * 75) + 10);
                  }}
                >
                  {t(s.earnPoints)}
                </Button>
                <PointsFloat
                  points={earnValue}
                  trigger={earnTrigger}
                  className="absolute -top-2 left-1/2"
                />
              </div>
              <p className="text-xs text-text-tertiary">
                {t(s.pointsFloatHint)}
              </p>
            </div>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Stamp Card Fill ── */}
      <ShowcaseSection title={t(s.sectionStampCollection)} className="mb-16">
        <Card className="p-6 space-y-6">
          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              {t(s.stampFillLabel)} — {stampCount} {t(s.stampOf)} 10
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
              {t(s.collectStamp)}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setStampCount(0)}
            >
              {t(s.reset)}
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
                {t(s.claimReward)}
              </Button>
            )}
          </div>

          <p className="text-xs text-text-tertiary stagger-child">
            {t(s.stampHint)}
          </p>
        </Card>
      </ShowcaseSection>

      {/* ── Envelope Reveal ── */}
      <ShowcaseSection title={t(s.sectionEnvelopeReveal)} className="mb-16">
        <Card className="p-6">
          <div className="stagger-child">
            <p className="text-sm text-text-secondary mb-4">
              {t(s.envelopeDesc)}
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
                    {t(s.freeTreatment)}
                  </span>
                  <p className="text-2xs text-text-tertiary mt-1">
                    {t(s.exclusiveReward)}
                  </p>
                </div>
              </EnvelopeReveal>
              <div className="hidden sm:block space-y-2">
                <p className="text-xs text-text-tertiary">
                  {t(s.envelopeHint)}
                </p>
                <Button size="sm" variant="ghost" onClick={() => setEnvelopeKey((k) => k + 1)}>
                  {t(s.resetEnvelope)}
                </Button>
              </div>
            </div>
            <div className="sm:hidden mt-3">
              <Button size="sm" variant="ghost" onClick={() => setEnvelopeKey((k) => k + 1)}>
                {t(s.resetEnvelope)}
              </Button>
            </div>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Gift Box ── */}
      <ShowcaseSection title={t(s.sectionGiftBox)} className="mb-16">
        <Card className="p-6">
          <div className="stagger-child">
            <p className="text-sm text-text-secondary mb-4">
              {t(s.giftBoxDesc)}
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
                    {t(s.giftDiscount)}
                  </span>
                  <p className="text-2xs text-text-tertiary mt-1">
                    {t(s.nextVisit)}
                  </p>
                </div>
              </GiftBox>
              <div className="hidden sm:block space-y-2">
                <p className="text-xs text-text-tertiary">
                  {t(s.giftBoxHint)}
                </p>
                <Button size="sm" variant="ghost" onClick={() => setGiftKey((k) => k + 1)}>
                  {t(s.resetGift)}
                </Button>
              </div>
            </div>
            <div className="sm:hidden mt-3">
              <Button size="sm" variant="ghost" onClick={() => setGiftKey((k) => k + 1)}>
                {t(s.resetGift)}
              </Button>
            </div>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Wax Seal ── */}
      <ShowcaseSection title={t(s.sectionWaxSeal)} className="mb-16">
        <Card className="p-6">
          <div className="stagger-child">
            <p className="text-sm text-text-secondary mb-4">
              {t(s.waxSealDesc)}
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
                  {t(s.waxSealHint)}
                </p>
                <Button size="sm" variant="ghost" onClick={() => setSealKey((k) => k + 1)}>
                  {t(s.resetSeal)}
                </Button>
              </div>
            </div>
            <div className="sm:hidden mt-3">
              <Button size="sm" variant="ghost" onClick={() => setSealKey((k) => k + 1)}>
                {t(s.resetSeal)}
              </Button>
            </div>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Peel-Back Corner ── */}
      <ShowcaseSection title={t(s.sectionPeelBack)} className="mb-16">
        <Card className="p-6">
          <div className="stagger-child">
            <p className="text-sm text-text-secondary mb-4">
              {t(s.peelBackDesc)}
            </p>
            <div className="flex flex-wrap items-start gap-6">
              <PeelBack
                key={peelKey}
                onComplete={() => setConfettiActive(true)}
                frontContent={
                  <span className="font-display text-base text-text-secondary">
                    {t(s.mysteryReward)}
                  </span>
                }
              >
                <div className="text-center">
                  <span className="font-display text-xl font-bold text-accent">
                    {t(s.peelDiscount)}
                  </span>
                  <p className="text-xs text-text-tertiary mt-1">
                    {t(s.nextBooking)}
                  </p>
                </div>
              </PeelBack>
              <div className="hidden sm:block space-y-2">
                <p className="text-xs text-text-tertiary">
                  {t(s.peelHint)}
                </p>
                <Button size="sm" variant="ghost" onClick={() => setPeelKey((k) => k + 1)}>
                  {t(s.resetPeel)}
                </Button>
              </div>
            </div>
            <div className="sm:hidden mt-3">
              <Button size="sm" variant="ghost" onClick={() => setPeelKey((k) => k + 1)}>
                {t(s.resetPeel)}
              </Button>
            </div>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Slot Machine ── */}
      <ShowcaseSection title={t(s.sectionSlotMachine)} className="mb-16">
        <Card className="p-6">
          <div className="stagger-child">
            <p className="text-sm text-text-secondary mb-4">
              {t(s.slotMachineDesc)}
            </p>
            <SlotMachine
              symbols={skinConfig.slotSymbols}
              onJackpot={() => setConfettiActive(true)}
            />
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Bubble Pop ── */}
      <ShowcaseSection title={t(s.sectionBubblePop)} className="mb-16">
        <Card className="p-6 space-y-4">
          <div className="stagger-child">
            <p className="text-sm text-text-secondary mb-4">
              {t(s.bubblePopDesc)}
            </p>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Button
                variant="cta"
                onClick={() => {
                  setBubblesActive(true);
                  setBubbleScore(0);
                }}
              >
                {t(s.launchBubbles)}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setBubblesActive(false)}
              >
                {t(s.stop)}
              </Button>
              {bubbleScore > 0 && (
                <span className="text-sm font-display font-bold text-primary">
                  {t(s.scoreLabel)} {bubbleScore} {t(s.scorePts)}
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
