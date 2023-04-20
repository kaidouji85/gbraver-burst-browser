import { Unsubscribable } from "rxjs";
import { MiniControllerProps } from "../props";
import { pushDOMStream } from "../../../dom/event-stream";
import { onBurstPush } from "./on-burst-push";

/**
 * 設定画面にイベントリスナをバインドする
 * @param props 画面プロパティ
 * @return バインドしたイベントリスナのアンサブスクライバ
 */
export function bindEventListeners(props: MiniControllerProps): Unsubscribable[] {
  return [
    pushDOMStream(props.burst).subscribe(action => {
      onBurstPush(action);
    })
  ];
}