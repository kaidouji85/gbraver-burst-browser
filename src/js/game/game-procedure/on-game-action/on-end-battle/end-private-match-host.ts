import { EndBattle } from "../../../game-actions/end-battle";
import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress";
import { PrivateMatchHost } from "../../../in-progress/private-match-host";
import { showPlayerPickerDialog } from "./show-player-picker-dialog";

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
  await showPlayerPickerDialog(props, action);
  return { ...inProgress, privateMatchHost: { type: "Rematch", rematchRoom } };
}
