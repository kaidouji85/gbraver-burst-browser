import { BurstCommand } from "gbraver-burst-core";

import { CommandCanceled } from "../custom-battle-event";
import { BattleSceneProps } from "../props";

/** オプション */
type Options = {
  /** 戦闘シーンプロパティ */
  props: Readonly<BattleSceneProps>;
  /** バーストコマンド */
  burst: Readonly<BurstCommand>;
  /** ボタン押下時のDOMイベント */
  event: Event;
};

/**
 * カスタムバトルイベントがセットされていれば onBurstCommandSelected を実行する
 * 実行結果としてコマンドキャンセル情報を返す
 * @param options オプション
 * @returns コマンドキャンセル情報
 */
export async function doBurstEventIfNeeded(
  options: Options,
): Promise<CommandCanceled> {
  const { props, burst, event } = options;
  const lastState = props.stateHistory.at(-1);
  return props.customBattleEvent && lastState
    ? await props.customBattleEvent.onBurstCommandSelected({
        ...props,
        burst,
        lastState,
        event,
      })
    : { isCommandCanceled: false };
}
