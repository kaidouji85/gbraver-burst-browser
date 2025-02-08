import { BatteryCommandSelected } from "../../../../td-scenes/battle/custom-battle-event";
import { unattentionBurstButton } from "../../../attention";
import {
  focusInBatterySelector,
  focusInBurstButton,
  focusInPilotButton,
  isBatterySelectorFocused,
} from "../../../focus";
import { refreshConversation } from "../../../invisible-all-message-windows";
import { separatePlayers } from "../../../separate-players";
import { burstCaption, pilotSkillCaption } from "../../captions";
import { BatterySystemTutorialProps } from "../../props";
import {
  cancelZeroBatteryDefense,
  doBurstBecauseZeroBattery,
  doPilotSkillBecauseZeroBattery,
  zeroBatteryDefenseBecauseNoBatteryRecover,
} from "../../stories/zero-battery";
import { BatteryCommandSelectedEnd } from "./battery-command-selected-end";

/**
 * 条件を満たした場合、0防御系ストーリーを実行する
 * @param props イベントプロパティ
 * @returns 実行した場合は終了情報、しなかった場合はnull
 */
export async function doZeroBatteryIdNeeded(
  props: Readonly<BatteryCommandSelected & BatterySystemTutorialProps>,
): Promise<BatteryCommandSelectedEnd | null> {
  const isNotZeroBatteryCommand = props.battery.battery !== 0;
  if (isNotZeroBatteryCommand) {
    return null;
  }

  const { lastState } = props;
  const separatedPlayers = separatePlayers(props, lastState);
  if (!separatedPlayers) {
    return null;
  }

  const { player } = separatedPlayers;
  const isPlayerTurn = lastState.activePlayerId === player.playerId;
  if (isPlayerTurn) {
    return null;
  }

  // 以降はなんらかしらのイベントが発生する想定なので、
  // メッセージ即送りを防ぐためにイベント伝搬を止めている
  props.event.preventDefault();
  props.event.stopPropagation();

  const isZeroBattery = player.armdozer.battery === 0;
  const enableBurst = player.armdozer.enableBurst;
  const enablePilotSkill = player.pilot.enableSkill;
  if (isZeroBattery && !enableBurst && !enablePilotSkill) {
    await zeroBatteryDefenseBecauseNoBatteryRecover(props);
    refreshConversation(props);
    return {
      eventState: props.eventState,
      cancel: {
        isCommandCanceled: false,
      },
    };
  }

  if (isZeroBattery && !enableBurst && enablePilotSkill) {
    await doPilotSkillBecauseZeroBattery(props);
    refreshConversation(props);
    await focusInPilotButton(props, pilotSkillCaption);
    return {
      eventState: {
        ...props.eventState,
        isExplainedPilotSkillAtZeroBattery: true,
      },
      cancel: {
        isCommandCanceled: true,
      },
    };
  }

  if (isZeroBattery && enableBurst) {
    await doBurstBecauseZeroBattery(props);
    refreshConversation(props);
    unattentionBurstButton(props);
    await focusInBurstButton(props, burstCaption);
    return {
      eventState: {
        ...props.eventState,
        isExplainedBurstAtZeroBurst: true,
      },
      cancel: {
        isCommandCanceled: true,
      },
    };
  }

  props.view.hud.gameObjects.batterySelector.toBatterySilently(1);
  await cancelZeroBatteryDefense(props);
  refreshConversation(props);
  if (isBatterySelectorFocused(props)) {
    await focusInBatterySelector(props);
    props.view.dom.nearBatterySelectorMessageWindow.messagesInInnerHTML(
      props.defenseBatteryCaption,
    );
  }

  return {
    eventState: props.eventState,
    cancel: {
      isCommandCanceled: true,
    },
  };
}
