import { Unsubscribable } from "rxjs";

import { pushDOMStream } from "../../../dom/event-stream";
import { MiniControllerProps } from "../props";
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
    pushDOMStream(props.pilot).subscribe((action) => {
      onPilotPush(props, action);
    }),
  ];
}
