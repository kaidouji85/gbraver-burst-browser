import { Unsubscribable } from "rxjs";

import { domPushStream } from "../../../dom/push-dom";
import { MailVerifiedIncompleteProps } from "../props";
import { onGotoTitleButtonPush } from "./on-goto-title-button-push";
import { onReloadButtonPush } from "./on-reload-button-push";

/**
 * 画面にイベントリスナを関連付ける
 * @param props 画面プロパティ
 * @returns アンサブスクライバ
 */
export function bindEventListeners(
  props: Readonly<MailVerifiedIncompleteProps>,
): Unsubscribable[] {
  return [
    domPushStream(props.gotoTitleButton).subscribe((action) => {
      onGotoTitleButtonPush(props, action);
    }),
    domPushStream(props.reloadButton).subscribe((action) => {
      onReloadButtonPush(props, action);
    }),
  ];
}
