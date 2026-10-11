import { waitTime } from "../../../../event/wait/wait-time";
import { EndBattle } from "../../../game-actions/end-battle";
import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress";
import { PrivateMatchGuest } from "../../../in-progress/private-match-guest";
import { switchPlayerPickerDialog } from "../../switch-dialog/switch-player-picker-dialog";
import { createPlayerPickerDialog } from "./create-player-picker-dialog";
import { PLAYER_PICKER_DISPLAY_DELAY } from "./player-picker-display-delay";

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
  await waitTime(PLAYER_PICKER_DISPLAY_DELAY);
  const dialog = createPlayerPickerDialog(props, action);
  switchPlayerPickerDialog(props, dialog);
  return { ...inProgress, privateMatchGuest: { type: "Rematch", rematchRoom } };
}
