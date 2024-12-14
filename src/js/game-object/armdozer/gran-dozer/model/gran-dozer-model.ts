import { AnimationType } from "./animation-type";

/** グランドーザのモデル */
export type GranDozerModel = {
  /** アニメーション */
  animation: {
    /** アニメーションの種類 */
    type: AnimationType;
    /** 0〜1で指定するアニメーションフレーム */
    frame: number;
  };
  /** 標準スプライト */
  standard: {
    /** 色の強さ */
    colorStrength: number;
  };
  /** アウトライン */
  outline: {
    /** 不透明度 */
    opacity: number;
  };
};
