import { PlayerState } from "gbraver-burst-core";

/** アニメーション種別条件判断オブジェクト */
export type StateAnimationCondition = {
  /** プレイヤー */
  readonly player: PlayerState;
  /** プレイヤーのバトル回数 */
  readonly playerBattleCount: number;

  /** 敵 */
  readonly enemy: PlayerState;
  /** 敵のバトル回数 */
  readonly enemyBattleCount: number;
};

/** アニメーション種別条件判断オブジェクトを持つプロパティ */
export type StateAnimationConditionContainer = {
  /** アニメーション種別条件判断オブジェクト */
  stateAnimationCondition: StateAnimationCondition;
};
