// @flow

/** 画面フェーダーモデル */
export type FaderModel = {
  /** 0から1で指定する透明度、0で完全透明 */
  opacity: number,
  /** 画面幅 */
  width: number,
  /** 画面高 */
  height: number,
};