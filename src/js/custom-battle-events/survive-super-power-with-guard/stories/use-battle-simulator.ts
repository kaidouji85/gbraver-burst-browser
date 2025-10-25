import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeRightMessageWindowWithFace } from "../../active-message-window";
import { focusBattleSimulatorButton } from "../../focus";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollRightMessages } from "../../scroll-messages";

/**
 * バトルシミュレーターを使おう
 * @param props イベントプロパティ
 */
export async function useBattleSimulator(props: CustomBattleEventProps) {
  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    ["ツバサ", `「……嫌な予感がする`],
    [`念のために${wbr}バトルシミュレーターを${wbr}起動しよう」`],
  ]);
  props.view.dom.rightMessageWindow.darken();
  invisibleAllMessageWindows(props);
  await focusBattleSimulatorButton(props);
  props.view.dom.nearPlayerBattleSimulatorButtonMessageWindow.messages([
    `"?"ボタンを押そう`,
  ]);
}
