import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeRightMessageWindowWithFace } from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollRightMessages } from "../../scroll-messages";

/**
 * チャプター ユウヤ有利 シンヤ独白
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export async function shinyaMonologueWhenYuuyaHasAdvantage(
  props: Readonly<CustomBattleEventProps>,
): Promise<void> {
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", "「さすがGブレイバー"],
    ["一筋縄ではいなかいッスね」"],
  ]);
  invisibleAllMessageWindows(props);
}
