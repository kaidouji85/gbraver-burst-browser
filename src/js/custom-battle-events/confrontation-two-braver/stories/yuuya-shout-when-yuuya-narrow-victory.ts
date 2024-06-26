import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeLeftMessageWindowWithFace } from "../../active-message-window";
import { scrollLeftMessages } from "../../scroll-messages";

/**
 * ユウヤ辛勝時のユウヤ台詞
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export async function yuuyaShoutWhenYuuyaNarrowVictory(
  props: Readonly<CustomBattleEventProps>,
): Promise<void> {
  activeLeftMessageWindowWithFace(props, "Yuuya");
  await scrollLeftMessages(props, [
    ["ユウヤ", `「全力を${wbr}出さなければ${wbr} やられて${wbr}いた`],
    [`こいつ${wbr}本当に${wbr}新入生か」`],
  ]);
}
