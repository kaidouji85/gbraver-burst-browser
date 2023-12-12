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
import {darken} from "../../../game-dom/message-window/procedure/darken";

/**
 * プレイヤー勝利
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export async function playerWin(
  props: Readonly<CustomBattleEventProps>,
): Promise<void> {
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", "「そこまで"],
    ["この試合 ガイの勝ちッス」"],
  ]);
  props.view.dom.rightMessageWindow.darken();
  await refreshConversation(props);
  activeRightMessageWindowWithFace(props, "Gai");
  await scrollRightMessages(props, [
    ["ガイ", "「見たかシンヤ"],
    ["ツバサ先輩に勝ったぞ"],
  ]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", "「見事だ ガイ君"],
    ["パイロットスキルの効果はバーストに比べると小さいが"],
    ["普段ならギリギリ倒しきれない相手にとどめを刺せるなど"],
    ["意表を突くような使い方が可能だ"],
  ]);
  await refreshConversation(props);
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", "(そしてパイロットスキルを使いこなせば"],
    ["Gブレイバーへの雪辱も果たせる)"],
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
    ["ユウヤ", "「はじめましてだな 大田高校 新入生のシンヤ君」"],
  ]);
  props.view.dom.leftMessageWindow.darken();
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [["シンヤ", "「……！！」"]]);
  activeLeftMessageWindowWithFace(props, "Yuuya");
  await scrollLeftMessages(props, [
    ["ユウヤ", "「俺は京都府立洛内高校 三年生 ユウヤ"],
    ["早速だが この俺と勝負してもらおう」"],
  ]);
  invisibleAllMessageWindows(props);
}
