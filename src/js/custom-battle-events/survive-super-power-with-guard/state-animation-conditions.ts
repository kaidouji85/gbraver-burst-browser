import { PlayerState } from "gbraver-burst-core";

/**
 * カスタムステートアニメーション系イベントの条件判断オブジェクト
 * 本オブジェクトはイベント呼び出しのたびに更新される
 */
export type StateAnimationConditions = {
  /** プレイヤー */
  readonly player: PlayerState;
  /** プレイヤーのバトル回数 */
  readonly playerBattleCount: number;

  /** 敵 */
  readonly enemy: PlayerState;
  /** 敵のバトル回数 */
  readonly enemyBattleCount: number;
};

