/**
 * テクスチャオフセットを正規化する
 *
 * 例）
 * normalizeTextureOffset(0, 10);     // -> 0
 * normalizeTextureOffset(0.65, 10);  // -> 6 / 10
 *
 * @param offset 任意のテクスチャオフセットの座標軸
 * @param maxAnimation アニメーションの最大数
 * @returns 正規化したオフセット値
 */
export function normalizeTextureOffset(
  offset: number,
  maxAnimation: number,
): number {
  const min = 0;
  const max = (maxAnimation - 1) / maxAnimation;
  const textureOffset = Math.floor(offset * maxAnimation) / maxAnimation;

  if (textureOffset < min) {
    return min;
  }

  if (max < textureOffset) {
    return max;
  }

  return textureOffset;
}
