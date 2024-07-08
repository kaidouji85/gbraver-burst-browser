import { NetworkErrorDialog } from "../../../dom-dialogs/network-error/network-error-dialog";
import { GameAction } from "../../game-actions";
import { WebSocketAPIError } from "../../game-actions/web-socket-api-error";
import { GameProps } from "../../game-props";
import { switchNetworkErrorDialog } from "../switch-dialog/switch-network-error-dialog";

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
    postNetworkError: { type: "GotoTitle" },
  });
  switchNetworkErrorDialog(props, dialog);
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
