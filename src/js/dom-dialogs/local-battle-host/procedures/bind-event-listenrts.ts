import { Unsubscribable } from "rxjs";

import { domPushStream } from "../../../dom/push-dom";
import { LocalBattleHostDialogProps } from "../props";
import { onBackgroundPushed } from "./on-background-pushed";
import { onCloserPushed } from "./on-closer-pushed";

/**
 * イベントリスナーをバインドする
 * @param props プロパティ
 * @returns アンサブスクライバ
 */
export const bindEventListeners = (
  props: LocalBattleHostDialogProps,
): Unsubscribable[] => {
  return [
    domPushStream(props.closer).subscribe((action) => {
      onCloserPushed(props, action);
    }),
    domPushStream(props.backGround).subscribe((action) => {
      onBackgroundPushed(props, action);
    }),
  ];
};
