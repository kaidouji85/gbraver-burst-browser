/**
 * アニメーションタイプ
 */
export type AnimationType =
  | "STAND"
  | "UPPER_CHARGE"
  | "UPPER_ATTACK"
  | "UPPER_TO_STAND"
  | "DASH_UP"
  | "DASH_DOWN"
  | "DASH_TO_STAND"
  | "KNOCK_BACK"
  | "DOWN"
  | "BACK_STEP"
  | "FRONT_STEP"
  | "GUARD"
  | "UPRIGHT"
  | "BOW";

/**
 * ウィングドーザ モデル
 */
export type WingDozerModel = {
  /** 座標 */
  position: {
    x: number;
    y: number;
    z: number;
  };
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
