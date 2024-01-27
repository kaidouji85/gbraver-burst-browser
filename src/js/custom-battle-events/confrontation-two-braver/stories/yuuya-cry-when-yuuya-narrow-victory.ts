import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeLeftMessageWindowWithFace } from "../../active-message-window";
import { scrollLeftMessages } from "../../scroll-messages";

/**
 * ユウヤ辛勝時のユウヤ台詞
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export async function yuuyaCryWhenYuuyaNarrowVictory(
  props: Readonly<CustomBattleEventProps>,
): Promise<void> {
  activeLeftMessageWindowWithFace(props, "Yuuya");
  await scrollLeftMessages(props, [
    ["ユウヤ", "「全力を出さなければ やられていた"],
    ["こいつ本当に新入生か」"],
  ]);
}
