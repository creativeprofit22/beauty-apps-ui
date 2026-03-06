"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

/* ── Types ── */

interface CalendarAppointment {
  date: number; // day of month
  label: string;
  /** Staff color — maps to tier color tokens */
  staff: "bronze" | "silver" | "gold" | "black";
}

interface CalendarProps {
  /** Initial year (defaults to current) */
  year?: number;
  /** Initial month 0-11 (defaults to current) */
  month?: number;
  /** Appointment dots to render */
  appointments?: CalendarAppointment[];
  className?: string;
}

const DAY_ABBRS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const STAFF_DOT_COLORS: Record<CalendarAppointment["staff"], string> = {
  bronze: "bg-tier-bronze",
  silver: "bg-tier-silver",
  gold: "bg-tier-gold",
  black: "bg-tier-black",
};

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

function getMonthName(month: number): string {
  return MONTH_NAMES[month] ?? "January";
}

/** Monday-based day-of-week: 0=Mon, 6=Sun */
function getMondayBasedDay(date: Date): number {
  return (date.getDay() + 6) % 7;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOffset(year: number, month: number): number {
  return getMondayBasedDay(new Date(year, month, 1));
}

/**
 * Calendar — month-view grid with appointment dots.
 * CSS grid layout, prev/next navigation, today highlight,
 * staff color-coded dots (tier tokens), muted outside-month days.
 */
export function Calendar({
  year: initialYear,
  month: initialMonth,
  appointments = [],
  className,
}: CalendarProps) {
  const now = new Date();
  const [year, setYear] = useState(initialYear ?? now.getFullYear());
  const [month, setMonth] = useState(initialMonth ?? now.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const todayYear = now.getFullYear();
  const todayMonth = now.getMonth();
  const todayDate = now.getDate();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOffset = getFirstDayOffset(year, month);
  const daysInPrevMonth = getDaysInMonth(year, month === 0 ? 11 : month - 1);

  // Total cells: 6 rows * 7 = 42
  const totalCells = 42;
  const trailingDays = totalCells - firstDayOffset - daysInMonth;

  // Group appointments by day
  const appointmentsByDay = new Map<number, CalendarAppointment[]>();
  for (const apt of appointments) {
    const existing = appointmentsByDay.get(apt.date);
    if (existing) {
      existing.push(apt);
    } else {
      appointmentsByDay.set(apt.date, [apt]);
    }
  }

  const goToPrevMonth = useCallback(() => {
    setSelectedDay(null);
    if (month === 0) {
      setYear((y) => y - 1);
      setMonth(11);
    } else {
      setMonth((m) => m - 1);
    }
  }, [month]);

  const goToNextMonth = useCallback(() => {
    setSelectedDay(null);
    if (month === 11) {
      setYear((y) => y + 1);
      setMonth(0);
    } else {
      setMonth((m) => m + 1);
    }
  }, [month]);

  return (
    <div className={cn("w-full", className)}>
      {/* ── Header: prev / month-year / next ── */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={goToPrevMonth}
          className={cn(
            "inline-flex items-center justify-center w-9 h-9 rounded-md",
            "text-text-secondary hover:bg-surface-interactive-hover hover:text-text-primary",
            "transition-colors",
          )}
          style={{ transitionDuration: "var(--duration-fast)" }}
          aria-label="Previous month"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <h3 className="text-base font-semibold text-text-primary select-none">
          {getMonthName(month)} {year}
        </h3>

        <button
          type="button"
          onClick={goToNextMonth}
          className={cn(
            "inline-flex items-center justify-center w-9 h-9 rounded-md",
            "text-text-secondary hover:bg-surface-interactive-hover hover:text-text-primary",
            "transition-colors",
          )}
          style={{ transitionDuration: "var(--duration-fast)" }}
          aria-label="Next month"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* ── Day abbreviation header ── */}
      <div className="grid grid-cols-7 mb-1">
        {DAY_ABBRS.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold uppercase tracking-wider text-text-tertiary py-2 select-none"
          >
            {day}
          </div>
        ))}
      </div>

      {/* ── Day grid: 6 rows x 7 cols ── */}
      <div className="grid grid-cols-7">
        {/* Leading days from previous month */}
        {Array.from({ length: firstDayOffset }, (_, i) => {
          const day = daysInPrevMonth - firstDayOffset + 1 + i;
          return (
            <div
              key={`prev-${i}`}
              className="relative flex flex-col items-center py-1.5 min-h-[52px]"
            >
              <span className="text-xs text-text-tertiary/40 select-none">{day}</span>
            </div>
          );
        })}

        {/* Current month days */}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const isToday = year === todayYear && month === todayMonth && day === todayDate;
          const isSelected = selectedDay === day;
          const dayAppointments = appointmentsByDay.get(day);
          const visibleDots = dayAppointments?.slice(0, 3) ?? [];
          const overflow = (dayAppointments?.length ?? 0) - 3;

          return (
            <button
              key={`day-${day}`}
              type="button"
              onClick={() => setSelectedDay(isSelected ? null : day)}
              className={cn(
                "relative flex flex-col items-center py-1.5 min-h-[52px] rounded-md",
                "transition-colors cursor-pointer",
                "hover:bg-surface-interactive",
                isToday && !isSelected && "ring-2 ring-accent",
                isSelected && "bg-surface-interactive-hover",
              )}
              style={{ transitionDuration: "var(--duration-fast)" }}
            >
              <span
                className={cn(
                  "text-sm leading-none select-none",
                  isToday ? "font-bold text-accent" : "text-text-primary",
                  isSelected && "font-bold",
                )}
              >
                {day}
              </span>

              {/* Appointment dots */}
              {visibleDots.length > 0 && (
                <div className="flex items-center gap-0.5 mt-1.5">
                  {visibleDots.map((apt, idx) => (
                    <span
                      key={idx}
                      className={cn("w-1.5 h-1.5 rounded-full", STAFF_DOT_COLORS[apt.staff])}
                      title={apt.label}
                    />
                  ))}
                </div>
              )}

              {/* Overflow indicator */}
              {overflow > 0 && (
                <span className="text-[9px] leading-none text-text-tertiary mt-0.5 select-none">
                  +{overflow}
                </span>
              )}
            </button>
          );
        })}

        {/* Trailing days from next month */}
        {Array.from({ length: trailingDays }, (_, i) => (
          <div
            key={`next-${i}`}
            className="relative flex flex-col items-center py-1.5 min-h-[52px]"
          >
            <span className="text-xs text-text-tertiary/40 select-none">{i + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
