/**
 * アニメーションタイプ
 */
export type AnimationType = "CUT_IN_UP" | "CUT_IN_DOWN";

/**
 * ライトニングドーザ カットイン モデル
 */
export type LightningDozerCutInModel = {
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
