import { LoginDialog } from "../../dom-dialogs/login";
import { NetBattleSelectorDialog } from "../../dom-dialogs/net-battle-selector";
import { NetworkErrorDialog } from "../../dom-dialogs/network-error/network-error-dialog";
import { WaitingDialog } from "../../dom-dialogs/waiting/waiting-dialog";
import { loginDialogConnector } from "../action-connector/login-dialog-connector";
import { netBattleSelectorDialogConnector } from "../action-connector/net-battle-selector-dialog-connector";
import { networkErrorDialogConnector } from "../action-connector/network-error-dialog-connector";
import { waitingDialogConnector } from "../action-connector/waiting-dialog-connector";
import { GameProps } from "../game-props";

/**
 * ログインチェックAPIを呼び出す
 * @param props ゲームプロパティ
 * @return API実行結果、trueでログインしている
 */
async function callLoginCheckAPI(props: Readonly<GameProps>): Promise<boolean> {
  try {
    return await props.api.isLogin();
  } catch (e) {
    const dialog = new NetworkErrorDialog(props.resources, {
      type: "Close",
    });
    props.domDialogBinder.bind(dialog, networkErrorDialogConnector);
    throw e;
  }
}

/**
 * ネットバトル開始
 * @param props ゲームプロパティ
 * @return 処理が完了したら発火するPromise
 */
export async function onNetBattleStart(
  props: Readonly<GameProps>,
): Promise<void> {
  props.domDialogBinder.bind(
    new WaitingDialog("ログインチェック中......"),
    waitingDialogConnector,
  );
  const isLogin = await callLoginCheckAPI(props);
  props.domDialogBinder.hidden();
  if (!isLogin) {
    props.domDialogBinder.bind(
      new LoginDialog({
        ...props,
        caption: "ネット対戦をするにはログインをしてください",
      }),
      loginDialogConnector,
    );
    return;
  }

  props.domDialogBinder.bind(
    new NetBattleSelectorDialog(props.resources),
    netBattleSelectorDialogConnector,
  );
}
