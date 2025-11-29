import { LastStateEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { waitTime } from "../../../wait/wait-time";
import { activeNearBatterySelectorMessageWindow } from "../../active-message-window";
import { focusInBatterySelector } from "../../focus";
import { BatterySystemTutorialProps } from "../props";

/**
 * 防御説明ストーリー
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export async function defenseDescription(
  props: Readonly<LastStateEventProps & BatterySystemTutorialProps>,
): Promise<void> {
  await focusInBatterySelector(props);
  activeNearBatterySelectorMessageWindow(props, props.defenseBatteryCaption);
  const signal = props.abort.getAbortController().signal;
  await waitTime(200, { signal });
  props.view.hud.gameObjects.batterySelector.attention();
}
