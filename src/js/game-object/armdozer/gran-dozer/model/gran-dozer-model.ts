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
};
