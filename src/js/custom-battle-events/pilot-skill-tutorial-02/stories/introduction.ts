import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import {
  activeLeftMessageWindowWithFace,
  activeRightMessageWindowWithFace,
} from "../../active-message-window";
import { refreshConversation } from "../../invisible-all-message-windows";
import { scrollLeftMessages, scrollRightMessages } from "../../scroll-messages";

/**
 * イントロダクション
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export async function introduction(props: Readonly<CustomBattleEventProps>) {
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", "「ガイ 練習を手伝ってくれて ありがとうッス」"],
  ]);
  await refreshConversation(props);
  activeRightMessageWindowWithFace(props, "Gai");
  await scrollRightMessages(props, [
    ["ガイ", "「勘違いするなよ シンヤ"],
    ["俺はシンブレイバーとウィングドーザの情報が欲しいだけだ」"],
  ]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  await scrollLeftMessages(props, [
    ["ツバサ", "「それではガイ君 練習をはじめようか"],
    ["私は先程と全く同じ戦略で戦うが 君のパイロットスキルなら"],
    ["2ターン目で私を倒すことができるはずだ」"],
  ]);
  props.view.dom.leftMessageWindow.darken();
  await refreshConversation(props);
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [["シンヤ", "「姿勢を正して 礼！！」"]]);
  await refreshConversation(props);
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  props.view.dom.leftMessageWindow.messages([
    "ツバサ",
    "「よろしくお願いします」",
  ]);
  props.view.dom.leftMessageWindow.scrollUp();
  activeRightMessageWindowWithFace(props, "Gai");
  await scrollRightMessages(props, [["ガイ", "「よろしくお願いします」"]]);
}
