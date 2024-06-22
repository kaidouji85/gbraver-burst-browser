import { LoginDialog } from "../../../dom-dialogs/login";
import { NetBattleSelectorDialog } from "../../../dom-dialogs/net-battle-selector";
import { NetworkErrorDialog } from "../../../dom-dialogs/network-error/network-error-dialog";
import { WaitingDialog } from "../../../dom-dialogs/waiting/waiting-dialog";
import { networkErrorDialogConnector } from "../../action-connector/network-error-dialog-connector";
import { waitingDialogConnector } from "../../action-connector/waiting-dialog-connector";
import { GameAction } from "../../game-actions";
import { GameProps } from "../../game-props";
import { switchLoginDialog } from "../switch-dialog/switch-login-dialog";
import { switchNetBattleSelectorDialog } from "../switch-dialog/switch-net-battle-selector-dialog";

/**
 * ログインチェックAPIを呼び出す
 * @param props ゲームプロパティ
 * @returns API実行結果、trueでログインしている
 */
async function callLoginCheckAPI(props: Readonly<GameProps>): Promise<boolean> {
  try {
    return await props.api.isLogin();
  } catch (e) {
    const dialog = new NetworkErrorDialog({
      ...props,
      postNetworkError: {
        type: "Close",
      },
    });
    props.domDialogBinder.bind(dialog, networkErrorDialogConnector(props));
    throw e;
  }
}

/**
 * ネットバトル開始
 * @param props ゲームプロパティ
 * @returns 処理が完了したら発火するPromise
 */
async function onNetBattleStart(props: Readonly<GameProps>): Promise<void> {
  props.domDialogBinder.bind(
    new WaitingDialog("ログインチェック中......"),
    waitingDialogConnector,
  );
  const isLogin = await callLoginCheckAPI(props);
  props.domDialogBinder.hidden();
  if (!isLogin) {
    switchLoginDialog(
      props,
      new LoginDialog({
        ...props,
        caption: "ネット対戦をするにはログインをしてください",
      }),
    );
    return;
  }

  switchNetBattleSelectorDialog(props, new NetBattleSelectorDialog(props));
}

/** アクションタイプ */
const actionType = "NetBattleStart";

/** ネットバトル開始時のイベントリスナーコンテナ */
export const netBattleStartContainer = {
  [actionType]: (props: GameProps, action: GameAction) => {
    action.type === actionType && onNetBattleStart(props);
  },
};
