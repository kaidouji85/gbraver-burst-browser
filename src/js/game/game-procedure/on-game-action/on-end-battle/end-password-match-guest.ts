import { EndBattle } from "../../../game-actions/end-battle";
import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress";
import { PasswordMatchGuest } from "../../../in-progress/password-match-guest";
import { showPlayerPickerDialog } from "./show-player-picker-dialog";

/**
 * あいことば対戦（ゲスト）を終了する
 * @param props ゲームプロパティ
 * @param action 戦闘終了アクション
 * @returns inProgress更新結果
 */
export async function endPasswordMatchGuest(
  props: Readonly<GameProps & { inProgress: PasswordMatchGuest }>,
  action: Readonly<EndBattle>,
): Promise<InProgress> {
  const { inProgress } = props;
  if (inProgress.passwordMatchGuest.type !== "Battle") {
    return inProgress;
  }

  const { battle } = inProgress.passwordMatchGuest;
  const rematchRoom = battle.getRematchRoom();
  if (!rematchRoom) {
    return inProgress;
  }

  props.suddenlyBattleEnd.unbind();
  props.rematchCancelled.bind(rematchRoom);
  await showPlayerPickerDialog(props, action);
  return {
    ...inProgress,
    passwordMatchGuest: { type: "Rematch", rematchRoom },
  };
}
