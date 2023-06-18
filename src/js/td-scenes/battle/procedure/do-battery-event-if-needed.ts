import { BatteryCommand } from "gbraver-burst-core";

import { BattleSceneProps } from "../battle-scene-props";
import { CommandCanceled } from "../custom-battle-event";

/**
 * カスタムバトルイベントがセットされていれば onBatteryCommandSelected を実行する
 * 実行結果としてコマンドキャンセル情報を返す
 * @param props 戦闘シーンプロパティ
 * @param battery バッテリーコマンド
 * @return コマンドキャンセル情報
 */
export async function doBatteryEventIfNeeded(
  props: Readonly<BattleSceneProps>,
  battery: Readonly<BatteryCommand>
): Promise<CommandCanceled> {
  return props.customBattleEvent
    ? await props.customBattleEvent.onBatteryCommandSelected({
        ...props,
        battery,
      })
    : { isCommandCanceled: false };
}
