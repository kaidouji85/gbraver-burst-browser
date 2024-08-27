import { GameEnd, PlayerId } from "gbraver-burst-core";

/**
 * 条件オブジェクト
 * afterLastStateで不変なものだけをあつめたのでステートは含まない
 */
export type Conditions = {
  /** 敵ID */
  readonly enemyId: PlayerId;
  /** updateから抽出したGameEnd情報、存在しない場合はnull */
  readonly gameEnd: GameEnd | null;
};
