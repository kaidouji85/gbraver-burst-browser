import { wbr } from "../../../dom/wbr";
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
    ["ツバサ", `「あの攻撃を${wbr}ガード出来て${wbr}いれば${wbr}勝機はあった`],
    [`攻撃と${wbr}防御で${wbr}同じ数字${wbr}だった場合は${wbr}ダメージ半減`],
    [`5防御して${wbr}いれば即死は免れた${wbr}はずだ」`],
  ]);
  props.view.dom.rightMessageWindow.darken();

  invisibleAllMessageWindows(props);
}
