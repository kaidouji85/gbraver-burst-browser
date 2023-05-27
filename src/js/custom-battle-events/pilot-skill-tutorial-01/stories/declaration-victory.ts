import {CustomBattleEventProps} from "../../../td-scenes/battle/custom-battle-event";
import {activeLeftMessageWindowWithFace, activeRightMessageWindowWithFace} from "../../active-message-window";
import {scrollLeftMessages, scrollRightMessages} from "../../scroll-messages";

/**
 * ツバサ先輩の勝利宣言
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export async function declarationVictory(
  props: Readonly<CustomBattleEventProps>,
): Promise<void> {
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [["シンヤ", "「ツバサ先輩 勝負はこれからッスよ」"]]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [[
    "ツバサ",
    "「悪いなシンヤ",
    "この瞬間に 私の勝ちが確定した」"
  ]]);
  props.view.dom.leftMessageWindow.darken();
}