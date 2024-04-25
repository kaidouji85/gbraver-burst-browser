import { fadeOut, stop } from "../../bgm/bgm-operators";
import { EndNetworkError } from "../game-actions/end-network-error";
import type { GameProps } from "../game-props";
import { playTitleBGM } from "./play-title-bgm";
import { startTitle } from "./start-title";

/**
 * 通信エラーダイアログを閉じる
 * 本関数にはpropsを変更する副作用がある
 *
 * @param props ゲームプロパティ
 * @param action アクション
 * @returns 処理が完了したら発火するPromise
 */
export async function onEndNetworkError(
  props: GameProps,
  action: EndNetworkError,
): Promise<void> {
  const close = async () => {
    props.inProgress = {
      type: "None",
    };
    props.domDialogBinder.hidden();
  };

  const gotoTitle = async () => {
    props.inProgress = {
      type: "None",
    };
    props.domDialogBinder.hidden();
    await Promise.all([
      (async () => {
        await props.fader.fadeOut();
        props.tdBinder.hidden();
        return await startTitle(props);
      })(),
      (async () => {
        await props.bgm.do(fadeOut);
        await props.bgm.do(stop);
      })(),
    ]);
    await props.fader.fadeIn();
    playTitleBGM(props);
  };

  if (action.postNetworkError.type === "Close") {
    await close();
  } else if (action.postNetworkError.type === "GotoTitle") {
    await gotoTitle();
  }
}
