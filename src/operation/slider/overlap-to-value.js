// @flow

export function overlapToValue(overlap: number[]): ?number {
  if (overlap.length <= 0) {
    return null;
  }

  return overlap.reduce((a, b) => Math.max(a, b));
}