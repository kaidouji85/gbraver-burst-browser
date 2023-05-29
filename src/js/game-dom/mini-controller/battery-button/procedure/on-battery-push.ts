import { BatteryButtonProps } from "../props";
import {PushDOM} from "../../../../dom/push-dom";

/**
 * バッテリーボタンを押した時の処理
 * @param props コンポネントプロパティ
 * @param action アクション
 */
export function onBatteryPush(
  props: Readonly<BatteryButtonProps>,
  action: Readonly<PushDOM>
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.batteryPush.next(props.battery);
}
