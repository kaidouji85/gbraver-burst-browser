import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeRightMessageWindowWithFace } from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollRightMessages } from "../../scroll-messages";

/**
 * シンヤが有利
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export async function shinyaHasAdvantage(
  props: Readonly<CustomBattleEventProps>,
): Promise<void> {
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", "「チャンピオン相手に リードをとった"],
    ["この勝負 いただきッス」"],
  ]);
  invisibleAllMessageWindows(props);
}
