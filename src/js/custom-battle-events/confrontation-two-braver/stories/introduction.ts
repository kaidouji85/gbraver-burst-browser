import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeRightMessageWindowWithFace } from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollRightMessages } from "../../scroll-messages";

/**
 * 導入
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export async function introduction(
  props: CustomBattleEventProps,
): Promise<void> {
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", "「全国大会の覇者 ユウヤさん"],
    ["俺はこの人に憧れて 機動倶楽部に入ったんだ」"],
  ]);
  invisibleAllMessageWindows(props);
}
