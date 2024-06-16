import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import {
  activeLeftMessageWindowWithFace,
  activeRightMessageWindowWithFace,
} from "../../active-message-window";
import { scrollLeftMessages, scrollRightMessages } from "../../scroll-messages";

/**
 * シンヤの勝利
 * @param props イベントプロパティ
 */
export async function shinyaVictory(props: CustomBattleEventProps) {
  activeLeftMessageWindowWithFace(props, "Yuuya");
  await scrollLeftMessages(props, [["ユウヤ", `「ありえない この俺が」`]]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", `やった ユウヤさんに${wbr}勝ったッス`],
  ]);
}
