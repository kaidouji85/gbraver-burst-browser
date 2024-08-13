import { LastState } from "../../../../td-scenes/battle/custom-battle-event";
import { invisibleShoutMessageWindowWhenGameEnd } from "../../../invisible-shout-message-window";
import { PrinceOfFallenSunProps } from "../../props";

/**
 * 最終ステート完了後イベント
 * @param props イベントプロパティ
 */
export async function afterLastState(
  props: LastState & PrinceOfFallenSunProps,
) {
  invisibleShoutMessageWindowWhenGameEnd(props);
}
