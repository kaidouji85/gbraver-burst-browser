import { BatteryCommand } from "gbraver-burst-core";

import { CommandCanceled } from "../custom-battle-event";
import { BattleSceneProps } from "../props";

/** オプション */
type Options = {
  /** プロパティ */
  props: Readonly<BattleSceneProps>;
  /** バッテリーコマンド */
  battery: Readonly<BatteryCommand>;
  /** ボタン押下時のDOMイベント */
  event: Event;
};

/**
 * カスタムバトルイベントがセットされていれば onBatteryCommandSelected を実行する
 * 実行結果としてコマンドキャンセル情報を返す
 * @param options オプション
 * @returns コマンドキャンセル情報
 */
export async function doBatteryEventIfNeeded(
  options: Options,
): Promise<CommandCanceled> {
  const { props, battery, event } = options;
  const lastState = props.stateHistory.at(-1);
  return props.customBattleEvent && lastState
    ? await props.customBattleEvent.onBatteryCommandSelected({
        ...props,
        battery,
        lastState,
        event,
      })
    : { isCommandCanceled: false };
}
