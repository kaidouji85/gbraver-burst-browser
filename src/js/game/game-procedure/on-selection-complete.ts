import { PrivateMatchGuestDialog } from "../../dom-dialogs/private-match-guest";
import { privateMatchGuestDialogConnector } from "../action-connector/private-match-guest-dialog-connector";
import { SelectionComplete } from "../game-actions/selection-complete";
import type { GameProps } from "../game-props";
import { startOnlineBattle } from "./start-online-battle";
import { waitUntilCasualMatching } from "./wait-until-casual-matching";
import { waitUntilPrivateMatchingAsHost } from "./wait-until-private-matching-as-host";
import {executeDifficultySelectionIfNeeded} from "./execute-difficulty-selection-if-needed";

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
  const isDifficultySelectionExecuted
    = await executeDifficultySelectionIfNeeded(props, action);
  if (isDifficultySelectionExecuted) {
    return;
  }

  if (props.inProgress.type === "CasualMatch") {
    props.inProgress.casualMatch = { type: "Waiting" };
    await props.api.disconnectWebsocket();
    const battle = await waitUntilCasualMatching(props, action);
    props.inProgress.casualMatch = { type: "Battle" };
    await startOnlineBattle(props, battle, "CASUAL MATCH");
  } else if (props.inProgress.type === "PrivateMatchHost") {
    props.inProgress.privateMatchHost = { type: "Waiting" };
    await props.api.disconnectWebsocket();
    const battle = await waitUntilPrivateMatchingAsHost(props, action);
    props.inProgress.privateMatchHost = { type: "Battle" };
    await startOnlineBattle(props, battle, "PRIVATE MATCH");
  } else if (props.inProgress.type === "PrivateMatchGuest") {
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
