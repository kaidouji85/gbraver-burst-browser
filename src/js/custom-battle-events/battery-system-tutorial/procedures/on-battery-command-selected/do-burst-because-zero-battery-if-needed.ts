import { CustomBattleEventProps } from "../../../../td-scenes/battle/custom-battle-event";
import { unattentionBurstButton } from "../../../attention";
import { focusInBurstButton } from "../../../focus";
import { refreshConversation } from "../../../invisible-all-message-windows";
import { separatePlayers } from "../../../separate-players";
import { burstCaption } from "../../captions";
import { BatterySystemTutorialProps } from "../../props";
import { doBurstBecauseZeroBattery } from "../../stories/zero-battery";
import { BatteryCommandSelectedEnd } from "./battery-command-selected-end";

/**
 * 条件を満たした場合「0防御0バッテリーなのでバーストする」を実行する
 * @param props イベントプロパティ
 * @return 実行した場合は終了情報、しなかった場合はnull
 */
export async function doBurstBecauseZeroBatteryIfNeeded(
  props: Readonly<CustomBattleEventProps & BatterySystemTutorialProps>,
): Promise<BatteryCommandSelectedEnd | null> {
  const lastState = props.stateHistory.at(-1);
  if (!lastState) {
    return null;
  }

  const separatedPlayers = separatePlayers(props, lastState);
  if (!separatedPlayers) {
    return null;
  }

  const { player, enemy } = separatedPlayers;
  const isEnemyTurn = lastState.activePlayerId === enemy.playerId;
  if (
    isEnemyTurn &&
    player.armdozer.battery === 0 &&
    player.armdozer.enableBurst
  ) {
    await doBurstBecauseZeroBattery(props);
    refreshConversation(props);
    unattentionBurstButton(props);
    await focusInBurstButton(props, burstCaption);
    return {
      state: props.state,
      cancel: {
        isCommandCanceled: true,
      },
    };
  }

  return null;
}
