"use client";

import { useState } from "react";
import { useLocale, glossary } from "@/lib/i18n";
import { adminStrings as s } from "@/lib/strings/admin";
import { PageHeader } from "@/components/layout/page-header";
import { ShowcaseSection } from "@/components/layout/showcase-section";
import { Card } from "@/components/primitives/card";
import { StatCard } from "@/components/data-display/stat-card";
import { Table } from "@/components/data-display/table";
import { SparkBar } from "@/components/data-display/spark-bar";
import { Badge } from "@/components/primitives/badge";
import { Button } from "@/components/primitives/button";
import { SearchBar } from "@/components/forms/search-bar";
import { FilterPills } from "@/components/forms/filter-pills";
import { Toast } from "@/components/feedback/toast";
import { Dialog } from "@/components/feedback/dialog";
import { ConfirmationDialog } from "@/components/feedback/confirmation-dialog";
import { EmptyState } from "@/components/feedback/empty-state";
import { StatusIndicator } from "@/components/feedback/status-indicator";
import { IntegrationCard } from "@/components/data-display/integration-card";
import { SettingsPanel } from "@/components/layout/settings-panel";
import { Sidebar } from "@/components/navigation/sidebar";
import { Calendar } from "@/components/data-display/calendar";
import { ActivityFeed } from "@/components/data-display/activity-feed";
import { AuditRow } from "@/components/data-display/audit-row";
import type { NavItemData } from "@/components/navigation/nav-item";

/* ── Mock table data ─────────────────────────────────── */

interface AppointmentRow {
  [key: string]: unknown;
  id: string;
  client: string;
  service: string;
  time: string;
  status: "confirmed" | "pending" | "completed" | "cancelled";
  revenue: string;
  trend: number;
}

const appointmentData: AppointmentRow[] = [
  { id: "1", client: "Emma W.", service: "Hot Stone Massage", time: "9:00 AM", status: "confirmed", revenue: "$120", trend: 85 },
  { id: "2", client: "Sofia R.", service: "Classic Facial", time: "10:30 AM", status: "completed", revenue: "$85", trend: 62 },
  { id: "3", client: "Maya J.", service: "Gel Manicure", time: "11:00 AM", status: "pending", revenue: "$45", trend: 40 },
  { id: "4", client: "Olivia T.", service: "Swedish Massage", time: "1:00 PM", status: "confirmed", revenue: "$95", trend: 72 },
  { id: "5", client: "Ava M.", service: "Luxury Pedicure", time: "2:30 PM", status: "cancelled", revenue: "$65", trend: 18 },
  { id: "6", client: "Isabella L.", service: "Aromatherapy", time: "3:00 PM", status: "confirmed", revenue: "$110", trend: 90 },
];

const statusBadgeVariant: Record<AppointmentRow["status"], "success" | "warning" | "error" | "info"> = {
  confirmed: "success",
  pending: "warning",
  cancelled: "error",
  completed: "info",
};

/* ── Sidebar icons ─────────────────────────────────── */

