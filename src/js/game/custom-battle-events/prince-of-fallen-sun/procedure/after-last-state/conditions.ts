import { GameEnd, PlayerId, PlayerState } from "gbraver-burst-core";

/**
 * 条件オブジェクト
 * afterLastStateにおいてストーリー分岐に必要な情報を持つ
 * 本オブジェクトは不変なものだけを集めたのでステートは含まない
 */
export type Conditions = {
  /** プレイヤーID */
  readonly playerId: PlayerId;
  /** 最新のプレイヤーステート、存在しない場合はnull */
  readonly player: PlayerState | null;
  /** 敵ID */
  readonly enemyId: PlayerId;
  /** updateから抽出したGameEnd情報、存在しない場合はnull */
  readonly gameEnd: GameEnd | null;
};
