import { Unsubscribable } from "rxjs";

import { domPushStream } from "../../../dom/push-dom";
import { TutorialDescriptionDialogProps } from "../props";
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
  ];
};
