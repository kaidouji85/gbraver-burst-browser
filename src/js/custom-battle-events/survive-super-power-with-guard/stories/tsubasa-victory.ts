import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeLeftMessageWindowWithFace } from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollRightMessages } from "../../scroll-messages";

/**
 * ツバサの勝利
 * @param props イベントプロパティ
 */
export async function tsubasaVictory(props: CustomBattleEventProps) {
  activeLeftMessageWindowWithFace(props, "Gai");
  await scrollRightMessages(props, [
    [
      "ガイ",
      `「ライト先輩と${wbr}新型でも 大田高校に${wbr}勝てない${wbr}なんて`,
    ],
    [`かくなる上は${wbr}アレを${wbr}出すしか${wbr}ない`],
  ]);
  props.view.dom.leftMessageWindow.darken();

  invisibleAllMessageWindows(props);
}
