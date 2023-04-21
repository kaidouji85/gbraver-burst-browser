import { PushDOM } from "../../../dom/event-stream";
import { MiniControllerProps } from "../props";
import { getBattery } from "../dom/battery-button";

/**
 * バッテリーボタンを押下した時の処理
 * @param props コンポネントプロパティ
 * @param action アクション
 */
export function onBatteryPush(
  props: Readonly<MiniControllerProps>,
  action: Readonly<PushDOM>
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  if (!(action.event.target instanceof HTMLElement)) {
    return;
  }

  const battery = getBattery(action.event.target);
  if (battery === null) {
    return;
  }

  props.batteryPush.next(battery);
}
