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
    [
      "ユウヤ",
      `「ツバサ お前の${wbr}動きは${wbr}合理的で${wbr}まったく${wbr}隙が${wbr}ない`,
    ],
    [`美しい${wbr}とすら${wbr}言える${wbr}レベルだ`],
    [`ゆえに${wbr}次の${wbr}行動が${wbr}簡単に${wbr}予測できる」`],
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", `「……こちらの${wbr}行動が${wbr}完全に${wbr}読まれている`],
    [`やはり${wbr}ユウヤに${wbr}勝つには`],
    [`パイロットの${wbr}組み合わせで${wbr}意表を${wbr}突く${wbr}しかない」`],
  ]);
  props.view.dom.leftMessageWindow.darken();

  invisibleAllMessageWindows(props);
}
