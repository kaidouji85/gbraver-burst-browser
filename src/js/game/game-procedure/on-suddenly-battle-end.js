// @flow
import { networkErrorDialogConnector } from "../dom-dialogs/action-connector/network-error-dialog-connector";
import { NetworkErrorDialog } from "../dom-dialogs/network-error/network-error-dialog";
import type { GameProps } from "../game-props";

/**
 * バトル強制終了時の処理
 *
 * @param props ゲームプロパティ
 * @return 処理が終了すると発火するPromise
 */
export async function onSuddenlyEndBattle(
  props: $ReadOnly<GameProps>
): Promise<void> {
  const dialog = new NetworkErrorDialog(props.resources, { type: "GotoTitle" });
  props.domDialogs.bind(dialog, networkErrorDialogConnector);
  props.suddenlyBattleEnd.unbind();
  await props.api.disconnectWebsocket();
}
