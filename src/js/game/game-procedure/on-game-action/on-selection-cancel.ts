import { GameAction } from "../../game-actions";
import { GameProps } from "../../game-props";
import { startTitle } from "../start-title";

/**
 * プレイヤー選択がキャンセルされた時のイベント
 * 本関数はpropsを変更する副作用がある
 * @param props ゲームプロパティ
 * @returns 処理が完了すると発火するPromise
 */
async function onSelectionCancel(props: GameProps): Promise<void> {
  props.inProgress = {
    type: "None",
  };
  await props.fader.fadeOut();
  await startTitle(props);
  await props.fader.fadeIn();
}

/** アクションタイプ */
const actionType = "SelectionCancel";

/** プレイヤー選択がキャンセルされた時のイベントリスナーコンテナ */
export const selectionCancelContainer = {
  [actionType]: (props: GameProps, action: GameAction) => {
    if (action.type === actionType) {
      onSelectionCancel(props);
    }
  },
};
