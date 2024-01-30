import { AnimationType } from "./animation-type";

/** ネオランドーザのモデル */
export interface NeoLandozerModel {
  /** 座標 */
  position: {
    x: number;
    y: number;
    z: number;
  };

  /** アニメーション */
  animation: {
    /** タイプ */
    type: AnimationType;
    /** フレーム */
    frame: number;
  };

  /** アクティブレイヤ */
  active: {
    /** 不透明度 */
    opacity: number;
  };
}
