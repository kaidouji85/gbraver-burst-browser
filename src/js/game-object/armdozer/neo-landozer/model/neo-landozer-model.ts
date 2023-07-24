import type { AnimationType } from "./animation-type";

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
    /** 0〜1で指定するアクティブレイヤーの強さ */
    strength: number;

    /** 不透明度 */
    opacity: number;
  };
}
