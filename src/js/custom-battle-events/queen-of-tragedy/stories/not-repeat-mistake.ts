import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeLeftMessageWindowWithFace } from "../../active-message-window";
import { scrollLeftMessages } from "../../scroll-messages";
import { QueenOfTragedyProps } from "../props";

/**
 * 同じ轍は踏まない
 * @param props イベントプロパティ
 */
export async function notRepeatMistake(
  props: CustomBattleEventProps & QueenOfTragedyProps,
) {
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", `「去年は${wbr}これで${wbr}負けたんだ`],
    [`同じ轍は${wbr}踏まないぞ ユウヤ」`],
  ]);
  props.view.dom.leftMessageWindow.darken();
}
