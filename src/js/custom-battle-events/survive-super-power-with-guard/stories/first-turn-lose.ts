import { wbr } from "../../../dom/wbr";
import { highlight } from "../../../game-dom/message-window/dom/highlight";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeRightMessageWindowWithFace } from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollRightMessages } from "../../scroll-messages";
import { chiniOchita } from "./chini-ochita";

/**
 * 1ターン目で負けた
 * @param props イベントプロパティ
 */
export async function firstTurnLose(props: CustomBattleEventProps) {
  await chiniOchita(props);

  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    ["ツバサ", `「完全に${wbr}出鼻を${wbr}挫かれた`],
    [
      highlight(`攻撃と防御が同じ`) +
        `ならガードで${wbr}` +
        highlight(`ダメージ半減`),
    ],
    [`5防御すれば${wbr}即死は${wbr}免れた」`],
  ]);
  props.view.dom.rightMessageWindow.darken();

  invisibleAllMessageWindows(props);
}
