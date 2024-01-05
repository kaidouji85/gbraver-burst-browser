import type { GameState, PlayerState } from "gbraver-burst-core";

import type {
  BatteryCommandSelected,
  CustomBattleEventProps,
} from "../../../../td-scenes/battle/custom-battle-event";
import { unattentionBurstButton } from "../../../attention";
import {
  focusInBatterySelector,
  focusInBurstButton,
  focusInPilotButton,
  focusOutBatterySelector,
  isBatterySelectorFocused,
} from "../../../focus";
import { refreshConversation } from "../../../invisible-all-message-windows";
import { burstCaption, pilotSkillCaption } from "../../captions";
import { BatterySystemTutorialProps } from "../../props";
import {
  cancelZeroBatteryDefense,
  doBurstBecauseZeroBattery,
  doPilotSkillBecauseZeroBattery,
  zeroBatteryDefenseBecauseNoBatteryRecover,
} from "../../stories/zero-battery";
import { BatteryCommandSelectedEnd } from "./battery-command-selected-end";

/** @deprecated ゼロ防御した時の処理 パラメータ */
type OnZeroDefenseParams = {
  /** イベントプロパティ */
  props: Readonly<CustomBattleEventProps & BatterySystemTutorialProps>;
  /** プレイヤー情報 */
  player: PlayerState;
};

/**
 * @deprecated
 * ゼロ防御した時の処理
 * @param params パラメータ
 * @return 終了情報
 */
async function onZeroDefense(params: OnZeroDefenseParams): Promise<BatteryCommandSelectedEnd> {
  const { props, player } = params;
  const isZeroBattery = player.armdozer.battery === 0;
  const enableBurst = player.armdozer.enableBurst;
  const enablePilotSkill = player.pilot.enableSkill;

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

  if (isZeroBattery && !enableBurst && enablePilotSkill) {
    await doPilotSkillBecauseZeroBattery(props);
    refreshConversation(props);
    await focusInPilotButton(props, pilotSkillCaption);
    return {
      state: props.state,
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
      state: props.state,
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
    state: props.state,
    cancel: {
      isCommandCanceled: true,
    },
  };
}

/**
 * バッテリーコマンド選択イベント
 * @param props イベントプロパティ
 * @return 終了情報
 */
export async function onBatteryCommandSelected(
  props: Readonly<BatteryCommandSelected & BatterySystemTutorialProps>,
): Promise<BatteryCommandSelectedEnd> {
  const foundLastState = props.stateHistory[props.stateHistory.length - 1];
  const foundPlayer = (foundLastState?.players ?? []).find(
    (v) => v.playerId === props.playerId,
  );
  const isZeroBatteryCommand = props.battery.battery === 0;
  if (isZeroBatteryCommand && foundLastState && foundPlayer) {
    const lastState: GameState = foundLastState;
    const player: PlayerState = foundPlayer;
    const isEnemyTurn = lastState.activePlayerId !== props.playerId;
    if (isEnemyTurn) {
      return await onZeroDefense({
        props,
        player,
      });
    }
  }

  if (isBatterySelectorFocused(props)) {
    focusOutBatterySelector(props);
  }
  return {
    state: props.state,
    cancel: {
      isCommandCanceled: false,
    },
  };
}
