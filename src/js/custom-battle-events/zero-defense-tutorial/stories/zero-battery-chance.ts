import type { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeRightMessageWindowWithFace } from "../../active-message-window";
import { invisibleAllMessageWindows, refreshConversation } from "../../invisible-all-message-windows";
import { scrollRightMessages } from "../../scroll-messages";

/**
 * ストーリー 0バッテリーチャンス
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export const zeroBatteryChance = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [["ツバサ", "「ガイ君のバッテリーが0になった"], ["シンヤ 今こそ攻撃のチャンスだ」"]]);
  await refreshConversation(props, 100);
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [["シンヤ", "「……どうして相手のバッテリーが0だとチャンスなんスか」"]]);
  await refreshConversation(props, 100);
  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [["ツバサ", "「いい質問だな シンヤ"], ["0防御すると HPが満タンでも一撃で死ぬダメージを受けるんだ」"]]);
  await refreshConversation(props, 100);
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [["シンヤ", "「なるほど 0防御は即死ってことッスね"], ["じゃあ このまま一気に決めるッス」"]]);
  invisibleAllMessageWindows(props);
};