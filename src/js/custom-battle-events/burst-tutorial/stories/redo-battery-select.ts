import type { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeRightMessageWindowWithFace } from "../../active-message-window";
import { refreshConversation } from "../../invisible-all-message-windows";
import { scrollRightMessages } from "../../scroll-messages";

/**
 * ストーリー 5防御するためにバッテリー選択キャンセル
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export const redoBatterySelect = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [["シンヤ", "「了解ッス」"]]);
  await refreshConversation(props, 100);
};
