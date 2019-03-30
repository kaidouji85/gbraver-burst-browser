// @flow

/** バッテリーセレクタモデル */
export type BatterySelectorModel = {
  /** 最後に選択したバッテリーの値 */
  battery: number,
  /** メーター針の値、0〜1のパーセント */
  needle: number
};