import { EndBattle } from "../../../game-actions/end-battle";
import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress";
import { PrivateMatchGuest } from "../../../in-progress/private-match-guest";
import { showPlayerPickerDialog } from "./show-player-picker-dialog";

/**
 * プライベートマッチ（ゲスト）を終了する
 * @param props ゲームプロパティ
 * @param action 戦闘終了アクション
 * @returns inProgress更新結果
 */
export async function endPrivateMatchGuest(
  props: Readonly<GameProps & { inProgress: PrivateMatchGuest }>,
  action: Readonly<EndBattle>,
): Promise<InProgress> {
  const { inProgress } = props;
  if (inProgress.privateMatchGuest.type !== "Battle") {
    return inProgress;
  }

  const { battle } = inProgress.privateMatchGuest;
  const rematchRoom = battle.getRematchRoom();
  if (!rematchRoom) {
    return inProgress;
  }

  props.suddenlyBattleEnd.unbind();
  props.rematchCancelled.bind(rematchRoom);
  await showPlayerPickerDialog(props, action);
  return { ...inProgress, privateMatchGuest: { type: "Rematch", rematchRoom } };
}
