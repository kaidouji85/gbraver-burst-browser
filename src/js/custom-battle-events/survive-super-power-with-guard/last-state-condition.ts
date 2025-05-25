import { PlayerState } from "gbraver-burst-core";

/** LastState系イベントで利用する条件判断オブジェクト */
export type LastStateCondition = {
  /** ターン数 */
  turn: number;
  /** 最新のプレイヤーステート */
  player: PlayerState;
  /** 最新の敵ステート */
  enemy: PlayerState;
};

/** LastState系イベントで利用する条件判断オブジェクトを持つプロパティ */
export type LastStateConditionContainer = {
  /** LastState系イベントで利用する条件判断オブジェクト */
  lastStateCondition: LastStateCondition;
};
