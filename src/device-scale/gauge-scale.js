// @flow

/** ゲージを等倍表示するために最低限必要となる画面幅 */
const MIN_SCREEN_WIDTH = 524;

/**
 * デバイスに応じたゲージ系ゲームオブジェクトの倍率を返す
 * ポートレート、ランドスケープで倍率を変えるようなことはしない
 * ポートレートで画面幅が最低になると想定し、画面幅が基準値に満たない場合には縮小表示する
 *
 * @return 倍率
 */
export function getGaugeScale(): number {
  const landScapeScreenWidth = Math.min(screen.width, screen.height);
  if (landScapeScreenWidth <= MIN_SCREEN_WIDTH) {
    return landScapeScreenWidth / MIN_SCREEN_WIDTH;
  }

  return 1;
}