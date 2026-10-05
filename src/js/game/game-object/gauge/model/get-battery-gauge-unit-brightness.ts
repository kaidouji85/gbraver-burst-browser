/**
 * 現在バッテリー値に応じた、バッテリーゲージユニット輝度を取得
 * @param gaugeUnitValue バッテリーゲージユニットのバッテリー値
 * @param battery 現在バッテリー値
 * @returns 輝度
 */
export function getBatteryGaugeUnitBrightness(
  gaugeUnitValue: number,
  battery: number,
): number {
  return gaugeUnitValue <= battery ? 1 : 0;
}
