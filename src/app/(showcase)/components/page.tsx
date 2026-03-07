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
import { Toggle } from "@/components/primitives/toggle";
import { Checkbox } from "@/components/primitives/checkbox";
import { Avatar } from "@/components/primitives/avatar";
import { TabBar, type TabItem } from "@/components/navigation/tab-bar";
import { DropdownMenu, type DropdownMenuEntry } from "@/components/primitives/dropdown-menu";
import { useLocale } from "@/lib/i18n";
import { glossary } from "@/lib/i18n";
import { componentsStrings as s } from "@/lib/strings/components";

/* ── Icon components (no text) ───────────────────── */

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M11.5 1.5L14.5 4.5L5 14H2V11L11.5 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const CopyIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M11 5V3.5A1.5 1.5 0 009.5 2H3.5A1.5 1.5 0 002 3.5V9.5A1.5 1.5 0 003.5 11H5" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M2 4H14M5.5 4V2.5A1 1 0 016.5 1.5H9.5A1 1 0 0110.5 2.5V4M12.5 4V13.5A1 1 0 0111.5 14.5H4.5A1 1 0 013.5 13.5V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Page ──────────────────────────────────────────── */

export default function ComponentsPage() {
  const { t } = useLocale();
  const [selectValue, setSelectValue] = useState<string>();
  const [inputValue, setInputValue] = useState("");
  const [clickCount, setClickCount] = useState(0);
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(true);
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(true);
  const [checkIndet, setCheckIndet] = useState(false);

  /* ── Translated demo data ──────────────────────── */

  const demoTabs: TabItem[] = [
    { id: "upcoming", label: t(s.tabUpcoming), count: 3 },
    { id: "past", label: t(s.tabPast) },
    { id: "cancelled", label: t(s.tabCancelled), count: 1 },
    { id: "waitlist", label: t(s.tabWaitlist) },
    { id: "packages", label: t(s.tabPackages), count: 5 },
  ];

  const demoMenuItems: DropdownMenuEntry[] = [
    { id: "edit", label: t(s.editAppointment), icon: <EditIcon />, onSelect: () => {} },
    { id: "duplicate", label: t(s.duplicate), icon: <CopyIcon />, onSelect: () => {} },
    { type: "separator" },
    { id: "delete", label: t(s.deleteLabel), icon: <TrashIcon />, destructive: true, onSelect: () => {} },
  ];

  const serviceOptions = [
    { value: "facial", label: t(s.classicFacial) },
    { value: "massage", label: t(s.swedishMassage) },
    { value: "manicure", label: t(s.gelManicure) },
    { value: "pedicure", label: t(s.luxuryPedicure) },
    { value: "body-wrap", label: t(s.detoxBodyWrap) },
  ];

  return (
    <>
      <PageHeader
        title={t(s.title)}
        subtitle={t(s.subtitle)}
      />

      {/* ── Cards ── */}
      <ShowcaseSection title={t(s.sectionCard)} className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-3">
              {t(s.cardDefault)}
            </p>
            <Card className="p-6">
              <h3 className="font-display text-lg font-semibold text-text-primary">
                {t(s.cardLiftedPaper)}
              </h3>
              <p className="text-sm text-text-secondary mt-1">
                {t(s.cardLiftedPaperDesc)}
              </p>
            </Card>
          </div>

          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-3">
              {t(s.cardHoverVariant)}
            </p>
            <Card hover className="p-6">
              <h3 className="font-display text-lg font-semibold text-text-primary">
                {t(s.cardHoverMe)}
              </h3>
              <p className="text-sm text-text-secondary mt-1">
                {t(s.cardHoverDesc)}
              </p>
            </Card>
          </div>
        </div>
      </ShowcaseSection>

      {/* ── Buttons ── */}
      <ShowcaseSection title={t(s.sectionButton)} className="mb-16">
        <Card className="p-6 space-y-8">
          {/* Variants */}
          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              {t(s.variants)}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary" onClick={() => setClickCount((c) => c + 1)}>
                {t(s.primary)}{clickCount > 0 ? ` (${clickCount})` : ""}
              </Button>
              <Button variant="secondary">{t(s.secondary)}</Button>
              <Button variant="ghost">{t(s.ghost)}</Button>
              <Button variant="cta">{t(s.callToAction)}</Button>
            </div>
          </div>

          {/* Sizes */}
          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              {t(s.sizes)}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">{t(s.small)}</Button>
              <Button size="md">{t(s.medium)}</Button>
              <Button size="lg">{t(s.large)}</Button>
            </div>
          </div>

          {/* Radius */}
          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              {t(s.radius)}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button radius="standard">{t(s.standard)}</Button>
              <Button radius="pill">{t(s.pill)}</Button>
              <Button variant="cta" radius="pill">{t(s.ctaPill)}</Button>
            </div>
          </div>

          {/* States */}
          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              {t(s.states)}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button disabled>{t(s.disabled)}</Button>
              <Button variant="secondary" disabled>
                {t(s.disabled)}
              </Button>
              <Button variant="ghost" disabled>
                {t(s.disabled)}
              </Button>
            </div>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Badges ── */}
      <ShowcaseSection title={t(s.sectionBadge)} className="mb-16">
        <Card className="p-6 space-y-6">
          {/* Semantic variants */}
          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              {t(s.semanticVariants)}
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge>{t(s.badgeDefault)}</Badge>
              <Badge variant="success">{t(glossary.statuses.confirmed)}</Badge>
              <Badge variant="warning">{t(glossary.statuses.pending)}</Badge>
              <Badge variant="error">{t(glossary.statuses.cancelled)}</Badge>
              <Badge variant="info">{t(s.rescheduled)}</Badge>
            </div>
          </div>

          {/* Tier variants */}
          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              {t(s.tierVariants)}
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge tier="bronze">{t(glossary.tiers.bronze)}</Badge>
              <Badge tier="silver">{t(glossary.tiers.silver)}</Badge>
              <Badge tier="gold">{t(glossary.tiers.gold)}</Badge>
              <Badge tier="black">{t(s.tierBlack)}</Badge>
            </div>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Input ── */}
      <ShowcaseSection title={t(s.sectionInput)} className="mb-16">
        <Card className="p-6 space-y-6">
          <div className="stagger-child grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">
                {t(s.defaultInput)}
              </label>
              <Input
                placeholder={t(s.enterYourName)}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              {inputValue && (
                <p className="text-xs text-text-tertiary">
                  {t(s.valuePrefix)}{inputValue}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">
                {t(s.errorState)}
              </label>
              <Input
                placeholder={t(s.invalidEmail)}
                defaultValue={t(s.notAnEmail)}
                error
              />
              <p className="text-xs text-error">
                {t(s.pleaseEnterValidEmail)}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">
                {t(s.disabled)}
              </label>
              <Input placeholder={t(s.cannotEdit)} disabled />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">
                {t(s.withValue)}
              </label>
              <Input defaultValue="jane@example.com" readOnly />
            </div>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Select ── */}
      <ShowcaseSection title={t(s.sectionSelect)} className="mb-16">
        <Card className="p-6 space-y-6">
          <div className="stagger-child grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">
                {t(s.serviceType)}
              </label>
              <Select
                options={serviceOptions}
                value={selectValue}
                onChange={setSelectValue}
                placeholder={t(s.chooseAService)}
              />
              {selectValue && (
                <p className="text-xs text-text-tertiary">
                  {t(s.selectedPrefix)}{serviceOptions.find((o) => o.value === selectValue)?.label}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">
                {t(s.disabled)}
              </label>
              <Select
                options={serviceOptions}
                placeholder={t(s.notAvailable)}
                disabled
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">
                {t(s.errorState)}
              </label>
              <Select
                options={serviceOptions}
                placeholder={t(s.requiredField)}
                error
              />
              <p className="text-xs text-error">
                {t(s.pleaseSelectService)}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">
                {t(s.preSelected)}
              </label>
              <Select
                options={serviceOptions}
                value="massage"
              />
            </div>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Toggle ── */}
      <ShowcaseSection title={t(s.sectionToggle)} className="mb-16">
        <Card className="p-6 space-y-6">
          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              {t(s.sizes)}
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <Toggle size="sm" checked={toggle1} onChange={setToggle1} />
                <span className="text-sm text-text-secondary">{t(s.small)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Toggle size="md" checked={toggle1} onChange={setToggle1} />
                <span className="text-sm text-text-secondary">{t(s.medium)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Toggle size="lg" checked={toggle2} onChange={setToggle2} />
                <span className="text-sm text-text-secondary">{t(s.large)}</span>
              </div>
            </div>
          </div>

          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              {t(s.states)}
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center gap-2">
                <Toggle checked={false} disabled />
                <span className="text-sm text-text-secondary">{t(s.disabledOff)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Toggle checked={true} disabled />
                <span className="text-sm text-text-secondary">{t(s.disabledOn)}</span>
              </div>
            </div>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Checkbox ── */}
      <ShowcaseSection title={t(s.sectionCheckbox)} className="mb-16">
        <Card className="p-6 space-y-6">
          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              {t(s.interactive)}
            </p>
            <div className="flex flex-col gap-3">
              <Checkbox
                label={t(s.acceptTerms)}
                checked={check1}
                onChange={(e) => setCheck1(e.target.checked)}
              />
              <Checkbox
                label={t(s.subscribeNewsletter)}
                checked={check2}
                onChange={(e) => setCheck2(e.target.checked)}
              />
            </div>
          </div>

          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              {t(s.states)}
            </p>
            <div className="flex flex-col gap-3">
              <Checkbox
                label={t(s.indeterminate)}
                checked={checkIndet}
                indeterminate={!checkIndet}
                onChange={(e) => setCheckIndet(e.target.checked)}
              />
              <Checkbox label={t(s.disabledUnchecked)} disabled />
              <Checkbox label={t(s.disabledChecked)} checked disabled />
            </div>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Avatar ── */}
      <ShowcaseSection title={t(s.sectionAvatar)} className="mb-16">
        <Card className="p-6 space-y-6">
          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              {t(s.sizesWithInitials)}
            </p>
            <div className="flex items-center gap-4">
              <Avatar size="sm" initials="JS" />
              <Avatar size="md" initials="AB" />
              <Avatar size="lg" initials="CD" />
            </div>
          </div>

          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              {t(s.tierRings)}
            </p>
            <div className="flex items-center gap-4">
              <Avatar size="md" initials="BR" tier="bronze" />
              <Avatar size="md" initials="SL" tier="silver" />
              <Avatar size="md" initials="GD" tier="gold" />
              <Avatar size="md" initials="BK" tier="black" />
            </div>
          </div>

          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              {t(s.states)}
            </p>
            <div className="flex items-center gap-4">
              <Avatar size="md" src="/no-image.jpg" initials="FB" alt={t(s.fallbackDemo)} />
              <Avatar size="md" initials="DI" disabled />
            </div>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Tab Bar ── */}
      <ShowcaseSection title={t(s.sectionTabBar)} className="mb-16">
        <Card className="p-6 space-y-6">
          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              {t(s.withBadgeCounts)}
            </p>
            <TabBar tabs={demoTabs} />
          </div>

          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              {t(s.simpleTabs)}
            </p>
            <TabBar
              tabs={[
                { id: "details", label: t(s.tabDetails) },
                { id: "history", label: t(s.tabHistory) },
                { id: "notes", label: t(s.tabNotes) },
              ]}
            />
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Dropdown Menu ── */}
      <ShowcaseSection title={t(s.sectionDropdownMenu)} className="mb-16">
        <Card className="p-6 space-y-6">
          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              {t(s.withIconsAndDestructive)}
            </p>
            <DropdownMenu
              trigger={<Button variant="secondary">{t(s.actions)}</Button>}
              items={demoMenuItems}
            />
          </div>

          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              {t(s.simpleTextMenu)}
            </p>
            <DropdownMenu
              trigger={<Button variant="ghost">{t(s.options)}</Button>}
              items={[
                { id: "profile", label: t(s.viewProfile), onSelect: () => {} },
                { id: "settings", label: t(s.settings), onSelect: () => {} },
                { type: "separator" },
                { id: "logout", label: t(s.logOut), onSelect: () => {} },
              ]}
            />
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Skeleton ── */}
      <ShowcaseSection title={t(s.sectionSkeleton)} className="mb-16">
        <Card className="p-6 space-y-8">
          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              {t(s.textLines)}
            </p>
            <div className="space-y-2 max-w-sm">
              <Skeleton variant="text" width="60%" />
              <Skeleton variant="text" />
              <Skeleton variant="text" width="80%" />
            </div>
          </div>

          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              {t(s.circleAvatar)}
            </p>
            <div className="flex items-center gap-4">
              <Skeleton variant="circle" width={48} height={48} />
              <Skeleton variant="circle" width={36} height={36} />
              <Skeleton variant="circle" width={24} height={24} />
            </div>
          </div>

          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              {t(s.skeletonCard)}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
              <Skeleton variant="card" height={120} />
              <Skeleton variant="card" height={120} />
            </div>
          </div>

          <div className="stagger-child">
            <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary mb-4">
              {t(s.composedProfileCard)}
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
          {t(s.skeletonDesc)}
          {" "}{t(s.skeletonUses)}<code className="font-data">spa-skeleton</code> + <code className="font-data">shimmer</code>{t(s.skeletonKeyframes)}
        </p>
      </ShowcaseSection>
    </>
  );
}
