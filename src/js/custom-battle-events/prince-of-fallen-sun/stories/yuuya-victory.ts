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
    ["ユウヤ", `「ネオランドーザは${wbr}素晴らしい${wbr}機体だ`],
    [
      `特に${wbr}攻撃${wbr}・耐久性能は${wbr}Gブレイバーより${wbr}上で 目を${wbr}見張る${wbr}ものが${wbr}ある`,
    ],
    [`だが ロボの${wbr}性能だけで${wbr}試合は${wbr}決まらない`],
    [`一番大事なのは パイロット同士の${wbr}読み合いだ」`],
  ]);

  invisibleAllMessageWindows(props);
}
