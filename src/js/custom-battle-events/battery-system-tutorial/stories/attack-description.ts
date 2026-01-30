import { LastStateEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { waitTime } from "../../../wait/wait-time";
import { waitUntilWindowPushWithStream } from "../../../wait/wait-until-window-push-with-stream";
import { activeNearBatterySelectorMessageWindow } from "../../active-message-window";
import { focusInBatterySelector } from "../../focus";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
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
  const signal = props.abort.getAbortController().signal;

  activeNearBatterySelectorMessageWindow(props);
  props.view.dom.nearBatterySelectorMessageWindow.messagesInInnerHTML(
    props.changeBatteryCaption,
  );
  props.view.dom.nearBatterySelectorMessageWindow.scrollUp();
  props.se.play(props.sounds.sendMessage);
  await waitUntilWindowPushWithStream(props.pushWindow, { signal });

  invisibleAllMessageWindows(props);
  await props.view.hud.gameObjects.batterySelector.batteryPlus({ signal });
  await waitTime(200, { signal });
  await props.view.hud.gameObjects.batterySelector.batteryPlus({ signal });
  await waitTime(200, { signal });
  await props.view.hud.gameObjects.batterySelector.batteryPlus({ signal });
  await waitTime(200, { signal });
  await props.view.hud.gameObjects.batterySelector.batteryMinus({ signal });

  activeNearBatterySelectorMessageWindow(props);
  props.view.dom.nearBatterySelectorMessageWindow.messagesInInnerHTML(
    props.pushAttackButtonCaption,
  );
}
