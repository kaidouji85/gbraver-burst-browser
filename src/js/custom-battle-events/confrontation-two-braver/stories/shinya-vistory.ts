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
  await scrollLeftMessages(props, [
    ["ユウヤ", `「負けイベントに${wbr}勝つだと`],
  ]);
  await scrollLeftMessages(props, [
    [`お前 このゲームを${wbr}相当やり込んで${wbr}いるな`],
  ]);
  await scrollLeftMessages(props, [
    [`作者に${wbr}代わって${wbr}礼を${wbr}言うぜ」`],
  ]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [["ツバサ", `「……ユウヤ`]]);
  await scrollRightMessages(props, [
    [`負けた${wbr}ショックで 訳の${wbr}分からない${wbr}ことを」`],
  ]);
}
