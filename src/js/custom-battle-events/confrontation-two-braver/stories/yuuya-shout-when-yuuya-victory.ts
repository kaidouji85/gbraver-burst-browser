import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeLeftMessageWindowWithFace } from "../../active-message-window";
import { scrollLeftMessages } from "../../scroll-messages";

/**
 * ユウヤ勝利時のユウヤ台詞
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export async function yuuyaShoutWhenYuuyaVictory(
  props: Readonly<CustomBattleEventProps>,
): Promise<void> {
  activeLeftMessageWindowWithFace(props, "Yuuya");
  await scrollLeftMessages(props, [
    ["ユウヤ", `「Gブレイバーに${wbr}傷を${wbr}付けるとは`],
    [`少しは${wbr}やるな${wbr} シンブレイバー」`],
  ]);
}
