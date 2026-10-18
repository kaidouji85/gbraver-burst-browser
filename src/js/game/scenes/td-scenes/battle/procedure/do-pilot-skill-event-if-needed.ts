import { PilotSkillCommand } from "gbraver-burst-core";

import { CommandCanceled } from "../custom-battle-event";
import { BattleSceneProps } from "../props";

/**
 * カスタムバトルイベントがセットされていれば onPilotSkillCommandSelected を実行する
 * 実行結果としてコマンドキャンセル情報を返す
 * @param props 戦闘シーンプロパティ
 * @param pilot パイロットスキルコマンド
 * @returns コマンドキャンセル情報
 */
export async function doPilotSkillEventIfNeeded(
  props: Readonly<BattleSceneProps>,
  pilot: Readonly<PilotSkillCommand>,
): Promise<CommandCanceled> {
  const lastState = props.stateHistory.at(-1);
  return props.customBattleEvent && lastState
    ? await props.customBattleEvent.onPilotSkillCommandSelected({
        ...props,
        pilot,
        lastState,
      })
    : { isCommandCanceled: false };
}
