import { ArmdozerIds, PilotIds } from "gbraver-burst-core";

import { PlayerPickerDialog } from "../../../dialogs/player-picker";
import { GameProps } from "../../../game-props";
import { InProgress } from "../../../in-progress";
import { PrivateMatchHost } from "../../../in-progress/private-match-host";
import { getPlayableArmdozers } from "../../../playable-amdozers";
import { getPlayablePilots } from "../../../playable-pilots";
import { switchPlayerPickerDialog } from "../../switch-dialog/switch-player-picker-dialog";

/**
 * プライベートマッチ（ホスト）を終了する
 * 本関数はすべてのネットワークコンテキストに対応している
 * @param props ゲームプロパティ
 * @returns inProgress更新結果
 */
export async function endPrivateMatchHost(
  props: Readonly<GameProps & { inProgress: PrivateMatchHost }>,
): Promise<InProgress> {
  const { inProgress } = props;
  props.suddenlyBattleEnd.unbind();
  const dialog = new PlayerPickerDialog({
    ...props,
    initialArmdozerId: ArmdozerIds.SHIN_BRAVER, // TODO プレイヤーが選択したものをセットする
    initialPilotId: PilotIds.SHINYA, // TODO プレイヤーが選択したものをセットする
    armdozerIds: getPlayableArmdozers(props),
    pilotIds: getPlayablePilots(props),
    confirmLabel: "再戦",
    closeLabel: "タイトルへ",
  });
  switchPlayerPickerDialog(props, dialog);
  return { ...inProgress, privateMatchHost: { type: "Rematch" } };
}
