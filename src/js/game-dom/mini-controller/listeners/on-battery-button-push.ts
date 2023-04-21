import { PushDOM } from "../../../dom/event-stream";
import { MiniControllerProps } from "../props";
import { getBattery } from "../dom/battery-button";

/**
 * バッテリーボタンを押下した時の処理
 * @param batteryButton 押されたバッテリーボタンのHTML要素
 * @param props コンポネントプロパティ
 * @param action アクション
 */
export function onBatteryButtonPush(
  batteryButton: HTMLButtonElement,
  props: Readonly<MiniControllerProps>,
  action: Readonly<PushDOM>
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  const battery = getBattery(batteryButton);
  if (battery === null) {
    return;
  }

  props.batteryPush.next(battery);
}
