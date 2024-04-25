import { Unsubscribable } from "rxjs";

import { domPushStream } from "../../../dom/push-dom";
import { NPCEndingProps } from "../props";
import { onScreenPush } from "./on-screen-push";

/**
 * 画面にイベントを関連づける
 * @param props 画面プロパティ
 * @returns アンサブスクライバ
 */
export function bindEventListeners(props: NPCEndingProps): Unsubscribable[] {
  return [
    domPushStream(props.root).subscribe((action) => {
      onScreenPush(props, action);
    }),
  ];
}
