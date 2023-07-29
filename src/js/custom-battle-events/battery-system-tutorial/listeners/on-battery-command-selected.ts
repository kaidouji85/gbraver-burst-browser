import type { GameState, PlayerState } from "gbraver-burst-core";

import type {
  BatteryCommandSelected,
  CommandCanceled,
  CustomBattleEventProps,
} from "../../../td-scenes/battle/custom-battle-event";
import { unattentionBurstButton } from "../../attention";
import {
  focusInBatterySelector,
  focusInBurstButton,
  focusInPilotButton,
  focusOutBatterySelector,
  isBatterySelectorFocused,
} from "../../focus";
import { refreshConversation } from "../../invisible-all-message-windows";
import {
  burstCaption,
  defenseBatteryCaption,
  pilotSkillCaption,
} from "../captions";
import type { BatterySystemTutorialState } from "../state";
import {
  cancelZeroBatteryDefense,
  doBurstBecauseZeroBattery,
  doPilotSkillBecauseZeroBattery,
  zeroBatteryDefenseBecauseNoBatteryRecover,
} from "../stories/zero-battery";

/** イベントリスト終了情報 */
type Ret = {
  /** ステート更新結果 */
  state: BatterySystemTutorialState;

  /** コマンドキャンセル情報 */
  cancel: CommandCanceled;
};

/**
 * ゼロ防御した時の処理
 *
 * @param props イベントプロパティ
 * @param state ステート
 * @param player プレイヤー情報
 * @return 終了情報
 */
async function onZeroDefense(
  props: Readonly<CustomBattleEventProps>,
  state: BatterySystemTutorialState,
  player: PlayerState,
): Promise<Ret> {
  const isZeroBattery = player.armdozer.battery === 0;
  const enableBurst = player.armdozer.enableBurst;
  const enablePilotSkill = player.pilot.enableSkill;

  if (isZeroBattery && !enableBurst && !enablePilotSkill) {
    await zeroBatteryDefenseBecauseNoBatteryRecover(props);
    refreshConversation(props);
    return {
      state,
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
      state,
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
      state,
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
    props.view.dom.nearBatterySelectorMessageWindow.messages(
      defenseBatteryCaption,
    );
  }

  return {
    state,
    cancel: {
      isCommandCanceled: true,
    },
  };
}

/**
 * バッテリーコマンド選択イベント
 *
 * @param props イベントプロパティ
 * @param state ステート
 * @return 終了情報
 */
export async function onBatteryCommandSelected(
  props: Readonly<BatteryCommandSelected>,
  state: BatterySystemTutorialState,
): Promise<Ret> {
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
      return await onZeroDefense(props, state, player);
    }
  }

  if (isBatterySelectorFocused(props)) {
    focusOutBatterySelector(props);
  }
  return {
    state,
    cancel: {
      isCommandCanceled: false,
    },
  };
}
