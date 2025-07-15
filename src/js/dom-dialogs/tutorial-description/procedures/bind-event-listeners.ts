import { Unsubscribable } from "rxjs";

import { domPushStream } from "../../../dom/push-dom";
import { TutorialDescriptionDialogProps } from "../props";
import { onCloseButtonPush } from "./on-close-button-push";
import { onCloserPush } from "./on-closer-push";

/**
 * イベントリスナーをバインドする
 * @param props チュートリアル説明ダイアログのプロパティ
 * @returns アンサブスクライバ
 */
export const bindEventListeners = (
  props: Readonly<TutorialDescriptionDialogProps>,
): Unsubscribable[] => {
  return [
    domPushStream(props.closer).subscribe((action) => {
      onCloserPush({ props, action });
    }),
    domPushStream(props.closeButton).subscribe((action) => {
      onCloseButtonPush({ props, action });
    }),
  ];
};
