import { GameAction } from "../../game-actions";
import { GameProps } from "../../game-props";
import { startTitle } from "../start-title";

/**
 * チュートリアル選択キャンセル
 *
 * @returns 処理が完了したら発火するPromise
 */
async function onCancelTutorialSelect(
  props: Readonly<GameProps>,
): Promise<void> {
  await props.fader.fadeOut();
  await startTitle(props);
  await props.fader.fadeIn();
}

/** アクションタイプ */
const actionType = "CancelTutorialSelect";

/** チュートリアル選択キャンセル時のイベントリスナーコンテナ */
export const cancelTutorialSelectContainer = {
  [actionType]: (props: GameProps, action: GameAction) => {
    action.type === actionType && onCancelTutorialSelect(props);
  },
};
