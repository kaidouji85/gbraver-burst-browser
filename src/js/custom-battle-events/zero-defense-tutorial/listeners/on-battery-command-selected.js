// @flow
import type {GameState} from "gbraver-burst-core";
import type {BatteryCommandSelected, CommandCanceled} from "../../../td-scenes/battle/custom-battle-event";
import {unattentionBurstButton, unattentionPilotButton} from "../../attention";
import {focusInBurstButton, focusInPilotButton} from "../../focus";
import {refreshConversation} from "../../invisible-all-message-windows";
import {shouldBurst, shouldPilotSkill} from "../captions";
import type {SelectableCommands, ZeroDefenseTutorialState} from "../state";
import {
  cancelZeroBatteryDefense,
  doBurstBecauseZeroBattery,
  doPilotSkillBecauseZeroBattery,
  zeroBatteryDefenseBecauseNoBatteryRecover
} from "../stories/no-zero-battery";

/** イベント終了情報 */
type Ret = {
  /** ステート更新結果 */
  state: ZeroDefenseTutorialState,
  /** コマンドキャンセル情報 */
  cancel: CommandCanceled,
};

/**
 * バッテリーコマンド選択イベント
 *
 * @param props イベントプロパティ
 * @param state ステート
 * @return イベント終了情報
 */
export async function onBatteryCommandSelected(props: $ReadOnly<BatteryCommandSelected>, state: ZeroDefenseTutorialState): Promise<Ret> {
  const enableBatteryCommand: SelectableCommands[] = ['All'];
  if (!enableBatteryCommand.includes(state.selectableCommands)) {
    return {state, cancel: {isCommandCanceled: true}};
  }

  const foundLastState = state.stateHistory[state.stateHistory.length - 1];
  const isNotZeroBatteryCommand = props.battery.battery !== 0;
  if (!foundLastState || isNotZeroBatteryCommand) {
    return {state, cancel: {isCommandCanceled: false}};
  }

  const lastState: GameState = foundLastState;
  const iPlayerTurn = lastState.activePlayerId === props.playerId;
  const player = lastState.players.find(v => v.playerId === props.playerId);
  if (iPlayerTurn || !player) {
    return {state, cancel: {isCommandCanceled: false}};
  }

  const isZeroBattery = player.armdozer.battery === 0;
  if (!isZeroBattery) {
    await cancelZeroBatteryDefense(props);
    return {state, cancel: {isCommandCanceled: true}};
  }

  const enableBurst = player.armdozer.enableBurst;
  const enablePilotSkill = player.pilot.enableSkill;
  if (isZeroBattery && enableBurst) {
    await doBurstBecauseZeroBattery(props);
    unattentionBurstButton(props);
    await focusInBurstButton(props, shouldBurst);
    return {state: {...state, selectableCommands: 'BurstOnly'}, cancel: {isCommandCanceled: true}};
  }

  if (isZeroBattery && !enableBurst && enablePilotSkill) {
    await doPilotSkillBecauseZeroBattery(props);
    unattentionPilotButton(props);
    await focusInPilotButton(props, shouldPilotSkill);
    return {state: {...state, selectableCommands: 'PilotSkillOnly'}, cancel: {isCommandCanceled: true}};
  }

  if (isZeroBattery && !enableBurst && !enablePilotSkill) {
    await zeroBatteryDefenseBecauseNoBatteryRecover(props);
    refreshConversation(props);
    return {state, cancel: {isCommandCanceled: false}};
  }

  return {state, cancel: {isCommandCanceled: false}};
}