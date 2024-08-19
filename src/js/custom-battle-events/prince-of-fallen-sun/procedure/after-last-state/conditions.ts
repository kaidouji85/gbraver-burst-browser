import { GameEnd, PlayerId } from "gbraver-burst-core";

/** 条件オブジェクト */
export type Conditions = {
  /** 敵ID */
  enemyId: PlayerId;
  /** updateから抽出したGameEnd情報、存在しない場合はnull */
  gameEnd: GameEnd | null;
};
