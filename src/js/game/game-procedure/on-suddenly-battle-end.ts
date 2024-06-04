import { NetworkErrorDialog } from "../../dom-dialogs/network-error/network-error-dialog";
import { networkErrorDialogConnector } from "../action-connector/network-error-dialog-connector";
import type { GameProps } from "../game-props";

/**
 * バトル強制終了時の処理
 *
 * @param props ゲームプロパティ
 * @returns 処理が終了すると発火するPromise
 */
export async function onSuddenlyEndBattle(
  props: Readonly<GameProps>,
): Promise<void> {
  const dialog = new NetworkErrorDialog({
    ...props,
    postNetworkError: {
      type: "GotoTitle",
    },
  });
  props.domDialogBinder.bind(dialog, networkErrorDialogConnector(props));
  props.suddenlyBattleEnd.unbind();
  await props.api.disconnectWebsocket();
}
