import { Unsubscribable } from "rxjs";

import { pushDOMStream } from "../../../dom/event-stream";
import { MiniControllerProps } from "../props";
import { onBatteryButtonPush } from "./on-battery-button-push";
import { onBurstPush } from "./on-burst-push";
import { onPilotPush } from "./on-pilot-push";

/**
 * 設定画面にイベントリスナをバインドする
 * @param props 画面プロパティ
 * @return バインドしたイベントリスナのアンサブスクライバ
 */
export function bindEventListeners(
  props: MiniControllerProps
): Unsubscribable[] {
  return [
    pushDOMStream(props.burst).subscribe((action) => {
      onBurstPush(props, action);
    }),
    pushDOMStream(props.pilot).subscribe((action) => {
      onPilotPush(props, action);
    }),
    ...props.batteryButtons.map((batteryButton) =>
      pushDOMStream(batteryButton).subscribe((action) => {
        onBatteryButtonPush(batteryButton, props, action);
      })
    ),
  ];
}
