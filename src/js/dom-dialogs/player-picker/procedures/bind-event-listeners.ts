import { Unsubscribable } from "rxjs";

import { PlayerPickerDialogProps } from "../props";
import { onArmdozerIconPush } from "./on-armdozer-icon-push";
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
  ];
};
