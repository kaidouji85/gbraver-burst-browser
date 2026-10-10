import { EndBattle } from "../../../game-actions/end-battle";
import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress";
import { PrivateMatchHost } from "../../../in-progress/private-match-host";
import { switchPlayerPickerDialog } from "../../switch-dialog/switch-player-picker-dialog";
import { createPlayerPickerDialog } from "./create-player-picker-dialog";

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
  props.suddenlyBattleEnd.unbind();
  const dialog = createPlayerPickerDialog(props, action);
  switchPlayerPickerDialog(props, dialog);
  return { ...inProgress, privateMatchHost: { type: "Rematch" } };
}
