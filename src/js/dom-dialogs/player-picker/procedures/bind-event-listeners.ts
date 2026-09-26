import { Unsubscribable } from "rxjs";

import { domPushStream } from "../../../dom/push-dom";
import { PlayerPickerDialogProps } from "../props";
import { onArmdozerIconPush } from "./on-armdozer-icon-push";
import { onGotoTitleButtonPush } from "./on-goto-title-button-push";
import { onPilotIconPush } from "./on-pilot-icon-push";
import { onRetryButtonPush } from "./on-retry-button-push";

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
    domPushStream(props.gotoTitleButton).subscribe((action) => {
      onGotoTitleButtonPush({ props, action });
    }),
    domPushStream(props.retryButton).subscribe((action) => {
      onRetryButtonPush({ props, action });
    }),
  ];
};
