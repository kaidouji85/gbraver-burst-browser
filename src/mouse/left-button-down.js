// @flow

/**
 * マウスの左ボタンを押し込んでいるかを判定する
 * trueで左ボタンを押している
 *
 * @param event マウスイベント
 * @return {boolean} 判定結果
 */
export function isLeftButtonPush(event: MouseEvent): boolean {
  return event.buttons === 1;
}