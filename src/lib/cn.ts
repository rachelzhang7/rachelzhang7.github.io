/**
 * Minimal class-name joiner.
 *
 * Deliberately not `clsx` + `tailwind-merge`: this site has a small, hand-built
 * component set with no conflicting utility chains to resolve, so a 12-line
 * helper beats two dependencies and their bundle cost.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
