// @flow
import type {EndNetworkError} from "../game-actions";
import {startTitle} from "./start-title";
import {fadeOut, stop} from "../../bgm/bgm-operators";
import type {GameProps} from "../game-props";

/**
 * 通信エラーダイアログを閉じる
 * 本関数にはpropsを変更する副作用がある
 *
 * @param props ゲームプロパティ
 * @param action アクション
 * @return 処理が完了したら発火するPromise
 */
export async function onEndNetworkError(props: GameProps, action: EndNetworkError): Promise<void> {
  const close = async () => {
    props.inProgress = {type: 'None'};
    props.domDialogs.hidden();
  };
  const gotoTitle = async () => {
    props.inProgress = {type: 'None'};
    props.domDialogs.hidden();
    const [title] = await Promise.all([(async () => {
      await props.fader.fadeOut();
      return await startTitle(props);
    })(), (async () => {
      await props.bgm.do(fadeOut);
      await props.bgm.do(stop);
    })()]);
    await props.fader.fadeIn();
    title.playBGM();
  };

  if (action.postNetworkError.type === 'Close') {
    await close();
  } else if (action.postNetworkError.type === 'GotoTitle') {
    await gotoTitle();
  }
}