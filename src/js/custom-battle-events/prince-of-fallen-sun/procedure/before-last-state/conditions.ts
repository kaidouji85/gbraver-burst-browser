/**
 * 条件オブジェクト
 * beforeLastStateで不変なものだけをあつめたのでステートは含まない
 */
export type Conditions = {
  /** ターン数 */
  readonly turn: number;
};
