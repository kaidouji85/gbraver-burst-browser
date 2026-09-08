import { Unsubscribable } from "rxjs";

import { domPushStream } from "../../../dom/push-dom";
import { PasswordMatchSelectorDialogProps } from "../props";
import { onBackGroundPushed } from "./on-back-ground-pushed";
import { onCloserPushed } from "./on-closer-pushed";
import { onGuestPushed } from "./on-guest-pushed";
import { onHostPushed } from "./on-host-pushed";

/**
 * イベントリスナーをバインドする
 * @param props プロパティ
 * @returns アンサブスクライバ
 */
export const bindEventListeners = (
  props: PasswordMatchSelectorDialogProps,
): Unsubscribable[] => {
  return [
    domPushStream(props.hostButton).subscribe((action) => {
      onHostPushed(props, action);
    }),
    domPushStream(props.guestButton).subscribe((action) => {
      onGuestPushed(props, action);
    }),
    domPushStream(props.closer).subscribe((action) => {
      onCloserPushed(props, action);
    }),
    domPushStream(props.backGround).subscribe((action) => {
      onBackGroundPushed(props, action);
    }),
  ];
};
