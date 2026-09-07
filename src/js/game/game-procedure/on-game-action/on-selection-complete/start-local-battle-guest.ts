import { PrivateMatchGuestDialog } from "../../../../dom-dialogs/private-match-guest";
import { SelectionComplete } from "../../../game-actions/selection-complete";
import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress";
import { PasswordMatchGuest } from "../../../in-progress/password-match-guest";
import { switchPrivateMatchGuestDialogWhenLocalBattle } from "../../switch-dialog/switch-private-match-guest-dialog-when-local-battle";

/**
 * ローカル対戦（ゲスト）を開始する
 * @param props ゲームプロパティ
 * @param action アクション
 * @returns InProgress更新結果
 */
export const startLocalBattleGuest = async (
  props: Readonly<GameProps & { inProgress: PasswordMatchGuest }>,
  action: Readonly<SelectionComplete>,
): Promise<InProgress> => {
  const { inProgress } = props;
  const { armdozerId, pilotId } = action;
  const dialog = new PrivateMatchGuestDialog(props);
  switchPrivateMatchGuestDialogWhenLocalBattle(props, dialog);
  return {
    ...inProgress,
    passwordMatchGuest: { type: "Entry", armdozerId, pilotId },
  };
};
