import type { CustomBattleEventProps } from "../../../td-scenes/battle/custom-battle-event";
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
 * ストーリー 冒頭
 * @param props イベントプロパティ
 * @return ストーリーが完了したら発火するPromise
 */
export const introduction = async (props: CustomBattleEventProps) => {
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [
    ["シンヤ", "「俺 都立大田高校のシンヤ"],
    ["同じ一年生同士 よろしく頼むッス」"],
  ]);
  props.view.dom.rightMessageWindow.darken();
  activeLeftMessageWindowWithFace(props, "Gai");
  await scrollLeftMessages(props, [
    ["ガイ", "「都立台東高校のガイだ"],
    ["こんな気の抜けた奴が出てくるなんて 大田高校も噂程ではないな」"],
  ]);
  await refreshConversation(props);
  activeRightMessageWindowWithFace(props, "Tsubasa");
  await scrollRightMessages(props, [
    ["ツバサ", "「間もなく 台東高校 大田高校の合同練習試合を開始する"],
    ["一同 姿勢を正して 礼!!」"],
  ]);
  props.view.dom.leftMessageWindow.darken();
  await refreshConversation(props, 100);
  activeLeftMessageWindowWithFace(props, "Gai");
  props.view.dom.leftMessageWindow.messages([
    "ガイ",
    "「よろしくお願いします」",
  ]);
  props.view.dom.leftMessageWindow.scrollUp();
  activeRightMessageWindowWithFace(props, "Shinya");
  await scrollRightMessages(props, [["シンヤ", "「よろしくお願いします」"]]);
  invisibleAllMessageWindows(props);
};
