import { LastStateEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeNearBatterySelectorMessageWindow } from "../../active-message-window";
import { focusInBatterySelector } from "../../focus";

/**
 * 防御説明ストーリー
 * @param props イベントプロパティ
 * @param defenseBatteryCaption 防御時のキャプション innerHTML
 * @returns ストーリーが完了したら発火するPromise
 */
export async function defenseDescription(
  props: Readonly<LastStateEventProps>,
  defenseBatteryCaption: string,
): Promise<void> {
  await focusInBatterySelector(props);
  activeNearBatterySelectorMessageWindow(props);
  props.view.dom.nearBatterySelectorMessageWindow.messagesInInnerHTML(
    defenseBatteryCaption,
  );
}
