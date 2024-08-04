import { fadeOut, stop } from "../../../bgm/bgm-operators";
import { GameAction } from "../../game-actions";
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

/**
 * 通信エラーダイアログを閉じる
 * 本関数にはpropsを変更する副作用がある
 * @param props ゲームプロパティ
 * @param action アクション
 * @returns 処理が完了したら発火するPromise
 */
async function onEndNetworkError(props: GameProps, action: EndNetworkError) {
  props.inProgress = { type: "None" };
  if (action.postNetworkError.type === "Close") {
    await close(props);
  } else if (action.postNetworkError.type === "GotoTitle") {
    await gotoTitle(props);
  }
}

/** アクションタイプ */
const actionType = "EndNetworkError";

/** 通信エラー終了時のイベントリスナーコンテナ */
export const endNetworkErrorContainer = {
  [actionType]: (props: GameProps, action: GameAction) => {
    if (action.type === actionType) {
      onEndNetworkError(props, action);
    }
  },
};
