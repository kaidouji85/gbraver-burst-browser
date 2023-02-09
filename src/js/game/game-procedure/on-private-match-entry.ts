import { RejectPrivateMatchEntryDialog } from "../../dom-dialogs/reject-private-match-entry";
import { rejectPrivateMatcEntryDialogConnector } from "../action-connector/reject-private-match-entry-dialog-connector";
import { PrivateMatchEntry } from "../game-actions";
import { GameProps } from "../game-props";

/**
 * ゲストがプライベートマッチにエントリする
 * @param props ゲームプロパティ 
 * @param action アクション 
 */
export async function onPrivateMatchEntry(
  props: Readonly<GameProps>,
  action: PrivateMatchEntry
): Promise<void> {
  if (!(props.inProgress.type === "PrivateMatchGuest" && props.inProgress.subFlow.type === "Entry")) {
    return;
  }

  const { armdozerId, pilotId } = props.inProgress.subFlow;
  const battle = await props.api.enterPrivateMatchRoom(action.roomID, armdozerId, pilotId);
  if (!battle) {
    props.domDialogBinder.bind(
      new RejectPrivateMatchEntryDialog(props.resources),
      rejectPrivateMatcEntryDialogConnector
    );
    return;
  }
}
