import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import {
  activeLeftMessageWindowWithFace,
  activeRightMessageWindowWithFace,
} from "../../active-message-window";
import { invisibleAllMessageWindows } from "../../invisible-all-message-windows";
import { scrollLeftMessages, scrollRightMessages } from "../../scroll-messages";

/**
 * ユウヤの勝利
 * @param props イベントプロパティ
 */
export async function yuuyaVictory(props: CustomBattleEventProps) {
  activeLeftMessageWindowWithFace(props, "Gai");
  await scrollLeftMessages(props, [
    ["ガイ", `「何故だ`],
    [`うちじゃ${wbr}Gブレイバーに${wbr}勝てない${wbr}のか」`],
  ]);
  props.view.dom.leftMessageWindow.darken();

  activeRightMessageWindowWithFace(props, "Yuuya");
  await scrollRightMessages(props, [
    ["ユウヤ", `「ネオランドーザは${wbr}素晴らしい${wbr}ロボだ`],
    [`特に${wbr}攻撃力は ずば抜けて${wbr}高い`],
    [`だが ロボの${wbr}性能だけで${wbr}試合は${wbr}決まらない`],
    [`最終的に${wbr}勝敗を${wbr}分けるのは パイロット同士の${wbr}読み合いだ」`],
  ]);

  invisibleAllMessageWindows(props);
}
