import { LocalBattleGuestDialog } from "../../../dom-dialogs/local-battle-guest";
import { MatchingDialog } from "../../../dom-dialogs/matching/matching-dialog";
import { LocalBattleEntry } from "../../game-actions/local-battle-entry";
import { GameProps } from "../../game-props";
import { disconnectConnection } from "../disconnect-connection";
import { startLocalBattle } from "../start-local-battle";
import { switchLocalBattleGuestDialog } from "../switch-dialog/switch-local-battle-guest-dialog";
import { switchMatchingDialog } from "../switch-dialog/switch-matching-dialog";

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
  const battle = await props.networkContext.localGuestSDK.joinRoom({
    roomID,
    armdozerId,
    pilotId,
  });
  if (!battle) {
    const dialog = new LocalBattleGuestDialog({
      ...props,
      initialRoomId: roomID,
    });
    switchLocalBattleGuestDialog(props, dialog);
    dialog.flushFailedMessage();
    return;
  }

  props.inProgress = {
    ...props.inProgress,
    localBattleGuest: { type: "Battle" },
  };
  await startLocalBattle(props, battle);
};
