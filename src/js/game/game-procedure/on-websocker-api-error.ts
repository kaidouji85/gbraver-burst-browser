import { $ReadOnly } from "utility-types";
import { NetworkErrorDialog } from "../../dom-dialogs/network-error/network-error-dialog";
import { networkErrorDialogConnector } from "../action-connector/network-error-dialog-connector";
import type { WebSocketAPIError } from "../game-actions";
import type { GameProps } from "../game-props";

/**
 * WebSocketAPIエラー時の処理
 *
 * @param props ゲームプロパティ
 * @param action アクション
 */
export function onWebSocketAPIError(props: $ReadOnly<GameProps>, action: WebSocketAPIError): void {
  const dialog = new NetworkErrorDialog(props.resources, {
    type: "GotoTitle"
  });
  props.domDialogBinder.bind(dialog, networkErrorDialogConnector);
  throw action;
}