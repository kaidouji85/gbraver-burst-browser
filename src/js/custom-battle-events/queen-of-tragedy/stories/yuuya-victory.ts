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
 * ユウヤの勝利
 * @param props イベントプロパティ
 */
export async function yuuyaVictory(
  props: CustomBattleEventProps & QueenOfTragedyProps,
) {
  activeRightMessageWindowWithFace(props, "Yuuya");
  await scrollRightMessages(props, [
    ["ユウヤ", `「ツバサ お前の${wbr}動きは${wbr}合理的で${wbr}美しい`],
    [`ゆえに${wbr}次の${wbr}行動が${wbr}手に取る${wbr}ように${wbr}分かる」`],
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    [
      "ツバサ",
      `「やはりユウヤに${wbr}勝つには${wbr}意表を${wbr}突く${wbr}しかない」`,
    ],
  ]);
  props.view.dom.leftMessageWindow.darken();

  invisibleAllMessageWindows(props);
}
