import { PrivateMatchGuestDialog } from "../../../dom-dialogs/private-match-guest";
import { privateMatchGuestDialogConnector } from "../../action-connector/private-match-guest-dialog-connector";
import { SelectionComplete } from "../../game-actions/selection-complete";
import type { GameProps } from "../../game-props";
import {startDifficultySelectionIfNeeded} from "./start-difficulty-selection-if-needed";
import {startCasualMatchIfNeeded} from "./start-casual-match-start-if-needed";
import { startPrivateMatchHostIfNeeded } from "./start-private-match-host-if-needed";

/**
 * プレイヤーキャラクター 選択完了時の処理
 * 本関数にはpropsを変更する副作用がある
 *
 * @param props ゲームプロパティ
 * @param action アクション
 * @return 処理が完了したら発火するPromise
 */
export async function onSelectionComplete(
  props: GameProps,
  action: Readonly<SelectionComplete>
): Promise<void> {
  const isDifficultySelectionStarted
    = await startDifficultySelectionIfNeeded(props, action);
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

  if (props.inProgress.type === "PrivateMatchGuest") {
    props.inProgress.privateMatchGuest = {
      type: "Entry",
      armdozerId: action.armdozerId,
      pilotId: action.pilotId,
    };
    props.domDialogBinder.bind(
      new PrivateMatchGuestDialog(props.resources),
      privateMatchGuestDialogConnector
    );
  }
}
