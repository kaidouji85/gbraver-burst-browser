import { NetworkErrorDialog } from "../../../dom-dialogs/network-error/network-error-dialog";
import { networkErrorDialogConnector } from "../../action-connector/network-error-dialog-connector";
import { GameAction } from "../../game-actions";
import { WebSocketAPIError } from "../../game-actions/web-socket-api-error";
import { GameProps } from "../../game-props";

/**
 * WebSocketAPIエラー時の処理
 *
 * @param props ゲームプロパティ
 * @param action アクション
 */
function onWebSocketAPIError(
  props: Readonly<GameProps>,
  action: WebSocketAPIError,
): void {
  const dialog = new NetworkErrorDialog({
    ...props,
    postNetworkError: {
      type: "GotoTitle",
    },
  });
  props.domDialogBinder.bind(dialog, networkErrorDialogConnector(props));
  throw action;
}

/** アクションタイプ */
const actionType = "WebSocketAPIError";

/** WebSocketAPIエラー時のイベントリスナーコンテナ */
export const webSocketAPIErrorContainer = {
  [actionType]: (props: GameProps, action: GameAction) => {
    action.type === actionType && onWebSocketAPIError(props, action);
  },
};
