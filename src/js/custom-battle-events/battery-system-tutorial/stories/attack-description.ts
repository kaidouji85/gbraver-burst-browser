import { LastStateEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { waitTime } from "../../../wait/wait-time";
import { activeNearBatterySelectorMessageWindow } from "../../active-message-window";
import { batterySelectorMinus, batterySelectorPlus } from "../../battery-selector-animations";
import { focusInBatterySelector } from "../../focus";
import { BatterySystemTutorialProps } from "../props";

/**
 * 攻撃説明ストーリー
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export async function attackDescription(
  props: Readonly<LastStateEventProps & BatterySystemTutorialProps>,
): Promise<void> {
  const signal = props.abort.getAbortController().signal;

  await focusInBatterySelector(props);
  activeNearBatterySelectorMessageWindow(props);
  props.view.dom.nearBatterySelectorMessageWindow.messagesInInnerHTML(
    props.attackBatteryCaption,
  );

  await batterySelectorPlus(props);
  await waitTime(200, { signal });
  await batterySelectorPlus(props);
  await waitTime(200, { signal });
  await batterySelectorPlus(props);
  await waitTime(200, { signal });
  await batterySelectorMinus(props);

  props.view.hud.gameObjects.batterySelector.attention();
}
