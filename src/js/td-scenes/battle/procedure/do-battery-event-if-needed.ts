import { BatteryCommand } from "gbraver-burst-core";

import { getMainTurnCount } from "../../../custom-battle-events/get-main-turn-count";
import { separatePlayers } from "../../../custom-battle-events/separate-players";
import { CommandCanceled } from "../custom-battle-event";
import { BattleSceneProps } from "../props";

/**
 * カスタムバトルイベントがセットされていれば onBatteryCommandSelected を実行する
 * 実行結果としてコマンドキャンセル情報を返す
 * @param props 戦闘シーンプロパティ
 * @param battery バッテリーコマンド
 * @returns コマンドキャンセル情報
 */
export async function doBatteryEventIfNeeded(
  props: Readonly<BattleSceneProps>,
  battery: Readonly<BatteryCommand>,
): Promise<CommandCanceled> {
  if (!props.customBattleEvent) {
    return { isCommandCanceled: false };
  }

  const lastState = props.stateHistory.at(-1);
  if (!lastState) {
    return { isCommandCanceled: false };
  }

  const players = separatePlayers(props, lastState);
  if (!players) {
    return { isCommandCanceled: false };
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
  return await props.customBattleEvent.onBatteryCommandSelected({
    ...props,
    battery,
    lastState,

    mainTurnCount,

    player,
    playerMainTurnCount,

    enemy,
    enemyMainTurnCount,
  });
}
