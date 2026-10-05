import { BurstCommand } from "gbraver-burst-core";

import { CommandCanceled } from "../custom-battle-event";
import { BattleSceneProps } from "../props";

/**
 * カスタムバトルイベントがセットされていれば onBurstCommandSelected を実行する
 * 実行結果としてコマンドキャンセル情報を返す
 * @param props 戦闘シーンプロパティ
 * @param burst バーストコマンド
 * @returns コマンドキャンセル情報
 */
export async function doBurstEventIfNeeded(
  props: Readonly<BattleSceneProps>,
  burst: Readonly<BurstCommand>,
): Promise<CommandCanceled> {
  const lastState = props.stateHistory.at(-1);
  return props.customBattleEvent && lastState
    ? await props.customBattleEvent.onBurstCommandSelected({
        ...props,
        burst,
        lastState,
      })
    : { isCommandCanceled: false };
}
