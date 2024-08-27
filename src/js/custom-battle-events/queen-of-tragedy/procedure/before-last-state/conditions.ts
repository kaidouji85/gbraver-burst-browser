import { PlayerState } from "gbraver-burst-core";

/**
 * 条件オブジェクト
 * beforeLastStateで不変なものだけをあつめたのでステートは含まない
 */
export type Conditions = {
  /** ターン数 */
  readonly turn: number;
  /** 敵のステート */
  readonly enemy: PlayerState;
};
