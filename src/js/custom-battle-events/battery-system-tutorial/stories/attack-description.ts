import { LastStateEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { waitTime } from "../../../wait/wait-time";
import { focusInBatterySelector } from "../../focus";

/**
 * 攻撃説明ストーリー
 * @param props イベントプロパティ
 * @param attackBatteryCaption 攻撃時のキャプション innerHTML
 * @returns ストーリーが完了したら発火するPromise
 */
export async function attackDescription(
  props: Readonly<LastStateEventProps>,
  attackBatteryCaption: string,
): Promise<void> {
  await focusInBatterySelector(props);
  props.view.dom.nearBatterySelectorMessageWindow.messagesInInnerHTML(
    attackBatteryCaption,
  );
  const signal = props.abort.getAbortController().signal;
  await props.view.hud.gameObjects.batterySelector.batteryPlus({ signal });
  await waitTime(200, { signal });
  await props.view.hud.gameObjects.batterySelector.batteryPlus({ signal });
  await waitTime(200, { signal });
  await props.view.hud.gameObjects.batterySelector.batteryPlus({ signal });
  await waitTime(200, { signal });
  await props.view.hud.gameObjects.batterySelector.batteryMinus({ signal });
}
