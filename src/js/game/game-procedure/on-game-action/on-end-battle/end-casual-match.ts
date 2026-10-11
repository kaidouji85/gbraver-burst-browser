import { waitTime } from "../../../../event/wait/wait-time";
import { EndBattle } from "../../../game-actions/end-battle";
import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress";
import { CasualMatch } from "../../../in-progress/casual-match";
import { switchPlayerPickerDialog } from "../../switch-dialog/switch-player-picker-dialog";
import { createPlayerPickerDialog } from "./create-player-picker-dialog";
import { PLAYER_PICKER_DISPLAY_DELAY } from "./player-picker-display-delay";

/**
 * カジュアルマッチを終了する
 * @param props ゲームプロパティ
 * @param action 戦闘終了アクション
 * @returns inProgress更新結果
 */
export async function endCasualMatch(
  props: Readonly<GameProps & { inProgress: CasualMatch }>,
  action: Readonly<EndBattle>,
): Promise<InProgress> {
  const { inProgress } = props;
  if (inProgress.casualMatch.type !== "Battle") {
    return inProgress;
  }

  const { battle } = inProgress.casualMatch;
  const rematchRoom = battle.getRematchRoom();
  if (!rematchRoom) {
    return inProgress;
  }

  props.suddenlyBattleEnd.unbind();
  await waitTime(PLAYER_PICKER_DISPLAY_DELAY);
  const dialog = createPlayerPickerDialog(props, action);
  switchPlayerPickerDialog(props, dialog);
  return { ...inProgress, casualMatch: { type: "Rematch", rematchRoom } };
}
