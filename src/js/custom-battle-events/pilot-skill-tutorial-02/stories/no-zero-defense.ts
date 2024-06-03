import { wbr } from "../../../dom/wbr";
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
    [
      "ガイ",
      `「0防御は${wbr}即死${wbr} 何度も${wbr}同じ${wbr}轍を${wbr}踏む${wbr}ものか」`,
    ],
  ]);
  invisibleAllMessageWindows(props);
}
