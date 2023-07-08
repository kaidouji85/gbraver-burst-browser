import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeRightMessageWindowWithFace } from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollRightMessages } from "../../scroll-messages";

/**
 * 3未満攻撃だと警告
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export async function lessThanAttack3(
  props: Readonly<CustomBattleEventProps>,
): Promise<void> {
  activeRightMessageWindowWithFace(props, "Gai");
  await scrollRightMessages(props, [
    ["ガイ", "「おっと このターンは3攻撃以上するんだったな」"],
  ]);
  invisibleAllMessageWindows(props);
}
