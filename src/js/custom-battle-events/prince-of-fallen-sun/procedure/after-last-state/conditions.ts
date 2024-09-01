import { GameEnd, PlayerId } from "gbraver-burst-core";

/**
 * 条件オブジェクト
 * afterLastStateにおいてストーリー分岐に必要な情報を持つ
 * 本オブジェクトは不変なものだけを集めたのでステートは含まない
 */
export type Conditions = {
  /** 敵ID */
  readonly enemyId: PlayerId;
  /** updateから抽出したGameEnd情報、存在しない場合はnull */
  readonly gameEnd: GameEnd | null;
};
