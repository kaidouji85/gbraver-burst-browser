import { Unsubscribable } from "rxjs";

import { PilotButtonProps } from "../props";
import { onPilotPush } from "./on-pilot-push";
import {domImmediatePushStream} from "../../../../dom/push-dom";

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
