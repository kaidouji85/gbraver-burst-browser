import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import {
  activeLeftMessageWindowWithFace,
  activeRightMessageWindowWithFace,
} from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollLeftMessages, scrollRightMessages } from "../../scroll-messages";
import { QueenOfTragedyProps } from "../props";

/**
 * ツバサの勝利
 * @param props イベントプロパティ
 */
export async function tsubasaVictory(
  props: CustomBattleEventProps & QueenOfTragedyProps,
) {
  activeRightMessageWindowWithFace(props, "Yuuya");
  await scrollRightMessages(props, [["ユウヤ", `「ありえない この俺が」`]]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", `「ユウヤ 去年の${wbr}雪辱は${wbr}果たしたぞ」`],
  ]);
  props.view.dom.leftMessageWindow.darken();

  invisibleAllMessageWindows(props);
}
