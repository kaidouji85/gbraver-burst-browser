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
 * 3ターン目開始
 * @param props イベントプロパティ
 */
export async function startOfTurn3(
  props: CustomBattleEventProps & QueenOfTragedyProps,
) {
  activeRightMessageWindowWithFace(props, "Raito");
  await scrollRightMessages(props, [
    ["ライト", `「去年の決勝戦`],
    [`ツバサは${wbr}2ターン目で${wbr}負けたんや」`],
  ]);
  props.view.dom.rightMessageWindow.darken();

  activeLeftMessageWindowWithFace(props, "Gai");
  await scrollLeftMessages(props, [
    ["ガイ", `「……！！`],
    [`あの${wbr}ツバサ先輩が${wbr}2ターンで！！」`],
  ]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, "Raito");
  await scrollRightMessages(props, [
    ["ライト", `「ガイ ここから先が${wbr}本番や`],
    [`その光景 しかと${wbr}目に${wbr}焼きつけ${wbr}るんや」`],
  ]);
  props.view.dom.rightMessageWindow.darken();

  invisibleAllMessageWindows(props);
}
