// @flow
import type {GameProps} from "../game-props";
import {reflectSoundVolume} from "../reflect-sound-volume";
import {fullResourceLoading} from "./full-resource-loading";

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
      props.domDialogs.startNetworkError(props.resources, {type: 'Close'});
      throw e;
    }
  };
  const gotoPlayerSelect = async (): Promise<void> => {
    props.inProgress = {type: 'CasualMatch', subFlow: {type: 'PlayerSelect'}};
    props.domDialogs.hidden();
    await props.fader.fadeOut();
    await props.domScenes.startPlayerSelect(props.resources);
    await props.fader.fadeIn();
  };
  const showLoginDialog = () => {
    props.domDialogs.startLogin(props.resources, 'ネット対戦をするにはログインをしてください');
  };

  props.domDialogs.startWaiting('ログインチェック中......');
  const isLogin = await callLoginCheckAPI();
  props.domDialogs.hidden();
  if (!isLogin) {
    showLoginDialog();
    return;
  }

  if (!props.isFullResourceLoaded) {
    await fullResourceLoading(props);
    const config = await props.config.load();
    reflectSoundVolume(props.resources, config);
  }

  await gotoPlayerSelect();
}