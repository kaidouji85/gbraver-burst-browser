import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeLeftMessageWindowWithFace } from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollLeftMessages } from "../../scroll-messages";

/**
 * バッテリーが残っているのに0防御した
 * @param props イベントプロパティ
 */
export async function zeroDefenseButPositiveBattery(
  props: CustomBattleEventProps,
) {
  activeLeftMessageWindowWithFace(props, "Raito");
  await scrollLeftMessages(props, [
    ["ライト", `「どないした まだバッテリーが${wbr}残っとるや${wbr}ないか`],
    [`わいの${wbr}強さに${wbr}恐れを${wbr}なしたか ツバサ」`],
  ]);
  props.view.dom.leftMessageWindow.darken();

  invisibleAllMessageWindows(props);
}
