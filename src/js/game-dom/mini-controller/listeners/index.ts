import { Unsubscribable } from "rxjs";

import { pushDOMStream } from "../../../dom/event-stream";
import { MiniControllerProps } from "../props";
import { onBatteryPush } from "./on-battery-push";
import { onBurstPush } from "./on-burst-push";
import { onPilotPush } from "./on-pilot-push";
import { getBatteryButtons } from "../get-battery-buttons";

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
    ...getBatteryButtons(props).map((batteryButton) =>
      pushDOMStream(batteryButton).subscribe((action) => {
        onBatteryPush(props, action);
      })
    ),
  ];
}
