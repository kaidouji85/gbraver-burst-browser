import { MatchingDialog } from "../../../dom-dialogs/matching/matching-dialog";
import { PrivateMatchGuestDialog } from "../../../dom-dialogs/private-match-guest";
import { PrivateMatchEntry } from "../../game-actions/private-match-entry";
import { GameProps } from "../../game-props";
import { disconnectConnection } from "../disconnect-connection";
import { startOnlineBattle } from "../start-online-battle";
import { switchMatchingDialog } from "../switch-dialog/switch-matching-dialog";
import { switchPrivateMatchGuestDialog } from "../switch-dialog/switch-private-match-guest-dialog";

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
    props.inProgress.privateMatchGuest.type !== "Entry" ||
    props.networkContext.type !== "online"
  ) {
    return;
  }

  switchMatchingDialog(props, new MatchingDialog(props));
  await disconnectConnection(props);
  const { armdozerId, pilotId } = props.inProgress.privateMatchGuest;
  const battle = await props.networkContext.sdk.enterPrivateMatchRoom(
    action.roomID,
    armdozerId,
    pilotId,
  );
  if (!battle) {
    const dialog = new PrivateMatchGuestDialog({
      ...props,
      initialRoomID: action.roomID,
    });
    switchPrivateMatchGuestDialog(props, dialog);
    dialog.flashFailedMessage();
    return;
  }

  props.inProgress = {
    ...props.inProgress,
    privateMatchGuest: { type: "Battle" },
  };
  await startOnlineBattle(props, battle, "PRIVATE MATCH");
}
