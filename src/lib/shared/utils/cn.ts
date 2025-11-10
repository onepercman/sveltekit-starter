import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export type { ClassValue } from "clsx";

/**
 * Utility function for merging Tailwind CSS classes
 * Uses clsx for conditional class names and tailwind-merge for Tailwind class deduplication
 * Optimized for Svelte applications with alias support
 * 
 * @example
 * ```typescript
 * import { cn } from "$lib/shared/utils";
 * cn("base-class", condition && "conditional-class");
 * ```
 */
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
