// @flow

/** ボタンのモデル */
export type ButtonModel = {
  /**
   * 押込みの深さ
   * 0〜1の範囲で、1が押込み最大である
   */
  depth: number,
  /**
   * ボタン透明度
   * 0〜1で指定して、0で完全透明
   */
  opacity: number,
}