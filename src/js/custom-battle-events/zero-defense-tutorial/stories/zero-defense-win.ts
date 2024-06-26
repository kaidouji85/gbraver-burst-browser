import { wbr } from "../../../dom/wbr";
import type { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import {
  activeLeftMessageWindowWithFace,
  activeRightMessageWindowWithFace,
} from "../../active-message-window";
import { refreshConversation } from "../../invisible-all-message-windows";
import { scrollLeftMessages, scrollRightMessages } from "../../scroll-messages";

/**
 * ストーリー 0防御勝利
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export const zeroDefenseWin = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    ["ツバサ", "「そこまで!!"],
    ["勝者 シンヤ」"],
  ]);
  await refreshConversation(props);
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", `「やった${wbr} デビュー戦で${wbr}勝てた${wbr}ッス」`],
  ]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Gai");
  await scrollLeftMessages(props, [
    ["ガイ", `「バカな${wbr} この俺が${wbr}負ける${wbr}なんて」`],
  ]);
  props.view.dom.leftMessageWindow.darken();
};
