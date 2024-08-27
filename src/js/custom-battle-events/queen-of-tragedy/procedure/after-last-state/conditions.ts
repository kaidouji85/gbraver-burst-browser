import { GameEnd, PlayerId } from "gbraver-burst-core";

/**
 * 条件オブジェクト
 * afterLastStateで不変なものだけをあつめたのでステートは含まない
 */
export type Conditions = {
  /** プレイヤーID */
  readonly playerId: PlayerId;
  /** 敵ID */
  readonly enemyId: PlayerId;
  /** updateから抽出したゲーム終了情報、存在しない場合はnull */
  readonly gameEnd: GameEnd | null;
};
