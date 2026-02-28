import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  gradient?: boolean;
  className?: string;
}

/**
 * PageHeader — section title with gradient text treatment, subtitle.
 */
export function PageHeader({
  title,
  subtitle,
  gradient = true,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn("mb-8 space-y-2", className)}>
      <h1
        className={cn(
          "font-display text-4xl font-bold tracking-tight break-words",
          gradient && "text-gradient text-gradient-primary",
        )}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="text-text-secondary text-lg max-w-[50ch]">{subtitle}</p>
      )}
    </header>
  );
}
