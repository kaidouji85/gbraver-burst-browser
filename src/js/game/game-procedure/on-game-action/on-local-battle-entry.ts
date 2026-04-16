import { MatchingDialog } from "../../../dom-dialogs/matching/matching-dialog";
import { RejectPrivateMatchEntryDialog } from "../../../dom-dialogs/reject-private-match-entry";
import { LocalBattleEntry } from "../../game-actions/local-battle-entry";
import { GameProps } from "../../game-props";
import { disconnectConnection } from "../disconnect-connection";
import { startLocalBattle } from "../start-local-battle";
import { switchMatchingDialog } from "../switch-dialog/switch-matching-dialog";
import { switchRejectPrivateMatchEntryDialog } from "../switch-dialog/switch-reject-private-match-entry-dialog";

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
    // TODO 専用ダイアログを作る
    //const dialog = new RejectPrivateMatchEntryDialog(props);
    //switchRejectPrivateMatchEntryDialog(props, dialog);
    return;
  }

  props.inProgress = {
    ...props.inProgress,
    localBattleGuest: { type: "Battle" },
  };
  await startLocalBattle(props, battle);
};
