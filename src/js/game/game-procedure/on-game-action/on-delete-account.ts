import { WaitingDialog } from "../../../dom-dialogs/waiting/waiting-dialog";
import { DeleteAccount } from "../../game-actions/delete-account";
import { GameProps } from "../../game-props";
import { switchWaitingDialog } from "../switch-dialog/switch-waiting-dialog";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: Readonly<GameProps>;
  /** アクション */
  action: DeleteAccount;
};

/**
 * アカウント削除
 * @param options オプション
 * @returns 処理が完了したら発火するPromise
 */
export async function onDeleteAccount(options: Options): Promise<void> {
  const { props } = options;
  if (props.networkContext.type !== "online") {
    return;
  }

  const dialog = new WaitingDialog("アカウント削除中");
  switchWaitingDialog(props, dialog);
  await props.networkContext.sdk.deleteLoggedInUser();
  await props.fader.fadeOut();
  await props.networkContext.sdk.logout();
}
