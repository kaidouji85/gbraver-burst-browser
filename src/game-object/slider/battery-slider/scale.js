// @flow

/** 通常表示するスライダーの幅 */
const BASE_SLIDER_WIDTH = 412;

/** デバイスに応じたバッテリースライダーの倍率を返す */
export function getBatterySliderScale(): number {
  const screenMinSize = Math.min(screen.width, screen.height);
  const sliderMinSize = screenMinSize * 0.95;

  if (sliderMinSize <= BASE_SLIDER_WIDTH) {
    return sliderMinSize / BASE_SLIDER_WIDTH;
  }

  return 1;
}