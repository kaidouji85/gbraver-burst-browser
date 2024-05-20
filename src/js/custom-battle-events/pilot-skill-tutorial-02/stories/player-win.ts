import { wbr } from "../../../dom/wbr";
import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import {
  activeLeftMessageWindowWithFace,
  activeRightMessageWindowWithFace,
} from "../../active-message-window";
import {
  invisibleAllMessageWindows,
  refreshConversation,
} from "../../invisible-all-message-windows";
import { scrollLeftMessages, scrollRightMessages } from "../../scroll-messages";

/**
 * プレイヤー勝利
 * @param props イベントプロパティ
 * @returns ストーリーが完了したら発火するPromise
 */
export async function playerWin(
  props: Readonly<CustomBattleEventProps>,
): Promise<void> {
  invisibleAllMessageWindows(props);
  activeRightMessageWindowWithFace(props, "Gai");
  await scrollRightMessages(props, [
    ["ガイ", `「見たか${wbr}シンヤ`],
    [`ツバサ先輩に${wbr}勝ったぞ`],
  ]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", `「見事だ${wbr} ガイ君`],
    [
      `シンブレイバーの${wbr}攻撃力を${wbr}ガイ君の${wbr}スキルで${wbr}底上げ${wbr}したから`,
    ],
    [`ウィングドーザを${wbr}一撃で${wbr}倒す${wbr}ことが${wbr}できたんだ」`],
  ]);
  props.view.dom.leftMessageWindow.darken();
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", "「なるほど"],
    [`これが${wbr}ロボと${wbr}パイロットの${wbr}相性って${wbr}ことッスね」`],
  ]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    [
      "ツバサ",
      `「パイロットスキルの${wbr}効果は${wbr}バーストに${wbr}比べると${wbr}小さいが`,
    ],
    [
      `普段なら${wbr}ギリギリ${wbr}倒しきれない${wbr}相手に${wbr}とどめを刺せる${wbr}など`,
    ],
    [`相手の${wbr}意表を${wbr}突く${wbr}ことが${wbr}できるんだ」`],
  ]);
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    [`(そして${wbr}パイロットスキルを${wbr}使い${wbr}こなせば`],
    [`奴にも${wbr} ……Gブレイバーにも${wbr}届きうる)`],
  ]);
  await refreshConversation(props);
  activeLeftMessageWindowWithFace(props, "Raito");
  await scrollLeftMessages(props, [
    [
      "ライト",
      `「こないなところに${wbr}おったんか${wbr} 大田高校の${wbr}エース君`,
    ],
    [`あんさんに${wbr}会いたがっとる${wbr}人を${wbr}連れて${wbr}きたで」`],
  ]);
  await refreshConversation(props);
  activeLeftMessageWindowWithFace(props, "Yuuya");
  await scrollLeftMessages(props, [
    ["ユウヤ", `「俺は${wbr}京都府立${wbr}洛内高校の${wbr}ユウヤだ」`],
  ]);
  props.view.dom.leftMessageWindow.darken();
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [["シンヤ", "「……！！」"]]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Yuuya");
  await scrollLeftMessages(props, [
    [
      "ユウヤ",
      `「早速だが${wbr}シンヤ${wbr} この俺様と${wbr}勝負して${wbr}もらおうか」`,
    ],
  ]);
  invisibleAllMessageWindows(props);
}
