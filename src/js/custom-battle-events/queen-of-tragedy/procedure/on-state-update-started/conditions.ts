/**
 * 条件オブジェクト
 * onStateUpdateStartedにおいてストーリー分岐に必要な情報を持つ
 * 本オブジェクトは不変なものだけを集めたのでステートは含まない
 */
export type Conditions = {
  /** ターン数 */
  readonly turn: number;
  /** プレイヤーがバーストするか、true: バーストする */
  readonly willPlayerBurst: boolean;
};
