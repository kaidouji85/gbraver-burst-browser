import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeLeftMessageWindowWithFace } from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollLeftMessages } from "../../scroll-messages";

/**
 * プレイヤーが負けた
 * @param props イベントプロパティ
 */
export async function playerLose(props: CustomBattleEventProps) {
  activeLeftMessageWindowWithFace(props, "Raito");
  await scrollLeftMessages(props, [
    ["ライト", `「東日本ブロック${wbr}での借りは${wbr}返したで ツバサ`],
    [`これが わいの${wbr}実力なんや」`],
  ]);
  props.view.dom.leftMessageWindow.darken();

  invisibleAllMessageWindows(props);
}
