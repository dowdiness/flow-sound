import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Type safe includes
 * @param array
 * @param input
 */
export function includes<A extends ReadonlyArray<unknown>>(array: A, input: unknown): input is A[number] {
  return array.includes(input)
}
