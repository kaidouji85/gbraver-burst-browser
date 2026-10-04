/**
 * マウスの左ボタンを押し込んでいるかを判定する
 * trueで左ボタンを押している
 *
 * @param event マウスイベント
 * @returns 判定結果
 */
export function isMouseLeftButtonPushed(event: MouseEvent): boolean {
  return event.buttons === 1;
}
