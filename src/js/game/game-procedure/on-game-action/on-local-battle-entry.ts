import { MatchingDialog } from "../../../dom-dialogs/matching/matching-dialog";
import { PrivateMatchGuestDialog } from "../../../dom-dialogs/private-match-guest";
import { LocalBattleEntry } from "../../game-actions/local-battle-entry";
import { GameProps } from "../../game-props";
import { disconnectConnection } from "../disconnect-connection";
import { startLocalBattle } from "../start-local-battle";
import { switchMatchingDialog } from "../switch-dialog/switch-matching-dialog";
import { switchPrivateMatchGuestDialogWhenLocalBattle } from "../switch-dialog/switch-private-match-guest-dialog-when-local-battle";

/**
 * ゲストがローカル対戦にエントリーする
 * @param options オプション
 * @param options.props ゲームプロパティ
 * @param options.action アクション
 * @returns 処理が完了したら発火するPromise
 */
export const onLocalBattleEntry = async (options: {
  props: GameProps;
  action: LocalBattleEntry;
}) => {
  const { props, action } = options;
  if (
    props.inProgress.type !== "LocalBattleGuest" ||
    props.inProgress.localBattleGuest.type !== "Entry" ||
    props.networkContext.type !== "online"
  ) {
    return;
  }

  switchMatchingDialog(props, new MatchingDialog(props));
  await disconnectConnection(props);

  const { armdozerId, pilotId } = props.inProgress.localBattleGuest;
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
    switchPrivateMatchGuestDialogWhenLocalBattle(props, dialog);
    dialog.flashFailedMessage();
    return;
  }

  props.inProgress = {
    ...props.inProgress,
    localBattleGuest: { type: "Battle" },
  };
  await startLocalBattle(props, battle);
};
