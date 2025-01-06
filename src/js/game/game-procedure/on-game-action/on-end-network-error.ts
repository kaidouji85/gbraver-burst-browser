import { fadeOut, stop } from "../../../bgm/bgm-operators";
import { EndNetworkError } from "../../game-actions/end-network-error";
import { GameProps } from "../../game-props";
import { playTitleBGM } from "../play-title-bgm";
import { startTitle } from "../start-title";

/**
 * ダイアログを閉じる
 * @param props ゲームプロパティ
 */
const close = async (props: GameProps) => {
  props.domDialogBinder.hidden();
};

/**
 * タイトル画面に遷移する
 * @param props ゲームプロパティ
 */
const gotoTitle = async (props: GameProps) => {
  props.domDialogBinder.hidden();
  await Promise.all([
    (async () => {
      await props.fader.fadeOut();
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

/** onEndNetworkErrorオプション */
type OnEndBNetworkErrorOptions = {
  /** ゲームプロパティ */
  props: GameProps;
  /** アクション */
  action: EndNetworkError;
};

/**
 * 通信エラーダイアログを閉じる
 * 本関数にはpropsを変更する副作用がある
 * @param options オプション
 * @returns 処理が完了したら発火するPromise
 */
export async function onEndNetworkError(options: OnEndBNetworkErrorOptions) {
  const { props, action } = options;
  props.inProgress = { type: "None" };
  if (action.postNetworkError.type === "Close") {
    await close(props);
  } else if (action.postNetworkError.type === "GotoTitle") {
    await gotoTitle(props);
  }
}
