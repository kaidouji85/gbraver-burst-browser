import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeRightMessageWindowWithFace } from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollRightMessages } from "../../scroll-messages";

/**
 * 3未満攻撃だと警告
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export async function lessThanAttack3(
  props: Readonly<CustomBattleEventProps>,
): Promise<void> {
  activeRightMessageWindowWithFace(props, "Gai");
  await scrollRightMessages(props, [
    [
      "ガイ",
      `「おっと${wbr} このターンは${wbr}3攻撃${wbr}以上${wbr}するん${wbr}だったな」`,
    ],
  ]);
  invisibleAllMessageWindows(props);
}
