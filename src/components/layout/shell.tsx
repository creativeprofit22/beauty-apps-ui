"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ShellProps {
  sidebar?: ReactNode | ((collapsed: boolean) => ReactNode);
  children: ReactNode;
}

/**
 * Shell — sidebar + main content area wrapper.
 * Sidebar collapses on screens below lg breakpoint.
 */
export function Shell({ sidebar, children }: ShellProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-dvh">
      {sidebar && (
        <aside
          className={cn(
            "hidden lg:flex flex-col border-r border-border",
            "transition-[width] duration-slow",
            collapsed ? "w-[var(--sidebar-collapsed)]" : "w-[var(--sidebar-width)]",
          )}
          style={{
            willChange: "width",
            background: "linear-gradient(180deg, var(--surface-warm-1), var(--surface-raised))",
          }}
        >
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            {typeof sidebar === "function" ? sidebar(collapsed) : sidebar}
          </div>
          <button
            onClick={() => setCollapsed((c) => !c)}
            className={cn(
              "flex items-center justify-center",
              "h-12 border-t border-border",
              "text-text-secondary hover:text-text-primary",
              "transition-colors duration-normal",
            )}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className={cn(
                "transition-transform duration-normal",
                collapsed && "rotate-180",
              )}
            >
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </aside>
      )}
      <main className="flex-1 min-w-0 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
