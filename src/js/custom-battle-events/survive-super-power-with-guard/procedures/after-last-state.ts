import { LastStateEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { invisibleShoutMessageWindowWhenGameEnd } from "../../invisible-shout-message-window";

/**
 * 最終ステート完了後イベント
 * @param props イベントプロパティ
 */
export async function afterLastState(props: LastStateEventProps) {
  invisibleShoutMessageWindowWhenGameEnd(props);
}
