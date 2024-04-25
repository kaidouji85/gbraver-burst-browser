import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeRightMessageWindowWithFace } from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollRightMessages } from "../../scroll-messages";

/**
 * チャプター シンヤ有利 シンヤ独白
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export async function shinyaMonologueWhenShinyaHasAdvantage(
  props: Readonly<CustomBattleEventProps>,
): Promise<void> {
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", "「Gブレイバー相手に リードをとった"],
    ["この勝負 いただきッス」"],
  ]);
  invisibleAllMessageWindows(props);
}
