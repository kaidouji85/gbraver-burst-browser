import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeLeftMessageWindowWithFace } from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollLeftMessages } from "../../scroll-messages";

/**
 * ユウヤの勝利
 * @param props イベントプロパティ
 */
export async function yuuyaVictory(props: CustomBattleEventProps) {
  activeLeftMessageWindowWithFace(props, "Gai");
  await scrollLeftMessages(props, [
    ["ガイ", `「何故だ`],
    [
      `ネオランドーザだって Gブレイバーには${wbr}引けを${wbr}取らない${wbr}はずなのに」`,
    ],
  ]);
  props.view.dom.leftMessageWindow.darken();

  invisibleAllMessageWindows(props);
}
