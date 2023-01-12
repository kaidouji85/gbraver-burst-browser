/**
 * 現在のバッテリー状況から、バッテリーゲージ1マス分の透明度を取得する
 * @param battery バッテリー現在値
 * @param maxBattery 最大バッテリー
 * @return 透明度
 */
export function getOpacity(battery: number, maxBattery: number): number {
  return battery <= maxBattery ? 1 : 0;
}