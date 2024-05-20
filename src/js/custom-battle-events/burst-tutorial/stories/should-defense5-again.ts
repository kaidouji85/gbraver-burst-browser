import { wbr } from "../../../dom/wbr";
import type { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeRightMessageWindowWithFace } from "../../active-message-window";
import { refreshConversation } from "../../invisible-all-message-windows";
import { scrollRightMessages } from "../../scroll-messages";

/**
 * ストーリー 5防御しないと負け（2回目以降）
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export const shouldDefense5Again = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    ["ツバサ", `「シンヤ${wbr} 今は${wbr}5防御${wbr}しないと${wbr}まずい」`],
  ]);
  await refreshConversation(props, 100);
};
