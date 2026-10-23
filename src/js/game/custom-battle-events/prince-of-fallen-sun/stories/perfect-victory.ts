import { wbr } from "../../../../dom/wbr";
import { CustomBattleEventProps } from "../../../scenes/td-scenes/battle/custom-battle-event";
import {
  activeLeftMessageWindowWithFace,
  activeRightMessageWindowWithFace,
} from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollLeftMessages, scrollRightMessages } from "../../scroll-messages";

/**
 * ユウヤの完全勝利
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export async function perfectVictory(props: CustomBattleEventProps) {
  props.view.dom.easterEgg.show();
  activeLeftMessageWindowWithFace(props, "Gai");
  await scrollLeftMessages(props, [
    ["ガイ", `「バカな`],
    [`ライト先輩の${wbr}秘策を${wbr}使ったのに パーフェクト負け${wbr}だと」`],
  ]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, "Yuuya");
  await scrollRightMessages(props, [
    ["ユウヤ", `「生兵法は${wbr}怪我のもと`],
    [
      `強力な${wbr}戦術を${wbr}押し通す${wbr}だけで${wbr}勝てるほど 機動倶楽部は${wbr}甘くない」`,
    ],
  ]);
  props.view.dom.easterEgg.hidden();
  invisibleAllMessageWindows(props);
}
