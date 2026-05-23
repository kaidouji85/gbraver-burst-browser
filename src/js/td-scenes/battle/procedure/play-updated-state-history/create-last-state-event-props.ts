import { GameState } from "gbraver-burst-core";

import { LastStateEventProps } from "../../custom-battle-event";
import { getMainTurnCount } from "../../get-main-turn-count";
import { BattleSceneProps } from "../../props";
import { separatePlayers } from "../../separate-players";

/**
 * LastStateEventPropsを生成する
 * @param props 戦闘シーンプロパティ
 * @param update 更新分のステートヒストリー
 * @returns eventProps
 */
export function createLastStateEventProps(
  props: Readonly<BattleSceneProps>,
  update: GameState[],
): LastStateEventProps {
  const lastState = update.at(-1);
  if (!lastState) {
    throw new Error(
      "The 'update' parameter is empty, no last state available.",
    );
  }
  const separatedPlayers = separatePlayers(props, lastState);
  const player = separatedPlayers?.player ?? lastState.players[0];
  const enemy = separatedPlayers?.enemy ?? lastState.players[1];
  const playerMainTurnCount = getMainTurnCount({
    stateHistory: props.stateHistory,
    playerId: player.playerId,
  });
  const enemyMainTurnCount = getMainTurnCount({
    stateHistory: props.stateHistory,
    playerId: enemy.playerId,
  });
  const mainTurnCount = playerMainTurnCount + enemyMainTurnCount;
  return {
    ...props,
    player,
    playerMainTurnCount,
    mainTurnCount,
    enemy,
    enemyMainTurnCount,
    update,
    lastState,
  };
}
