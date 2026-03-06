"use client";

import { useState } from "react";
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

/* ── Mock admin nav ──────────────────────────────────── */

const adminNavItems: NavItemData[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11" y="3" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="3" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <rect x="11" y="11" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "appointments",
    label: "Appointments",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 8h14M7 4V2M13 4V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "clients",
    label: "Clients",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 17c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "services",
    label: "Services",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2l7 4v8l-7 4-7-4V6l7-4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M10 10l7-4M10 10v8M10 10L3 6" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "rewards",
    label: "Rewards",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M10 2l2.5 5 5.5.8-4 3.9.9 5.3L10 14.5 5.1 17l.9-5.3-4-3.9 5.5-.8L10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "settings",
    label: "Settings",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M15.8 4.2l-1.4 1.4M5.6 14.4l-1.4 1.4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

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

const appointmentColumns = [
  { key: "client", header: "Client", mobileLabel: "Client" },
  { key: "service", header: "Service", mobileLabel: "Service" },
  { key: "time", header: "Time", mobileLabel: "Time" },
  {
    key: "status",
    header: "Status",
    mobileLabel: "Status",
    render: (row: AppointmentRow) => (
      <Badge variant={statusBadgeVariant[row.status]}>
        {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
      </Badge>
    ),
  },
  {
    key: "revenue",
    header: "Revenue",
    numeric: true,
    mobileLabel: "Revenue",
  },
  {
    key: "trend",
    header: "Trend",
    mobileLabel: "Trend",
    render: (row: AppointmentRow) => <SparkBar percent={row.trend} />,
  },
];

/* ── Page ──────────────────────────────────────────── */

export default function AdminPage() {
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

  return (
    <>
      <PageHeader
        title="Admin"
        subtitle="Dashboard stat cards, sidebar navigation, data tables, and toast notifications — the back-office experience."
      />

      {/* ── Stat Cards Grid ── */}
      <ShowcaseSection title="Dashboard Stats" className="mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="stagger-child">
            <StatCard
              label="Today's Bookings"
              value="24"
              progress={75}
              icon={
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M3 8h14M7 4V2M13 4V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              }
            />
          </div>
          <div className="stagger-child">
            <StatCard
              label="Revenue"
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
              label="New Clients"
              value="7"
              progress={35}
              icon={
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M4 17c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              }
            />
          </div>
          <div className="stagger-child">
            <StatCard
              label="Loyalty Points Earned"
              value="1,250"
              progress={88}
              icon={
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M10 2l2.5 5 5.5.8-4 3.9.9 5.3L10 14.5 5.1 17l.9-5.3-4-3.9 5.5-.8L10 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              }
            />
          </div>
        </div>
      </ShowcaseSection>

      {/* ── Sidebar Preview ── */}
      <ShowcaseSection title="Sidebar Navigation" className="mb-16">
        <div className="stagger-child flex items-start gap-4 mb-4">
          <Button
            size="sm"
            variant={sidebarCollapsed ? "primary" : "secondary"}
            onClick={() => setSidebarCollapsed(false)}
          >
            Expanded
          </Button>
          <Button
            size="sm"
            variant={sidebarCollapsed ? "secondary" : "primary"}
            onClick={() => setSidebarCollapsed(true)}
          >
            Collapsed
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
                Active:{" "}
                <span className="font-medium text-text-primary">
                  {adminNavItems.find((n) => n.id === sidebarActiveId)?.label}
                </span>
              </p>
              <p className="text-xs text-text-tertiary mt-1">
                Click sidebar items to navigate. Toggle collapsed mode for icon-only view.
              </p>
            </div>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Search & Filter ── */}
      <ShowcaseSection title="Search &amp; Filter" className="mb-16">
        <Card className="p-6">
          <div className="stagger-child space-y-4">
            <p className="text-sm text-text-secondary">
              Search bar with debounced callback and clear button. Filter pills in single-select and multi-select modes.
            </p>
            <SearchBar placeholder="Search appointments\u2026" />
            <div>
              <p className="text-xs text-text-tertiary mb-2">Single-select</p>
              <FilterPills options={["Massage", "Facial", "Manicure", "Pedicure", "Aromatherapy"]} />
            </div>
            <div>
              <p className="text-xs text-text-tertiary mb-2">Multi-select</p>
              <FilterPills
                options={["Confirmed", "Pending", "Completed", "Cancelled"]}
                mode="multi"
              />
            </div>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Table Ledger ── */}
      <ShowcaseSection title="Appointments Ledger" className="mb-16">
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
      <ShowcaseSection title="Toast Notifications" className="mb-16">
        <Card className="p-6">
          <div className="stagger-child">
            <p className="text-sm text-text-secondary mb-4">
              Trigger toast notifications to preview their appearance and auto-dismiss behavior.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="primary"
                size="sm"
                onClick={() =>
                  showToast(
                    "success",
                    "Booking confirmed",
                    "Hot Stone Massage with Emma — Today at 9:00 AM",
                  )
                }
              >
                Success Toast
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  showToast(
                    "warning",
                    "Schedule conflict",
                    "Two bookings overlap at 2:00 PM — please review",
                  )
                }
              >
                Warning Toast
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  showToast(
                    "error",
                    "Payment failed",
                    "Card ending in 4242 was declined — try another method",
                  )
                }
              >
                Error Toast
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  showToast(
                    "info",
                    "New client signed up",
                    "Isabella L. created an account and booked Aromatherapy",
                  )
                }
              >
                Info Toast
              </Button>
            </div>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Dialog ── */}
      <ShowcaseSection title="Dialog" className="mb-16">
        <Card className="p-6">
          <div className="stagger-child">
            <p className="text-sm text-text-secondary mb-4">
              Centered modal with backdrop blur, title/description/footer slots, escape-to-close, and focus trap.
            </p>
            <Button variant="primary" size="sm" onClick={() => setDialogOpen(true)}>
              Open Dialog
            </Button>
          </div>
        </Card>
      </ShowcaseSection>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title="Edit Service"
        description="Update the details for this service offering."
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={() => setDialogOpen(false)}>
              Save Changes
            </Button>
          </>
        }
      >
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Service Name</label>
            <div className="h-10 rounded-md bg-surface-sunken ring-1 ring-border px-3 flex items-center text-sm text-text-secondary">
              Hot Stone Massage
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1">Duration</label>
            <div className="h-10 rounded-md bg-surface-sunken ring-1 ring-border px-3 flex items-center text-sm text-text-secondary">
              60 minutes
            </div>
          </div>
        </div>
      </Dialog>

      {/* ── Confirmation Dialog ── */}
      <ShowcaseSection title="Confirmation Dialog" className="mb-16">
        <Card className="p-6">
          <div className="stagger-child">
            <p className="text-sm text-text-secondary mb-4">
              Wraps Dialog with confirm/cancel buttons. Destructive variant shows red confirm button with loading state.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" size="sm" onClick={() => setConfirmOpen(true)}>
                Standard Confirm
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setConfirmDestructiveOpen(true)}>
                Destructive Confirm
              </Button>
            </div>
          </div>
        </Card>
      </ShowcaseSection>

      <ConfirmationDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => setConfirmOpen(false)}
        title="Reschedule Appointment"
        message="This will move Emma W.'s Hot Stone Massage from 9:00 AM to 2:00 PM. The client will be notified via email."
        confirmLabel="Reschedule"
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
        title="Cancel Appointment"
        message="This will permanently cancel Ava M.'s Luxury Pedicure and issue a refund of $65. This action cannot be undone."
        confirmLabel="Cancel Appointment"
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
      <ShowcaseSection title="Month Calendar" className="mb-16">
        <Card className="p-6">
          <div className="stagger-child">
            <Calendar
              appointments={[
                { date: 2, label: "Hot Stone — Emma W.", staff: "bronze" },
                { date: 2, label: "Facial — Sofia R.", staff: "silver" },
                { date: 5, label: "Gel Manicure — Maya J.", staff: "gold" },
                { date: 5, label: "Swedish — Olivia T.", staff: "bronze" },
                { date: 5, label: "Pedicure — Ava M.", staff: "black" },
                { date: 5, label: "Aromatherapy — Isabella L.", staff: "silver" },
                { date: 8, label: "Deep Tissue — Emma W.", staff: "bronze" },
                { date: 10, label: "Classic Facial — Sofia R.", staff: "silver" },
                { date: 10, label: "Lash Lift — Maya J.", staff: "gold" },
                { date: 12, label: "Hot Stone — Olivia T.", staff: "bronze" },
                { date: 15, label: "Gel Manicure — Ava M.", staff: "black" },
                { date: 15, label: "Swedish — Emma W.", staff: "bronze" },
                { date: 18, label: "Aromatherapy — Isabella L.", staff: "silver" },
                { date: 18, label: "Classic Facial — Sofia R.", staff: "gold" },
                { date: 18, label: "Pedicure — Maya J.", staff: "black" },
                { date: 18, label: "Hot Stone — Olivia T.", staff: "bronze" },
                { date: 20, label: "Deep Tissue — Ava M.", staff: "silver" },
                { date: 22, label: "Lash Lift — Emma W.", staff: "gold" },
                { date: 25, label: "Swedish — Sofia R.", staff: "bronze" },
                { date: 25, label: "Gel Manicure — Maya J.", staff: "silver" },
                { date: 28, label: "Aromatherapy — Olivia T.", staff: "gold" },
              ]}
            />
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Charts (moved to /charts) ── */}
      <ShowcaseSection title="Charts" className="mb-16">
        <Card className="p-6">
          <div className="stagger-child">
            <p className="text-sm text-text-secondary mb-3">
              Line, bar, and donut chart demos have moved to a dedicated page for better performance.
            </p>
            <a
              href="/charts"
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: "var(--primary)" }}
            >
              View Charts showcase
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Empty State ── */}
      <ShowcaseSection title="Empty State" className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-0 overflow-hidden">
            <div className="stagger-child">
              <EmptyState
                heading="No appointments yet"
                description="When clients book services, their appointments will appear here."
                action={{ label: "Create Appointment", onClick: () => {} }}
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
                heading="No reviews found"
                description="Client reviews and ratings will be displayed in this section."
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
      <ShowcaseSection title="Status Indicator" className="mb-16">
        <Card className="p-6">
          <div className="stagger-child">
            <p className="text-sm text-text-secondary mb-4">
              Inline status dots with semantic colors. The &ldquo;live&rdquo; state includes a pulse animation.
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
      <ShowcaseSection title="Integration Cards" className="mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="stagger-child">
            <IntegrationCard
              name="Stripe"
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
              name="Google Calendar"
              connected={false}
              icon={
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M3 8h14M7 4V2M13 4V2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              }
            />
          </div>
          <div className="stagger-child">
            <IntegrationCard
              name="Twilio SMS"
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
      <ShowcaseSection title="Settings Panel" className="mb-16">
        <Card className="p-6">
          <div className="stagger-child">
            <SettingsPanel
              sections={[
                {
                  heading: "Business Profile",
                  description: "Your business name, logo, and contact details visible to clients.",
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
                  heading: "Booking Preferences",
                  description: "Configure default booking durations, buffer times, and cancellation policies.",
                  content: (
                    <div className="flex flex-wrap gap-3">
                      <Badge>30 min buffer</Badge>
                      <Badge variant="info">24h cancellation</Badge>
                      <Badge variant="success">Auto-confirm</Badge>
                    </div>
                  ),
                },
                {
                  heading: "Notifications",
                  description: "Choose which events trigger email or SMS notifications to your team.",
                  content: (
                    <div className="space-y-2 text-sm text-text-secondary">
                      <p>New booking — Email + SMS</p>
                      <p>Cancellation — Email only</p>
                      <p>Review received — Push notification</p>
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Activity Feed ── */}
      <ShowcaseSection title="Activity Feed" className="mb-16">
        <Card className="p-6">
          <div className="stagger-child">
            <ActivityFeed
              items={[
                { id: "a1", initials: "SW", action: "Sarah booked Hot Stone Massage", timestamp: "2 min ago", detail: { label: "Booking", variant: "success" } },
                { id: "a2", initials: "EW", action: "Emma cancelled Gel Manicure appointment", timestamp: "18 min ago", detail: { label: "Cancellation", variant: "error" } },
                { id: "a3", initials: "MJ", action: "Maya redeemed 500 loyalty points", timestamp: "45 min ago", detail: { label: "Rewards", variant: "info" } },
                { id: "a4", initials: "OT", action: "Olivia left a 5-star review for Swedish Massage", timestamp: "1 hr ago" },
                { id: "a5", initials: "AM", action: "Ava upgraded to Gold tier", timestamp: "2 hr ago", detail: { label: "Tier Up", variant: "warning" } },
                { id: "a6", initials: "IL", action: "Isabella rescheduled Aromatherapy to Friday", timestamp: "3 hr ago" },
                { id: "a7", initials: "SR", action: "Sofia completed Classic Facial checkout", timestamp: "4 hr ago", detail: { label: "Payment", variant: "success" } },
              ]}
            />
          </div>
        </Card>
      </ShowcaseSection>

      {/* ── Audit Log ── */}
      <ShowcaseSection title="Audit Log" className="mb-16">
        <Card className="p-0 overflow-hidden">
          <div className="stagger-child">
            <AuditRow initials="AD" verb="Created" entity="service Hot Stone Massage" timestamp="Today 9:12 AM" ip="192.168.1.42" />
            <AuditRow initials="AD" verb="Updated" entity="pricing for Gel Manicure" timestamp="Today 9:08 AM" ip="192.168.1.42" />
            <AuditRow initials="MG" verb="Deleted" entity="expired promo SUMMER25" timestamp="Today 8:55 AM" ip="10.0.0.15" />
            <AuditRow initials="AD" verb="Approved" entity="refund #RF-1042 ($65.00)" timestamp="Yesterday 4:30 PM" ip="192.168.1.42" />
            <AuditRow initials="MG" verb="Invited" entity="staff member elena@spa.com" timestamp="Yesterday 2:15 PM" ip="10.0.0.15" />
            <AuditRow initials="AD" verb="Toggled" entity="SMS notifications ON" timestamp="Yesterday 11:00 AM" ip="192.168.1.42" />
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
