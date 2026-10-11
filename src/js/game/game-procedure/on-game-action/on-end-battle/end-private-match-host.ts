import { waitTime } from "../../../../event/wait/wait-time";
import { EndBattle } from "../../../game-actions/end-battle";
import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress";
import { PrivateMatchHost } from "../../../in-progress/private-match-host";
import { switchPlayerPickerDialog } from "../../switch-dialog/switch-player-picker-dialog";
import { createPlayerPickerDialog } from "./create-player-picker-dialog";
import { PLAYER_PICKER_DISPLAY_DELAY } from "./player-picker-display-delay";

/**
 * プライベートマッチ（ホスト）を終了する
 * @param props ゲームプロパティ
 * @param action 戦闘終了アクション
 * @returns inProgress更新結果
 */
export async function endPrivateMatchHost(
  props: Readonly<GameProps & { inProgress: PrivateMatchHost }>,
  action: Readonly<EndBattle>,
): Promise<InProgress> {
  const { inProgress } = props;
  if (inProgress.privateMatchHost.type !== "Battle") {
    return inProgress;
  }

  const { battle } = inProgress.privateMatchHost;
  const rematchRoom = battle.getRematchRoom();
  if (!rematchRoom) {
    return inProgress;
  }

  props.suddenlyBattleEnd.unbind();
  await waitTime(PLAYER_PICKER_DISPLAY_DELAY);
  const dialog = createPlayerPickerDialog(props, action);
  switchPlayerPickerDialog(props, dialog);
  return { ...inProgress, privateMatchHost: { type: "Rematch", rematchRoom } };
}
