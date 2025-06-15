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
 * 1ターン目で負けた
 * @param props イベントプロパティ
 */
export async function fistTurnLose(props: CustomBattleEventProps) {
  activeLeftMessageWindowWithFace(props, "Raito");
  await scrollLeftMessages(props, [
    ["ライト", `「なんや もう${wbr}終わり${wbr}かいな`],
    [`全国２位も${wbr}地に落ちた${wbr}もんやな`],
  ]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    ["ツバサ", `「完全に${wbr}出鼻を${wbr}挫かれた`],
    [
      highlight(`攻撃と防御が同じ`) +
        `なら ガードで` +
        highlight(`ダメージ半減`),
    ],
    [`5防御すれば${wbr}即死は${wbr}免れた」`],
  ]);
  props.view.dom.rightMessageWindow.darken();

  invisibleAllMessageWindows(props);
}
