/** 電撃ショットモデル */
export type LightningShotModel = {
  /** 座標 */
  position: {
    /** x座標 */
    x: number;
    /** y座標 */
    y: number;
  };
  /** アニメーション */
  animation: {
    /** フレーム */
    frame: number;
  };
  /** 不透明度 */
  opacity: number;
};
