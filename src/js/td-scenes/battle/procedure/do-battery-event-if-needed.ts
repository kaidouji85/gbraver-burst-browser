import { BatteryCommand } from "gbraver-burst-core";

import { CommandCanceled } from "../custom-battle-event";
import { BattleSceneProps } from "../props";

/**
 * カスタムバトルイベントがセットされていれば onBatteryCommandSelected を実行する
 * 実行結果としてコマンドキャンセル情報を返す
 * @param props 戦闘シーンプロパティ
 * @param battery バッテリーコマンド
 * @returns コマンドキャンセル情報
 */
export async function doBatteryEventIfNeeded(
  props: Readonly<BattleSceneProps>,
  battery: Readonly<BatteryCommand>,
): Promise<CommandCanceled> {
  const lastState = props.stateHistory.at(-1);
  return props.customBattleEvent && lastState
    ? await props.customBattleEvent.onBatteryCommandSelected({
        ...props,
        battery,
        lastState,
      })
    : { isCommandCanceled: false };
}
