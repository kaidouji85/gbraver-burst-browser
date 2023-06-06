import { Unsubscribable } from "rxjs";

import { domPushStream } from "../../../../dom/push-dom";
import { BurstButtonProps } from "../props";
import { onButtonPush } from "./on-button-push";

/**
 * バーストボタンにイベントを関連付ける
 * @param props コンポネントプロパティ
 * @return アンサブスクライバ
 */
export function bindEventListeners(props: BurstButtonProps): Unsubscribable[] {
  return [
    domPushStream(props.root).subscribe((action) => {
      onButtonPush(props, action);
    }),
  ];
}
