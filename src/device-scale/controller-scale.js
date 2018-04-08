// @flow

/** 等倍表示するために最低限必要となる画面幅 */
const MIN_SCREEN_WIDTH = 432;

/**
 * デバイスに応じたコントローラ系UIの倍率を返す
 * ポートレート、ランドスケープで倍率を変えるようなことはしない
 * ポートレートで画面幅が最低になると想定し、画面幅が基準値に満たない場合には縮小表示する
 */
export function getControllerScale(): number {
  const ladScapeScreenWidth = Math.min(screen.width, screen.height);
  if (ladScapeScreenWidth < MIN_SCREEN_WIDTH) {
    return ladScapeScreenWidth / MIN_SCREEN_WIDTH;
  }

  return 1;
}