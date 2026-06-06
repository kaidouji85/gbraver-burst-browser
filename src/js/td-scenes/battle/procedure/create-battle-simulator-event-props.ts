import { BattleSimulatorEventProps } from "../custom-battle-event";
import { getMainTurnCount } from "../get-main-turn-count";
import { BattleSceneProps } from "../props";
import { separatePlayers } from "../separate-players";

/**
 * 戦闘シーンプロパティからバトルシミュレーターイベントプロパティを生成する
 * @param props 戦闘シーンプロパティ
 * @returns バトルシミュレーターイベントプロパティまたはnull
 */
export function createBattleSimulatorEventProps(
  props: BattleSceneProps,
): BattleSimulatorEventProps | null {
  if (!props.customBattleEvent) {
    return null;
  }

  const lastState = props.stateHistory.at(-1);
  if (!lastState) {
    return null;
  }

  const players = separatePlayers(props, lastState);
  if (!players) {
    return null;
  }

  const { player, enemy } = players;
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
    lastState,

    mainTurnCount,

    player,
    playerMainTurnCount,

    enemy,
    enemyMainTurnCount,
  };
}
