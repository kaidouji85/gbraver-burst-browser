/** 座標 */
type Position = {
  x: number;
  y: number;
};

/**
 * バッテリーセレクタ数字の座標を計算する
 * @param battery バッテリー数字
 * @param maxBattery 最大バッテリー
 * @returns 計算結果
 */
export function getBatteryNumberPosition(
  battery: number,
  maxBattery: number,
): Position {
  const angle = Math.PI - (Math.PI / maxBattery) * battery;
  const radius = maxBattery !== 8 ? 155 : 175;
  return {
    x: radius * Math.cos(angle),
    y: radius * Math.sin(angle),
  };
}
