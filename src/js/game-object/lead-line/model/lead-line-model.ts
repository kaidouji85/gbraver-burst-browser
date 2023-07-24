/** 座標 */
export type Position = {
  /** x座標 */
  x: number;
  /** y座標 */
  y: number;
};

/** 引き出し線モデル */
export type LeadLineModel = {
  /** 起点 */
  start: Position;
  /** 終点 */
  end: Position;
  /** 不透明度 */
  opacity: number;
};
