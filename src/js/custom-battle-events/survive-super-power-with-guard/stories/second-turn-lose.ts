import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import {
  activeLeftMessageWindowWithFace,
  activeRightMessageWindowWithFace,
} from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollLeftMessages, scrollRightMessages } from "../../scroll-messages";
import { highlight } from "../../../game-dom/message-window/dom/highlight";

/**
 * 2ターン目で負けた
 * @param props イベントプロパティ
 */
export async function secondTurnLose(props: CustomBattleEventProps) {
  activeLeftMessageWindowWithFace(props, "Raito");
  await scrollLeftMessages(props, [
    ["ライト", `「どや わいらの${wbr}勝ちや」`],
  ]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    ["ツバサ", `「あの攻撃 ……ガードしないと${wbr}即死するのか`],
    [
      highlight(`攻撃と防御が同じ${wbr}数字ならダメージ半減`),
      ` ……5防御すれば${wbr}勝機はあった」`,
    ],
  ]);
  props.view.dom.rightMessageWindow.darken();

  invisibleAllMessageWindows(props);
}
