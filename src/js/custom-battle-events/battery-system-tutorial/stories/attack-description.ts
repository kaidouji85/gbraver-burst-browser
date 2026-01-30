import { LastStateEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeNearBatterySelectorMessageWindow } from "../../active-message-window";
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
  await focusInBatterySelector(props);
  activeNearBatterySelectorMessageWindow(props);
  props.view.dom.nearBatterySelectorMessageWindow.messagesInInnerHTML(
    props.attackBatteryCaption,
  );
}
