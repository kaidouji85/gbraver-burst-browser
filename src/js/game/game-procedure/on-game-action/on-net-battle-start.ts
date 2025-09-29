import { LoginDialog } from "../../../dom-dialogs/login";
import { NetBattleSelectorDialog } from "../../../dom-dialogs/net-battle-selector";
import { NetworkErrorDialog } from "../../../dom-dialogs/network-error/network-error-dialog";
import { WaitingDialog } from "../../../dom-dialogs/waiting/waiting-dialog";
import { NetBattleStart } from "../../game-actions/net-battle-start";
import { GameProps } from "../../game-props";
import { Online } from "../../network-context/online";
import { switchLoginDialog } from "../switch-dialog/switch-login-dialog";
import { switchNetBattleSelectorDialog } from "../switch-dialog/switch-net-battle-selector-dialog";
import { switchNetworkErrorDialog } from "../switch-dialog/switch-network-error-dialog";
import { switchWaitingDialog } from "../switch-dialog/switch-waiting-dialog";

/**
 * ログインチェックAPIを呼び出す
 * @param props ゲームプロパティ
 * @returns API実行結果、trueでログインしている
 */
async function callLoginCheckAPI(
  props: Readonly<GameProps & { networkContext: Online }>,
): Promise<boolean> {
  try {
    return await props.networkContext.sdk.isLogin();
  } catch (e) {
    const dialog = new NetworkErrorDialog({
      ...props,
      postNetworkError: { type: "Close" },
    });
    switchNetworkErrorDialog(props, dialog);
    throw e;
  }
}

/** onNetBattleStartオプション */
type OnNetBattleStartOptions = {
  /** ゲームプロパティ */
  props: Readonly<GameProps>;
  /** アクション */
  action: NetBattleStart;
};

/**
 * ネットバトル開始
 * @param options オプション
 * @returns 処理が完了したら発火するPromise
 */
export async function onNetBattleStart(
  options: OnNetBattleStartOptions,
): Promise<void> {
  const { props } = options;
  const { networkContext } = props;
  if (networkContext.type !== "online") {
    return;
  }

  switchWaitingDialog(props, new WaitingDialog("ログインチェック中......"));
  const isLogin = await callLoginCheckAPI({ ...props, networkContext });
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
