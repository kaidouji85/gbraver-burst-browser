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
  props: CustomBattleEventProps,
) {
  activeLeftMessageWindowWithFace(props, "Gai");
  await scrollLeftMessages(props, [
    ["ガイ", `「バッテリーが${wbr}残っているのに なぜ${wbr}0防御した`],
    [`本気で${wbr}戦え Gブレイバー」`],
  ]);
  invisibleAllMessageWindows(props);
}
