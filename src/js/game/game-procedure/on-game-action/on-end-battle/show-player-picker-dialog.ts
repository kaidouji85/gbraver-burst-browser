import { PlayerPickerDialog } from "../../../dialogs/player-picker";
import { EndBattle } from "../../../game-actions/end-battle";
import { GameProps } from "../../../game-props";
import { getPlayableArmdozers } from "../../../playable-amdozers";
import { getPlayablePilots } from "../../../playable-pilots";
import { switchPlayerPickerDialog } from "../../switch-dialog/switch-player-picker-dialog";

/**
 * プレイヤーピッカーダイアログを生成するヘルパー関数
 * @param props ゲームプロパティ
 * @param action 戦闘終了アクション
 * @returns プレイヤーピッカーダイアログ
 */
const createPlayerPickerDialog = (
  props: Readonly<GameProps>,
  action: Readonly<EndBattle>,
) =>
  new PlayerPickerDialog({
    ...props,
    initialArmdozerId: action.player.armdozerId,
    initialPilotId: action.player.pilotId,
    armdozerIds: getPlayableArmdozers(props),
    pilotIds: getPlayablePilots(props),
    confirmLabel: "🌟再戦(β)",
    closeLabel: "タイトルへ",
  });

/**
 * プレイヤーピッカーダイアログを表示するヘルパー関数
 * @param props ゲームプロパティ
 * @param action 戦闘終了アクション
 * @returns ダイアログ表示が完了したら発火するPromise
 */
export const showPlayerPickerDialog = async (
  props: Readonly<GameProps>,
  action: Readonly<EndBattle>,
) => {
  const dialog = createPlayerPickerDialog(props, action);
  switchPlayerPickerDialog(props, dialog);
  await dialog.show();
};
