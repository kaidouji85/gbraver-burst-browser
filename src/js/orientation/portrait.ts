/**
 * ポートレートか否かを判定する
 *
 * @param screenWidth 画面幅
 * @param screenHeight 画面高
 * @returns 判定結果、trueでポートレートである
 */
export function isPortrait(screenWidth: number, screenHeight: number): boolean {
  return screenWidth < screenHeight;
}
