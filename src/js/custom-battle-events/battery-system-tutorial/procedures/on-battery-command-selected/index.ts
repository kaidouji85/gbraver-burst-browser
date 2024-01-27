import { BatteryCommandSelected } from "../../../../td-scenes/battle/custom-battle-event";
import {
  focusOutBatterySelector,
  isBatterySelectorFocused,
} from "../../../focus";
import { BatterySystemTutorialProps } from "../../props";
import { BatteryCommandSelectedEnd } from "./battery-command-selected-end";
import { doZeroBatteryIdNeeded } from "./do-zero-battery-if-needed";

/**
 * バッテリーコマンド選択イベント
 * @param props イベントプロパティ
 * @return 終了情報
 */
export async function onBatteryCommandSelected(
  props: Readonly<BatteryCommandSelected & BatterySystemTutorialProps>,
): Promise<BatteryCommandSelectedEnd> {
  const doneZeroBattery = await doZeroBatteryIdNeeded(props);
  if (doneZeroBattery) {
    return doneZeroBattery;
  }

  if (isBatterySelectorFocused(props)) {
    focusOutBatterySelector(props);
  }
  return {
    state: props.state,
    cancel: {
      isCommandCanceled: false,
    },
  };
}
