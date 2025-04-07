import { throttleTime, Unsubscribable } from "rxjs";

import { domPushStream } from "../../../../dom/push-dom";
import { EpisodeElementProps } from "../props";
import { onRootPush } from "./on-root-push";

/**
 * イベントリスナを関連付ける
 * @param props プロパティ
 * @returns サンサブスクライバ
 */
export function bindEventListeners(
  props: Readonly<EpisodeElementProps>,
): Unsubscribable[] {
  return [
    domPushStream(props.root)
      .pipe(throttleTime(500))
      .subscribe((action) => {
        onRootPush({ props, action });
      }),
  ];
}
