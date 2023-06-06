import { Unsubscribable } from "rxjs";

import { domClickStream } from "../../../../dom/push-dom";
import { BurstButtonProps } from "../props";
import { onButtonPush } from "./on-button-push";

/**
 * バーストボタンにイベントを関連付ける
 * @param props コンポネントプロパティ
 * @return アンサブスクライバ
 */
export function bindEventListeners(props: BurstButtonProps): Unsubscribable[] {
  return [
    domClickStream(props.root).subscribe((action) => {
      onButtonPush(props, action);
    }),
  ];
}
