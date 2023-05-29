import { Unsubscribable } from "rxjs";

import { domImmediatePushStream } from "../../../../dom/event-stream";
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
    domImmediatePushStream(props.root).subscribe((action) => {
      onPilotPush(props, action);
    }),
  ];
}
