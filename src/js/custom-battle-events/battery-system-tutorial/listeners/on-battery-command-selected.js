// @flow
import type {GameState, PlayerState} from "gbraver-burst-core";
import type {BatteryCommandSelected, CommandCanceled} from "../../../game/td-scenes/battle/custom-battle-event";
import {unattentionBurstButton} from "../../attention";
import {focusInBatterySelector, focusInBurstButton, focusInPilotButton, focusOutBatterySelector} from "../../focus";
import {refreshConversation} from "../../invisible-all-message-windows";
import {burstCaption, defenseBatteryCaption, pilotSkillCaption} from "../captions";
import type {BatterySystemTutorialState, SelectableCommands} from "../state";
import {
  cancelZeroBatteryDefense,
  doBurstBecauseZeroBattery,
  doPilotSkillBecauseZeroBattery,
  zeroBatteryDefenseBecauseNoBatteryRecover
} from "../stories/zero-battery";

/** イベントリスト終了情報 */
type Ret = {
  /** ステート更新結果 */
  state: BatterySystemTutorialState,
  /** コマンドキャンセル情報 */
  cancel: CommandCanceled,
};

/**
 * バッテリーコマンド選択イベント
 *
 * @param props イベントプロパティ
 * @param state ステート
 * @return 終了情報
 */
export async function onBatteryCommandSelected(props: $ReadOnly<BatteryCommandSelected>, state: $ReadOnly<BatterySystemTutorialState>): Promise<Ret> {
  const enableBatteryCommand: SelectableCommands[] = ['BatteryOnly', 'All'];
  if (!enableBatteryCommand.includes(state.selectableCommands)) {
    return {state, cancel:{isCommandCanceled: true}};
  }

  const foundLastState = state.stateHistory[state.stateHistory.length - 1];
  const foundPlayer = (foundLastState?.players ?? []).find(v => v.playerId === props.playerId);
  const isZeroBatteryCommand = props.battery.battery === 0;
  if (isZeroBatteryCommand && foundLastState && foundPlayer) {
    const lastState: GameState = foundLastState;
    const player: PlayerState = foundPlayer;
    const isEnemyTurn = lastState.activePlayerId !== props.playerId;
    const isZeroBattery = player.armdozer.battery === 0;
    const enableBurst = player.armdozer.enableBurst;
    const enablePilotSkill = player.pilot.enableSkill;
    if (isEnemyTurn && isZeroBattery && !enableBurst && !enablePilotSkill) {
      await zeroBatteryDefenseBecauseNoBatteryRecover(props);
      refreshConversation(props);
      return {state, cancel: {isCommandCanceled: false}};
    } else if (isEnemyTurn && isZeroBattery && !enableBurst && enablePilotSkill) {
      await doPilotSkillBecauseZeroBattery(props);
      refreshConversation(props);
      await focusInPilotButton(props, pilotSkillCaption);
      return {state: {...state, selectableCommands: 'PilotSkillOnly'}, cancel: {isCommandCanceled: true}};
    } else if (isEnemyTurn && isZeroBattery && enableBurst) {
      await doBurstBecauseZeroBattery(props);
      refreshConversation(props);
      unattentionBurstButton(props);
      await focusInBurstButton(props, burstCaption);
      return {state: {...state, selectableCommands: 'BurstOnly'}, cancel: {isCommandCanceled: true}};
    } else if (isEnemyTurn) {
      await cancelZeroBatteryDefense(props);
      refreshConversation(props);
      (state.selectableCommands === 'BatteryOnly') && await focusInBatterySelector(props, defenseBatteryCaption);
      return {state, cancel: {isCommandCanceled: true}};
    }
  }

  (state.selectableCommands === 'BatteryOnly') && focusOutBatterySelector(props);
  return {state, cancel: {isCommandCanceled: false}};
}