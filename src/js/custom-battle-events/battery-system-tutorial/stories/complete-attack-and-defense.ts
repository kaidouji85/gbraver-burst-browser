import type { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import { activeLeftMessageWindowWithFace } from "../../active-message-window";
import { scrollLeftMessages } from "../../scroll-messages";

/**
 * ストーリー 攻撃、防御を一通り体験した
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export const completeAttackAndDefense = async (
  props: CustomBattleEventProps,
) => {
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", "「これで攻撃 防御を一通り体験したな"],
    ["以降はどちらかのHPが0になるまで これを繰り返すんだ"],
    ["以上で基本ルールの説明は終了だ"],
    ["ここから先は好きなように戦ってくれ」"],
  ]);
  props.view.dom.leftMessageWindow.darken();
};
