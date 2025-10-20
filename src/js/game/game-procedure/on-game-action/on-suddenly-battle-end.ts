import { NetworkErrorDialog } from "../../../dom-dialogs/network-error/network-error-dialog";
import { SuddenlyBattleEnd } from "../../game-actions/suddenly-battle-end";
import { GameProps } from "../../game-props";
import { disconnectConnection } from "../helpers/disconnect-connection";
import { switchNetworkErrorDialog } from "../switch-dialog/switch-network-error-dialog";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: Readonly<GameProps>;
  /** アクション */
  action: SuddenlyBattleEnd;
};

/**
 * バトル強制終了時の処理
 * @param options オプション
 * @returns 処理が終了すると発火するPromise
 */
export async function onSuddenlyBattleEnd(options: Options): Promise<void> {
  const { props } = options;
  const dialog = new NetworkErrorDialog({
    ...props,
    postNetworkError: { type: "GotoTitle" },
  });
  switchNetworkErrorDialog(props, dialog);
  props.suddenlyBattleEnd.unbind();
  await disconnectConnection(props);
}
