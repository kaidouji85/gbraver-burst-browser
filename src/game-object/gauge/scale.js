// @flow

/** 通常表示するゲージの幅 */
const BASE_GAUGE_WIDTH = 256;

/** デバイスに応じたゲージ系ゲームオブジェクトの倍率を返す */
export function getGaugeScale(): number {
  const screenMinSize = Math.min(screen.width, screen.height);
  const gaugeMinSize = screenMinSize * 0.45;

  if (gaugeMinSize <= BASE_GAUGE_WIDTH) {
    return gaugeMinSize / BASE_GAUGE_WIDTH;
  }

  return 1;
}