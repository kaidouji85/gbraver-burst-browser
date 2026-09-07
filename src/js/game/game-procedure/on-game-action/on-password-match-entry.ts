import { MatchingDialog } from "../../../dom-dialogs/matching/matching-dialog";
import { PrivateMatchGuestDialog } from "../../../dom-dialogs/private-match-guest";
import { PasswordMatchEntry } from "../../game-actions/password-match-entry";
import { GameProps } from "../../game-props";
import { disconnectConnection } from "../disconnect-connection";
import { startPasswordMatch } from "../start-password-match";
import { switchMatchingDialog } from "../switch-dialog/switch-matching-dialog";
import { switchPrivateMatchGuestDialogWhenPasswordMatch } from "../switch-dialog/switch-private-match-guest-dialog-when-local-battle";

/**
 * ゲストがあいことば対戦にエントリーする
 * @param options オプション
 * @param options.props ゲームプロパティ
 * @param options.action アクション
 * @returns 処理が完了したら発火するPromise
 */
export const onPasswordMatchEntry = async (options: {
  props: GameProps;
  action: PasswordMatchEntry;
}) => {
  const { props, action } = options;
  if (
    props.inProgress.type !== "PasswordMatchGuest" ||
    props.inProgress.passwordMatchGuest.type !== "Entry" ||
    props.networkContext.type !== "online"
  ) {
    return;
  }

  switchMatchingDialog(props, new MatchingDialog(props));
  await disconnectConnection(props);

  const { armdozerId, pilotId } = props.inProgress.passwordMatchGuest;
  const { roomID } = action;
  const battle = await props.networkContext.guestAnonymousSDK.joinRoom({
    roomID,
    armdozerId,
    pilotId,
  });
  if (!battle) {
    const dialog = new PrivateMatchGuestDialog({
      ...props,
      initialRoomID: roomID,
    });
    switchPrivateMatchGuestDialogWhenPasswordMatch(props, dialog);
    dialog.flashFailedMessage();
    return;
  }

  props.inProgress = {
    ...props.inProgress,
    passwordMatchGuest: { type: "Battle" },
  };
  await startPasswordMatch(props, battle);
};
