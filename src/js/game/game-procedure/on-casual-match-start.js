// @flow
import { waitTime } from "../../wait/wait-time";
import { playerSelectConnector } from "../dom-scene-binder/action-connector/player-select-connector";
import { MAX_LOADING_TIME } from "../dom-scene-binder/max-loading-time";
import { PlayerSelect } from "../dom-scene-binder/scene/player-select";
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
    props.domScenes.bind(scene, playerSelectConnector);
    await Promise.race([scene.waitUntilLoaded(), waitTime(MAX_LOADING_TIME)]);
    await props.fader.fadeIn();
  };
  const showLoginDialog = () => {
    props.domDialogs.startLogin(
      props.resources,
      "ネット対戦をするにはログインをしてください"
    );
  };

  props.domDialogs.startWaiting("ログインチェック中......");
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
