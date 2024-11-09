import { Unsubscribable } from "rxjs";

import { domPushStream } from "../../../dom/push-dom";
import { pushWindowsStream } from "../../../window/push-window";
import { extractBackGround, extractRetry } from "../dom/extract-element";
import { BattleHamburgerMenuProps } from "../props";
import { onBackgroundPush } from "./on-background-push";
import { onHamburgerIconPush } from "./on-hamburger-icon-push";
import { onMenuOutsidePush } from "./on-menu-outside-push";
import { onRetryCancelButtonPush } from "./on-retry-cancel-button-push";
import { onRetryConfirmDialogCloserPush } from "./on-retry-confirm-dialog-closer-push";
import { onRetryPush } from "./on-retry-push";

/**
 * イベントリスナーをバインドする
 * @param props プロパティ
 * @returns アンサブスクライバー
 */
export function bindEventListeners(
  props: BattleHamburgerMenuProps,
): Unsubscribable[] {
  return [
    domPushStream(props.hamburgerIcon).subscribe((action) => {
      onHamburgerIconPush(props, action);
    }),
    pushWindowsStream().subscribe(() => {
      onMenuOutsidePush(props);
    }),
    domPushStream(extractRetry(props.root)).subscribe((action) => {
      onRetryPush(props, action);
    }),
    domPushStream(props.retryConfirmDialogCloser).subscribe((action) => {
      onRetryConfirmDialogCloserPush(props, action);
    }),
    domPushStream(extractBackGround(props.root)).subscribe((action) => {
      onBackgroundPush(props, action);
    }),
    domPushStream(props.retryCancelButton).subscribe((action) => {
      onRetryCancelButtonPush(props, action);
    }),
  ];
}
