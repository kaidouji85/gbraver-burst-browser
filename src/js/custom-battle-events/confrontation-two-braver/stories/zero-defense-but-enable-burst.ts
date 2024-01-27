import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeLeftMessageWindowWithFace } from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollLeftMessages } from "../../scroll-messages";

/**
 * バッテリーが使えるのに0防御した場合のストーリー
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export async function zeroDefenseButEnableBurst(
  props: Readonly<CustomBattleEventProps>,
): Promise<void> {
  activeLeftMessageWindowWithFace(props, "Yuuya");
  await scrollLeftMessages(props, [
    ["ユウヤ", "「0防御だと"],
    ["何故バーストを使わない 俺をバカにしているのか シンヤ」"],
  ]);
  invisibleAllMessageWindows(props);
}
