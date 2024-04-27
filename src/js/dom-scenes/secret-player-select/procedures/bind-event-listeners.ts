import { Unsubscribable } from "rxjs";

import { domPushStream } from "../../../dom/push-dom";
import { SecretPlayerSelectProps } from "../props";
import { onArmdozerIconPush } from "./on-armdozer-icon-push";
import { onOKButtonPush } from "./on-ok-button-push";
import { onPilotIconPush } from "./on-pilot-icon-push";
import { onPrevButtonPush } from "./on-prev-button-push";

/**
 * イベントリスナをバインドする
 * @param props プロパティ
 * @returns アンサブスクライバ
 */
export function bindEventListeners(
  props: SecretPlayerSelectProps,
): Unsubscribable[] {
  return [
    ...props.armdozerIcons.map((armdozerIcon) =>
      armdozerIcon.notifyPush().subscribe(() => {
        onArmdozerIconPush(props, armdozerIcon.armdozerId);
      }),
    ),
    ...props.pilotIcons.map((pilotIcon) =>
      pilotIcon.notifyPush().subscribe(() => {
        onPilotIconPush(props, pilotIcon.pilotId);
      }),
    ),
    domPushStream(props.okButton).subscribe((action) => {
      onOKButtonPush(props, action);
    }),
    domPushStream(props.prevButton).subscribe((action) => {
      onPrevButtonPush(props, action);
    }),
  ];
}
