import { NetworkErrorDialog } from "../../dom-dialogs/network-error/network-error-dialog";
import { networkErrorDialogConnector } from "../action-connector/network-error-dialog-connector";
import { WebSocketAPIError } from "../game-actions/web-socket-api-error";
import type { GameProps } from "../game-props";

/**
 * WebSocketAPIエラー時の処理
 *
 * @param props ゲームプロパティ
 * @param action アクション
 */
export function onWebSocketAPIError(
  props: Readonly<GameProps>,
  action: WebSocketAPIError,
): void {
  const dialog = new NetworkErrorDialog({
    ...props,
    postNetworkError: {
      type: "GotoTitle",
    },
  });
  props.domDialogBinder.bind(
    dialog,
    networkErrorDialogConnector(props.gameAction),
  );
  throw action;
}
