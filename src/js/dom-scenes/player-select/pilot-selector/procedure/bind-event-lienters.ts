import { Unsubscribable } from "rxjs";

import { domPushStream } from "../../../../dom/push-dom";
import { PilotSelectorProps } from "../props";
import { onOkButtonPush } from "./on-ok-button-push";
import { onPilotChange } from "./on-pilot-change";
import { onPrevButtonPush } from "./on-prev-button-push";

/**
 * コンポネントにイベントリスナを関連付ける
 * @param props プロパティ
 * @return アンサブスクライバ
 */
export function bindEventListeners(
  props: PilotSelectorProps,
): Unsubscribable[] {
  return [
    ...props.pilotIcons.map((icon) =>
      icon.notifySelection().subscribe(() => {
        onPilotChange(props, icon.pilotId);
      }),
    ),
    domPushStream(props.okButton).subscribe((action) => {
      onOkButtonPush(props, action);
    }),
    domPushStream(props.prevButton).subscribe((action) => {
      onPrevButtonPush(props, action);
    }),
  ];
}
