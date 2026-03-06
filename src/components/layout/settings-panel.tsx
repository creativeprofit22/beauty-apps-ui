import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SettingsSection {
  heading: string;
  description?: string;
  content: ReactNode;
}

interface SettingsPanelProps {
  sections: SettingsSection[];
  className?: string;
}

export function SettingsPanel({ sections, className }: SettingsPanelProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      {sections.map((section, i) => (
        <div key={section.heading}>
          {i > 0 && <hr className="border-border my-0" />}
          <div className="py-6 first:pt-0 last:pb-0">
            <h3 className="font-display text-base font-semibold text-text-primary">
              {section.heading}
            </h3>
            {section.description && (
              <p className="mt-1 text-sm text-text-secondary">
                {section.description}
              </p>
            )}
            <div className="mt-4">{section.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
