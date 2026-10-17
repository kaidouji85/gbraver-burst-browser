import { NetworkErrorDialog } from "../../dialogs/network-error";
import { GameProps } from "../../game-props";
import { disconnectConnection } from "../disconnect-connection";
import { switchNetworkErrorDialog } from "../switch-dialog/switch-network-error-dialog";

/**
 * 再戦がキャンセルされたときの処理
 * @param options オプション
 * @param options.props ゲームプロパティ
 */
export const onRematchCancelled = (options: { props: Readonly<GameProps> }) => {
  const { props } = options;
  props.rematchCancelled.unbind();
  disconnectConnection(props);

  const dialog = new NetworkErrorDialog({
    ...props,
    message: "相手が再戦をキャンセルしました",
    postNetworkError: { type: "GotoTitle" },
  });
  switchNetworkErrorDialog(props, dialog);
};
