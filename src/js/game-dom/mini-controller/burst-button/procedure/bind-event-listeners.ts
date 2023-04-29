import { Unsubscribable } from "rxjs";

import { pushDOMStream } from "../../../../dom/event-stream";
import { BurstButtonProps } from "../props";
import { onButtonPush } from "./on-button-push";

/**
 * バーストボタンにイベントを関連付ける
 * @param props コンポネントプロパティ
 * @return アンサブスクライバ
 */
export function bindEventListeners(props: BurstButtonProps): Unsubscribable[] {
  return [
    pushDOMStream(props.root).subscribe((action) => {
      onButtonPush(props, action);
    }),
  ];
}
