import { Unsubscribable } from "rxjs";

import { domClickStream } from "../../../../dom/push-dom";
import { BatteryButtonProps } from "../props";
import { onBatteryPush } from "./on-battery-push";

/**
 * イベントリスナをバインドする
 * @param props 画面プロパティ
 * @return バインドしたイベントリスナのアンサブスクライバ
 */
export function bindEventListeners(
  props: BatteryButtonProps
): Unsubscribable[] {
  return [
    domClickStream(props.root).subscribe((action) => {
      onBatteryPush(props, action);
    }),
  ];
}
