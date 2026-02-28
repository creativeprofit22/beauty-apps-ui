/**
 * Utility: class name merger
 * Combines class names, filtering out falsy values.
 */
export function cn(
  ...inputs: (string | undefined | null | false)[]
): string {
  return inputs.filter(Boolean).join(" ");
}
