/** 条件判断オブジェクト */
export type Conditions = {
  /** ターン数 */
  turn: number;
  /** プレイヤーがバーストするか、true: バーストする */
  willPlayerBurst: boolean;
};
