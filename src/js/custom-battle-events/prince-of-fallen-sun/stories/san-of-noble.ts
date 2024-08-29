import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import {
  activeLeftMessageWindowWithFace,
  activeRightMessageWindowWithFace,
} from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollLeftMessages, scrollRightMessages } from "../../scroll-messages";

/**
 * 御曹司
 * @param props イベントプロパティ
 */
export async function sunOfNoble(props: CustomBattleEventProps) {
  activeRightMessageWindowWithFace(props, "Yuuya");
  await scrollRightMessages(props, [
    ["ユウヤ", `「思い出したぞ`],
    [`その顔は 浅草重工の${wbr}御曹司${wbr}だな」`],
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, "Gai");
  await scrollLeftMessages(props, [
    ["ガイ", `「お坊ちゃん${wbr}扱いは${wbr}やめろ」`],
  ]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, "Yuuya");
  await scrollRightMessages(props, [
    [
      "ユウヤ",
      `「浅草重工は${wbr}世界で${wbr}初めて${wbr}巨大ロボを${wbr}製造した${wbr}企業`,
    ],
    [
      `まさか${wbr}創業家の${wbr}人間と${wbr}手合わせ${wbr}できる${wbr}とはな」`,
    ],
  ]);
  props.view.dom.rightMessageWindow.darken();

  invisibleAllMessageWindows(props);
}
