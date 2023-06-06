import { Unsubscribable } from "rxjs";

import { domClickStream } from "../../../../dom/push-dom";
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
    domClickStream(props.root).subscribe((action) => {
      onPilotPush(props, action);
    }),
  ];
}
