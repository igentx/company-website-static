import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Utility function to merge Tailwind CSS classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Check if we're in preview mode (NEXT_PUBLIC_ENVIRONMENT=preview).
 */
export function isPreview() {
  return process.env.NEXT_PUBLIC_ENVIRONMENT === 'preview'
}
