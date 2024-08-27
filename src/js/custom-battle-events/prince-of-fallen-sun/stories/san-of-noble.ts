import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import {
  activeLeftMessageWindowWithFace,
  activeRightMessageWindowWithFace,
} from "../../active-message-window";
import { scrollLeftMessages, scrollRightMessages } from "../../scroll-messages";

/**
 * 御曹司
 * @param props イベントプロパティ
 */
export async function sunOfNoble(props: CustomBattleEventProps) {
  activeRightMessageWindowWithFace(props, "Yuuya");
  await scrollRightMessages(props, [
    ["ユウヤ", `「思い出したぞ`],
    [`お前は${wbr}業界2位 浅草重工の${wbr}御曹司様${wbr}だな」`],
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, "Gai");
  await scrollLeftMessages(props, [
    ["ガイ", `「うちが${wbr}業界2位だと ふざけるな！！`],
    [`Gブレイバー お前を${wbr}倒して${wbr}再び${wbr}トップに${wbr}返り咲く」`],
  ]);
  props.view.dom.leftMessageWindow.darken();
}
