import { Unsubscribable } from "rxjs";

import { pushDOMStream } from "../../../../dom/event-stream";
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
    pushDOMStream(props.root).subscribe((action) => {
      onBatteryPush(props, action);
    }),
  ];
}
