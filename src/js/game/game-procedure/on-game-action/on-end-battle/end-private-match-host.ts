import { ArmdozerIds, PilotIds } from "gbraver-burst-core";

import { PlayerPickerDialog } from "../../../dialogs/player-picker";
import { EndBattle } from "../../../game-actions/end-battle";
import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress";
import { PrivateMatchHost } from "../../../in-progress/private-match-host";
import { getPlayableArmdozers } from "../../../playable-amdozers";
import { getPlayablePilots } from "../../../playable-pilots";
import { switchPlayerPickerDialog } from "../../switch-dialog/switch-player-picker-dialog";

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
  const dialog = new PlayerPickerDialog({
    ...props,
    initialArmdozerId: action.player.armdozerId,
    initialPilotId: action.player.pilotId,
    armdozerIds: getPlayableArmdozers(props),
    pilotIds: getPlayablePilots(props),
    confirmLabel: "再戦",
    closeLabel: "タイトルへ",
  });
  switchPlayerPickerDialog(props, dialog);
  return { ...inProgress, privateMatchHost: { type: "Rematch" } };
}
