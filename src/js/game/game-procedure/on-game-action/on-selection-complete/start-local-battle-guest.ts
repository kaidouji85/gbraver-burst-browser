import { LocalBattleGuestDialog } from "../../../../dom-dialogs/local-battle-guest";
import { SelectionComplete } from "../../../game-actions/selection-complete";
import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress";
import { LocalBattleGuest } from "../../../in-progress/local-battle-guest";
import { switchLocalBattleGuestDialog } from "../../switch-dialog/switch-local-battle-guest-dialog";

/**
 * ローカル対戦（ゲスト）を開始する
 * @param props ゲームプロパティ
 * @param action アクション
 * @returns InProgress更新結果
 */
export const startLocalBattleGuest = async (
  props: Readonly<GameProps & { inProgress: LocalBattleGuest }>,
  action: Readonly<SelectionComplete>,
): Promise<InProgress> => {
  const { inProgress } = props;
  const { armdozerId, pilotId } = action;
  switchLocalBattleGuestDialog(props, new LocalBattleGuestDialog(props));
  return {
    ...inProgress,
    localBattleGuest: { type: "Entry", armdozerId, pilotId },
  };
};
