import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeLeftMessageWindowWithFace } from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollLeftMessages } from "../../scroll-messages";

/**
 * バッテリーが残っているのに0防御した場合のストーリー
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export async function zeroDefenseButPositiveBattery(
  props: Readonly<CustomBattleEventProps>,
): Promise<void> {
  activeLeftMessageWindowWithFace(props, "Yuuya");
  await scrollLeftMessages(props, [
    ["ユウヤ", "「バッテリーが残っているのに0防御しただと"],
    ["俺を愚弄する気か シンヤ」"],
  ]);
  invisibleAllMessageWindows(props);
}
