import {
  BatteryCommandSelected,
  CommandCanceled,
} from "../../../td-scenes/battle/custom-battle-event";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { turnCount } from "../../turn-count";
import { PilotSkillTutorial01State } from "../state";
import { noZeroDefense } from "../stories/no-zero-defense";

/** イベント終了情報 */
type Ret = {
  /** ステート更新結果 */
  state: PilotSkillTutorial01State;
  /** コマンドキャンセル情報 */
  cancel: CommandCanceled;
};

/**
 * バッテリーコマンド選択イベント
 * @param props イベントプロパティ
 * @param state イベントステート
 * @return イベント終了情報
 */
export async function onBatteryCommandSelected(
  props: Readonly<BatteryCommandSelected>,
  state: Readonly<PilotSkillTutorial01State>
): Promise<Ret> {
  const turn = turnCount(props.stateHistory);
  if (props.battery.battery === 0 && turn === 1) {
    await noZeroDefense(props);
    invisibleAllMessageWindows(props);
    return {
      cancel: {
        isCommandCanceled: true,
      },
      state,
    };
  }

  return {
    cancel: {
      isCommandCanceled: false,
    },
    state,
  };
}
