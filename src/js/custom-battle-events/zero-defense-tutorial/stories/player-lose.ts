import { wbr } from "../../../dom/wbr";
import type { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import {
  activeLeftMessageWindowWithFace,
  activeRightMessageWindowWithFace,
} from "../../active-message-window";
import { refreshConversation } from "../../invisible-all-message-windows";
import { scrollLeftMessages, scrollRightMessages } from "../../scroll-messages";

/**
 * ストーリー プレイヤー敗北
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export const playerLose = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    ["ツバサ", "「そこまで!!"],
    [`勝者${wbr} ガイ」`],
  ]);
  await refreshConversation(props);
  activeLeftMessageWindowWithFace(props, "Gai");
  await scrollLeftMessages(props, [
    ["ガイ", `「強豪校と${wbr}いっても${wbr} 所詮は${wbr}この程度か」`],
  ]);
  props.view.dom.leftMessageWindow.darken();
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", `「……手も足も${wbr}出なかったッス」`],
  ]);
  props.view.dom.rightMessageWindow.darken();
};
