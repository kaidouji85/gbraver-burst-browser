// @flow
import { networkErrorDialogConnector } from "../dom-dialogs/action-connector/network-error-dialog-connector";
import { NetworkErrorDialog } from "../dom-dialogs/network-error/network-error-dialog";
import type { WebSocketAPIError } from "../game-actions";
import type { GameProps } from "../game-props";

/**
 * WebSocketAPIエラー時の処理
 *
 * @param props ゲームプロパティ
 * @param action アクション
 */
export function onWebSocketAPIError(
  props: $ReadOnly<GameProps>,
  action: WebSocketAPIError
): void {
  const dialog = new NetworkErrorDialog(props.resources, { type: "GotoTitle" });
  props.domDialogs.bind(dialog, networkErrorDialogConnector);
  throw action;
}
