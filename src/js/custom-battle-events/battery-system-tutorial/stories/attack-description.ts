import type { LastState } from "../../../td-scenes/battle/custom-battle-event";
import { waitTime } from "../../../wait/wait-time";
import { focusInBatterySelector } from "../../focus";
import { attackBatteryCaption } from "../captions";

/**
 * 攻撃説明ストーリー
 *
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export async function attackDescription(
  props: Readonly<LastState>
): Promise<void> {
  await focusInBatterySelector(props, attackBatteryCaption);
  await props.view.hud.gameObjects.batterySelector.batteryPlus();
  await waitTime(200);
  await props.view.hud.gameObjects.batterySelector.batteryPlus();
  await waitTime(200);
  await props.view.hud.gameObjects.batterySelector.batteryPlus();
  await waitTime(200);
  await props.view.hud.gameObjects.batterySelector.batteryMinus();
}
