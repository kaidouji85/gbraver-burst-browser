import {
  CommandCanceled,
  CustomBattleEventProps,
} from "../../../../td-scenes/battle/custom-battle-event";
import { refreshConversation } from "../../../invisible-all-message-windows";
import { separatePlayers } from "../../../separate-players";
import { BatterySystemTutorialProps } from "../../props";
import { BatterySystemTutorialState } from "../../state";
import { zeroBatteryDefenseBecauseNoBatteryRecover } from "../../stories/zero-battery";

/** イベントリスト終了情報 */
type Ret = {
  /** ステート更新結果 */
  state: BatterySystemTutorialState;
  /** コマンドキャンセル情報 */
  cancel: CommandCanceled;
};

export async function doZeroBatteryDefenseBecauseNotBatteryRecoverIfNeeded(
  props: Readonly<CustomBattleEventProps & BatterySystemTutorialProps>,
): Promise<Ret | null> {
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
    !player.armdozer.enableBurst &&
    !player.pilot.enableSkill
  ) {
    await zeroBatteryDefenseBecauseNoBatteryRecover(props);
    refreshConversation(props);
    return {
      state: props.state,
      cancel: {
        isCommandCanceled: false,
      },
    };
  }

  return null;
}
