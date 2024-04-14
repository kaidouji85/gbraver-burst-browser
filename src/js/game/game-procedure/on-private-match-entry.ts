import { MatchingDialog } from "../../dom-dialogs/matching/matching-dialog";
import { RejectPrivateMatchEntryDialog } from "../../dom-dialogs/reject-private-match-entry";
import { matchingDialogConnector } from "../action-connector/matching-dialog-connector";
import { rejectPrivateMatcEntryDialogConnector } from "../action-connector/reject-private-match-entry-dialog-connector";
import { PrivateMatchEntry } from "../game-actions/private-match-entry";
import { GameProps } from "../game-props";
import { startOnlineBattle } from "./start-online-battle";

/**
 * ゲストがプライベートマッチにエントリする
 * @param props ゲームプロパティ
 * @param action アクション
 */
export async function onPrivateMatchEntry(
  props: GameProps,
  action: PrivateMatchEntry,
): Promise<void> {
  if (
    !(
      props.inProgress.type === "PrivateMatchGuest" &&
      props.inProgress.privateMatchGuest.type === "Entry"
    )
  ) {
    return;
  }

  props.domDialogBinder.bind(
    new MatchingDialog(props),
    matchingDialogConnector,
  );
  await props.api.disconnectWebsocket();
  const { armdozerId, pilotId } = props.inProgress.privateMatchGuest;
  const battle = await props.api.enterPrivateMatchRoom(
    action.roomID,
    armdozerId,
    pilotId,
  );
  if (!battle) {
    props.domDialogBinder.bind(
      new RejectPrivateMatchEntryDialog(props.resources),
      rejectPrivateMatcEntryDialogConnector,
    );
    return;
  }

  props.inProgress.privateMatchGuest = { type: "Battle" };
  await startOnlineBattle(props, battle, "PRIVATE MATCH");
}
