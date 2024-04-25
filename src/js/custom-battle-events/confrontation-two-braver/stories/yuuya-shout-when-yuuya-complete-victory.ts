import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeLeftMessageWindowWithFace } from "../../active-message-window";
import { scrollLeftMessages } from "../../scroll-messages";

/**
 * ユウヤ完全勝利時のユウヤ台詞
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export async function yuuyaShoutWhenYuuyaCompleteVictory(
  props: Readonly<CustomBattleEventProps>,
): Promise<void> {
  activeLeftMessageWindowWithFace(props, "Yuuya");
  await scrollLeftMessages(props, [
    ["ユウヤ", "「……退屈凌ぎにもならかったな"],
    ["少々がっかりだぜ シンブレイバー」"],
  ]);
}
