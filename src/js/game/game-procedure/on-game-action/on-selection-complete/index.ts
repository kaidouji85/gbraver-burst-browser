import { SelectionComplete } from "../../../game-actions/selection-complete";
import { GameProps } from "../../../game-props";
import { startCasualMatchIfNeeded } from "./start-casual-match-start-if-needed";
import { startDifficultySelectionIfNeeded } from "./start-difficulty-selection-if-needed";
import { startPrivateMatchGuestIfNeeded } from "./start-private-match-guest-if-needed";
import { startPrivateMatchHostIfNeeded } from "./start-private-match-host-if-needed";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: GameProps;
  /** アクション */
  action: Readonly<SelectionComplete>;
};

/**
 * プレイヤーキャラクター 選択完了時の処理
 * 本関数にはpropsを変更する副作用がある
 * @param options オプション
 * @returns 処理が完了したら発火するPromise
 */
export async function onSelectionComplete(options: Options): Promise<void> {
  const { props, action } = options;
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
