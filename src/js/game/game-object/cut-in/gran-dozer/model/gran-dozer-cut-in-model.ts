/** アニメーションタイプ */
export type AnimationType = "BURST_UP" | "BURST_DOWN";

/** グランドーザ カットイン モデル */
export type GranDozerCutInModel = {
  /** アニメーション */
  animation: {
    /** アニメーションタイプ */
    type: AnimationType;
    /** 0〜1で指定するアニメーションフレーム */
    frame: number;
  };
  /** トラッキング */
  tracking: {
    /** x座標 */
    x: number;
    /** y座標 */
    y: number;
  };
  /** 0〜1で指定する不透明度、0で完全透明 */
  opacity: number;
  /** 拡大率 */
  scale: number;
};
