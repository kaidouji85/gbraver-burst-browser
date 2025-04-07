import { Unsubscribable } from "rxjs";

import { domClickStream } from "../../../../dom/push-dom";
import { EpisodeElementProps } from "../props";
import { onRootClick } from "./on-root-click";

/**
 * イベントリスナを関連付ける
 * @param props プロパティ
 * @returns サンサブスクライバ
 */
export function bindEventListeners(
  props: Readonly<EpisodeElementProps>,
): Unsubscribable[] {
  return [
    domClickStream(props.root).subscribe((action) => {
      onRootClick({ props, action });
    }),
  ];
}
