// @flow
import { LoginDialog } from "../../dom-dialogs/login/login-dialog";
import { NetworkErrorDialog } from "../../dom-dialogs/network-error/network-error-dialog";
import { WaitingDialog } from "../../dom-dialogs/waiting/waiting-dialog";
import { PlayerSelect } from "../../dom-scenes/player-select";
import { waitTime } from "../../wait/wait-time";
import { loginDialogConnector } from "../action-connector/login-dialog-connector";
import { networkErrorDialogConnector } from "../action-connector/network-error-dialog-connector";
import { playerSelectConnector } from "../action-connector/player-select-connector";
import { waitingDialogConnector } from "../action-connector/waiting-dialog-connector";
import { MAX_LOADING_TIME } from "../dom-scene-binder/max-loading-time";
import type { GameProps } from "../game-props";
import { loadFullResource } from "./load-full-resource";

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
      const dialog = new NetworkErrorDialog(props.resources, { type: "Close" });
      props.domDialogBinder.bind(dialog, networkErrorDialogConnector);
      throw e;
    }
  };
  const gotoPlayerSelect = async (): Promise<void> => {
    props.inProgress = {
      type: "CasualMatch",
      subFlow: { type: "PlayerSelect" },
    };
    props.domDialogBinder.hidden();
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
    props.domDialogBinder.bind(dialog, loginDialogConnector);
  };

  const dialog = new WaitingDialog("ログインチェック中......");
  props.domDialogBinder.bind(dialog, waitingDialogConnector);
  const isLogin = await callLoginCheckAPI();
  props.domDialogBinder.hidden();
  if (!isLogin) {
    showLoginDialog();
    return;
  }

  if (!props.isFullResourceLoaded) {
    await loadFullResource(props);
  }

  await gotoPlayerSelect();
}
