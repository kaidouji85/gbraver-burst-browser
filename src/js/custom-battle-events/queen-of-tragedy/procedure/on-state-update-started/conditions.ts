/**
 * 条件オブジェクト
 * onStateUpdateStartedで不変なものだけをあつめたのでステートは含まない
 */
export type Conditions = {
  /** ターン数 */
  readonly turn: number;
  /** プレイヤーがバーストするか、true: バーストする */
  readonly willPlayerBurst: boolean;
};
