import { PilotSkillCommand } from "gbraver-burst-core";

import { CommandCanceled } from "../custom-battle-event";
import { BattleSceneProps } from "../props";

/** オプション */
type Options = {
  /** 戦闘シーンプロパティ */
  props: Readonly<BattleSceneProps>;
  /** パイロットスキルコマンド */
  pilot: Readonly<PilotSkillCommand>;
  /** ボタン押下時のDOMイベント */
  event: Event;
};

/**
 * カスタムバトルイベントがセットされていれば onPilotSkillCommandSelected を実行する
 * 実行結果としてコマンドキャンセル情報を返す
 * @param options オプション
 * @returns コマンドキャンセル情報
 */
export async function doPilotSkillEventIfNeeded(
  options: Options,
): Promise<CommandCanceled> {
  const { props, pilot, event } = options;
  const lastState = props.stateHistory.at(-1);
  return props.customBattleEvent && lastState
    ? await props.customBattleEvent.onPilotSkillCommandSelected({
        ...props,
        pilot,
        lastState,
        event,
      })
    : { isCommandCanceled: false };
}