const navIcons = {
  dashboard: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="11" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  appointments: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 8h14M7 4V2M13 4V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  clients: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M4 17c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  services: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2l7 4v8l-7 4-7-4V6l7-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 10l7-4M10 10v8M10 10L3 6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  rewards: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2l2.5 5 5.5.8-4 3.9.9 5.3L10 14.5 5.1 17l.9-5.3-4-3.9 5.5-.8L10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  settings: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M15.8 4.2l-1.4 1.4M5.6 14.4l-1.4 1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

/* ── Page ──────────────────────────────────────────── */

export default function AdminPage() {
  const { t } = useLocale();

  const [sidebarActiveId, setSidebarActiveId] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmDestructiveOpen, setConfirmDestructiveOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [toast, setToast] = useState<{
    open: boolean;
    type: "success" | "error" | "warning" | "info";
    title: string;
    detail: string;
  }>({ open: false, type: "info", title: "", detail: "" });

  const showToast = (
    type: "success" | "error" | "warning" | "info",
    title: string,
    detail: string,
  ) => {
    setToast({ open: true, type, title, detail });
  };

  const adminNavItems: NavItemData[] = [
    { id: "dashboard", label: t(s.navDashboard), icon: navIcons.dashboard },
    { id: "appointments", label: t(s.navAppointments), icon: navIcons.appointments },
    { id: "clients", label: t(s.navClients), icon: navIcons.clients },
    { id: "services", label: t(s.navServices), icon: navIcons.services },
    { id: "rewards", label: t(s.navRewards), icon: navIcons.rewards },
    { id: "settings", label: t(s.navSettings), icon: navIcons.settings },
  ];

  const appointmentColumns = [
    { key: "client", header: t(s.colClient), mobileLabel: t(s.colClient) },
    { key: "service", header: t(s.colService), mobileLabel: t(s.colService) },
    { key: "time", header: t(s.colTime), mobileLabel: t(s.colTime) },
    {
      key: "status",
      header: t(s.colStatus),
      mobileLabel: t(s.colStatus),
      render: (row: AppointmentRow) => (
        <Badge variant={statusBadgeVariant[row.status]}>
          {t(glossary.statuses[row.status])}
        </Badge>
      ),
    },
    {
      key: "revenue",
      header: t(s.colRevenue),
      numeric: true,
      mobileLabel: t(s.colRevenue),
    },
    {
      key: "trend",
      header: t(s.colTrend),
      mobileLabel: t(s.colTrend),
      render: (row: AppointmentRow) => <SparkBar percent={row.trend} />,
    },
  ];

  return (
    <>
      <PageHeader
        title={t(s.title)}
        subtitle={t(s.subtitle)}
      />

      {/* ── Stat Cards Grid ── */}
      <ShowcaseSection title={t(s.sectionDashboardStats)} className="mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="stagger-child">
            <StatCard
              label={t(s.statTodaysBookings)}
              value="24"
              progress={75}
              icon={navIcons.appointments}
            />
          </div>
          <div className="stagger-child">
            <StatCard
              label={t(s.statRevenue)}
              value="$2,840"
              progress={62}
              icon={
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2v16M6 6h5.5a2.5 2.5 0 010 5H6m0 0h6a2.5 2.5 0 010 5H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            />
          </div>
          <div className="stagger-child">
            <StatCard
              label={t(s.statNewClients)}
              value="7"
              progress={35}
              icon={navIcons.clients}
            />
          </div>
          <div className="stagger-child">
            <StatCard
              label={t(s.statLoyaltyPoints)}
              value="1,250"
              progress={88}
              icon={navIcons.rewards}
            />
          </div>
        </div>
      </ShowcaseSection>

      {/* ── Sidebar Preview ── */}
      <ShowcaseSection title={t(s.sectionSidebarNav)} className="mb-16">
        <div className="stagger-child flex items-start gap-4 mb-4">
          <Button
            size="sm"
            variant={sidebarCollapsed ? "primary" : "secondary"}
            onClick={() => setSidebarCollapsed(false)}
          >
            {t(s.expanded)}
          </Button>
          <Button
            size="sm"
            variant={sidebarCollapsed ? "secondary" : "primary"}
            onClick={() => setSidebarCollapsed(true)}
          >
            {t(s.collapsed)}
          </Button>
        </div>
        <Card className="p-0 overflow-hidden">
          <div className="stagger-child flex min-w-0">
            <div
              className="shrink-0 border-r border-border bg-surface-sunken transition-all duration-300"
              style={{ width: sidebarCollapsed ? "56px" : "240px" }}
            >
              <Sidebar
                items={adminNavItems}
                activeId={sidebarActiveId}
                onNavigate={setSidebarActiveId}
                collapsed={sidebarCollapsed}
              />
            </div>
            <div className="flex-1 min-w-0 p-6">
              <p className="text-sm text-text-secondary">
                {t(s.activePrefix)}
                <span className="font-medium text-text-primary">
                  {adminNavItems.find((n) => n.id === sidebarActiveId)?.label}
                </span>
              </p>
              <p className="text-xs text-text-tertiary mt-1">
                {t(s.sidebarHint)}
              </p>
            </div>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Search & Filter ── */}
      <ShowcaseSection title={t(s.sectionSearchFilter)} className="mb-16">
        <Card className="p-6">
          <div className="stagger-child space-y-4">
            <p className="text-sm text-text-secondary">
              {t(s.searchFilterDesc)}
            </p>
            <SearchBar placeholder={t(s.searchPlaceholder)} />
            <div>
              <p className="text-xs text-text-tertiary mb-2">{t(s.singleSelect)}</p>
              <FilterPills options={[t(s.filterMassage), t(s.filterFacial), t(s.filterManicure), t(s.filterPedicure), t(s.filterAromatherapy)]} />
            </div>
            <div>
              <p className="text-xs text-text-tertiary mb-2">{t(s.multiSelect)}</p>
              <FilterPills
                options={[t(glossary.statuses.confirmed), t(glossary.statuses.pending), t(glossary.statuses.completed), t(glossary.statuses.cancelled)]}
                mode="multi"
              />
            </div>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Table Ledger ── */}
      <ShowcaseSection title={t(s.sectionAppointmentsLedger)} className="mb-16">
        <Card className="p-0 overflow-hidden">
          <div className="stagger-child">
            <Table<AppointmentRow>
              columns={appointmentColumns}
              data={appointmentData}
              rowKey={(row) => row.id as string}
            />
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Toast Triggers ── */}
      <ShowcaseSection title={t(s.sectionToastNotifications)} className="mb-16">
        <Card className="p-6">
          <div className="stagger-child">
            <p className="text-sm text-text-secondary mb-4">
              {t(s.toastDesc)}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="primary"
                size="sm"
                onClick={() =>
                  showToast(
                    "success",
                    t(s.toastBookingConfirmed),
                    t(s.toastBookingDetail),
                  )
                }
              >
                {t(s.btnSuccessToast)}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  showToast(
                    "warning",
                    t(s.toastScheduleConflict),
                    t(s.toastScheduleDetail),
                  )
                }
              >
                {t(s.btnWarningToast)}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  showToast(
                    "error",
                    t(s.toastPaymentFailed),
                    t(s.toastPaymentDetail),
                  )
                }
              >
                {t(s.btnErrorToast)}
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  showToast(
                    "info",
                    t(s.toastNewClientSignedUp),
                    t(s.toastNewClientDetail),
                  )
                }
              >
                {t(s.btnInfoToast)}
              </Button>
            </div>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Dialog ── */}
      <ShowcaseSection title={t(s.sectionDialog)} className="mb-16">
        <Card className="p-6">
          <div className="stagger-child">
            <p className="text-sm text-text-secondary mb-4">
              {t(s.dialogDesc)}
            </p>
            <Button variant="primary" size="sm" onClick={() => setDialogOpen(true)}>
              {t(s.btnOpenDialog)}
            </Button>
          </div>
        </Card>
      </ShowcaseSection>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={t(s.dialogEditServiceTitle)}
        description={t(s.dialogEditServiceDesc)}
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setDialogOpen(false)}>
              {t(glossary.actions.cancel)}
            </Button>
            <Button variant="primary" size="sm" onClick={() => setDialogOpen(false)}>
              {t(s.saveChanges)}
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">{t(s.labelServiceName)}</label>
            <div className="h-10 rounded-md bg-surface-sunken ring-1 ring-border px-3 flex items-center text-sm text-text-secondary">
              {t(s.mockHotStoneMassage)}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">{t(s.labelDuration)}</label>
            <div className="h-10 rounded-md bg-surface-sunken ring-1 ring-border px-3 flex items-center text-sm text-text-secondary">
              {t(s.mockDuration60)}
            </div>
          </div>
        </div>
      </Dialog>

      {/* ── Confirmation Dialog ── */}
      <ShowcaseSection title={t(s.sectionConfirmationDialog)} className="mb-16">
        <Card className="p-6">
          <div className="stagger-child">
            <p className="text-sm text-text-secondary mb-4">
              {t(s.confirmDialogDesc)}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" size="sm" onClick={() => setConfirmOpen(true)}>
                {t(s.btnStandardConfirm)}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setConfirmDestructiveOpen(true)}>
                {t(s.btnDestructiveConfirm)}
              </Button>
            </div>
          </div>
        </Card>
      </ShowcaseSection>

      <ConfirmationDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => setConfirmOpen(false)}
        title={t(s.confirmRescheduleTitle)}
        message={t(s.confirmRescheduleMsg)}
        confirmLabel={t(s.confirmRescheduleLabel)}
        icon={
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <path d="M3 8h14M7 4V2M13 4V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        }
      />

      <ConfirmationDialog
        open={confirmDestructiveOpen}
        onClose={() => { setConfirmDestructiveOpen(false); setConfirmLoading(false); }}
        onConfirm={() => {
          setConfirmLoading(true);
          setTimeout(() => { setConfirmDestructiveOpen(false); setConfirmLoading(false); }, 1500);
        }}
        title={t(s.confirmCancelTitle)}
        message={t(s.confirmCancelMsg)}
        confirmLabel={t(s.confirmCancelLabel)}
        destructive
        loading={confirmLoading}
        icon={
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10 6v5M10 13.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        }
      />

      {/* ── Calendar ── */}
      <ShowcaseSection title={t(s.sectionMonthCalendar)} className="mb-16">
        <Card className="p-6">
          <div className="stagger-child">
            <Calendar
              appointments={[
                { date: 2, label: t(s.calHotStoneEmma), staff: "bronze" },
                { date: 2, label: t(s.calFacialSofia), staff: "silver" },
                { date: 5, label: t(s.calGelManicureMaya), staff: "gold" },
                { date: 5, label: t(s.calSwedishOlivia), staff: "bronze" },
                { date: 5, label: t(s.calPedicureAva), staff: "black" },
                { date: 5, label: t(s.calAromatherapyIsabella), staff: "silver" },
                { date: 8, label: t(s.calDeepTissueEmma), staff: "bronze" },
                { date: 10, label: t(s.calClassicFacialSofia), staff: "silver" },
                { date: 10, label: t(s.calLashLiftMaya), staff: "gold" },
                { date: 12, label: t(s.calHotStoneOlivia), staff: "bronze" },
                { date: 15, label: t(s.calGelManicureAva), staff: "black" },
                { date: 15, label: t(s.calSwedishEmma), staff: "bronze" },
                { date: 18, label: t(s.calAromatherapyIsabella), staff: "silver" },
                { date: 18, label: t(s.calClassicFacialSofia), staff: "gold" },
                { date: 18, label: t(s.calPedicureMaya), staff: "black" },
                { date: 18, label: t(s.calHotStoneOlivia), staff: "bronze" },
                { date: 20, label: t(s.calDeepTissueAva), staff: "silver" },
                { date: 22, label: t(s.calLashLiftEmma), staff: "gold" },
                { date: 25, label: t(s.calSwedishSofia), staff: "bronze" },
                { date: 25, label: t(s.calGelManicureMayaB), staff: "silver" },
                { date: 28, label: t(s.calAromatherapyOlivia), staff: "gold" },
              ]}
            />
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Charts (moved to /charts) ── */}
      <ShowcaseSection title={t(s.sectionCharts)} className="mb-16">
        <Card className="p-6">
          <div className="stagger-child">
            <p className="text-sm text-text-secondary mb-3">
              {t(s.chartsDesc)}
            </p>
            <a
              href="/charts"
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: "var(--primary)" }}
            >
              {t(s.viewChartsShowcase)}
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Empty State ── */}
      <ShowcaseSection title={t(s.sectionEmptyState)} className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-0 overflow-hidden">
            <div className="stagger-child">
              <EmptyState
                heading={t(s.emptyNoAppointmentsHeading)}
                description={t(s.emptyNoAppointmentsDesc)}
                action={{ label: t(s.emptyCreateAppointment), onClick: () => {} }}
                icon={
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <rect x="8" y="10" width="32" height="30" rx="4" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M8 18h32M16 10V6M32 10V6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M20 28h8M24 24v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                }
              />
            </div>
          </Card>
          <Card className="p-0 overflow-hidden">
            <div className="stagger-child">
              <EmptyState
                heading={t(s.emptyNoReviewsHeading)}
                description={t(s.emptyNoReviewsDesc)}
                icon={
                  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                    <path d="M24 6l6 12 13 2-9.5 9 2.3 13L24 35.5 11.2 42l2.3-13L4 20l13-2 7-12z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                }
              />
            </div>
          </Card>
        </div>
      </ShowcaseSection>

      {/* ── Status Indicator ── */}
      <ShowcaseSection title={t(s.sectionStatusIndicator)} className="mb-16">
        <Card className="p-6">
          <div className="stagger-child">
            <p className="text-sm text-text-secondary mb-4">
              {t(s.statusIndicatorDesc)}
            </p>
            <div className="flex flex-wrap gap-6">
              <StatusIndicator state="live" />
              <StatusIndicator state="paused" />
              <StatusIndicator state="draft" />
              <StatusIndicator state="connected" />
              <StatusIndicator state="disconnected" />
            </div>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Integration Cards ── */}
      <ShowcaseSection title={t(s.sectionIntegrationCards)} className="mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="stagger-child">
            <IntegrationCard
              name={t(s.integrationStripe)}
              connected
              apiKey="sk_live_51HG3jK2eZvKYlo2C0EXAMPLE"
              icon={
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2v16M6 6h5.5a2.5 2.5 0 010 5H6m0 0h6a2.5 2.5 0 010 5H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            />
          </div>
          <div className="stagger-child">
            <IntegrationCard
              name={t(s.integrationGoogleCalendar)}
              connected={false}
              icon={navIcons.appointments}
            />
          </div>
          <div className="stagger-child">
            <IntegrationCard
              name={t(s.integrationTwilioSms)}
              connected
              apiKey="AC2a3b4c5d6e7f8g9h0iEXAMPLE"
              icon={
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="3" y="4" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M3 7l7 4 7-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              }
            />
          </div>
        </div>
      </ShowcaseSection>

      {/* ── Settings Panel ── */}
      <ShowcaseSection title={t(s.sectionSettingsPanel)} className="mb-16">
        <Card className="p-6">
          <div className="stagger-child">
            <SettingsPanel
              sections={[
                {
                  heading: t(s.settingsBusinessProfile),
                  description: t(s.settingsBusinessProfileDesc),
                  content: (
                    <div className="space-y-3 max-w-md">
                      <div className="h-10 rounded-md bg-surface-sunken ring-1 ring-border px-3 flex items-center text-sm text-text-secondary">
                        Serenity Spa & Wellness
                      </div>
                      <div className="h-10 rounded-md bg-surface-sunken ring-1 ring-border px-3 flex items-center text-sm text-text-secondary">
                        hello@serenityspa.com
                      </div>
                    </div>
                  ),
                },
                {
                  heading: t(s.settingsBookingPrefs),
                  description: t(s.settingsBookingPrefsDesc),
                  content: (
                    <div className="flex flex-wrap gap-3">
                      <Badge>{t(s.badge30MinBuffer)}</Badge>
                      <Badge variant="info">{t(s.badge24hCancellation)}</Badge>
                      <Badge variant="success">{t(s.badgeAutoConfirm)}</Badge>
                    </div>
                  ),
                },
                {
                  heading: t(s.settingsNotifications),
                  description: t(s.settingsNotificationsDesc),
                  content: (
                    <div className="space-y-2 text-sm text-text-secondary">
                      <p>{t(s.notifNewBooking)}</p>
                      <p>{t(s.notifCancellation)}</p>
                      <p>{t(s.notifReviewReceived)}</p>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Activity Feed ── */}
      <ShowcaseSection title={t(s.sectionActivityFeed)} className="mb-16">
        <Card className="p-6">
          <div className="stagger-child">
            <ActivityFeed
              items={[
                { id: "a1", initials: "SW", action: t(s.actSarahBooked), timestamp: t(s.time2MinAgo), detail: { label: t(s.detailBooking), variant: "success" } },
                { id: "a2", initials: "EW", action: t(s.actEmmaCancelled), timestamp: t(s.time18MinAgo), detail: { label: t(s.detailCancellation), variant: "error" } },
                { id: "a3", initials: "MJ", action: t(s.actMayaRedeemed), timestamp: t(s.time45MinAgo), detail: { label: t(s.detailRewards), variant: "info" } },
                { id: "a4", initials: "OT", action: t(s.actOliviaReview), timestamp: t(s.time1HrAgo) },
                { id: "a5", initials: "AM", action: t(s.actAvaUpgraded), timestamp: t(s.time2HrAgo), detail: { label: t(s.detailTierUp), variant: "warning" } },
                { id: "a6", initials: "IL", action: t(s.actIsabellaRescheduled), timestamp: t(s.time3HrAgo) },
                { id: "a7", initials: "SR", action: t(s.actSofiaCompleted), timestamp: t(s.time4HrAgo), detail: { label: t(s.detailPayment), variant: "success" } },
              ]}
            />
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Audit Log ── */}
      <ShowcaseSection title={t(s.sectionAuditLog)} className="mb-16">
        <Card className="p-0 overflow-hidden">
          <div className="stagger-child">
            <AuditRow initials="AD" verb={t(s.auditCreated)} entity={t(s.auditEntityHotStone)} timestamp={t(s.auditTimeToday912)} ip="192.168.1.42" />
            <AuditRow initials="AD" verb={t(s.auditUpdated)} entity={t(s.auditEntityGelPricing)} timestamp={t(s.auditTimeToday908)} ip="192.168.1.42" />
            <AuditRow initials="MG" verb={t(s.auditDeleted)} entity={t(s.auditEntityExpiredPromo)} timestamp={t(s.auditTimeToday855)} ip="10.0.0.15" />
            <AuditRow initials="AD" verb={t(s.auditApproved)} entity={t(s.auditEntityRefund)} timestamp={t(s.auditTimeYesterday430)} ip="192.168.1.42" />
            <AuditRow initials="MG" verb={t(s.auditInvited)} entity={t(s.auditEntityStaffInvite)} timestamp={t(s.auditTimeYesterday215)} ip="10.0.0.15" />
            <AuditRow initials="AD" verb={t(s.auditToggled)} entity={t(s.auditEntitySmsToggle)} timestamp={t(s.auditTimeYesterday1100)} ip="192.168.1.42" />
          </div>
        </Card>
      </ShowcaseSection>

      {/* Toast instance */}
      <Toast
        open={toast.open}
        onClose={() => setToast((t) => ({ ...t, open: false }))}
        type={toast.type}
        title={toast.title}
        detail={toast.detail}
        duration={4000}
      />
    </>
  );
}
