import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import {
  activeLeftMessageWindowWithFace,
  activeRightMessageWindowWithFace,
} from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollLeftMessages, scrollRightMessages } from "../../scroll-messages";

/**
 * ユウヤの勝利
 * @param props イベントプロパティ
 */
export async function yuuyaVictory(props: CustomBattleEventProps) {
  activeLeftMessageWindowWithFace(props, "Gai");
  await scrollLeftMessages(props, [
    ["ガイ", `「何故だ`],
    [`うちじゃ${wbr}Gブレイバーに${wbr}勝てない${wbr}のか」`],
  ]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, "Yuuya");
  await scrollRightMessages(props, [
    ["ユウヤ", `「一つだけ${wbr}教えてやろう`],
    [`ロボの${wbr}スペックは${wbr}もちろん${wbr}大切だが`],
    [
      `最終的には${wbr}パイロットの${wbr}読み合いが${wbr}勝敗を${wbr}分けるん${wbr}だぜ」`,
    ],
  ]);

  invisibleAllMessageWindows(props);
}
