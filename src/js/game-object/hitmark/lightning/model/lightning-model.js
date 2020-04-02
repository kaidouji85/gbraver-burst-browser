// @flow

/**
 * 電撃ヒットマークモデル
 */
export type LightningModel = {
  /** 座標 */
  position: {
    x: number,
    y: number,
    z: number,
  },
  /** アニメーション */
  animation: {
    /** 0〜1で指定するアニメーションフレーム */
    frame: number
  },
  /** 0〜1で指定する不透明度 */
  opacity: number
}