import { GameEnd, PlayerState } from "gbraver-burst-core";

/** 条件オブジェクト */
export type Conditions = {
  /** ターン数 */
  turn: number;
  /** 敵のステート */
  enemy: PlayerState;
};
