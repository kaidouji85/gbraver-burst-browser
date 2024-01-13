import type { GameState } from "gbraver-burst-core";

import type {
  BatteryCommandSelected,
  CommandCanceled,
} from "../../../td-scenes/battle/custom-battle-event";
import {
  unattentionBurstButton,
  unattentionPilotButton,
} from "../../attention";
import { focusInBurstButton, focusInPilotButton } from "../../focus";
import { refreshConversation } from "../../invisible-all-message-windows";
import { shouldBurst, shouldPilotSkill } from "../captions";
import { ZeroDefenseTutorialProps } from "../props";
import type { ZeroDefenseTutorialState } from "../state";
import {
  cancelZeroBatteryDefense,
  doBurstBecauseZeroBattery,
  doPilotSkillBecauseZeroBattery,
  zeroBatteryDefenseBecauseNoBatteryRecover,
} from "../stories/no-zero-battery";

/** イベント終了情報 */
type Ret = {
  /** ステート更新結果 */
  state: ZeroDefenseTutorialState;
  /** コマンドキャンセル情報 */
  cancel: CommandCanceled;
};

/**
 * バッテリーコマンド選択イベント
 * @param props イベントプロパティ
 * @return イベント終了情報
 */
export async function onBatteryCommandSelected(
  props: Readonly<BatteryCommandSelected & ZeroDefenseTutorialProps>,
): Promise<Ret> {
  const foundLastState = props.stateHistory[props.stateHistory.length - 1];
  const isNotZeroBatteryCommand = props.battery.battery !== 0;
  if (!foundLastState || isNotZeroBatteryCommand) {
    return {
      state: props.state,
      cancel: {
        isCommandCanceled: false,
      },
    };
  }

  const lastState: GameState = foundLastState;
  const iPlayerTurn = lastState.activePlayerId === props.playerId;
  const player = lastState.players.find((v) => v.playerId === props.playerId);
  if (iPlayerTurn || !player) {
    return {
      state: props.state,
      cancel: {
        isCommandCanceled: false,
      },
    };
  }

  const isZeroBattery = player.armdozer.battery === 0;
  if (!isZeroBattery) {
    props.view.hud.gameObjects.batterySelector.toBatterySilently(1);
    await cancelZeroBatteryDefense(props);
    return {
      state: props.state,
      cancel: {
        isCommandCanceled: true,
      },
    };
  }

  const enableBurst = player.armdozer.enableBurst;
  const enablePilotSkill = player.pilot.enableSkill;
  if (isZeroBattery && enableBurst) {
    await doBurstBecauseZeroBattery(props);
    unattentionBurstButton(props);
    await focusInBurstButton(props, shouldBurst);
    return {
      state: {
        ...props.state,
        isExplainedBurstAtZeroBurst: true,
      },
      cancel: {
        isCommandCanceled: true,
      },
    };
  }

  if (isZeroBattery && !enableBurst && enablePilotSkill) {
    await doPilotSkillBecauseZeroBattery(props);
    unattentionPilotButton(props);
    await focusInPilotButton(props, shouldPilotSkill);
    return {
      state: {
        ...props.state,
        isExplainedPilotSkillAtZeroBattery: true,
      },
      cancel: {
        isCommandCanceled: true,
      },
    };
  }

  if (isZeroBattery && !enableBurst && !enablePilotSkill) {
    await zeroBatteryDefenseBecauseNoBatteryRecover(props);
    refreshConversation(props);
    return {
      state: props.state,
      cancel: {
        isCommandCanceled: false,
      },
    };
  }

  return {
    state: props.state,
    cancel: {
      isCommandCanceled: false,
    },
  };
}
