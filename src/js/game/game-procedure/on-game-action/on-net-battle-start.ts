import { LoginDialog } from "../../../dom-dialogs/login";
import { NetBattleSelectorDialog } from "../../../dom-dialogs/net-battle-selector";
import { NetworkErrorDialog } from "../../../dom-dialogs/network-error/network-error-dialog";
import { WaitingDialog } from "../../../dom-dialogs/waiting/waiting-dialog";
import { switchWaitingDialog } from "../switch-dialog/switch-waiting-dialog";
import { GameAction } from "../../game-actions";
import { GameProps } from "../../game-props";
import { switchLoginDialog } from "../switch-dialog/switch-login-dialog";
import { switchNetBattleSelectorDialog } from "../switch-dialog/switch-net-battle-selector-dialog";
import { switchNetworkErrorDialog } from "../switch-dialog/switch-network-error-dialog";

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
      postNetworkError: { type: "Close" },
    });
    switchNetworkErrorDialog(props, dialog);
    throw e;
  }
}

/**
 * ネットバトル開始
 * @param props ゲームプロパティ
 * @returns 処理が完了したら発火するPromise
 */
async function onNetBattleStart(props: Readonly<GameProps>): Promise<void> {
  switchWaitingDialog(props, new WaitingDialog("ログインチェック中......"));
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
