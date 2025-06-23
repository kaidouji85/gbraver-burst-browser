import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { chiniOchita } from "./chini-ochita";

/**
 * プレイヤーが負けた
 * @param props イベントプロパティ
 */
export async function playerLose(props: CustomBattleEventProps) {
  await chiniOchita(props);
  invisibleAllMessageWindows(props);
}
