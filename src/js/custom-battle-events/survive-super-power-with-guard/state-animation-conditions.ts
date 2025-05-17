import { PlayerState } from "gbraver-burst-core";

import { CustomStateAnimation } from "../../td-scenes/battle/custom-battle-event";
import { getPlayerBattleCount } from "../get-battle-count";
import { separatePlayersFromCurrentState } from "../separate-players";

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

/**
 * StateAnimationConditionsを生成する
 * @param props カスタムステートアニメーションプロパティ
 * @returns 条件オブジェクト
 */
export function createStateAnimationConditions(
  props: CustomStateAnimation,
): StateAnimationConditions {
  const separatedPlayers = separatePlayersFromCurrentState(props);
  const player = separatedPlayers?.player ?? props.currentState.players[0];
  const playerBattleCount = getPlayerBattleCount(
    props.stateHistoryUntilNow,
    player.playerId,
  );
  const enemy = separatedPlayers?.enemy ?? props.currentState.players[1];
  const enemyBattleCount = getPlayerBattleCount(
    props.stateHistoryUntilNow,
    enemy.playerId,
  );
  return { player, playerBattleCount, enemy, enemyBattleCount };
}
