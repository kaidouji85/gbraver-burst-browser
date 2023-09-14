import { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
import {
  activeLeftMessageWindowWithFace,
  activeRightMessageWindowWithFace,
} from "../../active-message-window";
import { refreshConversation } from "../../invisible-all-message-windows";
import { scrollLeftMessages, scrollRightMessages } from "../../scroll-messages";
import {synchronizedUpright} from "../../synchronized-upright";
import {waitUntilWindowPush} from "../../wait-until-window-push";
import {delay} from "../../../animation/delay";
import {synchronizedBow} from "../../synchronized-bow";

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
  props.view.dom.rightMessageWindow.messages(["シンヤ", "「姿勢を正して"]);
  await synchronizedUpright(props).play();
  props.view.dom.rightMessageWindow.nextMessageIconVisible(true);
  await waitUntilWindowPush(props);
  props.sounds.sendMessage.sound.play();
  props.view.dom.rightMessageWindow.nextMessageIconVisible(false);
  props.view.dom.rightMessageWindow.scrollUp();
  props.view.dom.rightMessageWindow.messages(["礼！！」"]);
  await delay(500).play();
  await refreshConversation(props);
  activeLeftMessageWindowWithFace(props, "Tsubasa");
  props.view.dom.leftMessageWindow.messages([
    "ツバサ",
    "「よろしくお願いします」",
  ]);
  props.view.dom.leftMessageWindow.scrollUp();
  activeRightMessageWindowWithFace(props, "Gai");
  props.view.dom.rightMessageWindow.messages([
    "ガイ",
    "「よろしくお願いします」",
  ]);
  await synchronizedBow(props).chain(delay(500)).play();
}
