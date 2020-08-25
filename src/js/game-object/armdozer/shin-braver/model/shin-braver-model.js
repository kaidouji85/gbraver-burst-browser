// @flow
import type {AnimationType} from "./animation-type";

/** シンブレイバーのモデル */
export interface ShinBraverModel {
  /** 座標 */
  position: {
    x: number,
    y: number,
    z: number
  },
  /** アニメーション */
  animation: {
    /** アニメーションの種類 */
    type: AnimationType,
    /** 0〜1で指定するアニメーションフレーム */
    frame: number,
  }
}