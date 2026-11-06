export interface Bounds {
  readonly minX: number;
  readonly minY: number;
  readonly maxX: number;
  readonly maxY: number;
}
export interface AxisMap {
  readonly scaleX: number;
  readonly scaleY: number;
  readonly translateX: number;
  readonly translateY: number;
}
export function mapBounds(source: Bounds, target: Bounds): AxisMap {
  for (const b of [source, target])
    if (
      !b ||
      ![b.minX, b.minY, b.maxX, b.maxY].every(Number.isFinite) ||
      b.maxX <= b.minX ||
      b.maxY <= b.minY
    )
      throw new RangeError('Bounds must have positive area');
  const scaleX = (target.maxX - target.minX) / (source.maxX - source.minX),
    scaleY = (target.maxY - target.minY) / (source.maxY - source.minY);
  return {
    scaleX,
    scaleY,
    translateX: target.minX - source.minX * scaleX,
    translateY: target.minY - source.minY * scaleY,
  };
}
export function applyAxisMap(
  map: AxisMap,
  point: { readonly x: number; readonly y: number },
): { x: number; y: number } {
  return { x: point.x * map.scaleX + map.translateX, y: point.y * map.scaleY + map.translateY };
}
