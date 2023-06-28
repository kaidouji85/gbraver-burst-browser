import type { AnimationType } from "./animation-type";

/** ジェネシスブレイバーモデル */
export type GenesisBraverModel = {
  /** アニメーション */
  animation: {
    /** アニメーションの種類 */
    type: AnimationType;
    /** 0〜1で指定するアニメーションフレーム */
    frame: number;
  };
  /** 座標 */
  position: {
    x: number;
    y: number;
    z: number;
  };
  /** アクティブレイヤ */
  active: {
    /** 0〜1で指定するアクティブレイヤーの強さ */
    strength: number;
    /** 不透明度 */
    opacity: number;
  };
};
