import {CustomBattleEventProps} from "../../../td-scenes/battle/custom-battle-event";
import {activeLeftMessageWindowWithFace, activeRightMessageWindowWithFace,} from "../../active-message-window";
import {invisibleAllMessageWindows} from "../../invisible-all-message-windows";
import {scrollLeftMessages, scrollRightMessages} from "../../scroll-messages";

/**
 * 3以上で攻撃する
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export async function shouldAttack3OrMore(
  props: Readonly<CustomBattleEventProps>
): Promise<void> {
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", "「これでシンブレイバーの攻撃力が底上げされた"],
    ["いまなら 3攻撃以上で私を倒せるはずだ」"],
  ]);
  props.view.dom.leftMessageWindow.darken();
  activeRightMessageWindowWithFace(props, "Gai");
  await scrollRightMessages(props, [
    ["ガイ", "「了解だ 3以上で攻撃すればいいんだな」"],
  ]);
  props.view.dom.rightMessageWindow.darken();
  invisibleAllMessageWindows(props);
}