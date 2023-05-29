import { Unsubscribable } from "rxjs";

import { BatteryButtonProps } from "../props";
import { onBatteryPush } from "./on-battery-push";
import {domImmediatePushStream} from "../../../../dom/push-dom";

/**
 * イベントリスナをバインドする
 * @param props 画面プロパティ
 * @return バインドしたイベントリスナのアンサブスクライバ
 */
export function bindEventListeners(
  props: BatteryButtonProps
): Unsubscribable[] {
  return [
    domImmediatePushStream(props.root).subscribe((action) => {
      onBatteryPush(props, action);
    }),
  ];
}
