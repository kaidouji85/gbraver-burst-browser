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
  activeRightMessageWindowWithFace(props, "Gai");
  await scrollRightMessages(props, [
    ["ガイ", "「見たかシンヤ"],
    ["ツバサ先輩に勝ったぞ"],
  ]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", "「見事だ ガイ君"],
    ["シンブレイバーの攻撃力をガイ君のスキルで底上げしたから"],
    ["ウィングドーザを一撃で倒すことができたんだ」"],
  ]);
  props.view.dom.leftMessageWindow.darken();
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", "「なるほど"],
    ["これがロボとパイロットの相性ってことッスね」"],
  ]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", "「パイロットスキルの効果はバーストに比べると小さいが"],
    ["普段ならギリギリ倒しきれない相手にとどめを刺せるなど"],
    ["相手の意表を突くことができるんだ」"],
  ]);
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["(そしてパイロットスキルを使いこなせば"],
    ["奴にも ……Gブレイバーにも届きうる)"],
  ]);
  await refreshConversation(props);
  activeLeftMessageWindowWithFace(props, "Raito");
  await scrollLeftMessages(props, [
    ["ライト", "「こないなところにおったんか 大田高校のエース君"],
    ["あんさんに会いたがっとる人を連れてきたで」"],
  ]);
  await refreshConversation(props);
  activeLeftMessageWindowWithFace(props, "Yuuya");
  await scrollLeftMessages(props, [
    ["ユウヤ", "「俺は京都府立洛内高校 三年生 ユウヤだ」"],
  ]);
  props.view.dom.leftMessageWindow.darken();
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [["シンヤ", "「……！！」"]]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Yuuya");
  await scrollLeftMessages(props, [
    ["ユウヤ", "「早速だがシンヤ この俺様と勝負してもらおうか」"],
  ]);
  invisibleAllMessageWindows(props);
}
