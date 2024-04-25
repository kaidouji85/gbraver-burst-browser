import { PilotSkillCommand } from "gbraver-burst-core";

import { BattleSceneProps } from "../battle-scene-props";
import { CommandCanceled } from "../custom-battle-event";

/**
 * カスタムバトルイベントがセットされていれば onPilotSkillCommandSelected を実行する
 * 実行結果としてコマンドキャンセル情報を返す
 * @param props 戦闘シーンプロパティ
 * @param battery パイロットスキルコマンド
 * @returns コマンドキャンセル情報
 */
export async function doPilotSkillEventIfNeeded(
  props: Readonly<BattleSceneProps>,
  pilot: Readonly<PilotSkillCommand>,
): Promise<CommandCanceled> {
  return props.customBattleEvent
    ? await props.customBattleEvent.onPilotSkillCommandSelected({
        ...props,
        pilot,
      })
    : { isCommandCanceled: false };
}
