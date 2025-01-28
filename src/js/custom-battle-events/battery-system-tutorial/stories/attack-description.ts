import { delay } from "../../../animation/delay";
import { LastState } from "../../../td-scenes/battle/custom-battle-event";
import { createAnimationPlay } from "../../../td-scenes/battle/play-animation";
import { focusInBatterySelector } from "../../focus";

/**
 * 攻撃説明ストーリー
 * @param props イベントプロパティ
 * @param attackBatteryCaption 攻撃時のキャプション innerHTML
 * @returns ストーリーが完了したら発火するPromise
 */
export async function attackDescription(
  props: Readonly<LastState>,
  attackBatteryCaption: string,
): Promise<void> {
  await focusInBatterySelector(props);
  props.view.dom.nearBatterySelectorMessageWindow.messagesInInnerHTML(
    attackBatteryCaption,
  );
  const playAnimation = createAnimationPlay(props);
  const signal = props.abortController.signal;
  await props.view.hud.gameObjects.batterySelector.batteryPlus({ signal });
  await playAnimation(delay(200));
  await props.view.hud.gameObjects.batterySelector.batteryPlus({ signal });
  await playAnimation(delay(200));
  await props.view.hud.gameObjects.batterySelector.batteryPlus({ signal });
  await playAnimation(delay(200));
  await props.view.hud.gameObjects.batterySelector.batteryMinus({ signal });
}
