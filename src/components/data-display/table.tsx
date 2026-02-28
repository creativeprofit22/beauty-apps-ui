import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TableColumn<T> {
  key: string;
  header: string;
  /** Mark numeric columns for tabular-nums + right-alignment */
  numeric?: boolean;
  /** Mobile label for card-row hybrid (data-label attribute) */
  mobileLabel?: string;
  render?: (row: T) => ReactNode;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  /** Unique key extractor for each row */
  rowKey: (row: T) => string;
  className?: string;
}

/**
 * Table — "Ledger" style.
 * Ruled rows, 2px header border, tabular-nums numeric columns,
 * warm hover tint. Card-row hybrid on mobile via CSS display + data-label.
 */
export function Table<T extends Record<string, unknown>>({
  columns,
  data,
  rowKey,
  className,
}: TableProps<T>) {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <table className="w-full border-collapse min-w-[600px]">
        <thead>
          <tr
            className="border-b-2 border-border"
            style={{ borderBottomWidth: "2px" }}
          >
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "px-4 py-3 text-xs font-semibold uppercase tracking-wider text-text-tertiary",
                  "text-left whitespace-nowrap",
                  "hidden md:table-cell",
                  col.numeric && "text-right",
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr
              key={rowKey(row)}
              className={cn(
                "border-b border-border-muted",
                "transition-colors duration-fast",
                "hover:bg-surface-interactive",
                // Mobile: display as block-level card
                "flex flex-col gap-1 px-4 py-3 md:table-row md:px-0 md:py-0",
              )}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  data-label={col.mobileLabel ?? col.header}
                  className={cn(
                    "md:px-4 md:py-3",
                    "text-sm text-text-primary",
                    col.numeric && "font-data tabular-nums md:text-right",
                    // Mobile: show label before value
                    "before:content-[attr(data-label)] before:font-semibold before:text-text-tertiary before:text-xs before:uppercase before:tracking-wider before:mr-2 before:inline md:before:content-none",
                  )}
                >
                  {col.render
                    ? col.render(row)
                    : String(row[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
