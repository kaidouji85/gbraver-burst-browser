import { PlayerPickerDialog } from "../../../dialogs/player-picker";
import { EndBattle } from "../../../game-actions/end-battle";
import { GameProps } from "../../../game-props";
import { getPlayableArmdozers } from "../../../playable-amdozers";
import { getPlayablePilots } from "../../../playable-pilots";

/**
 * プレイヤーピッカーダイアログを生成するヘルパー関数
 * @param props ゲームプロパティ
 * @param action 戦闘終了アクション
 * @returns プレイヤーピッカーダイアログ
 */
export const createPlayerPickerDialog = (
  props: Readonly<GameProps>,
  action: Readonly<EndBattle>,
) =>
  new PlayerPickerDialog({
    ...props,
    initialArmdozerId: action.player.armdozerId,
    initialPilotId: action.player.pilotId,
    armdozerIds: getPlayableArmdozers(props),
    pilotIds: getPlayablePilots(props),
    confirmLabel: "🌟再戦",
    closeLabel: "タイトルへ",
  });
