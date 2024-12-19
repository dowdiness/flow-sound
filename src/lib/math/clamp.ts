/**
 * Clamp value to [min..max] range.
 * @param {number} v - Value to clamp
 * @param {number} [min=0] - Optional mininum value
 * @param {number} [max=1] - Optional maxinum value
 * @returns Clamped value
 */
export function clamp(v: number, min: number = 0, max: number = 1) {
  return Math.max(min, Math.min(max, v));
}
