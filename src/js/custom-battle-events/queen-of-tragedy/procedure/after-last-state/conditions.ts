import { GameEnd, PlayerId } from "gbraver-burst-core";

/** 条件オブジェクト */
export type Conditions = {
  /** プレイヤーID */
  playerId: PlayerId;
  /** updateから抽出したゲーム終了情報、存在しない場合はnull */
  gameEnd: GameEnd | null;
};
