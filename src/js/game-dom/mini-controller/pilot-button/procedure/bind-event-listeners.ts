import { Unsubscribable } from "rxjs";

import { pushDOMStream } from "../../../../dom/event-stream";
import { PilotButtonProps } from "../props";
import { onPilotPush } from "./on-pilot-push";

/**
 * パイロットボタンにイベントを関連付ける
 * @param props コンポネントプロパティ
 * @return アンサブスクライバ
 */
export function bindEventListeners(
  props: Readonly<PilotButtonProps>
): Unsubscribable[] {
  return [
    pushDOMStream(props.root).subscribe((action) => {
      onPilotPush(props, action);
    }),
  ];
}
