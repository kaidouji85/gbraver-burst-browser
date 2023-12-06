import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeLeftMessageWindowWithFace } from "../../active-message-window";
import { scrollRightMessages } from "../../scroll-messages";

/**
 * ユウヤ勝利時のユウヤ台詞
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export async function yuuyaCryWhenYuuyaVictory(
  props: Readonly<CustomBattleEventProps>,
): Promise<void> {
  activeLeftMessageWindowWithFace(props, "Yuuya");
  await scrollRightMessages(props, [
    ["ユウヤ", "「Gブレイバーに傷を付けるとは"],
    ["少しはやるな シンブレイバー」"],
  ]);
}
