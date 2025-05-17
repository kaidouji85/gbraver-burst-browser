import { PlayerState } from "gbraver-burst-core";

/** カスタムステートアニメーション種別 */
export type StateAnimationType = "TsubasaFirstAttack" | "None";

/** アニメーション種別条件判断オブジェクト */
export type StateAnimationTypeCondition = {
  /** プレイヤー */
  readonly player: PlayerState;
  /** プレイヤーのバトル回数 */
  readonly playerBattleCount: number;

  /** 敵 */
  readonly enemy: PlayerState;
  /** 敵のバトル回数 */
  readonly enemyBattleCount: number;
};
