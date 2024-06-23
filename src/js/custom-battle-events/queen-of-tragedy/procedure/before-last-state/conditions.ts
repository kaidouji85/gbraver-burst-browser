import { GameEnd, PlayerState } from "gbraver-burst-core";

/** 条件オブジェクト */
export type Conditions = {
  /** ターン数 */
  turn: number;
  /** 敵のステート */
  enemy: PlayerState;
  /** ステートヒストリーから抽出したゲーム終了情報、存在しない場合はnull */
  gameEnd: GameEnd | null;
};
