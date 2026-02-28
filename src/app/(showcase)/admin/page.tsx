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
import { Toast } from "@/components/feedback/toast";
import { Sidebar } from "@/components/navigation/sidebar";
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
          <div className="stagger-child flex">
            <div
              className="border-r border-border bg-surface-raised transition-all duration-300"
              style={{ width: sidebarCollapsed ? "56px" : "240px" }}
            >
              <Sidebar
                items={adminNavItems}
                activeId={sidebarActiveId}
                onNavigate={setSidebarActiveId}
                collapsed={sidebarCollapsed}
              />
            </div>
            <div className="flex-1 p-6">
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
