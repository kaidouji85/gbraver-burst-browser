import { Unsubscribable } from "rxjs";

import { domPushStream } from "../../../../dom/push-dom";
import { NetworkErrorDialogProps } from "../props";
import { onPostNetworkErrorButtonPush } from "./on-post-network-error-button-push";

/**
 * イベントリスナーをバインドする
 * @param props ネットワークエラーダイアログのプロパティ
 * @returns サンサブスクライバ
 */
export const bindEventListeners = (
  props: NetworkErrorDialogProps,
): Unsubscribable[] => {
  return [
    domPushStream(props.postNetworkErrorButton).subscribe((action) => {
      onPostNetworkErrorButtonPush({ props, action });
    }),
  ];
};
