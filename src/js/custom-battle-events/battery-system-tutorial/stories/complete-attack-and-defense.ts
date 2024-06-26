import { wbr } from "../../../dom/wbr";
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
    ["ツバサ", `「これで${wbr}攻撃・防御${wbr}を一通り体験${wbr}したな`],
    [`以降は${wbr}どちらかのHPが0に${wbr}なるまで これを${wbr}繰り返すんだ`],
    [`以上で${wbr}基本ルールの${wbr}説明は${wbr}終了だ`],
    [`ここから先は${wbr}好きなように${wbr}戦ってくれ」`],
  ]);
  props.view.dom.leftMessageWindow.darken();
};
