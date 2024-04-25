import { BurstCommand } from "gbraver-burst-core";

import { BattleSceneProps } from "../battle-scene-props";
import { CommandCanceled } from "../custom-battle-event";

/**
 * カスタムバトルイベントがセットされていれば onBurstCommandSelected を実行する
 * 実行結果としてコマンドキャンセル情報を返す
 * @param props 戦闘シーンプロパティ
 * @param battery バーストコマンド
 * @returns コマンドキャンセル情報
 */
export async function doBurstEventIfNeeded(
  props: Readonly<BattleSceneProps>,
  burst: Readonly<BurstCommand>,
): Promise<CommandCanceled> {
  return props.customBattleEvent
    ? await props.customBattleEvent.onBurstCommandSelected({ ...props, burst })
    : { isCommandCanceled: false };
}
