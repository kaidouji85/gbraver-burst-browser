// @flow
import type {CommandCanceled, PilotSkillCommandSelected} from "../../../td-scenes/battle/custom-battle-event";
import {focusOutPilotButton} from "../../focus";
import type {BatterySystemTutorialState, SelectableCommands} from "../state";

/** イベント終了情報 */
type Ret = {
  /** ステート更新結果 */
  state: BatterySystemTutorialState,
  /** コマンドキャンセル情報 */
  cancel: CommandCanceled
};

/**
 * パイロットスキルコマンド選択イベント
 *
 * @param props イベントプロパティ
 * @param state ステート
 * @return イベント終了情報
 */
export async function onPilotSkillCommandSelected(props: $ReadOnly<PilotSkillCommandSelected>, state: BatterySystemTutorialState): Promise<Ret> {
  const enablePilotSkillCommand: SelectableCommands[] = ['All', 'PilotSkillOnly'];
  if (!enablePilotSkillCommand.includes(state.selectableCommands)) {
    return {state, cancel: {isCommandCanceled: true}};
  }

  if (state.selectableCommands === 'PilotSkillOnly') {
    focusOutPilotButton(props);
    const selectableCommands = 'All';
    return {state: {...state, selectableCommands}, cancel: {isCommandCanceled: false}};
  }

  return {state, cancel: {isCommandCanceled: false}};
}