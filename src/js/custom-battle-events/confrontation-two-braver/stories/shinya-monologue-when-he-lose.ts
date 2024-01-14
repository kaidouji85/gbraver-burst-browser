import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeRightMessageWindowWithFace } from "../../active-message-window";
import { scrollRightMessages } from "../../scroll-messages";

/**
 * シンヤ敗北時のシンヤ独白
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export async function shinyaMonologueWhenHeLose(
  props: Readonly<CustomBattleEventProps>,
): Promise<void> {
  props.view.dom.leftMessageWindow.darken();
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", "「……完敗ッス"],
    ["俺は今までユウヤさんに憧れて　ユウヤさんの真似してきたけど"],
    ["こんなんじゃダメッス」"],
  ]);
}
