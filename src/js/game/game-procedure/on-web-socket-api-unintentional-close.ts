import { $ReadOnly } from "utility-types";
import { NetworkErrorDialog } from "../../dom-dialogs/network-error/network-error-dialog";
import { networkErrorDialogConnector } from "../action-connector/network-error-dialog-connector";
import type { WebSocketAPIUnintentionalClose } from "../game-actions";
import type { GameProps } from "../game-props";

/**
 * WebSocketAPI意図しない切断時の処理
 *
 * @param props ゲームプロパティ
 * @param action アクション
 */
export function onWebSocketAPIUnintentionalClose(props: $ReadOnly<GameProps>, action: WebSocketAPIUnintentionalClose): void {
  const dialog = new NetworkErrorDialog(props.resources, {
    type: "GotoTitle"
  });
  props.domDialogBinder.bind(dialog, networkErrorDialogConnector);
  throw action;
}