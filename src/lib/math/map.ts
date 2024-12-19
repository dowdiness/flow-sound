/**
 * Re-maps a number from one range to another.
 * @param v Value to remap
 * @param start1 lower bound of the value's source range
 * @param stop1 upper bound of the value's source range
 * @param start2 lower bound of the value's target range
 * @param stop2 upper bound of the value's target range
 * @returns
 */
export function map (
  v: number,
  srcLower: number,
  srcUpper: number,
  targetLower: number,
  tergetUpper: number
) {
  const mappedVal = (v - srcLower) / (srcUpper - srcLower) * (tergetUpper - targetLower) + targetLower;
  return mappedVal
}

export function map01To (v: number, min: number, max: number) {
  return map(v, 0, 1, min, max)
}

export function mapFrom01 (v: number, min: number, max: number) {
  return map(v, min, max, 0, 1)
}
