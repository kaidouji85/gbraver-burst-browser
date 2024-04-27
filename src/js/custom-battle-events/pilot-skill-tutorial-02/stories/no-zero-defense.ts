import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeRightMessageWindowWithFace } from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollRightMessages } from "../../scroll-messages";

/**
 * 0防御しない
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export async function noZeroDefense(
  props: Readonly<CustomBattleEventProps>,
): Promise<void> {
  activeRightMessageWindowWithFace(props, "Gai");
  await scrollRightMessages(props, [
    ["ガイ", "「0防御は即死 何度も同じ轍を踏むものか」"],
  ]);
  invisibleAllMessageWindows(props);
}
