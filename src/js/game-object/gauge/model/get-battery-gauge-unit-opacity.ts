/**
 * 最大バッテリーに応じたゲージユニット透明度を取得
 * @param gaugeUnitValue ゲージユニット
 * @param maxBattery 最大バッテリー
 * @return 透明度
 */
export function getBatteryGaugeUnitOpacity(gaugeUnitValue: number, maxBattery: number): number {
  return gaugeUnitValue <= maxBattery ? 1 : 0;
}