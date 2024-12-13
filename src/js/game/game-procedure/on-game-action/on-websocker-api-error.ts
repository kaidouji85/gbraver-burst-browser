import { NetworkErrorDialog } from "../../../dom-dialogs/network-error/network-error-dialog";
import { WebSocketAPIError } from "../../game-actions/web-socket-api-error";
import { GameProps } from "../../game-props";
import { switchNetworkErrorDialog } from "../switch-dialog/switch-network-error-dialog";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: Readonly<GameProps>;
  /** アクション */
  action: WebSocketAPIError;
};

/**
 * WebSocketAPIエラー時の処理
 *
 * @param options オプション
 */
export function onWebSocketAPIError(options: Options): void {
  const { props, action } = options;
  const dialog = new NetworkErrorDialog({
    ...props,
    postNetworkError: { type: "GotoTitle" },
  });
  switchNetworkErrorDialog(props, dialog);
  throw action;
}
