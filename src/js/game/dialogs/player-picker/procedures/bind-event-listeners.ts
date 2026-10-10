import { Unsubscribable } from "rxjs";

import { domPushStream } from "../../../../dom/push-dom";
import { PlayerPickerDialogProps } from "../props";
import { onArmdozerIconPush } from "./on-armdozer-icon-push";
import { onCloseButtonPush } from "./on-close-button-push";
import { onConfirmButtonPush } from "./on-confirm-button-push";
import { onPilotIconPush } from "./on-pilot-icon-push";

/**
 * イベントリスナーをバインドする
 * @param props プレイヤーピッカーダイアログのプロパティ
 * @returns アンサブスクライバブル
 */
export const bindEventListeners = (
  props: PlayerPickerDialogProps,
): Unsubscribable[] => {
  return [
    ...props.armdozerIcons.map((icon) =>
      icon.notifyPush().subscribe((action) => {
        onArmdozerIconPush({ props, armdozerIcon: icon, action });
      }),
    ),
    ...props.pilotIcons.map((icon) =>
      icon.notifyPush().subscribe((action) => {
        onPilotIconPush({ props, pilotIcon: icon, action });
      }),
    ),
    domPushStream(props.closeButton).subscribe((action) => {
      onCloseButtonPush({ props, action });
    }),
    domPushStream(props.confirmButton).subscribe((action) => {
      onConfirmButtonPush({ props, action });
    }),
  ];
};
