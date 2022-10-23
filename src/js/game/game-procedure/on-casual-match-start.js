// @flow
import { PlayerSelect } from "../../dom-scenes/player-select";
import { waitTime } from "../../wait/wait-time";
import { loginDialogConnector } from "../dom-dialogs/action-connector/login-dialog-connector";
import { waitingDialogConnector } from "../dom-dialogs/action-connector/waiting-dialog-connector";
import { LoginDialog } from "../dom-dialogs/login/login-dialog";
import { WaitingDialog } from "../dom-dialogs/waiting/waiting-dialog";
import { playerSelectConnector } from "../dom-scene-binder/action-connector/player-select-connector";
import { MAX_LOADING_TIME } from "../dom-scene-binder/max-loading-time";
import type { GameProps } from "../game-props";
import { fullResourceLoading } from "./full-resource-loading";

/**
 * カジュアルマッチ開始
 * 本関数にはpropsを変更する副作用がある
 *
 * @param props ゲームプロパティ
 * @return 処理が完了したら発火するPromise
 */
export async function onCasualMatchStart(props: GameProps): Promise<void> {
  const callLoginCheckAPI = async () => {
    try {
      return await props.api.isLogin();
    } catch (e) {
      props.domDialogs.startNetworkError(props.resources, { type: "Close" });
      throw e;
    }
  };
  const gotoPlayerSelect = async (): Promise<void> => {
    props.inProgress = {
      type: "CasualMatch",
      subFlow: { type: "PlayerSelect" },
    };
    props.domDialogs.hidden();
    await props.fader.fadeOut();
    const scene = new PlayerSelect(props.resources);
    props.domSceneBinder.bind(scene, playerSelectConnector);
    await Promise.race([scene.waitUntilLoaded(), waitTime(MAX_LOADING_TIME)]);
    await props.fader.fadeIn();
  };
  const showLoginDialog = () => {
    const dialog = new LoginDialog(
      props.resources,
      "ネット対戦をするにはログインをしてください"
    );
    props.domDialogs.bind(dialog, loginDialogConnector);
  };

  const dialog = new WaitingDialog("ログインチェック中......");
  props.domDialogs.bind(dialog, waitingDialogConnector);
  const isLogin = await callLoginCheckAPI();
  props.domDialogs.hidden();
  if (!isLogin) {
    showLoginDialog();
    return;
  }

  if (!props.isFullResourceLoaded) {
    await fullResourceLoading(props);
  }

  await gotoPlayerSelect();
}
