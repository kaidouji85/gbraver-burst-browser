import { Unsubscribable } from "rxjs";

import { domImmediatePushStream } from "../../../../dom/event-stream";
import { BurstButtonProps } from "../props";
import { onButtonPush } from "./on-button-push";

/**
 * バーストボタンにイベントを関連付ける
 * @param props コンポネントプロパティ
 * @return アンサブスクライバ
 */
export function bindEventListeners(props: BurstButtonProps): Unsubscribable[] {
  return [
    domImmediatePushStream(props.root).subscribe((action) => {
      onButtonPush(props, action);
    }),
  ];
}
