// @flow

/** リサイズ */
export type Resize = {
  type: 'resize',
  width: number,
  height: number,
};

/**
 * リサイズ時の画面幅を取得する
 *
 * @return 画面幅
 */
export function getWidth(): number {
  if (document.documentElement) {
    // iOS Chromeではリサイズイベント発火後に、window.innerWidthに正しい値が反映されないが、
    // document.documentElement.clientWidthは正しく値が取得できる
    return document.documentElement.clientWidth;
  }

  // document.documentElementが存在しないことが理論上あるので、
  // その時にはwindow.innerWidthを使う
  return window.innerWidth;
}

/**
 * リサイズ時の画面高を取得する
 *
 * @return 画面高
 */
export function getHeight(): number {
  if (document.documentElement) {
    // iOS Chromeではリサイズイベント発火後に、window.innerHeightに正しい値が反映されないが、
    // document.documentElement.clientHeightは正しく値が取得できる

    return document.documentElement.clientHeight;
  }

  // document.documentElementが存在しないことが理論上あるので、
  // その時にはwindow.innerHeightを使う
  return window.innerHeight;
}