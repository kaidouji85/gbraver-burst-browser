import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeLeftMessageWindowWithFace } from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollLeftMessages } from "../../scroll-messages";

/**
 * バッテリーが残っているのに0防御した場合のストーリー
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export async function zeroDefenseButPositiveBattery(
  props: Readonly<CustomBattleEventProps>,
): Promise<void> {
  activeLeftMessageWindowWithFace(props, "Yuuya");
  await scrollLeftMessages(props, [
    ["ユウヤ", `「バッテリーが${wbr}残っているのに${wbr}0防御${wbr}しただと`],
    [`俺を${wbr}愚弄${wbr}する気か${wbr} シンヤ」`],
  ]);
  invisibleAllMessageWindows(props);
}
