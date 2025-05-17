import { CustomStateAnimation } from "../../../td-scenes/battle/custom-battle-event";
import { getPlayerBattleCount } from "../../get-battle-count";
import { separatePlayersFromCurrentState } from "../../separate-players";
import { StateAnimationTypeCondition } from "../state-animation-type";

/**
 * StateAnimationTypeConditionを生成する
 * @param props カスタムステートアニメーションプロパティ
 * @returns 条件オブジェクト
 */
export function createStateAnimationTypeCondition(
  props: CustomStateAnimation,
): StateAnimationTypeCondition {
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
