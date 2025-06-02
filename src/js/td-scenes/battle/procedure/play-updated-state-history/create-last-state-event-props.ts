import { GameState } from "gbraver-burst-core";

import { getMainTurnCount } from "../../../../custom-battle-events/get-main-turn-count";
import { separatePlayers } from "../../../../custom-battle-events/separate-players";
import { LastStateEventProps } from "../../custom-battle-event";
import { BattleSceneProps } from "../../props";

/**
 * LastStateEventPropsを生成する
 * @param props 戦闘シーンプロパティ
 * @param update 更新されたステートヒストリー
 * @returns eventProps
 */
export function createLastStateEventProps(
  props: Readonly<BattleSceneProps>,
  update: GameState[],
): LastStateEventProps {
  const lastState = update.at(-1);
  if (!lastState) {
    throw new Error("gameStateHistory is empty");
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
