import { GameAction } from "../../../game-actions";
import { SelectionComplete } from "../../../game-actions/selection-complete";
import { GameProps } from "../../../game-props";
import { startCasualMatchIfNeeded } from "./start-casual-match-start-if-needed";
import { startDifficultySelectionIfNeeded } from "./start-difficulty-selection-if-needed";
import { startPrivateMatchGuestIfNeeded } from "./start-private-match-guest-if-needed";
import { startPrivateMatchHostIfNeeded } from "./start-private-match-host-if-needed";

/**
 * プレイヤーキャラクター 選択完了時の処理
 * 本関数にはpropsを変更する副作用がある
 * @param props ゲームプロパティ
 * @param action アクション
 * @returns 処理が完了したら発火するPromise
 */
async function onSelectionComplete(
  props: GameProps,
  action: Readonly<SelectionComplete>,
): Promise<void> {
  const isDifficultySelectionStarted = await startDifficultySelectionIfNeeded(
    props,
    action,
  );
  if (isDifficultySelectionStarted) {
    return;
  }

  const casualMatch = await startCasualMatchIfNeeded(props, action);
  if (casualMatch.isStarted) {
    props.inProgress = casualMatch.inProgress;
    return;
  }

  const privateMatchHost = await startPrivateMatchHostIfNeeded(props, action);
  if (privateMatchHost.isStarted) {
    props.inProgress = privateMatchHost.inProgress;
    return;
  }

  const privateMatchGuest = await startPrivateMatchGuestIfNeeded(props, action);
  if (privateMatchGuest.isStarted) {
    props.inProgress = privateMatchGuest.inProgress;
    return;
  }
}

/** アクションタイプ */
const actionType = "SelectionComplete";

/** プレイヤーキャラクター選択完了のリスナーコンテナ */
export const selectionCompleteContainer = {
  [actionType]: (props: GameProps, action: GameAction) => {
    if (action.type === actionType) {
      onSelectionComplete(props, action);
    }
  },
};
