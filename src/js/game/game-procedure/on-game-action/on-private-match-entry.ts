import { MatchingDialog } from "../../../dom-dialogs/matching/matching-dialog";
import { RejectPrivateMatchEntryDialog } from "../../../dom-dialogs/reject-private-match-entry";
import { PrivateMatchEntry } from "../../game-actions/private-match-entry";
import { GameProps } from "../../game-props";
import { startOnlineBattle } from "../start-online-battle";
import { switchMatchingDialog } from "../switch-dialog/switch-matching-dialog";
import { switchRejectPrivateMatchEntryDialog } from "../switch-dialog/switch-reject-private-match-entry-dialog";

/** オプション */
type Options = {
  /** ゲームプロパティ */
  props: GameProps;
  /** アクション */
  action: PrivateMatchEntry;
};

/**
 * ゲストがプライベートマッチにエントリする
 * @param options オプション
 */
export async function onPrivateMatchEntry(options: Options): Promise<void> {
  const { props, action } = options;
  if (
    props.inProgress.type !== "PrivateMatchGuest" ||
    props.inProgress.privateMatchGuest.type !== "Entry"
  ) {
    return;
  }

  switchMatchingDialog(props, new MatchingDialog(props));
  await props.api.disconnectWebsocket();
  const { armdozerId, pilotId } = props.inProgress.privateMatchGuest;
  const battle = await props.api.enterPrivateMatchRoom(
    action.roomID,
    armdozerId,
    pilotId,
  );
  if (!battle) {
    const dialog = new RejectPrivateMatchEntryDialog(props);
    switchRejectPrivateMatchEntryDialog(props, dialog);
    return;
  }

  props.inProgress = {
    ...props.inProgress,
    privateMatchGuest: { type: "Battle" },
  };
  await startOnlineBattle(props, battle, "PRIVATE MATCH");
}
