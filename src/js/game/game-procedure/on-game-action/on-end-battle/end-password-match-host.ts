import { EndBattle } from "../../../game-actions/end-battle";
import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress";
import { PasswordMatchHost } from "../../../in-progress/password-match-host";
import { showPlayerPickerDialog } from "./show-player-picker-dialog";

/**
 * あいことば対戦（ホスト）を終了する
 * @param props ゲームプロパティ
 * @param action 戦闘終了アクション
 * @returns inProgress更新結果
 */
export async function endPasswordMatchHost(
  props: Readonly<GameProps & { inProgress: PasswordMatchHost }>,
  action: Readonly<EndBattle>,
): Promise<InProgress> {
  const { inProgress } = props;
  if (inProgress.passwordMatchHost.type !== "Battle") {
    return inProgress;
  }

  const { battle } = inProgress.passwordMatchHost;
  const rematchRoom = battle.getRematchRoom();
  if (!rematchRoom) {
    return inProgress;
  }

  props.suddenlyBattleEnd.unbind();
  props.rematchCancelled.bind(rematchRoom);
  await showPlayerPickerDialog(props, action);
  return { ...inProgress, passwordMatchHost: { type: "Rematch", rematchRoom } };
}
