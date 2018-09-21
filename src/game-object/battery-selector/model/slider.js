// @flow

/** スライダーのモデル */
export type SliderModel = {
  /** アニメーション用のバッテリー値 */
  battery: number,
  /** ゲージの最大値 */
  max: number,
  /** 設定可能な値の上限 */
  enableMax: number
}