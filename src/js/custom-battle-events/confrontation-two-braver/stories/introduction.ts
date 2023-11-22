import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeLeftMessageWindowWithFace, activeRightMessageWindowWithFace } from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollLeftMessages, scrollRightMessages } from "../../scroll-messages";

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
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Yuuya");
  await scrollLeftMessages(props, [
    ["ユウヤ", "「愛機にブレイバーと名付ける奴が 俺以外にもいるとはな"],
    ["その力 見せてもらおうか シンブレイバー！！」"],
  ]);
  invisibleAllMessageWindows(props);
}
