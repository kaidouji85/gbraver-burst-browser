import { Unsubscribable } from "rxjs";
import { MiniControllerProps } from "../props";
import { pushDOMStream } from "../../../dom/event-stream";
import { onBurstPush } from "./on-burst-push";
import { onPilotPush } from "./on-pilot-push";
import { onBatteryPush } from "./on-battery-push";

/**
 * 設定画面にイベントリスナをバインドする
 * @param props 画面プロパティ
 * @return バインドしたイベントリスナのアンサブスクライバ
 */
export function bindEventListeners(props: MiniControllerProps): Unsubscribable[] {
  return [
    pushDOMStream(props.burst).subscribe(action => {
      onBurstPush(props, action);
    }),
    pushDOMStream(props.pilot).subscribe(action => {
      onPilotPush(props, action);
    }),
    ...[...props.batteries.querySelectorAll("button")].map(battery => pushDOMStream(battery).subscribe(action => {
      onBatteryPush(props, action);
    }))
  ];
}