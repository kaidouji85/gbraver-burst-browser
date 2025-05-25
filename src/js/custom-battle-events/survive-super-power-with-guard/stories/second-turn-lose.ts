import { wbr } from "../../../dom/wbr";
import { highlight } from "../../../game-dom/message-window/dom/highlight";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import {
  activeLeftMessageWindowWithFace,
  activeRightMessageWindowWithFace,
} from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollLeftMessages, scrollRightMessages } from "../../scroll-messages";

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
    ["ツバサ", `「あの攻撃 ……ガードしないと${wbr}即死する${wbr}のか`],
    [
      highlight(`攻撃と${wbr}防御が${wbr}同じ数字なら${wbr}ダメージ半減`),
      `……5防御すれば${wbr}勝機は${wbr}あった」`,
    ],
  ]);
  props.view.dom.rightMessageWindow.darken();

  invisibleAllMessageWindows(props);
}
