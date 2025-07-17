import { Unsubscribable } from "rxjs";

import { domPushStream } from "../../../dom/push-dom";
import { TutorialDescriptionDialogProps } from "../props";
import { onBackGroundPush } from "./on-back-ground-push";
import { onCloseButtonPush } from "./on-close-button-push";
import { onCloserPush } from "./on-closer-push";
import { onStartTutorialButtonPush } from "./on-start-tutorial-button-push";

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
    domPushStream(props.startTutorialButton).subscribe((action) => {
      onStartTutorialButtonPush({ props, action });
    }),
    domPushStream(props.backGround).subscribe((action) => {
      onBackGroundPush({ props, action });
    }),
  ];
};
